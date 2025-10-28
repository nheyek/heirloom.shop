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
    sample_listing_1_descr_rich_text VARCHAR := '7mm wide curb chain with hand-formed closure.';
    sample_listing_1_price_dollars INT := 200;

    sample_listing_2_id INT := 2;
    sample_listing_2_shop_id INT := sample_shop_1_id;
    sample_listing_2_category_id VARCHAR := 'BRACELETS';
    sample_listing_2_primary_image_uuid VARCHAR := 'E4EF3812-2D09-4A32-94CE-4DF424B213A4';
    sample_listing_2_title VARCHAR := 'Cuff Bracelet';
    sample_listing_2_descr_rich_text VARCHAR := 'Hand-forged, classic straight body cuff bracelet.';
    sample_listing_2_price_dollars INT := 125;

    sample_listing_3_id INT := 3;
    sample_listing_3_shop_id INT := sample_shop_1_id;
    sample_listing_3_category_id VARCHAR := 'RINGS';
    sample_listing_3_primary_image_uuid VARCHAR := 'AD996A1E-9D17-46E8-8023-6250877CFDAC';
    sample_listing_3_title VARCHAR := 'Band Ring';
    sample_listing_3_descr_rich_text VARCHAR := 'Solid silver or brass band ring in a variety of widths.';
    sample_listing_3_price_dollars INT := 80;

    sample_listing_4_id INT := 4;
    sample_listing_4_shop_id INT := sample_shop_1_id;
    sample_listing_4_category_id VARCHAR := 'RINGS';
    sample_listing_4_primary_image_uuid VARCHAR := '8F44E91A-D1CD-4B48-9A08-A1F439BD8839';
    sample_listing_4_title VARCHAR := 'Signet Ring';
    sample_listing_4_descr_rich_text VARCHAR := 'Classic signet ring with a distinct hand-filed texture on the sides and body of the ring, showing the marks of tool used carve and refine its shape';
    sample_listing_4_price_dollars INT := 45;

    sample_listing_5_id INT := 5;
    sample_listing_5_shop_id INT := sample_shop_2_id;
    sample_listing_5_category_id VARCHAR := 'DINING_TABLES';
    sample_listing_5_primary_image_uuid VARCHAR := '8D236EB4-62F3-48D8-A468-4A46DEE32003';
    sample_listing_5_title VARCHAR := 'Allyson Dining Table';
    sample_listing_5_descr_rich_text VARCHAR := 'Crafted from Alder hardwood, this turned-leg table exudes timeless allure, transforming any dining space into a haven of sophistication and charm.';
    sample_listing_5_price_dollars INT := 2967;

    sample_listing_6_id INT := 6;
    sample_listing_6_shop_id INT := sample_shop_2_id;
    sample_listing_6_category_id VARCHAR := 'COFFEE_TABLES';
    sample_listing_6_primary_image_uuid VARCHAR := '9C5A0A04-14A6-4415-B273-9317DFAB20E4';
    sample_listing_6_title VARCHAR := 'Floating Top Coffee Table';
    sample_listing_6_descr_rich_text VARCHAR := 'A symbol of meticulous design and enduring quality, the Floating Top Coffee Table showcases a stylishly jointed solid hardwood top that epitomizes seamless beauty and resilience.';
    sample_listing_6_price_dollars INT := 2061;

    sample_listing_7_id INT := 7;
    sample_listing_7_shop_id INT := sample_shop_3_id;
    sample_listing_7_category_id VARCHAR := 'SIDE_TABLES';
    sample_listing_7_primary_image_uuid VARCHAR := 'E2C0607B-160B-41A6-9258-E1EA6AEBC2AB';
    sample_listing_7_title VARCHAR := 'Stissing Cocktail Table';
    sample_listing_7_descr_rich_text VARCHAR := 'Hand-forged in Maine, by Matt Foster and the Black Dog Ironworks team, our Martini table was designed for our tavern, Stissing House, in Pine Plains, NY. Inspired by an 18th century table at the Henry Francis du Pont Winterthur museum, it functions as its namesake, an elegant side table, or even as a nightstand.';
    sample_listing_7_price_dollars INT := 390;

    sample_listing_8_id INT := 8;
    sample_listing_8_shop_id INT := sample_shop_4_id;
    sample_listing_8_category_id VARCHAR := 'LEATHER_BAGS';
    sample_listing_8_primary_image_uuid VARCHAR := 'EC0DF0BF-2CC9-4F0F-90BA-9E25A092FE7C';
    sample_listing_8_title VARCHAR := 'No. 1943 Navigator Briefcase';
    sample_listing_8_descr_rich_text VARCHAR := 'Stand out with this timeless WWII-inspired full-grain American Buffalo leather briefcase. Meticulously handcrafted in America.';
    sample_listing_8_price_dollars INT := 1160;

    sample_listing_9_id INT := 9;
    sample_listing_9_shop_id INT := sample_shop_4_id;
    sample_listing_9_category_id VARCHAR := 'LEATHER_BAGS';
    sample_listing_9_primary_image_uuid VARCHAR := '18A7B73F-AFBE-48AE-A16D-8CC7466B1E9E';
    sample_listing_9_title VARCHAR := 'No. 2 Leather Duffel Bag';
    sample_listing_9_descr_rich_text VARCHAR := 'The ultimate weekender/carry-on bag in easy-going, dry-milled American Buffalo.';
    sample_listing_9_price_dollars INT := 1340;

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
        (sample_listing_1_id, sample_listing_1_shop_id, sample_listing_1_category_id, sample_listing_1_primary_image_uuid, sample_listing_1_title, sample_listing_1_descr_rich_text, sample_listing_1_price_dollars),
        (sample_listing_2_id, sample_listing_2_shop_id, sample_listing_2_category_id, sample_listing_2_primary_image_uuid, sample_listing_2_title, sample_listing_2_descr_rich_text, sample_listing_2_price_dollars),
        (sample_listing_3_id, sample_listing_3_shop_id, sample_listing_3_category_id, sample_listing_3_primary_image_uuid, sample_listing_3_title, sample_listing_3_descr_rich_text, sample_listing_3_price_dollars),
        (sample_listing_4_id, sample_listing_4_shop_id, sample_listing_4_category_id, sample_listing_4_primary_image_uuid, sample_listing_4_title, sample_listing_4_descr_rich_text, sample_listing_4_price_dollars),
        (sample_listing_5_id, sample_listing_5_shop_id, sample_listing_5_category_id, sample_listing_5_primary_image_uuid, sample_listing_5_title, sample_listing_5_descr_rich_text, sample_listing_5_price_dollars),
        (sample_listing_6_id, sample_listing_6_shop_id, sample_listing_6_category_id, sample_listing_6_primary_image_uuid, sample_listing_6_title, sample_listing_6_descr_rich_text, sample_listing_6_price_dollars),
        (sample_listing_7_id, sample_listing_7_shop_id, sample_listing_7_category_id, sample_listing_7_primary_image_uuid, sample_listing_7_title, sample_listing_7_descr_rich_text, sample_listing_7_price_dollars),
        (sample_listing_8_id, sample_listing_8_shop_id, sample_listing_8_category_id, sample_listing_8_primary_image_uuid, sample_listing_8_title, sample_listing_8_descr_rich_text, sample_listing_8_price_dollars),
        (sample_listing_9_id, sample_listing_9_shop_id, sample_listing_9_category_id, sample_listing_9_primary_image_uuid, sample_listing_9_title, sample_listing_9_descr_rich_text, sample_listing_9_price_dollars)
    ON CONFLICT (id) DO UPDATE SET
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        primary_image_uuid = EXCLUDED.primary_image_uuid,
        title = EXCLUDED.title,
        descr_rich_text = EXCLUDED.descr_rich_text,
        price_dollars = EXCLUDED.price_dollars,
        updated_at = CURRENT_TIMESTAMP;

COMMIT;

END $$;