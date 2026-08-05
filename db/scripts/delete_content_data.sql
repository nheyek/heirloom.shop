BEGIN;

TRUNCATE TABLE shop, app_order, listing_category RESTART IDENTITY CASCADE;

COMMIT;
