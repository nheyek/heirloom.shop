DO $$

DECLARE
    admin_user_1_username CONSTANT VARCHAR := 'nick@heyek.com';

    default_shipping_origin_location_name VARCHAR := 'Warehouse';
    default_shipping_profile_id INT := (SELECT id FROM shipping_profile WHERE standard_profile_key = 'GROUND_FREE');
    default_return_profile_id INT := (SELECT id FROM return_exchange_profile WHERE standard_profile_key = '30DAY_RETURN_EXCHANGE');

    sample_shop_1_id INT := 1;
    sample_shop_1_title VARCHAR := 'Studebaker Metals';
    sample_shop_1_profile_image_uuid VARCHAR := '231210EF-D8F8-4A33-96E0-2F8FBACD43AB';
    sample_shop_1_location VARCHAR := 'Pittsburgh, PA';
    sample_shop_1_classification VARCHAR := 'Jewelry & Accessories';
    sample_shop_1_country_code CHAR(2) := 'US';
    sample_shop_1_category_icon VARCHAR := 'RING';
    sample_shop_1_origin_zip NUMERIC(5, 0) := 15201;

    sample_shop_2_id INT := 2;
    sample_shop_2_title VARCHAR := 'James & James';
    sample_shop_2_profile_image_uuid VARCHAR := '7D60F8F7-ACEC-4A2F-9E80-C5ED6F82A0DA';
    sample_shop_2_location VARCHAR := 'Springdale, AR';
    sample_shop_2_classification VARCHAR := 'Hardwood Furniture';
    sample_shop_2_country_code CHAR(2) := 'US';
    sample_shop_2_category_icon VARCHAR := 'CHAIR';
    sample_shop_2_origin_zip NUMERIC(5, 0) := 72764;

    sample_shop_3_id INT := 3;
    sample_shop_3_title VARCHAR := 'Roseland';
    sample_shop_3_profile_image_uuid VARCHAR := '0D35A7E4-68BD-4986-9CAC-4A343FA66269';
    sample_shop_3_location VARCHAR := 'Hudson Valley, NY';
    sample_shop_3_classification VARCHAR := 'Furniture & Housewares';
    sample_shop_3_country_code CHAR(2) := 'US';
    sample_shop_3_category_icon VARCHAR := 'CHAIR';
    sample_shop_3_origin_zip NUMERIC(5, 0) := 12534;

    sample_shop_4_id INT := 4;
    sample_shop_4_title VARCHAR := 'Col. Littleton';
    sample_shop_4_profile_image_uuid VARCHAR := '395AD65D-8673-44D7-A2D2-5CD8A5F95BED';
    sample_shop_4_location VARCHAR := 'Lynnville, TN';
    sample_shop_4_classification VARCHAR := 'Traditional Leather Goods';
    sample_shop_4_country_code CHAR(2) := 'US';
    sample_shop_4_category_icon VARCHAR := 'HANDBAG';
    sample_shop_4_origin_zip NUMERIC(5, 0) := 38472;

    sample_shop_5_id INT := 5;
    sample_shop_5_title VARCHAR := 'Michael Michaud';
    sample_shop_5_profile_image_uuid VARCHAR := 'AAE995C6-30AE-4F23-A594-7F160A1D5A05';
    sample_shop_5_location VARCHAR := 'New York';
    sample_shop_5_classification VARCHAR := 'Botanical Jewelry';
    sample_shop_5_country_code CHAR(2) := 'US';
    sample_shop_5_category_icon VARCHAR := 'EARRINGS';
    sample_shop_5_origin_zip NUMERIC(5, 0) := 03051;

    sample_shop_6_id INT := 6;
    sample_shop_6_title VARCHAR := 'Match Pewter';
    sample_shop_6_profile_image_uuid VARCHAR := '22FAADA4-C657-408E-ABCB-7B5DE388BD9C';
    sample_shop_6_location VARCHAR := 'Brescia, Italy';
    sample_shop_6_classification VARCHAR := 'Italian Handmade Pewter';
    sample_shop_6_country_code CHAR(2) := 'IT';
    sample_shop_6_category_icon VARCHAR := 'CANDLESTICK';
    sample_shop_6_origin_zip NUMERIC(5, 0) := 07310;

    sample_listing_1_id INT := 1;
    sample_listing_1_shop_id INT := sample_shop_1_id;
    sample_listing_1_category_id VARCHAR := 'BRACELETS';
    sample_listing_1_title VARCHAR := 'Chain-Link Bracelet';
    sample_listing_1_subtitle VARCHAR := '7mm wide curb chain with hand-formed closure.';
    sample_listing_1_price_dollars INT := 200;
    sample_listing_1_country_code CHAR(2) := 'US';
    sample_listing_1_image_uuids text[] := '{"71E53058-8F01-42EE-B240-245BB0977ED8"}';

    sample_listing_2_id INT := 2;
    sample_listing_2_shop_id INT := sample_shop_1_id;
    sample_listing_2_category_id VARCHAR := 'BRACELETS';
    sample_listing_2_title VARCHAR := 'Cuff Bracelet';
    sample_listing_2_subtitle VARCHAR := 'Hand-forged, classic straight body cuff bracelet.';
    sample_listing_2_price_dollars INT := 125;
    sample_listing_2_country_code CHAR(2) := 'US';
    sample_listing_2_image_uuids text[] := '{"E4EF3812-2D09-4A32-94CE-4DF424B213A4"}';

    sample_listing_3_id INT := 3;
    sample_listing_3_shop_id INT := sample_shop_1_id;
    sample_listing_3_category_id VARCHAR := 'RINGS';
    sample_listing_3_title VARCHAR := 'Band Ring';
    sample_listing_3_subtitle VARCHAR := 'Solid silver or brass band ring in a variety of widths.';
    sample_listing_3_price_dollars INT := 80;
    sample_listing_3_country_code CHAR(2) := 'US';
    sample_listing_3_image_uuids text[] := '{"AD996A1E-9D17-46E8-8023-6250877CFDAC"}';

    sample_listing_4_id INT := 4;
    sample_listing_4_shop_id INT := sample_shop_1_id;
    sample_listing_4_category_id VARCHAR := 'RINGS';
    sample_listing_4_title VARCHAR := 'Signet Ring';
    sample_listing_4_subtitle VARCHAR := 'Classic signet ring with a distinct hand-filed texture on the sides and body of the ring, showing the marks of tool used carve and refine its shape';
    sample_listing_4_price_dollars INT := 45;
    sample_listing_4_country_code CHAR(2) := 'US';
    sample_listing_4_image_uuids text[] := '{"8F44E91A-D1CD-4B48-9A08-A1F439BD8839"}';

    sample_listing_5_id INT := 5;
    sample_listing_5_shop_id INT := sample_shop_2_id;
    sample_listing_5_category_id VARCHAR := 'DINING_TABLES';
    sample_listing_5_title VARCHAR := 'Allyson Dining Table';
    sample_listing_5_subtitle VARCHAR := 'Crafted from Alder hardwood, this turned-leg table exudes timeless allure, transforming any dining space into a haven of sophistication and charm.';
    sample_listing_5_price_dollars INT := 2967;
    sample_listing_5_country_code CHAR(2) := 'US';
    sample_listing_5_image_uuids text[] := '{"8D236EB4-62F3-48D8-A468-4A46DEE32003", "5561CDF1-343A-4AA7-AE24-D099BD97157E", "140D5892-CF55-4611-8BC8-FEDCFFE4614C", "DC7B2D50-361B-4573-A9C8-8AEDB7FC0C7A"}';
    sample_listing_5_lead_time_days_min INT := 42;
    sample_listing_5_lead_time_days_max INT := 56;
    sample_listing_5_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>All James & James pieces are made to order and tailored to your specifications.</p><p>Expertly crafted in your choice of oak or knotty alder, each piece is hand-finished in tones designed to enhance the natural beauty of the wood. A protective polyurethane seal is then applied to ensure lasting durability for everyday use.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<p>The length, width, and height of your table are custom to the dimensions you choose above. That''s the beauty of James & James!</p><p>This tabletop is approx. 1.75” thick with a 3.5” apron (frame of the table). To arrive at the clearance underneath the apron, subtract 5.25” from the table height you select.</p><p>To find the distance between the legs (sides), subtract 11” from the total length selected.</p><p>To arrive at the distance between legs (ends), subtract 9” from the total width selected.</p><p>Please note that each measurement is an approximation, as these pieces are hand-built. We allow for up to 1\" in variation to accommodate the unique nature of handcrafted furniture.</p>"
            },
        {
            "title": "Care",
            "richText": "<p>To preserve the beauty of your piece for years to come, we recommend cleaning with a damp cloth. Avoid harsh chemicals or abrasive products, as they can compromise the finish and damage the surface. Always use trivets or coasters beneath hot or wet items to protect against heat and moisture.</p><p>For lasting quality, place your furniture in a stable indoor environment, away from direct sunlight or extreme temperature fluctuations. Each piece is crafted for indoor living and is not suited for outdoor use.</p>"
        },
        {
            "title": "Warranty",
            "richText": "<p>We are committed to creating furniture made with uncompromising quality and care. Our James & James promise ensures that you can purchase with complete confidence:</p><ul><li>If your piece is not delivered in the correct color, size, or style you ordered, we''ll provide a replacement.</li><li>If your piece arrives damaged, our team will promptly evaluate the issue and repair or replace it—always ensuring your furniture is in perfect working condition as quickly as possible.</li><li>If your piece ever develops an unnatural crack or split, we will repair or replace it under our warranty.</li></ul><p>Because each item is handcrafted from solid wood, natural variations and rustic details are to be expected. These characteristics are what make every piece one-of-a-kind</p>"
        }
    ]';

    sample_listing_6_id INT := 6;
    sample_listing_6_shop_id INT := sample_shop_2_id;
    sample_listing_6_category_id VARCHAR := 'COFFEE_TABLES';
    sample_listing_6_title VARCHAR := 'Floating Top Coffee Table';
    sample_listing_6_subtitle VARCHAR := 'A symbol of meticulous design and enduring quality, the Floating Top Coffee Table showcases a stylishly jointed solid hardwood top that epitomizes seamless beauty and resilience.';
    sample_listing_6_price_dollars INT := 2061;
    sample_listing_6_country_code CHAR(2) := 'US';
    sample_listing_6_image_uuids text[] := '{"9C5A0A04-14A6-4415-B273-9317DFAB20E4"}';
    sample_listing_6_lead_time_days_min INT := 28;
    sample_listing_6_lead_time_days_max INT := 42;

    sample_listing_7_id INT := 7;
    sample_listing_7_shop_id INT := sample_shop_3_id;
    sample_listing_7_category_id VARCHAR := 'SIDE_TABLES';
    sample_listing_7_title VARCHAR := 'Stissing Cocktail Table';
    sample_listing_7_subtitle VARCHAR := 'Hand-forged in Maine, by Matt Foster and the Black Dog Ironworks team, our Martini table was designed for our tavern, Stissing House, in Pine Plains, NY.';
    sample_listing_7_price_dollars INT := 390;
    sample_listing_7_country_code CHAR(2) := 'US';
    sample_listing_7_image_uuids text[] := '{"E2C0607B-160B-41A6-9258-E1EA6AEBC2AB"}';
    sample_listing_7_lead_time_days_min INT := 14;
    sample_listing_7_lead_time_days_max INT := 21;

    sample_listing_8_id INT := 8;
    sample_listing_8_shop_id INT := sample_shop_4_id;
    sample_listing_8_category_id VARCHAR := 'LEATHER_BAGS';
    sample_listing_8_title VARCHAR := 'No. 1943 Navigator Briefcase';
    sample_listing_8_subtitle VARCHAR := 'Stand out with this timeless WWII-inspired full-grain American Buffalo leather briefcase. Meticulously handcrafted in America.';
    sample_listing_8_price_dollars INT := 1160;
    sample_listing_8_country_code CHAR(2) := 'US';
    sample_listing_8_image_uuids text[] := '{"EC0DF0BF-2CC9-4F0F-90BA-9E25A092FE7C"}';

    sample_listing_9_id INT := 9;
    sample_listing_9_shop_id INT := sample_shop_4_id;
    sample_listing_9_category_id VARCHAR := 'LEATHER_BAGS';
    sample_listing_9_title VARCHAR := 'No. 2 Leather Duffel Bag';
    sample_listing_9_subtitle VARCHAR := 'The ultimate weekender/carry-on bag in easy-going, dry-milled American Buffalo.';
    sample_listing_9_price_dollars INT := 1340;
    sample_listing_9_country_code CHAR(2) := 'US';
    sample_listing_9_image_uuids text[] := '{"18A7B73F-AFBE-48AE-A16D-8CC7466B1E9E"}';

    sample_listing_10_id INT := 10;
    sample_listing_10_shop_id INT := sample_shop_6_id;
    sample_listing_10_category_id VARCHAR := 'HOUSEWARES';
    sample_listing_10_title VARCHAR := 'Prato Candlestick, Small, Pair';
    sample_listing_10_subtitle VARCHAR := 'This smaller version of our Prato candlestick is one of our best sellers. These versatile pewter candlesticks are a great way to add that warm glow to a special dinner for two. Or try them dotting the table in multiples to light up a special celebration.';
    sample_listing_10_price_dollars INT := 163;
    sample_listing_10_country_code CHAR(2) := 'IT';
    sample_listing_10_image_uuids text[] := '{"52EC9AC7-82EC-4BE8-ABF0-E49A5C71FB31"}';

    sample_listing_variation_1_id INT := 1;
    sample_listing_variation_1_listing_id INT := sample_listing_5_id;
    sample_listing_variation_1_name VARCHAR := 'Size';
    sample_listing_variation_1_prices_vary BOOLEAN := TRUE;

    sample_variation_option_1_variation_id INT := sample_listing_variation_1_id;
    sample_variation_option_1_name VARCHAR := '72" x 48"';
    sample_variation_option_1_additional_price_us_dollars NUMERIC(6, 2) := 0.00;

    sample_variation_option_2_variation_id INT := sample_listing_variation_1_id;
    sample_variation_option_2_name VARCHAR := '96" x 56"';
    sample_variation_option_2_additional_price_us_dollars NUMERIC(6, 2) := 400.00;

    sample_variation_option_3_variation_id INT := sample_listing_variation_1_id;
    sample_variation_option_3_name VARCHAR := '120" x 60"';
    sample_variation_option_3_additional_price_us_dollars NUMERIC(6, 2) := 800.00;

BEGIN

    INSERT INTO shop (id, title, profile_rich_text, profile_image_uuid, shop_location, classification, country_code, category_icon, created_at, updated_at)
    VALUES
        (sample_shop_1_id, sample_shop_1_title, NULL, sample_shop_1_profile_image_uuid, sample_shop_1_location, sample_shop_1_classification, sample_shop_1_country_code, sample_shop_1_category_icon, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_shop_2_id, sample_shop_2_title, NULL, sample_shop_2_profile_image_uuid, sample_shop_2_location, sample_shop_2_classification, sample_shop_2_country_code, sample_shop_2_category_icon, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_shop_3_id, sample_shop_3_title, NULL, sample_shop_3_profile_image_uuid, sample_shop_3_location, sample_shop_3_classification, sample_shop_3_country_code, sample_shop_3_category_icon, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_shop_4_id, sample_shop_4_title, NULL, sample_shop_4_profile_image_uuid, sample_shop_4_location, sample_shop_4_classification, sample_shop_4_country_code, sample_shop_4_category_icon, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_shop_5_id, sample_shop_5_title, NULL, sample_shop_5_profile_image_uuid, sample_shop_5_location, sample_shop_5_classification, sample_shop_5_country_code, sample_shop_5_category_icon, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_shop_6_id, sample_shop_6_title, NULL, sample_shop_6_profile_image_uuid, sample_shop_6_location, sample_shop_6_classification, sample_shop_6_country_code, sample_shop_6_category_icon, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        profile_rich_text = EXCLUDED.profile_rich_text,
        profile_image_uuid = EXCLUDED.profile_image_uuid,
        shop_location = EXCLUDED.shop_location,
        classification = EXCLUDED.classification,
        country_code = EXCLUDED.country_code,
        category_icon = EXCLUDED.category_icon,
        updated_at = CURRENT_TIMESTAMP;
    
    INSERT INTO shipping_origin (id, shop_id, location_name, origin_zip, created_at, updated_at)
    VALUES
        (sample_shop_1_id, sample_shop_1_id, default_shipping_origin_location_name, sample_shop_1_origin_zip,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_shop_2_id, sample_shop_2_id, default_shipping_origin_location_name, sample_shop_2_origin_zip,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_shop_3_id, sample_shop_3_id, default_shipping_origin_location_name, sample_shop_3_origin_zip,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_shop_4_id, sample_shop_4_id, default_shipping_origin_location_name, sample_shop_4_origin_zip,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_shop_5_id, sample_shop_5_id, default_shipping_origin_location_name, sample_shop_5_origin_zip,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_shop_6_id, sample_shop_6_id, default_shipping_origin_location_name, sample_shop_6_origin_zip,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (shop_id, origin_zip) DO UPDATE SET
        location_name = EXCLUDED.location_name,
        updated_at = CURRENT_TIMESTAMP;
    
    INSERT INTO listing (id, shop_id, category_id, title, subtitle, full_descr, price_dollars, shipping_origin_id, shipping_profile_id, return_exchange_profile_id, image_uuids, lead_time_days_min, lead_time_days_max)
    VALUES
        (sample_listing_1_id, sample_listing_1_shop_id, sample_listing_1_category_id, sample_listing_1_title, sample_listing_1_subtitle, null, sample_listing_1_price_dollars, sample_listing_1_shop_id, default_shipping_profile_id, default_return_profile_id, sample_listing_1_image_uuids, 0, 0),
        (sample_listing_2_id, sample_listing_2_shop_id, sample_listing_2_category_id, sample_listing_2_title, sample_listing_2_subtitle, null,sample_listing_2_price_dollars, sample_listing_2_shop_id, default_shipping_profile_id, default_return_profile_id, sample_listing_2_image_uuids, 0, 0),
        (sample_listing_3_id, sample_listing_3_shop_id, sample_listing_3_category_id, sample_listing_3_title, sample_listing_3_subtitle, null,sample_listing_3_price_dollars, sample_listing_3_shop_id, default_shipping_profile_id, default_return_profile_id, sample_listing_3_image_uuids, 0, 0),
        (sample_listing_4_id, sample_listing_4_shop_id, sample_listing_4_category_id, sample_listing_4_title, sample_listing_4_subtitle, null,sample_listing_4_price_dollars, sample_listing_4_shop_id, default_shipping_profile_id, default_return_profile_id, sample_listing_4_image_uuids, 0, 0),
        (sample_listing_5_id, sample_listing_5_shop_id, sample_listing_5_category_id, sample_listing_5_title, sample_listing_5_subtitle, sample_listing_5_full_descr,sample_listing_5_price_dollars, sample_listing_5_shop_id, default_shipping_profile_id, default_return_profile_id, sample_listing_5_image_uuids, sample_listing_5_lead_time_days_min, sample_listing_5_lead_time_days_max),
        (sample_listing_6_id, sample_listing_6_shop_id, sample_listing_6_category_id, sample_listing_6_title, sample_listing_6_subtitle, null,sample_listing_6_price_dollars, sample_listing_6_shop_id, default_shipping_profile_id, default_return_profile_id, sample_listing_6_image_uuids, sample_listing_6_lead_time_days_min, sample_listing_6_lead_time_days_max),
        (sample_listing_7_id, sample_listing_7_shop_id, sample_listing_7_category_id, sample_listing_7_title, sample_listing_7_subtitle, null,sample_listing_7_price_dollars, sample_listing_7_shop_id, default_shipping_profile_id, default_return_profile_id, sample_listing_7_image_uuids, sample_listing_7_lead_time_days_min, sample_listing_7_lead_time_days_max),
        (sample_listing_8_id, sample_listing_8_shop_id, sample_listing_8_category_id, sample_listing_8_title, sample_listing_8_subtitle, null,sample_listing_8_price_dollars, sample_listing_8_shop_id, default_shipping_profile_id, default_return_profile_id, sample_listing_8_image_uuids, 0, 0),
        (sample_listing_9_id, sample_listing_9_shop_id, sample_listing_9_category_id, sample_listing_9_title, sample_listing_9_subtitle, null,sample_listing_9_price_dollars, sample_listing_9_shop_id, default_shipping_profile_id, default_return_profile_id, sample_listing_9_image_uuids, 0, 0),
        (sample_listing_10_id, sample_listing_10_shop_id, sample_listing_10_category_id, sample_listing_10_title, sample_listing_10_subtitle, null, sample_listing_10_price_dollars, sample_listing_10_shop_id, default_shipping_profile_id, default_return_profile_id, sample_listing_10_image_uuids, 0, 0)
    ON CONFLICT (id) DO UPDATE SET
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_dollars = EXCLUDED.price_dollars,
        shipping_origin_id = EXCLUDED.shipping_origin_id,
        shipping_profile_id = EXCLUDED.shipping_profile_id,
        return_exchange_profile_id = EXCLUDED.return_exchange_profile_id,
        image_uuids = EXCLUDED.image_uuids,
        lead_time_days_min = EXCLUDED.lead_time_days_min,
        lead_time_days_max = EXCLUDED.lead_time_days_max,
        updated_at = CURRENT_TIMESTAMP;
    
    INSERT INTO listing_variation (id, listing_id, variation_name, prices_vary, created_at, updated_at)
    VALUES
        (sample_listing_variation_1_id, sample_listing_variation_1_listing_id, sample_listing_variation_1_name, sample_listing_variation_1_prices_vary, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        listing_id = EXCLUDED.listing_id,
        variation_name = EXCLUDED.variation_name,
        prices_vary = EXCLUDED.prices_vary,
        updated_at = CURRENT_TIMESTAMP;
    
    INSERT INTO listing_variation_option (listing_variation_id, option_name, additional_price_us_dollars, created_at, updated_at)
    VALUES
        (sample_variation_option_1_variation_id, sample_variation_option_1_name, sample_variation_option_1_additional_price_us_dollars, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),      
        (sample_variation_option_2_variation_id, sample_variation_option_2_name, sample_variation_option_2_additional_price_us_dollars, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_variation_option_3_variation_id, sample_variation_option_3_name, sample_variation_option_3_additional_price_us_dollars, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (listing_variation_id, option_name) DO UPDATE SET
        listing_variation_id = EXCLUDED.listing_variation_id,
        option_name = EXCLUDED.option_name,
        additional_price_us_dollars = EXCLUDED.additional_price_us_dollars,
        updated_at = CURRENT_TIMESTAMP;

COMMIT;

END $$;