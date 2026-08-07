-- migrate:up
CREATE TABLE public.featured_shop (
    id serial PRIMARY KEY,
    shop_id integer NOT NULL REFERENCES public.shop(id) ON DELETE CASCADE,
    UNIQUE (shop_id)
);

CREATE TABLE public.featured_listing (
    id serial PRIMARY KEY,
    listing_id integer NOT NULL REFERENCES public.listing(id) ON DELETE CASCADE,
    UNIQUE (listing_id)
);

-- migrate:down
DROP TABLE public.featured_listing;
DROP TABLE public.featured_shop;
