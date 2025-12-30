-- migrate:up
ALTER TABLE listing 
ALTER COLUMN image_uuids SET DEFAULT ARRAY[]::text[];

-- migrate:down

ALTER TABLE listing 
ALTER COLUMN image_uuids SET DEFAULT '{}';