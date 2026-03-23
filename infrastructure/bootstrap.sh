#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <environment>"
  echo "Example: $0 dev"
  exit 1
fi

ENV=$1
export TF_VAR_environment="$ENV"

APP_NAME="heirloom"
REGISTRY_RESOURCE="digitalocean_container_registry.heirloom"
DB_CLUSTER_RESOURCE="digitalocean_database_cluster.db"
DB_FIREWALL_PERMISSIVE="digitalocean_database_firewall.db_permissive"
DB_FIREWALL_APP="digitalocean_database_firewall.db_app"
APP_RESOURCE="digitalocean_app.${APP_NAME}"

echo ">>> STEP 1: Create container registry"
terraform apply -target=${REGISTRY_RESOURCE} -auto-approve

echo ">>> Registry created. Push your initial Docker image (e.g. :latest) now."
read -p "Press enter when the image has been pushed..."

echo ">>> STEP 2: Create DB cluster with permissive firewall"
terraform apply -target=${DB_CLUSTER_RESOURCE} -auto-approve

echo ">>> STEP 3: Create App Platform app (connects using seeded image)"
terraform apply -target=${APP_RESOURCE} -auto-approve

echo ">>> STEP 4: Tighten DB firewall to app-only"
terraform apply -target=${DB_FIREWALL_APP} -auto-approve

echo ">>> DONE: Registry, DB, and App created. Firewall restricted to App only."