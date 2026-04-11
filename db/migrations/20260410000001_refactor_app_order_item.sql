-- migrate:up
DELETE FROM public.app_order_item;
DELETE FROM public.app_order;
ALTER TABLE public.app_order_item DROP COLUMN estimated_delivery;
ALTER TABLE public.app_order_item ADD COLUMN quantity integer NOT NULL;

-- migrate:down
ALTER TABLE public.app_order_item DROP COLUMN quantity;
ALTER TABLE public.app_order_item ADD COLUMN estimated_delivery character varying(255);
