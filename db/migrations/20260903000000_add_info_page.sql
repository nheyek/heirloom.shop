-- migrate:up
CREATE TABLE public.info_page (
    key character varying(64) PRIMARY KEY,
    content_html text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- migrate:down
DROP TABLE public.info_page;
