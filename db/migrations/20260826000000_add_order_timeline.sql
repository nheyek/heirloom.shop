-- migrate:up
ALTER TABLE public.app_order
    ADD COLUMN timeline jsonb DEFAULT '[]'::jsonb NOT NULL;

-- migrate:down
ALTER TABLE public.app_order
    DROP COLUMN timeline;
