-- migrate:up

CREATE TABLE public.listing_processing_profile (
    id serial PRIMARY KEY,
    name character varying(64) NOT NULL,
    shop_id integer NOT NULL REFERENCES public.shop(id) ON DELETE CASCADE,
    min_days smallint NOT NULL,
    max_days smallint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.listing
    ADD COLUMN processing_profile_id integer REFERENCES public.listing_processing_profile(id) ON DELETE SET NULL,
    DROP COLUMN lead_time_days_min,
    DROP COLUMN lead_time_days_max;

-- migrate:down

ALTER TABLE public.listing
    ADD COLUMN lead_time_days_min integer NOT NULL DEFAULT 0,
    ADD COLUMN lead_time_days_max integer NOT NULL DEFAULT 0,
    DROP COLUMN processing_profile_id;

DROP TABLE public.listing_processing_profile;
