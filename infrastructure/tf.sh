#!/usr/bin/env bash
set -euo pipefail

export TF_VAR_stripe_secret_key="$STRIPE_SECRET_KEY"
export TF_VAR_stripe_webhook_secret="$STRIPE_WEBHOOK_SECRET"
export TF_VAR_resend_api_key="$RESEND_API_KEY"

terraform "$@"
