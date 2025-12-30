-- migrate:up

ALTER TABLE listing DROP COLUMN primary_image_uuid;

-- migrate:down

ALTER TABLE listing ADD COLUMN primary_image_uuid VARCHAR(36);