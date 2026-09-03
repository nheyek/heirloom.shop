DO $$

DECLARE
    admin_user_1_username CONSTANT VARCHAR := 'nick@heyek.com';
    admin_user_1_email CONSTANT VARCHAR := 'nick@heyek.com';

	furniture_category_id CONSTANT VARCHAR := 'FURNITURE';
	furniture_category_name CONSTANT VARCHAR := 'Furniture';
    furniture_image_uuid CONSTANT VARCHAR := 'A001F100-46F9-4ECC-9A11-9CCDCA15F7F8';

    dining_tables_category_id CONSTANT VARCHAR := 'DINING_TABLES';
    dining_tables_category_name CONSTANT VARCHAR := 'Dining Tables';
    dining_table_image_uuid CONSTANT VARCHAR := '47CD447C-96F4-480A-A435-E043A2B8F4A1';

    coffee_tables_category_id CONSTANT VARCHAR := 'COFFEE_TABLES';
    coffee_tables_category_name CONSTANT VARCHAR := 'Coffee Tables';
    coffee_table_image_uuid CONSTANT VARCHAR := '32B6F250-B754-4544-9772-C1AC60ECB714';

    side_tables_category_id CONSTANT VARCHAR := 'SIDE_TABLES';
    side_tables_category_name CONSTANT VARCHAR := 'Side Tables';
    side_table_image_uuid CONSTANT VARCHAR := 'CF670A00-4A08-4576-989C-7386E808C813';

    jewelry_category_id CONSTANT VARCHAR := 'JEWELRY';
    jewelry_category_name CONSTANT VARCHAR := 'Jewelry';
    jewelry_image_uuid CONSTANT VARCHAR := 'FC6E4450-CC01-4562-AB3E-AC6939632101';

    bracelet_category_id CONSTANT VARCHAR := 'BRACELETS';
    bracelet_category_name CONSTANT VARCHAR := 'Bracelets';
    bracelet_image_uuid CONSTANT VARCHAR := '083DB562-968E-4798-A495-8636E5F1199D';

    ring_category_id CONSTANT VARCHAR := 'RINGS';
    ring_category_name CONSTANT VARCHAR := 'Rings';
    ring_image_uuid CONSTANT VARCHAR := 'C4739C76-36FD-402A-A37F-62F06D2A9C97';

    leather_goods_category_id CONSTANT VARCHAR := 'LEATHER_GOODS';
    leather_goods_category_name CONSTANT VARCHAR := 'Leatherwork';
    leather_goods_image_uuid CONSTANT VARCHAR := 'EC0DF0BF-2CC9-4F0F-90BA-9E25A092FE7C';

    leather_bags_category_id CONSTANT VARCHAR := 'LEATHER_BAGS';
    leather_bags_category_name CONSTANT VARCHAR := 'Leather Bags';
    leather_bags_image_uuid CONSTANT VARCHAR := '924F5E2F-8446-4CB5-AD56-C45133BCDC20';

    housewares_category_id CONSTANT VARCHAR := 'HOUSEWARES';
    housewares_category_name CONSTANT VARCHAR := 'Housewares';
    houseware_image_uuid CONSTANT VARCHAR := '4C479374-B58F-46CB-AEAD-191336294E78';

    accessories_category_id CONSTANT VARCHAR := 'ACCESSORIES';
    accessories_category_name CONSTANT VARCHAR := 'Accessories';

    about_info_page_html CONSTANT TEXT := $html$<p>Heirloom is an online store and marketplace featuring a range of products from makers that exhibit the highest level of craftsmanship.</p><p />
<h1>Background</h1>
<p>Throw-away culture is, sadly, a defining feature of the present historical moment.</p>
<p>But disillusionment is growing. People are beginning to ask questions about where their products come from and how they're made.</p><p />
<h1>The Idea</h1>
<p>It's often said that "they don't make them like they used to". But while "they" may not, there are others that do. They are just often hard to find.</p>
<p>Heirloom seeks to make it easy to discover these makers and purchase their work.</p><p />
<h1>The Experience</h1>
<p>The site is designed to prioritize authentic discovery and simplicity over maximizing sales. We will not send you unsolicited emails. We will never serve you ads or promoted content.</p>
<p>Orders are professionally packed and shipped within 1 business day. All orders ship free and are guaranteed against damage in transit.</p>
<p>If, for any reason, what you received doesn't meet your expectations, we'll take it back for a full refund within 30 days.</p><p />
<h1>Who We Are</h1>
<p>Heirloom was founded and developed by Nick Heyek, a Chicago-based software engineer and manufacturer.</p>
<p>Our facility is located at 3100 W Grand Ave in Chicago's Humboldt Park neighborhood.</p><p />
<h1>Get in Touch</h1>
<p>For questions, feedback, or any other reason, reach us at support@heirloom.shop.</p>$html$;

    shipping_returns_info_page_html CONSTANT TEXT := $html$<p>All orders ship free and are professionally packed and shipped within 1 business day. Every order is guaranteed against damage in transit.</p><p />
<h1>Returns</h1>
<ul><li>A free return label will be sent to you via email upon initiation of a return.</li><li>A refund will be issued to your original payment method within 7 days of receipt of the returned items.</li><li>Returned items must be in their original condition and packaging.</li><li>Returns must be initiated within 30 days of delivery.</li></ul>
<p>To start a return, visit your order page and contact us at support@heirloom.shop with your order number.</p>$html$;

    privacy_info_page_html CONSTANT TEXT := $html$<p>This Privacy Policy explains how Heirloom ("we", "us") collects, uses, and protects your information when you use heirloom.shop.</p><p />
<h1>Information We Collect</h1>
<p>When you place an order, we collect your name, email address, shipping address, and payment information. Payment information is processed securely by Stripe and is never stored on our servers.</p><p />
<h1>How We Use Your Information</h1>
<p>We use your information solely to process and fulfill your orders, communicate with you about your purchases, and provide customer support. We do not sell or share your personal information with third parties for marketing purposes.</p><p />
<h1>Cookies</h1>
<p>We use minimal, necessary cookies to keep you signed in and remember your shopping cart. We do not use tracking or advertising cookies.</p><p />
<h1>Contact Us</h1>
<p>If you have any questions about this Privacy Policy or your personal information, please contact us at support@heirloom.shop.</p>$html$;

    terms_of_service_info_page_html CONSTANT TEXT := $html$<p>These Terms of Service govern your use of heirloom.shop. By placing an order or using this site, you agree to these terms.</p><p />
<h1>Products &amp; Makers</h1>
<p>Heirloom is a marketplace featuring products from independent makers. Product descriptions, availability, and pricing are subject to change without notice.</p><p />
<h1>Orders &amp; Payment</h1>
<p>All orders are subject to acceptance and availability. Payment is processed at the time of purchase.</p><p />
<h1>Shipping &amp; Returns</h1>
<p>Please see our Shipping &amp; Returns page for details on delivery and our return policy.</p><p />
<h1>Limitation of Liability</h1>
<p>Heirloom is not liable for any indirect, incidental, or consequential damages arising from your use of this site or its products.</p><p />
<h1>Governing Law</h1>
<p>These terms are governed by the laws of the State of Illinois, USA.</p><p />
<h1>Contact Us</h1>
<p>Questions about these terms can be directed to support@heirloom.shop.</p>$html$;

BEGIN

	INSERT INTO listing_category (id, title, subtitle, image_uuid, parent_id, created_at, updated_at)
	VALUES
		(furniture_category_id, furniture_category_name, NULL, furniture_image_uuid, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (dining_tables_category_id, dining_tables_category_name, NULL, dining_table_image_uuid, furniture_category_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (coffee_tables_category_id, coffee_tables_category_name, NULL, coffee_table_image_uuid, furniture_category_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (side_tables_category_id, side_tables_category_name, NULL, side_table_image_uuid, furniture_category_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (jewelry_category_id, jewelry_category_name, NULL, jewelry_image_uuid, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (bracelet_category_id, bracelet_category_name, NULL, bracelet_image_uuid, jewelry_category_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (ring_category_id, ring_category_name, NULL, ring_image_uuid, jewelry_category_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (leather_goods_category_id, leather_goods_category_name, NULL, leather_goods_image_uuid, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (leather_bags_category_id, leather_bags_category_name, NULL, leather_bags_image_uuid, leather_goods_category_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (housewares_category_id, housewares_category_name, NULL, houseware_image_uuid, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (accessories_category_id, accessories_category_name, NULL, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
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

    INSERT INTO info_page (key, content_html, created_at, updated_at)
    VALUES
        ('ABOUT', about_info_page_html, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('SHIPPING_RETURNS', shipping_returns_info_page_html, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('PRIVACY', privacy_info_page_html, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('TERMS_OF_SERVICE', terms_of_service_info_page_html, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (key) DO UPDATE SET
        content_html = EXCLUDED.content_html,
        updated_at = CURRENT_TIMESTAMP;

COMMIT;

END $$;
