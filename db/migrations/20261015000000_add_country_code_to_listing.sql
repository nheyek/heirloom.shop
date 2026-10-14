-- migrate:up
ALTER TABLE public.listing
    ADD COLUMN country_code character(2)
        REFERENCES public.country(code) ON UPDATE NO ACTION ON DELETE SET NULL;

UPDATE public.listing
SET country_code = shop.country_code
FROM public.shop
WHERE shop.id = listing.shop_id;

-- migrate:down
ALTER TABLE public.listing
    DROP COLUMN country_code;
