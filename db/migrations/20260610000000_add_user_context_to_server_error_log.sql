-- migrate:up
ALTER TABLE public.server_error_log
    ADD COLUMN user_email text,
    ADD COLUMN ip_address text,
    ADD COLUMN user_agent text;

-- migrate:down
ALTER TABLE public.server_error_log
    DROP COLUMN user_email,
    DROP COLUMN ip_address,
    DROP COLUMN user_agent;
