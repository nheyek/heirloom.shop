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

resource "digitalocean_droplet" "web" {
  name   = "web-${var.environment}"
  region = var.region
  size   = var.droplet_size
  image  = "ubuntu-22-04-x64"

  tags = [var.environment]

  ssh_keys = [data.digitalocean_ssh_key.nick.id]

	user_data = <<-EOF
	#cloud-config
	runcmd:
		- echo "DATABASE_URL=${digitalocean_database_cluster.db.uri}" >> /etc/environment
		- echo "APP_ENV=${var.environment}" >> /etc/environment
	EOF
}

resource "digitalocean_firewall" "web_fw" {
  name = "web-firewall-${var.environment}"

  droplet_ids = [digitalocean_droplet.web.id]

  inbound_rule {
	protocol         = "tcp"
	port_range       = "22"
	source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
	protocol         = "tcp"
	port_range       = "80"
	source_addresses = ["0.0.0.0/0", "::/0"]
  }

  inbound_rule {
	protocol         = "tcp"
	port_range       = "443"
	source_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
	protocol              = "icmp"
	destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
	protocol              = "tcp"
	port_range            = "all"
	destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
	protocol              = "udp"
	port_range            = "all"
	destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}

resource "digitalocean_database_firewall" "db_fw" {
  cluster_id = digitalocean_database_cluster.db.id

  # App droplet(s) — matched by ID
  rule {
    type  = "droplet"
    value = digitalocean_droplet.web.id
  }

  dynamic "rule" {
    for_each = var.trusted_ips
    content {
      type  = "ip_addr"
      value = rule.value
    }
  }
}