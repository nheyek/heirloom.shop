-- migrate:up
ALTER TABLE listing RENAME COLUMN active TO available;

-- migrate:down
ALTER TABLE listing RENAME COLUMN available TO active;
