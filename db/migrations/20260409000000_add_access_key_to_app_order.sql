-- migrate:up
ALTER TABLE public.app_order ADD COLUMN access_key VARCHAR(64);
UPDATE public.app_order SET access_key = md5(random()::text) WHERE access_key IS NULL;
ALTER TABLE public.app_order ALTER COLUMN access_key SET NOT NULL;

-- migrate:down
ALTER TABLE public.app_order DROP COLUMN access_key;
