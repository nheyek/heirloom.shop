-- migrate:up
ALTER TABLE shop
    ADD COLUMN short_id VARCHAR(10) UNIQUE;

ALTER TABLE listing
    ADD COLUMN short_id VARCHAR(10) UNIQUE;

CREATE INDEX idx_shop_short_id ON shop(short_id);
CREATE INDEX idx_listing_short_id ON listing(short_id);

-- migrate:down
DROP INDEX IF EXISTS idx_listing_short_id;
DROP INDEX IF EXISTS idx_shop_short_id;

ALTER TABLE listing
    DROP COLUMN IF EXISTS short_id;

ALTER TABLE shop
    DROP COLUMN IF EXISTS short_id;
