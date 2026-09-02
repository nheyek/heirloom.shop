-- migrate:up
ALTER TABLE public.app_order
    DROP COLUMN order_status;

-- migrate:down
ALTER TABLE public.app_order
    ADD COLUMN order_status varchar(32);
