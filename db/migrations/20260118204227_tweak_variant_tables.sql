-- migrate:up

ALTER TABLE listing_variation
    ADD CONSTRAINT unique_name_per_listing UNIQUE(listing_id, variation_name);

-- migrate:down

ALTER TABLE listing_variation
    DROP CONSTRAINT IF EXISTS unique_name_per_listing;