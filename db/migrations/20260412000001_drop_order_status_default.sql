-- migrate:up
ALTER TABLE app_order ALTER COLUMN order_status DROP DEFAULT;

-- migrate:down
ALTER TABLE app_order ALTER COLUMN order_status SET DEFAULT 'PENDING';
