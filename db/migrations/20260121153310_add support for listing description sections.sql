-- migrate:up

ALTER TABLE listing
    ADD COLUMN full_descr JSONB,
    DROP COLUMN descr_rich_text;

-- migrate:down

ALTER TABLE listing
    ADD COLUMN descr_rich_text TEXT,
    DROP COLUMN full_descr;