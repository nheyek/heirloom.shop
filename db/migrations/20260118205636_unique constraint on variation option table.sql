-- migrate:up
ALTER TABLE listing_variation_option
    ADD CONSTRAINT unique_option_per_variation UNIQUE(listing_variation_id, option_name);

-- migrate:down

ALTER TABLE listing_variation_option
    DROP CONSTRAINT IF EXISTS unique_option_per_variation;
