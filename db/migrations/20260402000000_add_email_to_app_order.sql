-- migrate:up
ALTER TABLE public.app_order ADD COLUMN email VARCHAR(255);
UPDATE public.app_order SET email = 'test@heirloom.shop' WHERE email IS NULL;
ALTER TABLE public.app_order ALTER COLUMN email SET NOT NULL;

-- migrate:down
ALTER TABLE public.app_order DROP COLUMN email;
