-- migrate:up
ALTER TABLE app_order
    ALTER COLUMN created_at TYPE timestamp with time zone,
    ALTER COLUMN updated_at TYPE timestamp with time zone;

ALTER TABLE app_user
    ALTER COLUMN created_at TYPE timestamp with time zone,
    ALTER COLUMN updated_at TYPE timestamp with time zone;

ALTER TABLE listing
    ALTER COLUMN created_at TYPE timestamp with time zone,
    ALTER COLUMN updated_at TYPE timestamp with time zone;

ALTER TABLE listing_category
    ALTER COLUMN created_at TYPE timestamp with time zone,
    ALTER COLUMN updated_at TYPE timestamp with time zone;

ALTER TABLE listing_variation
    ALTER COLUMN created_at TYPE timestamp with time zone,
    ALTER COLUMN updated_at TYPE timestamp with time zone;

ALTER TABLE listing_variation_option
    ALTER COLUMN created_at TYPE timestamp with time zone,
    ALTER COLUMN updated_at TYPE timestamp with time zone;

ALTER TABLE return_exchange_profile
    ALTER COLUMN created_at TYPE timestamp with time zone,
    ALTER COLUMN updated_at TYPE timestamp with time zone;

ALTER TABLE shipping_origin
    ALTER COLUMN created_at TYPE timestamp with time zone,
    ALTER COLUMN updated_at TYPE timestamp with time zone;

ALTER TABLE shipping_profile
    ALTER COLUMN created_at TYPE timestamp with time zone,
    ALTER COLUMN updated_at TYPE timestamp with time zone;

ALTER TABLE shop
    ALTER COLUMN created_at TYPE timestamp with time zone,
    ALTER COLUMN updated_at TYPE timestamp with time zone;

ALTER TABLE shop_user_role
    ALTER COLUMN created_at TYPE timestamp with time zone,
    ALTER COLUMN updated_at TYPE timestamp with time zone;

ALTER TABLE user_favorite_listing
    ALTER COLUMN created_at TYPE timestamp with time zone;

-- migrate:down
ALTER TABLE app_order
    ALTER COLUMN created_at TYPE timestamp without time zone,
    ALTER COLUMN updated_at TYPE timestamp without time zone;

ALTER TABLE app_user
    ALTER COLUMN created_at TYPE timestamp without time zone,
    ALTER COLUMN updated_at TYPE timestamp without time zone;

ALTER TABLE listing
    ALTER COLUMN created_at TYPE timestamp without time zone,
    ALTER COLUMN updated_at TYPE timestamp without time zone;

ALTER TABLE listing_category
    ALTER COLUMN created_at TYPE timestamp without time zone,
    ALTER COLUMN updated_at TYPE timestamp without time zone;

ALTER TABLE listing_variation
    ALTER COLUMN created_at TYPE timestamp without time zone,
    ALTER COLUMN updated_at TYPE timestamp without time zone;

ALTER TABLE listing_variation_option
    ALTER COLUMN created_at TYPE timestamp without time zone,
    ALTER COLUMN updated_at TYPE timestamp without time zone;

ALTER TABLE return_exchange_profile
    ALTER COLUMN created_at TYPE timestamp without time zone,
    ALTER COLUMN updated_at TYPE timestamp without time zone;

ALTER TABLE shipping_origin
    ALTER COLUMN created_at TYPE timestamp without time zone,
    ALTER COLUMN updated_at TYPE timestamp without time zone;

ALTER TABLE shipping_profile
    ALTER COLUMN created_at TYPE timestamp without time zone,
    ALTER COLUMN updated_at TYPE timestamp without time zone;

ALTER TABLE shop
    ALTER COLUMN created_at TYPE timestamp without time zone,
    ALTER COLUMN updated_at TYPE timestamp without time zone;

ALTER TABLE shop_user_role
    ALTER COLUMN created_at TYPE timestamp without time zone,
    ALTER COLUMN updated_at TYPE timestamp without time zone;

ALTER TABLE user_favorite_listing
    ALTER COLUMN created_at TYPE timestamp without time zone;
