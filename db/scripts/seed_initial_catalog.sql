DO $$

DECLARE
    shop_9_id INT := 9;
    shop_9_short_id VARCHAR := 'pY4r';
    shop_9_title VARCHAR := 'Pyrrha';
    shop_9_profile_image_uuid VARCHAR := '20f00458-7f83-4324-a3b4-d7bd0e91e4ee';
    shop_9_location VARCHAR := 'Vancouver, BC';
    shop_9_classification VARCHAR := 'Talisman Jewelry';
    shop_9_country_code CHAR(2) := 'CA';
    shop_9_profile_rich_text TEXT := '<h1>Our Story</h1><p>Since 1995, Pyrrha has been creating meaningful jewelry to connect you to what matters most. Our symbolic talismans are lost-wax cast in 100% recycled precious metals in our zero-carbon Vancouver studio.</p><h1>Made With Meaning</h1><p>Each talisman is inspired by the wax seals once used to close and authenticate letters, carrying a symbol chosen to mark a moment, a belief, or a person.</p><h1>Made Responsibly</h1><p>As a certified B Corp and a member of the Responsible Jewellery Council, we believe truly sustainable jewelry considers how a piece is made as carefully as what it means.</p>';

    catalog_default_inventory CONSTANT INT := 5;
    catalog_default_track_inventory CONSTANT BOOLEAN := true;

    shop_10_id INT := 10;
    shop_10_short_id VARCHAR := 'sU6h';
    shop_10_title VARCHAR := 'Studebaker Metals';
    shop_10_profile_image_uuid VARCHAR := '8c5e76b2-475b-40f2-ac71-a0cb95bafb17';
    shop_10_location VARCHAR := 'Pittsburgh, PA';
    shop_10_classification VARCHAR := 'Hand-Forged Metal Goods';
    shop_10_country_code CHAR(2) := 'US';
    shop_10_profile_rich_text TEXT := '<h1>Our Story</h1><p>Studebaker Metals was born in 2013, founded by traditionally trained metalsmith Michael Studebaker and fashion marketing and design professional Alyssa Catalano. It began with hand-forged metal cuff bracelets made in a basement, using tools that had already seen a lifetime of work.</p><h1>From Basement to Strip District</h1><p>A few big orders changed everything. The basement became a Wilkinsburg warehouse, the warehouse became a workshop in Braddock, and today our home is in Pittsburgh&rsquo;s historic Strip District, where visitors can watch our metalsmiths at work from the storefront.</p><h1>Built on Steel</h1><p>Our workshop is the former plumbing and carpentry shop of Crucible Steel&rsquo;s Park Works plant, built in 1903 and in continuous industrial use ever since. Pittsburgh&rsquo;s story has always been written in metal, and we are part of that tradition: anvils instead of blast furnaces, hand tools instead of assembly lines.</p><h1>Hand-Forged to Last</h1><p>We employ tools spanning three centuries and source the purest materials to evoke a quality typical of days past. Every piece is hand-forged on a made-to-order basis, and some orders may take up to four weeks to complete.</p>';

    shop_11_id INT := 11;
    shop_11_short_id VARCHAR := 'mK5w';
    shop_11_title VARCHAR := 'Michael Michaud Jewelry';
    shop_11_profile_image_uuid VARCHAR := 'd486d383-9610-43b8-938f-44ff0eb23d36';
    shop_11_location VARCHAR := 'Fairfield, CT';
    shop_11_classification VARCHAR := 'Botanical Jewelry';
    shop_11_country_code CHAR(2) := 'US';
    shop_11_profile_rich_text TEXT := '<h1>Our Story</h1><p>Michael Michaud trained at the Rochester Institute of Technology&rsquo;s school for American craftsmen, where he became a master of mold-making. After years working under jewelry designers around New York City, he found himself working in the city&rsquo;s flower district while living in the Connecticut countryside. His love of the natural world met his passion for jewelry, and in 1991 Michael Michaud Jewelry was born.</p><h1>Cast From Nature</h1><p>Where traditional lost-wax casting starts with a carved wax model, Michael uses a real leaf, branch, or flower. A mold is formed around the botanical, and as it is heated the plant burns away, leaving a beautifully detailed impression of itself. The result is jewelry that stays true to nature, down to the veins of a leaf.</p><h1>Bronze, Pearls, and Stone</h1><p>Each piece is cast in bronze with a soft patina and accented with pearls, beads, coral, and stones. The Silver Seasons collection is handcrafted in New York.</p><h1>In Museums and Collections</h1><p>Michael Michaud Jewelry is carried by museums, galleries, and specialty retailers around the world, and many collections have been commissioned by leading museums, including the Victoria &amp; Albert Museum, the Art Institute of Chicago, the National Gallery of Art, and the Ch&acirc;teau de Versailles.</p>';

    listing_62_id INT := 62;
    listing_62_short_id VARCHAR := 'Td7Kq';
    listing_62_shop_id INT := shop_9_id;
    listing_62_category_id VARCHAR := 'JEWELRY';
    listing_62_title VARCHAR := 'Through Darkness Talisman';
    listing_62_subtitle VARCHAR := 'A raven talisman honoring the shadow as a place of insight, where what is hidden may slowly be revealed.';
    listing_62_price_cents INT := 41000;
    listing_62_image_uuids text[] := '{}';
    listing_62_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>The raven, long associated with transformation, symbolizes wisdom found in moving through the unknown. Inscribed with &lsquo;Per Tenebras,&rsquo; meaning &lsquo;Through Darkness,&rsquo; this talisman honors the shadow as a place of insight, where what is hidden may slowly be revealed.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>Talisman measures approx. 19 mm x 21 mm</li><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
        }
    ]';
    listing_62_metal_variation_id CONSTANT VARCHAR := '975cfb74-55f7-45a4-aaf4-573579bf10a8';
    listing_62_metal_sterling_id CONSTANT VARCHAR := '04e53e40-326a-43d2-92da-b949b247d18c';
    listing_62_metal_bronze_id CONSTANT VARCHAR := 'd8452980-5b8a-4eff-8a7f-0631ef787cdb';
    listing_62_sterling_price_cents CONSTANT INT := 41000;
    listing_62_bronze_price_cents CONSTANT INT := 37500;
    listing_62_sterling_image_uuids CONSTANT text[] := '{"f2695f38-5e7b-4d68-9947-63851b20f7a1", "a40c30cd-e04a-4999-8c92-0e0b51d57149", "dc33453d-6a24-4a86-9745-2c0ff2c24a27", "7beee80b-db58-43cf-871a-d54733a0e252", "96a76d93-834f-4479-8b07-520de0ccce86"}';
    listing_62_bronze_image_uuids CONSTANT text[] := '{"12cec233-f339-4ff8-a097-80a1b90284f9", "a40c30cd-e04a-4999-8c92-0e0b51d57149", "51c2d018-87e0-43dc-8fc3-df84988f3713", "384c2638-610b-4f54-b61e-201ee2aebc46"}';

    listing_63_id INT := 63;
    listing_63_short_id VARCHAR := 'Cv8Rm';
    listing_63_shop_id INT := shop_9_id;
    listing_63_category_id VARCHAR := 'JEWELRY';
    listing_63_title VARCHAR := 'Curb Chain';
    listing_63_subtitle VARCHAR := 'A sterling silver curb chain, made to carry any Pyrrha talisman or charm.';
    listing_63_price_cents INT := 12000;
    listing_63_image_uuids text[] := '{"3dd1b81e-156c-4d54-86e3-ec6238ecd46e", "f9c7091b-9505-4e09-9f00-f651911cdc4b", "36d0a5a4-f4d8-4a3a-8d66-8353bde9a9ef", "11e5b2a5-158e-4866-9fa3-9e689e7a075a"}';
    listing_63_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>This sterling silver curb chain can accommodate any Pyrrha talisman or charm. Choose a fine, medium, or heavy width and a length that suits how you like to wear it.</p><p>The heavy curb is suited to larger pieces and requires a large jump ring.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>Fine curb: 1.5 mm wide</li><li>Medium curb: 2.1 mm wide</li><li>Heavy curb: 3.7 mm wide</li><li>Sterling silver in oxidized, bright, or black finishes</li><li>Fastens with a sterling silver lobster clasp</li></ul>"
        }
    ]';
    listing_63_metal_variation_id CONSTANT VARCHAR := '8e1ba491-15f2-4520-9374-abdeb97b274a';
    listing_63_width_variation_id CONSTANT VARCHAR := 'cb2d8dae-9ad5-4549-b50d-6106d483cd1d';
    listing_63_length_variation_id CONSTANT VARCHAR := 'eb56c78b-1386-4ef0-bcc0-8ece64065fba';
    listing_63_metal_oxidized_id CONSTANT VARCHAR := '39405e2b-263c-496b-a4a3-0a68bf34a978';
    listing_63_metal_bright_id CONSTANT VARCHAR := 'da2c6d7d-799d-451b-a5f6-22c4800343c9';
    listing_63_metal_black_id CONSTANT VARCHAR := 'efc5d2f7-8bb7-4f64-94d8-4661c53b9a16';
    listing_63_width_fine_id CONSTANT VARCHAR := '08f68682-52b8-43e1-b5f8-9bfebe182e86';
    listing_63_width_medium_id CONSTANT VARCHAR := 'f274c5b8-f4a5-4830-9328-614fe9454133';
    listing_63_width_heavy_id CONSTANT VARCHAR := 'fd558f24-3a04-4742-958a-529a331a63f6';
    listing_63_length_16_id CONSTANT VARCHAR := '35120bec-11c4-4b1c-bb62-34df98e49a47';
    listing_63_length_18_id CONSTANT VARCHAR := '72d21819-ac77-46bb-9d8c-264639eed31c';
    listing_63_length_20_id CONSTANT VARCHAR := '78ad6459-78e5-4107-8de1-5c575ff8d207';
    listing_63_length_22_id CONSTANT VARCHAR := '0bea2ed3-2e51-4326-969e-32fbb0b87129';
    listing_63_length_24_id CONSTANT VARCHAR := 'b753ee7d-6a95-459d-80c3-68547a6673cb';
    listing_63_length_26_id CONSTANT VARCHAR := '23a6e436-6376-4293-9172-59db1e0883ad';
    listing_63_length_28_id CONSTANT VARCHAR := '239b9dce-182c-45e6-87e7-97f47e72aaa6';
    listing_63_length_36_id CONSTANT VARCHAR := '97d11e87-5d73-4e58-82f9-8c18c64c6100';
    listing_63_fine_oxidized_image_uuid CONSTANT VARCHAR := 'c8c91b4b-b202-4681-a85b-257bd85ece7c';
    listing_63_fine_black_image_uuid CONSTANT VARCHAR := 'a28af9e1-f8ee-493c-87d0-07877bb84df0';
    listing_63_fine_bright_image_uuid CONSTANT VARCHAR := '071f8343-484d-4172-b23a-8e94f65dabdf';
    listing_63_medium_oxidized_image_uuid CONSTANT VARCHAR := '514a6e23-e588-4c5e-bbbe-b07c059782d0';
    listing_63_medium_black_image_uuid CONSTANT VARCHAR := '5a48949e-44b6-46a2-b0d1-72e0510c50d4';
    listing_63_heavy_oxidized_image_uuid CONSTANT VARCHAR := '53b6ef7c-5063-4a31-b07e-771ef28ec18d';
    listing_63_heavy_black_image_uuid CONSTANT VARCHAR := 'a3b75ead-6745-4d14-8fc5-a11c1f45fa64';
    listing_63_combinations JSONB;

    listing_64_id INT := 64;
    listing_64_short_id VARCHAR := 'wjBTd';
    listing_64_shop_id INT := shop_9_id;
    listing_64_category_id VARCHAR := 'JEWELRY';
    listing_64_title VARCHAR := 'Resilience Talisman';
    listing_64_subtitle VARCHAR := 'A teasel talisman for the strength to withstand hardship and keep growing with grace.';
    listing_64_price_cents INT := 43000;
    listing_64_image_uuids text[] := '{}';
    listing_64_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>The teasel, known for its enduring form and protective thorns, is a symbol of resilience. This talisman represents the strength to withstand hardship and continue growing with grace, even in difficult conditions.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>Talisman measures approx. 19 mm x 21 mm</li><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
        }
    ]';
    listing_64_metal_variation_id CONSTANT VARCHAR := '8ee93aa7-8eaf-425f-bc83-4ae5433cb021';
    listing_64_metal_sterling_id CONSTANT VARCHAR := '3077355f-cf83-4f83-98ce-31186b81bd45';
    listing_64_metal_bronze_id CONSTANT VARCHAR := 'd16099b0-687e-4696-aaf2-046de6358247';
    listing_64_sterling_price_cents CONSTANT INT := 43000;
    listing_64_bronze_price_cents CONSTANT INT := 38500;
    listing_64_sterling_image_uuids CONSTANT text[] := '{"6ce6f908-3da9-4d47-861a-0e785b3d8268", "7a82a3a5-2af0-4e08-9936-c564bef1b431", "c7e9e01b-2bc0-4658-b36a-f71af0a402fc", "e220b143-3315-4496-be99-84e5ddc9df52", "7e95e542-1f03-44b0-b3df-003e91e6c5ff"}';
    listing_64_bronze_image_uuids CONSTANT text[] := '{"816eb195-b2ac-4888-b7b7-8d55ee134cfa", "7a82a3a5-2af0-4e08-9936-c564bef1b431", "4b150581-109b-41ac-bf69-cebfa9545793"}';

    listing_65_id INT := 65;
    listing_65_short_id VARCHAR := 'e6Lgz';
    listing_65_shop_id INT := shop_9_id;
    listing_65_category_id VARCHAR := 'JEWELRY';
    listing_65_title VARCHAR := 'Inner Vision Talisman';
    listing_65_subtitle VARCHAR := 'A sleeping eye talisman honoring intuition, dreams, and the quiet awareness found in stillness.';
    listing_65_price_cents INT := 35500;
    listing_65_image_uuids text[] := '{}';
    listing_65_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>The sleeping eye in the sky symbolizes inner vision and the quiet awareness that remains even in stillness. This talisman honors intuition, dreams, and the unseen truths that reveal themselves when the mind is at rest.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>Talisman measures approx. 17 mm x 18 mm</li><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
        }
    ]';
    listing_65_metal_variation_id CONSTANT VARCHAR := '7646d777-f540-4fff-99a4-478e7083765b';
    listing_65_metal_sterling_id CONSTANT VARCHAR := 'c8ae8049-4bbc-4ffe-a35e-53c2dc6a747b';
    listing_65_metal_bronze_id CONSTANT VARCHAR := '13f4bbf5-9c70-4f81-8d8f-cff0d6c847ff';
    listing_65_sterling_price_cents CONSTANT INT := 35500;
    listing_65_bronze_price_cents CONSTANT INT := 32500;
    listing_65_sterling_image_uuids CONSTANT text[] := '{"75824ae7-21d6-4f54-9892-a456a10b7d40", "17a5f657-e529-4f77-9ee6-5e1eeb0e3e46", "d2e9aa6b-80f8-4717-9174-9488e505d4eb", "089f8ea8-08f7-4ff4-b91d-7af79234d7ac", "3909d84f-2fb7-4b72-b98b-d0f27f195175"}';
    listing_65_bronze_image_uuids CONSTANT text[] := '{"2f0fb97b-1d51-499d-8112-854efefe876d", "17a5f657-e529-4f77-9ee6-5e1eeb0e3e46", "1f13be93-8ed1-42af-aa4e-2a748e957cdc", "3bf59cc0-a4aa-4046-8e0a-cf68a09762e8"}';

    listing_66_id INT := 66;
    listing_66_short_id VARCHAR := 'PdJpc';
    listing_66_shop_id INT := shop_9_id;
    listing_66_category_id VARCHAR := 'JEWELRY';
    listing_66_title VARCHAR := 'Grounded Talisman';
    listing_66_subtitle VARCHAR := 'A talisman of layered rock, symbolizing inner depth, permanence, and the experiences that form who we are.';
    listing_66_price_cents INT := 38500;
    listing_66_image_uuids text[] := '{}';
    listing_66_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Layers of rock symbolize what is built over time. This talisman is symbolic of what is held beneath the surface, representing inner depth, permanence, and the experiences that form who we are.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>Talisman measures approx. 17 mm x 18 mm</li><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
        }
    ]';
    listing_66_metal_variation_id CONSTANT VARCHAR := '7e670b3a-f583-4ef6-a5a7-6b3fbed10d54';
    listing_66_metal_sterling_id CONSTANT VARCHAR := 'a35982a8-310c-466a-8c35-1945cbae5838';
    listing_66_metal_bronze_id CONSTANT VARCHAR := 'c415738b-a342-4afd-9f21-d5c94751a46a';
    listing_66_sterling_price_cents CONSTANT INT := 38500;
    listing_66_bronze_price_cents CONSTANT INT := 35000;
    listing_66_sterling_image_uuids CONSTANT text[] := '{"5195d832-6b6b-495c-b6a9-f9085b3610f5", "b1eb66e0-9196-42cb-b228-b35ff29f6498", "cc6f1772-eb6e-4b5b-90fb-e3a7a1266e49", "813e2c5e-3450-4f1c-9886-bfc6fdf4cb5d", "947c0b4f-e68e-4682-b8ad-00eff083e0ff"}';
    listing_66_bronze_image_uuids CONSTANT text[] := '{"ab1bacbd-25a9-42bd-9f5d-e964356d329b", "b1eb66e0-9196-42cb-b228-b35ff29f6498", "4e86ac7f-3fb0-4e66-b8b4-932ad8f92fe4", "a624faf0-bce8-4663-bae9-3f2ddf7550ec"}';

    listing_67_id INT := 67;
    listing_67_short_id VARCHAR := 'fDCer';
    listing_67_shop_id INT := shop_9_id;
    listing_67_category_id VARCHAR := 'JEWELRY';
    listing_67_title VARCHAR := 'Always Reaching Talisman';
    listing_67_subtitle VARCHAR := 'An ivy talisman for steady growth and the instinct to keep reaching.';
    listing_67_price_cents INT := 38500;
    listing_67_image_uuids text[] := '{}';
    listing_67_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Ivy climbing a wall represents steady growth and the instinct to keep reaching. This talisman is a reminder to continue upward and adapt to what surrounds you while staying connected to what holds you steady.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>Talisman measures approx. 17 mm x 20 mm</li><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
        }
    ]';
    listing_67_metal_variation_id CONSTANT VARCHAR := 'b5592123-a50d-4eac-9e64-f45a3b9f7376';
    listing_67_metal_sterling_id CONSTANT VARCHAR := '09f00e6e-e5b0-4abd-8553-2502881f5cdc';
    listing_67_metal_bronze_id CONSTANT VARCHAR := 'b201dfee-329f-47b5-bca3-3fd40576f19b';
    listing_67_sterling_price_cents CONSTANT INT := 38500;
    listing_67_bronze_price_cents CONSTANT INT := 35000;
    listing_67_sterling_image_uuids CONSTANT text[] := '{"d78c1f25-8c0a-47e6-8b47-6497d9195396", "7ecc49f8-5fab-4f04-861b-e10c5254ddc5", "3037038a-5d8e-4310-ad00-4e68fbc271f4", "76abc1fa-a9e5-4aa7-ba3a-fc0d443753fc", "56278e52-eec3-4223-a759-b7c606b46223"}';
    listing_67_bronze_image_uuids CONSTANT text[] := '{"1396a9a3-f0e1-4d32-a629-46842b1a907c", "7ecc49f8-5fab-4f04-861b-e10c5254ddc5", "7c95a2ae-1214-4d49-8bec-0a0480beafb2", "8213ea97-00c3-4fe6-a541-800f7a3dacef"}';

    listing_68_id INT := 68;
    listing_68_short_id VARCHAR := 'fMDd6';
    listing_68_shop_id INT := shop_9_id;
    listing_68_category_id VARCHAR := 'JEWELRY';
    listing_68_title VARCHAR := 'Age With Power Talisman';
    listing_68_subtitle VARCHAR := 'A snake and pomegranate talisman celebrating renewal and becoming more fully yourself.';
    listing_68_price_cents INT := 45000;
    listing_68_image_uuids text[] := '{}';
    listing_68_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>The snake and pomegranate symbolize renewal, feminine power, and the life force that deepens with time. This talisman celebrates becoming more fully yourself: radiant, self-possessed, and ever-renewing.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>Talisman measures approx. 21 mm x 21 mm</li><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
        }
    ]';
    listing_68_metal_variation_id CONSTANT VARCHAR := '49ebb933-ea3e-4f28-9606-f4393802cea8';
    listing_68_metal_sterling_id CONSTANT VARCHAR := '079d671b-e5ce-43ce-afec-d2c88c65bec0';
    listing_68_metal_bronze_id CONSTANT VARCHAR := 'a4e11111-28e2-48d4-9eb4-fa4995712e28';
    listing_68_sterling_price_cents CONSTANT INT := 45000;
    listing_68_bronze_price_cents CONSTANT INT := 41000;
    listing_68_sterling_image_uuids CONSTANT text[] := '{"02602ea8-59dc-4432-bf58-524e8b08b6cf", "18e698fa-e708-43d5-bdfb-dd9404fd7327", "569e4bca-073c-49e0-9d43-566063a73e81", "c1a65675-2a55-4575-a59e-8f0cd1903984", "4fa91c13-96c0-4ab2-96d7-53bb0764d40d"}';
    listing_68_bronze_image_uuids CONSTANT text[] := '{"a3f74d87-ee68-49d8-849c-053b5c5a6020", "18e698fa-e708-43d5-bdfb-dd9404fd7327", "0f5b76da-3961-4e59-8500-f3219dc802b8", "ee5bd130-24c9-4958-aa65-bf6f86c0e0c1"}';

    listing_69_id INT := 69;
    listing_69_short_id VARCHAR := 'NhqSS';
    listing_69_shop_id INT := shop_9_id;
    listing_69_category_id VARCHAR := 'JEWELRY';
    listing_69_title VARCHAR := 'Inner Sanctum Talisman';
    listing_69_subtitle VARCHAR := 'A key-and-shield talisman to protect your inner peace.';
    listing_69_price_cents INT := 34500;
    listing_69_image_uuids text[] := '{}';
    listing_69_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>The key, held within a shield, symbolizes the power to protect your inner peace. This talisman is a reminder that your calm is sacred, your boundaries are worthy, and you decide what enters your life.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>Talisman measures approx. 16 mm x 17 mm</li><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
        }
    ]';
    listing_69_metal_variation_id CONSTANT VARCHAR := '4d35aa87-0038-4936-98c3-3aa57b02f9cc';
    listing_69_metal_sterling_id CONSTANT VARCHAR := '16b0fcd7-eadc-4c47-b595-0e0e9ca7282e';
    listing_69_metal_bronze_id CONSTANT VARCHAR := 'b206767f-9ad3-4c90-b8fd-b6b2130b0e7c';
    listing_69_sterling_price_cents CONSTANT INT := 34500;
    listing_69_bronze_price_cents CONSTANT INT := 31500;
    listing_69_sterling_image_uuids CONSTANT text[] := '{"170ca269-a45f-4fd7-9d93-0641c791a95a", "c1dd9f67-320b-4926-af31-06f5937c355a", "a762540a-81b7-4be5-8dd0-943ef83e8d33", "83317232-e3bf-4495-ad5f-362d39b02168", "1e66f724-0dc0-4780-a5d2-6ecbaee09d43"}';
    listing_69_bronze_image_uuids CONSTANT text[] := '{"e7fe67f5-a593-4d1c-8b34-bd7b598a3bff", "c1dd9f67-320b-4926-af31-06f5937c355a", "a0d976ec-36b1-4492-bfe1-c27d0eb79945", "c2614e46-94ac-47a7-882a-f89f483ac966"}';

    listing_70_id INT := 70;
    listing_70_short_id VARCHAR := 'PdNPB';
    listing_70_shop_id INT := shop_9_id;
    listing_70_category_id VARCHAR := 'JEWELRY';
    listing_70_title VARCHAR := 'Guardian Talisman';
    listing_70_subtitle VARCHAR := 'A dragon-and-shield talisman of steadfast protection, inscribed Tutus Es, Latin for You Are Safe.';
    listing_70_price_cents INT := 40000;
    listing_70_image_uuids text[] := '{}';
    listing_70_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Inscribed with &lsquo;Tutus Es,&rsquo; Latin for &lsquo;You Are Safe,&rsquo; this talisman is a symbol of steadfast protection. The dragon encircles the shield as a promise to protect, representing the fierce love, vigilance, and courage of those who keep their loved ones safe.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>Talisman measures approx. 17 mm x 21 mm</li><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
        }
    ]';
    listing_70_metal_variation_id CONSTANT VARCHAR := '9be559fd-065e-485f-849d-8311f81b43cf';
    listing_70_metal_sterling_id CONSTANT VARCHAR := '703c3104-5ed2-49c4-a89e-2141fbfc0099';
    listing_70_metal_bronze_id CONSTANT VARCHAR := '56a9f922-1b93-40fa-8fb4-f7ca5a707b88';
    listing_70_sterling_price_cents CONSTANT INT := 40000;
    listing_70_bronze_price_cents CONSTANT INT := 36000;
    listing_70_sterling_image_uuids CONSTANT text[] := '{"dce73dae-3e8f-47d4-a1be-bde3a970a46d", "cb3430b9-1f65-4016-92fc-ea7c0aaed50e", "590fa483-bccc-43e9-becc-9a63b8acc1d1", "600f3ea4-e9a6-4812-afcc-52b6f9439610", "a1fd6c86-4624-42f7-b065-98b0590b95a0"}';
    listing_70_bronze_image_uuids CONSTANT text[] := '{"6b324e76-6e02-42a0-a8af-65ddc9def48c", "cb3430b9-1f65-4016-92fc-ea7c0aaed50e", "c8d621a9-0c57-4ee5-99e9-f23fd21531df"}';

    listing_71_id INT := 71;
    listing_71_short_id VARCHAR := 'dqcM8';
    listing_71_shop_id INT := shop_9_id;
    listing_71_category_id VARCHAR := 'JEWELRY';
    listing_71_title VARCHAR := 'Trust in Yourself Talisman';
    listing_71_subtitle VARCHAR := 'A fox talisman for self-belief and the courage to tackle any challenge head-on.';
    listing_71_price_cents INT := 39000;
    listing_71_image_uuids text[] := '{}';
    listing_71_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>The fox, renowned for its resilience and adaptability, symbolizes a deep-seated trust in one&rsquo;s abilities to navigate any obstacle. This talisman is a testament to the power of self-belief and the courage to tackle any challenge head-on.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>Talisman measures approx. 18 mm x 21 mm</li><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
        }
    ]';
    listing_71_metal_variation_id CONSTANT VARCHAR := 'ad1c176a-e0af-480e-9336-ad1e6815c7fa';
    listing_71_metal_sterling_id CONSTANT VARCHAR := 'ad94d6d0-e2e5-42a0-9f12-8599de84ea15';
    listing_71_metal_bronze_id CONSTANT VARCHAR := 'f59012fc-4787-4bf9-b3d5-0091120f9c44';
    listing_71_sterling_price_cents CONSTANT INT := 39000;
    listing_71_bronze_price_cents CONSTANT INT := 36000;
    listing_71_sterling_image_uuids CONSTANT text[] := '{"89be8f52-2b5d-4970-989f-31d2c7538b9a", "f653fed5-fe21-4f98-a35e-99a6493c9010", "db5ae3a7-84f1-495b-975c-8d3531359003", "52d8f8c9-c577-4cad-833c-1a4961c3f300", "e82efa3b-cdaf-45f3-8790-3d5b501a23e2", "a3753fbb-d020-4a3b-a459-a32bf1846792"}';
    listing_71_bronze_image_uuids CONSTANT text[] := '{"620ba175-e90f-4f83-b4b2-e7ff2600f479", "f653fed5-fe21-4f98-a35e-99a6493c9010", "94e0d839-49cc-4c78-955b-7e7c2bf13b0e", "d01ea4d5-9c49-4cc5-9da9-1216d7f069b3", "2bd0262b-b29e-4367-b601-8f6a1eee7dcd"}';

    listing_72_id INT := 72;
    listing_72_short_id VARCHAR := 'iuCjL';
    listing_72_shop_id INT := shop_9_id;
    listing_72_category_id VARCHAR := 'JEWELRY';
    listing_72_title VARCHAR := 'Direction Talisman';
    listing_72_subtitle VARCHAR := 'A compass rose talisman to help you find direction and stay on the path to your heart’s true desires.';
    listing_72_price_cents INT := 36000;
    listing_72_image_uuids text[] := '{}';
    listing_72_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>The compass rose on this talisman helps you to find direction and keep you on the path to your heart&rsquo;s true desires.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li>Talisman measures approx. 17 mm x 17 mm</li><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
        }
    ]';
    listing_72_metal_variation_id CONSTANT VARCHAR := '9292bb2b-a4e2-490a-bb61-2d586f72a644';
    listing_72_metal_sterling_id CONSTANT VARCHAR := '331d36cf-53b0-437a-bc09-edb886466dc9';
    listing_72_metal_bronze_id CONSTANT VARCHAR := 'dd8709fa-abcf-4b81-aef8-964b1816a235';
    listing_72_sterling_price_cents CONSTANT INT := 36000;
    listing_72_bronze_price_cents CONSTANT INT := 33000;
    listing_72_sterling_image_uuids CONSTANT text[] := '{"1ad22644-b2f4-46f4-a86c-d8b92f823332", "00c381a2-e85d-4113-a319-c88f8172a23d", "21db270b-8849-414e-b4c9-38cdbbda3eb7", "516f69c6-f661-48c5-9438-78c3105fd8fd", "1f7d9eef-9fce-4b80-9e3e-bcfde27b1883", "8990e187-84be-42fc-ac74-4bafc2d0a627"}';
    listing_72_bronze_image_uuids CONSTANT text[] := '{"def13401-591d-4665-bcb2-48aa111c8d2a", "00c381a2-e85d-4113-a319-c88f8172a23d", "bcd6b93e-4711-48ed-840c-35c523ed4ab0", "0d02a089-4151-4e13-aeff-a5a57ee174e2", "a8cf21d4-61d0-4a50-a4be-ededc60d2b03", "327d6ad1-26a3-4258-8274-dd7cffbfccd6"}';

BEGIN

    INSERT INTO shop (id, short_id, title, profile_rich_text, profile_image_uuid, shop_location, classification, country_code, direct_fulfillment, created_at, updated_at)
    VALUES
        (shop_9_id, shop_9_short_id, shop_9_title, shop_9_profile_rich_text, shop_9_profile_image_uuid, shop_9_location, shop_9_classification, shop_9_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (shop_10_id, shop_10_short_id, shop_10_title, shop_10_profile_rich_text, shop_10_profile_image_uuid, shop_10_location, shop_10_classification, shop_10_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (shop_11_id, shop_11_short_id, shop_11_title, shop_11_profile_rich_text, shop_11_profile_image_uuid, shop_11_location, shop_11_classification, shop_11_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
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

    PERFORM setval(pg_get_serial_sequence('shop', 'id'), COALESCE((SELECT MAX(id) FROM shop), 1));

    INSERT INTO featured_shop (shop_id)
    SELECT shop_9_id
    WHERE NOT EXISTS (SELECT 1 FROM featured_shop WHERE shop_id = shop_9_id);

    INSERT INTO featured_shop (shop_id)
    SELECT shop_10_id
    WHERE NOT EXISTS (SELECT 1 FROM featured_shop WHERE shop_id = shop_10_id);

    INSERT INTO featured_shop (shop_id)
    SELECT shop_11_id
    WHERE NOT EXISTS (SELECT 1 FROM featured_shop WHERE shop_id = shop_11_id);

    INSERT INTO listing (id, short_id, shop_id, category_id, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, combinations, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_62_id, listing_62_short_id, listing_62_shop_id, listing_62_category_id, listing_62_title, listing_62_subtitle, listing_62_full_descr, listing_62_price_cents, NULL, NULL, listing_62_image_uuids, NULL,
            jsonb_build_object(
                listing_62_metal_variation_id, jsonb_build_object(
                    'name', 'Metal',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_62_metal_sterling_id,
                    'options', jsonb_build_object(
                        listing_62_metal_sterling_id, jsonb_build_object('name', 'Sterling Silver', 'order', 0, 'priceCents', listing_62_sterling_price_cents, 'imageUuids', to_jsonb(listing_62_sterling_image_uuids)),
                        listing_62_metal_bronze_id, jsonb_build_object('name', 'Bronze', 'order', 1, 'priceCents', listing_62_bronze_price_cents, 'imageUuids', to_jsonb(listing_62_bronze_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_62_metal_variation_id || ':' || listing_62_metal_sterling_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_62_metal_variation_id || ':' || listing_62_metal_bronze_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        combinations = EXCLUDED.combinations,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    listing_63_combinations := (
        WITH metals(id) AS (
            VALUES
                (listing_63_metal_oxidized_id),
                (listing_63_metal_bright_id),
                (listing_63_metal_black_id)
        ), widths(id) AS (
            VALUES
                (listing_63_width_fine_id),
                (listing_63_width_medium_id),
                (listing_63_width_heavy_id)
        ), lengths(id) AS (
            VALUES
                (listing_63_length_16_id),
                (listing_63_length_18_id),
                (listing_63_length_20_id),
                (listing_63_length_22_id),
                (listing_63_length_24_id),
                (listing_63_length_26_id),
                (listing_63_length_28_id),
                (listing_63_length_36_id)
        ), priced(metal_id, width_id, length_id, price_cents, image_uuid) AS (
            VALUES
                (listing_63_metal_oxidized_id, listing_63_width_fine_id, listing_63_length_16_id, 12000, listing_63_fine_oxidized_image_uuid),
                (listing_63_metal_oxidized_id, listing_63_width_fine_id, listing_63_length_18_id, 12000, listing_63_fine_oxidized_image_uuid),
                (listing_63_metal_oxidized_id, listing_63_width_fine_id, listing_63_length_20_id, 14000, listing_63_fine_oxidized_image_uuid),
                (listing_63_metal_oxidized_id, listing_63_width_fine_id, listing_63_length_22_id, 14000, listing_63_fine_oxidized_image_uuid),
                (listing_63_metal_oxidized_id, listing_63_width_fine_id, listing_63_length_26_id, 16000, listing_63_fine_oxidized_image_uuid),
                (listing_63_metal_bright_id, listing_63_width_fine_id, listing_63_length_18_id, 12000, listing_63_fine_bright_image_uuid),
                (listing_63_metal_bright_id, listing_63_width_fine_id, listing_63_length_22_id, 14000, listing_63_fine_bright_image_uuid),
                (listing_63_metal_black_id, listing_63_width_fine_id, listing_63_length_16_id, 12000, listing_63_fine_black_image_uuid),
                (listing_63_metal_black_id, listing_63_width_fine_id, listing_63_length_18_id, 12000, listing_63_fine_black_image_uuid),
                (listing_63_metal_black_id, listing_63_width_fine_id, listing_63_length_20_id, 14000, listing_63_fine_black_image_uuid),
                (listing_63_metal_black_id, listing_63_width_fine_id, listing_63_length_22_id, 14000, listing_63_fine_black_image_uuid),
                (listing_63_metal_black_id, listing_63_width_fine_id, listing_63_length_26_id, 16000, listing_63_fine_black_image_uuid),
                (listing_63_metal_oxidized_id, listing_63_width_medium_id, listing_63_length_16_id, 19000, listing_63_medium_oxidized_image_uuid),
                (listing_63_metal_oxidized_id, listing_63_width_medium_id, listing_63_length_18_id, 19000, listing_63_medium_oxidized_image_uuid),
                (listing_63_metal_oxidized_id, listing_63_width_medium_id, listing_63_length_20_id, 22500, listing_63_medium_oxidized_image_uuid),
                (listing_63_metal_oxidized_id, listing_63_width_medium_id, listing_63_length_22_id, 22500, listing_63_medium_oxidized_image_uuid),
                (listing_63_metal_oxidized_id, listing_63_width_medium_id, listing_63_length_24_id, 25000, listing_63_medium_oxidized_image_uuid),
                (listing_63_metal_oxidized_id, listing_63_width_medium_id, listing_63_length_28_id, 28000, listing_63_medium_oxidized_image_uuid),
                (listing_63_metal_oxidized_id, listing_63_width_medium_id, listing_63_length_36_id, 35000, listing_63_medium_oxidized_image_uuid),
                (listing_63_metal_black_id, listing_63_width_medium_id, listing_63_length_18_id, 19000, listing_63_medium_black_image_uuid),
                (listing_63_metal_black_id, listing_63_width_medium_id, listing_63_length_22_id, 22500, listing_63_medium_black_image_uuid),
                (listing_63_metal_black_id, listing_63_width_medium_id, listing_63_length_24_id, 25000, listing_63_medium_black_image_uuid),
                (listing_63_metal_black_id, listing_63_width_medium_id, listing_63_length_28_id, 28000, listing_63_medium_black_image_uuid),
                (listing_63_metal_oxidized_id, listing_63_width_heavy_id, listing_63_length_18_id, 53500, listing_63_heavy_oxidized_image_uuid),
                (listing_63_metal_oxidized_id, listing_63_width_heavy_id, listing_63_length_20_id, 59500, listing_63_heavy_oxidized_image_uuid),
                (listing_63_metal_oxidized_id, listing_63_width_heavy_id, listing_63_length_22_id, 59500, listing_63_heavy_oxidized_image_uuid),
                (listing_63_metal_oxidized_id, listing_63_width_heavy_id, listing_63_length_24_id, 69000, listing_63_heavy_oxidized_image_uuid),
                (listing_63_metal_oxidized_id, listing_63_width_heavy_id, listing_63_length_26_id, 71500, listing_63_heavy_oxidized_image_uuid),
                (listing_63_metal_oxidized_id, listing_63_width_heavy_id, listing_63_length_28_id, 74000, listing_63_heavy_oxidized_image_uuid),
                (listing_63_metal_black_id, listing_63_width_heavy_id, listing_63_length_20_id, 59500, listing_63_heavy_black_image_uuid),
                (listing_63_metal_black_id, listing_63_width_heavy_id, listing_63_length_22_id, 59500, listing_63_heavy_black_image_uuid),
                (listing_63_metal_black_id, listing_63_width_heavy_id, listing_63_length_26_id, 69000, listing_63_heavy_black_image_uuid),
                (listing_63_metal_black_id, listing_63_width_heavy_id, listing_63_length_28_id, 74000, listing_63_heavy_black_image_uuid)
        )
        SELECT jsonb_object_agg(
            listing_63_metal_variation_id || ':' || metals.id || '|' || listing_63_width_variation_id || ':' || widths.id || '|' || listing_63_length_variation_id || ':' || lengths.id,
            jsonb_build_object('priceCents', priced.price_cents, 'imageUuid', priced.image_uuid, 'disabled', priced.price_cents IS NULL, 'inventory', catalog_default_inventory)
        )
        FROM metals
        CROSS JOIN widths
        CROSS JOIN lengths
        LEFT JOIN priced ON priced.metal_id = metals.id AND priced.width_id = widths.id AND priced.length_id = lengths.id
    );

    INSERT INTO listing (id, short_id, shop_id, category_id, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, combinations, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_63_id, listing_63_short_id, listing_63_shop_id, listing_63_category_id, listing_63_title, listing_63_subtitle, listing_63_full_descr, listing_63_price_cents, NULL, NULL, listing_63_image_uuids, NULL,
            jsonb_build_object(
                listing_63_metal_variation_id, jsonb_build_object(
                    'name', 'Metal',
                    'pricesVary', true,
                    'imagesVary', false,
                    'order', 0,
                    'defaultOption', listing_63_metal_oxidized_id,
                    'options', jsonb_build_object(
                        listing_63_metal_oxidized_id, jsonb_build_object('name', 'Oxidized Sterling Silver', 'order', 0, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_63_metal_bright_id, jsonb_build_object('name', 'Bright Sterling Silver', 'order', 1, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_63_metal_black_id, jsonb_build_object('name', 'Black Sterling Silver', 'order', 2, 'priceCents', null, 'imageUuids', '[]'::jsonb)
                    )
                ),
                listing_63_width_variation_id, jsonb_build_object(
                    'name', 'Width',
                    'pricesVary', false,
                    'imagesVary', true,
                    'order', 1,
                    'defaultOption', listing_63_width_fine_id,
                    'options', jsonb_build_object(
                        listing_63_width_fine_id, jsonb_build_object('name', 'Fine (1.5mm)', 'order', 0, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_63_width_medium_id, jsonb_build_object('name', 'Medium (2.1mm)', 'order', 1, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_63_width_heavy_id, jsonb_build_object('name', 'Heavy (3.7mm)', 'order', 2, 'priceCents', null, 'imageUuids', '[]'::jsonb)
                    )
                ),
                listing_63_length_variation_id, jsonb_build_object(
                    'name', 'Length',
                    'pricesVary', false,
                    'imagesVary', false,
                    'order', 2,
                    'defaultOption', listing_63_length_18_id,
                    'options', jsonb_build_object(
                        listing_63_length_16_id, jsonb_build_object('name', '16"', 'order', 0, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_63_length_18_id, jsonb_build_object('name', '18"', 'order', 1, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_63_length_20_id, jsonb_build_object('name', '20"', 'order', 2, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_63_length_22_id, jsonb_build_object('name', '22"', 'order', 3, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_63_length_24_id, jsonb_build_object('name', '24"', 'order', 4, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_63_length_26_id, jsonb_build_object('name', '26"', 'order', 5, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_63_length_28_id, jsonb_build_object('name', '28"', 'order', 6, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_63_length_36_id, jsonb_build_object('name', '36"', 'order', 7, 'priceCents', null, 'imageUuids', '[]'::jsonb)
                    )
                )
            ),
            listing_63_combinations, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        combinations = EXCLUDED.combinations,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    INSERT INTO listing (id, short_id, shop_id, category_id, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, combinations, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_64_id, listing_64_short_id, listing_64_shop_id, listing_64_category_id, listing_64_title, listing_64_subtitle, listing_64_full_descr, listing_64_price_cents, NULL, NULL, listing_64_image_uuids, NULL,
            jsonb_build_object(
                listing_64_metal_variation_id, jsonb_build_object(
                    'name', 'Metal',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_64_metal_sterling_id,
                    'options', jsonb_build_object(
                        listing_64_metal_sterling_id, jsonb_build_object('name', 'Sterling Silver', 'order', 0, 'priceCents', listing_64_sterling_price_cents, 'imageUuids', to_jsonb(listing_64_sterling_image_uuids)),
                        listing_64_metal_bronze_id, jsonb_build_object('name', 'Bronze', 'order', 1, 'priceCents', listing_64_bronze_price_cents, 'imageUuids', to_jsonb(listing_64_bronze_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_64_metal_variation_id || ':' || listing_64_metal_sterling_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_64_metal_variation_id || ':' || listing_64_metal_bronze_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_65_id, listing_65_short_id, listing_65_shop_id, listing_65_category_id, listing_65_title, listing_65_subtitle, listing_65_full_descr, listing_65_price_cents, NULL, NULL, listing_65_image_uuids, NULL,
            jsonb_build_object(
                listing_65_metal_variation_id, jsonb_build_object(
                    'name', 'Metal',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_65_metal_sterling_id,
                    'options', jsonb_build_object(
                        listing_65_metal_sterling_id, jsonb_build_object('name', 'Sterling Silver', 'order', 0, 'priceCents', listing_65_sterling_price_cents, 'imageUuids', to_jsonb(listing_65_sterling_image_uuids)),
                        listing_65_metal_bronze_id, jsonb_build_object('name', 'Bronze', 'order', 1, 'priceCents', listing_65_bronze_price_cents, 'imageUuids', to_jsonb(listing_65_bronze_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_65_metal_variation_id || ':' || listing_65_metal_sterling_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_65_metal_variation_id || ':' || listing_65_metal_bronze_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_66_id, listing_66_short_id, listing_66_shop_id, listing_66_category_id, listing_66_title, listing_66_subtitle, listing_66_full_descr, listing_66_price_cents, NULL, NULL, listing_66_image_uuids, NULL,
            jsonb_build_object(
                listing_66_metal_variation_id, jsonb_build_object(
                    'name', 'Metal',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_66_metal_sterling_id,
                    'options', jsonb_build_object(
                        listing_66_metal_sterling_id, jsonb_build_object('name', 'Sterling Silver', 'order', 0, 'priceCents', listing_66_sterling_price_cents, 'imageUuids', to_jsonb(listing_66_sterling_image_uuids)),
                        listing_66_metal_bronze_id, jsonb_build_object('name', 'Bronze', 'order', 1, 'priceCents', listing_66_bronze_price_cents, 'imageUuids', to_jsonb(listing_66_bronze_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_66_metal_variation_id || ':' || listing_66_metal_sterling_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_66_metal_variation_id || ':' || listing_66_metal_bronze_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_67_id, listing_67_short_id, listing_67_shop_id, listing_67_category_id, listing_67_title, listing_67_subtitle, listing_67_full_descr, listing_67_price_cents, NULL, NULL, listing_67_image_uuids, NULL,
            jsonb_build_object(
                listing_67_metal_variation_id, jsonb_build_object(
                    'name', 'Metal',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_67_metal_sterling_id,
                    'options', jsonb_build_object(
                        listing_67_metal_sterling_id, jsonb_build_object('name', 'Sterling Silver', 'order', 0, 'priceCents', listing_67_sterling_price_cents, 'imageUuids', to_jsonb(listing_67_sterling_image_uuids)),
                        listing_67_metal_bronze_id, jsonb_build_object('name', 'Bronze', 'order', 1, 'priceCents', listing_67_bronze_price_cents, 'imageUuids', to_jsonb(listing_67_bronze_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_67_metal_variation_id || ':' || listing_67_metal_sterling_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_67_metal_variation_id || ':' || listing_67_metal_bronze_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_68_id, listing_68_short_id, listing_68_shop_id, listing_68_category_id, listing_68_title, listing_68_subtitle, listing_68_full_descr, listing_68_price_cents, NULL, NULL, listing_68_image_uuids, NULL,
            jsonb_build_object(
                listing_68_metal_variation_id, jsonb_build_object(
                    'name', 'Metal',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_68_metal_sterling_id,
                    'options', jsonb_build_object(
                        listing_68_metal_sterling_id, jsonb_build_object('name', 'Sterling Silver', 'order', 0, 'priceCents', listing_68_sterling_price_cents, 'imageUuids', to_jsonb(listing_68_sterling_image_uuids)),
                        listing_68_metal_bronze_id, jsonb_build_object('name', 'Bronze', 'order', 1, 'priceCents', listing_68_bronze_price_cents, 'imageUuids', to_jsonb(listing_68_bronze_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_68_metal_variation_id || ':' || listing_68_metal_sterling_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_68_metal_variation_id || ':' || listing_68_metal_bronze_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_69_id, listing_69_short_id, listing_69_shop_id, listing_69_category_id, listing_69_title, listing_69_subtitle, listing_69_full_descr, listing_69_price_cents, NULL, NULL, listing_69_image_uuids, NULL,
            jsonb_build_object(
                listing_69_metal_variation_id, jsonb_build_object(
                    'name', 'Metal',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_69_metal_sterling_id,
                    'options', jsonb_build_object(
                        listing_69_metal_sterling_id, jsonb_build_object('name', 'Sterling Silver', 'order', 0, 'priceCents', listing_69_sterling_price_cents, 'imageUuids', to_jsonb(listing_69_sterling_image_uuids)),
                        listing_69_metal_bronze_id, jsonb_build_object('name', 'Bronze', 'order', 1, 'priceCents', listing_69_bronze_price_cents, 'imageUuids', to_jsonb(listing_69_bronze_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_69_metal_variation_id || ':' || listing_69_metal_sterling_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_69_metal_variation_id || ':' || listing_69_metal_bronze_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_70_id, listing_70_short_id, listing_70_shop_id, listing_70_category_id, listing_70_title, listing_70_subtitle, listing_70_full_descr, listing_70_price_cents, NULL, NULL, listing_70_image_uuids, NULL,
            jsonb_build_object(
                listing_70_metal_variation_id, jsonb_build_object(
                    'name', 'Metal',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_70_metal_sterling_id,
                    'options', jsonb_build_object(
                        listing_70_metal_sterling_id, jsonb_build_object('name', 'Sterling Silver', 'order', 0, 'priceCents', listing_70_sterling_price_cents, 'imageUuids', to_jsonb(listing_70_sterling_image_uuids)),
                        listing_70_metal_bronze_id, jsonb_build_object('name', 'Bronze', 'order', 1, 'priceCents', listing_70_bronze_price_cents, 'imageUuids', to_jsonb(listing_70_bronze_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_70_metal_variation_id || ':' || listing_70_metal_sterling_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_70_metal_variation_id || ':' || listing_70_metal_bronze_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_71_id, listing_71_short_id, listing_71_shop_id, listing_71_category_id, listing_71_title, listing_71_subtitle, listing_71_full_descr, listing_71_price_cents, NULL, NULL, listing_71_image_uuids, NULL,
            jsonb_build_object(
                listing_71_metal_variation_id, jsonb_build_object(
                    'name', 'Metal',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_71_metal_sterling_id,
                    'options', jsonb_build_object(
                        listing_71_metal_sterling_id, jsonb_build_object('name', 'Sterling Silver', 'order', 0, 'priceCents', listing_71_sterling_price_cents, 'imageUuids', to_jsonb(listing_71_sterling_image_uuids)),
                        listing_71_metal_bronze_id, jsonb_build_object('name', 'Bronze', 'order', 1, 'priceCents', listing_71_bronze_price_cents, 'imageUuids', to_jsonb(listing_71_bronze_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_71_metal_variation_id || ':' || listing_71_metal_sterling_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_71_metal_variation_id || ':' || listing_71_metal_bronze_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_72_id, listing_72_short_id, listing_72_shop_id, listing_72_category_id, listing_72_title, listing_72_subtitle, listing_72_full_descr, listing_72_price_cents, NULL, NULL, listing_72_image_uuids, NULL,
            jsonb_build_object(
                listing_72_metal_variation_id, jsonb_build_object(
                    'name', 'Metal',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_72_metal_sterling_id,
                    'options', jsonb_build_object(
                        listing_72_metal_sterling_id, jsonb_build_object('name', 'Sterling Silver', 'order', 0, 'priceCents', listing_72_sterling_price_cents, 'imageUuids', to_jsonb(listing_72_sterling_image_uuids)),
                        listing_72_metal_bronze_id, jsonb_build_object('name', 'Bronze', 'order', 1, 'priceCents', listing_72_bronze_price_cents, 'imageUuids', to_jsonb(listing_72_bronze_image_uuids))
                    )
                )
            ),
            jsonb_build_object(
                listing_72_metal_variation_id || ':' || listing_72_metal_sterling_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_72_metal_variation_id || ':' || listing_72_metal_bronze_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        combinations = EXCLUDED.combinations,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    PERFORM setval(pg_get_serial_sequence('listing', 'id'), COALESCE((SELECT MAX(id) FROM listing), 1));

END $$;
