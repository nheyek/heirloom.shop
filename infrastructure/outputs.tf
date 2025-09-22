output "web_ip" {
  description = "Public IP of the web server"
  value       = digitalocean_droplet.web.ipv4_address
}

output "db_uri" {
  description = "Connection string for the database"
  value       = digitalocean_database_cluster.db.uri
  sensitive   = true
}