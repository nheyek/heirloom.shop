-- migrate:up

ALTER TABLE shop
    ADD COLUMN shop_location VARCHAR (64),
    ADD COLUMN classification VARCHAR (32);

-- migrate:down

ALTER TABLE shop_location DROP COLUMN shop_location;
ALTER TABLE shop_location DROP COLUMN classification;