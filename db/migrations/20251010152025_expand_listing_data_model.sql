-- migrate:up
ALTER TABLE shop
    RENAME COLUMN shop_name TO title;

ALTER TABLE shop
    ADD COLUMN profile_rich_text TEXT,
    ADD COLUMN profile_image_uuid VARCHAR(36);

CREATE TABLE listing_category (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    subtitle VARCHAR(256),
    image_uuid VARCHAR(36),
    parent_id VARCHAR(64) REFERENCES listing_category(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE product RENAME TO listing;

ALTER TABLE listing RENAME COLUMN description_text TO descr_rich_text;

DELETE FROM listing;

ALTER TABLE listing
    ALTER COLUMN descr_rich_text TYPE TEXT,
    ADD COLUMN category_id VARCHAR(64) REFERENCES listing_category(id) ON DELETE SET NULL,
    ADD COLUMN subtitle VARCHAR(256),
    ADD COLUMN price_dollars INT NOT NULL DEFAULT 0,
    ADD COLUMN primary_image_uuid VARCHAR(36),
    ADD COLUMN shop_id INT NOT NULL REFERENCES shop(id) ON DELETE CASCADE;

CREATE TABLE listing_image (
    id SERIAL PRIMARY KEY,
    listing_id INT NOT NULL REFERENCES listing(id) ON DELETE CASCADE,
    image_uuid VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down

-- 1) Drop dependents first (listing_image → listing)
DROP TABLE IF EXISTS listing_image;

-- 2) Revert changes to the table currently named `listing`
--    Drop columns added in :up (drops their FKs too)
ALTER TABLE listing
    DROP COLUMN IF EXISTS shop_id,
    DROP COLUMN IF EXISTS primary_image_uuid,
    DROP COLUMN IF EXISTS price_dollars,
    DROP COLUMN IF EXISTS subtitle,
    DROP COLUMN IF EXISTS category_id;

-- 3) Change type back (if needed), then rename the column back
--    If the original type was TEXT, skip this step entirely.
ALTER TABLE listing
    ALTER COLUMN descr_rich_text TYPE VARCHAR;

ALTER TABLE listing
    RENAME COLUMN descr_rich_text TO description_text;

-- 4) Rename table back to `product`
ALTER TABLE listing
    RENAME TO product;

-- 5) Drop the category table
DROP TABLE IF EXISTS listing_category;

-- 6) Revert changes to `shop`
ALTER TABLE shop
    DROP COLUMN IF EXISTS profile_image_uuid,
    DROP COLUMN IF EXISTS profile_rich_text;

ALTER TABLE shop
    RENAME COLUMN title TO shop_name;