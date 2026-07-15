-- migrate:up

ALTER TABLE public.listing_shipping_profile
    ALTER COLUMN origin_zip TYPE character varying(5) USING lpad(origin_zip::text, 5, '0');

-- migrate:down

ALTER TABLE public.listing_shipping_profile
    ALTER COLUMN origin_zip TYPE numeric(5,0) USING origin_zip::numeric;
