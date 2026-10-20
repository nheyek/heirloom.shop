-- migrate:up
ALTER TABLE public.shop
    ALTER COLUMN classification TYPE character varying(64);

-- migrate:down
ALTER TABLE public.shop
    ALTER COLUMN classification TYPE character varying(32);
