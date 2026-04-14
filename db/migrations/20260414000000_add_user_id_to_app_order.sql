-- migrate:up
ALTER TABLE app_order ADD COLUMN user_id INTEGER REFERENCES app_user(id);

-- migrate:down
ALTER TABLE app_order DROP COLUMN user_id;
