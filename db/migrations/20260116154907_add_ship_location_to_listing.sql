-- migrate:up

ALTER TABLE ship_location RENAME TO shipping_origin;

ALTER TABLE listing
    ADD COLUMN shipping_origin_id INT REFERENCES shipping_origin(id) ON DELETE SET NULL;

-- migrate:down

ALTER TABLE listing
    DROP COLUMN shipping_origin_id;

ALTER TABLE shipping_origin RENAME TO ship_location;