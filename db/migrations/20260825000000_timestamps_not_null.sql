-- migrate:up
ALTER TABLE public.app_order
    ALTER COLUMN created_at SET NOT NULL,
    ALTER COLUMN updated_at SET NOT NULL;

ALTER TABLE public.app_user
    ALTER COLUMN created_at SET NOT NULL,
    ALTER COLUMN updated_at SET NOT NULL;

ALTER TABLE public.listing
    ALTER COLUMN created_at SET NOT NULL,
    ALTER COLUMN updated_at SET NOT NULL;

ALTER TABLE public.listing_category
    ALTER COLUMN created_at SET NOT NULL,
    ALTER COLUMN updated_at SET NOT NULL;

ALTER TABLE public.listing_personalization_profile
    ALTER COLUMN created_at SET NOT NULL,
    ALTER COLUMN updated_at SET NOT NULL;

ALTER TABLE public.listing_processing_profile
    ALTER COLUMN created_at SET NOT NULL,
    ALTER COLUMN updated_at SET NOT NULL;

ALTER TABLE public.listing_return_profile
    ALTER COLUMN created_at SET NOT NULL,
    ALTER COLUMN updated_at SET NOT NULL;

ALTER TABLE public.listing_shipping_profile
    ALTER COLUMN created_at SET NOT NULL,
    ALTER COLUMN updated_at SET NOT NULL;

ALTER TABLE public.server_error_log
    ALTER COLUMN created_at SET NOT NULL;

ALTER TABLE public.shop
    ALTER COLUMN created_at SET NOT NULL,
    ALTER COLUMN updated_at SET NOT NULL;

ALTER TABLE public.shop_user_role
    ALTER COLUMN created_at SET NOT NULL,
    ALTER COLUMN updated_at SET NOT NULL;

ALTER TABLE public.user_favorite_listing
    ALTER COLUMN created_at SET NOT NULL;

ALTER TABLE public.user_favorite_shop
    ALTER COLUMN created_at SET NOT NULL;

-- migrate:down
ALTER TABLE public.app_order
    ALTER COLUMN created_at DROP NOT NULL,
    ALTER COLUMN updated_at DROP NOT NULL;

ALTER TABLE public.app_user
    ALTER COLUMN created_at DROP NOT NULL,
    ALTER COLUMN updated_at DROP NOT NULL;

ALTER TABLE public.listing
    ALTER COLUMN created_at DROP NOT NULL,
    ALTER COLUMN updated_at DROP NOT NULL;

ALTER TABLE public.listing_category
    ALTER COLUMN created_at DROP NOT NULL,
    ALTER COLUMN updated_at DROP NOT NULL;

ALTER TABLE public.listing_personalization_profile
    ALTER COLUMN created_at DROP NOT NULL,
    ALTER COLUMN updated_at DROP NOT NULL;

ALTER TABLE public.listing_processing_profile
    ALTER COLUMN created_at DROP NOT NULL,
    ALTER COLUMN updated_at DROP NOT NULL;

ALTER TABLE public.listing_return_profile
    ALTER COLUMN created_at DROP NOT NULL,
    ALTER COLUMN updated_at DROP NOT NULL;

ALTER TABLE public.listing_shipping_profile
    ALTER COLUMN created_at DROP NOT NULL,
    ALTER COLUMN updated_at DROP NOT NULL;

ALTER TABLE public.server_error_log
    ALTER COLUMN created_at DROP NOT NULL;

ALTER TABLE public.shop
    ALTER COLUMN created_at DROP NOT NULL,
    ALTER COLUMN updated_at DROP NOT NULL;

ALTER TABLE public.shop_user_role
    ALTER COLUMN created_at DROP NOT NULL,
    ALTER COLUMN updated_at DROP NOT NULL;

ALTER TABLE public.user_favorite_listing
    ALTER COLUMN created_at DROP NOT NULL;

ALTER TABLE public.user_favorite_shop
    ALTER COLUMN created_at DROP NOT NULL;
