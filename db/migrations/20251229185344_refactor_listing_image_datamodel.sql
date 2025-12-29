-- migrate:up

DROP TABLE listing_image;
ALTER TABLE listing ADD COLUMN image_uuids text[] NOT NULL DEFAULT '{}';

-- migrate:down

CREATE TABLE listing_image (
    id SERIAL PRIMARY KEY,
    listing_id INT NOT NULL REFERENCES listing(id) ON DELETE CASCADE,
    image_uuid VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE DROP COLUMN image_uuids;