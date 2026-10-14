-- migrate:up
ALTER TABLE public.listing
    RENAME COLUMN combinations TO variation_availability;

ALTER TABLE public.listing
    ADD COLUMN variation_images jsonb;

-- migrate:down
ALTER TABLE public.listing
    DROP COLUMN variation_images;

ALTER TABLE public.listing
    RENAME COLUMN variation_availability TO combinations;
