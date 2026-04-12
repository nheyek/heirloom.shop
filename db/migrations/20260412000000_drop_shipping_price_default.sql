-- migrate:up
ALTER TABLE app_order ALTER COLUMN shipping_price DROP DEFAULT;

-- migrate:down
ALTER TABLE app_order ALTER COLUMN shipping_price SET DEFAULT 0;
