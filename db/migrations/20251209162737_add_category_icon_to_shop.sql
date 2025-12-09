-- migrate:up

ALTER TABLE shop ADD COLUMN category_icon VARCHAR(64);

-- migrate:down

ALTER TABLE shop DROP COLUMN IF EXISTS category_icon;