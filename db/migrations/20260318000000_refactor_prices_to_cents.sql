-- migrate:up

-- Convert listing.price_dollars to price_cents
ALTER TABLE listing RENAME COLUMN price_dollars TO price_cents;
UPDATE listing SET price_cents = price_cents * 100 WHERE price_cents IS NOT NULL;

-- Convert listing_variation_option.additional_price_us_dollars to additional_price_cents
ALTER TABLE listing_variation_option 
    RENAME COLUMN additional_price_us_dollars TO additional_price_cents;

ALTER TABLE listing_variation_option 
    ALTER COLUMN additional_price_cents TYPE INTEGER USING (additional_price_cents * 100);

ALTER TABLE listing_variation_option 
    ALTER COLUMN additional_price_cents SET DEFAULT 0;

-- Convert shipping_profile.flat_shipping_rate_us_dollars to flat_shipping_rate_cents
ALTER TABLE shipping_profile 
    RENAME COLUMN flat_shipping_rate_us_dollars TO flat_shipping_rate_cents;

ALTER TABLE shipping_profile 
    ALTER COLUMN flat_shipping_rate_cents TYPE INTEGER USING (flat_shipping_rate_cents * 100);

-- migrate:down

-- Revert shipping_profile
ALTER TABLE shipping_profile 
    ALTER COLUMN flat_shipping_rate_cents TYPE NUMERIC(6, 2) USING (flat_shipping_rate_cents::NUMERIC / 100);

ALTER TABLE shipping_profile 
    RENAME COLUMN flat_shipping_rate_cents TO flat_shipping_rate_us_dollars;

-- Revert listing_variation_option
ALTER TABLE listing_variation_option 
    ALTER COLUMN additional_price_cents SET DEFAULT 0.00;

ALTER TABLE listing_variation_option 
    ALTER COLUMN additional_price_cents TYPE NUMERIC(6, 2) USING (additional_price_cents::NUMERIC / 100);

ALTER TABLE listing_variation_option 
    RENAME COLUMN additional_price_cents TO additional_price_us_dollars;

-- Revert listing
UPDATE listing SET price_cents = price_cents / 100 WHERE price_cents IS NOT NULL;
ALTER TABLE listing RENAME COLUMN price_cents TO price_dollars;
