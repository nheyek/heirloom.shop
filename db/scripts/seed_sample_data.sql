DO $$

DECLARE
    admin_user_1_username CONSTANT VARCHAR := 'nick@heyek.com';

    sample_shop_1_id INT := 1;
    sample_shop_1_title VARCHAR := 'Studebaker Metals';
    sample_shop_2_id INT := 2;
    sample_shop_2_title VARCHAR := 'James & James';
    sample_shop_3_id INT := 3;
    sample_shop_3_title VARCHAR := 'Roseland';
    sample_shop_4_id INT := 4;
    sample_shop_4_title VARCHAR := 'Col. Littleton';

    sample_listing_1_id INT := 1;
    sample_listing_1_shop_id INT := sample_shop_1_id;
    sample_listing_1_category_id VARCHAR := 'BRACELETS';
    sample_listing_1_primary_image_uuid VARCHAR := '71E53058-8F01-42EE-B240-245BB0977ED8';
    sample_listing_1_title VARCHAR := 'Chain-Link Bracelet';
    sample_listing_1_descr_rich_text VARCHAR := 'A silver 5mm chain-link bracelet';
    sample_listing_1_price_dollars INT := 200;

BEGIN

    INSERT INTO shop (id, title, profile_rich_text, profile_image_uuid, created_at, updated_at)
    VALUES
        (sample_shop_1_id, sample_shop_1_title, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_shop_2_id, sample_shop_2_title, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_shop_3_id, sample_shop_3_title, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_shop_4_id, sample_shop_4_title, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        updated_at = CURRENT_TIMESTAMP;
    
    INSERT INTO listing (id, shop_id, category_id, primary_image_uuid, title, descr_rich_text, price_dollars)
    VALUES
        (sample_listing_1_id, sample_listing_1_shop_id, sample_listing_1_category_id, sample_listing_1_primary_image_uuid, sample_listing_1_title, sample_listing_1_descr_rich_text, sample_listing_1_price_dollars);


COMMIT;

END $$;