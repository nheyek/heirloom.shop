-- migrate:up
ALTER TABLE public.app_order
    ADD COLUMN payment_details jsonb;

-- migrate:down
ALTER TABLE public.app_order
    DROP COLUMN payment_details;
