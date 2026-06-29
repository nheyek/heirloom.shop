-- migrate:up
DROP TABLE IF EXISTS return_exchange_profile CASCADE;
DROP SEQUENCE IF EXISTS return_exchange_profile_id_seq;

DELETE FROM listing_return_profile
WHERE id NOT IN (
    SELECT MIN(id) FROM listing_return_profile GROUP BY shop_id, name
);

DELETE FROM listing_processing_profile
WHERE id NOT IN (
    SELECT MIN(id) FROM listing_processing_profile GROUP BY shop_id, name
);

DELETE FROM shipping_profile
WHERE id NOT IN (
    SELECT MIN(id) FROM shipping_profile GROUP BY shop_id, name
);

ALTER TABLE listing_return_profile
    ADD CONSTRAINT listing_return_profile_shop_name_unique UNIQUE (shop_id, name);

ALTER TABLE listing_processing_profile
    ADD CONSTRAINT listing_processing_profile_shop_name_unique UNIQUE (shop_id, name);

ALTER TABLE shipping_profile
    ADD CONSTRAINT shipping_profile_shop_name_unique UNIQUE (shop_id, name);

-- migrate:down
-- ALTER TABLE listing_return_profile DROP CONSTRAINT IF EXISTS listing_return_profile_shop_name_unique;
-- ALTER TABLE listing_processing_profile DROP CONSTRAINT IF EXISTS listing_processing_profile_shop_name_unique;
-- ALTER TABLE shipping_profile DROP CONSTRAINT IF EXISTS shipping_profile_shop_name_unique;
-- (return_exchange_profile intentionally not restored)
