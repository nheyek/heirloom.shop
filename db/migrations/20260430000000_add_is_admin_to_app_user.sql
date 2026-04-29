-- migrate:up

ALTER TABLE public.app_user
    ADD COLUMN is_admin boolean NOT NULL DEFAULT false;

-- migrate:down

ALTER TABLE public.app_user
    DROP COLUMN is_admin;
