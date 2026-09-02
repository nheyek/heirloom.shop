-- migrate:up
ALTER TABLE public.app_order
    ADD COLUMN shipments jsonb DEFAULT '[]'::jsonb NOT NULL;

-- migrate:down
ALTER TABLE public.app_order
    DROP COLUMN shipments;
