-- migrate:up
ALTER TABLE public.listing
    ADD COLUMN track_inventory boolean NOT NULL DEFAULT false;

-- migrate:down
ALTER TABLE public.listing
    DROP COLUMN track_inventory;
