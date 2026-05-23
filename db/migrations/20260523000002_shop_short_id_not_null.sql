-- migrate:up

DELETE FROM public.shop WHERE short_id IS NULL;

ALTER TABLE public.shop
    ALTER COLUMN short_id SET NOT NULL;

-- migrate:down

ALTER TABLE public.shop
    ALTER COLUMN short_id DROP NOT NULL;
