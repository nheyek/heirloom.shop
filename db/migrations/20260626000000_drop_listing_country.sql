-- migrate:up
ALTER TABLE public.listing
    DROP COLUMN country_code;

-- migrate:down
ALTER TABLE public.listing
    ADD COLUMN country_code character(2) REFERENCES public.country(code) ON UPDATE NO ACTION ON DELETE NO ACTION;
