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

    sample_listing_3_id INT := 3;
    sample_listing_3_short_id VARCHAR := 'Qz7Rk';
    sample_listing_3_shop_id INT := sample_shop_3_id;
    sample_listing_3_category_id VARCHAR := 'HOUSEWARES';
    sample_listing_3_title VARCHAR := 'Sonora Large Pan with Handle';
    sample_listing_3_subtitle VARCHAR := 'Hand-forged carbon steel large frying pan with a pineapple-twist helper handle riveted opposite the straight handle.';
    sample_listing_3_price_cents INT := 24500;
    sample_listing_3_image_uuids text[] := '{"C4C307F8-6130-46A9-A8CB-A0892802EFE5", "4728F288-C50F-42C4-B662-99611B97E1F6", "EE11BA0E-024C-40E1-97B2-3BC38D5EE469", "52E80887-33D6-4360-9280-7466C83B45FE", "4E187B30-37BF-4781-BE49-030C01DC6557", "4AE12AE3-DB88-4B02-A222-F29B5B563204", "8C6ACC56-0E36-4252-A50A-52D80F753D02"}';
    sample_listing_3_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>All the beauty and functionality of the carbon steel Sonora Large Frying Pan, but with an added hand-forged pineapple-twist helper handle riveted to the rim opposite the straight handle.</p><p>Made in our shop in Santa Barbara, California. Each item we make is unique and comes with slight imperfections in shape, finish, and color. It''s all part of the character of the pieces we sell, and will not affect performance.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li><p>Total length (handle to opposite handle): 21.5\"</p></li><li><p>Rim to rim: 11\"</p></li><li><p>Flat interior cooking surface: 9.25\"</p></li><li><p>Height from table to long handle top: 4.5\"</p></li><li><p>Height from table to bowl lip: 1.375\"</p></li><li><p>Long handle length: 9\"</p></li><li><p>Helper handle height: 3.5\"</p></li><li><p>Weight: approximately 5.8 lbs</p></li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Like a good leather jacket, it only gets better with age. As your pan gains its season it will change gracefully and become even more non-stick.</p>"
        }
    ]';

    sample_listing_4_id INT := 4;
    sample_listing_4_short_id VARCHAR := 'Wm2Fp';
    sample_listing_4_shop_id INT := sample_shop_3_id;
    sample_listing_4_category_id VARCHAR := 'HOUSEWARES';
    sample_listing_4_title VARCHAR := 'Sonora Roaster';
    sample_listing_4_subtitle VARCHAR := 'Hand-forged carbon steel roaster with two helper handles and a gently curving sidewall, sized for larger meals.';
    sample_listing_4_price_cents INT := 30500;
    sample_listing_4_image_uuids text[] := '{"6FF3E7F8-23DE-490C-A348-3CFB227FFDC7", "ADE78DEA-75CB-4CE6-AA6C-B0FE71637C26", "60830011-8454-45EC-AA45-578DBE530E6E", "FF5B2BC4-5CB4-4DC1-B48F-7A2585E29099", "39AF3CA5-4856-43B0-BB1C-AA6DBE718543", "77A728E0-90D2-42DC-A60A-276861A9B868", "5A1E2109-A2B9-42B9-A8E5-E7EE7B9521C0", "FF235BEE-6A5E-4E40-9467-E80A3558100A"}';
    sample_listing_4_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>With two hand-forged helper handles and a gently curving sidewall, our carbon steel Sonora Roaster pan provides a versatile cooking surface that can handle several foods at once. A stunning centerpiece of any kitchen or table, this pan is ideal for cooking larger meals. Cook eggs on one side and chorizo in the other, or throw in the entire bird!</p><p>Made in our shop in Santa Barbara, California. Each item we make is unique and comes with slight imperfections in shape, finish, and color. It''s all part of the character of the pieces we sell, and will not affect performance.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li><p>Total width (handle to handle): 15.5\"</p></li><li><p>Rim to rim: 13.5\"</p></li><li><p>Flat interior cooking surface: 11\"</p></li><li><p>Height from table to handle top: 4\"</p></li><li><p>Height from table to bowl lip: 1.75\"</p></li><li><p>10 gauge steel (approx. 0.135\" thick)</p></li><li><p>Weight: approximately 6.3 lbs</p></li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Like a good leather jacket, it only gets better with age. As your pan gains its season it will change gracefully and become even more non-stick.</p>"
        }
    ]';

    sample_listing_5_id INT := 5;
    sample_listing_5_short_id VARCHAR := 'Tp9Xr';
    sample_listing_5_shop_id INT := sample_shop_4_id;
    sample_listing_5_category_id VARCHAR := 'HOUSEWARES';
    sample_listing_5_title VARCHAR := 'Rook Dish';
    sample_listing_5_subtitle VARCHAR := 'A rare heritage design from the Rookwood archives, revived after more than 60 years out of production.';
    sample_listing_5_price_cents INT := 11000;
    sample_listing_5_image_uuids text[] := '{"436504A3-8AF9-4A69-9B27-792CB1AB6BE4", "933602E5-BF83-4664-AC34-9B9980813790", "84D75D43-D1D8-4C57-B685-2086A8992380", "C24A2AC9-9BD6-486A-BD43-5B4CEEE00835", "CDB69E96-25E0-4424-9BF6-F2A6139397A5"}';
    sample_listing_5_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>A rare heritage design from the Rookwood archives, unseen in production for over 60 years, makes its return. First introduced in the early 1900s by John D. Wareham, a pivotal figure in Rookwood''s history, the piece stands as a symbol of our namesake.</p><p>Originally designed as an ashtray, the dish now functions beautifully as a catchall or jewelry dish. Each piece features variation in glaze, making every one uniquely individual.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li><p>Height: 4\"</p></li><li><p>Width at widest point: 8\"</p></li><li><p>Designer: John D. Wareham</p></li><li><p>Mold number: 1139-25</p></li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Heritage ceramic. Hand wash recommended to preserve the glaze finish.</p>"
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
        (sample_listing_2_id, sample_listing_2_short_id, sample_listing_2_shop_id, sample_listing_2_category_id, sample_listing_2_title, sample_listing_2_subtitle, sample_listing_2_full_descr, sample_listing_2_price_cents, NULL, NULL, sample_listing_2_image_uuids, NULL, '{}', '{}', true, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_listing_3_id, sample_listing_3_short_id, sample_listing_3_shop_id, sample_listing_3_category_id, sample_listing_3_title, sample_listing_3_subtitle, sample_listing_3_full_descr, sample_listing_3_price_cents, NULL, NULL, sample_listing_3_image_uuids, NULL, '{}', '{}', true, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_listing_4_id, sample_listing_4_short_id, sample_listing_4_shop_id, sample_listing_4_category_id, sample_listing_4_title, sample_listing_4_subtitle, sample_listing_4_full_descr, sample_listing_4_price_cents, NULL, NULL, sample_listing_4_image_uuids, NULL, '{}', '{}', true, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_listing_5_id, sample_listing_5_short_id, sample_listing_5_shop_id, sample_listing_5_category_id, sample_listing_5_title, sample_listing_5_subtitle, sample_listing_5_full_descr, sample_listing_5_price_cents, NULL, NULL, sample_listing_5_image_uuids, NULL, '{}', '{}', true, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
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
