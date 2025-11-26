-- migrate:up
CREATE TABLE country (
    code CHAR(2) PRIMARY KEY,
    name VARCHAR(128) NOT NULL
);

ALTER TABLE listing
    ADD COLUMN country_code CHAR(2) REFERENCES country(code) ON DELETE SET NULL;

-- migrate:down

ALTER TABLE listing
    DROP COLUMN IF EXISTS country_code;

DROP TABLE IF EXISTS country;