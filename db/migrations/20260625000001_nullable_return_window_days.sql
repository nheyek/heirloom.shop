-- migrate:up
ALTER TABLE public.listing_return_profile
    ADD COLUMN policy_type character varying(16) NOT NULL DEFAULT 'standard';

UPDATE public.listing_return_profile
    SET policy_type = CASE
        WHEN accept_returns = false THEN 'no_returns'
        WHEN is_standard_policy = true THEN 'standard'
        ELSE 'custom'
    END;

ALTER TABLE public.listing_return_profile
    DROP COLUMN accept_returns,
    DROP COLUMN is_standard_policy,
    ALTER COLUMN return_window_days DROP NOT NULL;

-- migrate:down
ALTER TABLE public.listing_return_profile
    ADD COLUMN accept_returns boolean NOT NULL DEFAULT false,
    ADD COLUMN is_standard_policy boolean NOT NULL DEFAULT false;

UPDATE public.listing_return_profile
    SET accept_returns = policy_type != 'no_returns',
        is_standard_policy = policy_type = 'standard';

UPDATE public.listing_return_profile SET return_window_days = 0 WHERE return_window_days IS NULL;

ALTER TABLE public.listing_return_profile
    ALTER COLUMN return_window_days SET NOT NULL,
    DROP COLUMN policy_type;
