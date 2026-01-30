-- migrate:up
CREATE TABLE user_saved_listing (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
    listing_id INT NOT NULL REFERENCES listing(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, listing_id)
);

CREATE INDEX idx_user_saved_listing_user_id ON user_saved_listing(user_id);
CREATE INDEX idx_user_saved_listing_listing_id ON user_saved_listing(listing_id);

-- migrate:down
DROP TABLE IF EXISTS user_saved_listing;
