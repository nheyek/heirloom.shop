-- migrate:up
CREATE TABLE public.user_favorite_shop (
    id serial PRIMARY KEY,
    user_id integer NOT NULL REFERENCES public.app_user(id) ON DELETE CASCADE,
    shop_id integer NOT NULL REFERENCES public.shop(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, shop_id)
);

CREATE INDEX ON public.user_favorite_shop (user_id);

-- migrate:down
DROP TABLE public.user_favorite_shop;
