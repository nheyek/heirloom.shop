-- migrate:up

DELETE FROM public.shipping_profile WHERE shop_id IS NULL;

ALTER TABLE public.shipping_profile
    RENAME COLUMN profile_name TO name;

ALTER TABLE public.shipping_profile
    ALTER COLUMN name TYPE character varying(64),
    ALTER COLUMN shop_id SET NOT NULL,
    ALTER COLUMN shipping_days_min SET NOT NULL,
    ALTER COLUMN shipping_days_max SET NOT NULL,
    ADD COLUMN origin_zip numeric(5,0) NOT NULL DEFAULT 0,
    DROP COLUMN standard_profile_key;

ALTER TABLE public.shipping_profile
    ALTER COLUMN origin_zip DROP DEFAULT;

ALTER TABLE public.listing
    DROP COLUMN shipping_origin_id;

DROP TABLE public.shipping_origin;

-- migrate:down

CREATE TABLE public.shipping_origin (
    id serial PRIMARY KEY,
    location_name character varying(128) NOT NULL,
    origin_zip numeric(5,0) NOT NULL,
    shop_id integer NOT NULL REFERENCES public.shop(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.listing
    ADD COLUMN shipping_origin_id integer REFERENCES public.shipping_origin(id) ON DELETE SET NULL;

ALTER TABLE public.shipping_profile
    ADD COLUMN standard_profile_key character varying(64) UNIQUE,
    DROP COLUMN origin_zip,
    ALTER COLUMN shop_id DROP NOT NULL,
    ALTER COLUMN shipping_days_min DROP NOT NULL,
    ALTER COLUMN shipping_days_max DROP NOT NULL,
    ALTER COLUMN name TYPE character varying(128);

ALTER TABLE public.shipping_profile
    RENAME COLUMN name TO profile_name;
