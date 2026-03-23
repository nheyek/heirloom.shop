output "db_uri" {
  description = "Connection string for the database"
  value       = digitalocean_database_cluster.db.uri
  sensitive   = true
}
