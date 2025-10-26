-- migrate:up

ALTER TABLE app_user
    ADD CONSTRAINT unique_username UNIQUE (username);

-- migrate:down

ALTER TABLE app_user
    DROP CONSTRAINT IF EXISTS unique_username;