-- migrate:up
ALTER TABLE public.listing
    ADD COLUMN combinations jsonb;

-- migrate:down
ALTER TABLE public.listing
    DROP COLUMN combinations;
