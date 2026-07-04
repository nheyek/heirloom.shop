-- migrate:up
ALTER TABLE listing DROP COLUMN IF EXISTS upc;

-- migrate:down
ALTER TABLE listing ADD COLUMN upc character varying(12);
