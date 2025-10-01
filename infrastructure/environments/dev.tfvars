environment  = "dev"
region       = "nyc3"
droplet_size = "s-1vcpu-1gb"
db_size      = "db-s-1vcpu-1gb"
trusted_ips = [
  "96.81.246.182"  # Office
]
domain_prefix = "alpha"
cors_allowed_origins = [
  "http://localhost:8080",
  "http://localhost:3000",
  "https://alpha.heirloom.shop",
]
cdn_custom_domain = "cdn.heirloom.shop"