#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$SCRIPT_DIR/db/scripts/seed_base_data.sql"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$SCRIPT_DIR/db/scripts/seed_sample_data.sql"