-- migrate:up
ALTER TABLE listing ALTER COLUMN short_id SET NOT NULL;

-- migrate:down
ALTER TABLE listing ALTER COLUMN short_id DROP NOT NULL;
