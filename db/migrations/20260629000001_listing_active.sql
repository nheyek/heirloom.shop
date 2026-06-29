-- migrate:up
ALTER TABLE listing ADD COLUMN active boolean NOT NULL DEFAULT false;

-- migrate:down
ALTER TABLE listing DROP COLUMN IF EXISTS active;
