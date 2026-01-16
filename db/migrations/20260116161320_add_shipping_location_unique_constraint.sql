-- migrate:up

ALTER TABLE shipping_origin
    ADD CONSTRAINT unique_shop_origin_zip UNIQUE (shop_id, origin_zip);

-- migrate:down

ALTER TABLE shipping_origin
    DROP CONSTRAINT unique_shop_origin_zip;