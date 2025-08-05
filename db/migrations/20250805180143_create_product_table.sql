-- migrate:up

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    description_text VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down

DROP TABLE product;