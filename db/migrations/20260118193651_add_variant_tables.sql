-- migrate:up

CREATE TABLE listing_variation (
    id SERIAL PRIMARY KEY,
    listing_id INTEGER NOT NULL REFERENCES listing(id) ON DELETE CASCADE,
    variation_name VARCHAR(128) NOT NULL,
    prices_vary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE listing_variation_option (
    id SERIAL PRIMARY KEY,
    listing_variation_id INTEGER NOT NULL REFERENCES listing_variation(id) ON DELETE CASCADE,
    option_name VARCHAR(128) NOT NULL,
    additional_price_us_dollars NUMERIC(6, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down

DROP TABLE listing_variation_option;
DROP TABLE listing_variation;