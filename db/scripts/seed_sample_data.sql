DO $$

DECLARE
    old_sample_shop_ids CONSTANT INT[] := ARRAY[1, 2, 3, 4, 5, 6];

    sample_shop_1_id INT := 1;
    sample_shop_1_short_id VARCHAR := 'nK4z';
    sample_shop_1_title VARCHAR := 'H.M. Kala';
    sample_shop_1_profile_image_uuid VARCHAR := '3BD1143B-AA53-4BFD-BB1C-2ABC02C53C9C';
    sample_shop_1_location VARCHAR := 'Graz';
    sample_shop_1_classification VARCHAR := 'Sundials';
    sample_shop_1_country_code CHAR(2) := 'AT';

    sample_shop_2_id INT := 2;
    sample_shop_2_short_id VARCHAR := 'pQ2w';
    sample_shop_2_title VARCHAR := 'Klimchi';
    sample_shop_2_profile_image_uuid VARCHAR := 'FCA75979-783E-48BF-81E6-30FAE96BAADA';
    sample_shop_2_location VARCHAR := 'Kamenický Šenov';
    sample_shop_2_classification VARCHAR := 'Handcrafted Bohemian glassware';
    sample_shop_2_country_code CHAR(2) := 'CZ';

    sample_shop_3_id INT := 3;
    sample_shop_3_short_id VARCHAR := 'sF7t';
    sample_shop_3_title VARCHAR := 'Santa Barbara Forge';
    sample_shop_3_profile_image_uuid VARCHAR := '41582661-49C7-41E2-8B35-F5ECC74BF465';
    sample_shop_3_location VARCHAR := 'Santa Barbara, CA';
    sample_shop_3_classification VARCHAR := 'Hand-Forged Ironwork';
    sample_shop_3_country_code CHAR(2) := 'US';

    sample_shop_4_id INT := 4;
    sample_shop_4_short_id VARCHAR := 'rW9c';
    sample_shop_4_title VARCHAR := 'Rookwood';
    sample_shop_4_profile_image_uuid VARCHAR := 'E067F679-4583-4126-A5DD-AFBEEB177391';
    sample_shop_4_location VARCHAR := 'Cincinnati, OH';
    sample_shop_4_classification VARCHAR := 'Art Pottery & Tile';
    sample_shop_4_country_code CHAR(2) := 'US';

    sample_listing_1_id INT := 1;
    sample_listing_1_short_id VARCHAR := '4K93K';
    sample_listing_1_shop_id INT := sample_shop_1_id;
    sample_listing_1_category_id VARCHAR := 'ACCESSORIES';
    sample_listing_1_title VARCHAR := 'Pocket Sundial';
    sample_listing_1_subtitle VARCHAR := 'Tell the true solar time anywhere in the world using just the power of the sun';
    sample_listing_1_price_cents INT := 8300;
    sample_listing_1_image_uuids text[] := '{"262d2bb0-d6c2-44df-ab69-be79b035472c", "114462dd-1c2c-41b7-823b-04ba279cd953", "97b2e865-c9c5-450e-9d7f-43dde9e25328", "dc9f2103-17bb-46a3-a14e-c266a28814c5", "9e9c8c90-25f2-453e-b1bd-67c46cb850e5", "db9312e1-0b91-455e-b5ee-e598ab07a7b9", "3604da2b-807d-42ba-a2ad-b4162c1969af"}';
    sample_listing_1_full_descr JSONB := '[
        {
            "title": "Basic Info",
            "richText": "<ul><li><p>Tells the true solar time anywhere in the world using just the power of the sun, achieving surprising accuracy estimated by experts to be better than +/- 10 minutes!</p></li><li><p>Crafted by our family of watchmakers for over 27 years in the same small workshop near Graz in Austria!</p></li><li><p>Measures just 60mm / 2.36 inches in diameter, fitting easily in your pocket and meeting the international sizing standard for pocket watches too!</p></li><li><p>Solid brass &amp; steel construction, with artisan black ink and every third sundial fully disassembled &amp; checked to ensure quality!</p></li><li><p>Inspired by the historic Universal Equinoctial Ring Sundial, currently on display at the Royal Observatory in Greenwich!</p></li><li><p>Can also be used as a precise compass once set up, making a truly versatile instrument!</p></li></ul><p></p>"
        },
        {
            "title": "About the Sundial",
            "richText": "<p>Although sundials have been around for a very long time, they never worked across latitudes until around 500 years ago.</p><p>At that time the Universal Equinoctial Ring Sundial - the inspiration for our sundial - began to be used by a new wave of sailors, explorers and travellers.</p><p>Our sundial tells the true solar time anywhere in the world because the Sun''s angle to the equatorial plane takes different values over the course of the year, and the small hole mask in the centre of the sundial is adjustable, plus set to the date.</p><p>Once set up it is also a model of our planet with the bridge parallel to the earth''s axis, so it can thus be used as a precise compass too!</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li><p>Made of solid brass and steel with artisan black ink coating - for a reassuring weight.</p></li><li><p>Fully assembled weight: 40 g.</p></li><li><p>Ø 60 mm / 2.36 inches diameter.</p></li><li><p>Includes 10 language instruction manual.</p></li><li><p>Comes with an organic cork inlay and an elegant white slider case.</p></li><li><p>The outer and inner rings can be folded together for easy transport.</p></li></ul><p></p>"
        }
    ]';

    sample_listing_2_id INT := 2;
    sample_listing_2_short_id VARCHAR := 'Yb3Hn';
    sample_listing_2_shop_id INT := sample_shop_3_id;
    sample_listing_2_category_id VARCHAR := 'HOUSEWARES';
    sample_listing_2_title VARCHAR := 'Sonora Small Pan';
    sample_listing_2_subtitle VARCHAR := 'Hand-forged carbon steel pan with a short handle, gently sloping sidewalls, and hammered texture.';
    sample_listing_2_price_cents INT := 15500;
    sample_listing_2_image_uuids text[] := '{"3DE08646-9C92-4B2E-94A3-8EEE7AB5C6C0", "202AE1CC-8A97-4A99-8AAC-E2D0C37DD2B4", "21B3D03E-DEF2-4712-8030-D3DCBCF2370B", "4A672E7C-AE45-4D43-A148-9E0A7B718BC7", "53B8648E-BD2B-4D51-AF64-FF15F4ECC078"}';
    sample_listing_2_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>With a short hand-forged handle, gently sloping sidewalls, and hammered texture, our small carbon steel Sonora pan is an extremely versatile utensil for any kitchen. Fantastic for omelets, vegetables, and single meat cuts.</p><p>Made in our shop in Santa Barbara, California. Each item we make is unique and comes with slight imperfections in shape, finish, and color. It''s all part of the character of the pieces we sell, and will not affect performance.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li><p>Total length (handle to rim): 15.5\"</p></li><li><p>Rim to rim: 8.75\"</p></li><li><p>Flat interior cooking surface: 6.25\"</p></li><li><p>Height from table to handle top: 4\"</p></li><li><p>Height from table to bowl lip: 1.25\"</p></li><li><p>Handle length: 7.25\"</p></li><li><p>Weight: approximately 3 lbs</p></li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Like a good leather jacket, it only gets better with age. As your pan gains its season it will change gracefully and become even more non-stick.</p>"
        }
    ]';

BEGIN

    -- Clear out previous sample data before reseeding
    DELETE FROM listing WHERE shop_id = ANY(old_sample_shop_ids);
    DELETE FROM listing_processing_profile WHERE shop_id = ANY(old_sample_shop_ids);
    DELETE FROM listing_shipping_profile WHERE shop_id = ANY(old_sample_shop_ids);
    DELETE FROM listing_return_profile WHERE shop_id = ANY(old_sample_shop_ids);
    DELETE FROM listing_personalization_profile WHERE shop_id = ANY(old_sample_shop_ids);
    DELETE FROM shop WHERE id = ANY(old_sample_shop_ids);

    INSERT INTO shop (id, short_id, title, profile_rich_text, profile_image_uuid, shop_location, classification, country_code, direct_fulfillment, created_at, updated_at)
    VALUES
        (sample_shop_1_id, sample_shop_1_short_id, sample_shop_1_title, NULL, sample_shop_1_profile_image_uuid, sample_shop_1_location, sample_shop_1_classification, sample_shop_1_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_shop_2_id, sample_shop_2_short_id, sample_shop_2_title, NULL, sample_shop_2_profile_image_uuid, sample_shop_2_location, sample_shop_2_classification, sample_shop_2_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_shop_3_id, sample_shop_3_short_id, sample_shop_3_title, NULL, sample_shop_3_profile_image_uuid, sample_shop_3_location, sample_shop_3_classification, sample_shop_3_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_shop_4_id, sample_shop_4_short_id, sample_shop_4_title, NULL, sample_shop_4_profile_image_uuid, sample_shop_4_location, sample_shop_4_classification, sample_shop_4_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        title = EXCLUDED.title,
        profile_rich_text = EXCLUDED.profile_rich_text,
        profile_image_uuid = EXCLUDED.profile_image_uuid,
        shop_location = EXCLUDED.shop_location,
        classification = EXCLUDED.classification,
        country_code = EXCLUDED.country_code,
        direct_fulfillment = EXCLUDED.direct_fulfillment,
        updated_at = CURRENT_TIMESTAMP;

    INSERT INTO listing (id, short_id, shop_id, category_id, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, combinations, available, personalization_profile_id, created_at, updated_at)
    VALUES
        (sample_listing_1_id, sample_listing_1_short_id, sample_listing_1_shop_id, sample_listing_1_category_id, sample_listing_1_title, sample_listing_1_subtitle, sample_listing_1_full_descr, sample_listing_1_price_cents, NULL, NULL, sample_listing_1_image_uuids, NULL, '{}', '{}', true, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_listing_2_id, sample_listing_2_short_id, sample_listing_2_shop_id, sample_listing_2_category_id, sample_listing_2_title, sample_listing_2_subtitle, sample_listing_2_full_descr, sample_listing_2_price_cents, NULL, NULL, sample_listing_2_image_uuids, NULL, '{}', '{}', true, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        shipping_profile_id = EXCLUDED.shipping_profile_id,
        return_profile_id = EXCLUDED.return_profile_id,
        image_uuids = EXCLUDED.image_uuids,
        processing_profile_id = EXCLUDED.processing_profile_id,
        variations = EXCLUDED.variations,
        combinations = EXCLUDED.combinations,
        available = EXCLUDED.available,
        personalization_profile_id = EXCLUDED.personalization_profile_id,
        updated_at = CURRENT_TIMESTAMP;

    -- Resync sequences for tables seeded with explicit IDs
    PERFORM setval(pg_get_serial_sequence('shop', 'id'), COALESCE((SELECT MAX(id) FROM shop), 1));
    PERFORM setval(pg_get_serial_sequence('listing', 'id'), COALESCE((SELECT MAX(id) FROM listing), 1));

COMMIT;

END $$;
