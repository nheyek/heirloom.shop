-- migrate:up

ALTER TABLE public.listing
    ALTER COLUMN category_id SET NOT NULL;

ALTER TABLE public.listing
    DROP CONSTRAINT listing_category_id_fkey;

ALTER TABLE public.listing
    ADD CONSTRAINT listing_category_id_fkey
        FOREIGN KEY (category_id) REFERENCES public.listing_category(id) ON DELETE RESTRICT;

-- migrate:down

ALTER TABLE public.listing
    ALTER COLUMN category_id DROP NOT NULL;

ALTER TABLE public.listing
    DROP CONSTRAINT listing_category_id_fkey;

ALTER TABLE public.listing
    ADD CONSTRAINT listing_category_id_fkey
        FOREIGN KEY (category_id) REFERENCES public.listing_category(id) ON DELETE SET NULL;
