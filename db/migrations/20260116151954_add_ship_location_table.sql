-- migrate:up

ALTER TABLE shipping_profile
    DROP COLUMN IF EXISTS origin_zip;

CREATE TABLE ship_location (
    id SERIAL PRIMARY KEY,
    location_name VARCHAR(128) NOT NULL,
    origin_zip NUMERIC(5, 0) NOT NULL,
    shop_id INT NOT NULL REFERENCES shop(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down

DROP TABLE ship_location;

ALTER TABLE shipping_profile
    ADD COLUMN origin_zip NUMERIC(5, 0) NOT NULL;