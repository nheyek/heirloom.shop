-- migrate:up
TRUNCATE TABLE public.app_order;
ALTER SEQUENCE public.app_order_id_seq RESTART WITH 1;

CREATE TABLE public.app_order_item (
    id SERIAL PRIMARY KEY,
    order_id integer NOT NULL REFERENCES public.app_order(id) ON DELETE CASCADE,
    snapshot jsonb NOT NULL,
    fulfillment jsonb NOT NULL DEFAULT '{}'::jsonb,
    estimated_delivery character varying(255)
);

ALTER TABLE public.app_order DROP COLUMN items;

-- migrate:down
ALTER TABLE public.app_order ADD COLUMN items jsonb NOT NULL DEFAULT '[]'::jsonb;
DROP TABLE public.app_order_item;
