-- migrate:up
DELETE FROM public.app_order_item;
DELETE FROM public.app_order;
ALTER TABLE public.app_order_item DROP COLUMN quantity;

-- migrate:down
ALTER TABLE public.app_order_item ADD COLUMN quantity integer NOT NULL;
