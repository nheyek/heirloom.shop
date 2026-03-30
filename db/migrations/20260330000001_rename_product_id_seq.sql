-- migrate:up
ALTER SEQUENCE product_id_seq RENAME TO listing_id_seq;

-- migrate:down
ALTER SEQUENCE listing_id_seq RENAME TO product_id_seq;
