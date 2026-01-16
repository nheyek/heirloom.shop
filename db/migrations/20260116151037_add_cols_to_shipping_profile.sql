-- migrate:up

ALTER TABLE shipping_profile
    ADD COLUMN shop_id INT REFERENCES shop(id) ON DELETE CASCADE,
    ADD COLUMN standard_profile_key VARCHAR(64) NULL,
    ADD CONSTRAINT unique_shop_standard_profile_key UNIQUE (standard_profile_key);

-- migrate:down

ALTER TABLE shipping_profile
    DROP CONSTRAINT IF EXISTS unique_shop_standard_profile_key,
    DROP COLUMN IF EXISTS shop_id;