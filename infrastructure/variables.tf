variable "environment" {
  description = "Deployment environment (dev, staging, prod)"
  type        = string
}

variable "region" {
  description = "DigitalOcean region"
  type        = string
  default     = "nyc3"
}

variable "droplet_size" {
  description = "Size of the web server droplet"
  type        = string
  default     = "s-1vcpu-1gb"
}

variable "db_size" {
  description = "Size of the managed Postgres cluster"
  type        = string
  default     = "db-s-1vcpu-1gb"
}

variable "trusted_ips" {
  description = "List of trusted IP addresses for database access"
  type        = list(string)
  default     = []
}

variable "domain_prefix" {
  description = "Domain prefix for environment, e.g. alpha, beta, staging"
  type        = string
}

variable "cors_allowed_origins" {
  type = list(string)
}

variable "cdn_custom_domain" {
  description = "Custom domain for CDN"
  type        = string
}
