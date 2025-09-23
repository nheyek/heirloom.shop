terraform {
  required_providers {
	digitalocean = {
	  source  = "digitalocean/digitalocean"
	  version = "~> 2.0"
	}
  }

  required_version = ">= 1.5.0"
}

provider "digitalocean" {}

resource "digitalocean_database_cluster" "db" {
  name       = "postgres-${var.environment}"
  engine     = "pg"
  version    = "15"
  size       = var.db_size
  region     = var.region
  node_count = 1
}

resource "digitalocean_database_user" "app_user" {
  cluster_id = digitalocean_database_cluster.db.id
  name       = "heirloom"
}

resource "digitalocean_database_db" "app_db" {
  cluster_id = digitalocean_database_cluster.db.id
  name       = "heirloomdb"
}

resource "digitalocean_container_registry" "heirloom" {
  name                   = "heirloom-shop"
  subscription_tier_slug = "basic"
}

resource "digitalocean_app" "web" {
  spec {
	name   = "heirloom-${var.environment}"
	region = var.region

	service {
		name                = "app-server"
		environment_slug    = "node-js"
		instance_size_slug  = "basic-xxs"
		instance_count      = 1

		image {
			registry_type = "DOCR"
			repository    = "heirloom-shop/node-app"
			tag           = "latest"
		}

		env {
			key   = "APP_ENV"
			value = var.environment
		}

		env {
			key   = "DATABASE_URL"
			value = "postgres://${digitalocean_database_user.app_user.name}:${digitalocean_database_user.app_user.password}@${digitalocean_database_cluster.db.host}:${digitalocean_database_cluster.db.port}/${digitalocean_database_db.app_db.name}?sslmode=require"
			scope = "RUN_TIME"
		}
	}
  }
}

resource "digitalocean_database_firewall" "db_fw" {
  cluster_id = digitalocean_database_cluster.db.id

  rule {
	type  = "tag"
	value = "heirloom-${var.environment}"
  }

  dynamic "rule" {
	for_each = var.trusted_ips
	content {
	  type  = "ip_addr"
	  value = rule.value
	}
  }
}