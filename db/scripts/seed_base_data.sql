DO $$

DECLARE
    admin_user_1_username CONSTANT VARCHAR := 'nick@heyek.com';
    admin_user_1_email CONSTANT VARCHAR := 'nick@heyek.com';

	furniture_category_id CONSTANT VARCHAR := 'FURNITURE';
	furniture_category_name CONSTANT VARCHAR := 'Furniture';

    dining_tables_category_id CONSTANT VARCHAR := 'DINING_TABLES';
    dining_tables_category_name CONSTANT VARCHAR := 'Dining Tables';

    coffee_tables_category_id CONSTANT VARCHAR := 'COFFEE_TABLES';
    coffee_tables_category_name CONSTANT VARCHAR := 'Coffee Tables';

    side_tables_category_id CONSTANT VARCHAR := 'SIDE_TABLES';
    side_tables_category_name CONSTANT VARCHAR := 'Side Tables';

    jewelry_category_id CONSTANT VARCHAR := 'JEWELRY';
    jewelry_category_name CONSTANT VARCHAR := 'Jewelry';

    bracelet_category_id CONSTANT VARCHAR := 'BRACELETS';
    bracelet_category_name CONSTANT VARCHAR := 'Bracelets';

    ring_category_id CONSTANT VARCHAR := 'RINGS';
    ring_category_name CONSTANT VARCHAR := 'Rings';

    leather_goods_category_id CONSTANT VARCHAR := 'LEATHER_GOODS';
    leather_goods_category_name CONSTANT VARCHAR := 'Leatherwork';

    leather_bags_category_id CONSTANT VARCHAR := 'LEATHER_BAGS';
    leather_bags_category_name CONSTANT VARCHAR := 'Leather Bags';

    housewares_category_id CONSTANT VARCHAR := 'HOUSEWARES';
    housewares_category_name CONSTANT VARCHAR := 'Housewares';
BEGIN

	INSERT INTO listing_category (id, title, subtitle, image_uuid, parent_id, created_at, updated_at)
	VALUES
		(furniture_category_id, furniture_category_name, NULL, 'A001F100-46F9-4ECC-9A11-9CCDCA15F7F8', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (dining_tables_category_id, dining_tables_category_name, NULL, NULL, furniture_category_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (coffee_tables_category_id, coffee_tables_category_name, NULL, NULL, furniture_category_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (side_tables_category_id, side_tables_category_name, NULL, NULL, furniture_category_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (jewelry_category_id, jewelry_category_name, NULL, 'FC6E4450-CC01-4562-AB3E-AC6939632101', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (bracelet_category_id, bracelet_category_name, NULL, NULL, jewelry_category_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (ring_category_id, ring_category_name, NULL, NULL, jewelry_category_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (leather_goods_category_id, leather_goods_category_name, NULL, 'EC0DF0BF-2CC9-4F0F-90BA-9E25A092FE7C', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (leather_bags_category_id, leather_bags_category_name, NULL, NULL, leather_goods_category_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (housewares_category_id, housewares_category_name, NULL, '4C479374-B58F-46CB-AEAD-191336294E78', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
	ON CONFLICT (id) DO UPDATE SET
		title = EXCLUDED.title,
		subtitle = EXCLUDED.subtitle,
		image_uuid = EXCLUDED.image_uuid,
		parent_id = EXCLUDED.parent_id,
		updated_at = CURRENT_TIMESTAMP;
    
    INSERT INTO app_user (username, email, created_at, updated_at)
    VALUES
        (admin_user_1_username, admin_user_1_email, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (username) DO UPDATE SET
        email = EXCLUDED.email,
        updated_at = CURRENT_TIMESTAMP;

    INSERT INTO country (code, name)
    VALUES
        ('US', 'United States'),
        ('CA', 'Canada'),
        ('IT', 'Italy'),
        ('FR', 'France'),
        ('DE', 'Germany'),
        ('GB', 'United Kingdom')
    ON CONFLICT (code) DO UPDATE SET
        name = EXCLUDED.name;

COMMIT;

END $$;