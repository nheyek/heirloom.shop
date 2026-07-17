-- Deletes all app content (shops, listings, orders, favorites, shop roles, etc.)
-- while preserving reference/taxonomy data (listing_category, country), user
-- accounts (app_user), and server_error_log.
--
-- Cascades via FK graph:
--   shop      -> listing, listing_processing_profile, listing_return_profile,
--                listing_shipping_profile, listing_personalization_profile,
--                shop_user_role, user_favorite_shop
--   listing   -> user_favorite_listing
--   app_order -> app_order_item

BEGIN;

TRUNCATE TABLE shop, app_order RESTART IDENTITY CASCADE;

COMMIT;
