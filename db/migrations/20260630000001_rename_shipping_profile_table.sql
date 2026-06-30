-- migrate:up
ALTER TABLE shipping_profile RENAME TO listing_shipping_profile;
ALTER TABLE listing_shipping_profile RENAME CONSTRAINT shipping_profile_shop_name_unique TO listing_shipping_profile_shop_name_unique;

-- migrate:down
ALTER TABLE listing_shipping_profile RENAME TO shipping_profile;
ALTER TABLE shipping_profile RENAME CONSTRAINT listing_shipping_profile_shop_name_unique TO shipping_profile_shop_name_unique;
