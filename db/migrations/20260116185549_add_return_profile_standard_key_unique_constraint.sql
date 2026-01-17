-- migrate:up

ALTER TABLE return_exchange_profile ADD CONSTRAINT unique_standard_profile_key UNIQUE(standard_profile_key);

-- migrate:down

ALTER TABLE return_exchange_profile DROP CONSTRAINT IF EXISTS unique_standard_profile_key;