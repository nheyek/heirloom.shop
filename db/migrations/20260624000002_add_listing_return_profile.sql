-- migrate:up

CREATE TABLE public.listing_return_profile (
    id serial PRIMARY KEY,
    name character varying(64) NOT NULL,
    shop_id integer NOT NULL REFERENCES public.shop(id) ON DELETE CASCADE,
    return_window_days smallint NOT NULL,
    policy_descr_rich_text text,
    accept_returns boolean NOT NULL DEFAULT false,
    is_standard_policy boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.listing
    ADD COLUMN return_profile_id integer REFERENCES public.listing_return_profile(id) ON DELETE SET NULL,
    DROP COLUMN return_exchange_profile_id;

-- migrate:down

ALTER TABLE public.listing
    ADD COLUMN return_exchange_profile_id integer REFERENCES public.return_exchange_profile(id) ON DELETE SET NULL,
    DROP COLUMN return_profile_id;

DROP TABLE public.listing_return_profile;
