-- migrate:up
ALTER TABLE public.listing
    ADD COLUMN variations jsonb;

DROP TABLE public.listing_variation_option;
DROP TABLE public.listing_variation;

-- migrate:down
ALTER TABLE public.listing
    DROP COLUMN variations;

CREATE TABLE public.listing_variation (
    id serial PRIMARY KEY,
    listing_id integer NOT NULL REFERENCES public.listing(id) ON UPDATE NO ACTION ON DELETE CASCADE,
    variation_name character varying(128) NOT NULL,
    prices_vary boolean NOT NULL DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_name_per_listing UNIQUE (listing_id, variation_name)
);

CREATE TABLE public.listing_variation_option (
    id serial PRIMARY KEY,
    listing_variation_id integer NOT NULL REFERENCES public.listing_variation(id) ON UPDATE NO ACTION ON DELETE CASCADE,
    option_name character varying(128) NOT NULL,
    additional_price_cents integer NOT NULL DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_option_per_variation UNIQUE (listing_variation_id, option_name)
);
