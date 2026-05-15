-- migrate:up

ALTER TABLE public.shop
    ADD COLUMN direct_fulfillment boolean NOT NULL DEFAULT true;

-- migrate:down

ALTER TABLE public.shop
    DROP COLUMN direct_fulfillment;
