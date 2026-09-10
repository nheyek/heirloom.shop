DO $$

DECLARE
    old_sample_shop_ids CONSTANT INT[] := ARRAY[3, 4, 5, 6, 7];
    retired_shop_ids CONSTANT INT[] := ARRAY[1, 2];
    catalog_legacy_default_inventory CONSTANT INT := 10;
    catalog_default_inventory CONSTANT INT := 5;
    catalog_default_track_inventory CONSTANT BOOLEAN := true;

    shop_3_id INT := 3;
    shop_3_short_id VARCHAR := 'sF7t';
    shop_3_title VARCHAR := 'Santa Barbara Forge';
    shop_3_profile_image_uuid VARCHAR := '41582661-49C7-41E2-8B35-F5ECC74BF465';
    shop_3_location VARCHAR := 'Santa Barbara, CA';
    shop_3_classification VARCHAR := 'Hand-Forged Ironwork';
    shop_3_profile_rich_text TEXT := '<h1>Our Story</h1><p>Santa Barbara''s blacksmithing tradition dates back to 1916, when the Craviotto Bros. opened a steel shop that became the heart of ironwork in the city, until the brothers retired in the mid-1990s and the forge fell silent.</p><h1>Passing the Torch</h1><p>In 2010, we took over the Craviotto Bros.'' original workshop, meeting with the family directly to carry their craft forward &mdash; a passing of the torch in the truest sense. What started as one small forge has grown into a full workshop for architectural ironwork, bespoke furniture, and cookware.</p><h1>From Railings to Ranges</h1><p>We added cookware to the shop wanting to give customers something more intimate than a custom gate or staircase. The first pan was built small on purpose, so it would fit in any kitchen, before the line grew to include larger pans, spatulas, ladles, and hand-forged cleavers.</p><h1>Why Hand-Forged Steel</h1><p>Hammering steel by hand compresses and aligns its grain in a way casting never can, so our pans season faster, heat more evenly, and end up lighter and less porous than cast iron of the same size.</p><h1>Made to Be Handed Down</h1><p>Every piece that leaves our forge, from a stair rail to a skillet, still carries the mark of the hammer and the hands that shaped it, built the same way the Craviotto Bros. built things a century ago: to outlast the person who bought it.</p>';
    shop_3_country_code CHAR(2) := 'US';

    shop_4_id INT := 4;
    shop_4_short_id VARCHAR := 'rW9c';
    shop_4_title VARCHAR := 'Rookwood';
    shop_4_profile_image_uuid VARCHAR := '13dc817e-4c28-4900-91ca-b64920bb8777';
    shop_4_location VARCHAR := 'Cincinnati, OH';
    shop_4_classification VARCHAR := 'Art Pottery & Tile';
    shop_4_country_code CHAR(2) := 'US';
    shop_4_profile_rich_text TEXT := '<h1>Our Story</h1><p>Rookwood Pottery was founded in 1880 by Maria Longworth Storer, the first woman to found a manufacturing company in the United States. Inspired by the Japanese and French ceramics she saw at the Centennial Exhibition, she started the company with a single kiln in Cincinnati and a simple rule: designs shall be original, and individuality shall be the goal.</p><h1>A Golden Age of Glaze</h1><p>Rookwood''s chemists spent decades perfecting glazes found nowhere else, from the glowing amber Tiger Eye to the soft, frosted Vellum finish introduced in 1904. By 1900 the young company had already won a gold medal at the Paris Exposition, cementing Cincinnati''s place at the center of the American art pottery movement.</p><h1>Beyond the Vase</h1><p>Rookwood tile found its way into some of the country''s grandest interiors, including Cincinnati''s Union Terminal and Carew Tower, New York''s Grand Central Terminal, and the Seelbach Hilton in Louisville. Even after a century, those installations remain, glazed testaments to work done in this same city.</p><h1>Handmade, Still</h1><p>Every piece still passes through more than a dozen hands on its way from wet clay to finished glaze, thrown, trimmed, dipped, and fired using techniques developed generations ago. We treat the small imperfections that come with that process not as flaws, but as proof that a person, not a machine, made your piece.</p><h1>Back Home in Cincinnati</h1><p>The company closed its kilns in 1967, but collector Arthur Townley bought what remained in 1982. In 2004 he partnered with Cincinnati investors to bring Rookwood back to its original city, this time to the Over-the-Rhine neighborhood, where it fires pottery again today. Since 2011, the company has been owned by Marilyn Scripps, continuing Rookwood as a woman-led business, just as it began.</p><h1>The Heritage Collection</h1><p>A rotating selection of designs pulled from Rookwood''s own archives, some dating back to 1880, revived and stamped with an updated mold number marking its return. Each piece is a faithful reissue of a historic form, made using the same hand process as the original.</p>';

    shop_5_id INT := 5;
    shop_5_short_id VARCHAR := 'mV3q';
    shop_5_title VARCHAR := 'Simon Pearce';
    shop_5_profile_image_uuid VARCHAR := 'a701ead2-6da9-4e25-900b-e7cd10aad7b6';
    shop_5_location VARCHAR := 'Quechee, VT';
    shop_5_classification VARCHAR := 'Handblown Glassware';
    shop_5_country_code CHAR(2) := 'US';
    shop_5_profile_rich_text TEXT := '<h1>Our Story</h1><p>Simon Pearce learned glassblowing in Ireland and Italy before opening his first workshop in Kilkenny, Ireland in 1971. In 1981, he moved his workshop to Vermont, settling into a disused woolen mill on the Ottauquechee River in Quechee.</p><h1>The Mill at Quechee</h1><p>That mill, built in 1778, still houses our flagship glassblowing studio today, powered entirely by the same river that once ran the woolen looms. Visitors can watch our glassblowers work the furnace in person, any day of the week.</p><h1>No Fillers, No Shortcuts</h1><p>Every piece is still mouth-blown using a traditional Scandinavian glass recipe, with no fillers or coatings. We leave the pontil mark, the small scar left by a glassblower''s punty rod, on every piece &mdash; a signature of the hands that made it, not a flaw to be polished away.</p><h1>Clay, Too</h1><p>Alongside our glassblowers, a team of potters hand-throws stoneware on the wheel at our workshops in Quechee and Windsor, Vermont.</p><h1>Where to Find Us</h1><p>We now operate stores across New England and beyond, from Burlington and Stowe to Boston, Portland, and Alexandria, but every piece we sell is still made in Vermont, by hand.</p>';

    shop_6_id INT := 6;
    shop_6_short_id VARCHAR := 'fK6x';
    shop_6_title VARCHAR := 'Farfalli';
    shop_6_profile_image_uuid VARCHAR := '822a92af-624a-456a-9302-1aca7d542b61';
    shop_6_location VARCHAR := 'Maniago, Italy';
    shop_6_classification VARCHAR := 'Premium Corkscrews & Barware';
    shop_6_country_code CHAR(2) := 'IT';
    shop_6_profile_rich_text TEXT := '<h1>Our Story</h1><p>Farfalli was founded in 1950 by Marino Farfalli in Maniago, Italy, a town long known around the world for its knife making. The company began by producing pocket knives engraved with Italian city scenes, sold to postwar tourists.</p><h1>From Knives to Corkscrews</h1><p>Marino''s sons, Giovanni, Mario, Germano, and Armando, expanded the catalog into pocket and waiter''s corkscrews. By the 1970s, corkscrews had become the company''s core business, and have remained so ever since.</p><h1>A Family Business, Still</h1><p>Since 2000, Farfalli has been run by Marino''s nephew, Daniele, continuing four generations of family ownership. Each piece is designed in-house, often in collaboration with the ISIA design school in nearby Pordenone, and finished in the company''s own plating workshop.</p><h1>Built to Last</h1><p>Our corkscrews are made from brass, stainless steel, wood, and horn, among other materials, using two of the company''s own patented mechanisms. We hold ISO 9001 quality certification and export our work worldwide.</p>';

    shop_7_id INT := 7;
    shop_7_short_id VARCHAR := 'wD5n';
    shop_7_title VARCHAR := 'Big Dipper Wax Works';
    shop_7_profile_image_uuid VARCHAR := '302c73b3-68f1-4223-af98-cea4790fd6ba';
    shop_7_location VARCHAR := 'Seattle, WA';
    shop_7_classification VARCHAR := 'Pure Beeswax Candles';
    shop_7_country_code CHAR(2) := 'US';
    shop_7_profile_rich_text TEXT := '<h1>Our Story</h1><p>Big Dipper Wax Works began in the summer of 1993, when our founder, Brent Roose, was hiking Washington''s Olympic Peninsula and got the idea for a beeswax candle company while stargazing at the Big Dipper.</p><h1>Beeswax, Filtered Naturally</h1><p>We source raw beeswax primarily from beekeepers across the Pacific Northwest and British Columbia, then filter it through natural clay rather than chemicals, a process that removes impurities while keeping the wax''s natural color and faint honey scent intact.</p><h1>Hand-Poured, Hand-Dipped</h1><p>Every pillar is hand-poured and every taper is hand-dipped, some as many as twenty times, by small teams of artisans working out of our design studio in Atlanta, Georgia. Our wicks are 100% cotton, free of lead and metal, so they burn clean.</p><h1>Giving Back</h1><p>We donate 5% of our net profits to organizations working on bee sustainability, education, and outreach &mdash; work that only makes sense for a company built on what bees make.</p>';

    listing_2_id INT := 2;
    listing_2_short_id VARCHAR := 'Yb3Hn';
    listing_2_shop_id INT := shop_3_id;
    listing_2_category_id VARCHAR := 'HOUSEWARES';
    listing_2_title VARCHAR := 'Sonora Small Pan';
    listing_2_subtitle VARCHAR := 'Hand-forged carbon steel pan with a short handle, gently sloping sidewalls, and hammered texture.';
    listing_2_price_cents INT := 15500;
    listing_2_image_uuids text[] := '{"3DE08646-9C92-4B2E-94A3-8EEE7AB5C6C0", "202AE1CC-8A97-4A99-8AAC-E2D0C37DD2B4", "21B3D03E-DEF2-4712-8030-D3DCBCF2370B", "4A672E7C-AE45-4D43-A148-9E0A7B718BC7", "53B8648E-BD2B-4D51-AF64-FF15F4ECC078"}';
    listing_2_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>With a short hand-forged handle, gently sloping sidewalls, and hammered texture, our small carbon steel Sonora pan is an extremely versatile utensil for any kitchen. Fantastic for omelets, vegetables, and single meat cuts.</p><p>Made in our shop in Santa Barbara, California. Each item we make is unique and comes with slight imperfections in shape, finish, and color. It''s all part of the character of the pieces we sell, and will not affect performance.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Total length (handle to rim): 15.5\"</li><li>Rim to rim: 8.75\"</li><li>Flat interior cooking surface: 6.25\"</li><li>Height from table to handle top: 4\"</li><li>Height from table to bowl lip: 1.25\"</li><li>Handle length: 7.25\"</li><li>Weight: Approximately 3 lbs</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Like a good leather jacket, it only gets better with age. As your pan gains its season it will change gracefully and become even more non-stick.</p>"
        }
    ]';

    listing_3_id INT := 3;
    listing_3_short_id VARCHAR := 'Qz7Rk';
    listing_3_shop_id INT := shop_3_id;
    listing_3_category_id VARCHAR := 'HOUSEWARES';
    listing_3_title VARCHAR := 'Sonora Large Pan';
    listing_3_subtitle VARCHAR := 'Hand-forged carbon steel large frying pan, with an optional pineapple-twist helper handle riveted opposite the straight handle.';
    listing_3_price_cents INT := 22500;
    listing_3_image_uuids text[] := '{"C4C307F8-6130-46A9-A8CB-A0892802EFE5", "4728F288-C50F-42C4-B662-99611B97E1F6", "EE11BA0E-024C-40E1-97B2-3BC38D5EE469", "52E80887-33D6-4360-9280-7466C83B45FE", "4E187B30-37BF-4781-BE49-030C01DC6557", "4AE12AE3-DB88-4B02-A222-F29B5B563204", "8C6ACC56-0E36-4252-A50A-52D80F753D02"}';
    listing_3_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>All the beauty and functionality of the carbon steel Sonora Large Frying Pan, available on its own or with an added hand-forged pineapple-twist helper handle riveted to the rim opposite the straight handle.</p><p>Made in our shop in Santa Barbara, California. Each item we make is unique and comes with slight imperfections in shape, finish, and color. It''s all part of the character of the pieces we sell, and will not affect performance.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Total length, standard (handle to rim): 15.5\"</li><li>Total length, with helper handle (handle to opposite handle): 21.5\"</li><li>Rim to rim: 11\"</li><li>Flat interior cooking surface: 9.25\"</li><li>Height from table to long handle top: 4.5\"</li><li>Height from table to bowl lip: 1.375\"</li><li>Long handle length: 9\"</li><li>Helper handle height: 3.5\"</li><li>Weight: Approximately 5.4-5.8 lbs</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Like a good leather jacket, it only gets better with age. As your pan gains its season it will change gracefully and become even more non-stick.</p>"
        }
    ]';

    listing_3_style_variation_id CONSTANT VARCHAR := '7a1c9e2d-4f3b-4a5e-9c8d-1e2f3a4b5c6d';
    listing_3_style_standard_id  CONSTANT VARCHAR := '8b2d0f3e-5a4c-4b6f-8d9e-2f3a4b5c6d7e';
    listing_3_style_handle_id    CONSTANT VARCHAR := '9c3e1a4f-6b5d-4c7a-9e0f-3a4b5c6d7e8f';

    listing_4_id INT := 4;
    listing_4_short_id VARCHAR := 'Wm2Fp';
    listing_4_shop_id INT := shop_3_id;
    listing_4_category_id VARCHAR := 'HOUSEWARES';
    listing_4_title VARCHAR := 'Sonora Roaster Pan';
    listing_4_subtitle VARCHAR := 'Hand-forged carbon steel roaster with two helper handles and a gently curving sidewall, sized for larger meals.';
    listing_4_price_cents INT := 30500;
    listing_4_image_uuids text[] := '{"6FF3E7F8-23DE-490C-A348-3CFB227FFDC7", "ADE78DEA-75CB-4CE6-AA6C-B0FE71637C26", "60830011-8454-45EC-AA45-578DBE530E6E", "FF5B2BC4-5CB4-4DC1-B48F-7A2585E29099", "39AF3CA5-4856-43B0-BB1C-AA6DBE718543", "77A728E0-90D2-42DC-A60A-276861A9B868", "5A1E2109-A2B9-42B9-A8E5-E7EE7B9521C0", "FF235BEE-6A5E-4E40-9467-E80A3558100A"}';
    listing_4_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>With two hand-forged helper handles and a gently curving sidewall, our carbon steel Sonora Roaster pan provides a versatile cooking surface that can handle several foods at once. A stunning centerpiece of any kitchen or table, this pan is ideal for cooking larger meals. Cook eggs on one side and chorizo in the other, or throw in the entire bird!</p><p>Made in our shop in Santa Barbara, California. Each item we make is unique and comes with slight imperfections in shape, finish, and color. It''s all part of the character of the pieces we sell, and will not affect performance.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Total width (handle to handle): 15.5\"</li><li>Rim to rim: 13.5\"</li><li>Flat interior cooking surface: 11\"</li><li>Height from table to handle top: 4\"</li><li>Height from table to bowl lip: 1.75\"</li><li>10 gauge steel (approx. 0.135\" thick)</li><li>Weight: Approximately 6.3 lbs</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Like a good leather jacket, it only gets better with age. As your pan gains its season it will change gracefully and become even more non-stick.</p>"
        }
    ]';

    listing_5_id INT := 5;
    listing_5_short_id VARCHAR := 'Tp9Xr';
    listing_5_shop_id INT := shop_4_id;
    listing_5_category_id VARCHAR := 'HOUSEWARES';
    listing_5_title VARCHAR := 'Rook Dish';
    listing_5_subtitle VARCHAR := 'A rare heritage design from the Rookwood archives, revived after more than 60 years out of production.';
    listing_5_price_cents INT := 11000;
    listing_5_image_uuids text[] := '{"629d0a0c-7e23-4db5-b8c1-06484b4f51c6", "2796933c-b627-47d3-8a3e-0b3f40eb62d6", "2024d43f-56ba-41d1-a210-3abcbb329944", "e7c095f5-f655-482b-a5d2-5030f7410f2a", "f2db92f0-d2a8-4149-90f2-3e1668261b21", "79384d77-b0c5-4073-839e-6f9c3fccdafb"}';
    listing_5_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>A rare heritage design from the Rookwood archives, unseen in production for over 60 years, makes its return. First introduced in the early 1900s as an ashtray by John D. Wareham, a pivotal figure in Rookwood''s history, the piece stands as a symbol of our namesake.</p><p>Now reimagined as a scaled-down take on the original archival form, with sharper, more defined carving along the rook''s back, the dish functions beautifully as a catchall or jewelry dish. Each piece features variation in glaze, making every one uniquely individual.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Height: 4\"</li><li>Width at widest point: 8\"</li><li>Designer: John D. Wareham</li><li>Mold number: 1139-25</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Heritage ceramic. Hand wash recommended to preserve the glaze finish.</p>"
        }
    ]';

    listing_6_id INT := 6;
    listing_6_short_id VARCHAR := 'Bv4Ln';
    listing_6_shop_id INT := shop_4_id;
    listing_6_category_id VARCHAR := 'HOUSEWARES';
    listing_6_title VARCHAR := 'Boule Vase';
    listing_6_subtitle VARCHAR := 'A vase to return to, shaping small bouquets into moments worth noticing, perfectly scaled and always at home.';
    listing_6_price_cents INT := 9800;
    -- Raffia (white) hero shot doubles as the listing's main image, followed
    -- by the secondary images from both color galleries; Patina's own hero
    -- shot lives only on its variation option, per imagesVary.
    listing_6_image_uuids text[] := '{"9906200e-e023-4c67-bc1c-f0471edddc0f", "6c2cc985-e30e-4931-9e5c-f68c4b4bb022", "8f522584-142e-4ce2-8c2f-35080f3cdc8c", "ef72f50e-2852-480b-a3cf-c6e666ec18af", "097f50f0-3ef4-43f3-bacf-4cc77d0a3b35", "9f8b657e-9f64-4a28-9ba6-db75443c3259"}';
    listing_6_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>A 1920s Rookwood design, original mold no. 2918E, designed by John D. Wareham, who joined Rookwood in 1893 as a decorator and later served as president from 1934 to 1954. Revived in 2025 with an updated mold no. 2918E-25 as part of the Heritage Collection.</p><p>Available in Raffia, a warm creamy white with a soft, gentle sheen, or Patina, a deep green with a reflective, mirror-like finish. Variation in glaze makes each piece uniquely its own.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Height: 7.5\"</li><li>Width at widest point: 5.5\"</li><li>Designer: John D. Wareham</li><li>Mold number: 2918E-25</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Heritage ceramic. Hand wash recommended to preserve the glaze finish.</p>"
        }
    ]';

    listing_6_color_variation_id CONSTANT VARCHAR := 'ec353f9f-d888-40f1-9fd9-4095d37ab23c';
    listing_6_color_raffia_id    CONSTANT VARCHAR := '69851e94-e5af-4ab4-bffa-1188c5239fc4';
    listing_6_color_patina_id    CONSTANT VARCHAR := '244100e9-24f7-467d-8206-5c3e695d7858';
    listing_6_raffia_image_uuid  CONSTANT VARCHAR := '9906200e-e023-4c67-bc1c-f0471edddc0f';
    listing_6_patina_image_uuid  CONSTANT VARCHAR := 'ab62ad13-0208-4547-9aa4-4bf4f53cd1dd';

    listing_10_id INT := 10;
    listing_10_short_id VARCHAR := 'Cn6Vz';
    listing_10_shop_id INT := shop_4_id;
    listing_10_category_id VARCHAR := 'HOUSEWARES';
    listing_10_title VARCHAR := 'Cornet Vase';
    listing_10_subtitle VARCHAR := 'A vase that holds its own—designed for sweeping stems and bold florals, offering height, balance, and unmistakable character.';
    listing_10_price_cents INT := 12800;
    -- Raffia (white) hero shot doubles as the listing's main image, followed
    -- by the secondary images from both color galleries; Patina's own hero
    -- shot lives only on its variation option, per imagesVary.
    listing_10_image_uuids text[] := '{"fdaf290c-c774-4e7a-9361-ebac5b1f0da6", "97acb04f-56a6-4a78-8ddc-f6753f4072d5", "e8ccabe8-9b2f-40db-a6de-185381ca42a6", "bff4491b-41e3-478f-ae66-dd11c6031b6f", "7f72607f-2ef2-420e-a88d-bb8031366eb6", "0d0b90b0-5400-455d-af36-2cb77e2d6b8e", "289bd6b9-b501-463b-ba33-443b7f665109"}';
    listing_10_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>A 1920s Rookwood design, original mold no. 2880, designed by John D. Wareham. Revived in 2025 with an updated mold no. 2880-25 to mark its reintroduction, as part of the Heritage Collection, a rotating selection of Rookwood designs from the archives showcasing historic forms dating back to 1880.</p><p>Available in Raffia, a warm creamy white with a soft, gentle sheen, or Patina, a deep green with a reflective, mirror-like finish. Variation in glaze makes each piece uniquely its own.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Height: 9.25\"</li><li>Width at widest point: 5\"</li><li>Designer: John D. Wareham</li><li>Mold number: 2880-25</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Heritage ceramic. Hand wash recommended to preserve the glaze finish.</p>"
        }
    ]';

    listing_10_color_variation_id CONSTANT VARCHAR := '9ca03d37-45af-4e1e-9ceb-590169370054';
    listing_10_color_raffia_id    CONSTANT VARCHAR := '5161c2e5-f544-43fa-80e5-a63e6d39d979';
    listing_10_color_patina_id    CONSTANT VARCHAR := 'fd06615a-5966-4819-8bc7-9bbce76264cb';
    listing_10_raffia_image_uuid  CONSTANT VARCHAR := 'fdaf290c-c774-4e7a-9361-ebac5b1f0da6';
    listing_10_patina_image_uuid  CONSTANT VARCHAR := '2a6bedc5-2397-43b4-80ef-c1ca3de733f0';

    listing_12_id INT := 12;
    listing_12_short_id VARCHAR := 'Fx8Wq';
    listing_12_shop_id INT := shop_4_id;
    listing_12_category_id VARCHAR := 'HOUSEWARES';
    listing_12_title VARCHAR := 'Pillar Candle Holder';
    listing_12_subtitle VARCHAR := 'Ceramic pillar candle holder that fits candles up to 3 inches in diameter, in your choice of glaze.';
    listing_12_price_cents INT := 3200;
    -- Raffia (white) hero shot doubles as the listing's main image, followed
    -- by the secondary images from both color galleries; Patina's own hero
    -- shot lives only on its variation option, per imagesVary.
    listing_12_image_uuids text[] := '{"86e03348-2ead-426d-9333-b650491ccd9f", "e4c59c78-aaba-4cbf-ab0b-ecf977021bd3", "200c92e3-60b3-4c0c-8b27-b5ff4d1a8c2f", "045e400d-9603-48ca-a2ca-4efd501e2b7c", "ce668962-3c3f-4118-ad44-e03bb6bceadd", "b8418f2c-77dd-4e9a-b200-0027c72ef705", "3333fb95-e853-4bb2-b537-ea8af9f7bfa6", "020453e9-55e0-453f-8a30-524ad5f82278", "f2d5f95d-e850-483c-8898-b58e896048a2"}';
    listing_12_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>A ceramic pillar candle holder, glazed in Raffia, a warm creamy white with a soft, gentle sheen, or Patina, a deep green with a reflective, mirror-like finish. Unlike our Heritage Collection pieces, this is a current-production design rather than an archival revival.</p><p>Fits candles up to 3 inches in diameter. Variation in glaze makes each piece uniquely its own.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Height: 1.25\"</li><li>Width at widest point: 4.25\"</li><li>Fits candles up to 3\" in diameter</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Ceramic. Hand wash recommended to preserve the glaze finish.</p>"
        }
    ]';

    listing_12_color_variation_id CONSTANT VARCHAR := 'a1b2c3d4-1111-4a5b-8c9d-e1f2a3b4c5d6';
    listing_12_color_raffia_id    CONSTANT VARCHAR := 'a1b2c3d4-2222-4a5b-8c9d-e1f2a3b4c5d6';
    listing_12_color_patina_id    CONSTANT VARCHAR := 'a1b2c3d4-3333-4a5b-8c9d-e1f2a3b4c5d6';
    listing_12_raffia_image_uuid  CONSTANT VARCHAR := '86e03348-2ead-426d-9333-b650491ccd9f';
    listing_12_patina_image_uuid  CONSTANT VARCHAR := '1d56dad8-75a6-468c-9f2a-f8ff364ffde5';

    listing_13_id INT := 13;
    listing_13_short_id VARCHAR := 'Gm4Rt';
    listing_13_shop_id INT := shop_5_id;
    listing_13_category_id VARCHAR := 'HOUSEWARES';
    listing_13_title VARCHAR := 'Madison Wine Decanter';
    listing_13_subtitle VARCHAR := 'Handblown wine decanter with a wide base for aeration and a flared neck, holding up to 32 ounces.';
    listing_13_price_cents INT := 20500;
    listing_13_image_uuids text[] := '{"eb392bc2-cca2-453e-8488-da400c560c88", "65e4dc09-2ed6-474a-b28c-f82eb18d13fd", "45fa9435-034f-4a85-94d9-90ee49c35084", "67285d64-de0f-4fb4-ab18-214472b76140", "f2e0bd7c-b4b6-4403-8429-b5254c3b57ee", "c836a6d3-70f4-4f52-af1f-323add2b2388", "18660911-63aa-43f9-a86b-7532b9f45947"}';
    listing_13_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Blown by hand from a single gather of molten glass, the Madison decanter''s wide base exposes wine to more air as it is poured, softening young reds and opening up their aromatics. The flared neck pours cleanly, even one-handed.</p><p>As with all of our glass, each piece keeps its pontil mark, the small mark left by the glassblower''s punty rod, a signature of the hands that made it.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Width: 8.25\"</li><li>Depth: 8\"</li><li>Height: 8\"</li><li>Capacity: 32 oz</li><li>Weight: Approximately 4.2 lbs</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Hand wash recommended.</p>"
        }
    ]';

    listing_14_id INT := 14;
    listing_14_short_id VARCHAR := 'Hp5Sv';
    listing_14_shop_id INT := shop_5_id;
    listing_14_category_id VARCHAR := 'HOUSEWARES';
    listing_14_title VARCHAR := 'Vintner Red Wine Glasses';
    listing_14_subtitle VARCHAR := 'Set of two handblown red wine glasses with a wide bowl for aerating full-bodied reds, made using a pulled-stem technique.';
    listing_14_price_cents INT := 19000;
    listing_14_image_uuids text[] := '{"5aa7dadf-f35f-432e-b606-5085bc29194b", "e5a61d9c-553d-4213-a445-d0f87cd473ae", "2ff8bcc3-b144-4b11-9e53-539889d19b04", "fc265e3e-db81-4907-bf59-110deab978e3", "ef5b36ad-e223-4c11-a884-b511750c8b71", "2f5821e1-77f5-4600-a795-1bc15a937b71", "13960471-4c7e-4203-93ef-fd6a8ed205f0", "9cff28f8-8ff3-48ce-bcf9-c76660face36"}';
    listing_14_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Made using a pulled-stem technique that leaves faint ripple lines in the glass, these red wine glasses have a wide bowl to help aerate everything from pinot noir to cabernet and merlot. Sold as a set of two, gift-boxed.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Width: 4\"</li><li>Depth: 4\"</li><li>Height: 9.125\"</li><li>Capacity: 18 oz</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Hand wash recommended.</p>"
        }
    ]';

    listing_15_id INT := 15;
    listing_15_short_id VARCHAR := 'Jn6Tw';
    listing_15_shop_id INT := shop_5_id;
    listing_15_category_id VARCHAR := 'HOUSEWARES';
    listing_15_title VARCHAR := 'Vintner White Wine Glasses';
    listing_15_subtitle VARCHAR := 'Set of two handblown white wine glasses with a narrower bowl to preserve crisp aromatics, made using a pulled-stem technique.';
    listing_15_price_cents INT := 19000;
    listing_15_image_uuids text[] := '{"33cb8044-f39d-4e65-8db5-3f4807716b1e", "673eb52d-18bb-431f-9289-cefcd5e97a44", "21c82821-d8f1-4860-929c-41837885d4b5", "c4b30171-77a1-4819-9bba-c3a4fb4eb48e", "4c039a0d-1839-4335-80e7-db44d2a20a82", "c83ec6c9-b09c-49cc-897f-01c7a6285ee8", "bc7b9457-8541-497a-afc7-6b8bf0f7f418", "7663b0af-c082-489a-8c4a-69ecbd4071de"}';
    listing_15_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Made using the same pulled-stem technique as our Vintner reds, these white wine glasses have a narrower bowl suited to pinot grigio, sauvignon blanc, chardonnay, riesling, and rosé. Sold as a set of two, gift-boxed.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Width: 3.125\"</li><li>Depth: 3.125\"</li><li>Height: 8.875\"</li><li>Capacity: 12 oz</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Hand wash recommended.</p>"
        }
    ]';

    listing_16_id INT := 16;
    listing_16_short_id VARCHAR := 'Kq3Xz';
    listing_16_shop_id INT := shop_5_id;
    listing_16_category_id VARCHAR := 'HOUSEWARES';
    listing_16_title VARCHAR := 'Shoreham Whiskey Glasses';
    listing_16_subtitle VARCHAR := 'Set of two handblown whiskey glasses with a weighted base and curved body, designed with Vermont''s WhistlePig distillers.';
    listing_16_price_cents INT := 16000;
    listing_16_image_uuids text[] := '{"23164bb5-bf3a-46ac-92c6-431342fa18f1", "d4e82db7-a7d2-4036-8a04-a4cdcdcd78b7", "5dd726c2-e384-4069-b479-34914df8ccce", "4d335b5b-4997-4682-9a62-dd3f94c9763e", "66b51d02-c4e5-4b81-8df3-9e9103ac99dd", "1ca868fb-9b42-44e6-a0c5-9dacd2ad499b", "35b495bd-5599-4576-8126-8d77ccee157a"}';
    listing_16_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Co-designed with the distillers at WhistlePig, whose farm and distillery sit in Shoreham, Vermont, these whiskey glasses have a curved body and a pronounced, weighted base that concentrates aroma. Sold as a set of two, gift-boxed.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Width: 3\"</li><li>Depth: 3\"</li><li>Height: 3.5\"</li><li>Capacity: 7 oz</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Hand wash recommended.</p>"
        }
    ]';

    listing_17_id INT := 17;
    listing_17_short_id VARCHAR := 'Lr5Vy';
    listing_17_shop_id INT := shop_6_id;
    listing_17_category_id VARCHAR := 'HOUSEWARES';
    listing_17_title VARCHAR := 'King Corkscrew';
    listing_17_subtitle VARCHAR := 'A rack-and-pinion corkscrew modeled on 18th-century designs, in solid brass with a deliberately aged finish.';
    listing_17_price_cents INT := 18000;
    listing_17_image_uuids text[] := '{"bf69d976-ddff-4909-a20a-bc2231abf145", "1818b009-5aa4-4d51-9096-1e006518a587", "066a5674-3cbf-413f-8edc-d0bc06344e54", "9bf55f06-701b-41c9-9c92-5f16b4cbecc7", "6d7bb022-8b2b-41aa-ba3c-078088454b35", "80a57b96-1621-4b4b-a2f1-49e29da7015e"}';
    listing_17_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>A faithful reproduction of an 18th-century rack-and-pinion corkscrew, part of Farfalli''s Originals collection. The metal is deliberately aged to emphasize the piece''s character, and every corkscrew is hand-finished from first-choice materials.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>Structure: Brass</li><li>Spiral: Steel</li><li>Mechanism: Steel, rack-and-pinion</li><li>Made in Maniago, Italy</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Wipe clean with a dry cloth. Not dishwasher safe.</p>"
        }
    ]';

    listing_18_id INT := 18;
    listing_18_short_id VARCHAR := 'Mt6Wb';
    listing_18_shop_id INT := shop_6_id;
    listing_18_category_id VARCHAR := 'HOUSEWARES';
    listing_18_title VARCHAR := 'Vaja Corkscrew, Olive';
    listing_18_subtitle VARCHAR := 'A two-pin lever corkscrew with an olive wood handle, designed with Italy''s national sommelier association to keep the cork pulling perfectly straight.';
    listing_18_price_cents INT := 14000;
    listing_18_image_uuids text[] := '{"335eb2ba-334e-421b-9432-7485305448a9", "43a4133e-0f15-43c0-b282-0aa7f358c3ba", "09f222fc-5e6a-4f89-a458-665c72ac7056", "be3a622e-4a13-4db4-a1ca-ac5e83adda45"}';
    listing_18_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>The Vaja uses Farfalli''s patented dual-axis system: the spiral is mounted on two pins instead of one, so the cork pulls straight up in a single, steady motion. It was developed with the Italian Sommelier Association of Veneto and named for Storm Vaja, which struck the Veneto region''s forests in 2018 &mdash; it went on to become the official corkscrew of the 53rd AIS National Congress in 2019.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>Structure: Stainless steel</li><li>Handle: Olive wood</li><li>Spiral &amp; blade: AISI 420 hardened steel</li><li>Made in Maniago, Italy</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Hand wash and dry immediately to preserve the wood handle. Not dishwasher safe.</p>"
        }
    ]';

    listing_19_id INT := 19;
    listing_19_short_id VARCHAR := 'Nv7Xc';
    listing_19_shop_id INT := shop_6_id;
    listing_19_category_id VARCHAR := 'HOUSEWARES';
    listing_19_title VARCHAR := 'Olive Stopper';
    listing_19_subtitle VARCHAR := 'A stainless steel wine stopper topped with a solid olive wood cap.';
    listing_19_price_cents INT := 4500;
    listing_19_image_uuids text[] := '{"3758de08-8e56-45e5-ae46-47d04103be54", "d0b2394a-3301-4137-9a81-08e16eaf84f9", "d120fae7-a60d-4261-ab56-ed7d3ea0556c"}';
    listing_19_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Part of Farfalli''s Accessories line, this wine stopper pairs a stainless steel body and stem with a solid olive wood top. Farfalli offers the same stopper in several other woods, but olive is our pick for its fine, tight grain.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>Body &amp; stem: Stainless steel</li><li>Top: Olive wood</li><li>Made in Maniago, Italy</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Hand wash and dry the wood promptly. Not dishwasher safe.</p>"
        }
    ]';

    listing_20_id INT := 20;
    listing_20_short_id VARCHAR := 'Pw8Zd';
    listing_20_shop_id INT := shop_7_id;
    listing_20_category_id VARCHAR := 'HOUSEWARES';
    listing_20_title VARCHAR := '2" Pillar Candle';
    listing_20_subtitle VARCHAR := 'Small hand-poured pillar candle in 100% pure, natural beeswax, burning for up to 40 hours.';
    listing_20_price_cents INT := 1300;
    listing_20_image_uuids text[] := '{"c4523cf9-1a77-48fd-a9ba-1e9baf5dd077", "3ca1efd8-28e2-40fd-914f-c8151768b0d7", "221ab6fd-c5c2-4d08-8721-efd3d0c7e369", "9319151f-4797-458c-9b38-40aca0a8bf2f", "2a22872d-ca06-456b-8078-fc493e1072be", "14c33f3b-fd03-49d0-932d-785bc06b3983"}';
    listing_20_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Our smallest pillar candle, hand-poured from 100% pure beeswax with no synthetic additives. Naturally unscented, with the faint honey aroma that comes from the beeswax itself.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>Size: 2\" diameter x 4.75\" tall</li><li>Burn time: Up to 40 hours</li><li>Materials: 100% pure beeswax, 100% cotton wick</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Trim the wick to 1/4\" before each lighting.</p>"
        }
    ]';

    listing_21_id INT := 21;
    listing_21_short_id VARCHAR := 'Qx9Bf';
    listing_21_shop_id INT := shop_7_id;
    listing_21_category_id VARCHAR := 'HOUSEWARES';
    listing_21_title VARCHAR := '3" Pillar Candle';
    listing_21_subtitle VARCHAR := 'Hand-poured pillar candle in 100% pure, natural beeswax, available in three heights.';
    listing_21_price_cents INT := 2200;
    -- Composite of all three heights side by side (bases matched to true
    -- scale) leads the gallery, followed by secondary images from each
    -- height. Each height's own hero shot lives only on its variation
    -- option's imageUuid, per imagesVary.
    listing_21_image_uuids text[] := '{"d3b3c876-f02e-46d4-a857-b651c5bba322", "f8075b34-cd2b-4818-a494-85afd406cadd", "bb06034c-dfff-42ee-a86a-0c7c430de684", "b83ce102-5c5c-45a3-b5e0-1db6b3f101db", "751e0ce1-734b-486d-8e3f-ad19cd642428", "0a611296-6b3c-4554-b4f7-8afff05d06d0", "04435024-8e95-46ff-87c6-a20918dff8e0"}';
    listing_21_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Hand-poured from 100% pure beeswax with no synthetic additives, in three heights. Naturally unscented, with the faint honey aroma that comes from the beeswax itself.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>Diameter: 3\"</li><li>Medium (3.5\" tall): Burns up to 60 hours</li><li>Large (6\" tall): Burns up to 110 hours</li><li>Extra Large (9\" tall): Our longest-burning pillar</li><li>Materials: 100% pure beeswax, 100% cotton wick</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Trim the wick to 1/4\" before each lighting.</p>"
        }
    ]';

    listing_21_height_variation_id CONSTANT VARCHAR := 'b1c2d3e4-1111-4f5a-8b9c-d1e2f3a4b5c6';
    listing_21_height_medium_id    CONSTANT VARCHAR := 'b1c2d3e4-2222-4f5a-8b9c-d1e2f3a4b5c6';
    listing_21_height_large_id     CONSTANT VARCHAR := 'b1c2d3e4-3333-4f5a-8b9c-d1e2f3a4b5c6';
    listing_21_height_xl_id        CONSTANT VARCHAR := 'b1c2d3e4-4444-4f5a-8b9c-d1e2f3a4b5c6';
    listing_21_medium_hero_image_uuid CONSTANT VARCHAR := '7ed3f224-b00a-401c-8dbb-ebb7f95c1bd1';
    listing_21_large_hero_image_uuid  CONSTANT VARCHAR := 'e41525fd-3e18-4900-b270-2feca36ad544';
    listing_21_xl_hero_image_uuid     CONSTANT VARCHAR := '3a8a6543-953e-44ca-b70e-6e16163fdc7c';

    listing_22_id INT := 22;
    listing_22_short_id VARCHAR := 'Rz2Ck';
    listing_22_shop_id INT := shop_7_id;
    listing_22_category_id VARCHAR := 'HOUSEWARES';
    listing_22_title VARCHAR := 'Tapers';
    listing_22_subtitle VARCHAR := 'Hand-dipped taper candles in 100% pure, natural beeswax, sold as a set of 2.';
    listing_22_price_cents INT := 1225;
    listing_22_image_uuids text[] := '{"4d15d900-3d53-446f-8657-f59dd9bab94e"}';
    listing_22_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Each taper is hand-dipped roughly 17 to 20 times in 100% pure beeswax, with no synthetic additives. Naturally unscented, with the faint honey aroma that comes from the beeswax itself. Sold as a set of 2.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>12\" tall, 7/8\" diameter</li><li>Burns up to 12 hours</li><li>Materials: 100% pure beeswax, 100% cotton wick</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Trim the wick to 1/4\" before each lighting.</p>"
        }
    ]';

BEGIN

    -- H.M. Kala and Klimchi are being retired from the catalog entirely, not
    -- just left out of the upsert below — a plain omission would leave their
    -- stale rows behind forever. This cascades through ON DELETE CASCADE to
    -- their listings, featured_shop/featured_listing entries, and any real
    -- users' favorites of them, which is the intended, explicit outcome here.
    DELETE FROM shop WHERE id = ANY(retired_shop_ids);

    -- Clear out unused profile tables tied to the remaining catalog shops.
    -- Note: shop and listing themselves are intentionally NOT deleted here
    -- (they're upserted below instead) — deleting them would cascade through
    -- ON DELETE CASCADE to user_favorite_shop/user_favorite_listing and
    -- silently wipe out real users' favorites on every reseed.
    DELETE FROM listing_processing_profile WHERE shop_id = ANY(old_sample_shop_ids);
    DELETE FROM listing_shipping_profile WHERE shop_id = ANY(old_sample_shop_ids);
    DELETE FROM listing_return_profile WHERE shop_id = ANY(old_sample_shop_ids);
    DELETE FROM listing_personalization_profile WHERE shop_id = ANY(old_sample_shop_ids);

    INSERT INTO shop (id, short_id, title, profile_rich_text, profile_image_uuid, shop_location, classification, country_code, direct_fulfillment, created_at, updated_at)
    VALUES
        (shop_3_id, shop_3_short_id, shop_3_title, shop_3_profile_rich_text, shop_3_profile_image_uuid, shop_3_location, shop_3_classification, shop_3_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (shop_4_id, shop_4_short_id, shop_4_title, shop_4_profile_rich_text, shop_4_profile_image_uuid, shop_4_location, shop_4_classification, shop_4_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (shop_5_id, shop_5_short_id, shop_5_title, shop_5_profile_rich_text, shop_5_profile_image_uuid, shop_5_location, shop_5_classification, shop_5_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (shop_6_id, shop_6_short_id, shop_6_title, shop_6_profile_rich_text, shop_6_profile_image_uuid, shop_6_location, shop_6_classification, shop_6_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (shop_7_id, shop_7_short_id, shop_7_title, shop_7_profile_rich_text, shop_7_profile_image_uuid, shop_7_location, shop_7_classification, shop_7_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
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

    INSERT INTO listing (id, short_id, shop_id, category_id, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, combinations, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_2_id, listing_2_short_id, listing_2_shop_id, listing_2_category_id, listing_2_title, listing_2_subtitle, listing_2_full_descr, listing_2_price_cents, NULL, NULL, listing_2_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_3_id, listing_3_short_id, listing_3_shop_id, listing_3_category_id, listing_3_title, listing_3_subtitle, listing_3_full_descr, listing_3_price_cents, NULL, NULL, listing_3_image_uuids, NULL,
            jsonb_build_object(
                listing_3_style_variation_id, jsonb_build_object(
                    'name', 'Style',
                    'pricesVary', true,
                    'imagesVary', false,
                    'order', 0,
                    'options', jsonb_build_object(
                        listing_3_style_standard_id, jsonb_build_object('name', 'Standard', 'order', 0, 'priceCents', null, 'imageUuid', null),
                        listing_3_style_handle_id, jsonb_build_object('name', 'With helper handle', 'order', 1, 'priceCents', null, 'imageUuid', null)
                    )
                )
            ),
            jsonb_build_object(
                listing_3_style_variation_id || ':' || listing_3_style_standard_id, jsonb_build_object('priceCents', 22500, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_3_style_variation_id || ':' || listing_3_style_handle_id,   jsonb_build_object('priceCents', 24500, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_4_id, listing_4_short_id, listing_4_shop_id, listing_4_category_id, listing_4_title, listing_4_subtitle, listing_4_full_descr, listing_4_price_cents, NULL, NULL, listing_4_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_5_id, listing_5_short_id, listing_5_shop_id, listing_5_category_id, listing_5_title, listing_5_subtitle, listing_5_full_descr, listing_5_price_cents, NULL, NULL, listing_5_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_6_id, listing_6_short_id, listing_6_shop_id, listing_6_category_id, listing_6_title, listing_6_subtitle, listing_6_full_descr, listing_6_price_cents, NULL, NULL, listing_6_image_uuids, NULL,
            jsonb_build_object(
                listing_6_color_variation_id, jsonb_build_object(
                    'name', 'Color',
                    'pricesVary', false,
                    'imagesVary', true,
                    'order', 0,
                    'options', jsonb_build_object(
                        listing_6_color_raffia_id, jsonb_build_object('name', 'Raffia', 'order', 0, 'priceCents', null, 'imageUuid', listing_6_raffia_image_uuid),
                        listing_6_color_patina_id, jsonb_build_object('name', 'Patina', 'order', 1, 'priceCents', null, 'imageUuid', listing_6_patina_image_uuid)
                    )
                )
            ),
            jsonb_build_object(
                listing_6_color_variation_id || ':' || listing_6_color_raffia_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_6_color_variation_id || ':' || listing_6_color_patina_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_10_id, listing_10_short_id, listing_10_shop_id, listing_10_category_id, listing_10_title, listing_10_subtitle, listing_10_full_descr, listing_10_price_cents, NULL, NULL, listing_10_image_uuids, NULL,
            jsonb_build_object(
                listing_10_color_variation_id, jsonb_build_object(
                    'name', 'Color',
                    'pricesVary', false,
                    'imagesVary', true,
                    'order', 0,
                    'options', jsonb_build_object(
                        listing_10_color_raffia_id, jsonb_build_object('name', 'Raffia', 'order', 0, 'priceCents', null, 'imageUuid', listing_10_raffia_image_uuid),
                        listing_10_color_patina_id, jsonb_build_object('name', 'Patina', 'order', 1, 'priceCents', null, 'imageUuid', listing_10_patina_image_uuid)
                    )
                )
            ),
            jsonb_build_object(
                listing_10_color_variation_id || ':' || listing_10_color_raffia_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_10_color_variation_id || ':' || listing_10_color_patina_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_12_id, listing_12_short_id, listing_12_shop_id, listing_12_category_id, listing_12_title, listing_12_subtitle, listing_12_full_descr, listing_12_price_cents, NULL, NULL, listing_12_image_uuids, NULL,
            jsonb_build_object(
                listing_12_color_variation_id, jsonb_build_object(
                    'name', 'Color',
                    'pricesVary', false,
                    'imagesVary', true,
                    'order', 0,
                    'options', jsonb_build_object(
                        listing_12_color_raffia_id, jsonb_build_object('name', 'Raffia', 'order', 0, 'priceCents', null, 'imageUuid', listing_12_raffia_image_uuid),
                        listing_12_color_patina_id, jsonb_build_object('name', 'Patina', 'order', 1, 'priceCents', null, 'imageUuid', listing_12_patina_image_uuid)
                    )
                )
            ),
            jsonb_build_object(
                listing_12_color_variation_id || ':' || listing_12_color_raffia_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_12_color_variation_id || ':' || listing_12_color_patina_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_13_id, listing_13_short_id, listing_13_shop_id, listing_13_category_id, listing_13_title, listing_13_subtitle, listing_13_full_descr, listing_13_price_cents, NULL, NULL, listing_13_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_14_id, listing_14_short_id, listing_14_shop_id, listing_14_category_id, listing_14_title, listing_14_subtitle, listing_14_full_descr, listing_14_price_cents, NULL, NULL, listing_14_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_15_id, listing_15_short_id, listing_15_shop_id, listing_15_category_id, listing_15_title, listing_15_subtitle, listing_15_full_descr, listing_15_price_cents, NULL, NULL, listing_15_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_16_id, listing_16_short_id, listing_16_shop_id, listing_16_category_id, listing_16_title, listing_16_subtitle, listing_16_full_descr, listing_16_price_cents, NULL, NULL, listing_16_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_17_id, listing_17_short_id, listing_17_shop_id, listing_17_category_id, listing_17_title, listing_17_subtitle, listing_17_full_descr, listing_17_price_cents, NULL, NULL, listing_17_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_18_id, listing_18_short_id, listing_18_shop_id, listing_18_category_id, listing_18_title, listing_18_subtitle, listing_18_full_descr, listing_18_price_cents, NULL, NULL, listing_18_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_19_id, listing_19_short_id, listing_19_shop_id, listing_19_category_id, listing_19_title, listing_19_subtitle, listing_19_full_descr, listing_19_price_cents, NULL, NULL, listing_19_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_20_id, listing_20_short_id, listing_20_shop_id, listing_20_category_id, listing_20_title, listing_20_subtitle, listing_20_full_descr, listing_20_price_cents, NULL, NULL, listing_20_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_21_id, listing_21_short_id, listing_21_shop_id, listing_21_category_id, listing_21_title, listing_21_subtitle, listing_21_full_descr, listing_21_price_cents, NULL, NULL, listing_21_image_uuids, NULL,
            jsonb_build_object(
                listing_21_height_variation_id, jsonb_build_object(
                    'name', 'Height',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'options', jsonb_build_object(
                        listing_21_height_medium_id, jsonb_build_object('name', '3.5"', 'order', 0, 'priceCents', null, 'imageUuid', listing_21_medium_hero_image_uuid),
                        listing_21_height_large_id,  jsonb_build_object('name', '6"',   'order', 1, 'priceCents', null, 'imageUuid', listing_21_large_hero_image_uuid),
                        listing_21_height_xl_id,     jsonb_build_object('name', '9"',   'order', 2, 'priceCents', null, 'imageUuid', listing_21_xl_hero_image_uuid)
                    )
                )
            ),
            jsonb_build_object(
                listing_21_height_variation_id || ':' || listing_21_height_medium_id, jsonb_build_object('priceCents', 2200, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_21_height_variation_id || ':' || listing_21_height_large_id,  jsonb_build_object('priceCents', 3200, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_21_height_variation_id || ':' || listing_21_height_xl_id,     jsonb_build_object('priceCents', 3999, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_22_id, listing_22_short_id, listing_22_shop_id, listing_22_category_id, listing_22_title, listing_22_subtitle, listing_22_full_descr, listing_22_price_cents, NULL, NULL, listing_22_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
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
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    -- Resync sequences for tables seeded with explicit IDs
    PERFORM setval(pg_get_serial_sequence('shop', 'id'), COALESCE((SELECT MAX(id) FROM shop), 1));
    PERFORM setval(pg_get_serial_sequence('listing', 'id'), COALESCE((SELECT MAX(id) FROM listing), 1));

    -- These two tables are owned entirely by this script, so a full
    -- reseed (rather than a targeted delete) keeps the featured order
    -- easy to redefine on every run.
    DELETE FROM featured_shop;
    DELETE FROM featured_listing;

    INSERT INTO featured_shop (shop_id)
    VALUES
        (shop_3_id), -- Santa Barbara Forge
        (shop_4_id), -- Rookwood
        (shop_7_id), -- Big Dipper Wax Works
        (shop_5_id), -- Simon Pearce
        (shop_6_id); -- Farfalli

    INSERT INTO featured_listing (listing_id)
    VALUES
        (listing_2_id),  -- Sonora Small Pan
        (listing_4_id),  -- Sonora Roaster Pan
        (listing_6_id),  -- Boule Vase
        (listing_5_id),  -- Rook Dish
        (listing_12_id), -- Pillar Candle Holder
        (listing_21_id), -- 3" Pillar Candle
        (listing_22_id), -- Tapers
        (listing_16_id), -- Shoreham Whiskey Glasses
        (listing_14_id), -- Vintner Red Wine Glasses
        (listing_15_id), -- Vintner White Wine Glasses
        (listing_13_id), -- Madison Wine Decanter
        (listing_17_id); -- King Corkscrew

COMMIT;

END $$;
