terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }

  required_version = ">= 1.5.0"
}

provider "digitalocean" {
  token = var.do_token
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
  }
}

resource "digitalocean_database_user" "app_user" {
  cluster_id = digitalocean_database_cluster.db.id
  name       = "heirloom"
}

resource "digitalocean_database_user" "github_user" {
  cluster_id = digitalocean_database_cluster.db.id
  name       = "github"
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
