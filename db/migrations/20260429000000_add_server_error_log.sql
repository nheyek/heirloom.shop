-- migrate:up

CREATE TABLE public.server_error_log (
    id SERIAL PRIMARY KEY,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    status_code integer,
    method character varying(10),
    path text,
    message text,
    stack text,
    request_body jsonb,
    request_query jsonb
);

-- migrate:down

DROP TABLE public.server_error_log;
