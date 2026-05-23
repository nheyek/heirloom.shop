-- migrate:up

ALTER TABLE public.shop
    DROP COLUMN category_icon;

-- migrate:down

ALTER TABLE public.shop
    ADD COLUMN category_icon character varying(64);
