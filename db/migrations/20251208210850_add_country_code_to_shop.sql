-- migrate:up

ALTER TABLE shop
    ADD COLUMN country_code CHAR(2) REFERENCES country(code) ON DELETE SET NULL;

-- migrate:down

ALTER TABLE shop
    DROP COLUMN IF EXISTS country_code;