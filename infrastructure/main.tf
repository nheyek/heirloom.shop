terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = ">= 2.0"
    }
  }

  required_version = ">= 1.5.0"
}

provider "digitalocean" {
}

resource "digitalocean_container_registry" "heirloom" {
  name                   = "heirloom-shop"
  subscription_tier_slug = "basic"
}

resource "digitalocean_database_cluster" "db" {
  name       = "postgres-${var.environment}"
  engine     = "pg"
  version    = "15"
  size       = var.db_size
  region     = var.region
  node_count = 1
}


resource "digitalocean_app" "heirloom" {
  spec {
    name   = "heirloom-${var.environment}"
    region = var.region

    service {
      name               = "app-server"
      environment_slug   = "node-js"
      instance_size_slug = "basic-xxs"
      instance_count     = 1

      image {
        registry_type = "DOCR"
        repository    = "node-app"
        tag           = "latest"
      }

      env {
        key   = "APP_ENV"
        value = var.environment
      }

      env {
        key   = "NODE_ENV"
        value = "production"
      }

      env {
        key   = "DB_NAME"
        value = digitalocean_database_db.app_db.name
        scope = "RUN_TIME"
      }

      env {
        key   = "DB_USER"
        value = digitalocean_database_user.app_user.name
        scope = "RUN_TIME"
      }

      env {
        key   = "DB_PASS"
        value = digitalocean_database_user.app_user.password
        scope = "RUN_TIME"
      }

      env {
        key   = "DB_HOST"
        value = digitalocean_database_cluster.db.host
        scope = "RUN_TIME"
      }

      env {
        key   = "DB_PORT"
        value = digitalocean_database_cluster.db.port
        scope = "RUN_TIME"
      }
    }
    domain {
      name = "${var.domain_prefix != "" ? "${var.domain_prefix}." : ""}heirloom.shop"
      type = "ALIAS"
    }
  }
}

resource "digitalocean_database_user" "app_user" {
  cluster_id = digitalocean_database_cluster.db.id
  name       = "heirloom"
}

resource "digitalocean_database_db" "app_db" {
  cluster_id = digitalocean_database_cluster.db.id
  name       = "heirloomdb"
}

resource "digitalocean_database_firewall" "db_app" {
  cluster_id = digitalocean_database_cluster.db.id

  rule {
    type  = "app"
    value = digitalocean_app.heirloom.id
  }

  dynamic "rule" {
    for_each = var.trusted_ips
    content {
      type  = "ip_addr"
      value = rule.value
    }
  }
}

resource "digitalocean_spaces_bucket" "images" {
  name   = "heirloom-${var.environment}-images"
  region = var.region
  acl    = "public-read"

  versioning {
    enabled = true
  }
}

resource "digitalocean_spaces_bucket_policy" "public_read" {
  bucket = digitalocean_spaces_bucket.images.name
  region = var.region
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = ["s3:GetObject"]
        Resource = [
          "arn:aws:s3:::${digitalocean_spaces_bucket.images.name}/*"
        ]
      }
    ]
  })
}

resource "digitalocean_spaces_bucket_cors_configuration" "cors" {
  bucket = digitalocean_spaces_bucket.images.name
  region = var.region
  cors_rule {
    allowed_methods = ["GET", "HEAD", "PUT"]
    allowed_origins = var.cors_allowed_origins
    allowed_headers = [
      "*",
      "authorization",
      "content-type",
      "x-amz-acl",
      "x-amz-content-sha256",
      "x-amz-date",
      "x-amz-security-token"
    ]
    expose_headers  = ["ETag", "Location"]
    max_age_seconds = 3000
  }
}

resource "digitalocean_certificate" "cert" {
  name    = "cdn-cert"
  type    = "lets_encrypt"
  domains = [var.cdn_custom_domain]
}

resource "digitalocean_cdn" "images" {
  origin           = digitalocean_spaces_bucket.images.bucket_domain_name
  custom_domain    = var.cdn_custom_domain
  certificate_name = digitalocean_certificate.cert.name
  ttl              = 3600
}
