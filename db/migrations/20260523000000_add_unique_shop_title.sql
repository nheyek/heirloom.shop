-- migrate:up

ALTER TABLE public.shop
    ADD CONSTRAINT shop_title_key UNIQUE (title);

-- migrate:down

ALTER TABLE public.shop
    DROP CONSTRAINT shop_title_key;
