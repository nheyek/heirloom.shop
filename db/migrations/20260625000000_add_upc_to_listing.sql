-- migrate:up
ALTER TABLE public.listing
    ADD COLUMN upc character varying(12);

-- migrate:down
ALTER TABLE public.listing
    DROP COLUMN upc;
