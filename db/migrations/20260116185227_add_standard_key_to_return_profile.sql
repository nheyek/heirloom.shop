-- migrate:up

ALTER TABLE return_exchange_profile ADD COLUMN standard_profile_key VARCHAR(64) NULL;

-- migrate:down

ALTER TABLE return_exchange_profile DROP COLUMN IF EXISTS standard_profile_key;