-- migrate:up

CREATE TABLE public.listing_personalization_profile (
    id serial PRIMARY KEY,
    name character varying(64) NOT NULL,
    shop_id integer NOT NULL REFERENCES public.shop(id) ON DELETE CASCADE,
    cost_cents integer NOT NULL,
    helper_text character varying(256),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT listing_personalization_profile_shop_name_unique UNIQUE (shop_id, name)
);

ALTER TABLE public.listing
    ADD COLUMN personalization_profile_id integer REFERENCES public.listing_personalization_profile(id) ON DELETE SET NULL;

-- migrate:down

ALTER TABLE public.listing
    DROP COLUMN personalization_profile_id;

DROP TABLE public.listing_personalization_profile;
