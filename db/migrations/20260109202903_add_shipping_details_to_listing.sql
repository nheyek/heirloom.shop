-- migrate:up

CREATE TABLE shipping_profile (
    id SERIAL PRIMARY KEY,
    profile_name VARCHAR(128) NOT NULL,
    origin_zip NUMERIC(5, 0) NOT NULL,
    flat_shipping_rate_us_dollars NUMERIC(6, 2) NULL,
    shipping_days_min INT NULL,
    shipping_days_max INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE return_exchange_profile (
    id SERIAL PRIMARY KEY,
    profile_name VARCHAR(128) NOT NULL,
    return_window_days INT NOT NULL DEFAULT 30,
    additional_details TEXT,
    accept_returns BOOLEAN NOT NULL DEFAULT FALSE,
    accept_exchanges BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE listing
    ADD COLUMN shipping_profile_id INT REFERENCES shipping_profile(id) ON DELETE SET NULL,
    ADD COLUMN return_exchange_profile_id INT REFERENCES return_exchange_profile(id) ON DELETE SET NULL,
    ADD COLUMN lead_time_days_min INT NOT NULL DEFAULT 0,
    ADD COLUMN lead_time_days_max INT NOT NULL DEFAULT 0;

-- migrate:down

ALTER TABLE listing
    DROP COLUMN IF EXISTS lead_time_days_max,
    DROP COLUMN IF EXISTS lead_time_days_min,
    DROP COLUMN IF EXISTS return_exchange_profile_id,
    DROP COLUMN IF EXISTS shipping_profile_id;

DROP TABLE return_exchange_profile;

DROP TABLE shipping_profile;