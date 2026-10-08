DO $$

DECLARE
    old_sample_shop_ids CONSTANT INT[] := ARRAY[3, 4, 5, 7];
    retired_shop_ids CONSTANT INT[] := ARRAY[1, 2, 6];
    retired_listing_ids CONSTANT INT[] := ARRAY[2, 3, 13, 23, 24, 27, 28, 30, 33, 39, 40, 41, 43, 44, 45, 46, 47, 48, 52];
    catalog_legacy_default_inventory CONSTANT INT := 10;
    catalog_default_inventory CONSTANT INT := 5;
    catalog_default_track_inventory CONSTANT BOOLEAN := true;

    shop_3_id INT := 3;
    shop_3_short_id VARCHAR := 'sM3k';
    shop_3_title VARCHAR := 'Smithey Ironware Co.';
    shop_3_profile_image_uuid VARCHAR := '2226a727-50ca-47bc-8c1b-e565ef53304d';
    shop_3_location VARCHAR := 'Charleston, SC';
    shop_3_classification VARCHAR := 'Cast Iron Cookware';
    shop_3_profile_rich_text TEXT := '<h1>Our Story</h1><p>Smithey Ironware started as a backyard project. Our founder, Isaac Morton, first taught himself to restore old, forgotten cast iron in his woodshed, drawn to the smooth surfaces and timeless logos of vintage American ironware.</p><h1>From Restoration to Reinvention</h1><p>After years of studying collector''s books and bringing rusty skillets back to their 19th-century glory, Isaac set out to build something new: a cast iron line that honored the classic style of those vintage pieces while using modern manufacturing to get there.</p><h1>Forging Ahead</h1><p>In 2018, we partnered with renowned blacksmith (and workshop neighbor) Robert Thomas to expand into hand-forged carbon steel with our Farmhouse collection. Every piece in that line is individually forged by hand, so no two are exactly alike.</p><h1>Made in Charleston</h1><p>Every Smithey is still designed and crafted in Charleston, South Carolina, where our team inspects each piece multiple times throughout manufacturing. We guarantee the quality of every piece for life.</p><h1>Use It Well</h1><p>From the kitchen to the campfire, a Smithey is built to be a cherished, working possession, not a display piece &mdash; a modern heirloom meant to be handed down.</p>';
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

    shop_7_id INT := 7;
    shop_7_short_id VARCHAR := 'wD5n';
    shop_7_title VARCHAR := 'Big Dipper Wax Works';
    shop_7_profile_image_uuid VARCHAR := '302c73b3-68f1-4223-af98-cea4790fd6ba';
    shop_7_location VARCHAR := 'Seattle, WA';
    shop_7_classification VARCHAR := 'Pure Beeswax Candles';
    shop_7_country_code CHAR(2) := 'US';
    shop_7_profile_rich_text TEXT := '<h1>Our Story</h1><p>Big Dipper Wax Works began in the summer of 1993, when our founder, Brent Roose, was hiking Washington''s Olympic Peninsula and got the idea for a beeswax candle company while stargazing at the Big Dipper.</p><h1>Beeswax, Filtered Naturally</h1><p>We source raw beeswax primarily from beekeepers across the Pacific Northwest and British Columbia, then filter it through natural clay rather than chemicals, a process that removes impurities while keeping the wax''s natural color and faint honey scent intact.</p><h1>Hand-Poured, Hand-Dipped</h1><p>Every pillar is hand-poured and every taper is hand-dipped, some as many as twenty times, by small teams of artisans working out of our design studio in Atlanta, Georgia. Our wicks are 100% cotton, free of lead and metal, so they burn clean.</p><h1>Giving Back</h1><p>We donate 5% of our net profits to organizations working on bee sustainability, education, and outreach &mdash; work that only makes sense for a company built on what bees make.</p>';

    listing_4_id INT := 4;
    listing_4_short_id VARCHAR := 'S10Nk';
    listing_4_shop_id INT := shop_3_id;
    listing_4_category_id VARCHAR := 'HOUSEWARES';
    listing_4_title VARCHAR := 'Cast Iron Skillet';
    listing_4_subtitle VARCHAR := 'A traditional cast iron skillet with a polished cooking surface, in sizes from a 6-inch single-serve pan to a 14-inch centerpiece built for feeding a crowd.';
    listing_4_price_cents INT := 18000;
    listing_4_image_uuids text[] := '{}';
    listing_4_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Smithey''s traditional skillet, available from a 6-inch pan sized for single servings and sides to a 14-inch skillet with enough surface area to feed a crowd. The polished interior surface is naturally non-stick, heats evenly, and only improves with use.</p><p>Cast and finished in Charleston, South Carolina, and guaranteed for life.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<p><strong>No. 6</strong></p><ul><li>Diameter: 6\" (top), 11.3\" (handle to handle)</li><li>Depth: 1.3\"</li><li>Cook surface: 4.8\"</li><li>Weight: 2.7 lbs</li></ul><p><strong>No. 10</strong></p><ul><li>Diameter: 10\" (top), 16.5\" (handle to handle)</li><li>Depth: 2.0\"</li><li>Cook surface: 9\"</li><li>Weight: 6.7 lbs</li></ul><p><strong>No. 12</strong></p><ul><li>Diameter: 12\" (top), 18.2\" (handle to handle)</li><li>Depth: 2.2\"</li><li>Cook surface: 10.5\"</li><li>Weight: 8.7 lbs</li></ul><p><strong>No. 14</strong></p><ul><li>Diameter: 14\" (top), 20.3\" (handle to handle)</li><li>Depth: 2.2\"</li><li>Cook surface: 11.5\"</li><li>Weight: 12 lbs</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Hand wash and dry thoroughly, then season with a light layer of oil as needed. Safe for all cooktops, ovens, grills, and open flame.</p>"
        }
    ]';

    listing_4_size_variation_id CONSTANT VARCHAR := 'c9d0e1f2-1111-4ab1-8c5d-e8f9a0b1c2d3';
    listing_4_size_no6_id       CONSTANT VARCHAR := 'c9d0e1f2-2222-4ab1-8c5d-e8f9a0b1c2d3';
    listing_4_size_no10_id      CONSTANT VARCHAR := 'c9d0e1f2-3333-4ab1-8c5d-e8f9a0b1c2d3';
    listing_4_size_no12_id      CONSTANT VARCHAR := 'c9d0e1f2-4444-4ab1-8c5d-e8f9a0b1c2d3';
    listing_4_size_no14_id      CONSTANT VARCHAR := 'c9d0e1f2-5555-4ab1-8c5d-e8f9a0b1c2d3';
    listing_4_no6_image_uuids  CONSTANT text[] := '{"b2d4877f-1faf-4160-b0eb-ed7dbf3239d9", "b4b968ab-e2ed-468b-9f7b-fe48e256bbb6", "a8f939a2-e8de-47e9-96a4-6bf7f20ef42e", "0a9bed81-0d7c-44cc-9532-21500d18e340", "b9c37da1-4f67-493d-a4c2-4c685e7de648"}';
    listing_4_no10_image_uuids CONSTANT text[] := '{"621edbfa-13f2-4e35-bfa6-12b2f7f155df", "56940747-68ca-4bfa-b482-704c12cceb54", "6f4f1b57-af79-46ae-9d8e-74ccf331bf5e", "a6ba1ada-0975-40fd-a246-4f1cac13989f", "7f560aef-ac80-4a04-a2a9-5dd604f564e8", "e37604a6-e527-42d8-a7dd-9cb7c1a77bcc", "cc59d72a-89ea-4882-8b2f-a54c99050813"}';
    listing_4_no12_image_uuids CONSTANT text[] := '{"b46bc5b1-256f-4a54-a8c9-b7e25b3e07e7", "cc15c622-65be-45c4-8f71-089d418c938e", "f2822221-d49d-4903-aeca-6e8c8f4af368", "21520ca4-5fa9-4424-b560-457ebcf584ca", "ff968181-133d-496a-bf15-a6f3ace1a5ab", "1eacb947-8464-4590-bba4-f473cedb3e01", "c08d7c76-9d0a-44b7-86ec-68091705d4a3"}';
    listing_4_no14_image_uuids CONSTANT text[] := '{"bdcfeb33-ce6c-403e-a597-1b1e3a558c5c", "a546fe8e-39fb-4263-9975-33539575018a", "0b13ce42-752a-4ac8-9d65-5f422560723b", "4016ec42-02f4-4c74-997e-9447f2862f90", "581ebc52-38f5-4a0f-b6ba-ba67492f093b", "d19de428-d373-4a50-9456-cf0d71024e16", "c7c4c3c2-5fa3-4271-8c75-90407f64dfd2"}';

    listing_25_id INT := 25;
    listing_25_short_id VARCHAR := 'S1CNk';
    listing_25_shop_id INT := shop_3_id;
    listing_25_category_id VARCHAR := 'HOUSEWARES';
    listing_25_title VARCHAR := 'Cast Iron Chef Skillet';
    listing_25_subtitle VARCHAR := 'Made for movement, the curved interior walls of this skillet are great for sautéing, stir-frying, egg flipping, and more.';
    listing_25_price_cents INT := 12000;
    listing_25_image_uuids text[] := '{}';
    listing_25_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Made for movement: the Chef Skillet''s shallow, curved interior walls and extended handle make sautéing, stir-frying, and flipping eggs effortless, and let food slide out cleanly. The satin-smooth, polished interior is naturally non-stick and only improves with use.</p><p>Cast and finished in Charleston, South Carolina, and guaranteed for life.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<p><strong>No. 8</strong></p><ul><li>Diameter: 8\" (top), 15.2\" (handle to handle)</li><li>Depth: 1.6\"</li><li>Cook surface: 4.2\"</li><li>Weight: 3.5 lbs</li></ul><p><strong>No. 10</strong></p><ul><li>Diameter: 10\" (top), 17.3\" (handle to handle)</li><li>Depth: 1.6\"</li><li>Cook surface: 6\"</li><li>Weight: 5.0 lbs</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Hand wash and dry thoroughly, then season with a light layer of oil as needed. Safe for all cooktops, ovens, grills, and open flame.</p>"
        }
    ]';

    listing_25_size_variation_id CONSTANT VARCHAR := 'b8c9d0e1-1111-4fa0-9b4c-d7e8f9a0b1c2';
    listing_25_size_no8_id       CONSTANT VARCHAR := 'b8c9d0e1-2222-4fa0-9b4c-d7e8f9a0b1c2';
    listing_25_size_no10_id      CONSTANT VARCHAR := 'b8c9d0e1-3333-4fa0-9b4c-d7e8f9a0b1c2';
    listing_25_no8_image_uuids  CONSTANT text[] := '{"60ba0bf4-e368-4773-b1aa-68f1117f2ed5", "dee2e6fe-15a8-45c3-82c7-2d624dda26e9", "20b8a1c9-3153-43b2-b1a3-3b135a2739ce", "09b291f4-f4a7-49e1-9041-ea4f3a11481e"}';
    listing_25_no10_image_uuids CONSTANT text[] := '{"eefb0fed-9b2d-445f-977a-e5f46bfb341e", "4a4853ba-0394-4968-9d67-017f308a17e3", "87775b1f-6e2e-43ba-8a8c-e49d70867836", "5cb3df92-e07d-4567-a6d8-36c75023d34b", "ae18d0df-f561-4323-939e-30f269774e23", "f3c58ded-964e-4885-8c2f-3da50b933114", "7dd8db2e-80d6-4465-a61e-4f0a721431aa"}';

    listing_26_id INT := 26;
    listing_26_short_id VARCHAR := 'D35Nk';
    listing_26_shop_id INT := shop_3_id;
    listing_26_category_id VARCHAR := 'HOUSEWARES';
    listing_26_title VARCHAR := 'Cast Iron Dutch Oven';
    listing_26_subtitle VARCHAR := 'Slow-cooking, baking and frying in a naturally non-stick cast iron Dutch oven, in three sizes.';
    listing_26_price_cents INT := 22500;
    listing_26_image_uuids text[] := '{}';
    listing_26_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Smithey''s Dutch ovens are made for slow cooking, braising, baking, and frying, from sourdough to family-style stews and big-batch chili. The completely polished interior is naturally non-stick, and the domed lid features channels that recirculate moisture for better braises and bakes.</p><p>Cast and finished in Charleston, South Carolina, and guaranteed for life.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<p><strong>3.5 Qt</strong></p><ul><li>Depth: 4\"</li><li>Handle to handle: 12.2\"</li><li>Height: 7\"</li><li>Weight: 12.1 lbs (with lid), 8.1 lbs (pot only)</li></ul><p><strong>5.5 Qt</strong></p><ul><li>Depth: 4.6\"</li><li>Handle to handle: 13.3\"</li><li>Height: 8.2\"</li><li>Weight: 14.5 lbs (with lid), 9.2 lbs (pot only)</li></ul><p><strong>7.25 Qt</strong></p><ul><li>Depth: 4.7\"</li><li>Handle to handle: 14.9\"</li><li>Height: 8.2\"</li><li>Weight: 17.3 lbs (with lid), 11.5 lbs (pot only)</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Hand wash and dry thoroughly, then season with a light layer of oil as needed. Safe for all cooktops, ovens, grills, and open flame.</p>"
        }
    ]';

    listing_26_size_variation_id CONSTANT VARCHAR := 'a7b8c9d0-1111-4e9f-8a3b-c6d7e8f9a0b1';
    listing_26_size_small_id     CONSTANT VARCHAR := 'a7b8c9d0-2222-4e9f-8a3b-c6d7e8f9a0b1';
    listing_26_size_medium_id    CONSTANT VARCHAR := 'a7b8c9d0-3333-4e9f-8a3b-c6d7e8f9a0b1';
    listing_26_size_large_id     CONSTANT VARCHAR := 'a7b8c9d0-4444-4e9f-8a3b-c6d7e8f9a0b1';
    listing_26_small_image_uuids  CONSTANT text[] := '{"a5ebec41-8ef0-4941-9cea-f6346e3570f2", "4e3348ad-d3ee-4072-8c7e-32ee9411f55a", "401a48d7-0e29-4b29-9699-b0f296a98b30", "8c2ef4c6-e577-44ad-9320-a544e665fe5e", "38608fb2-dcde-4d9d-a7c8-09899eef2ea2", "852f8b45-de9b-4355-aa36-04e9e26faf02", "d69f947f-89a8-416c-805e-1d412a92feca"}';
    listing_26_medium_image_uuids CONSTANT text[] := '{"e8eb0db5-da4b-46ce-8b73-3d7b830521f3", "e94aa370-c161-4906-8799-43f1ce224ea5", "bcf87210-192d-4990-b989-0b1cab365c19", "74f000f5-7e63-4674-b65d-c0c199a03512", "c6ba3a5f-961a-4a42-90b4-a4b56dbe6d86", "d320ff84-5511-4e8b-b2fd-7a8547a5fbfd", "25386fef-6726-4653-9855-a0d094d1271d"}';
    listing_26_large_image_uuids  CONSTANT text[] := '{"d96e9702-5a4b-4f52-9fe4-a01e4192547b", "273cdd9b-2fde-4fcf-9c93-7f8f39d43139", "0090b7fd-e06d-4e68-9193-a7871ab457cb", "72447b8b-5387-4646-81bd-4642d60605d3", "e9311c51-9657-4ff0-afa5-17affbf6c1f0", "6fdd0b79-ee43-44ae-8c1b-be1fb9076317", "6ecc2fbb-b10e-4346-8aaa-b107ad509a71"}';

    listing_29_id INT := 29;
    listing_29_short_id VARCHAR := 'G10Nk';
    listing_29_shop_id INT := shop_3_id;
    listing_29_category_id VARCHAR := 'HOUSEWARES';
    listing_29_title VARCHAR := 'Cast Iron Flat Top Griddle';
    listing_29_subtitle VARCHAR := 'A stand-alone griddle for everything from pancakes and pizzas to grilled cheeses and fajitas, and a custom-fit lid for your Skillet of the same size.';
    listing_29_price_cents INT := 12500;
    listing_29_image_uuids text[] := '{"6e27f127-66d1-4e80-bcf3-e8f599a56ada", "c31f5213-ef84-4de3-b77c-89964fa1d899", "97f63d44-fb2b-4914-8c96-f0f925651c08"}';
    listing_29_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>A stand-alone griddle for pancakes, pizzas, grilled cheeses, fajitas, and more, the Flat Top also works as a custom-fit lid for your Skillet of the same size. Its satin-smooth, polished finish is naturally non-stick and only improves with use.</p><p>Cast and finished in Charleston, South Carolina, and guaranteed for life.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<p><strong>No. 10</strong></p><ul><li>Diameter: 10\" (top), 16.5\" (handle to handle)</li><li>Depth: .3\"</li><li>Cook surface: 9.3\"</li><li>Weight: 5.5 lbs</li></ul><p><strong>No. 12</strong></p><ul><li>Diameter: 12\" (top), 18.2\" (handle to handle)</li><li>Depth: .3\"</li><li>Cook surface: 10.5\"</li><li>Weight: 7 lbs</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Hand wash and dry thoroughly, then season with a light layer of oil as needed. Safe for all cooktops, ovens, grills, and open flame.</p>"
        }
    ]';

    listing_29_size_variation_id CONSTANT VARCHAR := 'd0e1f2a3-1111-4bc2-9d6e-f9a0b1c2d3e4';
    listing_29_size_no10_id      CONSTANT VARCHAR := 'd0e1f2a3-2222-4bc2-9d6e-f9a0b1c2d3e4';
    listing_29_size_no12_id      CONSTANT VARCHAR := 'd0e1f2a3-3333-4bc2-9d6e-f9a0b1c2d3e4';
    listing_29_no10_image_uuids  CONSTANT text[] := '{"34b54d45-4a2d-4150-a4b2-50771193bae9", "7498c359-d296-46c4-bed5-02c007268b39", "d54dc965-0f48-4bbe-932f-40d4e4bea41d", "9eb54d52-7d1d-45bf-841d-61587c10e3c4"}';
    listing_29_no12_image_uuids  CONSTANT text[] := '{"590e6880-fe56-41fe-9222-81a2dbd8661b", "22c86c8a-fd2a-4817-89cc-8ef2ad839d0c", "a14507dd-db41-4438-8b66-b830874888e6", "87ff3340-1c53-4c97-b28a-2db2aaad38f9"}';

    listing_31_id INT := 31;
    listing_31_short_id VARCHAR := 'P12Nk';
    listing_31_shop_id INT := shop_3_id;
    listing_31_category_id VARCHAR := 'HOUSEWARES';
    listing_31_title VARCHAR := 'No. 12 Grill Pan';
    listing_31_subtitle VARCHAR := 'The Smithey Grill Pan is our go-to for year-round grilling indoors or out.';
    listing_31_price_cents INT := 22000;
    listing_31_image_uuids text[] := '{"d8c4b76f-e4e6-4cb0-83ad-e9cd1abacae5", "c3c45b3d-29d9-4871-88a8-1088c00ad2f0", "9afaed51-2943-49aa-ad90-2a5636e1389e", "0289afb9-3960-4cfe-9e40-793dfab88398", "1d484325-ccf5-4bfd-ac25-5081f799737f"}';
    listing_31_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>The Smithey Grill Pan is our go-to for year-round grilling, indoors or out. Polished grilling lines and dual ergonomic handles make it easy to sear steaks, vegetables, and more with genuine grill marks.</p><p>Cast and finished in Charleston, South Carolina, and guaranteed for life.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Width (top): 12\"</li><li>Depth: 2\"</li><li>Cook surface: 9.4\" x 9.4\"</li><li>Handle to handle: 15\"</li><li>Weight: approximately 11.3 lbs</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Hand wash and dry thoroughly, then season with a light layer of oil as needed. Safe for all cooktops, ovens, grills, and open flame.</p>"
        }
    ]';

    listing_32_id INT := 32;
    listing_32_short_id VARCHAR := 'H12Nk';
    listing_32_shop_id INT := shop_3_id;
    listing_32_category_id VARCHAR := 'HOUSEWARES';
    listing_32_title VARCHAR := 'Cast Iron Dual Handle Skillet';
    listing_32_subtitle VARCHAR := 'A skillet with two handles that make it easier to move from range or oven to table, and an ideal serving piece, in our best-selling No. 12 or a No. 14 sized for your Big Green Egg.';
    listing_32_price_cents INT := 22000;
    listing_32_image_uuids text[] := '{}';
    listing_32_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>A dual handle design that makes it easier to move from range or oven to table, and an ideal serving piece straight from the fire. The No. 12 is our best-selling size, and the No. 14 is perfectly fit for your Big Green Egg. The satin-smooth, polished interior is naturally non-stick and only improves with use.</p><p>Cast and finished in Charleston, South Carolina, and guaranteed for life.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<p><strong>No. 12</strong></p><ul><li>Diameter: 12\" (top), 15\" (handle to handle)</li><li>Depth: 2.0\"</li><li>Cook surface: 10.0\"</li><li>Weight: 8 lbs</li></ul><p><strong>No. 14</strong></p><ul><li>Diameter: 14\" (top), 17\" (handle to handle)</li><li>Depth: 2.4\"</li><li>Cook surface: 11\"</li><li>Weight: 10.5 lbs</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Hand wash and dry thoroughly, then season with a light layer of oil as needed. Safe for all cooktops, ovens, grills, and open flame.</p>"
        }
    ]';

    listing_32_size_variation_id CONSTANT VARCHAR := 'e1f2a3b4-1111-4cd3-8e7f-a0b1c2d3e4f5';
    listing_32_size_no12_id      CONSTANT VARCHAR := 'e1f2a3b4-2222-4cd3-8e7f-a0b1c2d3e4f5';
    listing_32_size_no14_id      CONSTANT VARCHAR := 'e1f2a3b4-3333-4cd3-8e7f-a0b1c2d3e4f5';
    listing_32_no12_image_uuids  CONSTANT text[] := '{"291e684a-5940-4f3f-8d0a-85212724142a", "7590e86c-f4de-4905-a99a-5219870e95ee", "1c407e7d-df86-4eab-b66e-78c8a6d296f7", "c8248d8b-b529-46e1-aa11-07cbaa0e74c8", "bd7df71f-ed18-469c-a506-b8f5965f9ec2", "909acd80-654e-4108-8d0e-88298c3d1a7b", "7908cb4a-41f9-400f-86f1-959bd527976d"}';
    listing_32_no14_image_uuids  CONSTANT text[] := '{"211d5705-40e2-4e7e-ac29-44aa66aa1f4d", "b9cfefe0-0ac1-4e09-b9d2-33cbe6c05daf", "8c215c4d-7ea1-4a67-add4-01066b59d6f7", "c6f9b8ea-9f88-476c-bca1-8790c838a77b", "b57bf597-80d6-4a0b-b016-b687f25c6b2f", "8be4b2d5-0ac3-4b66-a6f0-d43756887784", "6f738693-5947-462f-8b3b-9fa487e91036"}';

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
    listing_6_image_uuids text[] := '{"72162203-35a1-4031-b129-9b7ffe3bb1dd"}';
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
    listing_6_raffia_image_uuids CONSTANT text[] := '{"2d2d82a4-f973-47fa-bf3b-d7da38045648", "3990790f-4cd8-4cba-a63e-c2f4ef793f37", "dc74a0d4-f0b2-49b8-8f21-98dbeb5c318f", "61c1a2a1-67bd-4000-bf80-e6434d80d3e7", "4634067c-fe8c-460b-8893-d81ebe215aa0"}';
    listing_6_patina_image_uuids CONSTANT text[] := '{"e0b69ba8-dbc4-4dd5-bd7a-c0daf657f054", "4a7a09c0-5be7-4c84-bead-89cd07714e65", "e540902f-cabc-4c5b-9337-19ddb0522acd", "b9d4783b-fe29-4566-807e-25c8b27a23ce", "4d207eb2-061f-43eb-abd8-c3eb536a67f4"}';

    listing_10_id INT := 10;
    listing_10_short_id VARCHAR := 'Cn6Vz';
    listing_10_shop_id INT := shop_4_id;
    listing_10_category_id VARCHAR := 'HOUSEWARES';
    listing_10_title VARCHAR := 'Cornet Vase';
    listing_10_subtitle VARCHAR := 'A vase that holds its own—designed for sweeping stems and bold florals, offering height, balance, and unmistakable character.';
    listing_10_price_cents INT := 12800;
    listing_10_image_uuids text[] := '{"fdaf290c-c774-4e7a-9361-ebac5b1f0da6"}';
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
    listing_10_raffia_image_uuids CONSTANT text[] := '{"5950b9f5-25e0-45e7-ba15-3e3d72a61d44", "97acb04f-56a6-4a78-8ddc-f6753f4072d5", "e8ccabe8-9b2f-40db-a6de-185381ca42a6", "bff4491b-41e3-478f-ae66-dd11c6031b6f"}';
    listing_10_patina_image_uuids CONSTANT text[] := '{"2a6bedc5-2397-43b4-80ef-c1ca3de733f0", "7f72607f-2ef2-420e-a88d-bb8031366eb6", "0d0b90b0-5400-455d-af36-2cb77e2d6b8e", "289bd6b9-b501-463b-ba33-443b7f665109"}';

    listing_12_id INT := 12;
    listing_12_short_id VARCHAR := 'Fx8Wq';
    listing_12_shop_id INT := shop_4_id;
    listing_12_category_id VARCHAR := 'HOUSEWARES';
    listing_12_title VARCHAR := 'Pillar Candle Holder';
    listing_12_subtitle VARCHAR := 'Ceramic pillar candle holder that fits candles up to 3 inches in diameter, in your choice of glaze.';
    listing_12_price_cents INT := 3200;
    listing_12_image_uuids text[] := '{"86e03348-2ead-426d-9333-b650491ccd9f"}';
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
    listing_12_raffia_image_uuids CONSTANT text[] := '{"b4160501-969f-4a2f-8798-a5f8c02562c4", "200c92e3-60b3-4c0c-8b27-b5ff4d1a8c2f", "7dcea27e-d4c0-40f8-afda-15b99d3e6af7"}';
    listing_12_patina_image_uuids CONSTANT text[] := '{"1d56dad8-75a6-468c-9f2a-f8ff364ffde5", "b1d9ac10-2a5a-4bf8-82c6-defea6629ee6", "3333fb95-e853-4bb2-b537-ea8af9f7bfa6", "f2d5f95d-e850-483c-8898-b58e896048a2"}';

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

    listing_34_id INT := 34;
    listing_34_short_id VARCHAR := 'Nt7Hc';
    listing_34_shop_id INT := shop_5_id;
    listing_34_category_id VARCHAR := 'HOUSEWARES';
    listing_34_title VARCHAR := 'Nantucket Hurricane';
    listing_34_subtitle VARCHAR := 'Straight sides and a modern foot, in four sizes to scale.';
    listing_34_price_cents INT := 17000;
    listing_34_image_uuids text[] := '{"867fae0f-7f75-4e0a-9008-95aac1918e2c", "dedb7c8d-97e8-4652-a2ef-67e9ba5cfb6b", "bcfad4d4-0ab8-4d67-b23b-3d7ff32a2b3e"}';
    listing_34_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Blown by hand in a single straight-sided cylinder, the Nantucket Hurricane is one of Simon Pearce''s most versatile shapes, equally at home holding a candle, anchoring a centerpiece, or sitting on an outdoor table. A compact turned foot lifts the glass off the surface without interrupting its clean line.</p><p>As with all of our glass, each piece keeps its pontil mark, the small mark left by the glassblower''s punty rod, a signature of the hands that made it.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>Small (4.25\"W x 4.25\"D x 6\"H): 22 oz</li><li>Medium (5.625\"W x 5.625\"D x 6.75\"H): 54 oz</li><li>Large (6.25\"W x 6.25\"D x 9\"H): 92 oz</li><li>Extra Large (7.75\"W x 7.75\"D x 13.5\"H): 148 oz</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Clean with a glass cleaner and a soft cloth; remove wax residue carefully before cleaning. Avoid sudden temperature changes, which can cause fractures.</p>"
        }
    ]';

    listing_34_size_variation_id CONSTANT VARCHAR := 'd4e5f6a7-1111-4b6c-9d0e-f3a4b5c6d7e8';
    listing_34_size_small_id     CONSTANT VARCHAR := 'd4e5f6a7-2222-4b6c-9d0e-f3a4b5c6d7e8';
    listing_34_size_medium_id    CONSTANT VARCHAR := 'd4e5f6a7-3333-4b6c-9d0e-f3a4b5c6d7e8';
    listing_34_size_large_id     CONSTANT VARCHAR := 'd4e5f6a7-4444-4b6c-9d0e-f3a4b5c6d7e8';
    listing_34_size_xl_id        CONSTANT VARCHAR := 'd4e5f6a7-5555-4b6c-9d0e-f3a4b5c6d7e8';
    listing_34_small_image_uuids CONSTANT text[] := '{"d6d40d5c-463c-4ca6-bbe6-e3c8be7107c7"}';
    listing_34_medium_image_uuids CONSTANT text[] := '{"4eeae928-da11-4475-8fba-504a75540731"}';
    listing_34_large_image_uuids CONSTANT text[] := '{"f49b02a6-dfb1-427d-9ea6-b665322aa44b", "60fe9d88-4109-460a-8d4b-7f081f25544f", "c445827a-7dcf-44c3-8c8a-76151362dbc0"}';
    listing_34_xl_image_uuids CONSTANT text[] := '{"bf02f4d0-9ad6-463b-b912-279c67e473fd"}';

    listing_20_id INT := 20;
    listing_20_short_id VARCHAR := 'Pw8Zd';
    listing_20_shop_id INT := shop_7_id;
    listing_20_category_id VARCHAR := 'HOUSEWARES';
    listing_20_title VARCHAR := 'Beeswax 2" Pillar Candle';
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
    listing_21_title VARCHAR := 'Beeswax 3" Pillar Candle';
    listing_21_subtitle VARCHAR := 'Hand-poured pillar candle in 100% pure, natural beeswax, available in three heights.';
    listing_21_price_cents INT := 2200;
    listing_21_image_uuids text[] := '{"f8075b34-cd2b-4818-a494-85afd406cadd", "b83ce102-5c5c-45a3-b5e0-1db6b3f101db", "0a611296-6b3c-4554-b4f7-8afff05d06d0", "04435024-8e95-46ff-87c6-a20918dff8e0"}';
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
    listing_21_medium_image_uuids CONSTANT text[] := '{"7ed3f224-b00a-401c-8dbb-ebb7f95c1bd1", "bb06034c-dfff-42ee-a86a-0c7c430de684"}';
    listing_21_large_image_uuids CONSTANT text[] := '{"e41525fd-3e18-4900-b270-2feca36ad544", "751e0ce1-734b-486d-8e3f-ad19cd642428"}';
    listing_21_xl_image_uuids CONSTANT text[] := '{"3a8a6543-953e-44ca-b70e-6e16163fdc7c"}';

    listing_22_id INT := 22;
    listing_22_short_id VARCHAR := 'Rz2Ck';
    listing_22_shop_id INT := shop_7_id;
    listing_22_category_id VARCHAR := 'HOUSEWARES';
    listing_22_title VARCHAR := 'Beeswax Tapers';
    listing_22_subtitle VARCHAR := 'Hand-dipped taper candles in 100% pure, natural beeswax, sold as a set of 2 in standard and grand sizes.';
    listing_22_price_cents INT := 1225;
    listing_22_image_uuids text[] := '{"f397af4d-d585-472f-8745-ce46d3c4dee0", "18949cb1-4eb2-4945-b6cf-3dc56f1b13c5", "13e63645-5dee-41e7-bd9a-0e73ea9584c0", "773af45f-2735-47ec-8fdd-897e0c4f3cb0", "e2c051b9-b17d-4bd4-992b-4c8e06bfc0e4", "d77c63c1-9eb8-4541-af16-aa7416c97a8f", "e1242691-abf8-4ea2-8b7b-3b4b188ae906", "5f1e4f7e-243a-44a1-a86c-296d3451f6aa", "e2dc5ac7-8d43-4c7c-896c-6f4be9be9f36"}';
    listing_22_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Each taper is hand-dipped up to 20 times in 100% pure beeswax with a 100% cotton wick, with no synthetic additives. Naturally unscented, with the faint honey aroma that comes from the beeswax itself. Sold as a set of 2.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<p><strong>Standard</strong></p><ul><li>12\" tall, 7/8\" diameter</li><li>Burns up to 12 hours</li></ul><p><strong>Grand</strong></p><ul><li>15\" tall, 1\" diameter</li><li>Burns up to 24 hours</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Trim the wick to 1/4\" before each lighting.</p>"
        }
    ]';

    listing_22_size_variation_id CONSTANT VARCHAR := 'f2a3b4c5-1111-4de4-9f80-b1c2d3e4f5a6';
    listing_22_size_standard_id  CONSTANT VARCHAR := 'f2a3b4c5-2222-4de4-9f80-b1c2d3e4f5a6';
    listing_22_size_grand_id     CONSTANT VARCHAR := 'f2a3b4c5-3333-4de4-9f80-b1c2d3e4f5a6';
    listing_22_standard_image_uuids CONSTANT text[] := '{"4d15d900-3d53-446f-8657-f59dd9bab94e"}';
    listing_22_grand_image_uuids    CONSTANT text[] := '{"a3b7cc73-82ca-4b4b-940c-3acd9a16d588"}';

    listing_35_id INT := 35;
    listing_35_short_id VARCHAR := 'Vt5Pk';
    listing_35_shop_id INT := shop_7_id;
    listing_35_category_id VARCHAR := 'HOUSEWARES';
    listing_35_title VARCHAR := 'Beeswax Votive Candles';
    listing_35_subtitle VARCHAR := 'Hand-poured votive candles in 100% pure, natural beeswax, available singly, in a 6 pack, or by the case of 18.';
    listing_35_price_cents INT := 425;
    listing_35_image_uuids text[] := '{"fb9d2e96-c3b2-42a2-80f8-a569b56c502c"}';
    listing_35_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Hand-poured in small batches from 100% pure beeswax with a 100% cotton wick, with no synthetic additives, for a clean, soot-free burn. Naturally unscented, with the faint honey aroma that comes from the beeswax itself.</p><p>The color of each candle reflects the flowers the bees pollinate, from golden amber to soft honey hues, so natural variation is part of their beauty.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>1.5\" x 2\" each</li><li>Burns up to 15 hours</li><li>Materials: 100% pure beeswax, 100% cotton wick</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>For the best results, place the votive in a snug-fitting holder to maximize burn time and prevent wax spillage.</p>"
        }
    ]';

    listing_35_quantity_variation_id CONSTANT VARCHAR := 'a4b5c6d7-1111-4fa6-9b02-d3e4f5a6b7c8';
    listing_35_quantity_single_id    CONSTANT VARCHAR := 'a4b5c6d7-2222-4fa6-9b02-d3e4f5a6b7c8';
    listing_35_quantity_six_id       CONSTANT VARCHAR := 'a4b5c6d7-3333-4fa6-9b02-d3e4f5a6b7c8';
    listing_35_quantity_case_id      CONSTANT VARCHAR := 'a4b5c6d7-4444-4fa6-9b02-d3e4f5a6b7c8';
    listing_35_single_image_uuids CONSTANT text[] := '{"92d5b85d-85c9-440b-af5f-404fc947b479"}';
    listing_35_six_image_uuids    CONSTANT text[] := '{"7b25ba48-1093-4a45-86ab-cb4472d75e89"}';
    listing_35_case_image_uuids   CONSTANT text[] := '{"397c23e9-7c6c-4945-ab04-71831a534160"}';

    listing_36_id INT := 36;
    listing_36_short_id VARCHAR := 'Rb7Qm';
    listing_36_shop_id INT := shop_7_id;
    listing_36_category_id VARCHAR := 'HOUSEWARES';
    listing_36_title VARCHAR := 'Beeswax Rose Blossom Pillar Candle';
    listing_36_subtitle VARCHAR := 'A hand-sculpted pillar candle in 100% pure beeswax, carved with a detailed rose blossom design.';
    listing_36_price_cents INT := 2150;
    listing_36_image_uuids text[] := '{"cdb831b4-c3c6-42c3-b3cb-871a59cf7ea6", "2630c404-3db7-4bb0-8ef2-98fa7fae4a76", "976dc190-9ae3-4987-82be-174b045ea378", "46c98aec-208d-4cb2-8efe-5cd16e204536", "b9b687f1-a8e0-49fa-bfa8-b71b77ac127c", "4ea98d75-e25a-41b0-b196-6dcd5868bb37", "3fd6f9b8-fc0e-46b0-a3bc-9cbb76a4b324", "c5ffa79e-5269-4915-bf4e-e4347fa7ab05"}';
    listing_36_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>A hand-sculpted pillar candle with an intricately carved rose blossom design, inspired by one of the most enduring symbols of love and beauty. Molded by our in-house artisans from 100% pure beeswax with a cotton wick, it is a beautiful accent for romantic dinners, weddings, anniversaries, gifts, and everyday home décor.</p><p>Naturally unscented, with the subtle honey aroma of pure beeswax as it burns. Just as beautiful displayed unlit as it is glowing.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>3\" x 3\"</li><li>Burns up to 45 hours</li><li>Materials: 100% pure beeswax, cotton wick</li></ul>"
        }
    ]';

    listing_37_id INT := 37;
    listing_37_short_id VARCHAR := 'Sp6Dk';
    listing_37_shop_id INT := shop_7_id;
    listing_37_category_id VARCHAR := 'HOUSEWARES';
    listing_37_title VARCHAR := 'Beeswax Sphere Candle';
    listing_37_subtitle VARCHAR := 'A 4-inch sphere candle in 100% pure beeswax with an intricate sculpted design, available in Deco, Flora, and Lotus.';
    listing_37_price_cents INT := 2200;
    listing_37_image_uuids text[] := '{}';
    listing_37_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>A Big Dipper Wax Works original and best-seller, handcrafted by our in-house artisans from 100% pure beeswax with a cotton wick. The intricate sculpted design creates a luminous glow when burned, and makes a stunning centerpiece for any room or table setting. Choose from Deco, Flora, or Lotus.</p><p>Naturally unscented, with the subtle honey aroma of pure beeswax. Hand-made in small batches.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>4\" sphere</li><li>Burns up to 50 hours</li><li>Materials: 100% pure beeswax, cotton wick</li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>To enjoy the glow even longer, place a beeswax votive or tea light inside the sphere shell.</p>"
        }
    ]';

    listing_37_design_variation_id CONSTANT VARCHAR := 'c6d7e8f9-1111-4bc8-9d24-f5a6b7c8d9e0';
    listing_37_design_deco_id      CONSTANT VARCHAR := 'c6d7e8f9-2222-4bc8-9d24-f5a6b7c8d9e0';
    listing_37_design_flora_id     CONSTANT VARCHAR := 'c6d7e8f9-3333-4bc8-9d24-f5a6b7c8d9e0';
    listing_37_design_lotus_id     CONSTANT VARCHAR := 'c6d7e8f9-4444-4bc8-9d24-f5a6b7c8d9e0';
    listing_37_deco_image_uuids  CONSTANT text[] := '{"28b71192-9418-4337-8f95-90059656eec5"}';
    listing_37_flora_image_uuids CONSTANT text[] := '{"6937f3d3-0407-4589-82d2-79ee563a6511"}';
    listing_37_lotus_image_uuids CONSTANT text[] := '{"4ad4ac0a-5a17-4d41-805b-e8364fdd7ece"}';

    listing_38_id INT := 38;
    listing_38_short_id VARCHAR := 'Fp8Ct';
    listing_38_shop_id INT := shop_7_id;
    listing_38_category_id VARCHAR := 'HOUSEWARES';
    listing_38_title VARCHAR := 'Beeswax Faceted Pillar Candle';
    listing_38_subtitle VARCHAR := 'A modern faceted pillar candle, sculpted in 100% pure beeswax and available in three sizes.';
    listing_38_price_cents INT := 1550;
    listing_38_image_uuids text[] := '{"594db497-49ec-45e1-914e-c6b443420df7", "f7cc855c-4793-41b9-a422-de8d8b3cae19", "53f1f7b7-fa39-4ff8-98d6-a67f2e53cafa", "59df44f7-589d-44dc-a491-f07b81360f27"}';
    listing_38_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>A modern pillar candle meticulously sculpted by our in-house artisans, with a unique faceted design that casts a soft, soothing glow. Hand-poured in small batches from 100% pure beeswax with a cotton wick, it burns clean and soot-free, with the subtle honey aroma of the beeswax itself.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<p><strong>Small</strong></p><ul><li>2.5\" x 3.25\"</li><li>Burns up to 40 hours</li></ul><p><strong>Medium</strong></p><ul><li>2.5\" x 5.25\"</li><li>Burns up to 65 hours</li></ul><p><strong>Large</strong></p><ul><li>3\" x 6.25\"</li><li>Burns up to 80 hours</li></ul><p>Materials: 100% pure beeswax, cotton wick</p>"
        },
        {
            "title": "Care",
            "richText": "<p>To burn it even longer, place a beeswax votive or tea light inside the pillar shell.</p>"
        }
    ]';

    listing_38_size_variation_id CONSTANT VARCHAR := 'b5c6d7e8-1111-4ab7-8c13-e4f5a6b7c8d9';
    listing_38_size_small_id     CONSTANT VARCHAR := 'b5c6d7e8-2222-4ab7-8c13-e4f5a6b7c8d9';
    listing_38_size_medium_id    CONSTANT VARCHAR := 'b5c6d7e8-3333-4ab7-8c13-e4f5a6b7c8d9';
    listing_38_size_large_id     CONSTANT VARCHAR := 'b5c6d7e8-4444-4ab7-8c13-e4f5a6b7c8d9';
    listing_38_small_image_uuids  CONSTANT text[] := '{"6218c774-ac5a-4b1e-8b91-5de0b5b0171f", "4a3bbd3f-0e89-45d4-9afa-7af15a75cbe9"}';
    listing_38_medium_image_uuids CONSTANT text[] := '{"2dec715e-d76c-4810-af19-06a5a0f13afe", "e3cb37e6-f21c-42da-8044-1fd6c3c4efd5"}';
    listing_38_large_image_uuids  CONSTANT text[] := '{"08657a17-a302-4fef-915d-9b02b96812ac"}';

    listing_42_id INT := 42;
    listing_42_short_id VARCHAR := 'An5Vs';
    listing_42_shop_id INT := shop_5_id;
    listing_42_category_id VARCHAR := 'HOUSEWARES';
    listing_42_title VARCHAR := 'Anemone Vase';
    listing_42_subtitle VARCHAR := 'A handblown vase whose rim lands differently on every piece, in three sizes.';
    listing_42_price_cents INT := 22500;
    listing_42_image_uuids text[] := '{"d219cbbf-af62-4147-8303-7b1075cbba4b", "9beb308d-0157-4275-b2dd-e67d40ba7313", "9f5e8022-9dc9-434a-8582-130dc4d76a1f", "4f1cf4cf-56d5-431d-b4db-ed2d57942e14", "3fee5bd6-217e-4c14-aeeb-22e0b6fcdcf9"}';
    listing_42_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>Each vase is shaped one at a time, which means the rim lands differently on every piece. Fuller arrangements find room to breathe inside it, and a few stems settle just as naturally. The organic character comes directly from the process: the glass moves, the glassblower follows, and the form is whatever it becomes. No two are exactly alike.</p>"
    },
    {
        "title": "Dimensions",
        "richText": "<p><strong>Small</strong></p><ul><li>Width: 4.75\"</li><li>Depth: 4.75\"</li><li>Height: 6.5\"</li></ul><p><strong>Medium</strong></p><ul><li>Width: 7.5\"</li><li>Depth: 7.5\"</li><li>Height: 9.5\"</li></ul><p><strong>Large</strong></p><ul><li>Width: 9\"</li><li>Depth: 9\"</li><li>Height: 11\"</li></ul>"
    },
    {
        "title": "Care",
        "richText": "<p>Hand wash recommended.</p>"
    }
]';

    listing_42_size_variation_id CONSTANT VARCHAR := '033e691b-2a78-457e-82c9-404df2cba1a4';
    listing_42_size_small_id CONSTANT VARCHAR := 'fb238fdf-c15e-4dd0-87ec-e2bd5379e9d5';
    listing_42_size_medium_id CONSTANT VARCHAR := '0e53863d-6194-44d4-9856-c09f69704a70';
    listing_42_size_large_id CONSTANT VARCHAR := '577dbb41-8ef1-4bd3-8000-d17aa64deb04';
    listing_42_small_image_uuids CONSTANT text[] := '{"48f2946d-52c5-439a-b40d-6fe8285bbc0e", "37e6ee59-12e0-4fd6-a43c-2879e10c556e"}';
    listing_42_medium_image_uuids CONSTANT text[] := '{"eee95481-1621-4fae-b81a-eba41ea4bf0b"}';
    listing_42_large_image_uuids CONSTANT text[] := '{"705fcead-c4f1-4982-a70b-fd3ff99225ad", "2a1694ba-7106-47e6-85b3-80a3801fc7b8"}';

    listing_49_id INT := 49;
    listing_49_short_id VARCHAR := 'Hf6Jn';
    listing_49_shop_id INT := shop_5_id;
    listing_49_category_id VARCHAR := 'HOUSEWARES';
    listing_49_title VARCHAR := 'Hartland Champagne Flutes';
    listing_49_subtitle VARCHAR := 'A tall handblown flute with a hand-formed globe at the stem, sold as a set of 2.';
    listing_49_price_cents INT := 21500;
    listing_49_image_uuids text[] := '{"7d3d2e51-9cc6-495a-8475-4b2177620008", "ffa8920e-66e6-494c-9efd-0dfe8b627464", "aaf7061a-28e1-4b99-a8ac-a009f8e22efe", "e6094e6d-115f-4a09-93ec-fb405b59ade4", "e5f69615-0569-4f6b-ad5b-37e653640b92", "504450c3-75a2-490d-b1b5-30b837840122", "8df8a6b5-eb13-4712-b897-f428aa638d03"}';
    listing_49_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>At 11½\" tall with a 6 oz. capacity, the Hartland Flute draws the Hartland’s globe-and-collar silhouette upward into something genuinely dramatic. The globe at the stem is proof of what a practiced human hand can do, and no machine can replicate. Every flute carries the individual mark of the glassblowers who made it. Consistently one of Simon’s most gifted pieces for weddings and anniversaries. Sold as a set of 2, gift-boxed.</p>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>Width: 3.5\"</li><li>Depth: 3.5\"</li><li>Height: 11.5\"</li></ul>"
    },
    {
        "title": "Care",
        "richText": "<p>Hand wash recommended.</p>"
    }
]';

    listing_50_id INT := 50;
    listing_50_short_id VARCHAR := 'Wm7Qc';
    listing_50_shop_id INT := shop_5_id;
    listing_50_category_id VARCHAR := 'HOUSEWARES';
    listing_50_title VARCHAR := 'Westport Stemless Martini Glasses';
    listing_50_subtitle VARCHAR := 'A wide, stemless martini glass with a gently curved bowl, sold as a set of 2.';
    listing_50_price_cents INT := 18000;
    listing_50_image_uuids text[] := '{"e3fd2b43-f660-40a1-8d28-3b393b9d8aed", "3984427f-2179-4083-95bb-479f835b48ad", "b71ad288-deb3-420b-97be-2e9a198611f1", "450763bd-0f70-4f05-9d12-1c187c39421f", "d5b3de7e-6078-48e4-b65f-e1fa22897280", "b9d1a9c7-dc76-446f-bfde-995a01c03333", "e356bbe4-a334-4681-b302-3bd3c2b4ded9"}';
    listing_50_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>The clean geometry of the Westport collection draws from the coast, and this stemless martini glass carries that energy into cocktail hour. Wide enough to welcome any pour, practical enough to store simply and sit steadily on any surface. The subtle curve of the bowl catches light in a way that elevates even a casual pour. Sold as a set of 2, gift-boxed.</p>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>Width: 5.375\"</li><li>Depth: 5.375\"</li><li>Height: 4.75\"</li></ul>"
    },
    {
        "title": "Care",
        "richText": "<p>Hand wash recommended.</p>"
    }
]';

    listing_51_id INT := 51;
    listing_51_short_id VARCHAR := 'Wg5Zx';
    listing_51_shop_id INT := shop_5_id;
    listing_51_category_id VARCHAR := 'HOUSEWARES';
    listing_51_title VARCHAR := 'Walden Glasses';
    listing_51_subtitle VARCHAR := 'Simple, streamlined handblown glasses in three sizes, sold as a set of 4.';
    listing_51_price_cents INT := 25000;
    listing_51_image_uuids text[] := '{"0287519f-6488-4c6c-861b-52300aa52aa8", "891a87f9-ac98-4bd1-bdba-5489ed4e5161", "0979d6c9-79c8-47c9-bafb-f1282b299c31", "6fc0f16f-9575-4853-a7d7-eb486bd032c8", "81363ca1-9d92-4042-a10c-747dacc1999c", "d3cb2e67-f4b5-45a5-a9a7-1c312fe840f9", "fd166676-7bef-4c6a-93e8-b1ec3f133b57"}';
    listing_51_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>Simple, streamlined, and handmade at a quality level this shape rarely sees. The organic form works for water, wine, juice, or whatever you feel like, and the thin sham base keeps it feeling casual and light in the hand. The everyday glass that surprises in its simplicity. Each size is sold as a set of 4.</p>"
    },
    {
        "title": "Dimensions",
        "richText": "<p><strong>Small</strong></p><ul><li>Width: 3.125\"</li><li>Depth: 3.125\"</li><li>Height: 2.375\"</li></ul><p><strong>Medium</strong></p><ul><li>Width: 3.25\"</li><li>Depth: 3.25\"</li><li>Height: 3.75\"</li></ul><p><strong>Large</strong></p><ul><li>Width: 3.375\"</li><li>Depth: 3.375\"</li><li>Height: 4.875\"</li></ul>"
    },
    {
        "title": "Care",
        "richText": "<p>Hand wash recommended.</p>"
    }
]';

    listing_51_size_variation_id CONSTANT VARCHAR := '1f51f4e3-22b0-4244-b17d-561d3bf3188a';
    listing_51_size_small_id CONSTANT VARCHAR := '3195425b-c051-42f6-a647-49b6d762d9a3';
    listing_51_size_medium_id CONSTANT VARCHAR := '202f2d7c-5691-4ac8-a3ee-12d1665a4c1d';
    listing_51_size_large_id CONSTANT VARCHAR := 'fa81893b-c885-404f-a1e2-a6ebdcb97dc2';
    listing_51_small_image_uuids CONSTANT text[] := '{"459950cb-3d6b-4f21-86dd-46f886a70e64"}';
    listing_51_medium_image_uuids CONSTANT text[] := '{"c86c2d62-0e58-43d3-943c-4cfc4b2bb2e3"}';
    listing_51_large_image_uuids CONSTANT text[] := '{"659d2a23-7d57-43cc-9009-1b02c55e127f", "bc43e408-c814-4d73-b995-b9c5e70d0cd8", "4d1ea0de-1a96-4e34-97ef-7715a5504816"}';

    listing_53_id INT := 53;
    listing_53_short_id VARCHAR := 'Cr5Hk';
    listing_53_shop_id INT := shop_5_id;
    listing_53_category_id VARCHAR := 'HOUSEWARES';
    listing_53_title VARCHAR := 'Champlain Ring Holder';
    listing_53_subtitle VARCHAR := 'A simple handblown glass ring holder for the sink, nightstand or entryway.';
    listing_53_price_cents INT := 14500;
    listing_53_image_uuids text[] := '{"31b1d429-5487-4229-ab41-a22050c191e9", "e06aab08-b045-4694-a354-90d772861826", "08709055-4063-46b6-b2a1-e928100fe0f5", "79afe826-e837-41f0-a158-a795d0d8685f", "3b8dde51-6da0-4461-8595-0f9eeee054b9", "b3cf098e-4aaf-4545-a1cb-678f93cd9c3f"}';
    listing_53_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>The silhouette is simple enough to be part of a daily routine and considered enough to make a meaningful gift. Set it beside the sink, on a nightstand, or at the entryway. Engrave it with a date or initials and it becomes the kind of thing people keep for a long time.</p>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>Width: 5\"</li><li>Depth: 4.25\"</li><li>Height: 2.375\"</li></ul>"
    },
    {
        "title": "Care",
        "richText": "<p>Hand wash recommended.</p>"
    }
]';

    listing_54_id INT := 54;
    listing_54_short_id VARCHAR := 'Hc7Sk';
    listing_54_shop_id INT := shop_5_id;
    listing_54_category_id VARCHAR := 'HOUSEWARES';
    listing_54_title VARCHAR := 'Hartland Candlestick';
    listing_54_subtitle VARCHAR := 'A solid glass candlestick that grows taller by adding another sphere, in three sizes.';
    listing_54_price_cents INT := 19000;
    listing_54_image_uuids text[] := '{"450f45ac-bb45-43fb-942a-caed4fbf86c6", "8b4e2787-ef50-4f9d-bb5f-eea4cec89400", "b427fdff-1465-407b-a036-8240984887ea"}';
    listing_54_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>Each size grows taller by adding another sphere, a design logic that makes the Hartland Candlestick feel inevitable rather than arbitrary. Made from solid glass in our workshops, the weight and clarity of the material gives each piece a quiet authority at the table. Equally at home at an everyday dinner or a celebratory gathering, and a natural set when grouped by size. The kind of piece that earns its place and stays there.</p>"
    },
    {
        "title": "Dimensions",
        "richText": "<p><strong>Small</strong></p><ul><li>Width: 3.125\"</li><li>Depth: 3.125\"</li><li>Height: 5\"</li></ul><p><strong>Medium</strong></p><ul><li>Width: 3.125\"</li><li>Depth: 3.125\"</li><li>Height: 7.25\"</li></ul><p><strong>Large</strong></p><ul><li>Width: 3.125\"</li><li>Depth: 3.125\"</li><li>Height: 9.25\"</li></ul>"
    },
    {
        "title": "Care",
        "richText": "<p>Hand wash recommended.</p>"
    }
]';

    listing_54_size_variation_id CONSTANT VARCHAR := 'da155247-1572-4435-b98d-e22af744bf8d';
    listing_54_size_small_id CONSTANT VARCHAR := 'd206d5e7-d529-443b-bb27-5be93be27484';
    listing_54_size_medium_id CONSTANT VARCHAR := 'f4bf7be8-f42d-4020-aae7-361eccbdab2b';
    listing_54_size_large_id CONSTANT VARCHAR := 'ff19f0bc-8e2f-4743-a5f7-c4dea6d5bc7b';
    listing_54_small_image_uuids CONSTANT text[] := '{"398ceaf7-d9e2-4a65-9681-580413a1d5d0"}';
    listing_54_medium_image_uuids CONSTANT text[] := '{"649e09b5-1c76-4eba-9f4c-feccb7eefb03"}';
    listing_54_large_image_uuids CONSTANT text[] := '{"c1094a8a-7458-442e-a868-ae8d29f8001c", "1272dc54-9723-4dc7-be0f-3be4c6976eab", "3554e4b9-0f4a-4b80-91ef-cadca7e4dbe8"}';

    listing_55_id INT := 55;
    listing_55_short_id VARCHAR := 'Ap6Tn';
    listing_55_shop_id INT := shop_5_id;
    listing_55_category_id VARCHAR := 'HOUSEWARES';
    listing_55_title VARCHAR := 'Ascutney Pilsner Glasses';
    listing_55_subtitle VARCHAR := 'A handblown 16 oz pilsner glass, sold as a set of 2.';
    listing_55_price_cents INT := 18000;
    listing_55_image_uuids text[] := '{"22b058d7-9d30-4af7-b798-fdad90255f3a", "b4b43428-7eb3-4e0d-a98d-725bafcdbca5", "198a296d-10fa-4c61-92c4-45877e6acdc5", "00173d34-c7aa-4e1a-af34-e6c661c8c64e", "c7b3448e-42d4-4ac5-bed1-dd5b3f0e480f", "877e8e0a-4dab-49db-8bb3-17309fc7b6ed", "3562dbd5-5f9f-42ce-ac82-c855758cfc14"}';
    listing_55_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>Most pilsner glasses are purely functional. This one was made by hand, and it shows. The 16-oz. volume is right for a well-poured draft or a carefully opened bottle, and the handblown construction means subtle variations give each glass its own character, visible in the way light moves through it when it’s full. Sold as a set of 2, gift-boxed.</p>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>Width: 3.25\"</li><li>Depth: 3.25\"</li><li>Height: 8\"</li><li>Capacity: 16 oz</li></ul>"
    },
    {
        "title": "Care",
        "richText": "<p>Hand wash recommended.</p>"
    }
]';

BEGIN

    -- H.M. Kala and Klimchi are being retired from the catalog entirely, not
    -- just left out of the upsert below — a plain omission would leave their
    -- stale rows behind forever. This cascades through ON DELETE CASCADE to
    -- their listings, featured_shop/featured_listing entries, and any real
    -- users' favorites of them, which is the intended, explicit outcome here.
    DELETE FROM shop WHERE id = ANY(retired_shop_ids);
    DELETE FROM listing WHERE id = ANY(retired_listing_ids);

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
        (listing_4_id, listing_4_short_id, listing_4_shop_id, listing_4_category_id, listing_4_title, listing_4_subtitle, listing_4_full_descr, listing_4_price_cents, NULL, NULL, listing_4_image_uuids, NULL,
            jsonb_build_object(
                listing_4_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_4_size_no10_id,
                    'options', jsonb_build_object(
                        listing_4_size_no6_id, jsonb_build_object('name', 'No. 6', 'order', 0, 'priceCents', 8500, 'imageUuids', to_jsonb(listing_4_no6_image_uuids)),
                        listing_4_size_no10_id, jsonb_build_object('name', 'No. 10', 'order', 1, 'priceCents', 18000, 'imageUuids', to_jsonb(listing_4_no10_image_uuids)),
                        listing_4_size_no12_id, jsonb_build_object('name', 'No. 12', 'order', 2, 'priceCents', 22000, 'imageUuids', to_jsonb(listing_4_no12_image_uuids)),
                        listing_4_size_no14_id, jsonb_build_object('name', 'No. 14', 'order', 3, 'priceCents', 25000, 'imageUuids', to_jsonb(listing_4_no14_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_4_size_variation_id || ':' || listing_4_size_no6_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_4_size_variation_id || ':' || listing_4_size_no10_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_4_size_variation_id || ':' || listing_4_size_no12_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_4_size_variation_id || ':' || listing_4_size_no14_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_5_id, listing_5_short_id, listing_5_shop_id, listing_5_category_id, listing_5_title, listing_5_subtitle, listing_5_full_descr, listing_5_price_cents, NULL, NULL, listing_5_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_6_id, listing_6_short_id, listing_6_shop_id, listing_6_category_id, listing_6_title, listing_6_subtitle, listing_6_full_descr, listing_6_price_cents, NULL, NULL, listing_6_image_uuids, NULL,
            jsonb_build_object(
                listing_6_color_variation_id, jsonb_build_object(
                    'name', 'Color',
                    'pricesVary', false,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_6_color_patina_id,
                    'options', jsonb_build_object(
                        listing_6_color_patina_id, jsonb_build_object('name', 'Patina', 'order', 0, 'priceCents', null, 'imageUuids', to_jsonb(listing_6_patina_image_uuids)),
                        listing_6_color_raffia_id, jsonb_build_object('name', 'Raffia', 'order', 1, 'priceCents', null, 'imageUuids', to_jsonb(listing_6_raffia_image_uuids))
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
                    'defaultOption', listing_10_color_patina_id,
                    'options', jsonb_build_object(
                        listing_10_color_patina_id, jsonb_build_object('name', 'Patina', 'order', 0, 'priceCents', null, 'imageUuids', to_jsonb(listing_10_patina_image_uuids)),
                        listing_10_color_raffia_id, jsonb_build_object('name', 'Raffia', 'order', 1, 'priceCents', null, 'imageUuids', to_jsonb(listing_10_raffia_image_uuids))
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
                    'defaultOption', listing_12_color_patina_id,
                    'options', jsonb_build_object(
                        listing_12_color_patina_id, jsonb_build_object('name', 'Patina', 'order', 0, 'priceCents', null, 'imageUuids', to_jsonb(listing_12_patina_image_uuids)),
                        listing_12_color_raffia_id, jsonb_build_object('name', 'Raffia', 'order', 1, 'priceCents', null, 'imageUuids', to_jsonb(listing_12_raffia_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_12_color_variation_id || ':' || listing_12_color_raffia_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_12_color_variation_id || ':' || listing_12_color_patina_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_14_id, listing_14_short_id, listing_14_shop_id, listing_14_category_id, listing_14_title, listing_14_subtitle, listing_14_full_descr, listing_14_price_cents, NULL, NULL, listing_14_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_15_id, listing_15_short_id, listing_15_shop_id, listing_15_category_id, listing_15_title, listing_15_subtitle, listing_15_full_descr, listing_15_price_cents, NULL, NULL, listing_15_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_16_id, listing_16_short_id, listing_16_shop_id, listing_16_category_id, listing_16_title, listing_16_subtitle, listing_16_full_descr, listing_16_price_cents, NULL, NULL, listing_16_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_34_id, listing_34_short_id, listing_34_shop_id, listing_34_category_id, listing_34_title, listing_34_subtitle, listing_34_full_descr, listing_34_price_cents, NULL, NULL, listing_34_image_uuids, NULL,
            jsonb_build_object(
                listing_34_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_34_size_medium_id,
                    'options', jsonb_build_object(
                        listing_34_size_small_id,  jsonb_build_object('name', 'Small',       'order', 0, 'priceCents', 17000, 'imageUuids', to_jsonb(listing_34_small_image_uuids)),
                        listing_34_size_medium_id, jsonb_build_object('name', 'Medium',      'order', 1, 'priceCents', 22000, 'imageUuids', to_jsonb(listing_34_medium_image_uuids)),
                        listing_34_size_large_id,  jsonb_build_object('name', 'Large',       'order', 2, 'priceCents', 27000, 'imageUuids', to_jsonb(listing_34_large_image_uuids)),
                        listing_34_size_xl_id,     jsonb_build_object('name', 'Extra Large', 'order', 3, 'priceCents', 43000, 'imageUuids', to_jsonb(listing_34_xl_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_34_size_variation_id || ':' || listing_34_size_small_id,  jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_34_size_variation_id || ':' || listing_34_size_medium_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_34_size_variation_id || ':' || listing_34_size_large_id,  jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_34_size_variation_id || ':' || listing_34_size_xl_id,     jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_25_id, listing_25_short_id, listing_25_shop_id, listing_25_category_id, listing_25_title, listing_25_subtitle, listing_25_full_descr, listing_25_price_cents, NULL, NULL, listing_25_image_uuids, NULL,
            jsonb_build_object(
                listing_25_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_25_size_no10_id,
                    'options', jsonb_build_object(
                        listing_25_size_no8_id,  jsonb_build_object('name', 'No. 8',  'order', 0, 'priceCents', 12000, 'imageUuids', to_jsonb(listing_25_no8_image_uuids)),
                        listing_25_size_no10_id, jsonb_build_object('name', 'No. 10', 'order', 1, 'priceCents', 16000, 'imageUuids', to_jsonb(listing_25_no10_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_25_size_variation_id || ':' || listing_25_size_no8_id,  jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_25_size_variation_id || ':' || listing_25_size_no10_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_26_id, listing_26_short_id, listing_26_shop_id, listing_26_category_id, listing_26_title, listing_26_subtitle, listing_26_full_descr, listing_26_price_cents, NULL, NULL, listing_26_image_uuids, NULL,
            jsonb_build_object(
                listing_26_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_26_size_medium_id,
                    'options', jsonb_build_object(
                        listing_26_size_small_id,  jsonb_build_object('name', '3.5 Qt',  'order', 0, 'priceCents', 22500, 'imageUuids', to_jsonb(listing_26_small_image_uuids)),
                        listing_26_size_medium_id, jsonb_build_object('name', '5.5 Qt',  'order', 1, 'priceCents', 30000, 'imageUuids', to_jsonb(listing_26_medium_image_uuids)),
                        listing_26_size_large_id,  jsonb_build_object('name', '7.25 Qt', 'order', 2, 'priceCents', 37500, 'imageUuids', to_jsonb(listing_26_large_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_26_size_variation_id || ':' || listing_26_size_small_id,  jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_26_size_variation_id || ':' || listing_26_size_medium_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_26_size_variation_id || ':' || listing_26_size_large_id,  jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_29_id, listing_29_short_id, listing_29_shop_id, listing_29_category_id, listing_29_title, listing_29_subtitle, listing_29_full_descr, listing_29_price_cents, NULL, NULL, listing_29_image_uuids, NULL,
            jsonb_build_object(
                listing_29_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_29_size_no10_id,
                    'options', jsonb_build_object(
                        listing_29_size_no10_id, jsonb_build_object('name', 'No. 10', 'order', 0, 'priceCents', 12500, 'imageUuids', to_jsonb(listing_29_no10_image_uuids)),
                        listing_29_size_no12_id, jsonb_build_object('name', 'No. 12', 'order', 1, 'priceCents', 14000, 'imageUuids', to_jsonb(listing_29_no12_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_29_size_variation_id || ':' || listing_29_size_no10_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_29_size_variation_id || ':' || listing_29_size_no12_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_31_id, listing_31_short_id, listing_31_shop_id, listing_31_category_id, listing_31_title, listing_31_subtitle, listing_31_full_descr, listing_31_price_cents, NULL, NULL, listing_31_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_32_id, listing_32_short_id, listing_32_shop_id, listing_32_category_id, listing_32_title, listing_32_subtitle, listing_32_full_descr, listing_32_price_cents, NULL, NULL, listing_32_image_uuids, NULL,
            jsonb_build_object(
                listing_32_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_32_size_no12_id,
                    'options', jsonb_build_object(
                        listing_32_size_no12_id, jsonb_build_object('name', 'No. 12', 'order', 0, 'priceCents', 22000, 'imageUuids', to_jsonb(listing_32_no12_image_uuids)),
                        listing_32_size_no14_id, jsonb_build_object('name', 'No. 14', 'order', 1, 'priceCents', 25000, 'imageUuids', to_jsonb(listing_32_no14_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_32_size_variation_id || ':' || listing_32_size_no12_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_32_size_variation_id || ':' || listing_32_size_no14_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_20_id, listing_20_short_id, listing_20_shop_id, listing_20_category_id, listing_20_title, listing_20_subtitle, listing_20_full_descr, listing_20_price_cents, NULL, NULL, listing_20_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_21_id, listing_21_short_id, listing_21_shop_id, listing_21_category_id, listing_21_title, listing_21_subtitle, listing_21_full_descr, listing_21_price_cents, NULL, NULL, listing_21_image_uuids, NULL,
            jsonb_build_object(
                listing_21_height_variation_id, jsonb_build_object(
                    'name', 'Height',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_21_height_medium_id,
                    'options', jsonb_build_object(
                        listing_21_height_medium_id, jsonb_build_object('name', '3.5"', 'order', 0, 'priceCents', 2200, 'imageUuids', to_jsonb(listing_21_medium_image_uuids)),
                        listing_21_height_large_id,  jsonb_build_object('name', '6"',   'order', 1, 'priceCents', 3200, 'imageUuids', to_jsonb(listing_21_large_image_uuids)),
                        listing_21_height_xl_id,     jsonb_build_object('name', '9"',   'order', 2, 'priceCents', 3999, 'imageUuids', to_jsonb(listing_21_xl_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_21_height_variation_id || ':' || listing_21_height_medium_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_21_height_variation_id || ':' || listing_21_height_large_id,  jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_21_height_variation_id || ':' || listing_21_height_xl_id,     jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_22_id, listing_22_short_id, listing_22_shop_id, listing_22_category_id, listing_22_title, listing_22_subtitle, listing_22_full_descr, listing_22_price_cents, NULL, NULL, listing_22_image_uuids, NULL,
            jsonb_build_object(
                listing_22_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_22_size_standard_id,
                    'options', jsonb_build_object(
                        listing_22_size_standard_id, jsonb_build_object('name', 'Standard (12" x 7/8")', 'order', 0, 'priceCents', 1225, 'imageUuids', to_jsonb(listing_22_standard_image_uuids)),
                        listing_22_size_grand_id,    jsonb_build_object('name', 'Grand (15" x 1")',      'order', 1, 'priceCents', 2100, 'imageUuids', to_jsonb(listing_22_grand_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_22_size_variation_id || ':' || listing_22_size_standard_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_22_size_variation_id || ':' || listing_22_size_grand_id,    jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_35_id, listing_35_short_id, listing_35_shop_id, listing_35_category_id, listing_35_title, listing_35_subtitle, listing_35_full_descr, listing_35_price_cents, NULL, NULL, listing_35_image_uuids, NULL,
            jsonb_build_object(
                listing_35_quantity_variation_id, jsonb_build_object(
                    'name', 'Quantity',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_35_quantity_six_id,
                    'options', jsonb_build_object(
                        listing_35_quantity_single_id, jsonb_build_object('name', 'Single',     'order', 0, 'priceCents', 425,  'imageUuids', to_jsonb(listing_35_single_image_uuids)),
                        listing_35_quantity_six_id,    jsonb_build_object('name', '6 Pack',     'order', 1, 'priceCents', 2300, 'imageUuids', to_jsonb(listing_35_six_image_uuids)),
                        listing_35_quantity_case_id,   jsonb_build_object('name', 'Case of 18', 'order', 2, 'priceCents', 5900, 'imageUuids', to_jsonb(listing_35_case_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_35_quantity_variation_id || ':' || listing_35_quantity_single_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_35_quantity_variation_id || ':' || listing_35_quantity_six_id,    jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_35_quantity_variation_id || ':' || listing_35_quantity_case_id,   jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_36_id, listing_36_short_id, listing_36_shop_id, listing_36_category_id, listing_36_title, listing_36_subtitle, listing_36_full_descr, listing_36_price_cents, NULL, NULL, listing_36_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_37_id, listing_37_short_id, listing_37_shop_id, listing_37_category_id, listing_37_title, listing_37_subtitle, listing_37_full_descr, listing_37_price_cents, NULL, NULL, listing_37_image_uuids, NULL,
            jsonb_build_object(
                listing_37_design_variation_id, jsonb_build_object(
                    'name', 'Design',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_37_design_deco_id,
                    'options', jsonb_build_object(
                        listing_37_design_deco_id,  jsonb_build_object('name', 'Deco',  'order', 0, 'priceCents', 2200, 'imageUuids', to_jsonb(listing_37_deco_image_uuids)),
                        listing_37_design_flora_id, jsonb_build_object('name', 'Flora', 'order', 1, 'priceCents', 2200, 'imageUuids', to_jsonb(listing_37_flora_image_uuids)),
                        listing_37_design_lotus_id, jsonb_build_object('name', 'Lotus', 'order', 2, 'priceCents', 2250, 'imageUuids', to_jsonb(listing_37_lotus_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_37_design_variation_id || ':' || listing_37_design_deco_id,  jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_37_design_variation_id || ':' || listing_37_design_flora_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_37_design_variation_id || ':' || listing_37_design_lotus_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_38_id, listing_38_short_id, listing_38_shop_id, listing_38_category_id, listing_38_title, listing_38_subtitle, listing_38_full_descr, listing_38_price_cents, NULL, NULL, listing_38_image_uuids, NULL,
            jsonb_build_object(
                listing_38_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_38_size_small_id,
                    'options', jsonb_build_object(
                        listing_38_size_small_id,  jsonb_build_object('name', 'Small (2.5" x 3.25")',  'order', 0, 'priceCents', 1550, 'imageUuids', to_jsonb(listing_38_small_image_uuids)),
                        listing_38_size_medium_id, jsonb_build_object('name', 'Medium (2.5" x 5.25")', 'order', 1, 'priceCents', 2200, 'imageUuids', to_jsonb(listing_38_medium_image_uuids)),
                        listing_38_size_large_id,  jsonb_build_object('name', 'Large (3" x 6.25")',    'order', 2, 'priceCents', 2800, 'imageUuids', to_jsonb(listing_38_large_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_38_size_variation_id || ':' || listing_38_size_small_id,  jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_38_size_variation_id || ':' || listing_38_size_medium_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_38_size_variation_id || ':' || listing_38_size_large_id,  jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_49_id, listing_49_short_id, listing_49_shop_id, listing_49_category_id, listing_49_title, listing_49_subtitle, listing_49_full_descr, listing_49_price_cents, NULL, NULL, listing_49_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_50_id, listing_50_short_id, listing_50_shop_id, listing_50_category_id, listing_50_title, listing_50_subtitle, listing_50_full_descr, listing_50_price_cents, NULL, NULL, listing_50_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_51_id, listing_51_short_id, listing_51_shop_id, listing_51_category_id, listing_51_title, listing_51_subtitle, listing_51_full_descr, listing_51_price_cents, NULL, NULL, listing_51_image_uuids, NULL,
            jsonb_build_object(
                listing_51_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_51_size_small_id,
                    'options', jsonb_build_object(
                        listing_51_size_small_id, jsonb_build_object('name', 'Small', 'order', 0, 'priceCents', 25000, 'imageUuids', to_jsonb(listing_51_small_image_uuids)),
                        listing_51_size_medium_id, jsonb_build_object('name', 'Medium', 'order', 1, 'priceCents', 26000, 'imageUuids', to_jsonb(listing_51_medium_image_uuids)),
                        listing_51_size_large_id, jsonb_build_object('name', 'Large', 'order', 2, 'priceCents', 28500, 'imageUuids', to_jsonb(listing_51_large_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_51_size_variation_id || ':' || listing_51_size_small_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_51_size_variation_id || ':' || listing_51_size_medium_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_51_size_variation_id || ':' || listing_51_size_large_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_53_id, listing_53_short_id, listing_53_shop_id, listing_53_category_id, listing_53_title, listing_53_subtitle, listing_53_full_descr, listing_53_price_cents, NULL, NULL, listing_53_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_54_id, listing_54_short_id, listing_54_shop_id, listing_54_category_id, listing_54_title, listing_54_subtitle, listing_54_full_descr, listing_54_price_cents, NULL, NULL, listing_54_image_uuids, NULL,
            jsonb_build_object(
                listing_54_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_54_size_medium_id,
                    'options', jsonb_build_object(
                        listing_54_size_small_id, jsonb_build_object('name', 'Small', 'order', 0, 'priceCents', 19000, 'imageUuids', to_jsonb(listing_54_small_image_uuids)),
                        listing_54_size_medium_id, jsonb_build_object('name', 'Medium', 'order', 1, 'priceCents', 25000, 'imageUuids', to_jsonb(listing_54_medium_image_uuids)),
                        listing_54_size_large_id, jsonb_build_object('name', 'Large', 'order', 2, 'priceCents', 32000, 'imageUuids', to_jsonb(listing_54_large_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_54_size_variation_id || ':' || listing_54_size_small_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_54_size_variation_id || ':' || listing_54_size_medium_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_54_size_variation_id || ':' || listing_54_size_large_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_55_id, listing_55_short_id, listing_55_shop_id, listing_55_category_id, listing_55_title, listing_55_subtitle, listing_55_full_descr, listing_55_price_cents, NULL, NULL, listing_55_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_42_id, listing_42_short_id, listing_42_shop_id, listing_42_category_id, listing_42_title, listing_42_subtitle, listing_42_full_descr, listing_42_price_cents, NULL, NULL, listing_42_image_uuids, NULL,
            jsonb_build_object(
                listing_42_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_42_size_medium_id,
                    'options', jsonb_build_object(
                        listing_42_size_small_id, jsonb_build_object('name', 'Small', 'order', 0, 'priceCents', 22500, 'imageUuids', to_jsonb(listing_42_small_image_uuids)),
                        listing_42_size_medium_id, jsonb_build_object('name', 'Medium', 'order', 1, 'priceCents', 33500, 'imageUuids', to_jsonb(listing_42_medium_image_uuids)),
                        listing_42_size_large_id, jsonb_build_object('name', 'Large', 'order', 2, 'priceCents', 59500, 'imageUuids', to_jsonb(listing_42_large_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_42_size_variation_id || ':' || listing_42_size_small_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_42_size_variation_id || ':' || listing_42_size_medium_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_42_size_variation_id || ':' || listing_42_size_large_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
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
        (shop_3_id), -- Smithey Ironware Co.
        (shop_4_id), -- Rookwood
        (shop_7_id), -- Big Dipper Wax Works
        (shop_5_id); -- Simon Pearce

    INSERT INTO featured_listing (listing_id)
    VALUES
        (listing_4_id),  -- Cast Iron Skillet
        (listing_6_id),  -- Boule Vase
        (listing_5_id),  -- Rook Dish
        (listing_12_id), -- Pillar Candle Holder
        (listing_21_id), -- Beeswax 3" Pillar Candle
        (listing_22_id), -- Beeswax Tapers
        (listing_16_id), -- Shoreham Whiskey Glasses
        (listing_14_id), -- Vintner Red Wine Glasses
        (listing_15_id); -- Vintner White Wine Glasses

COMMIT;

END $$;
