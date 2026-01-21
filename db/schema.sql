SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: app_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.app_user (
    id integer NOT NULL,
    username character varying(64) NOT NULL,
    email character varying(128) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: app_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.app_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: app_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.app_user_id_seq OWNED BY public.app_user.id;


--
-- Name: country; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.country (
    code character(2) NOT NULL,
    name character varying(128) NOT NULL
);


--
-- Name: listing; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.listing (
    id integer NOT NULL,
    title character varying(128) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    category_id character varying(64),
    subtitle character varying(256),
    price_dollars integer DEFAULT 0 NOT NULL,
    shop_id integer NOT NULL,
    country_code character(2),
    image_uuids text[] DEFAULT ARRAY[]::text[] NOT NULL,
    shipping_profile_id integer,
    return_exchange_profile_id integer,
    lead_time_days_min integer DEFAULT 0 NOT NULL,
    lead_time_days_max integer DEFAULT 0 NOT NULL,
    shipping_origin_id integer,
    full_descr jsonb
);


--
-- Name: listing_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.listing_category (
    id character varying(64) NOT NULL,
    title character varying(128) NOT NULL,
    subtitle character varying(256),
    image_uuid character varying(36),
    parent_id character varying(64),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: listing_variation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.listing_variation (
    id integer NOT NULL,
    listing_id integer NOT NULL,
    variation_name character varying(128) NOT NULL,
    prices_vary boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: listing_variation_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.listing_variation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: listing_variation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.listing_variation_id_seq OWNED BY public.listing_variation.id;


--
-- Name: listing_variation_option; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.listing_variation_option (
    id integer NOT NULL,
    listing_variation_id integer NOT NULL,
    option_name character varying(128) NOT NULL,
    additional_price_us_dollars numeric(6,2) DEFAULT 0.00 NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: listing_variation_option_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.listing_variation_option_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: listing_variation_option_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.listing_variation_option_id_seq OWNED BY public.listing_variation_option.id;


--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.listing.id;


--
-- Name: return_exchange_profile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.return_exchange_profile (
    id integer NOT NULL,
    profile_name character varying(128) NOT NULL,
    return_window_days integer DEFAULT 30 NOT NULL,
    additional_details text,
    accept_returns boolean DEFAULT false NOT NULL,
    accept_exchanges boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    standard_profile_key character varying(64)
);


--
-- Name: return_exchange_profile_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.return_exchange_profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: return_exchange_profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.return_exchange_profile_id_seq OWNED BY public.return_exchange_profile.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: shipping_origin; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shipping_origin (
    id integer NOT NULL,
    location_name character varying(128) NOT NULL,
    origin_zip numeric(5,0) NOT NULL,
    shop_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: ship_location_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ship_location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ship_location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ship_location_id_seq OWNED BY public.shipping_origin.id;


--
-- Name: shipping_profile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shipping_profile (
    id integer NOT NULL,
    profile_name character varying(128) NOT NULL,
    flat_shipping_rate_us_dollars numeric(6,2),
    shipping_days_min integer,
    shipping_days_max integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    shop_id integer,
    standard_profile_key character varying(64)
);


--
-- Name: shipping_profile_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shipping_profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shipping_profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shipping_profile_id_seq OWNED BY public.shipping_profile.id;


--
-- Name: shop; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shop (
    id integer NOT NULL,
    title character varying(128) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    profile_rich_text text,
    profile_image_uuid character varying(36),
    shop_location character varying(64),
    classification character varying(32),
    country_code character(2),
    category_icon character varying(64)
);


--
-- Name: shop_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shop_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shop_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shop_id_seq OWNED BY public.shop.id;


--
-- Name: shop_user_role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shop_user_role (
    id integer NOT NULL,
    shop_id integer NOT NULL,
    user_id integer NOT NULL,
    shop_role character varying(32) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: shop_user_role_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shop_user_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shop_user_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shop_user_role_id_seq OWNED BY public.shop_user_role.id;


--
-- Name: app_user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.app_user ALTER COLUMN id SET DEFAULT nextval('public.app_user_id_seq'::regclass);


--
-- Name: listing id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: listing_variation id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing_variation ALTER COLUMN id SET DEFAULT nextval('public.listing_variation_id_seq'::regclass);


--
-- Name: listing_variation_option id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing_variation_option ALTER COLUMN id SET DEFAULT nextval('public.listing_variation_option_id_seq'::regclass);


--
-- Name: return_exchange_profile id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.return_exchange_profile ALTER COLUMN id SET DEFAULT nextval('public.return_exchange_profile_id_seq'::regclass);


--
-- Name: shipping_origin id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shipping_origin ALTER COLUMN id SET DEFAULT nextval('public.ship_location_id_seq'::regclass);


--
-- Name: shipping_profile id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shipping_profile ALTER COLUMN id SET DEFAULT nextval('public.shipping_profile_id_seq'::regclass);


--
-- Name: shop id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shop ALTER COLUMN id SET DEFAULT nextval('public.shop_id_seq'::regclass);


--
-- Name: shop_user_role id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shop_user_role ALTER COLUMN id SET DEFAULT nextval('public.shop_user_role_id_seq'::regclass);


--
-- Name: app_user app_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT app_user_pkey PRIMARY KEY (id);


--
-- Name: country country_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (code);


--
-- Name: listing_category listing_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing_category
    ADD CONSTRAINT listing_category_pkey PRIMARY KEY (id);


--
-- Name: listing_variation_option listing_variation_option_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing_variation_option
    ADD CONSTRAINT listing_variation_option_pkey PRIMARY KEY (id);


--
-- Name: listing_variation listing_variation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing_variation
    ADD CONSTRAINT listing_variation_pkey PRIMARY KEY (id);


--
-- Name: listing product_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: return_exchange_profile return_exchange_profile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.return_exchange_profile
    ADD CONSTRAINT return_exchange_profile_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: shipping_origin ship_location_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shipping_origin
    ADD CONSTRAINT ship_location_pkey PRIMARY KEY (id);


--
-- Name: shipping_profile shipping_profile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shipping_profile
    ADD CONSTRAINT shipping_profile_pkey PRIMARY KEY (id);


--
-- Name: shop shop_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shop
    ADD CONSTRAINT shop_pkey PRIMARY KEY (id);


--
-- Name: shop_user_role shop_user_role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shop_user_role
    ADD CONSTRAINT shop_user_role_pkey PRIMARY KEY (id);


--
-- Name: listing_variation unique_name_per_listing; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing_variation
    ADD CONSTRAINT unique_name_per_listing UNIQUE (listing_id, variation_name);


--
-- Name: listing_variation_option unique_option_per_variation; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing_variation_option
    ADD CONSTRAINT unique_option_per_variation UNIQUE (listing_variation_id, option_name);


--
-- Name: shipping_origin unique_shop_origin_zip; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shipping_origin
    ADD CONSTRAINT unique_shop_origin_zip UNIQUE (shop_id, origin_zip);


--
-- Name: shipping_profile unique_shop_standard_profile_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shipping_profile
    ADD CONSTRAINT unique_shop_standard_profile_key UNIQUE (standard_profile_key);


--
-- Name: return_exchange_profile unique_standard_profile_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.return_exchange_profile
    ADD CONSTRAINT unique_standard_profile_key UNIQUE (standard_profile_key);


--
-- Name: app_user unique_username; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- Name: listing listing_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing
    ADD CONSTRAINT listing_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.listing_category(id) ON DELETE SET NULL;


--
-- Name: listing_category listing_category_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing_category
    ADD CONSTRAINT listing_category_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.listing_category(id) ON DELETE SET NULL;


--
-- Name: listing listing_country_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing
    ADD CONSTRAINT listing_country_code_fkey FOREIGN KEY (country_code) REFERENCES public.country(code) ON DELETE SET NULL;


--
-- Name: listing listing_return_exchange_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing
    ADD CONSTRAINT listing_return_exchange_profile_id_fkey FOREIGN KEY (return_exchange_profile_id) REFERENCES public.return_exchange_profile(id) ON DELETE SET NULL;


--
-- Name: listing listing_shipping_origin_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing
    ADD CONSTRAINT listing_shipping_origin_id_fkey FOREIGN KEY (shipping_origin_id) REFERENCES public.shipping_origin(id) ON DELETE SET NULL;


--
-- Name: listing listing_shipping_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing
    ADD CONSTRAINT listing_shipping_profile_id_fkey FOREIGN KEY (shipping_profile_id) REFERENCES public.shipping_profile(id) ON DELETE SET NULL;


--
-- Name: listing listing_shop_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing
    ADD CONSTRAINT listing_shop_id_fkey FOREIGN KEY (shop_id) REFERENCES public.shop(id) ON DELETE CASCADE;


--
-- Name: listing_variation listing_variation_listing_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing_variation
    ADD CONSTRAINT listing_variation_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES public.listing(id) ON DELETE CASCADE;


--
-- Name: listing_variation_option listing_variation_option_listing_variation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listing_variation_option
    ADD CONSTRAINT listing_variation_option_listing_variation_id_fkey FOREIGN KEY (listing_variation_id) REFERENCES public.listing_variation(id) ON DELETE CASCADE;


--
-- Name: shipping_origin ship_location_shop_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shipping_origin
    ADD CONSTRAINT ship_location_shop_id_fkey FOREIGN KEY (shop_id) REFERENCES public.shop(id) ON DELETE CASCADE;


--
-- Name: shipping_profile shipping_profile_shop_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shipping_profile
    ADD CONSTRAINT shipping_profile_shop_id_fkey FOREIGN KEY (shop_id) REFERENCES public.shop(id) ON DELETE CASCADE;


--
-- Name: shop shop_country_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shop
    ADD CONSTRAINT shop_country_code_fkey FOREIGN KEY (country_code) REFERENCES public.country(code) ON DELETE SET NULL;


--
-- Name: shop_user_role shop_user_role_shop_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shop_user_role
    ADD CONSTRAINT shop_user_role_shop_id_fkey FOREIGN KEY (shop_id) REFERENCES public.shop(id) ON DELETE CASCADE;


--
-- Name: shop_user_role shop_user_role_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shop_user_role
    ADD CONSTRAINT shop_user_role_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.app_user(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20250724200401'),
    ('20250805180143'),
    ('20250913005316'),
    ('20251010152025'),
    ('20251023163605'),
    ('20251125181457'),
    ('20251126162741'),
    ('20251208210850'),
    ('20251209162737'),
    ('20251229185344'),
    ('20251230150327'),
    ('20251230152757'),
    ('20260109202903'),
    ('20260116151037'),
    ('20260116151954'),
    ('20260116154907'),
    ('20260116161320'),
    ('20260116185227'),
    ('20260116185549'),
    ('20260118193651'),
    ('20260118204227'),
    ('20260118205636'),
    ('20260121153310');
