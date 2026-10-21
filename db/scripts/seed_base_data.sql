DO $$

DECLARE
    admin_user_1_username CONSTANT VARCHAR := 'nick@heyek.com';
    admin_user_1_email CONSTANT VARCHAR := 'nick@heyek.com';

    ring_category_id CONSTANT VARCHAR := 'RINGS';
    ring_category_name CONSTANT VARCHAR := 'Rings';
    ring_image_uuid CONSTANT VARCHAR := 'fed1d05a-6f91-47ee-a011-b6a775902dc9';

    bracelet_category_id CONSTANT VARCHAR := 'BRACELETS';
    bracelet_category_name CONSTANT VARCHAR := 'Bracelets';
    bracelet_image_uuid CONSTANT VARCHAR := 'cb3296a9-6100-4f84-a658-980716cbfef1';

    necklace_category_id CONSTANT VARCHAR := 'NECKLACES';
    necklace_category_name CONSTANT VARCHAR := 'Necklaces';
    necklace_image_uuid CONSTANT VARCHAR := '48738e4c-b947-4fd2-8a1e-13852cea8e41';

    earring_category_id CONSTANT VARCHAR := 'EARRINGS';
    earring_category_name CONSTANT VARCHAR := 'Earrings';
    earring_image_uuid CONSTANT VARCHAR := 'b2e490b5-4e1b-4888-bf0b-349b634f7b7f';

    accessories_category_id CONSTANT VARCHAR := 'ACCESSORIES';
    accessories_category_name CONSTANT VARCHAR := 'Accessories';
    accessories_image_uuid CONSTANT VARCHAR := '46c58ec3-2afd-41c4-98b8-988780df8690';

BEGIN

	INSERT INTO listing_category (id, title, subtitle, image_uuid, parent_id, created_at, updated_at)
	VALUES
		(ring_category_id, ring_category_name, NULL, ring_image_uuid, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (bracelet_category_id, bracelet_category_name, NULL, bracelet_image_uuid, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (necklace_category_id, necklace_category_name, NULL, necklace_image_uuid, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (earring_category_id, earring_category_name, NULL, earring_image_uuid, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (accessories_category_id, accessories_category_name, NULL, accessories_image_uuid, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
	ON CONFLICT (id) DO UPDATE SET
		title = EXCLUDED.title,
		subtitle = EXCLUDED.subtitle,
		image_uuid = EXCLUDED.image_uuid,
		parent_id = EXCLUDED.parent_id,
		updated_at = CURRENT_TIMESTAMP;
    
    INSERT INTO app_user (username, email, is_admin, created_at, updated_at)
    VALUES
        (admin_user_1_username, admin_user_1_email, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (username) DO UPDATE SET
        email = EXCLUDED.email,
        is_admin = EXCLUDED.is_admin,
        updated_at = CURRENT_TIMESTAMP;

    INSERT INTO country (code, name)
    VALUES
        ('US', 'United States'),
        ('CA', 'Canada'),
        ('UK', 'United Kingdom'),
        ('IT', 'Italy'),
        ('FR', 'France'),
        ('DE', 'Germany'),
        ('BE', 'Belgium'),
        ('CZ', 'Czech Republic'),
        ('AT', 'Austria'),
        ('CH', 'Switzerland'),
        ('PT', 'Portugal'),
        ('DK', 'Denmark'),
        ('IS', 'Iceland'),
        ('NO', 'Norway'),
        ('JP', 'Japan')
    ON CONFLICT (code) DO UPDATE SET
        name = EXCLUDED.name;

COMMIT;

END $$;
