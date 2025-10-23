DO $$

DECLARE
	furniture_category_id CONSTANT VARCHAR := 'FURNITURE';
	furniture_category_name CONSTANT VARCHAR := 'Furniture';
BEGIN

	INSERT INTO listing_category (id, title, subtitle, image_uuid, parent_id, created_at, updated_at)
	VALUES
		(furniture_category_id, furniture_category_name, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
	ON CONFLICT (id) DO UPDATE SET
		title = EXCLUDED.title,
		subtitle = EXCLUDED.subtitle,
		image_uuid = EXCLUDED.image_uuid,
		parent_id = EXCLUDED.parent_id,
		updated_at = CURRENT_TIMESTAMP;

COMMIT;

END $$;