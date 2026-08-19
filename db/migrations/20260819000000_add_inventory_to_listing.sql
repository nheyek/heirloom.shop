-- migrate:up
ALTER TABLE public.listing
    ADD COLUMN inventory integer CONSTRAINT listing_inventory_nonnegative CHECK (inventory >= 0);

-- migrate:down
ALTER TABLE public.listing
    DROP COLUMN inventory;
