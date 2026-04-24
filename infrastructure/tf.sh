#!/usr/bin/env bash
set -euo pipefail

export TF_VAR_stripe_secret_key="$STRIPE_SECRET_KEY"
export TF_VAR_resend_api_key="$RESEND_API_KEY"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Intercept environment shorthand: ./tf.sh <command> <env> [extra args]
# If the second argument matches a .tfvars file in environments/, inject -var-file automatically.
CMD="${1:-}"
ENV_ARG="${2:-}"
VARS_FILE="$SCRIPT_DIR/environments/${ENV_ARG}.tfvars"

if [[ -n "$ENV_ARG" && -f "$VARS_FILE" ]]; then
  shift 2
  terraform "$CMD" -var-file="$VARS_FILE" "$@"
else
  terraform "$@"
fi
