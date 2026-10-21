DO $$

DECLARE
    shop_9_id INT := 9;
    shop_9_short_id VARCHAR := '4K64K';
    shop_9_title VARCHAR := 'Pyrrha';
    shop_9_profile_image_uuid VARCHAR := '20f00458-7f83-4324-a3b4-d7bd0e91e4ee';
    shop_9_location VARCHAR := 'Vancouver, BC';
    shop_9_classification VARCHAR := 'Talisman Jewelry';
    shop_9_country_code CHAR(2) := 'CA';
    shop_9_profile_rich_text TEXT := '<h1>Our Story</h1><p>Since 1995, Pyrrha has been creating meaningful jewelry to connect you to what matters most. Our symbolic talismans are lost-wax cast in 100% recycled precious metals in our zero-carbon Vancouver studio.</p><h1>Made With Meaning</h1><p>Each talisman is inspired by the wax seals once used to close and authenticate letters, carrying a symbol chosen to mark a moment, a belief, or a person.</p><h1>Made Responsibly</h1><p>As a certified B Corp and a member of the Responsible Jewellery Council, we believe truly sustainable jewelry considers how a piece is made as carefully as what it means.</p>';

    catalog_default_inventory CONSTANT INT := 5;
    catalog_default_track_inventory CONSTANT BOOLEAN := true;

    shop_10_id INT := 10;
    shop_10_short_id VARCHAR := '7K39K';
    shop_10_title VARCHAR := 'Studebaker Metals';
    shop_10_profile_image_uuid VARCHAR := '8c5e76b2-475b-40f2-ac71-a0cb95bafb17';
    shop_10_location VARCHAR := 'Pittsburgh, PA';
    shop_10_classification VARCHAR := 'Hand-Forged Metal Goods';
    shop_10_country_code CHAR(2) := 'US';
    shop_10_profile_rich_text TEXT := '<h1>Our Story</h1><p>Studebaker Metals was born in 2013, founded by traditionally trained metalsmith Michael Studebaker and fashion marketing and design professional Alyssa Catalano. It began with hand-forged metal cuff bracelets made in a basement, using tools that had already seen a lifetime of work.</p><h1>From Basement to Strip District</h1><p>A few big orders changed everything. The basement became a Wilkinsburg warehouse, the warehouse became a workshop in Braddock, and today our home is in Pittsburgh&rsquo;s historic Strip District, where visitors can watch our metalsmiths at work from the storefront.</p><h1>Built on Steel</h1><p>Our workshop is the former plumbing and carpentry shop of Crucible Steel&rsquo;s Park Works plant, built in 1903 and in continuous industrial use ever since. Pittsburgh&rsquo;s story has always been written in metal, and we are part of that tradition: anvils instead of blast furnaces, hand tools instead of assembly lines.</p><h1>Hand-Forged to Last</h1><p>We employ tools spanning three centuries and source the purest materials to evoke a quality typical of days past. Every piece is hand-forged on a made-to-order basis, and some orders may take up to four weeks to complete.</p>';

    shop_11_id INT := 11;
    shop_11_short_id VARCHAR := 'JKD75';
    shop_11_title VARCHAR := 'Michael Michaud Jewelry';
    shop_11_profile_image_uuid VARCHAR := '714743f9-dfe3-4a77-a590-af5f3f164bbb';
    shop_11_location VARCHAR := 'Fairfield, CT';
    shop_11_classification VARCHAR := 'Botanical Jewelry';
    shop_11_country_code CHAR(2) := 'US';
    shop_11_profile_rich_text TEXT := '<h1>Our Story</h1><p>Michael Michaud trained at the Rochester Institute of Technology&rsquo;s school for American craftsmen, where he became a master of mold-making. After years working under jewelry designers around New York City, he found himself working in the city&rsquo;s flower district while living in the Connecticut countryside. His love of the natural world met his passion for jewelry, and in 1991 Michael Michaud Jewelry was born.</p><h1>Cast From Nature</h1><p>Where traditional lost-wax casting starts with a carved wax model, Michael uses a real leaf, branch, or flower. A mold is formed around the botanical, and as it is heated the plant burns away, leaving a beautifully detailed impression of itself. The result is jewelry that stays true to nature, down to the veins of a leaf.</p><h1>Bronze, Pearls, and Stone</h1><p>Each piece is cast in bronze with a soft patina and accented with pearls, beads, coral, and stones. The Silver Seasons collection is handcrafted in New York.</p><h1>In Museums and Collections</h1><p>Michael Michaud Jewelry is carried by museums, galleries, and specialty retailers around the world, and many collections have been commissioned by leading museums, including the Victoria &amp; Albert Museum, the Art Institute of Chicago, the National Gallery of Art, and the Ch&acirc;teau de Versailles.</p>';

    shop_12_id INT := 12;
    shop_12_short_id VARCHAR := 'K93EK';
    shop_12_title VARCHAR := 'Hugo Kohl';
    shop_12_profile_image_uuid VARCHAR := 'f8ed52a5-ae32-4f5e-8d06-108e092ae143';
    shop_12_location VARCHAR := 'Harrisonburg, VA';
    shop_12_classification VARCHAR := 'Historic American Jewelry';
    shop_12_country_code CHAR(2) := 'US';
    shop_12_profile_rich_text TEXT := '<h1>Our Story</h1><p>In the early 1990s, goldsmith Hugo Kohl was hunting for used casting equipment in a Providence, Rhode Island warehouse when a box of scrap steel spilled from a dump truck. Inside were hubs: blocks of steel hand-engraved with jewelry designs, some dating back to the 1800s. He chased the truck down, bought what he could, and spent the next year learning exactly what he had found.</p><h1>The Hub Vault</h1><p>Hubs were the molds of the die-struck jewelry industry, an actual-size, three-dimensional rendering of the finished piece. Hugo kept collecting them, along with the dies, rolls, and machines left behind as Providence&rsquo;s factories closed, and his Hub Vault now holds thousands of designs spanning the Georgian, Victorian, Edwardian, Art Nouveau, Art Deco, and Retro periods.</p><h1>Made the Old Way</h1><p>In his Harrisonburg, Virginia workshop, Hugo and a team of skilled craftspeople combine traditional die-striking and hand finishing with modern techniques to bring those historic designs back as authentic vintage replication jewelry, from running scrolls to the Three Graces. Pieces are made with ethically sourced, conflict-free silver, gold, and platinum.</p><h1>Visit the Workshop</h1><p>The boutique and workshop sit together in the Ice House in downtown Harrisonburg, alongside a museum of American jewelry design and manufacturing, so visitors can see the tools and the vault as well as the finished work.</p>';

    shop_13_id INT := 13;
    shop_13_short_id VARCHAR := '5GDDK';
    shop_13_title VARCHAR := 'Kala Sundials';
    shop_13_profile_image_uuid VARCHAR := '1e21d4e2-9140-4f27-84d1-bb64ae429e28';
    shop_13_location VARCHAR := 'Graz, Austria';
    shop_13_classification VARCHAR := 'Sundials';
    shop_13_country_code CHAR(2) := 'AT';
    shop_13_profile_rich_text TEXT := '<h1>Our Story</h1><p>Kala Sundials is a family workshop just outside Graz, Austria, founded by watchmaker Michael Kala and now in its third generation of hand-finishing precision sundials and nocturnals in solid brass and steel, for over 25 years.</p><h1>Ancient Design, Modern Precision</h1><p>Each instrument is a faithful study of the Universal Equinoctial Ring Sundial, a design used by sailors and mathematicians for centuries and now on permanent display at the Royal Observatory in Greenwich. We rework the historic form to modern tolerances so it keeps true solar time to within 10 minutes, anywhere in the world, using nothing but the sun.</p><h1>More Than a Clock</h1><p>Once its center dial is set to the date, the sundial doubles as a precise compass and a small model of the Earth, since its bridge sits parallel to the planet''s axis and points true north. Every sundial weighs just 40 grams and measures 60mm across, the same size as a classic pocket watch, small enough to wear as a pendant or carry in a pocket.</p><h1>Handmade, Start to Finish</h1><p>The pieces are still cut, pressed, and inked on machines Michael built himself, then assembled, checked, and packaged by hand in the same small workshop where the family started, with every third unit fully disassembled for quality control. Each sundial ships with a detailed instruction booklet and gift packaging, ready to give as a keepsake.</p><h1>The Nocturnal</h1><p>In 2022, customer requests led the family to add a Nocturnal to the lineup, a companion star dial that tells the time at night using the fixed stars, for the Northern and Southern Hemispheres alike.</p>';

    listing_73_id INT := 73;
    listing_73_short_id VARCHAR := 'K943G';
    listing_73_shop_id INT := shop_10_id;
    listing_73_category_id VARCHAR := 'BRACELETS';
    listing_73_country_code CHAR(2) := shop_10_country_code;
    listing_73_title VARCHAR := 'Workshop Cuff';
    listing_73_subtitle VARCHAR := 'A hand-forged cuff with a wide flat face and tapered legs, shaped by hammer and anvil alone.';
    listing_73_price_cents INT := 7800;
    listing_73_image_uuids text[] := '{}';
    listing_73_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Direct forging of the Workshop Cuff relies solely on the hammer and anvil to manipulate the material, resulting in a robust and durable piece rich with handcrafted character.</p><ul><li>Best seller</li><li>Hand-forged, wider flat face with tapered legs</li><li>Outside hallmark: crossed hammers</li><li>Inside hallmarks: &quot;Studebaker&quot; &amp; &quot;PGH USA&quot;</li><li>Studebaker Metals lifetime guarantee</li></ul>"
        },
        {
            "title": "Materials & Finishes",
            "richText": "<ul><li>Made of brass, copper, or stainless steel</li><li>Choose between work patina or high polish finish</li></ul>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Lightweight: 4 mm at widest, 2.3 mm at thickest</li><li>Standard Weight: 6 mm at widest, 3.5 mm at thickest</li><li>Heavyweight: 8 mm at widest, 5 mm at thickest</li></ul>"
        },
        {
            "title": "Sizing",
            "richText": "<p>Unisex sizing; please reference the size chart carefully. The model is wearing a size large in work patina.</p>"
        }
    ]';
    listing_73_material_variation_id CONSTANT VARCHAR := '5d484282-fcb7-412f-937c-6a7ee513f52b';
    listing_73_weight_variation_id CONSTANT VARCHAR := 'db8aea17-1f6e-4c67-89c7-b16d2ac3c628';
    listing_73_size_variation_id CONSTANT VARCHAR := 'f6173836-ce43-4ae0-8564-821cf901961b';
    listing_73_material_brass_wp_id CONSTANT VARCHAR := 'b921954a-f694-4ca7-be9e-4bbbe460519c';
    listing_73_material_copper_wp_id CONSTANT VARCHAR := '1f0bbbf4-4937-45da-8370-1891b3dbcb10';
    listing_73_material_steel_wp_id CONSTANT VARCHAR := '7ac8abf5-7be6-47b6-8dec-2bea7b9be800';
    listing_73_material_brass_pol_id CONSTANT VARCHAR := '7f4c63b2-d60c-4489-9bd7-73ef9c809811';
    listing_73_material_copper_pol_id CONSTANT VARCHAR := '25dbe24f-92f9-4471-becf-3f0a4fad665d';
    listing_73_material_steel_pol_id CONSTANT VARCHAR := '6a1ad2f4-38ee-49a4-a052-5d64f09701fc';
    listing_73_weight_light_id CONSTANT VARCHAR := 'd8e1ed5d-8ba8-4b69-ab1b-afe671bb60d7';
    listing_73_weight_standard_id CONSTANT VARCHAR := '1a5782fb-ebd4-49b8-8db5-6f210241b297';
    listing_73_weight_heavy_id CONSTANT VARCHAR := 'ad2934f2-378a-4260-981c-8786f841e1a0';
    listing_73_size_small_id CONSTANT VARCHAR := '773f4636-b272-4424-905e-740a3c22c4c6';
    listing_73_size_medium_id CONSTANT VARCHAR := '3d3bc31b-043f-4f54-aa9d-dc6d56a222ca';
    listing_73_size_large_id CONSTANT VARCHAR := '30d7f77b-6651-4169-b3e7-3a5ff010b446';
    listing_73_size_xl_id CONSTANT VARCHAR := '83285589-5686-4257-95a1-c6bb10b935d1';
    listing_73_size_xxl_id CONSTANT VARCHAR := '7a0d243e-a62d-4ddc-a21f-a84452998460';
    listing_73_brass_pol_standard_image_uuid CONSTANT VARCHAR := '1752529b-e120-42a0-9870-440601331e5c';
    listing_73_brass_wp_standard_image_uuid CONSTANT VARCHAR := 'bd322849-c7af-476e-99b9-95c7281f9b1a';
    listing_73_copper_wp_standard_image_uuid CONSTANT VARCHAR := 'caa2420f-ac21-4611-8d4f-8f63b215135b';
    listing_73_copper_pol_standard_image_uuid CONSTANT VARCHAR := 'd7b80716-5aca-41be-9570-dad845cc040c';
    listing_73_brass_wp_light_image_uuid CONSTANT VARCHAR := 'a69d2e10-3563-4f43-8620-43adb2c4e757';
    listing_73_copper_wp_light_image_uuid CONSTANT VARCHAR := 'cdb3c090-5e85-43e4-b302-18a33be788ee';
    listing_73_brass_pol_light_image_uuid CONSTANT VARCHAR := '27e97cfb-0f70-4f89-b6fe-24f118264d8f';
    listing_73_copper_pol_light_image_uuid CONSTANT VARCHAR := '468e3b45-8f0c-421e-8377-c08e88416c5c';
    listing_73_steel_pol_light_image_uuid CONSTANT VARCHAR := '36fbff57-3961-41e5-9010-ed5ef5f2cd0a';
    listing_73_steel_wp_light_image_uuid CONSTANT VARCHAR := 'dca58a83-7259-4871-a402-983712fdfb04';
    listing_73_brass_wp_heavy_image_uuid CONSTANT VARCHAR := 'bfa97350-e633-4ddf-9f4f-dda0ef6f045a';
    listing_73_copper_wp_heavy_image_uuid CONSTANT VARCHAR := 'dff6584b-500e-4c06-86de-d16466a7f3a9';
    listing_73_brass_pol_heavy_image_uuid CONSTANT VARCHAR := '7062b532-34ad-4544-8d93-da7f289a5838';
    listing_73_copper_pol_heavy_image_uuid CONSTANT VARCHAR := 'e7f755da-7853-400b-8ddd-9f01c2e86686';
    listing_73_steel_wp_standard_image_uuid CONSTANT VARCHAR := '98cfb825-b8ea-414d-a16e-e79b082f6696';
    listing_73_steel_pol_standard_image_uuid CONSTANT VARCHAR := 'f68c60a4-ec0f-4001-9916-1c974e31e251';
    listing_73_brass_wp_option_image_uuids CONSTANT text[] := '{"208b9418-a3e8-47bf-9b09-58903a446d12"}';
    listing_73_combinations JSONB;
    listing_73_variation_images JSONB;

    listing_74_id INT := 74;
    listing_74_short_id VARCHAR := 'G53JG';
    listing_74_shop_id INT := shop_10_id;
    listing_74_category_id VARCHAR := 'BRACELETS';
    listing_74_country_code CHAR(2) := shop_10_country_code;
    listing_74_title VARCHAR := 'Thompson Cuff';
    listing_74_subtitle VARCHAR := 'A simple, low-profile cuff that keeps the tool marks of the hands that forged it.';
    listing_74_price_cents INT := 9800;
    listing_74_image_uuids text[] := '{}';
    listing_74_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Simple and minimal by nature, the Thompson Cuff features tool marks and evidence of the process in celebration of the skilled hands and timeless techniques that bring them to life.</p><ul><li>Hand-forged, low profile, heavyweight cuff</li><li>Outside hallmark: crossed hammers</li><li>Inside hallmarks: &quot;Studebaker&quot; &amp; &quot;PGH USA&quot;</li><li>Studebaker Metals lifetime guarantee</li></ul>"
        },
        {
            "title": "Materials & Finishes",
            "richText": "<ul><li>Made of brass, copper, or stainless steel</li><li>Available in work patina or brushed finish</li></ul>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>9 mm wide, 3 mm thick</li></ul>"
        },
        {
            "title": "Sizing",
            "richText": "<p>Unisex sizing; please reference the size chart carefully.</p>"
        }
    ]';
    listing_74_material_variation_id CONSTANT VARCHAR := '4bc648da-3f85-4e03-b28d-f7b8de45e226';
    listing_74_size_variation_id CONSTANT VARCHAR := '5501a971-6aa5-44a6-a204-7cd67ef13450';
    listing_74_material_brass_wp_id CONSTANT VARCHAR := '38819a7d-f268-47b7-a3a0-94fcc03c513c';
    listing_74_brass_wp_image_uuids CONSTANT text[] := '{"d7f33719-11f1-41e3-9c1d-a3b2c07a847e"}';
    listing_74_material_brass_brushed_id CONSTANT VARCHAR := '215fc010-d910-4bdd-9db1-135d5cebd09f';
    listing_74_brass_brushed_image_uuids CONSTANT text[] := '{"56f9541d-7d7e-46a3-a78e-bf0de36cb86c", "431d8999-c142-4999-80fb-94d30bb77876"}';
    listing_74_material_copper_wp_id CONSTANT VARCHAR := '6b4e6f8e-13e7-42bd-ad11-3fe08ecd82b8';
    listing_74_copper_wp_image_uuids CONSTANT text[] := '{"1473fdf1-08e1-4ba7-9b27-ee66b6739d52"}';
    listing_74_material_copper_brushed_id CONSTANT VARCHAR := '258144b1-c290-46e1-9d2b-8fa67e89b7ef';
    listing_74_copper_brushed_image_uuids CONSTANT text[] := '{"70113311-dcfd-4502-9267-ed0d4b6e1bb3"}';
    listing_74_material_steel_wp_id CONSTANT VARCHAR := '95d7e30e-bd26-4061-9189-43853169d7a4';
    listing_74_steel_wp_image_uuids CONSTANT text[] := '{"2decf47c-a9cb-40f4-ae14-5459a11890ec", "581e2df1-d265-4e7f-940c-da0ed4b8323f"}';
    listing_74_material_steel_brushed_id CONSTANT VARCHAR := '5bfa8aab-568d-4860-8321-fa810ca81b6b';
    listing_74_steel_brushed_image_uuids CONSTANT text[] := '{"45b061e7-27ae-4e72-ba16-fd19b58c2991", "9095291d-0d92-40b0-95e9-b3ff07ed240a"}';
    listing_74_size_small_id CONSTANT VARCHAR := '678adf27-9e51-496c-ad3b-bf32914e6a9c';
    listing_74_size_medium_id CONSTANT VARCHAR := 'b490f7cd-c374-4a71-986e-8a0398c05bd4';
    listing_74_size_large_id CONSTANT VARCHAR := 'cba3c42d-238c-49f2-94ea-4c97152e754a';
    listing_74_size_xl_id CONSTANT VARCHAR := 'bd17223d-6033-4ef2-a140-4beba6113c14';
    listing_74_combinations JSONB;

    listing_75_id INT := 75;
    listing_75_short_id VARCHAR := 'G2JDG';
    listing_75_shop_id INT := shop_10_id;
    listing_75_category_id VARCHAR := 'BRACELETS';
    listing_75_country_code CHAR(2) := shop_10_country_code;
    listing_75_title VARCHAR := 'Studebaker Cuff';
    listing_75_subtitle VARCHAR := 'A hand-forged cuff with a spiraled silhouette, shaped by hammer and anvil alone.';
    listing_75_price_cents INT := 7800;
    listing_75_image_uuids text[] := '{}';
    listing_75_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Direct forging of the Studebaker Cuff relies solely on the hammer and anvil to manipulate the material, resulting in a robust and durable piece rich with handcrafted character.</p><ul><li>Hand-forged, spiraled silhouette</li><li>Outside hallmark: crossed hammers</li><li>Inside hallmarks: &quot;Studebaker&quot; &amp; &quot;PGH USA&quot;</li><li>Studebaker Metals lifetime guarantee</li></ul>"
        },
        {
            "title": "Materials & Finishes",
            "richText": "<ul><li>Made of brass, copper, or stainless steel</li><li>Choose between work patina or high polish finish</li></ul>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Lightweight: 3 mm wide, 3 mm thick</li><li>Standard Weight: 4.5 mm wide, 4.5 mm thick</li></ul>"
        },
        {
            "title": "Sizing",
            "richText": "<p>Unisex sizing; please reference the size chart carefully. The model is wearing a size large in brass with a work patina finish.</p>"
        }
    ]';
    listing_75_material_variation_id CONSTANT VARCHAR := 'addd280c-8993-4d62-b801-e91d1474c5af';
    listing_75_weight_variation_id CONSTANT VARCHAR := 'd54a8ea1-726c-4785-a018-c74476ab2cb8';
    listing_75_size_variation_id CONSTANT VARCHAR := 'dc02d32f-fdf3-4044-a8d9-ce58a2d1e24a';
    listing_75_material_brass_wp_id CONSTANT VARCHAR := '202a534e-616f-498a-b2b4-8fb910907136';
    listing_75_brass_wp_option_image_uuids CONSTANT text[] := '{"05488b39-0c22-4bbe-9571-ac8bcbe320c8"}';
    listing_75_material_brass_pol_id CONSTANT VARCHAR := 'e49f650c-fa2d-4dc8-bee4-8e04599e320e';
    listing_75_brass_pol_option_image_uuids CONSTANT text[] := '{"40eb4dd1-b636-4840-9235-450d2d559995"}';
    listing_75_material_copper_wp_id CONSTANT VARCHAR := '9ecfc29d-f461-4612-8154-0b80c7c677fe';
    listing_75_material_copper_pol_id CONSTANT VARCHAR := 'ed94c97e-234c-49ab-a2bb-7bec26d519a6';
    listing_75_material_steel_wp_id CONSTANT VARCHAR := '45fdab3d-1dc1-43f3-a0cf-1d4edf5a3c37';
    listing_75_material_steel_pol_id CONSTANT VARCHAR := '30070a25-cd45-4fde-bb11-4b897d5f759d';
    listing_75_steel_pol_option_image_uuids CONSTANT text[] := '{"4eb1f61c-3c58-4843-b9a6-f4c36ce290da"}';
    listing_75_weight_light_id CONSTANT VARCHAR := 'aaadef14-06de-4382-abf5-600602fb85a1';
    listing_75_weight_standard_id CONSTANT VARCHAR := '4d956311-af12-4695-8a1c-5af3fbe03e90';
    listing_75_size_small_id CONSTANT VARCHAR := '672cc609-4058-4600-a54b-53e9a44883cc';
    listing_75_size_medium_id CONSTANT VARCHAR := '46892ec2-bd33-4851-8c3f-90a932a4b06f';
    listing_75_size_large_id CONSTANT VARCHAR := '55958bfb-28d9-4c66-a4a3-f32e01b444e9';
    listing_75_size_xl_id CONSTANT VARCHAR := '4251458a-0983-4a7a-8917-68afd8dff85d';
    listing_75_brass_wp_standard_image_uuid CONSTANT VARCHAR := 'e3f541aa-84ac-4321-b2fa-f9f2184a0150';
    listing_75_copper_wp_standard_image_uuid CONSTANT VARCHAR := '8ab355d1-4284-42e0-9efb-c4d447dfcc14';
    listing_75_brass_pol_standard_image_uuid CONSTANT VARCHAR := '721884f3-fa11-4b8f-9021-bf929b0a0abf';
    listing_75_copper_pol_standard_image_uuid CONSTANT VARCHAR := 'faa4a51e-8b95-40c0-b46f-ebb2727570f4';
    listing_75_brass_wp_light_image_uuid CONSTANT VARCHAR := '9f743430-e73e-4108-9039-849e42263eb7';
    listing_75_copper_wp_light_image_uuid CONSTANT VARCHAR := 'd0e57e78-1197-4abc-905d-3f37ecfd9179';
    listing_75_brass_pol_light_image_uuid CONSTANT VARCHAR := '587586b6-328a-443e-abb9-7a0ec28c608c';
    listing_75_copper_pol_light_image_uuid CONSTANT VARCHAR := 'acb1bed9-5de3-469a-9218-1cd09a272565';
    listing_75_steel_pol_light_image_uuid CONSTANT VARCHAR := '6c3630e0-4fb3-40c2-8ef3-c26408fd7b78';
    listing_75_steel_wp_light_image_uuid CONSTANT VARCHAR := '8efcdca9-7a90-47ed-bdd1-887275290338';
    listing_75_combinations JSONB;
    listing_75_variation_images JSONB;

    listing_76_id INT := 76;
    listing_76_short_id VARCHAR := 'G736G';
    listing_76_shop_id INT := shop_10_id;
    listing_76_category_id VARCHAR := 'BRACELETS';
    listing_76_country_code CHAR(2) := shop_10_country_code;
    listing_76_title VARCHAR := 'Classic Cuff';
    listing_76_subtitle VARCHAR := 'A hand-forged cuff with a classic straight body, shaped by hammer and anvil alone.';
    listing_76_price_cents INT := 7800;
    listing_76_image_uuids text[] := '{}';
    listing_76_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Direct forging of the Classic Cuff relies solely on the hammer and anvil to manipulate the material, resulting in a robust and durable piece rich with handcrafted character.</p><ul><li>Hand-forged, classic straight body</li><li>Outside hallmark: crossed hammers</li><li>Inside hallmarks: &quot;Studebaker&quot; &amp; &quot;PGH USA&quot;</li><li>Studebaker Metals lifetime guarantee</li></ul>"
        },
        {
            "title": "Materials & Finishes",
            "richText": "<ul><li>Made of brass, copper, or stainless steel</li><li>Choose between work patina or high polish finish</li></ul>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Lightweight: 2.6 mm wide, 2.6 mm thick</li><li>Standard Weight: 4 mm wide, 4 mm thick</li><li>Heavyweight: 5.5 mm wide, 5.5 mm thick</li></ul>"
        },
        {
            "title": "Sizing",
            "richText": "<p>Unisex sizing; please reference the size chart carefully. The model is wearing a size large in brass with a work patina finish.</p>"
        }
    ]';
    listing_76_material_variation_id CONSTANT VARCHAR := '27d7cd5c-57ab-4da8-8629-5aedf79cc54f';
    listing_76_weight_variation_id CONSTANT VARCHAR := '6d17bbe3-fecd-40ee-93fa-c18a5fbaf4b3';
    listing_76_size_variation_id CONSTANT VARCHAR := 'd2e21d66-c32d-4f1f-8f21-e24b31dc89b8';
    listing_76_material_brass_wp_id CONSTANT VARCHAR := '9df09141-a3c0-46e5-af39-6a583d27a9a1';
    listing_76_brass_wp_option_image_uuids CONSTANT text[] := '{"0bbb74e4-3451-491e-896e-8e2ce64024c5", "44c5a98c-f96e-46cb-8b12-62fc1fb59a7c"}';
    listing_76_material_brass_pol_id CONSTANT VARCHAR := 'fb10e61a-408f-4bac-a9f2-d06df5ec01d0';
    listing_76_material_copper_wp_id CONSTANT VARCHAR := 'abbafe6c-d63c-4dd5-9b81-4d5fbdd7e329';
    listing_76_material_copper_pol_id CONSTANT VARCHAR := 'e394288a-a84f-4fad-9b9b-7a6763366853';
    listing_76_material_steel_wp_id CONSTANT VARCHAR := 'dd64f260-4b84-49a1-b710-27ebe3ba0323';
    listing_76_steel_wp_option_image_uuids CONSTANT text[] := '{"d8b014fd-73e6-4d66-973a-5c25a471df66", "cc69ee6e-71e9-447b-a521-f9f6f61b9869"}';
    listing_76_material_steel_pol_id CONSTANT VARCHAR := '2bb032b0-9f51-48ef-b3da-2c7fcfcda13c';
    listing_76_steel_pol_option_image_uuids CONSTANT text[] := '{"d9695600-4d85-42ee-8150-7e1ef08604ae", "7ba61aad-85f3-420d-977c-7e941a6d7ce7"}';
    listing_76_weight_light_id CONSTANT VARCHAR := '7eb9c5be-2874-4978-8eeb-61de88e06c7f';
    listing_76_weight_standard_id CONSTANT VARCHAR := '8ebf71b9-9abe-4b84-8d38-18591287e739';
    listing_76_weight_heavy_id CONSTANT VARCHAR := '4f47fe63-e742-4d33-aa29-faefea9451a6';
    listing_76_size_small_id CONSTANT VARCHAR := '30a97dd6-57ac-425c-80bd-5478dcba5324';
    listing_76_size_medium_id CONSTANT VARCHAR := '360c03cc-c1dc-4168-bcd3-07c80700fadb';
    listing_76_size_large_id CONSTANT VARCHAR := 'b817a938-cf89-4469-9ae3-6f8abb0384a9';
    listing_76_size_xl_id CONSTANT VARCHAR := 'ae076e5a-0c21-482c-bf29-696decf6ca07';
    listing_76_brass_wp_standard_image_uuid CONSTANT VARCHAR := '9bec461a-c824-4cc0-95c9-5777349f2bd4';
    listing_76_copper_wp_standard_image_uuid CONSTANT VARCHAR := 'd55a2c51-6340-4511-8fec-428bd11ba89c';
    listing_76_brass_pol_standard_image_uuid CONSTANT VARCHAR := '8c3ef817-22bd-4f60-9a42-02adde463df4';
    listing_76_copper_pol_standard_image_uuid CONSTANT VARCHAR := 'ac12be41-cd0c-4030-823f-debf2cab7702';
    listing_76_steel_wp_standard_image_uuid CONSTANT VARCHAR := 'cdc0ebdd-35a3-49ed-a3c5-71c289563dd3';
    listing_76_steel_pol_standard_image_uuid CONSTANT VARCHAR := 'a670c765-be2f-48c1-a280-e10dc5e5e52b';
    listing_76_copper_pol_light_image_uuid CONSTANT VARCHAR := '2d04601e-eae5-40dd-bf67-ced6a3929f30';
    listing_76_brass_pol_light_image_uuid CONSTANT VARCHAR := 'ac9f107f-dab0-4289-8215-4ac1d15ba1ae';
    listing_76_copper_wp_light_image_uuid CONSTANT VARCHAR := '9f81dbda-3afc-4037-bc48-d1c42b777e90';
    listing_76_brass_wp_light_image_uuid CONSTANT VARCHAR := 'e08f3cbc-e351-455b-b8eb-024dda0eb107';
    listing_76_steel_pol_light_image_uuid CONSTANT VARCHAR := 'b3f1a4d5-8fd6-45e3-a2f3-f4dddc3b4c8e';
    listing_76_steel_wp_light_image_uuid CONSTANT VARCHAR := '9670dcbf-d6ec-4dc2-b260-27ba16ae7d4b';
    listing_76_copper_pol_heavy_image_uuid CONSTANT VARCHAR := '9052cea9-3cb6-4847-b363-22214c0ea1c1';
    listing_76_brass_pol_heavy_image_uuid CONSTANT VARCHAR := '69ce2938-2550-4045-9ea2-e4747e586b8b';
    listing_76_copper_wp_heavy_image_uuid CONSTANT VARCHAR := 'a66fb520-1d90-4f4e-bafc-dc0a0f81aa1f';
    listing_76_brass_wp_heavy_image_uuid CONSTANT VARCHAR := '9cf61895-1fe0-4838-b419-a417243f8a5c';
    listing_76_combinations JSONB;
    listing_76_variation_images JSONB;

    listing_77_id INT := 77;
    listing_77_short_id VARCHAR := 'GJDEG';
    listing_77_shop_id INT := shop_10_id;
    listing_77_category_id VARCHAR := 'BRACELETS';
    listing_77_country_code CHAR(2) := shop_10_country_code;
    listing_77_title VARCHAR := 'Signature Chain Bracelet';
    listing_77_subtitle VARCHAR := 'A heavy curb chain bracelet with a hand-formed closure, tuned one at a time.';
    listing_77_price_cents INT := 12800;
    listing_77_image_uuids text[] := '{}';
    listing_77_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>At the jeweler&rsquo;s bench, precision, care, and attention flow from the hands of the artisan directly into the Signature Bracelet, where our sleek and secure closures are masterfully tuned one at a time.</p><ul><li>Heavy curb chain with hand-formed closure</li><li>Outside hallmark: crossed hammers</li><li>Studebaker Metals lifetime guarantee</li></ul>"
        },
        {
            "title": "Materials",
            "richText": "<ul><li>Made of brass or copper</li><li>Choose between work patina or high polish finish</li></ul>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>9 mm wide</li></ul>"
        },
        {
            "title": "Sizing",
            "richText": "<p>Unisex sizing; please reference the size chart carefully. The model is wearing a size large in brass with a work patina finish.</p>"
        }
    ]';
    listing_77_material_variation_id CONSTANT VARCHAR := '3188d27f-c10b-42df-822c-1c0ee71e66ea';
    listing_77_size_variation_id CONSTANT VARCHAR := 'd13e20c0-aa61-4f69-a017-05e54e970d83';
    listing_77_material_brass_wp_id CONSTANT VARCHAR := '03dd0c13-6dff-4e98-92c2-10f2230ad715';
    listing_77_brass_wp_image_uuids CONSTANT text[] := '{"20428965-7fa3-4c88-8d1b-8089a06caa5e", "f27ed142-6bda-4fd5-ab68-13251a4725c5"}';
    listing_77_material_brass_pol_id CONSTANT VARCHAR := '5e7215f4-98f2-4a65-ace2-53c891e56e58';
    listing_77_brass_pol_image_uuids CONSTANT text[] := '{"309cad78-2db2-4fc6-8d6a-204b36946111", "656207ca-bab3-4183-a772-149f33d6342a"}';
    listing_77_material_copper_wp_id CONSTANT VARCHAR := 'e36215dd-03bd-4569-9ddd-dc2cb843e2f5';
    listing_77_copper_wp_image_uuids CONSTANT text[] := '{"5cdd4d41-8fc5-41c8-82ae-85be4684e79d"}';
    listing_77_material_copper_pol_id CONSTANT VARCHAR := '1c719d08-b74a-4239-b629-1daa1c1050e4';
    listing_77_copper_pol_image_uuids CONSTANT text[] := '{"c2648e34-32a0-41df-ba64-dd9f98fbce88"}';
    listing_77_size_small_id CONSTANT VARCHAR := 'df56fec4-bd1e-4f6f-871f-efbbe3bf7404';
    listing_77_size_medium_id CONSTANT VARCHAR := '0f566899-7c38-4825-a14b-09669fab6a6b';
    listing_77_size_large_id CONSTANT VARCHAR := '0a379ad4-a435-449c-b4ce-49d8fd30e602';
    listing_77_size_xl_id CONSTANT VARCHAR := '3a620c08-bdba-43c8-83a5-e5c7a84da033';
    listing_77_size_xxl_id CONSTANT VARCHAR := 'f4de0f43-ba76-4c2f-b42e-674628faf178';
    listing_77_combinations JSONB;

    listing_78_id INT := 78;
    listing_78_short_id VARCHAR := 'K833G';
    listing_78_shop_id INT := shop_10_id;
    listing_78_category_id VARCHAR := 'RINGS';
    listing_78_country_code CHAR(2) := shop_10_country_code;
    listing_78_title VARCHAR := 'Signet Ring';
    listing_78_subtitle VARCHAR := 'A hand-carved brass signet ring with a broad face and a tapered, hand-filed shank.';
    listing_78_price_cents INT := 10800;
    listing_78_image_uuids text[] := '{"ec0578cb-468f-4383-b15f-8330c552db60", "2d6db835-515b-494c-9c78-17aa1df0f917", "75db741d-f20b-4c23-884d-e60e9f7885b5"}';
    listing_78_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>The carved signet ring features a broad face supported by a tapered shank with countless file marks, a signature of the hand-hewn process that refines its final form.</p><ul><li>Features a distinct hand-filed texture</li><li>Hallmark: crossed hammers</li><li>Studebaker Metals lifetime guarantee</li></ul>"
        },
        {
            "title": "Materials & Finishes",
            "richText": "<ul><li>Made of brass</li><li>Choose between work patina or high polish finish</li></ul>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Brushed face measures approx. 11 mm x 15 mm (based on size 9, varies slightly with size)</li></ul>"
        },
        {
            "title": "Sizing",
            "richText": "<p>We recommend using a sizing kit if you are unsure of your size. If you fall outside the available size range, contact the shop. The model is wearing brass in work patina.</p>"
        }
    ]';
    listing_78_material_variation_id CONSTANT VARCHAR := '6c55acc3-a12e-49d7-9eac-fdad4957aa99';
    listing_78_size_variation_id CONSTANT VARCHAR := 'a3de95f2-645a-4c9f-9b8c-8371e8e3d2ca';
    listing_78_material_wp_id CONSTANT VARCHAR := '12547e88-8993-4ff9-8db7-0c2fb4e3c0d7';
    listing_78_wp_image_uuids CONSTANT text[] := '{"4cfa7c16-96b3-4662-a995-26049063f42f", "6479e8b2-cb8a-49cb-a2f6-aca65b0da34a", "31fbc03d-c22c-40a7-b9d8-d9d063fe6caf", "7c347e20-f47f-4cea-b162-7c1b8abacbf6"}';
    listing_78_material_pol_id CONSTANT VARCHAR := '56651e65-d9cb-4bc5-98e2-412c730aa6fd';
    listing_78_pol_image_uuids CONSTANT text[] := '{"55ac530d-1aa5-41d5-9088-cc77c3bd839d", "123044e6-1701-4a94-82f1-83f076cf385a"}';
    listing_78_size_3_id CONSTANT VARCHAR := 'bc7e90ba-7202-414e-8296-efd40f27cc58';
    listing_78_size_3_5_id CONSTANT VARCHAR := 'f50c23da-fd25-4c65-9be4-246fd35438e0';
    listing_78_size_4_id CONSTANT VARCHAR := 'cdf63cc2-f762-4e73-94bf-8b74eb577a6f';
    listing_78_size_4_5_id CONSTANT VARCHAR := 'e609d460-8755-4ab2-a2d4-020cf6e090a0';
    listing_78_size_5_id CONSTANT VARCHAR := 'e26099a9-bb18-45a0-a046-0d66e8d7fa2f';
    listing_78_size_5_5_id CONSTANT VARCHAR := '1a44f83d-4ec7-470c-9756-15a06846cdd7';
    listing_78_size_6_id CONSTANT VARCHAR := 'a5e08b1d-31a2-455e-a60a-c29b1cc48307';
    listing_78_size_6_5_id CONSTANT VARCHAR := 'aa153d78-87f8-4d50-b578-b1835a1fa967';
    listing_78_size_7_id CONSTANT VARCHAR := '07e6fab3-1e86-4fa4-878a-fc29b8dc943e';
    listing_78_size_7_5_id CONSTANT VARCHAR := '22f07811-60e0-4e38-9a57-37617c32fff8';
    listing_78_size_8_id CONSTANT VARCHAR := '236288e2-0525-4568-971a-8111e1b45b6b';
    listing_78_size_8_5_id CONSTANT VARCHAR := '0b31ce8a-610f-4e7a-98ab-e20585833d84';
    listing_78_size_9_id CONSTANT VARCHAR := '9162744a-caf8-4ba9-b803-e7e3643e0581';
    listing_78_size_9_5_id CONSTANT VARCHAR := 'e4e31a29-9a35-4129-b045-931b37c8c770';
    listing_78_size_10_id CONSTANT VARCHAR := 'ed57e29f-2aec-4db0-8099-50cceec8c26c';
    listing_78_size_10_5_id CONSTANT VARCHAR := '87c9d703-aee0-4f5e-87ee-3b29e134c524';
    listing_78_size_11_id CONSTANT VARCHAR := '14f7207c-f212-4fe8-8b86-c51c687182ae';
    listing_78_size_11_5_id CONSTANT VARCHAR := '1137054f-0299-4bbd-8bb5-ffba99e9d00a';
    listing_78_size_12_id CONSTANT VARCHAR := 'a893ff62-36af-4eea-8dff-e6e08ab31254';
    listing_78_size_12_5_id CONSTANT VARCHAR := 'b6d8fa15-1b2f-4272-9917-193c32a6d92f';
    listing_78_size_13_id CONSTANT VARCHAR := 'cc942bc7-e383-4aa3-833a-8536678bc4a1';
    listing_78_size_13_5_id CONSTANT VARCHAR := '2d7f50b7-1a2f-4fa9-9d77-9b7fbf3ace16';
    listing_78_combinations JSONB;

    listing_80_id INT := 80;
    listing_80_short_id VARCHAR := 'GE4LK';
    listing_80_shop_id INT := shop_10_id;
    listing_80_category_id VARCHAR := 'RINGS';
    listing_80_country_code CHAR(2) := shop_10_country_code;
    listing_80_title VARCHAR := 'Classic Band Ring';
    listing_80_subtitle VARCHAR := 'A hand-hammered sterling silver band with a matte brushed finish that preserves the tool marks.';
    listing_80_price_cents INT := 11800;
    listing_80_image_uuids text[] := '{"91dc8f86-02a3-468e-b480-6e3cdafe6e24", "c2839f32-7098-4e7e-96e6-cbab37c40529"}';
    listing_80_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>To achieve a perfect size, we gently stretch the Classic Band Ring by hammering around a mandrel with a flat-faced hammer, then gently brush the surface, preserving the tool marks as a beautiful record of the labor behind each ring.</p><ul><li>Hand-hammered, matte brushed finish</li><li>Hallmarks: crossed hammers and .925</li><li>Studebaker Metals lifetime guarantee</li></ul>"
        },
        {
            "title": "Materials & Finishes",
            "richText": "<ul><li>Made of solid sterling silver</li><li>Available exclusively in matte brushed finish</li></ul>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Available in 2 mm, 4 mm, and 6 mm widths</li></ul>"
        },
        {
            "title": "Sizing",
            "richText": "<p>We recommend using a sizing kit if you are unsure of your size. If you fall outside the available size range, contact the shop.</p>"
        }
    ]';
    listing_80_width_variation_id CONSTANT VARCHAR := '3feab7ba-b1fe-4402-9311-98e59ae45eda';
    listing_80_size_variation_id CONSTANT VARCHAR := 'f6a0ab84-0d51-4d27-a5ec-2167ff1ac541';
    listing_80_width_2mm_id CONSTANT VARCHAR := '02ba6832-7aa6-4d82-8e57-05a67d973ab9';
    listing_80_2mm_image_uuids CONSTANT text[] := '{"c81ac3a8-7642-4a28-92d7-fdfeeffe40c9"}';
    listing_80_width_4mm_id CONSTANT VARCHAR := '40cea16e-49c4-4912-9d41-2dca95130304';
    listing_80_4mm_image_uuids CONSTANT text[] := '{"dde912b2-8b45-40cb-8dd7-1820d9c9c680"}';
    listing_80_width_6mm_id CONSTANT VARCHAR := '607710d3-1807-4d20-a65b-f25612dcd901';
    listing_80_6mm_image_uuids CONSTANT text[] := '{"06fcfb51-e63b-46ae-b27b-bb16857fba7b"}';
    listing_80_size_4_id CONSTANT VARCHAR := '6680bc28-3414-4deb-b3b2-b741a24eec1c';
    listing_80_size_4_5_id CONSTANT VARCHAR := 'c8fbb337-bb1d-4435-833f-91a6036bbdbe';
    listing_80_size_5_id CONSTANT VARCHAR := 'f3a6661e-c0d3-4858-aa67-d96f25377814';
    listing_80_size_5_5_id CONSTANT VARCHAR := '80653d4e-a9db-4c5b-8c26-7fda3ee5e81f';
    listing_80_size_6_id CONSTANT VARCHAR := 'ad3d7f68-934e-40c0-b9e4-2d8016cbc96f';
    listing_80_size_6_5_id CONSTANT VARCHAR := '6efda6fd-cd58-484e-b3c9-d027355418c1';
    listing_80_size_7_id CONSTANT VARCHAR := 'f8745be5-e328-4d12-b20f-9aaf81dfde7e';
    listing_80_size_7_5_id CONSTANT VARCHAR := 'bbba4a38-cf88-47cf-8007-a12ee3aa52af';
    listing_80_size_8_id CONSTANT VARCHAR := 'd5b8731e-6a18-454a-b09d-0aee6ea11204';
    listing_80_size_8_5_id CONSTANT VARCHAR := '2332c289-1a79-48d8-87fb-686e9380a66f';
    listing_80_size_9_id CONSTANT VARCHAR := '04ed132c-3d7e-456f-8d91-e35650741978';
    listing_80_size_9_5_id CONSTANT VARCHAR := '6402ff35-9913-44a1-9fda-d1b439ba4d0e';
    listing_80_size_10_id CONSTANT VARCHAR := 'b147964f-75fe-49a6-8e08-99364dc390e5';
    listing_80_size_10_5_id CONSTANT VARCHAR := '9f1aea06-b513-4db2-92b2-186ade58579e';
    listing_80_size_11_id CONSTANT VARCHAR := 'a6ae243f-1141-4fe3-ba09-4e702674f6a6';
    listing_80_size_11_5_id CONSTANT VARCHAR := '0baf270e-30ad-4f5f-adfe-9f092e9c9338';
    listing_80_size_12_id CONSTANT VARCHAR := 'a5a1e848-ab8e-49aa-a93d-b94e8f6d40cf';
    listing_80_size_12_5_id CONSTANT VARCHAR := 'b9ab7e01-1360-4f51-95a1-e12c885f9c5f';
    listing_80_combinations JSONB;

    listing_79_id INT := 79;
    listing_79_short_id VARCHAR := 'GL95K';
    listing_79_shop_id INT := shop_10_id;
    listing_79_category_id VARCHAR := 'RINGS';
    listing_79_country_code CHAR(2) := shop_10_country_code;
    listing_79_title VARCHAR := 'Classic Cuff Ring';
    listing_79_subtitle VARCHAR := 'A hand-forged, ring-sized version of the Classic Cuff, in sterling silver, brass, or copper.';
    listing_79_price_cents INT := 5800;
    listing_79_image_uuids text[] := '{"c7c2bcd6-14a3-49ba-bb67-59ca0a23ce57", "3de4dcb1-c873-4441-adcf-cd468a3cf8f3"}';
    listing_79_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Direct forging relies solely on the hammer and anvil to manipulate the material, resulting in a robust and durable piece rich with handcrafted character.</p><ul><li>Hand-forged, ring-sized version of the Classic Cuff</li><li>Sterling silver hallmark: .925</li><li>Studebaker Metals lifetime guarantee</li></ul>"
        },
        {
            "title": "Materials & Finishes",
            "richText": "<ul><li>Made of brass, copper, or solid sterling silver</li><li>Available in work patina or polished finish</li></ul>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Band is 2 mm thick, 3 mm at widest</li></ul>"
        },
        {
            "title": "Sizing",
            "richText": "<p>We recommend using a sizing kit if you are unsure of your size. If you fall outside the available size range, contact the shop. The model is wearing sterling silver in work patina.</p>"
        }
    ]';
    listing_79_material_variation_id CONSTANT VARCHAR := '8a7a1ea4-e4c9-4105-9cb5-40af10a9b80d';
    listing_79_size_variation_id CONSTANT VARCHAR := 'e64d9cc1-4e4b-4a3e-91f7-5f7af2bf961e';
    listing_79_material_sterling_wp_id CONSTANT VARCHAR := '5beaceb4-2ef1-4b5b-838d-08143c34f5ab';
    listing_79_sterling_wp_image_uuids CONSTANT text[] := '{"d6678514-7f2b-4362-8d8e-114a4d3a5f1b", "d0f123d7-e5f9-44b9-84fd-ed31a48c1e98"}';
    listing_79_material_sterling_pol_id CONSTANT VARCHAR := '1da75103-f693-4be2-8a5f-7a2e2065078f';
    listing_79_sterling_pol_image_uuids CONSTANT text[] := '{"4bd72765-59de-4167-b34f-23d5cca2d48d"}';
    listing_79_material_brass_wp_id CONSTANT VARCHAR := '125aa53e-f394-4bd3-b951-27d76f7c5357';
    listing_79_brass_wp_image_uuids CONSTANT text[] := '{"29d5f5e0-2214-4f3d-8ebf-13f8fedc022d"}';
    listing_79_material_brass_pol_id CONSTANT VARCHAR := 'a7f56644-98d9-4e77-88b0-c36c477f9a38';
    listing_79_brass_pol_image_uuids CONSTANT text[] := '{"7e1b930f-f804-45d5-9a02-4a68756f788f"}';
    listing_79_material_copper_wp_id CONSTANT VARCHAR := '9f397c5e-275d-42b0-bf1e-7ac1fbe7b0ad';
    listing_79_copper_wp_image_uuids CONSTANT text[] := '{"25ca49e8-e609-4561-a6c4-cb4ddaae8892"}';
    listing_79_material_copper_pol_id CONSTANT VARCHAR := 'fc1861ad-4917-443a-8229-07f62ff81e60';
    listing_79_copper_pol_image_uuids CONSTANT text[] := '{"5613a5f4-59ae-4ee2-9246-15ba9d70fdc5"}';
    listing_79_size_4_id CONSTANT VARCHAR := '79831e05-cb64-488c-8732-545628de244d';
    listing_79_size_4_5_id CONSTANT VARCHAR := 'd4724938-a801-491b-a68c-e11dd85140e4';
    listing_79_size_5_id CONSTANT VARCHAR := 'd6052727-e62a-4b40-bd6c-2059e4bd62ff';
    listing_79_size_5_5_id CONSTANT VARCHAR := '4f2eff10-6adb-471b-a0b4-77d3823f7273';
    listing_79_size_6_id CONSTANT VARCHAR := '25acfdfd-ce90-4829-af6a-9413ccf60914';
    listing_79_size_6_5_id CONSTANT VARCHAR := '97c231af-01f0-4655-a6b1-2b2f43b3b8e3';
    listing_79_size_7_id CONSTANT VARCHAR := '4f13d60b-ff8b-4511-9d57-f66582770f16';
    listing_79_size_7_5_id CONSTANT VARCHAR := 'a5530548-bb50-4164-8747-d7a541a9d7f2';
    listing_79_size_8_id CONSTANT VARCHAR := 'ddbb09cc-8e83-4bed-b4c6-7927f7c5a83d';
    listing_79_size_8_5_id CONSTANT VARCHAR := 'df46c138-3ecd-44c2-a500-6aa616def2a6';
    listing_79_size_9_id CONSTANT VARCHAR := '201be078-7b29-405f-bf5b-38acc953fb70';
    listing_79_size_9_5_id CONSTANT VARCHAR := '02d8f117-a67b-42ff-a214-b009f7dc2db9';
    listing_79_size_10_id CONSTANT VARCHAR := '8d30af8f-9c9a-4166-8762-1b89d642250e';
    listing_79_size_10_5_id CONSTANT VARCHAR := '56e366ef-90d6-4e88-a978-992c19677599';
    listing_79_size_11_id CONSTANT VARCHAR := 'fd3c21a4-3f5e-49a4-a2ef-bda2d01e595c';
    listing_79_size_11_5_id CONSTANT VARCHAR := 'd91294c3-f225-42b2-9cd6-bf835caff8d0';
    listing_79_size_12_id CONSTANT VARCHAR := 'd6f25786-bf31-4bb9-964f-33bac6135cca';
    listing_79_size_12_5_id CONSTANT VARCHAR := 'c4f3630e-4791-4479-aaf2-78676bdcaa24';
    listing_79_combinations JSONB;

    listing_81_id INT := 81;
    listing_81_short_id VARCHAR := 'G635K';
    listing_81_shop_id INT := shop_10_id;
    listing_81_category_id VARCHAR := 'RINGS';
    listing_81_country_code CHAR(2) := shop_10_country_code;
    listing_81_title VARCHAR := 'Plait Ring';
    listing_81_subtitle VARCHAR := 'A braided twist ring that starts as a single length of wire, in brass or sterling silver.';
    listing_81_price_cents INT := 9800;
    listing_81_image_uuids text[] := '{"c14aafa4-0f43-408e-bab5-f8ca4959169f", "b244b0b8-e6b2-41f0-b99a-aa29f030b1ec"}';
    listing_81_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>The Plait Ring starts as a single length of wire. We fold it in thirds, then twist the metal before soldering and flattening in the rolling mill. This flattened twisted wire is used to make models for casting various sizes.</p><ul><li>Braided twist design</li><li>Hallmark: crossed hammers</li><li>Sterling silver hallmark: .925</li><li>Studebaker Metals lifetime guarantee</li></ul>"
        },
        {
            "title": "Materials & Finishes",
            "richText": "<ul><li>Made of brass or sterling silver</li><li>Available exclusively in work patina</li></ul>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>4 mm wide, 2 mm thick</li></ul>"
        },
        {
            "title": "Sizing",
            "richText": "<p>We recommend using a sizing kit if you are unsure of your size. If you fall outside the available size range, contact the shop. The model is wearing sterling silver.</p>"
        }
    ]';
    listing_81_material_variation_id CONSTANT VARCHAR := '31e67fa4-0522-494a-8fe7-ebe9b1fa5895';
    listing_81_size_variation_id CONSTANT VARCHAR := 'be01bd63-63e6-4233-8d95-754b70caf2d3';
    listing_81_material_brass_id CONSTANT VARCHAR := '42863a0f-5910-4463-89d3-72d3e3b1db21';
    listing_81_brass_image_uuids CONSTANT text[] := '{"13c86a3b-5535-43c8-b3c8-1d132cb30c6f"}';
    listing_81_material_sterling_id CONSTANT VARCHAR := '4f8012b7-5104-4bf2-98a2-e8b4a169663b';
    listing_81_sterling_image_uuids CONSTANT text[] := '{"e2c69c43-7c5b-41ac-830f-ff2f14b687a0"}';
    listing_81_size_3_id CONSTANT VARCHAR := 'ae88340e-083d-4995-bc42-d898fb9b262a';
    listing_81_size_3_5_id CONSTANT VARCHAR := '5ca2807f-0ff5-4658-a72f-d53fb4e68e85';
    listing_81_size_4_id CONSTANT VARCHAR := 'c9717e7d-0ea5-4052-9cde-41becf1a6ce1';
    listing_81_size_4_5_id CONSTANT VARCHAR := '9bdb0def-62ad-46b2-9b67-497cdce3f931';
    listing_81_size_5_id CONSTANT VARCHAR := 'f77ac64c-4716-4bac-82a2-93f94d3c3cf1';
    listing_81_size_5_5_id CONSTANT VARCHAR := 'aa7dbfb7-8a18-40bd-9456-76cfcf7621bf';
    listing_81_size_6_id CONSTANT VARCHAR := '9f94c23c-3567-4989-9663-095ae2ed38ff';
    listing_81_size_6_5_id CONSTANT VARCHAR := '6757f0d9-4cfa-45dd-9a1a-db8c03afd48a';
    listing_81_size_7_id CONSTANT VARCHAR := '787a9401-be2d-43ef-8950-4459d4216ac4';
    listing_81_size_7_5_id CONSTANT VARCHAR := '01a28c55-41a1-437e-ae46-c52cfa73aa55';
    listing_81_size_8_id CONSTANT VARCHAR := '728d94e0-bdda-4e40-b2a7-3af8b8666a74';
    listing_81_size_8_5_id CONSTANT VARCHAR := '51a7d16a-20ab-4f59-8319-56c6551a112d';
    listing_81_size_9_id CONSTANT VARCHAR := '9dc84688-1b2b-442d-911b-847d960e9ba5';
    listing_81_size_9_5_id CONSTANT VARCHAR := 'ed3dc2df-ed65-4b45-9614-7ff4173d2313';
    listing_81_size_10_id CONSTANT VARCHAR := 'c3c2b1ec-ff46-4787-8cad-38f23189128b';
    listing_81_size_10_5_id CONSTANT VARCHAR := 'f8aeda69-5392-4626-a709-3428cf69ec29';
    listing_81_size_11_id CONSTANT VARCHAR := '9132a64b-3f6c-49eb-9b10-aa2ab0ddc7ba';
    listing_81_size_11_5_id CONSTANT VARCHAR := '231625f3-dac0-46dd-a5fc-64c3db1b0c8d';
    listing_81_size_12_id CONSTANT VARCHAR := '27b68f07-b7e8-4335-9acf-ed9feb721e4b';
    listing_81_size_12_5_id CONSTANT VARCHAR := 'c3e2edf0-e525-471d-ab1f-1e88b7b7fb4a';
    listing_81_size_13_id CONSTANT VARCHAR := '2a4b63e9-b24f-42ae-b7c5-4a589cc50072';
    listing_81_size_13_5_id CONSTANT VARCHAR := '8d18b375-8e08-497c-956e-60ccdadb5051';
    listing_81_combinations JSONB;

    listing_82_id INT := 82;
    listing_82_short_id VARCHAR := 'G334G';
    listing_82_shop_id INT := shop_10_id;
    listing_82_category_id VARCHAR := 'NECKLACES';
    listing_82_country_code CHAR(2) := shop_10_country_code;
    listing_82_title VARCHAR := 'Signature Chain Necklace';
    listing_82_subtitle VARCHAR := 'A heavy curb chain necklace with a hand-formed closure, tuned one at a time.';
    listing_82_price_cents INT := 17800;
    listing_82_image_uuids text[] := '{"d38c771d-9ef0-4ce3-a3ef-87d85048a3ba"}';
    listing_82_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>At the jeweler&rsquo;s bench, precision, care, and attention flow from the hands of the artisan directly into the Signature Chain Necklace, where our sleek and secure closures are masterfully tuned one at a time.</p><ul><li>Heavy curb chain with hand-formed closure</li><li>Outside hallmark: crossed hammers</li><li>Studebaker Metals lifetime guarantee</li></ul>"
        },
        {
            "title": "Materials & Finishes",
            "richText": "<ul><li>Made of brass or pure copper</li><li>Copper pieces have a sterling silver clasp</li><li>Choose between work patina or high polish finish</li></ul>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>9 mm wide</li><li>Available in 16&quot;, 18&quot;, 20&quot;, and 22&quot; lengths</li></ul>"
        },
        {
            "title": "Sizing",
            "richText": "<p>The model is wearing the 16&quot; chain.</p>"
        }
    ]';
    listing_82_length_variation_id CONSTANT VARCHAR := '0a58edfd-38b4-47e6-9d74-05597cf9dd16';
    listing_82_material_variation_id CONSTANT VARCHAR := 'd922107c-2ae1-4612-8b9e-a0a29376ad49';
    listing_82_length_16_id CONSTANT VARCHAR := '5979bd27-d3d4-4a8c-9503-124f2e3c4bde';
    listing_82_length_18_id CONSTANT VARCHAR := 'f250f560-6fde-4623-bdc7-799656a44675';
    listing_82_length_20_id CONSTANT VARCHAR := '9479e9fd-254a-4c50-9336-645974998d16';
    listing_82_length_22_id CONSTANT VARCHAR := '24dd6028-5362-40ae-9df9-c4b09f33afb4';
    listing_82_material_brass_wp_id CONSTANT VARCHAR := '05d89e45-4cb5-4ab5-a36c-85f1baddb0b8';
    listing_82_brass_wp_image_uuids CONSTANT text[] := '{"0f6eacd1-7a4d-4361-957a-7a7ebd1dc537"}';
    listing_82_material_brass_pol_id CONSTANT VARCHAR := 'bebe667e-d894-4533-bf48-7b282fac2889';
    listing_82_brass_pol_image_uuids CONSTANT text[] := '{"332b73ff-1d06-4860-becb-8ac93b4cb72d"}';
    listing_82_material_copper_wp_id CONSTANT VARCHAR := 'e4e3dcc0-8d62-4083-b198-5be9aee19841';
    listing_82_copper_wp_image_uuids CONSTANT text[] := '{"408d1229-e832-4105-9478-8f53a061938a"}';
    listing_82_material_copper_pol_id CONSTANT VARCHAR := 'dea5cae8-a138-450e-98a4-283ee18154dd';
    listing_82_copper_pol_image_uuids CONSTANT text[] := '{"e6b0efca-8e3b-4714-bfc3-a03e74d671c7"}';
    listing_82_combinations JSONB;

    listing_83_id INT := 83;
    listing_83_short_id VARCHAR := 'GDJ7G';
    listing_83_shop_id INT := shop_10_id;
    listing_83_category_id VARCHAR := 'NECKLACES';
    listing_83_country_code CHAR(2) := shop_10_country_code;
    listing_83_title VARCHAR := 'Classic Chain Necklace';
    listing_83_subtitle VARCHAR := 'A lightweight curb chain necklace with a hand-formed closure, tuned one at a time.';
    listing_83_price_cents INT := 15800;
    listing_83_image_uuids text[] := '{"205a08ad-beda-405f-bf1c-b5367c35c8ec"}';
    listing_83_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>At the jeweler&rsquo;s bench, precision, care, and attention flow from the hands of the artisan directly into the Classic Chain Necklace, resulting in a piece where each closure is masterfully tuned one at a time.</p><ul><li>Lightweight curb chain with hand-formed closure</li><li>Outside hallmark: crossed hammers</li><li>Studebaker Metals lifetime guarantee</li></ul>"
        },
        {
            "title": "Materials & Finishes",
            "richText": "<ul><li>Made of brass, copper, or sterling silver</li><li>Available in work patina or high polish finish</li></ul>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>7 mm wide</li></ul>"
        },
        {
            "title": "Sizing",
            "richText": "<p>Unisex sizing; please reference the size chart carefully. The model is wearing the 20&quot; chain.</p>"
        }
    ]';
    listing_83_length_variation_id CONSTANT VARCHAR := '2dfa15ec-7e23-4c1f-927a-0a09a5d108ad';
    listing_83_material_variation_id CONSTANT VARCHAR := '6a81cf62-3293-4e6e-83ca-7dff7a5627bc';
    listing_83_length_16_id CONSTANT VARCHAR := '6c154106-9e9d-4226-8e40-c078f3dcb38d';
    listing_83_length_18_id CONSTANT VARCHAR := '1bc2b507-2ea6-4166-bbb6-9ae36eea80c7';
    listing_83_length_20_id CONSTANT VARCHAR := 'cf7a525e-bda8-4cc1-b42d-c4a6f3ca2211';
    listing_83_length_22_id CONSTANT VARCHAR := 'bb051892-6899-4ce3-b3f0-c1b944f4265f';
    listing_83_material_brass_wp_id CONSTANT VARCHAR := '172802ac-b451-4be9-9ac4-c34b47f40961';
    listing_83_brass_wp_image_uuids CONSTANT text[] := '{"689cdb8b-4f13-4a1d-a11d-d5e6ca6a5517", "e7004631-e2ea-4592-892a-859478b558ae"}';
    listing_83_material_brass_pol_id CONSTANT VARCHAR := '0b61c367-6897-4188-99d6-2879cd078336';
    listing_83_brass_pol_image_uuids CONSTANT text[] := '{"558b75f6-dfca-4b1f-b2d2-30fd6c432229"}';
    listing_83_material_copper_wp_id CONSTANT VARCHAR := 'f27e51c1-2955-4ef7-8abf-94a49cb50e6d';
    listing_83_copper_wp_image_uuids CONSTANT text[] := '{"f03b32e2-b4c0-4c2e-9c0c-f00e412c9d69"}';
    listing_83_material_copper_pol_id CONSTANT VARCHAR := '1b453cf6-be49-423b-91e0-9b0584866703';
    listing_83_copper_pol_image_uuids CONSTANT text[] := '{"c6cc9d6f-8605-4999-a673-5cf66acfba6e"}';
    listing_83_material_sterling_wp_id CONSTANT VARCHAR := '57346a9d-1df9-4aca-b0b0-ba1aeea61a08';
    listing_83_sterling_wp_image_uuids CONSTANT text[] := '{"ffe3b5e2-b74f-426a-9775-82780851e565"}';
    listing_83_material_sterling_pol_id CONSTANT VARCHAR := '9b1af90d-811d-4d7d-beaa-2e6bff8454d4';
    listing_83_sterling_pol_image_uuids CONSTANT text[] := '{"90ae810c-9cc4-429d-ba04-9526d0368f82"}';
    listing_83_combinations JSONB;

    listing_84_id INT := 84;
    listing_84_short_id VARCHAR := 'K4ELG';
    listing_84_shop_id INT := shop_10_id;
    listing_84_category_id VARCHAR := 'ACCESSORIES';
    listing_84_country_code CHAR(2) := shop_10_country_code;
    listing_84_title VARCHAR := 'Workshop Keyholder';
    listing_84_subtitle VARCHAR := 'A hand-forged keyholder that keeps its tension through work-hardening.';
    listing_84_price_cents INT := 6800;
    listing_84_image_uuids text[] := '{"056397f1-c1bd-4838-85eb-3a3a91189754"}';
    listing_84_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>The Workshop Keyholder utilizes a property known as work-hardening to retain its tension and form. As we forge the piece the metal strengthens and stiffens.</p><ul><li>Best seller</li><li>Hand-forged keyholder</li><li>Tension closure for extra security</li><li>Outside hallmark: crossed hammers</li><li>Studebaker Metals lifetime guarantee</li></ul>"
        },
        {
            "title": "Materials & Finishes",
            "richText": "<ul><li>Made of solid brass, stainless steel, or sterling silver</li><li>Available in work patina or high polish finish</li></ul>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>75 mm long</li><li>3 mm thick</li></ul>"
        }
    ]';
    listing_84_material_variation_id CONSTANT VARCHAR := '80840fa3-2dde-4f32-8f03-18cb1a575512';
    listing_84_material_brass_wp_id CONSTANT VARCHAR := '5397f95d-dde4-467e-8935-2bc76c9a0c41';
    listing_84_brass_wp_image_uuids CONSTANT text[] := '{"adbac509-f78e-4ef9-9e85-1631fe115702", "1f4c6882-4967-42c3-ac02-67a455eaa565"}';
    listing_84_material_brass_pol_id CONSTANT VARCHAR := 'd16207a0-6730-42d3-add4-cae5a755e30c';
    listing_84_brass_pol_image_uuids CONSTANT text[] := '{"e086626b-a8d7-47bc-b0a4-35cf34a67670"}';
    listing_84_material_sterling_wp_id CONSTANT VARCHAR := '0e9c0fb8-190a-46c2-80ab-93237489e03f';
    listing_84_sterling_wp_image_uuids CONSTANT text[] := '{"2842158e-2486-4adb-a730-89a0b3c79122", "89915be1-e92a-4bb4-a351-1f53fa70aa7c"}';
    listing_84_material_sterling_pol_id CONSTANT VARCHAR := '4abce56d-2ab2-4647-8e9b-851bb92f783d';
    listing_84_sterling_pol_image_uuids CONSTANT text[] := '{"d9a8de5d-a627-49f3-9c3a-2fb6d93080fb", "1c5048d7-a980-4fb5-a69c-1695eb38d690"}';
    listing_84_material_steel_wp_id CONSTANT VARCHAR := '5d47a97e-2f3c-40a2-b969-b346c7cbf84f';
    listing_84_steel_wp_image_uuids CONSTANT text[] := '{"682f5b97-ab84-4a45-9fe0-f288bcb04421"}';
    listing_84_material_steel_pol_id CONSTANT VARCHAR := '1f6397c6-c21f-4972-a795-f1a651d7e671';
    listing_84_steel_pol_image_uuids CONSTANT text[] := '{"32ff6b4f-61dd-49f0-9758-9741ee30d667"}';
    listing_84_combinations JSONB;

    listing_85_id INT := 85;
    listing_85_short_id VARCHAR := 'K9D3G';
    listing_85_shop_id INT := shop_11_id;
    listing_85_category_id VARCHAR := 'NECKLACES';
    listing_85_country_code CHAR(2) := shop_11_country_code;
    listing_85_title VARCHAR := 'Edelweiss Pendant - Brigitta';
    listing_85_subtitle VARCHAR := 'A hand-patinated bronze edelweiss with an Austrian crystal center, from the Sound of Music collection.';
    listing_85_price_cents INT := 9600;
    listing_85_image_uuids text[] := '{"c6ff3cd8-fb09-4c6f-9b9c-e8a0ee71070c"}';
    listing_85_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Edelweiss, the national flower of Austria and a symbol of the Alps, is protected by law to keep it from disappearing. It stands for deep devotion, since the flower endures the harshest mountain weather, and it is forever linked to the classic film The Sound of Music.</p><p>Michael collaborated with actress Angela Cartwright, who played Brigitta von Trapp in the film, on this collection celebrating its sixtieth anniversary.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze, accented with 22k white gold leaf and an Austrian crystal center set in 24k gold plate.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Chain: 16.5&quot; to 18.5&quot; long (adjustable)</li><li>Pendant: 0.92&quot; long x 0.93&quot; wide</li></ul>"
        }
    ]';

    listing_86_id INT := 86;
    listing_86_short_id VARCHAR := 'G54JK';
    listing_86_shop_id INT := shop_11_id;
    listing_86_category_id VARCHAR := 'NECKLACES';
    listing_86_country_code CHAR(2) := shop_11_country_code;
    listing_86_title VARCHAR := 'Edelweiss Pendant - Blossom';
    listing_86_subtitle VARCHAR := 'A bronze edelweiss with an Austrian crystal center, from the Sound of Music collection.';
    listing_86_price_cents INT := 8900;
    listing_86_image_uuids text[] := '{"b691e0fa-30b9-49ec-8475-81ef35337537"}';
    listing_86_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Edelweiss, the national flower of Austria and a symbol of the Alps, is protected by law to keep it from disappearing. It stands for deep devotion, since the flower endures the harshest mountain weather, and it is forever linked to the classic film The Sound of Music.</p><p>Michael collaborated with actress Angela Cartwright, who played Brigitta von Trapp in the film, on this collection celebrating its sixtieth anniversary.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze, accented with 22k white gold leaf and an Austrian crystal center set in 24k gold plate.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Chain: 16&quot; to 18&quot; long (adjustable)</li><li>Pendant: 0.75&quot; long x 0.8&quot; wide</li></ul>"
        }
    ]';

    listing_87_id INT := 87;
    listing_87_short_id VARCHAR := 'G2EDK';
    listing_87_shop_id INT := shop_11_id;
    listing_87_category_id VARCHAR := 'RINGS';
    listing_87_country_code CHAR(2) := shop_11_country_code;
    listing_87_title VARCHAR := 'Edelweiss Ring - Blossom of Snow';
    listing_87_subtitle VARCHAR := 'An adjustable gold-plated bronze ring with a hand-cast edelweiss and an Austrian crystal center.';
    listing_87_price_cents INT := 7700;
    listing_87_image_uuids text[] := '{"7743ccf9-25fd-49e6-9ff7-a3e9218ab859"}';
    listing_87_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Edelweiss, the national flower of Austria and a symbol of the Alps, is protected by law to keep it from disappearing. It stands for deep devotion, since the flower endures the harshest mountain weather, and it is forever linked to the classic film The Sound of Music.</p><p>Michael collaborated with actress Angela Cartwright, who played Brigitta von Trapp in the film, on this collection celebrating its sixtieth anniversary.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in 24kt gold plated bronze, accented with 22k white gold leaf and an Austrian crystal center set in 24k gold plate.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Adjustable size</li></ul>"
        }
    ]';

    listing_88_id INT := 88;
    listing_88_short_id VARCHAR := 'G756G';
    listing_88_shop_id INT := shop_11_id;
    listing_88_category_id VARCHAR := 'EARRINGS';
    listing_88_country_code CHAR(2) := shop_11_country_code;
    listing_88_title VARCHAR := 'Edelweiss Earrings - Blossom Post';
    listing_88_subtitle VARCHAR := 'Bronze edelweiss post earrings with Austrian crystal centers and sterling silver posts.';
    listing_88_price_cents INT := 9200;
    listing_88_image_uuids text[] := '{"a1019b8b-72a5-48d8-89ca-d5750c0e08c3"}';
    listing_88_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Edelweiss, the national flower of Austria and a symbol of the Alps, is protected by law to keep it from disappearing. It stands for deep devotion, since the flower endures the harshest mountain weather, and it is forever linked to the classic film The Sound of Music.</p><p>Michael collaborated with actress Angela Cartwright, who played Brigitta von Trapp in the film, on this collection celebrating its sixtieth anniversary.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze, accented with 22k white gold leaf and an Austrian crystal center set in 24k gold plate. The posts are 925 silver.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>0.55&quot; long x 0.52&quot; wide</li></ul>"
        }
    ]';

    listing_89_id INT := 89;
    listing_89_short_id VARCHAR := 'GJ4EG';
    listing_89_shop_id INT := shop_11_id;
    listing_89_category_id VARCHAR := 'EARRINGS';
    listing_89_country_code CHAR(2) := shop_11_country_code;
    listing_89_title VARCHAR := 'Edelweiss Earrings - Blossom Dangle';
    listing_89_subtitle VARCHAR := 'Bronze edelweiss dangle earrings with Austrian crystal centers and gold-plated silver ear wires.';
    listing_89_price_cents INT := 9600;
    listing_89_image_uuids text[] := '{"4aafeb68-654f-4cbd-b751-959572ad755d"}';
    listing_89_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Edelweiss, the national flower of Austria and a symbol of the Alps, is protected by law to keep it from disappearing. It stands for deep devotion, since the flower endures the harshest mountain weather, and it is forever linked to the classic film The Sound of Music.</p><p>Michael collaborated with actress Angela Cartwright, who played Brigitta von Trapp in the film, on this collection celebrating its sixtieth anniversary.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze, accented with 22k white gold leaf and an Austrian crystal center set in 24k gold plate. The wires are 925 silver with a 24kt gold plating.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>0.85&quot; long x 0.7&quot; wide</li></ul>"
        }
    ]';

    listing_90_id INT := 90;
    listing_90_short_id VARCHAR := 'K823K';
    listing_90_shop_id INT := shop_11_id;
    listing_90_category_id VARCHAR := 'NECKLACES';
    listing_90_country_code CHAR(2) := shop_11_country_code;
    listing_90_title VARCHAR := 'Edelweiss Necklace - Meet Mi';
    listing_90_subtitle VARCHAR := 'A hand-patinated bronze necklace of three edelweiss blossoms with Austrian crystal centers.';
    listing_90_price_cents INT := 14600;
    listing_90_image_uuids text[] := '{"a6dee481-3456-443e-9bd5-d68fdb313499"}';
    listing_90_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Edelweiss, the national flower of Austria and a symbol of the Alps, is protected by law to keep it from disappearing. It stands for deep devotion, since the flower endures the harshest mountain weather, and it is forever linked to the classic film The Sound of Music.</p><p>Michael collaborated with actress Angela Cartwright, who played Brigitta von Trapp in the film, on this collection celebrating its sixtieth anniversary.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze, accented with 22k white gold leaf and an Austrian crystal center set in 24k gold plate.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>16&quot; to 18&quot; long (adjustable)</li></ul>"
        }
    ]';

    listing_91_id INT := 91;
    listing_91_short_id VARCHAR := 'GL55K';
    listing_91_shop_id INT := shop_11_id;
    listing_91_category_id VARCHAR := 'EARRINGS';
    listing_91_country_code CHAR(2) := shop_11_country_code;
    listing_91_title VARCHAR := 'Edelweiss Earrings - Brigitta Large Post';
    listing_91_subtitle VARCHAR := 'Larger hand-patinated bronze edelweiss earrings on sterling silver posts.';
    listing_91_price_cents INT := 10400;
    listing_91_image_uuids text[] := '{"e659018f-daf3-49a9-9998-4c552bafb29c"}';
    listing_91_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Edelweiss, the national flower of Austria and a symbol of the Alps, is protected by law to keep it from disappearing. It stands for deep devotion, since the flower endures the harshest mountain weather, and it is forever linked to the classic film The Sound of Music.</p><p>Michael collaborated with actress Angela Cartwright, who played Brigitta von Trapp in the film, on this collection celebrating its sixtieth anniversary.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze, accented with 22k white gold leaf and an Austrian crystal center set in 24k gold plate. The posts are 925 silver.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>0.7&quot; long x 0.7&quot; wide</li></ul>"
        }
    ]';

    listing_92_id INT := 92;
    listing_92_short_id VARCHAR := 'GE5LG';
    listing_92_shop_id INT := shop_11_id;
    listing_92_category_id VARCHAR := 'BRACELETS';
    listing_92_country_code CHAR(2) := shop_11_country_code;
    listing_92_title VARCHAR := 'Edelweiss Bracelet - Bright';
    listing_92_subtitle VARCHAR := 'A link bracelet of hand-patinated bronze edelweiss blossoms with Austrian crystal centers.';
    listing_92_price_cents INT := 22800;
    listing_92_image_uuids text[] := '{"777ba00c-1c3a-45cb-ae60-9b181e950a92", "9646bf74-b51f-4636-8654-b79eb7d9bd2a"}';
    listing_92_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Edelweiss, the national flower of Austria and a symbol of the Alps, is protected by law to keep it from disappearing. It stands for deep devotion, since the flower endures the harshest mountain weather, and it is forever linked to the classic film The Sound of Music.</p><p>Michael collaborated with actress Angela Cartwright, who played Brigitta von Trapp in the film, on this collection celebrating its sixtieth anniversary.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze, accented with 22k white gold leaf and an Austrian crystal center set in 24k gold plate.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>7.7&quot; long</li></ul>"
        }
    ]';

    listing_93_id INT := 93;
    listing_93_short_id VARCHAR := 'G695K';
    listing_93_shop_id INT := shop_11_id;
    listing_93_category_id VARCHAR := 'ACCESSORIES';
    listing_93_country_code CHAR(2) := shop_11_country_code;
    listing_93_title VARCHAR := 'Edelweiss 60th Anniversary Commemorative Charm';
    listing_93_subtitle VARCHAR := 'A clip-on edelweiss charm in hand-patinated bronze, made for the sixtieth anniversary of The Sound of Music.';
    listing_93_price_cents INT := 5200;
    listing_93_image_uuids text[] := '{"6fcdc5ba-fde0-4703-ac92-3319f2009c6e", "15f6b603-887c-4149-9e40-b488d089962b"}';
    listing_93_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Edelweiss, the national flower of Austria and a symbol of the Alps, is protected by law to keep it from disappearing. It stands for deep devotion, since the flower endures the harshest mountain weather, and it is forever linked to the classic film The Sound of Music.</p><p>Michael collaborated with actress Angela Cartwright, who played Brigitta von Trapp in the film, on this collection celebrating its sixtieth anniversary.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze, accented with 22k white gold leaf and an Austrian crystal center set in 24k gold plate.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>0.75&quot; long x 0.75&quot; wide</li></ul>"
        }
    ]';

    listing_94_id INT := 94;
    listing_94_short_id VARCHAR := 'G364K';
    listing_94_shop_id INT := shop_11_id;
    listing_94_category_id VARCHAR := 'ACCESSORIES';
    listing_94_country_code CHAR(2) := shop_11_country_code;
    listing_94_title VARCHAR := 'Edelweiss Brooch - Grow';
    listing_94_subtitle VARCHAR := 'A hand-patinated bronze brooch of a single edelweiss on its stem, with an Austrian crystal center.';
    listing_94_price_cents INT := 11200;
    listing_94_image_uuids text[] := '{"84f0507b-49fd-4308-ae84-a3f91cf7fbfa"}';
    listing_94_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Edelweiss, the national flower of Austria and a symbol of the Alps, is protected by law to keep it from disappearing. It stands for deep devotion, since the flower endures the harshest mountain weather, and it is forever linked to the classic film The Sound of Music.</p><p>Michael collaborated with actress Angela Cartwright, who played Brigitta von Trapp in the film, on this collection celebrating its sixtieth anniversary.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze, accented with 22k white gold leaf and an Austrian crystal center set in 24k gold plate.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>3.1&quot; long x 1.65&quot; wide</li></ul>"
        }
    ]';

    listing_95_id INT := 95;
    listing_95_short_id VARCHAR := 'GD97K';
    listing_95_shop_id INT := shop_11_id;
    listing_95_category_id VARCHAR := 'NECKLACES';
    listing_95_country_code CHAR(2) := shop_11_country_code;
    listing_95_title VARCHAR := 'Forget Me Not Pendant - Triple Flower';
    listing_95_subtitle VARCHAR := 'A hand-patinated bronze pendant with a cluster of three pale blue glass forget-me-nots.';
    listing_95_price_cents INT := 12900;
    listing_95_image_uuids text[] := '{"8cdb6cb7-112c-4e69-a621-c6934301782e", "f03a968e-7721-427a-8659-9435a3bc11d0", "90b452a8-8407-4705-a8e0-d02e28e70fd3"}';
    listing_95_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Forget-me-not, or Myosotis, grows clusters of tiny blue flowers that have long stood for remembrance and undying love. The English name comes from the German Vergissmeinnicht and was first used in English in 1398.</p><p>One of the many legends tells of two lovers walking along the Danube. When the man was swept away while picking the bright blue blossoms for his beloved, he called out for her not to forget him as the river carried him off.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze with three pale blue glass flowers.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Chain: 16&quot; to 18&quot; long (adjustable)</li><li>Pendant: 1&quot; long</li></ul>"
        }
    ]';

    listing_96_id INT := 96;
    listing_96_short_id VARCHAR := 'K48LK';
    listing_96_shop_id INT := shop_11_id;
    listing_96_category_id VARCHAR := 'RINGS';
    listing_96_country_code CHAR(2) := shop_11_country_code;
    listing_96_title VARCHAR := 'Forget Me Not Ring - Single';
    listing_96_subtitle VARCHAR := 'An adjustable bronze ring with a single pale blue glass forget-me-not.';
    listing_96_price_cents INT := 8900;
    listing_96_image_uuids text[] := '{"0a5c396b-10e8-42ca-84af-1569ac629286"}';
    listing_96_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Forget-me-not, or Myosotis, grows clusters of tiny blue flowers that have long stood for remembrance and undying love. The English name comes from the German Vergissmeinnicht and was first used in English in 1398.</p><p>One of the many legends tells of two lovers walking along the Danube. When the man was swept away while picking the bright blue blossoms for his beloved, he called out for her not to forget him as the river carried him off.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze with a pale blue glass flower and 24kt gold plated pollen stems.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Adjustable band</li></ul>"
        }
    ]';

    listing_97_id INT := 97;
    listing_97_short_id VARCHAR := 'K923G';
    listing_97_shop_id INT := shop_11_id;
    listing_97_category_id VARCHAR := 'EARRINGS';
    listing_97_country_code CHAR(2) := shop_11_country_code;
    listing_97_title VARCHAR := 'Forget Me Not Earrings - Petite Post';
    listing_97_subtitle VARCHAR := 'Petite bronze post earrings with pale blue glass forget-me-nots.';
    listing_97_price_cents INT := 10500;
    listing_97_image_uuids text[] := '{"576e73b4-aa7d-4507-9da8-e4663a5981b7", "001a11b8-5d5a-4337-b615-b54658ecd778"}';
    listing_97_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Forget-me-not, or Myosotis, grows clusters of tiny blue flowers that have long stood for remembrance and undying love. The English name comes from the German Vergissmeinnicht and was first used in English in 1398.</p><p>One of the many legends tells of two lovers walking along the Danube. When the man was swept away while picking the bright blue blossoms for his beloved, he called out for her not to forget him as the river carried him off.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze with pale blue glass flowers and 24kt gold plated pollen stems. The posts are 925 sterling silver.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>0.37&quot; long x 0.4&quot; wide</li></ul>"
        }
    ]';

    listing_98_id INT := 98;
    listing_98_short_id VARCHAR := 'G5DJK';
    listing_98_shop_id INT := shop_11_id;
    listing_98_category_id VARCHAR := 'BRACELETS';
    listing_98_country_code CHAR(2) := shop_11_country_code;
    listing_98_title VARCHAR := 'Forget Me Not Bracelet';
    listing_98_subtitle VARCHAR := 'A delicate bronze link bracelet scattered with pale blue glass forget-me-nots.';
    listing_98_price_cents INT := 22700;
    listing_98_image_uuids text[] := '{"4983eed1-ff36-43f7-9e4b-7c1a850d3e42"}';
    listing_98_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Forget-me-not, or Myosotis, grows clusters of tiny blue flowers that have long stood for remembrance and undying love. The English name comes from the German Vergissmeinnicht and was first used in English in 1398.</p><p>One of the many legends tells of two lovers walking along the Danube. When the man was swept away while picking the bright blue blossoms for his beloved, he called out for her not to forget him as the river carried him off.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze with pale blue glass flowers and 24kt gold plated pollen stems.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>7.25&quot; long</li></ul>"
        }
    ]';

    listing_99_id INT := 99;
    listing_99_short_id VARCHAR := 'G27DK';
    listing_99_shop_id INT := shop_11_id;
    listing_99_category_id VARCHAR := 'NECKLACES';
    listing_99_country_code CHAR(2) := shop_11_country_code;
    listing_99_title VARCHAR := 'Forget Me Not Pendant - Petite Flower';
    listing_99_subtitle VARCHAR := 'A hand-patinated bronze pendant pairing a pale blue glass forget-me-not with a freshwater pearl.';
    listing_99_price_cents INT := 11000;
    listing_99_image_uuids text[] := '{"7f1c8c0a-c958-4f61-b121-488e11a2c301", "b96cf5b6-6220-44a5-98ba-cd4abf726843", "5b5308be-50d4-4fa6-93e7-4914f706331d"}';
    listing_99_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Forget-me-not, or Myosotis, grows clusters of tiny blue flowers that have long stood for remembrance and undying love. The English name comes from the German Vergissmeinnicht and was first used in English in 1398.</p><p>One of the many legends tells of two lovers walking along the Danube. When the man was swept away while picking the bright blue blossoms for his beloved, he called out for her not to forget him as the river carried him off.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze with a white freshwater pearl and a pale blue glass flower.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Chain: 17&quot; to 19&quot; long (adjustable)</li></ul>"
        }
    ]';

    listing_100_id INT := 100;
    listing_100_short_id VARCHAR := 'K486K';
    listing_100_shop_id INT := shop_11_id;
    listing_100_category_id VARCHAR := 'RINGS';
    listing_100_country_code CHAR(2) := shop_11_country_code;
    listing_100_title VARCHAR := 'Forget Me Not Ring - Triple';
    listing_100_subtitle VARCHAR := 'An adjustable bronze ring with a cluster of three pale blue glass forget-me-nots.';
    listing_100_price_cents INT := 13000;
    listing_100_image_uuids text[] := '{"3cce6278-7195-4905-acb0-f242b3850040"}';
    listing_100_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Forget-me-not, or Myosotis, grows clusters of tiny blue flowers that have long stood for remembrance and undying love. The English name comes from the German Vergissmeinnicht and was first used in English in 1398.</p><p>One of the many legends tells of two lovers walking along the Danube. When the man was swept away while picking the bright blue blossoms for his beloved, he called out for her not to forget him as the river carried him off.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze with pale blue glass flowers and 24kt gold plated pollen stems.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Adjustable band</li></ul>"
        }
    ]';

    listing_101_id INT := 101;
    listing_101_short_id VARCHAR := 'K925G';
    listing_101_shop_id INT := shop_11_id;
    listing_101_category_id VARCHAR := 'EARRINGS';
    listing_101_country_code CHAR(2) := shop_11_country_code;
    listing_101_title VARCHAR := 'Forget Me Not Earrings - Triple Flower Post';
    listing_101_subtitle VARCHAR := 'Bronze post earrings with clusters of three pale blue glass forget-me-nots.';
    listing_101_price_cents INT := 13000;
    listing_101_image_uuids text[] := '{"0f1022d9-7300-4134-8443-5ba061aaa95d", "7ae523cc-4d21-4c56-9c8a-4a0408315f5a"}';
    listing_101_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Forget-me-not, or Myosotis, grows clusters of tiny blue flowers that have long stood for remembrance and undying love. The English name comes from the German Vergissmeinnicht and was first used in English in 1398.</p><p>One of the many legends tells of two lovers walking along the Danube. When the man was swept away while picking the bright blue blossoms for his beloved, he called out for her not to forget him as the river carried him off.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze with pale blue glass flowers and 24kt gold plated pollen stems. The posts are 925 sterling silver.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>0.56&quot; long x 0.64&quot; wide</li></ul>"
        }
    ]';

    listing_102_id INT := 102;
    listing_102_short_id VARCHAR := 'G5D3K';
    listing_102_shop_id INT := shop_11_id;
    listing_102_category_id VARCHAR := 'EARRINGS';
    listing_102_country_code CHAR(2) := shop_11_country_code;
    listing_102_title VARCHAR := 'Forget Me Not Earrings - Single Flower Wire';
    listing_102_subtitle VARCHAR := 'Bronze drop earrings with a single pale blue glass forget-me-not on sterling silver wires.';
    listing_102_price_cents INT := 10800;
    listing_102_image_uuids text[] := '{"12ad67d8-00c3-4260-b2bb-f561eef2a974"}';
    listing_102_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Forget-me-not, or Myosotis, grows clusters of tiny blue flowers that have long stood for remembrance and undying love. The English name comes from the German Vergissmeinnicht and was first used in English in 1398.</p><p>One of the many legends tells of two lovers walking along the Danube. When the man was swept away while picking the bright blue blossoms for his beloved, he called out for her not to forget him as the river carried him off.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze with pale blue glass flowers. The wires are 925 sterling silver.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>0.5&quot; long x 0.35&quot; wide</li></ul>"
        }
    ]';

    listing_103_id INT := 103;
    listing_103_short_id VARCHAR := 'G27EK';
    listing_103_shop_id INT := shop_11_id;
    listing_103_category_id VARCHAR := 'EARRINGS';
    listing_103_country_code CHAR(2) := shop_11_country_code;
    listing_103_title VARCHAR := 'Forget Me Not Earrings - Triple Flower Wire';
    listing_103_subtitle VARCHAR := 'Long bronze drop earrings with three pale blue glass forget-me-nots on sterling silver wires.';
    listing_103_price_cents INT := 13700;
    listing_103_image_uuids text[] := '{"4e1aba1c-0a3e-47b0-895f-4862b7075e70"}';
    listing_103_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Forget-me-not, or Myosotis, grows clusters of tiny blue flowers that have long stood for remembrance and undying love. The English name comes from the German Vergissmeinnicht and was first used in English in 1398.</p><p>One of the many legends tells of two lovers walking along the Danube. When the man was swept away while picking the bright blue blossoms for his beloved, he called out for her not to forget him as the river carried him off.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze with pale blue glass flowers. The wires are 925 sterling silver.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>1.28&quot; long x 0.4&quot; wide</li></ul>"
        }
    ]';

    listing_104_id INT := 104;
    listing_104_short_id VARCHAR := 'G799G';
    listing_104_shop_id INT := shop_11_id;
    listing_104_category_id VARCHAR := 'ACCESSORIES';
    listing_104_country_code CHAR(2) := shop_11_country_code;
    listing_104_title VARCHAR := 'Forget Me Not Brooch';
    listing_104_subtitle VARCHAR := 'A hand-patinated bronze brooch of forget-me-not branches with freshwater pearls and cast glass flowers.';
    listing_104_price_cents INT := 24400;
    listing_104_image_uuids text[] := '{"e50f8bc5-6246-4d73-8e2b-8593513b4422"}';
    listing_104_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Forget-me-not, or Myosotis, grows clusters of tiny blue flowers that have long stood for remembrance and undying love. The English name comes from the German Vergissmeinnicht and was first used in English in 1398.</p><p>One of the many legends tells of two lovers walking along the Danube. When the man was swept away while picking the bright blue blossoms for his beloved, he called out for her not to forget him as the river carried him off.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze, accented with white freshwater pearls and cast glass flowers. The branch on the left side is articulated.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>2&quot; long x 2&quot; wide</li></ul>"
        }
    ]';

    listing_105_id INT := 105;
    listing_105_short_id VARCHAR := 'GJ67G';
    listing_105_shop_id INT := shop_11_id;
    listing_105_category_id VARCHAR := 'ACCESSORIES';
    listing_105_country_code CHAR(2) := shop_11_country_code;
    listing_105_title VARCHAR := 'Orange Blossom Brooch';
    listing_105_subtitle VARCHAR := 'A hand-patinated bronze brooch of orange blossoms with white and yellow freshwater pearls.';
    listing_105_price_cents INT := 21700;
    listing_105_image_uuids text[] := '{"000dca03-3000-49f7-8b3a-8d4aebb1066f"}';
    listing_105_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Orange blossoms have symbolized purity, innocence, and fertility throughout history, which is why they have long been considered ideal adornments for brides. In 1684, Louis XIV, fond of their sweet scent and white flowers, installed an Orangerie at Versailles and insisted that baskets of orange blossoms perfume the rooms even in the middle of January.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Hand-patinated bronze with white and yellow freshwater pearls.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>3&quot; long x 2.5&quot; wide</li></ul>"
        }
    ]';

    listing_106_id INT := 106;
    listing_106_short_id VARCHAR := 'K8DJK';
    listing_106_shop_id INT := shop_11_id;
    listing_106_category_id VARCHAR := 'EARRINGS';
    listing_106_country_code CHAR(2) := shop_11_country_code;
    listing_106_title VARCHAR := 'Orange Blossom Earrings - Flower Button';
    listing_106_subtitle VARCHAR := 'Hand-patinated bronze orange blossom earrings with freshwater pearls and gold and silver plate.';
    listing_106_price_cents INT := 19200;
    listing_106_image_uuids text[] := '{"e4885add-2df0-4ffa-a22e-81cb1f7a60cc", "8dc349d2-ebeb-4b04-b5aa-34aed2fd32ac"}';
    listing_106_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Orange blossoms have symbolized purity, innocence, and fertility throughout history, which is why they have long been considered ideal adornments for brides. In 1684, Louis XIV, fond of their sweet scent and white flowers, installed an Orangerie at Versailles and insisted that baskets of orange blossoms perfume the rooms even in the middle of January.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Hand-patinated bronze with white and yellow freshwater pearls and gold and silver plate.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>0.75&quot; long x 0.75&quot; wide</li></ul>"
        }
    ]';

    listing_107_id INT := 107;
    listing_107_short_id VARCHAR := 'GLD6G';
    listing_107_shop_id INT := shop_11_id;
    listing_107_category_id VARCHAR := 'EARRINGS';
    listing_107_country_code CHAR(2) := shop_11_country_code;
    listing_107_title VARCHAR := 'Orange Blossom Earrings - Flower Button Clip';
    listing_107_subtitle VARCHAR := 'Clip-on orange blossom earrings in hand-patinated bronze with freshwater pearls.';
    listing_107_price_cents INT := 19200;
    listing_107_image_uuids text[] := '{"eff0fc74-da25-4591-94aa-d891270f3c18"}';
    listing_107_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Orange blossoms have symbolized purity, innocence, and fertility throughout history, which is why they have long been considered ideal adornments for brides. In 1684, Louis XIV, fond of their sweet scent and white flowers, installed an Orangerie at Versailles and insisted that baskets of orange blossoms perfume the rooms even in the middle of January.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Hand-patinated bronze with white and yellow freshwater pearls and gold and silver plate.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>0.75&quot; long x 0.75&quot; wide</li></ul>"
        }
    ]';

    listing_108_id INT := 108;
    listing_108_short_id VARCHAR := 'GE32G';
    listing_108_shop_id INT := shop_11_id;
    listing_108_category_id VARCHAR := 'BRACELETS';
    listing_108_country_code CHAR(2) := shop_11_country_code;
    listing_108_title VARCHAR := 'Orange Blossom Bracelet';
    listing_108_subtitle VARCHAR := 'A hand-patinated bronze bracelet of orange blossoms set with white freshwater pearls.';
    listing_108_price_cents INT := 21500;
    listing_108_image_uuids text[] := '{"37d5a716-b729-4c4e-b494-cfca33e95ec0"}';
    listing_108_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Orange blossoms have symbolized purity, innocence, and fertility throughout history, which is why they have long been considered ideal adornments for brides. In 1684, Louis XIV, fond of their sweet scent and white flowers, installed an Orangerie at Versailles and insisted that baskets of orange blossoms perfume the rooms even in the middle of January.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Hand-patinated bronze with white freshwater pearls.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>7.75&quot; long</li></ul>"
        }
    ]';

    listing_109_id INT := 109;
    listing_109_short_id VARCHAR := 'G658K';
    listing_109_shop_id INT := shop_11_id;
    listing_109_category_id VARCHAR := 'NECKLACES';
    listing_109_country_code CHAR(2) := shop_11_country_code;
    listing_109_title VARCHAR := 'Orange Blossom Pendant - Flower Pearls';
    listing_109_subtitle VARCHAR := 'An orange blossom pendant with freshwater pearls on a seed pearl necklace.';
    listing_109_price_cents INT := 31400;
    listing_109_image_uuids text[] := '{"17193301-a9e1-4c41-beb7-de2c1b02266b", "d44977ad-4f84-4f15-aa59-ab7d2e873fdd", "232a98ce-e250-4227-9b26-a1ec194f5047"}';
    listing_109_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Orange blossoms have symbolized purity, innocence, and fertility throughout history, which is why they have long been considered ideal adornments for brides. In 1684, Louis XIV, fond of their sweet scent and white flowers, installed an Orangerie at Versailles and insisted that baskets of orange blossoms perfume the rooms even in the middle of January.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Hand-patinated bronze with white and yellow freshwater pearls on a seed pearl necklace.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Chain: 16&quot; to 17&quot; long (adjustable)</li><li>Pendant: 1.3&quot; long</li></ul>"
        }
    ]';

    listing_110_id INT := 110;
    listing_110_short_id VARCHAR := 'G3ELG';
    listing_110_shop_id INT := shop_11_id;
    listing_110_category_id VARCHAR := 'ACCESSORIES';
    listing_110_country_code CHAR(2) := shop_11_country_code;
    listing_110_title VARCHAR := 'Orange Blossom Lapel Pin - Web Exclusive';
    listing_110_subtitle VARCHAR := 'A small hand-patinated bronze lapel pin of orange blossoms and freshwater pearls.';
    listing_110_price_cents INT := 14200;
    listing_110_image_uuids text[] := '{"781ba9e6-a817-4efa-a12e-483ff2af4adf"}';
    listing_110_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Orange blossoms have symbolized purity, innocence, and fertility throughout history, which is why they have long been considered ideal adornments for brides. In 1684, Louis XIV, fond of their sweet scent and white flowers, installed an Orangerie at Versailles and insisted that baskets of orange blossoms perfume the rooms even in the middle of January.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Hand-patinated bronze with white and yellow freshwater pearls.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>1.75&quot; long x 1.625&quot; wide</li></ul>"
        }
    ]';

    listing_111_id INT := 111;
    listing_111_short_id VARCHAR := 'GD36K';
    listing_111_shop_id INT := shop_11_id;
    listing_111_category_id VARCHAR := 'EARRINGS';
    listing_111_country_code CHAR(2) := shop_11_country_code;
    listing_111_title VARCHAR := 'Fine Orange Blossom Post Earrings';
    listing_111_subtitle VARCHAR := 'Orange blossom post earrings cast in sterling silver with a 24K gold finish and freshwater pearls.';
    listing_111_price_cents INT := 33200;
    listing_111_image_uuids text[] := '{"a74fb036-8e70-490e-8f6c-8a8d5b50feb0", "6ee91234-0822-49ec-8cc7-95045932f6bf"}';
    listing_111_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Orange blossoms have symbolized purity, innocence, and fertility throughout history, which is why they have long been considered ideal adornments for brides. In 1684, Louis XIV, fond of their sweet scent and white flowers, installed an Orangerie at Versailles and insisted that baskets of orange blossoms perfume the rooms even in the middle of January.</p><p>Michael says the unopened buds always reminded him of freshwater pearls, which is why pearls appear throughout his orange blossom designs.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in sterling silver with a 24K gold finish, accented with freshwater pearls.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>0.75&quot; long x 0.75&quot; wide</li></ul>"
        }
    ]';

    listing_112_id INT := 112;
    listing_112_short_id VARCHAR := 'K446K';
    listing_112_shop_id INT := shop_11_id;
    listing_112_category_id VARCHAR := 'NECKLACES';
    listing_112_country_code CHAR(2) := shop_11_country_code;
    listing_112_title VARCHAR := 'Orange Blossom Statement Necklace - Flowers';
    listing_112_subtitle VARCHAR := 'A statement necklace of hand-patinated bronze orange blossoms and freshwater pearls.';
    listing_112_price_cents INT := 62200;
    listing_112_image_uuids text[] := '{"6b5dc419-6702-4687-8ce4-29cfb30f8312", "ede6dbb2-fddb-4901-963b-e5f3d1888981", "0f533064-7ff1-4128-ba10-c1565414ebed"}';
    listing_112_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Orange blossoms have symbolized purity, innocence, and fertility throughout history, which is why they have long been considered ideal adornments for brides. In 1684, Louis XIV, fond of their sweet scent and white flowers, installed an Orangerie at Versailles and insisted that baskets of orange blossoms perfume the rooms even in the middle of January.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Hand-patinated bronze with white and yellow freshwater pearls.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>16&quot; to 17&quot; long (adjustable) with a 2.5&quot; drop</li></ul>"
        }
    ]';

    listing_113_id INT := 113;
    listing_113_short_id VARCHAR := 'K9J5G';
    listing_113_shop_id INT := shop_11_id;
    listing_113_category_id VARCHAR := 'ACCESSORIES';
    listing_113_country_code CHAR(2) := shop_11_country_code;
    listing_113_title VARCHAR := 'Fine Orange Blossom Statement Brooch';
    listing_113_subtitle VARCHAR := 'A statement brooch of orange blossoms cast in sterling silver with a 24K gold finish.';
    listing_113_price_cents INT := 55200;
    listing_113_image_uuids text[] := '{"ba7ee559-f4f2-464f-9333-4bf49d19273d"}';
    listing_113_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Orange blossoms have symbolized purity, innocence, and fertility throughout history, which is why they have long been considered ideal adornments for brides. In 1684, Louis XIV, fond of their sweet scent and white flowers, installed an Orangerie at Versailles and insisted that baskets of orange blossoms perfume the rooms even in the middle of January.</p><p>Michael says the unopened buds always reminded him of freshwater pearls, which is why pearls appear throughout his orange blossom designs.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in sterling silver with a 24K gold finish, accented with freshwater pearls.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>3&quot; long x 2.5&quot; wide</li></ul>"
        }
    ]';

    listing_114_id INT := 114;
    listing_114_short_id VARCHAR := 'G593G';
    listing_114_shop_id INT := shop_11_id;
    listing_114_category_id VARCHAR := 'NECKLACES';
    listing_114_country_code CHAR(2) := shop_11_country_code;
    listing_114_title VARCHAR := 'Fine Orange Blossom Pendant';
    listing_114_subtitle VARCHAR := 'An orange blossom pendant cast in sterling silver with a 24K gold finish and freshwater pearls.';
    listing_114_price_cents INT := 48000;
    listing_114_image_uuids text[] := '{"71c3d430-53c3-46e7-9edf-48098b65078c", "45ce63d5-bc07-44c9-b51b-e31984981dfc"}';
    listing_114_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Orange blossoms have symbolized purity, innocence, and fertility throughout history, which is why they have long been considered ideal adornments for brides. In 1684, Louis XIV, fond of their sweet scent and white flowers, installed an Orangerie at Versailles and insisted that baskets of orange blossoms perfume the rooms even in the middle of January.</p><p>Michael says the unopened buds always reminded him of freshwater pearls, which is why pearls appear throughout his orange blossom designs.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in sterling silver with a 24K gold finish, accented with freshwater pearls.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Chain: 16&quot; adjustable</li><li>Pendant: 1.5&quot; long</li></ul>"
        }
    ]';

    listing_115_id INT := 115;
    listing_115_short_id VARCHAR := 'G2LEG';
    listing_115_shop_id INT := shop_11_id;
    listing_115_category_id VARCHAR := 'EARRINGS';
    listing_115_country_code CHAR(2) := shop_11_country_code;
    listing_115_title VARCHAR := 'Fern Earrings - Large Single Leaf Wire';
    listing_115_subtitle VARCHAR := 'Bronze drop earrings with a single green-patinated fern leaf.';
    listing_115_price_cents INT := 11800;
    listing_115_image_uuids text[] := '{"c21ead27-93e1-4713-854f-d998dc6f24a4", "532c7f1b-2b88-4ec5-b0d9-ddd5262e799d"}';
    listing_115_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Ferns are among the oldest plants on Earth. They appear in fossil records from the Devonian period, 360 million years ago, and dominated the Carboniferous, the Age of Ferns. They grow in habitats around the world, are used for food, art, and medicine, and quietly clean the air and soil.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze with green patinated leaves.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>1.3&quot; long x 0.66&quot; wide</li></ul>"
        }
    ]';

    listing_116_id INT := 116;
    listing_116_short_id VARCHAR := 'G729K';
    listing_116_shop_id INT := shop_11_id;
    listing_116_category_id VARCHAR := 'NECKLACES';
    listing_116_country_code CHAR(2) := shop_11_country_code;
    listing_116_title VARCHAR := 'Dainty Fern Pendant';
    listing_116_subtitle VARCHAR := 'A dainty bronze pendant of a green-patinated fern frond.';
    listing_116_price_cents INT := 9300;
    listing_116_image_uuids text[] := '{"a43b1892-2b78-4072-b4ac-1905d4751c68", "d9c14864-7085-4b90-b761-fadda21f83fe"}';
    listing_116_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Ferns are among the oldest plants on Earth. They appear in fossil records from the Devonian period, 360 million years ago, and dominated the Carboniferous, the Age of Ferns. They grow in habitats around the world, are used for food, art, and medicine, and quietly clean the air and soil.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze with green patinated leaves.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Chain: 16&quot; to 18&quot; long (adjustable)</li><li>Pendant: 2&quot; long</li></ul>"
        }
    ]';

    listing_117_id INT := 117;
    listing_117_short_id VARCHAR := 'GJ77K';
    listing_117_shop_id INT := shop_11_id;
    listing_117_category_id VARCHAR := 'NECKLACES';
    listing_117_country_code CHAR(2) := shop_11_country_code;
    listing_117_title VARCHAR := 'Fern Necklace - 30" Long';
    listing_117_subtitle VARCHAR := 'A long bronze fern necklace with green-patinated leaves on a 30-inch chain.';
    listing_117_price_cents INT := 16100;
    listing_117_image_uuids text[] := '{"0201bd55-a786-42ff-afa4-4f24c3492d6a", "6edf834e-6180-4343-8d77-501eeabe13ba", "3a43476f-4de9-4db4-a143-2f22de73719e"}';
    listing_117_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Ferns are among the oldest plants on Earth. They appear in fossil records from the Devonian period, 360 million years ago, and dominated the Carboniferous, the Age of Ferns. They grow in habitats around the world, are used for food, art, and medicine, and quietly clean the air and soil.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze with green patinated leaves.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Chain: 30&quot;</li><li>Pendant: 3&quot; long x 1.2&quot; wide</li></ul>"
        }
    ]';

    listing_118_id INT := 118;
    listing_118_short_id VARCHAR := 'K87JG';
    listing_118_shop_id INT := shop_11_id;
    listing_118_category_id VARCHAR := 'NECKLACES';
    listing_118_country_code CHAR(2) := shop_11_country_code;
    listing_118_title VARCHAR := 'Fern Pendant - Chain';
    listing_118_subtitle VARCHAR := 'A bronze fern pendant with brass-green leaves on an adjustable chain.';
    listing_118_price_cents INT := 11000;
    listing_118_image_uuids text[] := '{"63495171-6514-432b-ad4f-7425e8575c45", "0e3eb2b1-7c02-4e3a-b974-d43f2ad41ff8", "a21853f4-39bd-4867-a6dd-1f65b6b6acaa"}';
    listing_118_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Ferns are among the oldest plants on Earth. They appear in fossil records from the Devonian period, 360 million years ago, and dominated the Carboniferous, the Age of Ferns. They grow in habitats around the world, are used for food, art, and medicine, and quietly clean the air and soil.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze with brass green leaves.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Chain: 19&quot; to 21&quot; long (adjustable)</li><li>Pendant: 1.5&quot; long x 0.7&quot; wide</li></ul>"
        }
    ]';

    listing_119_id INT := 119;
    listing_119_short_id VARCHAR := 'GL86G';
    listing_119_shop_id INT := shop_11_id;
    listing_119_category_id VARCHAR := 'ACCESSORIES';
    listing_119_country_code CHAR(2) := shop_11_country_code;
    listing_119_title VARCHAR := 'Fern Brooch';
    listing_119_subtitle VARCHAR := 'A bronze brooch of a fern frond with brass-green leaves.';
    listing_119_price_cents INT := 14900;
    listing_119_image_uuids text[] := '{"6be7b60e-50ca-4609-a996-7bffb19c92d6"}';
    listing_119_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Ferns are among the oldest plants on Earth. They appear in fossil records from the Devonian period, 360 million years ago, and dominated the Carboniferous, the Age of Ferns. They grow in habitats around the world, are used for food, art, and medicine, and quietly clean the air and soil.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze with brass green leaves.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>3.5&quot; long x 1.6&quot; wide</li></ul>"
        }
    ]';

    listing_120_id INT := 120;
    listing_120_short_id VARCHAR := 'GEE2G';
    listing_120_shop_id INT := shop_11_id;
    listing_120_category_id VARCHAR := 'BRACELETS';
    listing_120_country_code CHAR(2) := shop_11_country_code;
    listing_120_title VARCHAR := 'Fern Cuff';
    listing_120_subtitle VARCHAR := 'An adjustable bronze cuff of fern fronds with a brass-green patina.';
    listing_120_price_cents INT := 16100;
    listing_120_image_uuids text[] := '{"1c241b61-1a68-44db-9d57-e8949e9667e3", "81ce5b40-cb02-4cef-97b3-9708a9dbfbf0", "8ac5ace0-79a7-426b-8678-66fc9bf08f2a"}';
    listing_120_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Ferns are among the oldest plants on Earth. They appear in fossil records from the Devonian period, 360 million years ago, and dominated the Carboniferous, the Age of Ferns. They grow in habitats around the world, are used for food, art, and medicine, and quietly clean the air and soil.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze with a brass green patination.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Adjustable</li></ul>"
        }
    ]';

    listing_121_id INT := 121;
    listing_121_short_id VARCHAR := 'G628G';
    listing_121_shop_id INT := shop_11_id;
    listing_121_category_id VARCHAR := 'ACCESSORIES';
    listing_121_country_code CHAR(2) := shop_11_country_code;
    listing_121_title VARCHAR := 'Fern Charm';
    listing_121_subtitle VARCHAR := 'A clip-on charm of a fern frond in hand-patinated bronze.';
    listing_121_price_cents INT := 5200;
    listing_121_image_uuids text[] := '{"238989f6-94db-4815-8f80-35b752ad4f6b"}';
    listing_121_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Representing sincerity and fascination, the Fern Charm captures the intricate fronds of the fern in hand-patinated bronze.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Charm: 1.35&quot; long x 0.68&quot; wide</li><li>Length including clasp: 1.81&quot;</li></ul>"
        }
    ]';

    listing_122_id INT := 122;
    listing_122_short_id VARCHAR := 'G34LK';
    listing_122_shop_id INT := shop_11_id;
    listing_122_category_id VARCHAR := 'EARRINGS';
    listing_122_country_code CHAR(2) := shop_11_country_code;
    listing_122_title VARCHAR := 'Fine Fern Silver Drop Wire Earrings';
    listing_122_subtitle VARCHAR := 'Drop earrings of fern fronds cast in sterling silver.';
    listing_122_price_cents INT := 23000;
    listing_122_image_uuids text[] := '{"f081ff16-249a-47a6-8f87-db9d17433bf6"}';
    listing_122_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Ferns have long symbolized sincerity and a secret bond of love. Michael says he has always admired the ascending pattern of leaves growing from large to small, which spoke to him of that love and sincerity.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in sterling silver with sterling silver ear wires.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>1&quot; to 1.25&quot; drop</li></ul>"
        }
    ]';

    listing_123_id INT := 123;
    listing_123_short_id VARCHAR := 'GDL6G';
    listing_123_shop_id INT := shop_11_id;
    listing_123_category_id VARCHAR := 'ACCESSORIES';
    listing_123_country_code CHAR(2) := shop_11_country_code;
    listing_123_title VARCHAR := 'Fine Fern Silver Brooch';
    listing_123_subtitle VARCHAR := 'A brooch of a fern frond cast in sterling silver.';
    listing_123_price_cents INT := 34800;
    listing_123_image_uuids text[] := '{"2ff951ac-8a47-4209-b455-26a35a00c12c"}';
    listing_123_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Ferns have long symbolized sincerity and a secret bond of love. Michael says he has always admired the ascending pattern of leaves growing from large to small, which spoke to him of that love and sincerity.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in sterling silver.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>4&quot; to 4.5&quot; long</li></ul>"
        }
    ]';

    listing_124_id INT := 124;
    listing_124_short_id VARCHAR := 'K496G';
    listing_124_shop_id INT := shop_11_id;
    listing_124_category_id VARCHAR := 'NECKLACES';
    listing_124_country_code CHAR(2) := shop_11_country_code;
    listing_124_title VARCHAR := 'Fine Fern Silver Dainty Pendant';
    listing_124_subtitle VARCHAR := 'A dainty fern pendant cast in sterling silver on a sterling silver rope chain.';
    listing_124_price_cents INT := 25700;
    listing_124_image_uuids text[] := '{"6d6e5488-0fa4-4056-afc4-b94b299db037", "bd239c5b-d3b7-4acb-8217-3c51b5477e9f"}';
    listing_124_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Ferns have long symbolized sincerity and a secret bond of love. Michael says he has always admired the ascending pattern of leaves growing from large to small, which spoke to him of that love and sincerity.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in sterling silver on a sterling silver rope chain.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Chain: 16&quot; to 18&quot; long (adjustable)</li><li>Drop: 1.25&quot;</li></ul>"
        }
    ]';

    listing_125_id INT := 125;
    listing_125_short_id VARCHAR := 'K985G';
    listing_125_shop_id INT := shop_13_id;
    listing_125_category_id VARCHAR := 'ACCESSORIES';
    listing_125_country_code CHAR(2) := shop_13_country_code;
    listing_125_title VARCHAR := 'Pocket Sundial';
    listing_125_subtitle VARCHAR := 'Tell the true solar time anywhere in the world using just the power of the sun';
    listing_125_price_cents INT := 8300;
    listing_125_image_uuids text[] := '{"0855c1d7-284e-4e0f-bfd4-190f63a30b0b", "3dcbb9b3-004d-4be3-8ea6-9c3d09f53df1", "f4a383cd-7378-4ecb-b9fa-b50ac2b40caf", "96397f95-a59b-4aa5-9946-3723748fcbde", "dc71d535-34da-4402-861b-737a2e49c723", "c92c84e1-7afa-4a96-9927-d05ecd6a8b72", "275a7728-b361-45e1-b5c0-38b7623034ee"}';
    listing_125_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<ul><li><p>Tells the true solar time anywhere in the world using just the power of the sun, achieving surprising accuracy estimated by experts to be better than +/- 10 minutes!</p></li><li><p>Crafted by our family of watchmakers for over 27 years in the same small workshop near Graz in Austria!</p></li><li><p>Measures just 60mm / 2.36 inches in diameter, fitting easily in your pocket and meeting the international sizing standard for pocket watches too!</p></li><li><p>Solid brass &amp; steel construction, with artisan black ink and every third sundial fully disassembled &amp; checked to ensure quality!</p></li><li><p>Inspired by the historic Universal Equinoctial Ring Sundial, currently on display at the Royal Observatory in Greenwich!</p></li><li><p>Can also be used as a precise compass once set up, making a truly versatile instrument!</p></li></ul>"
        },
        {
            "title": "About the Sundial",
            "richText": "<p>Although sundials have been around for a very long time, they never worked across latitudes until around 500 years ago.</p><p>At that time the Universal Equinoctial Ring Sundial - the inspiration for our sundial - began to be used by a new wave of sailors, explorers and travellers.</p><p>Our sundial tells the true solar time anywhere in the world because the Sun&rsquo;s angle to the equatorial plane takes different values over the course of the year, and the small hole mask in the centre of the sundial is adjustable, plus set to the date.</p><p>Once set up it is also a model of our planet with the bridge parallel to the earth&rsquo;s axis, so it can thus be used as a precise compass too!</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li><p>Made of solid brass and steel with artisan black ink coating - for a reassuring weight.</p></li><li><p>Fully assembled weight: 40 g.</p></li><li><p>60 mm / 2.36 inches diameter.</p></li><li><p>Includes 10 language instruction manual.</p></li><li><p>Comes with an organic cork inlay and an elegant white slider case.</p></li><li><p>The outer and inner rings can be folded together for easy transport.</p></li></ul>"
        }
    ]';

    listing_126_id INT := 126;
    listing_126_short_id VARCHAR := 'G553G';
    listing_126_shop_id INT := shop_11_id;
    listing_126_category_id VARCHAR := 'RINGS';
    listing_126_country_code CHAR(2) := shop_11_country_code;
    listing_126_title VARCHAR := 'Fine Ginkgo Ring';
    listing_126_subtitle VARCHAR := 'A ginkgo leaf ring cast in sterling silver with a 24K gold finish.';
    listing_126_price_cents INT := 14000;
    listing_126_image_uuids text[] := '{"77b3344e-be7a-4ae3-bbba-b597d651835d"}';
    listing_126_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>From the Ginkgo Fine Jewelry Collection.</p><p>The ginkgo is one of the oldest tree families on Earth, dating back to the age of the dinosaurs. Ginkgo biloba, native to China, has long been used in traditional medicine, including for asthma and other allergic reactions.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in sterling silver with a 24K gold finish.</p>"
        }
    ]';

    listing_127_id INT := 127;
    listing_127_short_id VARCHAR := 'G26EG';
    listing_127_shop_id INT := shop_11_id;
    listing_127_category_id VARCHAR := 'BRACELETS';
    listing_127_country_code CHAR(2) := shop_11_country_code;
    listing_127_title VARCHAR := 'Ginkgo Cuff Bracelet';
    listing_127_subtitle VARCHAR := 'A hand-patinated bronze cuff of ginkgo leaves.';
    listing_127_price_cents INT := 17300;
    listing_127_image_uuids text[] := '{"3a87aa1b-a983-404e-a396-c0cb8074e305", "469cd7b2-e258-4837-b5a3-c4d1c1e87d11", "01f6414e-baa6-4b16-bcc9-d9459ee1b630"}';
    listing_127_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>The ginkgo is one of the oldest tree families on Earth, dating back to the age of the dinosaurs. Ginkgo biloba, native to China, has long been used in traditional medicine, including for asthma and other allergic reactions.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Can be bent slightly to fit most wrists</li></ul>"
        }
    ]';

    listing_128_id INT := 128;
    listing_128_short_id VARCHAR := 'G779G';
    listing_128_shop_id INT := shop_11_id;
    listing_128_category_id VARCHAR := 'EARRINGS';
    listing_128_country_code CHAR(2) := shop_11_country_code;
    listing_128_title VARCHAR := 'Ginkgo Earrings - Single Leaf';
    listing_128_subtitle VARCHAR := 'Hand-patinated bronze drop earrings with a single ginkgo leaf.';
    listing_128_price_cents INT := 13000;
    listing_128_image_uuids text[] := '{"5f33eb08-bd3c-4a48-ac90-318bc397c052", "5cf9a3b9-18e2-457f-81af-95a8fc0f2594"}';
    listing_128_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>The ginkgo is one of the oldest tree families on Earth, dating back to the age of the dinosaurs. Ginkgo biloba, native to China, has long been used in traditional medicine, including for asthma and other allergic reactions.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze. The wires are 925 silver.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>0.4&quot; long x 0.75&quot; wide</li></ul>"
        }
    ]';

    listing_129_id INT := 129;
    listing_129_short_id VARCHAR := 'GJ27G';
    listing_129_shop_id INT := shop_11_id;
    listing_129_category_id VARCHAR := 'NECKLACES';
    listing_129_country_code CHAR(2) := shop_11_country_code;
    listing_129_title VARCHAR := 'Ginkgo Pendant - Single Leaf';
    listing_129_subtitle VARCHAR := 'A single hand-patinated bronze ginkgo leaf on a brass chain.';
    listing_129_price_cents INT := 12500;
    listing_129_image_uuids text[] := '{"cfeb5b2b-bd59-4111-b525-3b0aabbdd2f6", "ae2fcd0c-bdd9-4d72-8365-e0da05170edc", "e6daea98-51f8-4851-89e3-7fadb9d26aae"}';
    listing_129_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>The ginkgo is one of the oldest tree families on Earth, dating back to the age of the dinosaurs. Ginkgo biloba, native to China, has long been used in traditional medicine, including for asthma and other allergic reactions.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze on a brass chain.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Chain: 17&quot; to 18&quot; long (adjustable)</li><li>Pendant: 0.6&quot; long</li></ul>"
        }
    ]';

    listing_130_id INT := 130;
    listing_130_short_id VARCHAR := 'K8JJK';
    listing_130_shop_id INT := shop_11_id;
    listing_130_category_id VARCHAR := 'EARRINGS';
    listing_130_country_code CHAR(2) := shop_11_country_code;
    listing_130_title VARCHAR := 'Ginkgo Earrings - Posts';
    listing_130_subtitle VARCHAR := 'Hand-patinated bronze ginkgo leaf post earrings.';
    listing_130_price_cents INT := 13300;
    listing_130_image_uuids text[] := '{"1d9c1c03-0d32-4fdb-b40c-d6153d5e6467", "249b557a-233a-42c7-8608-15c450849512"}';
    listing_130_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>The ginkgo is one of the oldest tree families on Earth, dating back to the age of the dinosaurs. Ginkgo biloba, native to China, has long been used in traditional medicine, including for asthma and other allergic reactions.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze. The posts are 925 silver.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>0.6&quot; long x 0.75&quot; wide</li></ul>"
        }
    ]';

    listing_131_id INT := 131;
    listing_131_short_id VARCHAR := 'GLJ6G';
    listing_131_shop_id INT := shop_11_id;
    listing_131_category_id VARCHAR := 'EARRINGS';
    listing_131_country_code CHAR(2) := shop_11_country_code;
    listing_131_title VARCHAR := 'Ginkgo Earrings - Pearl Drop';
    listing_131_subtitle VARCHAR := 'Bronze ginkgo leaf earrings with white freshwater pearl drops.';
    listing_131_price_cents INT := 17700;
    listing_131_image_uuids text[] := '{"2f8d4186-f7b2-4b5a-9bbd-6b7859c9e775", "08621af6-cdf0-4d6a-bb7b-9e0b89bd0c87"}';
    listing_131_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>The ginkgo is one of the oldest tree families on Earth, dating back to the age of the dinosaurs. Ginkgo biloba, native to China, has long been used in traditional medicine, including for asthma and other allergic reactions.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze with white freshwater pearls. The wires are 925 silver.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>0.8&quot; long</li></ul>"
        }
    ]';

    listing_132_id INT := 132;
    listing_132_short_id VARCHAR := 'GE82K';
    listing_132_shop_id INT := shop_11_id;
    listing_132_category_id VARCHAR := 'EARRINGS';
    listing_132_country_code CHAR(2) := shop_11_country_code;
    listing_132_title VARCHAR := 'Fine Ginkgo Earrings - Double Leaf';
    listing_132_subtitle VARCHAR := 'Double-leaf ginkgo earrings cast in sterling silver with a 24K gold finish.';
    listing_132_price_cents INT := 29700;
    listing_132_image_uuids text[] := '{"7a69d302-200e-48fd-bfc7-3d56f7a7aa8c", "6d432a2d-2b8a-4907-8bb4-e82fbd72950c"}';
    listing_132_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>From the Ginkgo Fine Jewelry Collection.</p><p>The ginkgo is one of the oldest tree families on Earth, dating back to the age of the dinosaurs. Ginkgo biloba, native to China, has long been used in traditional medicine, including for asthma and other allergic reactions.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in sterling silver with a 24K gold finish.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>1&quot; long</li></ul>"
        }
    ]';

    listing_133_id INT := 133;
    listing_133_short_id VARCHAR := 'G668G';
    listing_133_shop_id INT := shop_11_id;
    listing_133_category_id VARCHAR := 'NECKLACES';
    listing_133_country_code CHAR(2) := shop_11_country_code;
    listing_133_title VARCHAR := 'Ginkgo Necklace - Contour';
    listing_133_subtitle VARCHAR := 'A hand-patinated bronze necklace of ginkgo leaves following the curve of the neck.';
    listing_133_price_cents INT := 22700;
    listing_133_image_uuids text[] := '{"6f2b262b-1b1f-443a-8ace-b6031e7978e9", "48317aab-517c-489a-b30d-928b46eb9ee5"}';
    listing_133_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>The ginkgo is one of the oldest tree families on Earth, dating back to the age of the dinosaurs. Ginkgo biloba, native to China, has long been used in traditional medicine, including for asthma and other allergic reactions.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in hand-patinated bronze.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>16&quot; to 17&quot; long (adjustable)</li></ul>"
        }
    ]';

    listing_134_id INT := 134;
    listing_134_short_id VARCHAR := 'G32LK';
    listing_134_shop_id INT := shop_11_id;
    listing_134_category_id VARCHAR := 'ACCESSORIES';
    listing_134_country_code CHAR(2) := shop_11_country_code;
    listing_134_title VARCHAR := 'Fine Ginkgo Silver Brooch';
    listing_134_subtitle VARCHAR := 'A ginkgo leaf brooch cast in sterling silver.';
    listing_134_price_cents INT := 26700;
    listing_134_image_uuids text[] := '{"19db6628-2675-483c-8c25-3e076e52dea6"}';
    listing_134_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>From the Ginkgo Fine Jewelry Collection.</p><p>The ginkgo is one of the oldest tree families on Earth, dating back to the age of the dinosaurs. Ginkgo biloba, native to China, has long been used in traditional medicine, including for asthma and other allergic reactions.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in sterling silver.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>1.5&quot; to 2&quot;</li></ul>"
        }
    ]';

    listing_135_id INT := 135;
    listing_135_short_id VARCHAR := 'GD76K';
    listing_135_shop_id INT := shop_11_id;
    listing_135_category_id VARCHAR := 'EARRINGS';
    listing_135_country_code CHAR(2) := shop_11_country_code;
    listing_135_title VARCHAR := 'Ginkgo Earrings - Triple Leaf';
    listing_135_subtitle VARCHAR := 'Bronze triple-leaf ginkgo earrings on sterling silver wires.';
    listing_135_price_cents INT := 20800;
    listing_135_image_uuids text[] := '{"b61f1a4a-6efd-4c29-8bf4-7c9e76acc5b2", "62f7c34d-6fa0-4816-b960-87106748d875"}';
    listing_135_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>The ginkgo is one of the oldest tree families on Earth, dating back to the age of the dinosaurs. Ginkgo biloba, native to China, has long been used in traditional medicine, including for asthma and other allergic reactions.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze with 925 silver wires.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>1.25&quot; long</li></ul>"
        }
    ]';

    listing_136_id INT := 136;
    listing_136_short_id VARCHAR := 'K4J6K';
    listing_136_shop_id INT := shop_12_id;
    listing_136_category_id VARCHAR := 'NECKLACES';
    listing_136_country_code CHAR(2) := shop_12_country_code;
    listing_136_title VARCHAR := 'The Providence Cross';
    listing_136_subtitle VARCHAR := 'A die-struck sterling silver cross.';
    listing_136_price_cents INT := 2000;
    listing_136_image_uuids text[] := '{"0a4a355f-3527-4ca0-82c6-3f2b11aa915a", "71919040-ab6e-42a2-9a4c-d6ca734c6375"}';
    listing_136_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>A timeless cross, die-struck from solid sterling silver using traditional techniques that create unmatched strength, clarity, and presence. Clean, balanced proportions are paired with subtle engraved texture and radiant detailing at the center, so it feels both classic and distinctive.</p><p>A symbol of faith, guidance, and devotion, made to be worn daily.</p>"
        },
        {
            "title": "Materials",
            "richText": "<ul><li>Solid sterling silver (925)</li><li>Die-struck using traditional methods</li><li>Made in Harrisonburg, Virginia</li></ul>"
        },
        {
            "title": "Chain",
            "richText": "<p>Sold without a chain, so you can choose your preferred style and length.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>27 mm x 16 mm</li><li>Code: CR013</li></ul>"
        }
    ]';

    listing_137_id INT := 137;
    listing_137_short_id VARCHAR := 'K975K';
    listing_137_shop_id INT := shop_12_id;
    listing_137_category_id VARCHAR := 'RINGS';
    listing_137_country_code CHAR(2) := shop_12_country_code;
    listing_137_title VARCHAR := 'Starlace';
    listing_137_subtitle VARCHAR := 'A slim die-rolled band of starbursts and circles.';
    listing_137_price_cents INT := 25500;
    listing_137_image_uuids text[] := '{}';
    listing_137_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>A delicate engraved wedding band inspired by starlight and floral lacework. Soft circular accents framed by starburst engravings repeat around the band, pressed into the metal with antique die-rolling machinery for depth and crisp texture in a slender silhouette. Light enough for every day, it works as a wedding band, stacking ring or anniversary band.</p>"
    },
    {
        "title": "Symbolism",
        "richText": "<p>The starbursts stand for guidance, hope and the small moments of light along a shared journey. The repeating circles represent continuity, connection and enduring love.</p>"
    },
    {
        "title": "Materials",
        "richText": "<ul><li>Available in: Sterling Silver / 14k Yellow Gold / 14k Rose Gold / 14k White Gold / 18k Yellow Gold / Platinum</li><li>Die-struck using antique machinery, which compresses the metal for sharper detail and a denser, stronger ring than casting.</li><li>Made in the Hugo Kohl workshop in Harrisonburg, Virginia</li></ul>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>1.75 mm wide x 1.75 mm thick</li></ul>"
    }
]';

    listing_138_id INT := 138;
    listing_138_short_id VARCHAR := 'G5L3K';
    listing_138_shop_id INT := shop_12_id;
    listing_138_category_id VARCHAR := 'BRACELETS';
    listing_138_country_code CHAR(2) := shop_12_country_code;
    listing_138_title VARCHAR := 'Cosmos Cuff';
    listing_138_subtitle VARCHAR := 'A symmetrical 16 mm die-rolled cuff of cosmos blossoms.';
    listing_138_price_cents INT := 32500;
    listing_138_image_uuids text[] := '{}';
    listing_138_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>A cuff designed around symmetry and flow. At 16 mm wide it has a confident presence while staying clean and composed. Cosmos blossoms repeat down the center, framed by finely engraved scrollwork and linear texture, so the pattern feels measured and rhythmic rather than busy.</p>"
    },
    {
        "title": "Symbolism",
        "richText": "<p>The cosmos flower stands for harmony, balance and order, a reflection of stability, clarity and quiet confidence.</p>"
    },
    {
        "title": "Materials",
        "richText": "<ul><li>Available in: Sterling Silver / 14k Yellow Gold-Filled / 14k Rose Gold-Filled / 14k White Gold / 14k Rose Gold / 14k Yellow Gold</li><li>Die-rolled using traditional techniques for crisp, lasting detail.</li><li>Made in the Hugo Kohl workshop in Harrisonburg, Virginia</li><li>Available in sizes XXS to XXL</li></ul>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>16 mm wide</li></ul>"
    }
]';

    listing_139_id INT := 139;
    listing_139_short_id VARCHAR := 'G29EK';
    listing_139_shop_id INT := shop_12_id;
    listing_139_category_id VARCHAR := 'RINGS';
    listing_139_country_code CHAR(2) := shop_12_country_code;
    listing_139_title VARCHAR := 'Eternal Love';
    listing_139_subtitle VARCHAR := 'A 3 mm cast floral wedding band with beaded borders.';
    listing_139_price_cents INT := 25500;
    listing_139_image_uuids text[] := '{}';
    listing_139_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>A delicate, vintage-inspired wedding band with a continuous botanical pattern of petite flowers and intertwining foliage. Finely beaded borders frame both edges. Recessed details add depth to the blossoms, leaves and stems.</p>"
    },
    {
        "title": "Symbolism",
        "richText": "<p>The continuous floral pattern represents a love that keeps growing through every season. Blossoms and intertwining leaves evoke devotion, growth and lasting connection.</p>"
    },
    {
        "title": "Materials",
        "richText": "<ul><li>Available in: 14k Yellow Gold / 14k White Gold / 14k Rose Gold / Sterling Silver</li><li>Unlike the die-struck bands, Eternal Love is cast, then finished by hand in the workshop.</li><li>Made in the Hugo Kohl workshop in Harrisonburg, Virginia</li></ul>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>3 mm wide x 2 mm thick</li></ul>"
    }
]';

    listing_140_id INT := 140;
    listing_140_short_id VARCHAR := 'G749K';
    listing_140_shop_id INT := shop_12_id;
    listing_140_category_id VARCHAR := 'BRACELETS';
    listing_140_country_code CHAR(2) := shop_12_country_code;
    listing_140_title VARCHAR := 'Allure Cuff';
    listing_140_subtitle VARCHAR := 'A 14 mm die-rolled cuff with anemone and dogwood blossoms.';
    listing_140_price_cents INT := 32500;
    listing_140_image_uuids text[] := '{}';
    listing_140_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>A cuff that draws the eye without overwhelming it. At 14 mm wide it is bold enough to make a statement and refined enough for every day. A central anemone anchors the design, framed by dogwood blossoms, flowing hearts and Victorian scrollwork.</p>"
    },
    {
        "title": "Symbolism",
        "richText": "<p>Anemone stands for protection, trust and anticipation, and dogwood for strength and resilience. The hearts and scrollwork represent love, connection and continuity.</p>"
    },
    {
        "title": "Materials",
        "richText": "<ul><li>Available in: Sterling Silver / 14k Yellow Gold-Filled / 14k Rose Gold-Filled / 14k White Gold / 14k Yellow Gold / 14k Rose Gold</li><li>Die-rolled using traditional techniques for crisp, lasting detail.</li><li>Made in the Hugo Kohl workshop in Harrisonburg, Virginia</li><li>Available in sizes XXS to XXL</li></ul>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>14 mm wide</li></ul>"
    }
]';

    listing_141_id INT := 141;
    listing_141_short_id VARCHAR := 'GJJ7G';
    listing_141_shop_id INT := shop_12_id;
    listing_141_category_id VARCHAR := 'RINGS';
    listing_141_country_code CHAR(2) := shop_12_country_code;
    listing_141_title VARCHAR := 'Clematis';
    listing_141_subtitle VARCHAR := 'A 5 mm die-struck wedding band of climbing clematis blossoms.';
    listing_141_price_cents INT := 35500;
    listing_141_image_uuids text[] := '{}';
    listing_141_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>A floral band made to become an heirloom. A continuous motif inspired by the climbing clematis vine repeats around the band, framed by finely engraved borders. Rich texture and crisp die-struck detail give it depth, and its medium width stands well on its own or stacked.</p>"
    },
    {
        "title": "Symbolism",
        "richText": "<p>The clematis flower is associated with ingenuity, creativity and aspiration. The continuous pattern represents growth, resilience and lives intertwined over time.</p>"
    },
    {
        "title": "Materials",
        "richText": "<ul><li>Available in: Sterling Silver / 14k Yellow Gold / 14k White Gold / 14k Rose Gold / 18k Yellow Gold / Platinum</li><li>Entirely die-struck on antique machinery for exceptional strength and detail compared with cast jewelry.</li><li>Made in the Hugo Kohl workshop in Harrisonburg, Virginia</li></ul>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>5 mm wide x 2.2 mm thick</li></ul>"
    }
]';

    listing_142_id INT := 142;
    listing_142_short_id VARCHAR := 'K85JG';
    listing_142_shop_id INT := shop_12_id;
    listing_142_category_id VARCHAR := 'RINGS';
    listing_142_country_code CHAR(2) := shop_12_country_code;
    listing_142_title VARCHAR := 'Mirelle';
    listing_142_subtitle VARCHAR := 'A 4 mm die-rolled band of floral and geometric motifs.';
    listing_142_price_cents INT := 25500;
    listing_142_image_uuids text[] := '{}';
    listing_142_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>A richly detailed band that blends flowing floral motifs with geometric ornamentation, inspired by vintage engraving. Alternating motifs wrap continuously around the ring inside a crisp engraved border, with a smooth, comfortable fit for daily wear.</p>"
    },
    {
        "title": "Symbolism",
        "richText": "<p>The floral elements symbolize growth, renewal and lasting beauty, and the geometric forms balance and stability, together suggesting devotion and a life built in harmony.</p>"
    },
    {
        "title": "Materials",
        "richText": "<ul><li>Available in: Sterling Silver / 14k Yellow Gold / 14k Rose Gold / 14k White Gold</li><li>Die-rolled on antique machinery, which compresses the metal for sharper engraving and greater density than cast jewelry.</li><li>Made in the Hugo Kohl workshop in Harrisonburg, Virginia</li></ul>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>4 mm wide x 2 mm thick</li></ul>"
    }
]';

    listing_143_id INT := 143;
    listing_143_short_id VARCHAR := 'GL66G';
    listing_143_shop_id INT := shop_12_id;
    listing_143_category_id VARCHAR := 'RINGS';
    listing_143_country_code CHAR(2) := shop_12_country_code;
    listing_143_title VARCHAR := 'Petite Orange Blossom';
    listing_143_subtitle VARCHAR := 'A slender die-struck band of orange blossoms.';
    listing_143_price_cents INT := 25500;
    listing_143_image_uuids text[] := '{}';
    listing_143_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>A delicate wedding band celebrating love in its purest form. A continuous row of finely detailed orange blossoms wraps the ring, framed by milgrain edges. Slim and lightweight, it is lovely worn alone, stacked, or paired with an engagement ring.</p>"
    },
    {
        "title": "Symbolism",
        "richText": "<p>Orange blossoms have been a wedding flower for centuries, associated with purity, fidelity, fertility and everlasting love.</p>"
    },
    {
        "title": "Materials",
        "richText": "<ul><li>Available in: Sterling Silver / 14k Yellow Gold / 14k White Gold / 14k Rose Gold / 18k Yellow Gold / Platinum</li><li>Die-struck and hand-finished in the workshop.</li><li>Made in the Hugo Kohl workshop in Harrisonburg, Virginia</li></ul>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>2.5 mm wide x 2 mm thick</li></ul>"
    }
]';

    listing_144_id INT := 144;
    listing_144_short_id VARCHAR := 'GED22';
    listing_144_shop_id INT := shop_12_id;
    listing_144_category_id VARCHAR := 'RINGS';
    listing_144_country_code CHAR(2) := shop_12_country_code;
    listing_144_title VARCHAR := 'Dragonfly';
    listing_144_subtitle VARCHAR := 'A 7 mm die-struck band of engraved dragonflies.';
    listing_144_price_cents INT := 35500;
    listing_144_image_uuids text[] := '{}';
    listing_144_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>A substantial band with dragonflies gliding around the ring among botanical elements and textured backgrounds. The pattern gives visual movement and depth from every angle, bold enough to stand alone and refined enough for every day.</p>"
    },
    {
        "title": "Symbolism",
        "richText": "<p>Dragonflies are widely seen as symbols of good luck, happiness, transformation and new beginnings, a reminder to embrace change.</p>"
    },
    {
        "title": "Materials",
        "richText": "<ul><li>Available in: Sterling Silver / 14k Yellow Gold / 14k White Gold / 14k Rose Gold / 18k Yellow Gold / Platinum</li><li>Die-struck by compressing solid metal under immense pressure, for exceptional strength and crisp detail.</li><li>Made in the Hugo Kohl workshop in Harrisonburg, Virginia</li></ul>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>7 mm wide x 2 mm thick</li></ul>"
    }
]';

    listing_145_id INT := 145;
    listing_145_short_id VARCHAR := 'G68L8';
    listing_145_shop_id INT := shop_12_id;
    listing_145_category_id VARCHAR := 'BRACELETS';
    listing_145_country_code CHAR(2) := shop_12_country_code;
    listing_145_title VARCHAR := 'Charm Cuff';
    listing_145_subtitle VARCHAR := 'A 15 mm Victorian-inspired die-rolled cuff.';
    listing_145_price_cents INT := 32500;
    listing_145_image_uuids text[] := '{}';
    listing_145_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>A balanced, Victorian-inspired cuff with a richly engraved chrysanthemum daisy at its center. At 15 mm wide it sits between bold and refined. A continuous die-rolled pattern of scrollwork and vintage motifs gives depth, contrast and movement across the cuff.</p>"
    },
    {
        "title": "Symbolism",
        "richText": "<p>The chrysanthemum daisy stands for joy, innocence and bliss, fleur-de-lis for honor and truth, and anemones for protection. Scrolling hearts and acanthus leaves add enduring love and growth.</p>"
    },
    {
        "title": "Materials",
        "richText": "<ul><li>Available in: Sterling Silver / 14k Yellow Gold-Filled / 14k Rose Gold-Filled / 14k White Gold / 14k Yellow Gold / 14k Rose Gold</li><li>Die-rolled using traditional techniques for crisp, lasting detail.</li><li>Made in the Hugo Kohl workshop in Harrisonburg, Virginia</li><li>Available in sizes XXS to XXL</li></ul>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>15 mm wide</li></ul>"
    }
]';

    listing_146_id INT := 146;
    listing_146_short_id VARCHAR := 'G387L';
    listing_146_shop_id INT := shop_12_id;
    listing_146_category_id VARCHAR := 'RINGS';
    listing_146_country_code CHAR(2) := shop_12_country_code;
    listing_146_title VARCHAR := 'Astria';
    listing_146_subtitle VARCHAR := 'A 3.5 mm die-rolled band of star-flower engravings.';
    listing_146_price_cents INT := 25500;
    listing_146_image_uuids text[] := '{}';
    listing_146_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>A floral-engraved band inspired by guiding stars and blooming growth. A repeating star-flower motif is pressed directly into solid metal, giving crisp, deep detail in a balanced, comfortable profile that is both celestial and botanical.</p>"
    },
    {
        "title": "Symbolism",
        "richText": "<p>The star-flower motif symbolizes guidance, growth, hope and the steady light that leads two lives forward together.</p>"
    },
    {
        "title": "Materials",
        "richText": "<ul><li>Available in: Sterling Silver / 14k Yellow Gold / 14k Rose Gold / 14k White Gold / 18k Yellow Gold / Platinum</li><li>Die-rolled on antique machinery, which compresses and strengthens the metal. Made in small batches.</li><li>Made in the Hugo Kohl workshop in Harrisonburg, Virginia</li></ul>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>3.5 mm wide x 2 mm thick</li></ul>"
    }
]';

    listing_147_id INT := 147;
    listing_147_short_id VARCHAR := 'GD5E6';
    listing_147_shop_id INT := shop_12_id;
    listing_147_category_id VARCHAR := 'NECKLACES';
    listing_147_country_code CHAR(2) := shop_12_country_code;
    listing_147_title VARCHAR := 'Heritage Cross';
    listing_147_subtitle VARCHAR := 'An ornate cast sterling silver cross pendant.';
    listing_147_price_cents INT := 5000;
    listing_147_image_uuids text[] := '{"f3568eb1-a95a-4133-a104-21641fe0aea7", "b505712c-0749-465b-9fdf-f373b34601d4"}';
    listing_147_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>An ornate cross pendant that honors tradition with refined detail. Intricate scrollwork and balanced proportions draw on antique influences, with flowing lines and engraved textures. A subtle circular focal point anchors the center, and the polished finish brings out every carved detail.</p>"
    },
    {
        "title": "Materials",
        "richText": "<ul><li>Cast in solid sterling silver (925), in small batches</li><li>Made in the Hugo Kohl workshop in Harrisonburg, Virginia</li><li>Sold without a chain, so you can choose your own style and length</li></ul>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>48 mm x 32 mm</li></ul>"
    }
]';

    listing_148_id INT := 148;
    listing_148_short_id VARCHAR := 'K4DL6';
    listing_148_shop_id INT := shop_12_id;
    listing_148_category_id VARCHAR := 'RINGS';
    listing_148_country_code CHAR(2) := shop_12_country_code;
    listing_148_title VARCHAR := 'Allure Ring';
    listing_148_subtitle VARCHAR := 'A wide die-rolled bracelet ring with an optional 2 mm stone.';
    listing_148_price_cents INT := 25000;
    listing_148_image_uuids text[] := '{}';
    listing_148_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>A bold floral ring built from classic botanical motifs. A radiant anemone sits at the center, framed by dogwood blossoms and flowing hearts. Layered die-rolled detail gives depth and texture, and an optional 2 mm round gemstone or lab diamond adds a delicate focal point.</p>"
    },
    {
        "title": "Symbolism",
        "richText": "<p>Anemone represents trust, anticipation and protection, and dogwood strength and enduring love. The hearts reflect connection and devotion.</p>"
    },
    {
        "title": "Materials",
        "richText": "<ul><li>Metal: Sterling Silver</li><li>Die-rolled on antique machinery, then hand-finished in the workshop.</li><li>Made in the Hugo Kohl workshop in Harrisonburg, Virginia</li><li>Choose a 2 mm lab-grown or natural stone, or no stone</li></ul>"
    }
]';

    listing_149_id INT := 149;
    listing_149_short_id VARCHAR := 'K93E5';
    listing_149_shop_id INT := shop_12_id;
    listing_149_category_id VARCHAR := 'RINGS';
    listing_149_country_code CHAR(2) := shop_12_country_code;
    listing_149_title VARCHAR := 'Enlightened Love Ring';
    listing_149_subtitle VARCHAR := 'A wide die-rolled bracelet ring with an optional 2 mm stone.';
    listing_149_price_cents INT := 25000;
    listing_149_image_uuids text[] := '{}';
    listing_149_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>A richly detailed ring that blends Victorian ornamentation with floral symbolism. A framed anemone is surrounded by acanthus leaves and scrollwork, with dramatic contrast and dimension. An optional 2 mm round gemstone or lab diamond adds a vivid focal point.</p>"
    },
    {
        "title": "Symbolism",
        "richText": "<p>Anemone symbolizes trust, sincerity and protection, and acanthus leaves wisdom, renewal and lasting strength.</p>"
    },
    {
        "title": "Materials",
        "richText": "<ul><li>Metal: Sterling Silver</li><li>Die-rolled on antique machinery, then hand-finished in the workshop.</li><li>Made in the Hugo Kohl workshop in Harrisonburg, Virginia</li><li>Choose a 2 mm lab-grown or natural stone, or no stone</li></ul>"
    }
]';

    listing_150_id INT := 150;
    listing_150_short_id VARCHAR := 'G5E83';
    listing_150_shop_id INT := shop_12_id;
    listing_150_category_id VARCHAR := 'RINGS';
    listing_150_country_code CHAR(2) := shop_12_country_code;
    listing_150_title VARCHAR := 'Charm Ring';
    listing_150_subtitle VARCHAR := 'A die-struck bracelet ring with a chrysanthemum daisy.';
    listing_150_price_cents INT := 25000;
    listing_150_image_uuids text[] := '{}';
    listing_150_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>The intricate beauty of a charm bracelet as a bold statement ring. A chrysanthemum daisy blooms in a circular frame at the center, surrounded by scrollwork, fleur-de-lis, anemones, scrolling hearts and acanthus leaves. An optional accent stone can be set in the center of the daisy.</p>"
    },
    {
        "title": "Symbolism",
        "richText": "<p>The daisy symbolizes innocence, happiness and bliss, fleur-de-lis honor and truth, and anemones protection. Hearts and acanthus add enduring love and resilience.</p>"
    },
    {
        "title": "Materials",
        "richText": "<ul><li>Metal: Sterling Silver</li><li>Die-struck with the same historic tooling and techniques as the Charm cuff bracelet.</li><li>Made in the Hugo Kohl workshop in Harrisonburg, Virginia</li><li>Choose a 2 mm lab-grown or natural stone, or no stone</li></ul>"
    }
]';

    listing_151_id INT := 151;
    listing_151_short_id VARCHAR := 'G232E';
    listing_151_shop_id INT := shop_12_id;
    listing_151_category_id VARCHAR := 'BRACELETS';
    listing_151_country_code CHAR(2) := shop_12_country_code;
    listing_151_title VARCHAR := 'Enlightened Love Cuff';
    listing_151_subtitle VARCHAR := 'A slim 11.5 mm die-rolled cuff with a framed anemone.';
    listing_151_price_cents INT := 32500;
    listing_151_image_uuids text[] := '{}';
    listing_151_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>The most delicate of the engraved cuffs, for those who prefer subtle detail. At just 11.5 mm wide it has a slimmer profile while still showing the depth of die-rolled engraving. A framed anemone sits at the center among acanthus leaves and fine Victorian scrollwork.</p>"
    },
    {
        "title": "Symbolism",
        "richText": "<p>Anemone stands for protection, trust and anticipation, and acanthus leaves for enduring life, wisdom and growth, together suggesting quiet strength and lasting connection.</p>"
    },
    {
        "title": "Materials",
        "richText": "<ul><li>Available in: Sterling Silver / 14k Yellow Gold-Filled / 14k Rose Gold-Filled / 14k White Gold / 14k Yellow Gold / 14k Rose Gold</li><li>Die-rolled using traditional techniques for sharp, consistent engraving.</li><li>Made in the Hugo Kohl workshop in Harrisonburg, Virginia</li><li>Available in sizes XXS to XXL</li></ul>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>11.5 mm wide</li></ul>"
    }
]';

    listing_152_id INT := 152;
    listing_152_short_id VARCHAR := 'G78L9';
    listing_152_shop_id INT := shop_12_id;
    listing_152_category_id VARCHAR := 'BRACELETS';
    listing_152_country_code CHAR(2) := shop_12_country_code;
    listing_152_title VARCHAR := 'Enduring Love Cuff';
    listing_152_subtitle VARCHAR := 'A refined 14.3 mm die-rolled cuff centered on a dogwood flower.';
    listing_152_price_cents INT := 32500;
    listing_152_image_uuids text[] := '{}';
    listing_152_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>A finely engraved Victorian pattern centered on the dogwood flower. Slightly slimmer than the bold statement cuffs, at 14.3 mm wide it balances presence and everyday wearability, with scrollwork and delicate texture creating depth and movement.</p>"
    },
    {
        "title": "Symbolism",
        "richText": "<p>Dogwood represents strength and endurance, a reminder of lasting love and resilience through time.</p>"
    },
    {
        "title": "Materials",
        "richText": "<ul><li>Available in: Sterling Silver / 14k Yellow Gold-Filled / 14k Rose Gold-Filled / 14k White Gold / 14k Yellow Gold / 14k Rose Gold</li><li>Die-rolled using traditional techniques for crisp, consistent engraving.</li><li>Made in the Hugo Kohl workshop in Harrisonburg, Virginia</li><li>Available in sizes XXS to XXL</li></ul>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>14.3 mm wide</li></ul>"
    }
]';

    listing_153_id INT := 153;
    listing_153_short_id VARCHAR := 'GJ837';
    listing_153_shop_id INT := shop_12_id;
    listing_153_category_id VARCHAR := 'RINGS';
    listing_153_country_code CHAR(2) := shop_12_country_code;
    listing_153_title VARCHAR := 'Fernline';
    listing_153_subtitle VARCHAR := 'An ultra-slim die-rolled band of fern fronds.';
    listing_153_price_cents INT := 25500;
    listing_153_image_uuids text[] := '{}';
    listing_153_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>A delicate engraved band inspired by woodland textures and pressed ferns. A repeating botanical motif is arranged in small geometric panels, each pressed into the metal with antique die-rolling machinery. Minimal yet richly detailed, it suits a wedding band, stacking ring or anniversary band.</p>"
    },
    {
        "title": "Symbolism",
        "richText": "<p>Ferns traditionally symbolize resilience, quiet growth and renewal, a meaningful symbol of partnership and lasting love.</p>"
    },
    {
        "title": "Materials",
        "richText": "<ul><li>Available in: Sterling Silver / 14k Yellow Gold / 14k Rose Gold / 14k White Gold / 18k Yellow Gold / Platinum</li><li>Die-rolled using historic techniques that imprint the pattern directly into solid metal.</li><li>Made in the Hugo Kohl workshop in Harrisonburg, Virginia</li></ul>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>1.75 mm wide x 1.75 mm thick</li></ul>"
    }
]';

    listing_154_id INT := 154;
    listing_154_short_id VARCHAR := 'K8ELJ';
    listing_154_shop_id INT := shop_12_id;
    listing_154_category_id VARCHAR := 'RINGS';
    listing_154_country_code CHAR(2) := shop_12_country_code;
    listing_154_title VARCHAR := 'Elysian';
    listing_154_subtitle VARCHAR := 'A slim die-rolled band of flowing florals.';
    listing_154_price_cents INT := 25500;
    listing_154_image_uuids text[] := '{}';
    listing_154_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>A timeless floral band inspired by botanical motifs and vintage ornamental engraving. Delicate florals weave continuously around the ring for a soft sense of movement in a refined, minimalist silhouette, worn alone, stacked, or alongside an engagement ring.</p>"
    },
    {
        "title": "Symbolism",
        "richText": "<p>Floral motifs traditionally symbolize growth, harmony, renewal and lasting beauty, with connection and balance in the flowing pattern.</p>"
    },
    {
        "title": "Materials",
        "richText": "<ul><li>Available in: Sterling Silver / 14k Yellow Gold / 14k Rose Gold / 14k White Gold / 18k Yellow Gold / Platinum</li><li>Die-rolled on antique machinery for strength and crisp detail, then hand-finished in the workshop.</li><li>Made in the Hugo Kohl workshop in Harrisonburg, Virginia</li></ul>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>1.75 mm wide x 1.75 mm thick</li></ul>"
    }
]';

    listing_155_id INT := 155;
    listing_155_short_id VARCHAR := 'GLL36';
    listing_155_shop_id INT := shop_12_id;
    listing_155_category_id VARCHAR := 'BRACELETS';
    listing_155_country_code CHAR(2) := shop_12_country_code;
    listing_155_title VARCHAR := 'Aphrodite Cuff';
    listing_155_subtitle VARCHAR := 'A 16 mm die-rolled cuff centered on a six-petal rosette.';
    listing_155_price_cents INT := 32500;
    listing_155_image_uuids text[] := '{}';
    listing_155_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>A cuff drawn from ancient symbolism, centered on the six-petal rosette long associated with the goddess of love. At 16 mm wide it has a strong, grounded presence with refined detail. Structured engraving and fine ornamental texture give it a more architectural layout than the softer floral cuffs.</p>"
    },
    {
        "title": "Symbolism",
        "richText": "<p>The six-petal rosette, the Flower of Aphrodite, stands for love, protection, family and home: protective, enduring, foundational love.</p>"
    },
    {
        "title": "Materials",
        "richText": "<ul><li>Available in: Sterling Silver / 14k Yellow Gold-Filled / 14k Rose Gold-Filled / 14k White Gold / 14k Yellow Gold / 14k Rose Gold</li><li>Die-rolled using traditional techniques for crisp, lasting detail.</li><li>Made in the Hugo Kohl workshop in Harrisonburg, Virginia</li><li>Available in sizes XXS to XXL</li></ul>"
    },
    {
        "title": "Dimensions",
        "richText": "<ul><li>16 mm wide</li></ul>"
    }
]';

    listing_156_id INT := 156;
    listing_156_short_id VARCHAR := 'GEDD2';
    listing_156_shop_id INT := shop_9_id;
    listing_156_category_id VARCHAR := 'NECKLACES';
    listing_156_country_code CHAR(2) := shop_9_country_code;
    listing_156_title VARCHAR := 'Unbreakable Talisman';
    listing_156_subtitle VARCHAR := 'A raven talisman for enduring hardship while staying true to yourself.';
    listing_156_price_cents INT := 33000;
    listing_156_image_uuids text[] := '{}';
    listing_156_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>This talisman is inscribed Flecti Non Frangi, Latin for To Be Bent Not Broken. It speaks to someone who can endure hardship and still remain true to themselves. The raven stands for hope and is believed to see through the darkest times.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
    },
    {
        "title": "Specifications",
        "richText": "<ul><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
    }
]';

    listing_157_id INT := 157;
    listing_157_short_id VARCHAR := 'G6888';
    listing_157_shop_id INT := shop_9_id;
    listing_157_category_id VARCHAR := 'NECKLACES';
    listing_157_country_code CHAR(2) := shop_9_country_code;
    listing_157_title VARCHAR := 'New Beginnings Talisman';
    listing_157_subtitle VARCHAR := 'A crescent moon talisman for turning dreams into reality.';
    listing_157_price_cents INT := 27000;
    listing_157_image_uuids text[] := '{}';
    listing_157_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>The crescent moon on this talisman symbolizes new beginnings and the making of dreams into reality.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
    },
    {
        "title": "Specifications",
        "richText": "<ul><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
    }
]';

    listing_158_id INT := 158;
    listing_158_short_id VARCHAR := 'G388L';
    listing_158_shop_id INT := shop_9_id;
    listing_158_category_id VARCHAR := 'NECKLACES';
    listing_158_country_code CHAR(2) := shop_9_country_code;
    listing_158_title VARCHAR := 'Watch Over Me Talisman';
    listing_158_subtitle VARCHAR := 'A great horned owl talisman that keeps watch over the ones you love.';
    listing_158_price_cents INT := 27000;
    listing_158_image_uuids text[] := '{}';
    listing_158_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>The great horned owl is a warrior bird associated with strength, courage and wisdom. Shown facing forward on this talisman, the owl vigilantly watches over loved ones.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
    },
    {
        "title": "Specifications",
        "richText": "<ul><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
    }
]';

    listing_159_id INT := 159;
    listing_159_short_id VARCHAR := 'GD556';
    listing_159_shop_id INT := shop_9_id;
    listing_159_category_id VARCHAR := 'NECKLACES';
    listing_159_country_code CHAR(2) := shop_9_country_code;
    listing_159_title VARCHAR := 'Heart of the Wolf Talisman';
    listing_159_subtitle VARCHAR := 'A wolf talisman for intelligence, loyalty and deep compassion.';
    listing_159_price_cents INT := 38500;
    listing_159_image_uuids text[] := '{}';
    listing_159_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>This talisman features a wolf, a feared and misunderstood creature known for high intelligence, fierce loyalty and deep compassion.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
    },
    {
        "title": "Specifications",
        "richText": "<ul><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
    }
]';

    listing_160_id INT := 160;
    listing_160_short_id VARCHAR := 'K4DD6';
    listing_160_shop_id INT := shop_9_id;
    listing_160_category_id VARCHAR := 'NECKLACES';
    listing_160_country_code CHAR(2) := shop_9_country_code;
    listing_160_title VARCHAR := 'Struggle and Emerge Talisman';
    listing_160_subtitle VARCHAR := 'A wolf-on-a-mountain talisman celebrating triumph over life’s challenges.';
    listing_160_price_cents INT := 41000;
    listing_160_image_uuids text[] := '{}';
    listing_160_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>This talisman is inscribed Luctor et Emergo, Latin for I Struggle and Emerge. The wolf atop a mountain symbolizes the relief, joy and triumph of the spirit as we rise above life’s challenges.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
    },
    {
        "title": "Specifications",
        "richText": "<ul><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
    }
]';

    listing_161_id INT := 161;
    listing_161_short_id VARCHAR := 'K9335';
    listing_161_shop_id INT := shop_9_id;
    listing_161_category_id VARCHAR := 'NECKLACES';
    listing_161_country_code CHAR(2) := shop_9_country_code;
    listing_161_title VARCHAR := 'Mother Bear Talisman';
    listing_161_subtitle VARCHAR := 'A bear talisman for motherhood and the fierce protection of family.';
    listing_161_price_cents INT := 36000;
    listing_161_image_uuids text[] := '{}';
    listing_161_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>The bear on this talisman is a symbol of motherhood and childbearing, and of ferocity in protecting one’s family.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
    },
    {
        "title": "Specifications",
        "richText": "<ul><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
    }
]';

    listing_162_id INT := 162;
    listing_162_short_id VARCHAR := 'G5EE3';
    listing_162_shop_id INT := shop_9_id;
    listing_162_category_id VARCHAR := 'NECKLACES';
    listing_162_country_code CHAR(2) := shop_9_country_code;
    listing_162_title VARCHAR := 'Hummingbird Talisman';
    listing_162_subtitle VARCHAR := 'A hummingbird talisman, a reminder to find goodness and beauty everywhere.';
    listing_162_price_cents INT := 36000;
    listing_162_image_uuids text[] := '{}';
    listing_162_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>The hummingbird on this talisman is a symbol of lightness and joy, and a reminder to see goodness and beauty in everything.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
    },
    {
        "title": "Specifications",
        "richText": "<ul><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
    }
]';

    listing_163_id INT := 163;
    listing_163_short_id VARCHAR := 'G233E';
    listing_163_shop_id INT := shop_9_id;
    listing_163_category_id VARCHAR := 'NECKLACES';
    listing_163_country_code CHAR(2) := shop_9_country_code;
    listing_163_title VARCHAR := 'Be Here Now Talisman';
    listing_163_subtitle VARCHAR := 'A talisman inscribed in French to live in the present.';
    listing_163_price_cents INT := 36000;
    listing_163_image_uuids text[] := '{}';
    listing_163_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>This talisman is inscribed Ni Regret Du Passé Ni Peur De L’Avenir, French for Neither Regret the Past Nor Fear the Future. It reminds us of the happiness available when we live in the present.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
    },
    {
        "title": "Specifications",
        "richText": "<ul><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
    }
]';

    listing_164_id INT := 164;
    listing_164_short_id VARCHAR := 'G7889';
    listing_164_shop_id INT := shop_9_id;
    listing_164_category_id VARCHAR := 'NECKLACES';
    listing_164_country_code CHAR(2) := shop_9_country_code;
    listing_164_title VARCHAR := 'Devoted Father Talisman';
    listing_164_subtitle VARCHAR := 'A bull talisman honoring the selfless devotion of a father.';
    listing_164_price_cents INT := 43500;
    listing_164_image_uuids text[] := '{}';
    listing_164_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>This talisman is inscribed Sic Vos Non Vobis, Latin for Do It But Not For Yourself. A bull represents fatherhood and the selfless nature of a father’s devotion to his family.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
    },
    {
        "title": "Specifications",
        "richText": "<ul><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
    }
]';

    listing_165_id INT := 165;
    listing_165_short_id VARCHAR := 'GJ887';
    listing_165_shop_id INT := shop_9_id;
    listing_165_category_id VARCHAR := 'NECKLACES';
    listing_165_country_code CHAR(2) := shop_9_country_code;
    listing_165_title VARCHAR := 'Everything For You Talisman';
    listing_165_subtitle VARCHAR := 'A sun, moon and stars talisman for love without limits.';
    listing_165_price_cents INT := 38500;
    listing_165_image_uuids text[] := '{}';
    listing_165_full_descr JSONB := '[
    {
        "title": "Details",
        "richText": "<p>This talisman is inscribed J’les Conjure Tous Pour Votre Bonheur, French for I Conjure Them All for Your Happiness. The sun, moon and stars represent love without limits.</p><p>Available in sterling silver or bronze. Each talisman is lost-wax cast and arrives with a letterpress meaning card, a black cotton Pyrrha pouch, and a gift box made from 100% recycled paper.</p>"
    },
    {
        "title": "Specifications",
        "richText": "<ul><li>Sustainably cast in 100% recycled sterling silver or bronze</li><li>Lovingly handcrafted in Vancouver, Canada</li></ul>"
    }
]';

    listing_166_id INT := 166;
    listing_166_short_id VARCHAR := 'K8EEJ';
    listing_166_shop_id INT := shop_11_id;
    listing_166_category_id VARCHAR := 'EARRINGS';
    listing_166_country_code CHAR(2) := shop_11_country_code;
    listing_166_title VARCHAR := 'Pea Pod Earrings - Petite Drop';
    listing_166_subtitle VARCHAR := 'Petite bronze pea pod drop earrings with white freshwater pearls.';
    listing_166_price_cents INT := 16300;
    listing_166_image_uuids text[] := '{"200cce57-38bc-48e2-b1ad-d875a82f0571", "a996063e-71ab-4eda-b4ec-f3c2114ba1a5"}';
    listing_166_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Peas are cool-weather annuals that mature early, and botanists classify the &ldquo;peas&rdquo; inside the pod as berries. Folklore has it that the Pennsylvania Germans planted peas under the sign of Gemini, hoping for two for one and double pods.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze with white freshwater pearls. The wires are 24kt gold over 925 silver.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>1.1&quot; long</li></ul>"
        }
    ]';

    listing_167_id INT := 167;
    listing_167_short_id VARCHAR := 'GLLL6';
    listing_167_shop_id INT := shop_11_id;
    listing_167_category_id VARCHAR := 'NECKLACES';
    listing_167_country_code CHAR(2) := shop_11_country_code;
    listing_167_title VARCHAR := 'Pea Pod Pendant - 3 Pearls';
    listing_167_subtitle VARCHAR := 'A bronze pea pod pendant with three white freshwater pearls.';
    listing_167_price_cents INT := 17400;
    listing_167_image_uuids text[] := '{"9605ad2f-b7d0-445b-9996-bf4189526b1c", "39beee71-ee77-4e8a-bbc7-d9f344060a88"}';
    listing_167_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Peas are cool-weather annuals that mature early, and botanists classify the &ldquo;peas&rdquo; inside the pod as berries. Folklore has it that the Pennsylvania Germans planted peas under the sign of Gemini, hoping for two for one and double pods.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze with 3 white freshwater pearls, on a brass chain.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Chain: 17&quot; to 18&quot; long (adjustable)</li><li>Pendant: 1.5&quot; long</li></ul>"
        }
    ]';

    listing_168_id INT := 168;
    listing_168_short_id VARCHAR := 'GEDJ2';
    listing_168_shop_id INT := shop_11_id;
    listing_168_category_id VARCHAR := 'EARRINGS';
    listing_168_country_code CHAR(2) := shop_11_country_code;
    listing_168_title VARCHAR := 'Pea Pod Earrings - Post';
    listing_168_subtitle VARCHAR := 'Bronze pea pod post earrings, each with a single white freshwater pearl.';
    listing_168_price_cents INT := 13900;
    listing_168_image_uuids text[] := '{"89aa8b0c-fe2c-4def-955b-f08d70f77d97", "858c4f4a-78df-4811-aff9-4da0b55bc2cf"}';
    listing_168_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Peas are cool-weather annuals that mature early, and botanists classify the &ldquo;peas&rdquo; inside the pod as berries. Folklore has it that the Pennsylvania Germans planted peas under the sign of Gemini, hoping for two for one and double pods.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze with white freshwater pearls. The posts are 925 silver.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>0.6&quot;</li></ul>"
        }
    ]';

    listing_169_id INT := 169;
    listing_169_short_id VARCHAR := 'G68E8';
    listing_169_shop_id INT := shop_11_id;
    listing_169_category_id VARCHAR := 'NECKLACES';
    listing_169_country_code CHAR(2) := shop_11_country_code;
    listing_169_title VARCHAR := 'Pea Pod Pendant - 2 Pearls';
    listing_169_subtitle VARCHAR := 'A bronze pea pod pendant with two white freshwater pearls.';
    listing_169_price_cents INT := 16700;
    listing_169_image_uuids text[] := '{"1286f9fd-947f-4d81-978e-ed972370bf4b", "71656e8f-5d9f-4038-83bb-130d514d0a39", "0d506b15-7db8-485d-8e1c-d1ff5c195ad9"}';
    listing_169_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Peas are cool-weather annuals that mature early, and botanists classify the &ldquo;peas&rdquo; inside the pod as berries. Folklore has it that the Pennsylvania Germans planted peas under the sign of Gemini, hoping for two for one and double pods.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze with 2 white freshwater pearls, on a brass chain.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Chain: 17&quot; to 18&quot; long (adjustable)</li><li>Pendant: 1.5&quot; long</li></ul>"
        }
    ]';

    listing_170_id INT := 170;
    listing_170_short_id VARCHAR := 'G38LL';
    listing_170_shop_id INT := shop_11_id;
    listing_170_category_id VARCHAR := 'EARRINGS';
    listing_170_country_code CHAR(2) := shop_11_country_code;
    listing_170_title VARCHAR := 'Pea Pod Earrings - Drop';
    listing_170_subtitle VARCHAR := 'Bronze pea pod drop earrings with white freshwater pearls.';
    listing_170_price_cents INT := 19200;
    listing_170_image_uuids text[] := '{"17358e23-2727-4793-88a4-bc0e2ed47068", "b1eebb1b-459b-44fc-8dcd-6a532252ae10"}';
    listing_170_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Peas are cool-weather annuals that mature early, and botanists classify the &ldquo;peas&rdquo; inside the pod as berries. Folklore has it that the Pennsylvania Germans planted peas under the sign of Gemini, hoping for two for one and double pods.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze with white freshwater pearls. The wires are 925 silver.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>1.5&quot; long</li></ul>"
        }
    ]';

    listing_171_id INT := 171;
    listing_171_short_id VARCHAR := 'GD5D6';
    listing_171_shop_id INT := shop_11_id;
    listing_171_category_id VARCHAR := 'RINGS';
    listing_171_country_code CHAR(2) := shop_11_country_code;
    listing_171_title VARCHAR := 'Pea Pod Triple Pearl Ring';
    listing_171_subtitle VARCHAR := 'An adjustable gold-plated bronze pea pod ring with three white freshwater pearls.';
    listing_171_price_cents INT := 9000;
    listing_171_image_uuids text[] := '{"24a5e91b-2ef2-4d1c-a353-2bdb5e8cb633", "a99d4716-d57b-4370-ad4b-4e4e72c41bce"}';
    listing_171_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Peas are cool-weather annuals that mature early, and botanists classify the &ldquo;peas&rdquo; inside the pod as berries. Folklore has it that the Pennsylvania Germans planted peas under the sign of Gemini, hoping for two for one and double pods.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze with gold plate and three white freshwater pearls.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Adjustable band</li></ul>"
        }
    ]';

    listing_172_id INT := 172;
    listing_172_short_id VARCHAR := 'K4D26';
    listing_172_shop_id INT := shop_11_id;
    listing_172_category_id VARCHAR := 'ACCESSORIES';
    listing_172_country_code CHAR(2) := shop_11_country_code;
    listing_172_title VARCHAR := 'Pea Pod Brooch - 3 Pearls';
    listing_172_subtitle VARCHAR := 'A bronze pea pod brooch with three white freshwater pearls.';
    listing_172_price_cents INT := 14200;
    listing_172_image_uuids text[] := '{"1d1a2634-17a9-4fac-8b62-2228ea7ade77"}';
    listing_172_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Peas are cool-weather annuals that mature early, and botanists classify the &ldquo;peas&rdquo; inside the pod as berries. Folklore has it that the Pennsylvania Germans planted peas under the sign of Gemini, hoping for two for one and double pods.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze with three white freshwater pearls.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>1.5&quot; long</li></ul>"
        }
    ]';

    listing_173_id INT := 173;
    listing_173_short_id VARCHAR := 'K93L5';
    listing_173_shop_id INT := shop_11_id;
    listing_173_category_id VARCHAR := 'ACCESSORIES';
    listing_173_country_code CHAR(2) := shop_11_country_code;
    listing_173_title VARCHAR := 'Pea Pod Brooch - 2 Pearls';
    listing_173_subtitle VARCHAR := 'A bronze pea pod brooch with two white freshwater pearls.';
    listing_173_price_cents INT := 11900;
    listing_173_image_uuids text[] := '{"db714258-bcea-4175-9859-1b64bbd40426"}';
    listing_173_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Peas are cool-weather annuals that mature early, and botanists classify the &ldquo;peas&rdquo; inside the pod as berries. Folklore has it that the Pennsylvania Germans planted peas under the sign of Gemini, hoping for two for one and double pods.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze with two white freshwater pearls.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>1.5&quot; long</li></ul>"
        }
    ]';

    listing_174_id INT := 174;
    listing_174_short_id VARCHAR := 'G5EJ3';
    listing_174_shop_id INT := shop_11_id;
    listing_174_category_id VARCHAR := 'NECKLACES';
    listing_174_country_code CHAR(2) := shop_11_country_code;
    listing_174_title VARCHAR := 'Fine Pea Pod Pendant - 3 Pearls';
    listing_174_subtitle VARCHAR := 'A sterling silver pea pod pendant with a 24k gold finish and three freshwater pearls.';
    listing_174_price_cents INT := 40300;
    listing_174_image_uuids text[] := '{"0b5bf465-71ed-4e7f-ad44-9aa245937628", "dd85dcf5-06fa-42a0-855a-77b8bc4d4671", "026f2fd7-6b70-449a-b652-6104e59295fb"}';
    listing_174_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>From the Pea Pod Fine Collection.</p><p>Peas are cool-weather annuals that mature early, and botanists classify the &ldquo;peas&rdquo; inside the pod as berries. Folklore has it that the Pennsylvania Germans planted peas under the sign of Gemini, hoping for two for one and double pods.</p><p>The Pea Pod line was inspired by the mother and child relationship, and has grown from a single pearl into designs with up to seven.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in sterling silver with a 24k gold finish, accented with freshwater pearls.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>Chain: 16&quot; adjustable rolo chain</li><li>Pendant: 1.5&quot; long</li></ul>"
        }
    ]';

    listing_175_id INT := 175;
    listing_175_short_id VARCHAR := 'G238E';
    listing_175_shop_id INT := shop_11_id;
    listing_175_category_id VARCHAR := 'EARRINGS';
    listing_175_country_code CHAR(2) := shop_11_country_code;
    listing_175_title VARCHAR := 'Pea Pod Earrings - Petite Post';
    listing_175_subtitle VARCHAR := 'Petite bronze pea pod post earrings with three white freshwater pearls each.';
    listing_175_price_cents INT := 16000;
    listing_175_image_uuids text[] := '{"064a8a84-3156-42dd-81ee-5d74d4c04d74", "b2abc577-6a25-4d3c-9ddf-26cb524a565d"}';
    listing_175_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Peas are cool-weather annuals that mature early, and botanists classify the &ldquo;peas&rdquo; inside the pod as berries. Folklore has it that the Pennsylvania Germans planted peas under the sign of Gemini, hoping for two for one and double pods.</p>"
        },
        {
            "title": "Materials",
            "richText": "<p>Cast in bronze with white freshwater pearls. The posts are 925 silver.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li>0.9&quot; long</li></ul>"
        }
    ]';

    listing_62_id INT := 62;
    listing_62_short_id VARCHAR := 'G52JK';
    listing_62_shop_id INT := shop_9_id;
    listing_62_country_code CHAR(2) := shop_9_country_code;
    listing_62_category_id VARCHAR := 'NECKLACES';
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
    listing_63_short_id VARCHAR := 'G24DG';
    listing_63_shop_id INT := shop_9_id;
    listing_63_country_code CHAR(2) := 'IT';
    listing_63_category_id VARCHAR := 'NECKLACES';
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
    listing_63_variation_images JSONB;

    listing_64_id INT := 64;
    listing_64_short_id VARCHAR := 'G7D6K';
    listing_64_shop_id INT := shop_9_id;
    listing_64_country_code CHAR(2) := shop_9_country_code;
    listing_64_category_id VARCHAR := 'NECKLACES';
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
    listing_65_short_id VARCHAR := 'GJEEK';
    listing_65_shop_id INT := shop_9_id;
    listing_65_country_code CHAR(2) := shop_9_country_code;
    listing_65_category_id VARCHAR := 'NECKLACES';
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
    listing_66_short_id VARCHAR := 'K893G';
    listing_66_shop_id INT := shop_9_id;
    listing_66_country_code CHAR(2) := shop_9_country_code;
    listing_66_category_id VARCHAR := 'NECKLACES';
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
    listing_67_short_id VARCHAR := 'GLE5K';
    listing_67_shop_id INT := shop_9_id;
    listing_67_country_code CHAR(2) := shop_9_country_code;
    listing_67_category_id VARCHAR := 'NECKLACES';
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
    listing_68_short_id VARCHAR := 'GE7LG';
    listing_68_shop_id INT := shop_9_id;
    listing_68_country_code CHAR(2) := shop_9_country_code;
    listing_68_category_id VARCHAR := 'NECKLACES';
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
    listing_69_short_id VARCHAR := 'G675K';
    listing_69_shop_id INT := shop_9_id;
    listing_69_country_code CHAR(2) := shop_9_country_code;
    listing_69_category_id VARCHAR := 'NECKLACES';
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
    listing_70_short_id VARCHAR := 'G394G';
    listing_70_shop_id INT := shop_9_id;
    listing_70_country_code CHAR(2) := shop_9_country_code;
    listing_70_category_id VARCHAR := 'NECKLACES';
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
    listing_71_short_id VARCHAR := 'GD27G';
    listing_71_shop_id INT := shop_9_id;
    listing_71_country_code CHAR(2) := shop_9_country_code;
    listing_71_category_id VARCHAR := 'NECKLACES';
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
    listing_72_short_id VARCHAR := 'K43LG';
    listing_72_shop_id INT := shop_9_id;
    listing_72_country_code CHAR(2) := shop_9_country_code;
    listing_72_category_id VARCHAR := 'NECKLACES';
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

    DELETE FROM shop
    WHERE id NOT IN (shop_9_id, shop_10_id, shop_11_id, shop_12_id, shop_13_id);

    DELETE FROM listing
    WHERE id NOT BETWEEN listing_62_id AND listing_175_id;

    INSERT INTO shop (id, short_id, title, profile_rich_text, profile_image_uuid, shop_location, classification, country_code, direct_fulfillment, created_at, updated_at)
    VALUES
        (shop_9_id, shop_9_short_id, shop_9_title, shop_9_profile_rich_text, shop_9_profile_image_uuid, shop_9_location, shop_9_classification, shop_9_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (shop_10_id, shop_10_short_id, shop_10_title, shop_10_profile_rich_text, shop_10_profile_image_uuid, shop_10_location, shop_10_classification, shop_10_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (shop_11_id, shop_11_short_id, shop_11_title, shop_11_profile_rich_text, shop_11_profile_image_uuid, shop_11_location, shop_11_classification, shop_11_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (shop_12_id, shop_12_short_id, shop_12_title, shop_12_profile_rich_text, shop_12_profile_image_uuid, shop_12_location, shop_12_classification, shop_12_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (shop_13_id, shop_13_short_id, shop_13_title, shop_13_profile_rich_text, shop_13_profile_image_uuid, shop_13_location, shop_13_classification, shop_13_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
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

    INSERT INTO featured_shop (shop_id)
    SELECT shop_12_id
    WHERE NOT EXISTS (SELECT 1 FROM featured_shop WHERE shop_id = shop_12_id);

    INSERT INTO featured_shop (shop_id)
    SELECT shop_13_id
    WHERE NOT EXISTS (SELECT 1 FROM featured_shop WHERE shop_id = shop_13_id);

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_62_id, listing_62_short_id, listing_62_shop_id, listing_62_category_id, listing_62_country_code, listing_62_title, listing_62_subtitle, listing_62_full_descr, listing_62_price_cents, NULL, NULL, listing_62_image_uuids, NULL,
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
                listing_62_metal_variation_id || ':' || listing_62_metal_sterling_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_62_metal_variation_id || ':' || listing_62_metal_bronze_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
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
        ), priced(metal_id, width_id, length_id, price_cents) AS (
            VALUES
                (listing_63_metal_oxidized_id, listing_63_width_fine_id, listing_63_length_16_id, 12000),
                (listing_63_metal_oxidized_id, listing_63_width_fine_id, listing_63_length_18_id, 12000),
                (listing_63_metal_oxidized_id, listing_63_width_fine_id, listing_63_length_20_id, 14000),
                (listing_63_metal_oxidized_id, listing_63_width_fine_id, listing_63_length_22_id, 14000),
                (listing_63_metal_oxidized_id, listing_63_width_fine_id, listing_63_length_26_id, 16000),
                (listing_63_metal_bright_id, listing_63_width_fine_id, listing_63_length_18_id, 12000),
                (listing_63_metal_bright_id, listing_63_width_fine_id, listing_63_length_22_id, 14000),
                (listing_63_metal_black_id, listing_63_width_fine_id, listing_63_length_16_id, 12000),
                (listing_63_metal_black_id, listing_63_width_fine_id, listing_63_length_18_id, 12000),
                (listing_63_metal_black_id, listing_63_width_fine_id, listing_63_length_20_id, 14000),
                (listing_63_metal_black_id, listing_63_width_fine_id, listing_63_length_22_id, 14000),
                (listing_63_metal_black_id, listing_63_width_fine_id, listing_63_length_26_id, 16000),
                (listing_63_metal_oxidized_id, listing_63_width_medium_id, listing_63_length_16_id, 19000),
                (listing_63_metal_oxidized_id, listing_63_width_medium_id, listing_63_length_18_id, 19000),
                (listing_63_metal_oxidized_id, listing_63_width_medium_id, listing_63_length_20_id, 22500),
                (listing_63_metal_oxidized_id, listing_63_width_medium_id, listing_63_length_22_id, 22500),
                (listing_63_metal_oxidized_id, listing_63_width_medium_id, listing_63_length_24_id, 25000),
                (listing_63_metal_oxidized_id, listing_63_width_medium_id, listing_63_length_28_id, 28000),
                (listing_63_metal_oxidized_id, listing_63_width_medium_id, listing_63_length_36_id, 35000),
                (listing_63_metal_black_id, listing_63_width_medium_id, listing_63_length_18_id, 19000),
                (listing_63_metal_black_id, listing_63_width_medium_id, listing_63_length_22_id, 22500),
                (listing_63_metal_black_id, listing_63_width_medium_id, listing_63_length_24_id, 25000),
                (listing_63_metal_black_id, listing_63_width_medium_id, listing_63_length_28_id, 28000),
                (listing_63_metal_oxidized_id, listing_63_width_heavy_id, listing_63_length_18_id, 53500),
                (listing_63_metal_oxidized_id, listing_63_width_heavy_id, listing_63_length_20_id, 59500),
                (listing_63_metal_oxidized_id, listing_63_width_heavy_id, listing_63_length_22_id, 59500),
                (listing_63_metal_oxidized_id, listing_63_width_heavy_id, listing_63_length_24_id, 69000),
                (listing_63_metal_oxidized_id, listing_63_width_heavy_id, listing_63_length_26_id, 71500),
                (listing_63_metal_oxidized_id, listing_63_width_heavy_id, listing_63_length_28_id, 74000),
                (listing_63_metal_black_id, listing_63_width_heavy_id, listing_63_length_20_id, 59500),
                (listing_63_metal_black_id, listing_63_width_heavy_id, listing_63_length_22_id, 59500),
                (listing_63_metal_black_id, listing_63_width_heavy_id, listing_63_length_26_id, 69000),
                (listing_63_metal_black_id, listing_63_width_heavy_id, listing_63_length_28_id, 74000)
        )
        SELECT jsonb_object_agg(
            listing_63_metal_variation_id || ':' || metals.id || '|' || listing_63_width_variation_id || ':' || widths.id || '|' || listing_63_length_variation_id || ':' || lengths.id,
            jsonb_build_object('priceCents', priced.price_cents, 'disabled', priced.price_cents IS NULL, 'inventory', catalog_default_inventory)
        )
        FROM metals
        CROSS JOIN widths
        CROSS JOIN lengths
        LEFT JOIN priced ON priced.metal_id = metals.id AND priced.width_id = widths.id AND priced.length_id = lengths.id
    );

    listing_63_variation_images := (
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
        ), heroes(metal_id, width_id, image_uuid) AS (
            VALUES
                (listing_63_metal_oxidized_id, listing_63_width_fine_id, listing_63_fine_oxidized_image_uuid),
                (listing_63_metal_black_id, listing_63_width_fine_id, listing_63_fine_black_image_uuid),
                (listing_63_metal_bright_id, listing_63_width_fine_id, listing_63_fine_bright_image_uuid),
                (listing_63_metal_oxidized_id, listing_63_width_medium_id, listing_63_medium_oxidized_image_uuid),
                (listing_63_metal_black_id, listing_63_width_medium_id, listing_63_medium_black_image_uuid),
                (listing_63_metal_oxidized_id, listing_63_width_heavy_id, listing_63_heavy_oxidized_image_uuid),
                (listing_63_metal_black_id, listing_63_width_heavy_id, listing_63_heavy_black_image_uuid)
        )
        SELECT jsonb_object_agg(
            listing_63_metal_variation_id || ':' || metals.id || '|' || listing_63_width_variation_id || ':' || widths.id,
            to_jsonb(heroes.image_uuid)
        )
        FROM metals
        CROSS JOIN widths
        LEFT JOIN heroes ON heroes.metal_id = metals.id AND heroes.width_id = widths.id
    );

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at, variation_images)
    VALUES
        (listing_63_id, listing_63_short_id, listing_63_shop_id, listing_63_category_id, listing_63_country_code, listing_63_title, listing_63_subtitle, listing_63_full_descr, listing_63_price_cents, NULL, NULL, listing_63_image_uuids, NULL,
            jsonb_build_object(
                listing_63_metal_variation_id, jsonb_build_object(
                    'name', 'Metal',
                    'pricesVary', true,
                    'imagesVary', true,
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
            listing_63_combinations, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, listing_63_variation_images)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        variation_images = EXCLUDED.variation_images,
        updated_at = CURRENT_TIMESTAMP;

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_64_id, listing_64_short_id, listing_64_shop_id, listing_64_category_id, listing_64_country_code, listing_64_title, listing_64_subtitle, listing_64_full_descr, listing_64_price_cents, NULL, NULL, listing_64_image_uuids, NULL,
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
                listing_64_metal_variation_id || ':' || listing_64_metal_sterling_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_64_metal_variation_id || ':' || listing_64_metal_bronze_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_65_id, listing_65_short_id, listing_65_shop_id, listing_65_category_id, listing_65_country_code, listing_65_title, listing_65_subtitle, listing_65_full_descr, listing_65_price_cents, NULL, NULL, listing_65_image_uuids, NULL,
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
                listing_65_metal_variation_id || ':' || listing_65_metal_sterling_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_65_metal_variation_id || ':' || listing_65_metal_bronze_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_66_id, listing_66_short_id, listing_66_shop_id, listing_66_category_id, listing_66_country_code, listing_66_title, listing_66_subtitle, listing_66_full_descr, listing_66_price_cents, NULL, NULL, listing_66_image_uuids, NULL,
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
                listing_66_metal_variation_id || ':' || listing_66_metal_sterling_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_66_metal_variation_id || ':' || listing_66_metal_bronze_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_67_id, listing_67_short_id, listing_67_shop_id, listing_67_category_id, listing_67_country_code, listing_67_title, listing_67_subtitle, listing_67_full_descr, listing_67_price_cents, NULL, NULL, listing_67_image_uuids, NULL,
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
                listing_67_metal_variation_id || ':' || listing_67_metal_sterling_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_67_metal_variation_id || ':' || listing_67_metal_bronze_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_68_id, listing_68_short_id, listing_68_shop_id, listing_68_category_id, listing_68_country_code, listing_68_title, listing_68_subtitle, listing_68_full_descr, listing_68_price_cents, NULL, NULL, listing_68_image_uuids, NULL,
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
                listing_68_metal_variation_id || ':' || listing_68_metal_sterling_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_68_metal_variation_id || ':' || listing_68_metal_bronze_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_69_id, listing_69_short_id, listing_69_shop_id, listing_69_category_id, listing_69_country_code, listing_69_title, listing_69_subtitle, listing_69_full_descr, listing_69_price_cents, NULL, NULL, listing_69_image_uuids, NULL,
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
                listing_69_metal_variation_id || ':' || listing_69_metal_sterling_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_69_metal_variation_id || ':' || listing_69_metal_bronze_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_70_id, listing_70_short_id, listing_70_shop_id, listing_70_category_id, listing_70_country_code, listing_70_title, listing_70_subtitle, listing_70_full_descr, listing_70_price_cents, NULL, NULL, listing_70_image_uuids, NULL,
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
                listing_70_metal_variation_id || ':' || listing_70_metal_sterling_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_70_metal_variation_id || ':' || listing_70_metal_bronze_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_71_id, listing_71_short_id, listing_71_shop_id, listing_71_category_id, listing_71_country_code, listing_71_title, listing_71_subtitle, listing_71_full_descr, listing_71_price_cents, NULL, NULL, listing_71_image_uuids, NULL,
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
                listing_71_metal_variation_id || ':' || listing_71_metal_sterling_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_71_metal_variation_id || ':' || listing_71_metal_bronze_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_72_id, listing_72_short_id, listing_72_shop_id, listing_72_category_id, listing_72_country_code, listing_72_title, listing_72_subtitle, listing_72_full_descr, listing_72_price_cents, NULL, NULL, listing_72_image_uuids, NULL,
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
                listing_72_metal_variation_id || ':' || listing_72_metal_sterling_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory),
                listing_72_metal_variation_id || ':' || listing_72_metal_bronze_id, jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory)
            ), true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    listing_73_combinations := (
        WITH materials(id) AS (
            VALUES
                (listing_73_material_brass_wp_id),
                (listing_73_material_copper_wp_id),
                (listing_73_material_steel_wp_id),
                (listing_73_material_brass_pol_id),
                (listing_73_material_copper_pol_id),
                (listing_73_material_steel_pol_id)
        ), weights(id) AS (
            VALUES
                (listing_73_weight_light_id),
                (listing_73_weight_standard_id),
                (listing_73_weight_heavy_id)
        ), sizes(id) AS (
            VALUES
                (listing_73_size_small_id),
                (listing_73_size_medium_id),
                (listing_73_size_large_id),
                (listing_73_size_xl_id),
                (listing_73_size_xxl_id)
        ), priced(material_id, weight_id, size_id, price_cents) AS (
            VALUES
                (listing_73_material_brass_wp_id, listing_73_weight_light_id, listing_73_size_small_id, 7800),
                (listing_73_material_brass_wp_id, listing_73_weight_light_id, listing_73_size_medium_id, 7800),
                (listing_73_material_brass_wp_id, listing_73_weight_light_id, listing_73_size_large_id, 7800),
                (listing_73_material_brass_wp_id, listing_73_weight_light_id, listing_73_size_xl_id, 7800),
                (listing_73_material_brass_wp_id, listing_73_weight_light_id, listing_73_size_xxl_id, 7800),
                (listing_73_material_brass_wp_id, listing_73_weight_standard_id, listing_73_size_small_id, 8800),
                (listing_73_material_brass_wp_id, listing_73_weight_standard_id, listing_73_size_medium_id, 8800),
                (listing_73_material_brass_wp_id, listing_73_weight_standard_id, listing_73_size_large_id, 8800),
                (listing_73_material_brass_wp_id, listing_73_weight_standard_id, listing_73_size_xl_id, 8800),
                (listing_73_material_brass_wp_id, listing_73_weight_standard_id, listing_73_size_xxl_id, 8800),
                (listing_73_material_brass_wp_id, listing_73_weight_heavy_id, listing_73_size_small_id, 9800),
                (listing_73_material_brass_wp_id, listing_73_weight_heavy_id, listing_73_size_medium_id, 9800),
                (listing_73_material_brass_wp_id, listing_73_weight_heavy_id, listing_73_size_large_id, 9800),
                (listing_73_material_brass_wp_id, listing_73_weight_heavy_id, listing_73_size_xl_id, 9800),
                (listing_73_material_brass_wp_id, listing_73_weight_heavy_id, listing_73_size_xxl_id, 9800),
                (listing_73_material_copper_wp_id, listing_73_weight_light_id, listing_73_size_small_id, 7800),
                (listing_73_material_copper_wp_id, listing_73_weight_light_id, listing_73_size_medium_id, 7800),
                (listing_73_material_copper_wp_id, listing_73_weight_light_id, listing_73_size_large_id, 7800),
                (listing_73_material_copper_wp_id, listing_73_weight_light_id, listing_73_size_xl_id, 7800),
                (listing_73_material_copper_wp_id, listing_73_weight_light_id, listing_73_size_xxl_id, 7800),
                (listing_73_material_copper_wp_id, listing_73_weight_standard_id, listing_73_size_small_id, 8800),
                (listing_73_material_copper_wp_id, listing_73_weight_standard_id, listing_73_size_medium_id, 8800),
                (listing_73_material_copper_wp_id, listing_73_weight_standard_id, listing_73_size_large_id, 8800),
                (listing_73_material_copper_wp_id, listing_73_weight_standard_id, listing_73_size_xl_id, 8800),
                (listing_73_material_copper_wp_id, listing_73_weight_standard_id, listing_73_size_xxl_id, 8800),
                (listing_73_material_copper_wp_id, listing_73_weight_heavy_id, listing_73_size_small_id, 9800),
                (listing_73_material_copper_wp_id, listing_73_weight_heavy_id, listing_73_size_medium_id, 9800),
                (listing_73_material_copper_wp_id, listing_73_weight_heavy_id, listing_73_size_large_id, 9800),
                (listing_73_material_copper_wp_id, listing_73_weight_heavy_id, listing_73_size_xl_id, 9800),
                (listing_73_material_copper_wp_id, listing_73_weight_heavy_id, listing_73_size_xxl_id, 9800),
                (listing_73_material_steel_wp_id, listing_73_weight_light_id, listing_73_size_small_id, 9800),
                (listing_73_material_steel_wp_id, listing_73_weight_light_id, listing_73_size_medium_id, 9800),
                (listing_73_material_steel_wp_id, listing_73_weight_light_id, listing_73_size_large_id, 9800),
                (listing_73_material_steel_wp_id, listing_73_weight_light_id, listing_73_size_xl_id, 9800),
                (listing_73_material_steel_wp_id, listing_73_weight_light_id, listing_73_size_xxl_id, 9800),
                (listing_73_material_steel_wp_id, listing_73_weight_standard_id, listing_73_size_small_id, 11800),
                (listing_73_material_steel_wp_id, listing_73_weight_standard_id, listing_73_size_medium_id, 11800),
                (listing_73_material_steel_wp_id, listing_73_weight_standard_id, listing_73_size_large_id, 11800),
                (listing_73_material_steel_wp_id, listing_73_weight_standard_id, listing_73_size_xl_id, 11800),
                (listing_73_material_steel_wp_id, listing_73_weight_standard_id, listing_73_size_xxl_id, 11800),
                (listing_73_material_brass_pol_id, listing_73_weight_light_id, listing_73_size_small_id, 7800),
                (listing_73_material_brass_pol_id, listing_73_weight_light_id, listing_73_size_medium_id, 7800),
                (listing_73_material_brass_pol_id, listing_73_weight_light_id, listing_73_size_large_id, 7800),
                (listing_73_material_brass_pol_id, listing_73_weight_light_id, listing_73_size_xl_id, 7800),
                (listing_73_material_brass_pol_id, listing_73_weight_light_id, listing_73_size_xxl_id, 7800),
                (listing_73_material_brass_pol_id, listing_73_weight_standard_id, listing_73_size_small_id, 8800),
                (listing_73_material_brass_pol_id, listing_73_weight_standard_id, listing_73_size_medium_id, 8800),
                (listing_73_material_brass_pol_id, listing_73_weight_standard_id, listing_73_size_large_id, 8800),
                (listing_73_material_brass_pol_id, listing_73_weight_standard_id, listing_73_size_xl_id, 8800),
                (listing_73_material_brass_pol_id, listing_73_weight_standard_id, listing_73_size_xxl_id, 8800),
                (listing_73_material_brass_pol_id, listing_73_weight_heavy_id, listing_73_size_small_id, 9800),
                (listing_73_material_brass_pol_id, listing_73_weight_heavy_id, listing_73_size_medium_id, 9800),
                (listing_73_material_brass_pol_id, listing_73_weight_heavy_id, listing_73_size_large_id, 9800),
                (listing_73_material_brass_pol_id, listing_73_weight_heavy_id, listing_73_size_xl_id, 9800),
                (listing_73_material_brass_pol_id, listing_73_weight_heavy_id, listing_73_size_xxl_id, 9800),
                (listing_73_material_copper_pol_id, listing_73_weight_light_id, listing_73_size_small_id, 7800),
                (listing_73_material_copper_pol_id, listing_73_weight_light_id, listing_73_size_medium_id, 7800),
                (listing_73_material_copper_pol_id, listing_73_weight_light_id, listing_73_size_large_id, 7800),
                (listing_73_material_copper_pol_id, listing_73_weight_light_id, listing_73_size_xl_id, 7800),
                (listing_73_material_copper_pol_id, listing_73_weight_light_id, listing_73_size_xxl_id, 7800),
                (listing_73_material_copper_pol_id, listing_73_weight_standard_id, listing_73_size_small_id, 8800),
                (listing_73_material_copper_pol_id, listing_73_weight_standard_id, listing_73_size_medium_id, 8800),
                (listing_73_material_copper_pol_id, listing_73_weight_standard_id, listing_73_size_large_id, 8800),
                (listing_73_material_copper_pol_id, listing_73_weight_standard_id, listing_73_size_xl_id, 8800),
                (listing_73_material_copper_pol_id, listing_73_weight_standard_id, listing_73_size_xxl_id, 8800),
                (listing_73_material_copper_pol_id, listing_73_weight_heavy_id, listing_73_size_small_id, 9800),
                (listing_73_material_copper_pol_id, listing_73_weight_heavy_id, listing_73_size_medium_id, 9800),
                (listing_73_material_copper_pol_id, listing_73_weight_heavy_id, listing_73_size_large_id, 9800),
                (listing_73_material_copper_pol_id, listing_73_weight_heavy_id, listing_73_size_xl_id, 9800),
                (listing_73_material_copper_pol_id, listing_73_weight_heavy_id, listing_73_size_xxl_id, 9800),
                (listing_73_material_steel_pol_id, listing_73_weight_light_id, listing_73_size_small_id, 9800),
                (listing_73_material_steel_pol_id, listing_73_weight_light_id, listing_73_size_medium_id, 9800),
                (listing_73_material_steel_pol_id, listing_73_weight_light_id, listing_73_size_large_id, 9800),
                (listing_73_material_steel_pol_id, listing_73_weight_light_id, listing_73_size_xl_id, 9800),
                (listing_73_material_steel_pol_id, listing_73_weight_light_id, listing_73_size_xxl_id, 9800),
                (listing_73_material_steel_pol_id, listing_73_weight_standard_id, listing_73_size_small_id, 11800),
                (listing_73_material_steel_pol_id, listing_73_weight_standard_id, listing_73_size_medium_id, 11800),
                (listing_73_material_steel_pol_id, listing_73_weight_standard_id, listing_73_size_large_id, 11800),
                (listing_73_material_steel_pol_id, listing_73_weight_standard_id, listing_73_size_xl_id, 11800),
                (listing_73_material_steel_pol_id, listing_73_weight_standard_id, listing_73_size_xxl_id, 11800)
        )
        SELECT jsonb_object_agg(
            listing_73_material_variation_id || ':' || materials.id || '|' || listing_73_weight_variation_id || ':' || weights.id || '|' || listing_73_size_variation_id || ':' || sizes.id,
            jsonb_build_object('priceCents', priced.price_cents, 'disabled', priced.price_cents IS NULL, 'inventory', catalog_default_inventory)
        )
        FROM materials
        CROSS JOIN weights
        CROSS JOIN sizes
        LEFT JOIN priced ON priced.material_id = materials.id AND priced.weight_id = weights.id AND priced.size_id = sizes.id
    );

    listing_73_variation_images := (
        WITH materials(id) AS (
            VALUES
                (listing_73_material_brass_wp_id),
                (listing_73_material_copper_wp_id),
                (listing_73_material_steel_wp_id),
                (listing_73_material_brass_pol_id),
                (listing_73_material_copper_pol_id),
                (listing_73_material_steel_pol_id)
        ), weights(id) AS (
            VALUES
                (listing_73_weight_light_id),
                (listing_73_weight_standard_id),
                (listing_73_weight_heavy_id)
        ), heroes(material_id, weight_id, image_uuid) AS (
            VALUES
                (listing_73_material_brass_pol_id, listing_73_weight_standard_id, listing_73_brass_pol_standard_image_uuid),
                (listing_73_material_brass_wp_id, listing_73_weight_standard_id, listing_73_brass_wp_standard_image_uuid),
                (listing_73_material_copper_wp_id, listing_73_weight_standard_id, listing_73_copper_wp_standard_image_uuid),
                (listing_73_material_copper_pol_id, listing_73_weight_standard_id, listing_73_copper_pol_standard_image_uuid),
                (listing_73_material_brass_wp_id, listing_73_weight_light_id, listing_73_brass_wp_light_image_uuid),
                (listing_73_material_copper_wp_id, listing_73_weight_light_id, listing_73_copper_wp_light_image_uuid),
                (listing_73_material_brass_pol_id, listing_73_weight_light_id, listing_73_brass_pol_light_image_uuid),
                (listing_73_material_copper_pol_id, listing_73_weight_light_id, listing_73_copper_pol_light_image_uuid),
                (listing_73_material_steel_pol_id, listing_73_weight_light_id, listing_73_steel_pol_light_image_uuid),
                (listing_73_material_steel_wp_id, listing_73_weight_light_id, listing_73_steel_wp_light_image_uuid),
                (listing_73_material_brass_wp_id, listing_73_weight_heavy_id, listing_73_brass_wp_heavy_image_uuid),
                (listing_73_material_copper_wp_id, listing_73_weight_heavy_id, listing_73_copper_wp_heavy_image_uuid),
                (listing_73_material_brass_pol_id, listing_73_weight_heavy_id, listing_73_brass_pol_heavy_image_uuid),
                (listing_73_material_copper_pol_id, listing_73_weight_heavy_id, listing_73_copper_pol_heavy_image_uuid),
                (listing_73_material_steel_wp_id, listing_73_weight_standard_id, listing_73_steel_wp_standard_image_uuid),
                (listing_73_material_steel_pol_id, listing_73_weight_standard_id, listing_73_steel_pol_standard_image_uuid)
        )
        SELECT jsonb_object_agg(
            listing_73_material_variation_id || ':' || materials.id || '|' || listing_73_weight_variation_id || ':' || weights.id,
            to_jsonb(heroes.image_uuid)
        )
        FROM materials
        CROSS JOIN weights
        LEFT JOIN heroes ON heroes.material_id = materials.id AND heroes.weight_id = weights.id
    );

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at, variation_images)
    VALUES
        (listing_73_id, listing_73_short_id, listing_73_shop_id, listing_73_category_id, listing_73_country_code, listing_73_title, listing_73_subtitle, listing_73_full_descr, listing_73_price_cents, NULL, NULL, listing_73_image_uuids, NULL,
            jsonb_build_object(
                listing_73_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', false,
                    'imagesVary', false,
                    'order', 0,
                    'defaultOption', listing_73_size_medium_id,
                    'options', jsonb_build_object(
                        listing_73_size_small_id, jsonb_build_object('name', 'Small', 'order', 0, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_73_size_medium_id, jsonb_build_object('name', 'Medium', 'order', 1, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_73_size_large_id, jsonb_build_object('name', 'Large', 'order', 2, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_73_size_xl_id, jsonb_build_object('name', 'XL', 'order', 3, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_73_size_xxl_id, jsonb_build_object('name', 'XXL', 'order', 4, 'priceCents', null, 'imageUuids', '[]'::jsonb)
                    )
                ),
                listing_73_material_variation_id, jsonb_build_object(
                    'name', 'Material',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 1,
                    'defaultOption', listing_73_material_brass_wp_id,
                    'options', jsonb_build_object(
                        listing_73_material_brass_wp_id, jsonb_build_object('name', 'Brass / Work Patina', 'order', 0, 'priceCents', null, 'imageUuids', to_jsonb(listing_73_brass_wp_option_image_uuids)),
                        listing_73_material_copper_wp_id, jsonb_build_object('name', 'Copper / Work Patina', 'order', 2, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_73_material_steel_wp_id, jsonb_build_object('name', 'Stainless Steel / Work Patina', 'order', 4, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_73_material_brass_pol_id, jsonb_build_object('name', 'Brass / Polished', 'order', 1, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_73_material_copper_pol_id, jsonb_build_object('name', 'Copper / Polished', 'order', 3, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_73_material_steel_pol_id, jsonb_build_object('name', 'Stainless Steel / Polished', 'order', 5, 'priceCents', null, 'imageUuids', '[]'::jsonb)
                    )
                ),
                listing_73_weight_variation_id, jsonb_build_object(
                    'name', 'Weight',
                    'pricesVary', false,
                    'imagesVary', true,
                    'order', 2,
                    'defaultOption', listing_73_weight_standard_id,
                    'options', jsonb_build_object(
                        listing_73_weight_light_id, jsonb_build_object('name', 'Lightweight', 'order', 0, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_73_weight_standard_id, jsonb_build_object('name', 'Standard Weight', 'order', 1, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_73_weight_heavy_id, jsonb_build_object('name', 'Heavyweight', 'order', 2, 'priceCents', null, 'imageUuids', '[]'::jsonb)
                    )
                )
            ),
            listing_73_combinations, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, listing_73_variation_images)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        variation_images = EXCLUDED.variation_images,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    listing_74_combinations := (
        WITH materials(id) AS (
            VALUES
                (listing_74_material_brass_wp_id),
                (listing_74_material_brass_brushed_id),
                (listing_74_material_copper_wp_id),
                (listing_74_material_copper_brushed_id),
                (listing_74_material_steel_wp_id),
                (listing_74_material_steel_brushed_id)
        ), sizes(id) AS (
            VALUES
                (listing_74_size_small_id),
                (listing_74_size_medium_id),
                (listing_74_size_large_id),
                (listing_74_size_xl_id)
        )
        SELECT jsonb_object_agg(
            listing_74_material_variation_id || ':' || materials.id || '|' || listing_74_size_variation_id || ':' || sizes.id,
            jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory)
        )
        FROM materials
        CROSS JOIN sizes
    );

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_74_id, listing_74_short_id, listing_74_shop_id, listing_74_category_id, listing_74_country_code, listing_74_title, listing_74_subtitle, listing_74_full_descr, listing_74_price_cents, NULL, NULL, listing_74_image_uuids, NULL,
            jsonb_build_object(
                listing_74_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', false,
                    'imagesVary', false,
                    'order', 0,
                    'defaultOption', listing_74_size_medium_id,
                    'options', jsonb_build_object(
                        listing_74_size_small_id, jsonb_build_object('name', 'Small', 'order', 0, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_74_size_medium_id, jsonb_build_object('name', 'Medium', 'order', 1, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_74_size_large_id, jsonb_build_object('name', 'Large', 'order', 2, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_74_size_xl_id, jsonb_build_object('name', 'XL', 'order', 3, 'priceCents', null, 'imageUuids', '[]'::jsonb)
                    )
                ),
                listing_74_material_variation_id, jsonb_build_object(
                    'name', 'Material',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 1,
                    'defaultOption', listing_74_material_brass_wp_id,
                    'options', jsonb_build_object(
                        listing_74_material_brass_wp_id, jsonb_build_object('name', 'Brass / Work Patina', 'order', 0, 'priceCents', 9800, 'imageUuids', to_jsonb(listing_74_brass_wp_image_uuids)),
                        listing_74_material_brass_brushed_id, jsonb_build_object('name', 'Brass / Brushed', 'order', 1, 'priceCents', 9800, 'imageUuids', to_jsonb(listing_74_brass_brushed_image_uuids)),
                        listing_74_material_copper_wp_id, jsonb_build_object('name', 'Copper / Work Patina', 'order', 2, 'priceCents', 9800, 'imageUuids', to_jsonb(listing_74_copper_wp_image_uuids)),
                        listing_74_material_copper_brushed_id, jsonb_build_object('name', 'Copper / Brushed', 'order', 3, 'priceCents', 9800, 'imageUuids', to_jsonb(listing_74_copper_brushed_image_uuids)),
                        listing_74_material_steel_wp_id, jsonb_build_object('name', 'Stainless Steel / Work Patina', 'order', 4, 'priceCents', 14800, 'imageUuids', to_jsonb(listing_74_steel_wp_image_uuids)),
                        listing_74_material_steel_brushed_id, jsonb_build_object('name', 'Stainless Steel / Brushed', 'order', 5, 'priceCents', 14800, 'imageUuids', to_jsonb(listing_74_steel_brushed_image_uuids))
                    )
                )
            ),
            listing_74_combinations, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    listing_75_combinations := (
        WITH materials(id) AS (
            VALUES
                (listing_75_material_brass_wp_id),
                (listing_75_material_brass_pol_id),
                (listing_75_material_copper_wp_id),
                (listing_75_material_copper_pol_id),
                (listing_75_material_steel_wp_id),
                (listing_75_material_steel_pol_id)
        ), weights(id) AS (
            VALUES
                (listing_75_weight_light_id),
                (listing_75_weight_standard_id)
        ), sizes(id) AS (
            VALUES
                (listing_75_size_small_id),
                (listing_75_size_medium_id),
                (listing_75_size_large_id),
                (listing_75_size_xl_id)
        ), priced(material_id, weight_id, size_id, price_cents) AS (
            VALUES
                (listing_75_material_brass_wp_id, listing_75_weight_light_id, listing_75_size_small_id, 7800),
                (listing_75_material_brass_wp_id, listing_75_weight_light_id, listing_75_size_medium_id, 7800),
                (listing_75_material_brass_wp_id, listing_75_weight_light_id, listing_75_size_large_id, 7800),
                (listing_75_material_brass_wp_id, listing_75_weight_light_id, listing_75_size_xl_id, 7800),
                (listing_75_material_brass_wp_id, listing_75_weight_standard_id, listing_75_size_small_id, 8800),
                (listing_75_material_brass_wp_id, listing_75_weight_standard_id, listing_75_size_medium_id, 8800),
                (listing_75_material_brass_wp_id, listing_75_weight_standard_id, listing_75_size_large_id, 8800),
                (listing_75_material_brass_wp_id, listing_75_weight_standard_id, listing_75_size_xl_id, 8800),
                (listing_75_material_brass_pol_id, listing_75_weight_light_id, listing_75_size_small_id, 7800),
                (listing_75_material_brass_pol_id, listing_75_weight_light_id, listing_75_size_medium_id, 7800),
                (listing_75_material_brass_pol_id, listing_75_weight_light_id, listing_75_size_large_id, 7800),
                (listing_75_material_brass_pol_id, listing_75_weight_light_id, listing_75_size_xl_id, 7800),
                (listing_75_material_brass_pol_id, listing_75_weight_standard_id, listing_75_size_small_id, 8800),
                (listing_75_material_brass_pol_id, listing_75_weight_standard_id, listing_75_size_medium_id, 8800),
                (listing_75_material_brass_pol_id, listing_75_weight_standard_id, listing_75_size_large_id, 8800),
                (listing_75_material_brass_pol_id, listing_75_weight_standard_id, listing_75_size_xl_id, 8800),
                (listing_75_material_copper_wp_id, listing_75_weight_light_id, listing_75_size_small_id, 7800),
                (listing_75_material_copper_wp_id, listing_75_weight_light_id, listing_75_size_medium_id, 7800),
                (listing_75_material_copper_wp_id, listing_75_weight_light_id, listing_75_size_large_id, 7800),
                (listing_75_material_copper_wp_id, listing_75_weight_light_id, listing_75_size_xl_id, 7800),
                (listing_75_material_copper_wp_id, listing_75_weight_standard_id, listing_75_size_small_id, 8800),
                (listing_75_material_copper_wp_id, listing_75_weight_standard_id, listing_75_size_medium_id, 8800),
                (listing_75_material_copper_wp_id, listing_75_weight_standard_id, listing_75_size_large_id, 8800),
                (listing_75_material_copper_wp_id, listing_75_weight_standard_id, listing_75_size_xl_id, 8800),
                (listing_75_material_copper_pol_id, listing_75_weight_light_id, listing_75_size_small_id, 7800),
                (listing_75_material_copper_pol_id, listing_75_weight_light_id, listing_75_size_medium_id, 7800),
                (listing_75_material_copper_pol_id, listing_75_weight_light_id, listing_75_size_large_id, 7800),
                (listing_75_material_copper_pol_id, listing_75_weight_light_id, listing_75_size_xl_id, 7800),
                (listing_75_material_copper_pol_id, listing_75_weight_standard_id, listing_75_size_small_id, 8800),
                (listing_75_material_copper_pol_id, listing_75_weight_standard_id, listing_75_size_medium_id, 8800),
                (listing_75_material_copper_pol_id, listing_75_weight_standard_id, listing_75_size_large_id, 8800),
                (listing_75_material_copper_pol_id, listing_75_weight_standard_id, listing_75_size_xl_id, 8800),
                (listing_75_material_steel_wp_id, listing_75_weight_light_id, listing_75_size_small_id, 9800),
                (listing_75_material_steel_wp_id, listing_75_weight_light_id, listing_75_size_medium_id, 9800),
                (listing_75_material_steel_wp_id, listing_75_weight_light_id, listing_75_size_large_id, 9800),
                (listing_75_material_steel_wp_id, listing_75_weight_light_id, listing_75_size_xl_id, 9800),
                (listing_75_material_steel_pol_id, listing_75_weight_light_id, listing_75_size_small_id, 9800),
                (listing_75_material_steel_pol_id, listing_75_weight_light_id, listing_75_size_medium_id, 9800),
                (listing_75_material_steel_pol_id, listing_75_weight_light_id, listing_75_size_large_id, 9800),
                (listing_75_material_steel_pol_id, listing_75_weight_light_id, listing_75_size_xl_id, 9800)
        )
        SELECT jsonb_object_agg(
            listing_75_material_variation_id || ':' || materials.id || '|' || listing_75_weight_variation_id || ':' || weights.id || '|' || listing_75_size_variation_id || ':' || sizes.id,
            jsonb_build_object('priceCents', priced.price_cents, 'disabled', priced.price_cents IS NULL, 'inventory', catalog_default_inventory)
        )
        FROM materials
        CROSS JOIN weights
        CROSS JOIN sizes
        LEFT JOIN priced ON priced.material_id = materials.id AND priced.weight_id = weights.id AND priced.size_id = sizes.id
    );

    listing_75_variation_images := (
        WITH materials(id) AS (
            VALUES
                (listing_75_material_brass_wp_id),
                (listing_75_material_brass_pol_id),
                (listing_75_material_copper_wp_id),
                (listing_75_material_copper_pol_id),
                (listing_75_material_steel_wp_id),
                (listing_75_material_steel_pol_id)
        ), weights(id) AS (
            VALUES
                (listing_75_weight_light_id),
                (listing_75_weight_standard_id)
        ), heroes(material_id, weight_id, image_uuid) AS (
            VALUES
                (listing_75_material_brass_wp_id, listing_75_weight_standard_id, listing_75_brass_wp_standard_image_uuid),
                (listing_75_material_copper_wp_id, listing_75_weight_standard_id, listing_75_copper_wp_standard_image_uuid),
                (listing_75_material_brass_pol_id, listing_75_weight_standard_id, listing_75_brass_pol_standard_image_uuid),
                (listing_75_material_copper_pol_id, listing_75_weight_standard_id, listing_75_copper_pol_standard_image_uuid),
                (listing_75_material_brass_wp_id, listing_75_weight_light_id, listing_75_brass_wp_light_image_uuid),
                (listing_75_material_copper_wp_id, listing_75_weight_light_id, listing_75_copper_wp_light_image_uuid),
                (listing_75_material_brass_pol_id, listing_75_weight_light_id, listing_75_brass_pol_light_image_uuid),
                (listing_75_material_copper_pol_id, listing_75_weight_light_id, listing_75_copper_pol_light_image_uuid),
                (listing_75_material_steel_pol_id, listing_75_weight_light_id, listing_75_steel_pol_light_image_uuid),
                (listing_75_material_steel_wp_id, listing_75_weight_light_id, listing_75_steel_wp_light_image_uuid)
        )
        SELECT jsonb_object_agg(
            listing_75_material_variation_id || ':' || materials.id || '|' || listing_75_weight_variation_id || ':' || weights.id,
            to_jsonb(heroes.image_uuid)
        )
        FROM materials
        CROSS JOIN weights
        LEFT JOIN heroes ON heroes.material_id = materials.id AND heroes.weight_id = weights.id
    );

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at, variation_images)
    VALUES
        (listing_75_id, listing_75_short_id, listing_75_shop_id, listing_75_category_id, listing_75_country_code, listing_75_title, listing_75_subtitle, listing_75_full_descr, listing_75_price_cents, NULL, NULL, listing_75_image_uuids, NULL,
            jsonb_build_object(
                listing_75_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', false,
                    'imagesVary', false,
                    'order', 0,
                    'defaultOption', listing_75_size_medium_id,
                    'options', jsonb_build_object(
                        listing_75_size_small_id, jsonb_build_object('name', 'Small', 'order', 0, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_75_size_medium_id, jsonb_build_object('name', 'Medium', 'order', 1, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_75_size_large_id, jsonb_build_object('name', 'Large', 'order', 2, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_75_size_xl_id, jsonb_build_object('name', 'XL', 'order', 3, 'priceCents', null, 'imageUuids', '[]'::jsonb)
                    )
                ),
                listing_75_material_variation_id, jsonb_build_object(
                    'name', 'Material',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 1,
                    'defaultOption', listing_75_material_brass_wp_id,
                    'options', jsonb_build_object(
                        listing_75_material_brass_wp_id, jsonb_build_object('name', 'Brass / Work Patina', 'order', 0, 'priceCents', null, 'imageUuids', to_jsonb(listing_75_brass_wp_option_image_uuids)),
                        listing_75_material_brass_pol_id, jsonb_build_object('name', 'Brass / Polished', 'order', 1, 'priceCents', null, 'imageUuids', to_jsonb(listing_75_brass_pol_option_image_uuids)),
                        listing_75_material_copper_wp_id, jsonb_build_object('name', 'Copper / Work Patina', 'order', 2, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_75_material_copper_pol_id, jsonb_build_object('name', 'Copper / Polished', 'order', 3, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_75_material_steel_wp_id, jsonb_build_object('name', 'Stainless Steel / Work Patina', 'order', 4, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_75_material_steel_pol_id, jsonb_build_object('name', 'Stainless Steel / Polished', 'order', 5, 'priceCents', null, 'imageUuids', to_jsonb(listing_75_steel_pol_option_image_uuids))
                    )
                ),
                listing_75_weight_variation_id, jsonb_build_object(
                    'name', 'Weight',
                    'pricesVary', false,
                    'imagesVary', true,
                    'order', 2,
                    'defaultOption', listing_75_weight_standard_id,
                    'options', jsonb_build_object(
                        listing_75_weight_light_id, jsonb_build_object('name', 'Lightweight', 'order', 0, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_75_weight_standard_id, jsonb_build_object('name', 'Standard Weight', 'order', 1, 'priceCents', null, 'imageUuids', '[]'::jsonb)
                    )
                )
            ),
            listing_75_combinations, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, listing_75_variation_images)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        variation_images = EXCLUDED.variation_images,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    listing_76_combinations := (
        WITH materials(id) AS (
            VALUES
                (listing_76_material_brass_wp_id),
                (listing_76_material_brass_pol_id),
                (listing_76_material_copper_wp_id),
                (listing_76_material_copper_pol_id),
                (listing_76_material_steel_wp_id),
                (listing_76_material_steel_pol_id)
        ), weights(id) AS (
            VALUES
                (listing_76_weight_light_id),
                (listing_76_weight_standard_id),
                (listing_76_weight_heavy_id)
        ), sizes(id) AS (
            VALUES
                (listing_76_size_small_id),
                (listing_76_size_medium_id),
                (listing_76_size_large_id),
                (listing_76_size_xl_id)
        ), priced(material_id, weight_id, size_id, price_cents) AS (
            VALUES
                (listing_76_material_brass_wp_id, listing_76_weight_light_id, listing_76_size_small_id, 7800),
                (listing_76_material_brass_wp_id, listing_76_weight_light_id, listing_76_size_medium_id, 7800),
                (listing_76_material_brass_wp_id, listing_76_weight_light_id, listing_76_size_large_id, 7800),
                (listing_76_material_brass_wp_id, listing_76_weight_light_id, listing_76_size_xl_id, 7800),
                (listing_76_material_brass_wp_id, listing_76_weight_standard_id, listing_76_size_small_id, 8800),
                (listing_76_material_brass_wp_id, listing_76_weight_standard_id, listing_76_size_medium_id, 8800),
                (listing_76_material_brass_wp_id, listing_76_weight_standard_id, listing_76_size_large_id, 8800),
                (listing_76_material_brass_wp_id, listing_76_weight_standard_id, listing_76_size_xl_id, 8800),
                (listing_76_material_brass_wp_id, listing_76_weight_heavy_id, listing_76_size_small_id, 9800),
                (listing_76_material_brass_wp_id, listing_76_weight_heavy_id, listing_76_size_medium_id, 9800),
                (listing_76_material_brass_wp_id, listing_76_weight_heavy_id, listing_76_size_large_id, 9800),
                (listing_76_material_brass_wp_id, listing_76_weight_heavy_id, listing_76_size_xl_id, 9800),
                (listing_76_material_brass_pol_id, listing_76_weight_light_id, listing_76_size_small_id, 7800),
                (listing_76_material_brass_pol_id, listing_76_weight_light_id, listing_76_size_medium_id, 7800),
                (listing_76_material_brass_pol_id, listing_76_weight_light_id, listing_76_size_large_id, 7800),
                (listing_76_material_brass_pol_id, listing_76_weight_light_id, listing_76_size_xl_id, 7800),
                (listing_76_material_brass_pol_id, listing_76_weight_standard_id, listing_76_size_small_id, 8800),
                (listing_76_material_brass_pol_id, listing_76_weight_standard_id, listing_76_size_medium_id, 8800),
                (listing_76_material_brass_pol_id, listing_76_weight_standard_id, listing_76_size_large_id, 8800),
                (listing_76_material_brass_pol_id, listing_76_weight_standard_id, listing_76_size_xl_id, 8800),
                (listing_76_material_brass_pol_id, listing_76_weight_heavy_id, listing_76_size_small_id, 9800),
                (listing_76_material_brass_pol_id, listing_76_weight_heavy_id, listing_76_size_medium_id, 9800),
                (listing_76_material_brass_pol_id, listing_76_weight_heavy_id, listing_76_size_large_id, 9800),
                (listing_76_material_brass_pol_id, listing_76_weight_heavy_id, listing_76_size_xl_id, 9800),
                (listing_76_material_copper_wp_id, listing_76_weight_light_id, listing_76_size_small_id, 7800),
                (listing_76_material_copper_wp_id, listing_76_weight_light_id, listing_76_size_medium_id, 7800),
                (listing_76_material_copper_wp_id, listing_76_weight_light_id, listing_76_size_large_id, 7800),
                (listing_76_material_copper_wp_id, listing_76_weight_light_id, listing_76_size_xl_id, 7800),
                (listing_76_material_copper_wp_id, listing_76_weight_standard_id, listing_76_size_small_id, 8800),
                (listing_76_material_copper_wp_id, listing_76_weight_standard_id, listing_76_size_medium_id, 8800),
                (listing_76_material_copper_wp_id, listing_76_weight_standard_id, listing_76_size_large_id, 8800),
                (listing_76_material_copper_wp_id, listing_76_weight_standard_id, listing_76_size_xl_id, 8800),
                (listing_76_material_copper_wp_id, listing_76_weight_heavy_id, listing_76_size_small_id, 9800),
                (listing_76_material_copper_wp_id, listing_76_weight_heavy_id, listing_76_size_medium_id, 9800),
                (listing_76_material_copper_wp_id, listing_76_weight_heavy_id, listing_76_size_large_id, 9800),
                (listing_76_material_copper_wp_id, listing_76_weight_heavy_id, listing_76_size_xl_id, 9800),
                (listing_76_material_copper_pol_id, listing_76_weight_light_id, listing_76_size_small_id, 7800),
                (listing_76_material_copper_pol_id, listing_76_weight_light_id, listing_76_size_medium_id, 7800),
                (listing_76_material_copper_pol_id, listing_76_weight_light_id, listing_76_size_large_id, 7800),
                (listing_76_material_copper_pol_id, listing_76_weight_light_id, listing_76_size_xl_id, 7800),
                (listing_76_material_copper_pol_id, listing_76_weight_standard_id, listing_76_size_small_id, 8800),
                (listing_76_material_copper_pol_id, listing_76_weight_standard_id, listing_76_size_medium_id, 8800),
                (listing_76_material_copper_pol_id, listing_76_weight_standard_id, listing_76_size_large_id, 8800),
                (listing_76_material_copper_pol_id, listing_76_weight_standard_id, listing_76_size_xl_id, 8800),
                (listing_76_material_copper_pol_id, listing_76_weight_heavy_id, listing_76_size_small_id, 9800),
                (listing_76_material_copper_pol_id, listing_76_weight_heavy_id, listing_76_size_medium_id, 9800),
                (listing_76_material_copper_pol_id, listing_76_weight_heavy_id, listing_76_size_large_id, 9800),
                (listing_76_material_copper_pol_id, listing_76_weight_heavy_id, listing_76_size_xl_id, 9800),
                (listing_76_material_steel_wp_id, listing_76_weight_light_id, listing_76_size_small_id, 9800),
                (listing_76_material_steel_wp_id, listing_76_weight_light_id, listing_76_size_medium_id, 9800),
                (listing_76_material_steel_wp_id, listing_76_weight_light_id, listing_76_size_large_id, 9800),
                (listing_76_material_steel_wp_id, listing_76_weight_light_id, listing_76_size_xl_id, 9800),
                (listing_76_material_steel_wp_id, listing_76_weight_standard_id, listing_76_size_small_id, 11800),
                (listing_76_material_steel_wp_id, listing_76_weight_standard_id, listing_76_size_medium_id, 11800),
                (listing_76_material_steel_wp_id, listing_76_weight_standard_id, listing_76_size_large_id, 11800),
                (listing_76_material_steel_wp_id, listing_76_weight_standard_id, listing_76_size_xl_id, 11800),
                (listing_76_material_steel_pol_id, listing_76_weight_light_id, listing_76_size_small_id, 9800),
                (listing_76_material_steel_pol_id, listing_76_weight_light_id, listing_76_size_medium_id, 9800),
                (listing_76_material_steel_pol_id, listing_76_weight_light_id, listing_76_size_large_id, 9800),
                (listing_76_material_steel_pol_id, listing_76_weight_light_id, listing_76_size_xl_id, 9800),
                (listing_76_material_steel_pol_id, listing_76_weight_standard_id, listing_76_size_small_id, 11800),
                (listing_76_material_steel_pol_id, listing_76_weight_standard_id, listing_76_size_medium_id, 11800),
                (listing_76_material_steel_pol_id, listing_76_weight_standard_id, listing_76_size_large_id, 11800),
                (listing_76_material_steel_pol_id, listing_76_weight_standard_id, listing_76_size_xl_id, 11800)
        )
        SELECT jsonb_object_agg(
            listing_76_material_variation_id || ':' || materials.id || '|' || listing_76_weight_variation_id || ':' || weights.id || '|' || listing_76_size_variation_id || ':' || sizes.id,
            jsonb_build_object('priceCents', priced.price_cents, 'disabled', priced.price_cents IS NULL, 'inventory', catalog_default_inventory)
        )
        FROM materials
        CROSS JOIN weights
        CROSS JOIN sizes
        LEFT JOIN priced ON priced.material_id = materials.id AND priced.weight_id = weights.id AND priced.size_id = sizes.id
    );

    listing_76_variation_images := (
        WITH materials(id) AS (
            VALUES
                (listing_76_material_brass_wp_id),
                (listing_76_material_brass_pol_id),
                (listing_76_material_copper_wp_id),
                (listing_76_material_copper_pol_id),
                (listing_76_material_steel_wp_id),
                (listing_76_material_steel_pol_id)
        ), weights(id) AS (
            VALUES
                (listing_76_weight_light_id),
                (listing_76_weight_standard_id),
                (listing_76_weight_heavy_id)
        ), heroes(material_id, weight_id, image_uuid) AS (
            VALUES
                (listing_76_material_brass_wp_id, listing_76_weight_standard_id, listing_76_brass_wp_standard_image_uuid),
                (listing_76_material_copper_wp_id, listing_76_weight_standard_id, listing_76_copper_wp_standard_image_uuid),
                (listing_76_material_brass_pol_id, listing_76_weight_standard_id, listing_76_brass_pol_standard_image_uuid),
                (listing_76_material_copper_pol_id, listing_76_weight_standard_id, listing_76_copper_pol_standard_image_uuid),
                (listing_76_material_steel_wp_id, listing_76_weight_standard_id, listing_76_steel_wp_standard_image_uuid),
                (listing_76_material_steel_pol_id, listing_76_weight_standard_id, listing_76_steel_pol_standard_image_uuid),
                (listing_76_material_copper_pol_id, listing_76_weight_light_id, listing_76_copper_pol_light_image_uuid),
                (listing_76_material_brass_pol_id, listing_76_weight_light_id, listing_76_brass_pol_light_image_uuid),
                (listing_76_material_copper_wp_id, listing_76_weight_light_id, listing_76_copper_wp_light_image_uuid),
                (listing_76_material_brass_wp_id, listing_76_weight_light_id, listing_76_brass_wp_light_image_uuid),
                (listing_76_material_steel_pol_id, listing_76_weight_light_id, listing_76_steel_pol_light_image_uuid),
                (listing_76_material_steel_wp_id, listing_76_weight_light_id, listing_76_steel_wp_light_image_uuid),
                (listing_76_material_copper_pol_id, listing_76_weight_heavy_id, listing_76_copper_pol_heavy_image_uuid),
                (listing_76_material_brass_pol_id, listing_76_weight_heavy_id, listing_76_brass_pol_heavy_image_uuid),
                (listing_76_material_copper_wp_id, listing_76_weight_heavy_id, listing_76_copper_wp_heavy_image_uuid),
                (listing_76_material_brass_wp_id, listing_76_weight_heavy_id, listing_76_brass_wp_heavy_image_uuid)
        )
        SELECT jsonb_object_agg(
            listing_76_material_variation_id || ':' || materials.id || '|' || listing_76_weight_variation_id || ':' || weights.id,
            to_jsonb(heroes.image_uuid)
        )
        FROM materials
        CROSS JOIN weights
        LEFT JOIN heroes ON heroes.material_id = materials.id AND heroes.weight_id = weights.id
    );

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at, variation_images)
    VALUES
        (listing_76_id, listing_76_short_id, listing_76_shop_id, listing_76_category_id, listing_76_country_code, listing_76_title, listing_76_subtitle, listing_76_full_descr, listing_76_price_cents, NULL, NULL, listing_76_image_uuids, NULL,
            jsonb_build_object(
                listing_76_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', false,
                    'imagesVary', false,
                    'order', 0,
                    'defaultOption', listing_76_size_medium_id,
                    'options', jsonb_build_object(
                        listing_76_size_small_id, jsonb_build_object('name', 'Small', 'order', 0, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_76_size_medium_id, jsonb_build_object('name', 'Medium', 'order', 1, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_76_size_large_id, jsonb_build_object('name', 'Large', 'order', 2, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_76_size_xl_id, jsonb_build_object('name', 'XL', 'order', 3, 'priceCents', null, 'imageUuids', '[]'::jsonb)
                    )
                ),
                listing_76_material_variation_id, jsonb_build_object(
                    'name', 'Material',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 1,
                    'defaultOption', listing_76_material_brass_wp_id,
                    'options', jsonb_build_object(
                        listing_76_material_brass_wp_id, jsonb_build_object('name', 'Brass / Work Patina', 'order', 0, 'priceCents', null, 'imageUuids', to_jsonb(listing_76_brass_wp_option_image_uuids)),
                        listing_76_material_brass_pol_id, jsonb_build_object('name', 'Brass / Polished', 'order', 1, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_76_material_copper_wp_id, jsonb_build_object('name', 'Copper / Work Patina', 'order', 2, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_76_material_copper_pol_id, jsonb_build_object('name', 'Copper / Polished', 'order', 3, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_76_material_steel_wp_id, jsonb_build_object('name', 'Stainless Steel / Work Patina', 'order', 4, 'priceCents', null, 'imageUuids', to_jsonb(listing_76_steel_wp_option_image_uuids)),
                        listing_76_material_steel_pol_id, jsonb_build_object('name', 'Stainless Steel / Polished', 'order', 5, 'priceCents', null, 'imageUuids', to_jsonb(listing_76_steel_pol_option_image_uuids))
                    )
                ),
                listing_76_weight_variation_id, jsonb_build_object(
                    'name', 'Weight',
                    'pricesVary', false,
                    'imagesVary', true,
                    'order', 2,
                    'defaultOption', listing_76_weight_standard_id,
                    'options', jsonb_build_object(
                        listing_76_weight_light_id, jsonb_build_object('name', 'Lightweight', 'order', 0, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_76_weight_standard_id, jsonb_build_object('name', 'Standard Weight', 'order', 1, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_76_weight_heavy_id, jsonb_build_object('name', 'Heavyweight', 'order', 2, 'priceCents', null, 'imageUuids', '[]'::jsonb)
                    )
                )
            ),
            listing_76_combinations, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, listing_76_variation_images)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        variation_images = EXCLUDED.variation_images,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    listing_77_combinations := (
        WITH materials(id) AS (
            VALUES
                (listing_77_material_brass_wp_id),
                (listing_77_material_brass_pol_id),
                (listing_77_material_copper_wp_id),
                (listing_77_material_copper_pol_id)
        ), sizes(id) AS (
            VALUES
                (listing_77_size_small_id),
                (listing_77_size_medium_id),
                (listing_77_size_large_id),
                (listing_77_size_xl_id),
                (listing_77_size_xxl_id)
        )
        SELECT jsonb_object_agg(
            listing_77_material_variation_id || ':' || materials.id || '|' || listing_77_size_variation_id || ':' || sizes.id,
            jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory)
        )
        FROM materials
        CROSS JOIN sizes
    );

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_77_id, listing_77_short_id, listing_77_shop_id, listing_77_category_id, listing_77_country_code, listing_77_title, listing_77_subtitle, listing_77_full_descr, listing_77_price_cents, NULL, NULL, listing_77_image_uuids, NULL,
            jsonb_build_object(
                listing_77_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', false,
                    'imagesVary', false,
                    'order', 0,
                    'defaultOption', listing_77_size_medium_id,
                    'options', jsonb_build_object(
                        listing_77_size_small_id, jsonb_build_object('name', 'Small', 'order', 0, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_77_size_medium_id, jsonb_build_object('name', 'Medium', 'order', 1, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_77_size_large_id, jsonb_build_object('name', 'Large', 'order', 2, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_77_size_xl_id, jsonb_build_object('name', 'XL', 'order', 3, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_77_size_xxl_id, jsonb_build_object('name', 'XXL', 'order', 4, 'priceCents', null, 'imageUuids', '[]'::jsonb)
                    )
                ),
                listing_77_material_variation_id, jsonb_build_object(
                    'name', 'Material',
                    'pricesVary', false,
                    'imagesVary', true,
                    'order', 1,
                    'defaultOption', listing_77_material_brass_wp_id,
                    'options', jsonb_build_object(
                        listing_77_material_brass_wp_id, jsonb_build_object('name', 'Brass / Work Patina', 'order', 0, 'priceCents', null, 'imageUuids', to_jsonb(listing_77_brass_wp_image_uuids)),
                        listing_77_material_brass_pol_id, jsonb_build_object('name', 'Brass / Polished', 'order', 1, 'priceCents', null, 'imageUuids', to_jsonb(listing_77_brass_pol_image_uuids)),
                        listing_77_material_copper_wp_id, jsonb_build_object('name', 'Copper / Work Patina', 'order', 2, 'priceCents', null, 'imageUuids', to_jsonb(listing_77_copper_wp_image_uuids)),
                        listing_77_material_copper_pol_id, jsonb_build_object('name', 'Copper / Polished', 'order', 3, 'priceCents', null, 'imageUuids', to_jsonb(listing_77_copper_pol_image_uuids))
                    )
                )
            ),
            listing_77_combinations, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    listing_78_combinations := (
        WITH materials(id) AS (
            VALUES
                (listing_78_material_wp_id),
                (listing_78_material_pol_id)
        ), sizes(id) AS (
            VALUES
                (listing_78_size_3_id),
                (listing_78_size_3_5_id),
                (listing_78_size_4_id),
                (listing_78_size_4_5_id),
                (listing_78_size_5_id),
                (listing_78_size_5_5_id),
                (listing_78_size_6_id),
                (listing_78_size_6_5_id),
                (listing_78_size_7_id),
                (listing_78_size_7_5_id),
                (listing_78_size_8_id),
                (listing_78_size_8_5_id),
                (listing_78_size_9_id),
                (listing_78_size_9_5_id),
                (listing_78_size_10_id),
                (listing_78_size_10_5_id),
                (listing_78_size_11_id),
                (listing_78_size_11_5_id),
                (listing_78_size_12_id),
                (listing_78_size_12_5_id),
                (listing_78_size_13_id),
                (listing_78_size_13_5_id)
        )
        SELECT jsonb_object_agg(
            listing_78_material_variation_id || ':' || materials.id || '|' || listing_78_size_variation_id || ':' || sizes.id,
            jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory)
        )
        FROM materials
        CROSS JOIN sizes
    );

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_78_id, listing_78_short_id, listing_78_shop_id, listing_78_category_id, listing_78_country_code, listing_78_title, listing_78_subtitle, listing_78_full_descr, listing_78_price_cents, NULL, NULL, listing_78_image_uuids, NULL,
            jsonb_build_object(
                listing_78_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', false,
                    'imagesVary', false,
                    'order', 0,
                    'defaultOption', listing_78_size_9_id,
                    'options', jsonb_build_object(
                        listing_78_size_3_id, jsonb_build_object('name', '3', 'order', 0, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_3_5_id, jsonb_build_object('name', '3.5', 'order', 1, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_4_id, jsonb_build_object('name', '4', 'order', 2, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_4_5_id, jsonb_build_object('name', '4.5', 'order', 3, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_5_id, jsonb_build_object('name', '5', 'order', 4, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_5_5_id, jsonb_build_object('name', '5.5', 'order', 5, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_6_id, jsonb_build_object('name', '6', 'order', 6, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_6_5_id, jsonb_build_object('name', '6.5', 'order', 7, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_7_id, jsonb_build_object('name', '7', 'order', 8, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_7_5_id, jsonb_build_object('name', '7.5', 'order', 9, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_8_id, jsonb_build_object('name', '8', 'order', 10, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_8_5_id, jsonb_build_object('name', '8.5', 'order', 11, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_9_id, jsonb_build_object('name', '9', 'order', 12, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_9_5_id, jsonb_build_object('name', '9.5', 'order', 13, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_10_id, jsonb_build_object('name', '10', 'order', 14, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_10_5_id, jsonb_build_object('name', '10.5', 'order', 15, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_11_id, jsonb_build_object('name', '11', 'order', 16, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_11_5_id, jsonb_build_object('name', '11.5', 'order', 17, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_12_id, jsonb_build_object('name', '12', 'order', 18, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_12_5_id, jsonb_build_object('name', '12.5', 'order', 19, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_13_id, jsonb_build_object('name', '13', 'order', 20, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_78_size_13_5_id, jsonb_build_object('name', '13.5', 'order', 21, 'priceCents', null, 'imageUuids', '[]'::jsonb)
                    )
                ),
                listing_78_material_variation_id, jsonb_build_object(
                    'name', 'Material',
                    'pricesVary', false,
                    'imagesVary', true,
                    'order', 1,
                    'defaultOption', listing_78_material_wp_id,
                    'options', jsonb_build_object(
                        listing_78_material_wp_id, jsonb_build_object('name', 'Brass / Work Patina', 'order', 0, 'priceCents', null, 'imageUuids', to_jsonb(listing_78_wp_image_uuids)),
                        listing_78_material_pol_id, jsonb_build_object('name', 'Brass / Polished', 'order', 1, 'priceCents', null, 'imageUuids', to_jsonb(listing_78_pol_image_uuids))
                    )
                )
            ),
            listing_78_combinations, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    listing_80_combinations := (
        WITH widths(id) AS (
            VALUES
                (listing_80_width_2mm_id),
                (listing_80_width_4mm_id),
                (listing_80_width_6mm_id)
        ), sizes(id) AS (
            VALUES
                (listing_80_size_4_id),
                (listing_80_size_4_5_id),
                (listing_80_size_5_id),
                (listing_80_size_5_5_id),
                (listing_80_size_6_id),
                (listing_80_size_6_5_id),
                (listing_80_size_7_id),
                (listing_80_size_7_5_id),
                (listing_80_size_8_id),
                (listing_80_size_8_5_id),
                (listing_80_size_9_id),
                (listing_80_size_9_5_id),
                (listing_80_size_10_id),
                (listing_80_size_10_5_id),
                (listing_80_size_11_id),
                (listing_80_size_11_5_id),
                (listing_80_size_12_id),
                (listing_80_size_12_5_id)
        )
        SELECT jsonb_object_agg(
            listing_80_width_variation_id || ':' || widths.id || '|' || listing_80_size_variation_id || ':' || sizes.id,
            jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory)
        )
        FROM widths
        CROSS JOIN sizes
    );

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_80_id, listing_80_short_id, listing_80_shop_id, listing_80_category_id, listing_80_country_code, listing_80_title, listing_80_subtitle, listing_80_full_descr, listing_80_price_cents, NULL, NULL, listing_80_image_uuids, NULL,
            jsonb_build_object(
                listing_80_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', false,
                    'imagesVary', false,
                    'order', 0,
                    'defaultOption', listing_80_size_7_id,
                    'options', jsonb_build_object(
                        listing_80_size_4_id, jsonb_build_object('name', '4', 'order', 0, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_80_size_4_5_id, jsonb_build_object('name', '4.5', 'order', 1, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_80_size_5_id, jsonb_build_object('name', '5', 'order', 2, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_80_size_5_5_id, jsonb_build_object('name', '5.5', 'order', 3, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_80_size_6_id, jsonb_build_object('name', '6', 'order', 4, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_80_size_6_5_id, jsonb_build_object('name', '6.5', 'order', 5, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_80_size_7_id, jsonb_build_object('name', '7', 'order', 6, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_80_size_7_5_id, jsonb_build_object('name', '7.5', 'order', 7, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_80_size_8_id, jsonb_build_object('name', '8', 'order', 8, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_80_size_8_5_id, jsonb_build_object('name', '8.5', 'order', 9, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_80_size_9_id, jsonb_build_object('name', '9', 'order', 10, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_80_size_9_5_id, jsonb_build_object('name', '9.5', 'order', 11, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_80_size_10_id, jsonb_build_object('name', '10', 'order', 12, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_80_size_10_5_id, jsonb_build_object('name', '10.5', 'order', 13, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_80_size_11_id, jsonb_build_object('name', '11', 'order', 14, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_80_size_11_5_id, jsonb_build_object('name', '11.5', 'order', 15, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_80_size_12_id, jsonb_build_object('name', '12', 'order', 16, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_80_size_12_5_id, jsonb_build_object('name', '12.5', 'order', 17, 'priceCents', null, 'imageUuids', '[]'::jsonb)
                    )
                ),
                listing_80_width_variation_id, jsonb_build_object(
                    'name', 'Width',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 1,
                    'defaultOption', listing_80_width_4mm_id,
                    'options', jsonb_build_object(
                        listing_80_width_2mm_id, jsonb_build_object('name', '2 mm', 'order', 0, 'priceCents', 11800, 'imageUuids', to_jsonb(listing_80_2mm_image_uuids)),
                        listing_80_width_4mm_id, jsonb_build_object('name', '4 mm', 'order', 1, 'priceCents', 20800, 'imageUuids', to_jsonb(listing_80_4mm_image_uuids)),
                        listing_80_width_6mm_id, jsonb_build_object('name', '6 mm', 'order', 2, 'priceCents', 29800, 'imageUuids', to_jsonb(listing_80_6mm_image_uuids))
                    )
                )
            ),
            listing_80_combinations, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    listing_79_combinations := (
        WITH materials(id) AS (
            VALUES
                (listing_79_material_sterling_wp_id),
                (listing_79_material_sterling_pol_id),
                (listing_79_material_brass_wp_id),
                (listing_79_material_brass_pol_id),
                (listing_79_material_copper_wp_id),
                (listing_79_material_copper_pol_id)
        ), sizes(id) AS (
            VALUES
                (listing_79_size_4_id),
                (listing_79_size_4_5_id),
                (listing_79_size_5_id),
                (listing_79_size_5_5_id),
                (listing_79_size_6_id),
                (listing_79_size_6_5_id),
                (listing_79_size_7_id),
                (listing_79_size_7_5_id),
                (listing_79_size_8_id),
                (listing_79_size_8_5_id),
                (listing_79_size_9_id),
                (listing_79_size_9_5_id),
                (listing_79_size_10_id),
                (listing_79_size_10_5_id),
                (listing_79_size_11_id),
                (listing_79_size_11_5_id),
                (listing_79_size_12_id),
                (listing_79_size_12_5_id)
        )
        SELECT jsonb_object_agg(
            listing_79_material_variation_id || ':' || materials.id || '|' || listing_79_size_variation_id || ':' || sizes.id,
            jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory)
        )
        FROM materials
        CROSS JOIN sizes
    );

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_79_id, listing_79_short_id, listing_79_shop_id, listing_79_category_id, listing_79_country_code, listing_79_title, listing_79_subtitle, listing_79_full_descr, listing_79_price_cents, NULL, NULL, listing_79_image_uuids, NULL,
            jsonb_build_object(
                listing_79_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', false,
                    'imagesVary', false,
                    'order', 0,
                    'defaultOption', listing_79_size_7_id,
                    'options', jsonb_build_object(
                        listing_79_size_4_id, jsonb_build_object('name', '4', 'order', 0, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_79_size_4_5_id, jsonb_build_object('name', '4.5', 'order', 1, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_79_size_5_id, jsonb_build_object('name', '5', 'order', 2, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_79_size_5_5_id, jsonb_build_object('name', '5.5', 'order', 3, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_79_size_6_id, jsonb_build_object('name', '6', 'order', 4, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_79_size_6_5_id, jsonb_build_object('name', '6.5', 'order', 5, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_79_size_7_id, jsonb_build_object('name', '7', 'order', 6, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_79_size_7_5_id, jsonb_build_object('name', '7.5', 'order', 7, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_79_size_8_id, jsonb_build_object('name', '8', 'order', 8, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_79_size_8_5_id, jsonb_build_object('name', '8.5', 'order', 9, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_79_size_9_id, jsonb_build_object('name', '9', 'order', 10, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_79_size_9_5_id, jsonb_build_object('name', '9.5', 'order', 11, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_79_size_10_id, jsonb_build_object('name', '10', 'order', 12, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_79_size_10_5_id, jsonb_build_object('name', '10.5', 'order', 13, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_79_size_11_id, jsonb_build_object('name', '11', 'order', 14, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_79_size_11_5_id, jsonb_build_object('name', '11.5', 'order', 15, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_79_size_12_id, jsonb_build_object('name', '12', 'order', 16, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_79_size_12_5_id, jsonb_build_object('name', '12.5', 'order', 17, 'priceCents', null, 'imageUuids', '[]'::jsonb)
                    )
                ),
                listing_79_material_variation_id, jsonb_build_object(
                    'name', 'Material',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 1,
                    'defaultOption', listing_79_material_sterling_wp_id,
                    'options', jsonb_build_object(
                        listing_79_material_sterling_wp_id, jsonb_build_object('name', 'Sterling Silver / Work Patina', 'order', 0, 'priceCents', 9800, 'imageUuids', to_jsonb(listing_79_sterling_wp_image_uuids)),
                        listing_79_material_sterling_pol_id, jsonb_build_object('name', 'Sterling Silver / Polished', 'order', 1, 'priceCents', 9800, 'imageUuids', to_jsonb(listing_79_sterling_pol_image_uuids)),
                        listing_79_material_brass_wp_id, jsonb_build_object('name', 'Brass / Work Patina', 'order', 2, 'priceCents', 5800, 'imageUuids', to_jsonb(listing_79_brass_wp_image_uuids)),
                        listing_79_material_brass_pol_id, jsonb_build_object('name', 'Brass / Polished', 'order', 3, 'priceCents', 5800, 'imageUuids', to_jsonb(listing_79_brass_pol_image_uuids)),
                        listing_79_material_copper_wp_id, jsonb_build_object('name', 'Copper / Work Patina', 'order', 4, 'priceCents', 5800, 'imageUuids', to_jsonb(listing_79_copper_wp_image_uuids)),
                        listing_79_material_copper_pol_id, jsonb_build_object('name', 'Copper / Polished', 'order', 5, 'priceCents', 5800, 'imageUuids', to_jsonb(listing_79_copper_pol_image_uuids))
                    )
                )
            ),
            listing_79_combinations, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    listing_81_combinations := (
        WITH materials(id) AS (
            VALUES
                (listing_81_material_brass_id),
                (listing_81_material_sterling_id)
        ), sizes(id) AS (
            VALUES
                (listing_81_size_3_id),
                (listing_81_size_3_5_id),
                (listing_81_size_4_id),
                (listing_81_size_4_5_id),
                (listing_81_size_5_id),
                (listing_81_size_5_5_id),
                (listing_81_size_6_id),
                (listing_81_size_6_5_id),
                (listing_81_size_7_id),
                (listing_81_size_7_5_id),
                (listing_81_size_8_id),
                (listing_81_size_8_5_id),
                (listing_81_size_9_id),
                (listing_81_size_9_5_id),
                (listing_81_size_10_id),
                (listing_81_size_10_5_id),
                (listing_81_size_11_id),
                (listing_81_size_11_5_id),
                (listing_81_size_12_id),
                (listing_81_size_12_5_id),
                (listing_81_size_13_id),
                (listing_81_size_13_5_id)
        )
        SELECT jsonb_object_agg(
            listing_81_material_variation_id || ':' || materials.id || '|' || listing_81_size_variation_id || ':' || sizes.id,
            jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory)
        )
        FROM materials
        CROSS JOIN sizes
    );

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_81_id, listing_81_short_id, listing_81_shop_id, listing_81_category_id, listing_81_country_code, listing_81_title, listing_81_subtitle, listing_81_full_descr, listing_81_price_cents, NULL, NULL, listing_81_image_uuids, NULL,
            jsonb_build_object(
                listing_81_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', false,
                    'imagesVary', false,
                    'order', 0,
                    'defaultOption', listing_81_size_7_id,
                    'options', jsonb_build_object(
                        listing_81_size_3_id, jsonb_build_object('name', '3', 'order', 0, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_3_5_id, jsonb_build_object('name', '3.5', 'order', 1, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_4_id, jsonb_build_object('name', '4', 'order', 2, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_4_5_id, jsonb_build_object('name', '4.5', 'order', 3, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_5_id, jsonb_build_object('name', '5', 'order', 4, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_5_5_id, jsonb_build_object('name', '5.5', 'order', 5, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_6_id, jsonb_build_object('name', '6', 'order', 6, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_6_5_id, jsonb_build_object('name', '6.5', 'order', 7, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_7_id, jsonb_build_object('name', '7', 'order', 8, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_7_5_id, jsonb_build_object('name', '7.5', 'order', 9, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_8_id, jsonb_build_object('name', '8', 'order', 10, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_8_5_id, jsonb_build_object('name', '8.5', 'order', 11, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_9_id, jsonb_build_object('name', '9', 'order', 12, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_9_5_id, jsonb_build_object('name', '9.5', 'order', 13, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_10_id, jsonb_build_object('name', '10', 'order', 14, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_10_5_id, jsonb_build_object('name', '10.5', 'order', 15, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_11_id, jsonb_build_object('name', '11', 'order', 16, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_11_5_id, jsonb_build_object('name', '11.5', 'order', 17, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_12_id, jsonb_build_object('name', '12', 'order', 18, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_12_5_id, jsonb_build_object('name', '12.5', 'order', 19, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_13_id, jsonb_build_object('name', '13', 'order', 20, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_81_size_13_5_id, jsonb_build_object('name', '13.5', 'order', 21, 'priceCents', null, 'imageUuids', '[]'::jsonb)
                    )
                ),
                listing_81_material_variation_id, jsonb_build_object(
                    'name', 'Material',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 1,
                    'defaultOption', listing_81_material_sterling_id,
                    'options', jsonb_build_object(
                        listing_81_material_brass_id, jsonb_build_object('name', 'Brass / Work Patina', 'order', 0, 'priceCents', 9800, 'imageUuids', to_jsonb(listing_81_brass_image_uuids)),
                        listing_81_material_sterling_id, jsonb_build_object('name', 'Sterling Silver / Work Patina', 'order', 1, 'priceCents', 16800, 'imageUuids', to_jsonb(listing_81_sterling_image_uuids))
                    )
                )
            ),
            listing_81_combinations, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    listing_82_combinations := (
        WITH materials(id) AS (
            VALUES
                (listing_82_material_brass_wp_id),
                (listing_82_material_brass_pol_id),
                (listing_82_material_copper_wp_id),
                (listing_82_material_copper_pol_id)
        ), lengths(id) AS (
            VALUES
                (listing_82_length_16_id),
                (listing_82_length_18_id),
                (listing_82_length_20_id),
                (listing_82_length_22_id)
        )
        SELECT jsonb_object_agg(
            listing_82_length_variation_id || ':' || lengths.id || '|' || listing_82_material_variation_id || ':' || materials.id,
            jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory)
        )
        FROM materials
        CROSS JOIN lengths
    );

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_82_id, listing_82_short_id, listing_82_shop_id, listing_82_category_id, listing_82_country_code, listing_82_title, listing_82_subtitle, listing_82_full_descr, listing_82_price_cents, NULL, NULL, listing_82_image_uuids, NULL,
            jsonb_build_object(
                listing_82_length_variation_id, jsonb_build_object(
                    'name', 'Chain Length',
                    'pricesVary', true,
                    'imagesVary', false,
                    'order', 0,
                    'defaultOption', listing_82_length_16_id,
                    'options', jsonb_build_object(
                        listing_82_length_16_id, jsonb_build_object('name', '16"', 'order', 0, 'priceCents', 17800, 'imageUuids', '[]'::jsonb),
                        listing_82_length_18_id, jsonb_build_object('name', '18"', 'order', 1, 'priceCents', 18400, 'imageUuids', '[]'::jsonb),
                        listing_82_length_20_id, jsonb_build_object('name', '20"', 'order', 2, 'priceCents', 19000, 'imageUuids', '[]'::jsonb),
                        listing_82_length_22_id, jsonb_build_object('name', '22"', 'order', 3, 'priceCents', 19600, 'imageUuids', '[]'::jsonb)
                    )
                ),
                listing_82_material_variation_id, jsonb_build_object(
                    'name', 'Material',
                    'pricesVary', false,
                    'imagesVary', true,
                    'order', 1,
                    'defaultOption', listing_82_material_brass_wp_id,
                    'options', jsonb_build_object(
                        listing_82_material_brass_wp_id, jsonb_build_object('name', 'Brass / Work Patina', 'order', 0, 'priceCents', null, 'imageUuids', to_jsonb(listing_82_brass_wp_image_uuids)),
                        listing_82_material_brass_pol_id, jsonb_build_object('name', 'Brass / Polished', 'order', 1, 'priceCents', null, 'imageUuids', to_jsonb(listing_82_brass_pol_image_uuids)),
                        listing_82_material_copper_wp_id, jsonb_build_object('name', 'Copper / Work Patina', 'order', 2, 'priceCents', null, 'imageUuids', to_jsonb(listing_82_copper_wp_image_uuids)),
                        listing_82_material_copper_pol_id, jsonb_build_object('name', 'Copper / Polished', 'order', 3, 'priceCents', null, 'imageUuids', to_jsonb(listing_82_copper_pol_image_uuids))
                    )
                )
            ),
            listing_82_combinations, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    listing_83_combinations := (
        WITH materials(id) AS (
            VALUES
                (listing_83_material_brass_wp_id),
                (listing_83_material_brass_pol_id),
                (listing_83_material_copper_wp_id),
                (listing_83_material_copper_pol_id),
                (listing_83_material_sterling_wp_id),
                (listing_83_material_sterling_pol_id)
        ), lengths(id) AS (
            VALUES
                (listing_83_length_16_id),
                (listing_83_length_18_id),
                (listing_83_length_20_id),
                (listing_83_length_22_id)
        ), priced(material_id, length_id, price_cents) AS (
            VALUES
                (listing_83_material_brass_wp_id, listing_83_length_16_id, 15800),
                (listing_83_material_brass_wp_id, listing_83_length_18_id, 16400),
                (listing_83_material_brass_wp_id, listing_83_length_20_id, 17000),
                (listing_83_material_brass_wp_id, listing_83_length_22_id, 17600),
                (listing_83_material_brass_pol_id, listing_83_length_16_id, 15800),
                (listing_83_material_brass_pol_id, listing_83_length_18_id, 16400),
                (listing_83_material_brass_pol_id, listing_83_length_20_id, 17000),
                (listing_83_material_brass_pol_id, listing_83_length_22_id, 17600),
                (listing_83_material_copper_wp_id, listing_83_length_16_id, 15800),
                (listing_83_material_copper_wp_id, listing_83_length_18_id, 16400),
                (listing_83_material_copper_wp_id, listing_83_length_20_id, 17000),
                (listing_83_material_copper_wp_id, listing_83_length_22_id, 17600),
                (listing_83_material_copper_pol_id, listing_83_length_16_id, 15800),
                (listing_83_material_copper_pol_id, listing_83_length_18_id, 16400),
                (listing_83_material_copper_pol_id, listing_83_length_20_id, 17000),
                (listing_83_material_copper_pol_id, listing_83_length_22_id, 17600),
                (listing_83_material_sterling_wp_id, listing_83_length_16_id, 131800),
                (listing_83_material_sterling_wp_id, listing_83_length_18_id, 147800),
                (listing_83_material_sterling_wp_id, listing_83_length_20_id, 163800),
                (listing_83_material_sterling_wp_id, listing_83_length_22_id, 180800),
                (listing_83_material_sterling_pol_id, listing_83_length_16_id, 131800),
                (listing_83_material_sterling_pol_id, listing_83_length_18_id, 147800),
                (listing_83_material_sterling_pol_id, listing_83_length_20_id, 163800),
                (listing_83_material_sterling_pol_id, listing_83_length_22_id, 180800)
        )
        SELECT jsonb_object_agg(
            listing_83_length_variation_id || ':' || lengths.id || '|' || listing_83_material_variation_id || ':' || materials.id,
            jsonb_build_object('priceCents', priced.price_cents, 'disabled', false, 'inventory', catalog_default_inventory)
        )
        FROM materials
        CROSS JOIN lengths
        JOIN priced ON priced.material_id = materials.id AND priced.length_id = lengths.id
    );

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_83_id, listing_83_short_id, listing_83_shop_id, listing_83_category_id, listing_83_country_code, listing_83_title, listing_83_subtitle, listing_83_full_descr, listing_83_price_cents, NULL, NULL, listing_83_image_uuids, NULL,
            jsonb_build_object(
                listing_83_length_variation_id, jsonb_build_object(
                    'name', 'Chain Length',
                    'pricesVary', false,
                    'imagesVary', false,
                    'order', 0,
                    'defaultOption', listing_83_length_20_id,
                    'options', jsonb_build_object(
                        listing_83_length_16_id, jsonb_build_object('name', '16"', 'order', 0, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_83_length_18_id, jsonb_build_object('name', '18"', 'order', 1, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_83_length_20_id, jsonb_build_object('name', '20"', 'order', 2, 'priceCents', null, 'imageUuids', '[]'::jsonb),
                        listing_83_length_22_id, jsonb_build_object('name', '22"', 'order', 3, 'priceCents', null, 'imageUuids', '[]'::jsonb)
                    )
                ),
                listing_83_material_variation_id, jsonb_build_object(
                    'name', 'Material',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 1,
                    'defaultOption', listing_83_material_brass_wp_id,
                    'options', jsonb_build_object(
                        listing_83_material_brass_wp_id, jsonb_build_object('name', 'Brass / Work Patina', 'order', 0, 'priceCents', null, 'imageUuids', to_jsonb(listing_83_brass_wp_image_uuids)),
                        listing_83_material_brass_pol_id, jsonb_build_object('name', 'Brass / Polished', 'order', 1, 'priceCents', null, 'imageUuids', to_jsonb(listing_83_brass_pol_image_uuids)),
                        listing_83_material_copper_wp_id, jsonb_build_object('name', 'Copper / Work Patina', 'order', 2, 'priceCents', null, 'imageUuids', to_jsonb(listing_83_copper_wp_image_uuids)),
                        listing_83_material_copper_pol_id, jsonb_build_object('name', 'Copper / Polished', 'order', 3, 'priceCents', null, 'imageUuids', to_jsonb(listing_83_copper_pol_image_uuids)),
                        listing_83_material_sterling_wp_id, jsonb_build_object('name', 'Sterling Silver / Work Patina', 'order', 4, 'priceCents', null, 'imageUuids', to_jsonb(listing_83_sterling_wp_image_uuids)),
                        listing_83_material_sterling_pol_id, jsonb_build_object('name', 'Sterling Silver / Polished', 'order', 5, 'priceCents', null, 'imageUuids', to_jsonb(listing_83_sterling_pol_image_uuids))
                    )
                )
            ),
            listing_83_combinations, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    listing_84_combinations := (
        WITH materials(id) AS (
            VALUES
                (listing_84_material_brass_wp_id),
                (listing_84_material_brass_pol_id),
                (listing_84_material_sterling_wp_id),
                (listing_84_material_sterling_pol_id),
                (listing_84_material_steel_wp_id),
                (listing_84_material_steel_pol_id)
        )
        SELECT jsonb_object_agg(
            listing_84_material_variation_id || ':' || materials.id,
            jsonb_build_object('priceCents', null, 'disabled', false, 'inventory', catalog_default_inventory)
        )
        FROM materials
    );

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_84_id, listing_84_short_id, listing_84_shop_id, listing_84_category_id, listing_84_country_code, listing_84_title, listing_84_subtitle, listing_84_full_descr, listing_84_price_cents, NULL, NULL, listing_84_image_uuids, NULL,
            jsonb_build_object(
                listing_84_material_variation_id, jsonb_build_object(
                    'name', 'Material',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'defaultOption', listing_84_material_brass_wp_id,
                    'options', jsonb_build_object(
                        listing_84_material_brass_wp_id, jsonb_build_object('name', 'Brass / Work Patina', 'order', 0, 'priceCents', 6800, 'imageUuids', to_jsonb(listing_84_brass_wp_image_uuids)),
                        listing_84_material_brass_pol_id, jsonb_build_object('name', 'Brass / Polished', 'order', 1, 'priceCents', 6800, 'imageUuids', to_jsonb(listing_84_brass_pol_image_uuids)),
                        listing_84_material_sterling_wp_id, jsonb_build_object('name', 'Sterling Silver / Work Patina', 'order', 2, 'priceCents', 35800, 'imageUuids', to_jsonb(listing_84_sterling_wp_image_uuids)),
                        listing_84_material_sterling_pol_id, jsonb_build_object('name', 'Sterling Silver / Polished', 'order', 3, 'priceCents', 35800, 'imageUuids', to_jsonb(listing_84_sterling_pol_image_uuids)),
                        listing_84_material_steel_wp_id, jsonb_build_object('name', 'Stainless Steel / Work Patina', 'order', 4, 'priceCents', 7800, 'imageUuids', to_jsonb(listing_84_steel_wp_image_uuids)),
                        listing_84_material_steel_pol_id, jsonb_build_object('name', 'Stainless Steel / Polished', 'order', 5, 'priceCents', 7800, 'imageUuids', to_jsonb(listing_84_steel_pol_image_uuids))
                    )
                )
            ),
            listing_84_combinations, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_85_id, listing_85_short_id, listing_85_shop_id, listing_85_category_id, listing_85_country_code, listing_85_title, listing_85_subtitle, listing_85_full_descr, listing_85_price_cents, NULL, NULL, listing_85_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_86_id, listing_86_short_id, listing_86_shop_id, listing_86_category_id, listing_86_country_code, listing_86_title, listing_86_subtitle, listing_86_full_descr, listing_86_price_cents, NULL, NULL, listing_86_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_87_id, listing_87_short_id, listing_87_shop_id, listing_87_category_id, listing_87_country_code, listing_87_title, listing_87_subtitle, listing_87_full_descr, listing_87_price_cents, NULL, NULL, listing_87_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_88_id, listing_88_short_id, listing_88_shop_id, listing_88_category_id, listing_88_country_code, listing_88_title, listing_88_subtitle, listing_88_full_descr, listing_88_price_cents, NULL, NULL, listing_88_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_89_id, listing_89_short_id, listing_89_shop_id, listing_89_category_id, listing_89_country_code, listing_89_title, listing_89_subtitle, listing_89_full_descr, listing_89_price_cents, NULL, NULL, listing_89_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_90_id, listing_90_short_id, listing_90_shop_id, listing_90_category_id, listing_90_country_code, listing_90_title, listing_90_subtitle, listing_90_full_descr, listing_90_price_cents, NULL, NULL, listing_90_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_91_id, listing_91_short_id, listing_91_shop_id, listing_91_category_id, listing_91_country_code, listing_91_title, listing_91_subtitle, listing_91_full_descr, listing_91_price_cents, NULL, NULL, listing_91_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_92_id, listing_92_short_id, listing_92_shop_id, listing_92_category_id, listing_92_country_code, listing_92_title, listing_92_subtitle, listing_92_full_descr, listing_92_price_cents, NULL, NULL, listing_92_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_93_id, listing_93_short_id, listing_93_shop_id, listing_93_category_id, listing_93_country_code, listing_93_title, listing_93_subtitle, listing_93_full_descr, listing_93_price_cents, NULL, NULL, listing_93_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_94_id, listing_94_short_id, listing_94_shop_id, listing_94_category_id, listing_94_country_code, listing_94_title, listing_94_subtitle, listing_94_full_descr, listing_94_price_cents, NULL, NULL, listing_94_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_95_id, listing_95_short_id, listing_95_shop_id, listing_95_category_id, listing_95_country_code, listing_95_title, listing_95_subtitle, listing_95_full_descr, listing_95_price_cents, NULL, NULL, listing_95_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_96_id, listing_96_short_id, listing_96_shop_id, listing_96_category_id, listing_96_country_code, listing_96_title, listing_96_subtitle, listing_96_full_descr, listing_96_price_cents, NULL, NULL, listing_96_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_97_id, listing_97_short_id, listing_97_shop_id, listing_97_category_id, listing_97_country_code, listing_97_title, listing_97_subtitle, listing_97_full_descr, listing_97_price_cents, NULL, NULL, listing_97_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_98_id, listing_98_short_id, listing_98_shop_id, listing_98_category_id, listing_98_country_code, listing_98_title, listing_98_subtitle, listing_98_full_descr, listing_98_price_cents, NULL, NULL, listing_98_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_99_id, listing_99_short_id, listing_99_shop_id, listing_99_category_id, listing_99_country_code, listing_99_title, listing_99_subtitle, listing_99_full_descr, listing_99_price_cents, NULL, NULL, listing_99_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_100_id, listing_100_short_id, listing_100_shop_id, listing_100_category_id, listing_100_country_code, listing_100_title, listing_100_subtitle, listing_100_full_descr, listing_100_price_cents, NULL, NULL, listing_100_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_101_id, listing_101_short_id, listing_101_shop_id, listing_101_category_id, listing_101_country_code, listing_101_title, listing_101_subtitle, listing_101_full_descr, listing_101_price_cents, NULL, NULL, listing_101_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_102_id, listing_102_short_id, listing_102_shop_id, listing_102_category_id, listing_102_country_code, listing_102_title, listing_102_subtitle, listing_102_full_descr, listing_102_price_cents, NULL, NULL, listing_102_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_103_id, listing_103_short_id, listing_103_shop_id, listing_103_category_id, listing_103_country_code, listing_103_title, listing_103_subtitle, listing_103_full_descr, listing_103_price_cents, NULL, NULL, listing_103_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_104_id, listing_104_short_id, listing_104_shop_id, listing_104_category_id, listing_104_country_code, listing_104_title, listing_104_subtitle, listing_104_full_descr, listing_104_price_cents, NULL, NULL, listing_104_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_105_id, listing_105_short_id, listing_105_shop_id, listing_105_category_id, listing_105_country_code, listing_105_title, listing_105_subtitle, listing_105_full_descr, listing_105_price_cents, NULL, NULL, listing_105_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_106_id, listing_106_short_id, listing_106_shop_id, listing_106_category_id, listing_106_country_code, listing_106_title, listing_106_subtitle, listing_106_full_descr, listing_106_price_cents, NULL, NULL, listing_106_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_107_id, listing_107_short_id, listing_107_shop_id, listing_107_category_id, listing_107_country_code, listing_107_title, listing_107_subtitle, listing_107_full_descr, listing_107_price_cents, NULL, NULL, listing_107_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_108_id, listing_108_short_id, listing_108_shop_id, listing_108_category_id, listing_108_country_code, listing_108_title, listing_108_subtitle, listing_108_full_descr, listing_108_price_cents, NULL, NULL, listing_108_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_109_id, listing_109_short_id, listing_109_shop_id, listing_109_category_id, listing_109_country_code, listing_109_title, listing_109_subtitle, listing_109_full_descr, listing_109_price_cents, NULL, NULL, listing_109_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_110_id, listing_110_short_id, listing_110_shop_id, listing_110_category_id, listing_110_country_code, listing_110_title, listing_110_subtitle, listing_110_full_descr, listing_110_price_cents, NULL, NULL, listing_110_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_111_id, listing_111_short_id, listing_111_shop_id, listing_111_category_id, listing_111_country_code, listing_111_title, listing_111_subtitle, listing_111_full_descr, listing_111_price_cents, NULL, NULL, listing_111_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_112_id, listing_112_short_id, listing_112_shop_id, listing_112_category_id, listing_112_country_code, listing_112_title, listing_112_subtitle, listing_112_full_descr, listing_112_price_cents, NULL, NULL, listing_112_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_113_id, listing_113_short_id, listing_113_shop_id, listing_113_category_id, listing_113_country_code, listing_113_title, listing_113_subtitle, listing_113_full_descr, listing_113_price_cents, NULL, NULL, listing_113_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_114_id, listing_114_short_id, listing_114_shop_id, listing_114_category_id, listing_114_country_code, listing_114_title, listing_114_subtitle, listing_114_full_descr, listing_114_price_cents, NULL, NULL, listing_114_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_115_id, listing_115_short_id, listing_115_shop_id, listing_115_category_id, listing_115_country_code, listing_115_title, listing_115_subtitle, listing_115_full_descr, listing_115_price_cents, NULL, NULL, listing_115_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_116_id, listing_116_short_id, listing_116_shop_id, listing_116_category_id, listing_116_country_code, listing_116_title, listing_116_subtitle, listing_116_full_descr, listing_116_price_cents, NULL, NULL, listing_116_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_117_id, listing_117_short_id, listing_117_shop_id, listing_117_category_id, listing_117_country_code, listing_117_title, listing_117_subtitle, listing_117_full_descr, listing_117_price_cents, NULL, NULL, listing_117_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_118_id, listing_118_short_id, listing_118_shop_id, listing_118_category_id, listing_118_country_code, listing_118_title, listing_118_subtitle, listing_118_full_descr, listing_118_price_cents, NULL, NULL, listing_118_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_119_id, listing_119_short_id, listing_119_shop_id, listing_119_category_id, listing_119_country_code, listing_119_title, listing_119_subtitle, listing_119_full_descr, listing_119_price_cents, NULL, NULL, listing_119_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_120_id, listing_120_short_id, listing_120_shop_id, listing_120_category_id, listing_120_country_code, listing_120_title, listing_120_subtitle, listing_120_full_descr, listing_120_price_cents, NULL, NULL, listing_120_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_121_id, listing_121_short_id, listing_121_shop_id, listing_121_category_id, listing_121_country_code, listing_121_title, listing_121_subtitle, listing_121_full_descr, listing_121_price_cents, NULL, NULL, listing_121_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_122_id, listing_122_short_id, listing_122_shop_id, listing_122_category_id, listing_122_country_code, listing_122_title, listing_122_subtitle, listing_122_full_descr, listing_122_price_cents, NULL, NULL, listing_122_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_123_id, listing_123_short_id, listing_123_shop_id, listing_123_category_id, listing_123_country_code, listing_123_title, listing_123_subtitle, listing_123_full_descr, listing_123_price_cents, NULL, NULL, listing_123_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_124_id, listing_124_short_id, listing_124_shop_id, listing_124_category_id, listing_124_country_code, listing_124_title, listing_124_subtitle, listing_124_full_descr, listing_124_price_cents, NULL, NULL, listing_124_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_125_id, listing_125_short_id, listing_125_shop_id, listing_125_category_id, listing_125_country_code, listing_125_title, listing_125_subtitle, listing_125_full_descr, listing_125_price_cents, NULL, NULL, listing_125_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_126_id, listing_126_short_id, listing_126_shop_id, listing_126_category_id, listing_126_country_code, listing_126_title, listing_126_subtitle, listing_126_full_descr, listing_126_price_cents, NULL, NULL, listing_126_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_127_id, listing_127_short_id, listing_127_shop_id, listing_127_category_id, listing_127_country_code, listing_127_title, listing_127_subtitle, listing_127_full_descr, listing_127_price_cents, NULL, NULL, listing_127_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_128_id, listing_128_short_id, listing_128_shop_id, listing_128_category_id, listing_128_country_code, listing_128_title, listing_128_subtitle, listing_128_full_descr, listing_128_price_cents, NULL, NULL, listing_128_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_129_id, listing_129_short_id, listing_129_shop_id, listing_129_category_id, listing_129_country_code, listing_129_title, listing_129_subtitle, listing_129_full_descr, listing_129_price_cents, NULL, NULL, listing_129_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_130_id, listing_130_short_id, listing_130_shop_id, listing_130_category_id, listing_130_country_code, listing_130_title, listing_130_subtitle, listing_130_full_descr, listing_130_price_cents, NULL, NULL, listing_130_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_131_id, listing_131_short_id, listing_131_shop_id, listing_131_category_id, listing_131_country_code, listing_131_title, listing_131_subtitle, listing_131_full_descr, listing_131_price_cents, NULL, NULL, listing_131_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_132_id, listing_132_short_id, listing_132_shop_id, listing_132_category_id, listing_132_country_code, listing_132_title, listing_132_subtitle, listing_132_full_descr, listing_132_price_cents, NULL, NULL, listing_132_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_133_id, listing_133_short_id, listing_133_shop_id, listing_133_category_id, listing_133_country_code, listing_133_title, listing_133_subtitle, listing_133_full_descr, listing_133_price_cents, NULL, NULL, listing_133_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_134_id, listing_134_short_id, listing_134_shop_id, listing_134_category_id, listing_134_country_code, listing_134_title, listing_134_subtitle, listing_134_full_descr, listing_134_price_cents, NULL, NULL, listing_134_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_135_id, listing_135_short_id, listing_135_shop_id, listing_135_category_id, listing_135_country_code, listing_135_title, listing_135_subtitle, listing_135_full_descr, listing_135_price_cents, NULL, NULL, listing_135_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_136_id, listing_136_short_id, listing_136_shop_id, listing_136_category_id, listing_136_country_code, listing_136_title, listing_136_subtitle, listing_136_full_descr, listing_136_price_cents, NULL, NULL, listing_136_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_137_id, listing_137_short_id, listing_137_shop_id, listing_137_category_id, listing_137_country_code, listing_137_title, listing_137_subtitle, listing_137_full_descr, listing_137_price_cents, NULL, NULL, listing_137_image_uuids, NULL, '{"a45dc66a-34c6-52d9-a539-387cbaf0c717": {"name": "Metal", "order": 0, "pricesVary": true, "imagesVary": true, "defaultOption": "8a03c137-f8d4-5ce3-995b-04afdface242", "options": {"8a03c137-f8d4-5ce3-995b-04afdface242": {"name": "Sterling Silver", "order": 0, "priceCents": 25500, "imageUuids": ["29d11414-e445-4740-8a07-b7c6d2a90dc5"]}, "5b7734fe-1557-5589-a930-e667e3e856b0": {"name": "14k Yellow Gold", "order": 1, "priceCents": 153700, "imageUuids": ["d1f482ef-35e0-4e96-8114-3789dd6c35b1"]}, "f9ae45f4-27f2-5f81-8dcc-0565a4408a23": {"name": "14k Rose Gold", "order": 2, "priceCents": 153700, "imageUuids": ["9cf9a38c-950a-4bb2-afcc-a538309ccc8d"]}, "44e7a2f7-264b-53eb-81e0-045868bd8c3b": {"name": "14k White Gold", "order": 3, "priceCents": 153700, "imageUuids": ["d399b0ce-6d9f-48f8-959a-7806e9573dda"]}, "9eb9d960-a792-57b7-bc07-793511dc3b83": {"name": "18k Yellow Gold", "order": 4, "priceCents": 229400, "imageUuids": ["8ed5de3a-10cc-4607-8b13-8f111de348e1"]}, "9f976fdb-d57a-576a-b67c-611b7c804e2d": {"name": "Platinum", "order": 5, "priceCents": 189000, "imageUuids": ["179ffb1d-80ca-4112-9410-9eae6f56a15b"]}}}}'::jsonb, '{"a45dc66a-34c6-52d9-a539-387cbaf0c717:8a03c137-f8d4-5ce3-995b-04afdface242": {"priceCents": null, "disabled": false, "inventory": 5}, "a45dc66a-34c6-52d9-a539-387cbaf0c717:5b7734fe-1557-5589-a930-e667e3e856b0": {"priceCents": null, "disabled": false, "inventory": 5}, "a45dc66a-34c6-52d9-a539-387cbaf0c717:f9ae45f4-27f2-5f81-8dcc-0565a4408a23": {"priceCents": null, "disabled": false, "inventory": 5}, "a45dc66a-34c6-52d9-a539-387cbaf0c717:44e7a2f7-264b-53eb-81e0-045868bd8c3b": {"priceCents": null, "disabled": false, "inventory": 5}, "a45dc66a-34c6-52d9-a539-387cbaf0c717:9eb9d960-a792-57b7-bc07-793511dc3b83": {"priceCents": null, "disabled": false, "inventory": 5}, "a45dc66a-34c6-52d9-a539-387cbaf0c717:9f976fdb-d57a-576a-b67c-611b7c804e2d": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_138_id, listing_138_short_id, listing_138_shop_id, listing_138_category_id, listing_138_country_code, listing_138_title, listing_138_subtitle, listing_138_full_descr, listing_138_price_cents, NULL, NULL, listing_138_image_uuids, NULL, '{"bbcc87c4-1db4-5605-b667-1abfe3c1d1bf": {"name": "Metal", "order": 0, "pricesVary": true, "imagesVary": true, "defaultOption": "358b2762-1e82-5e01-b0cf-4f232db1c21c", "options": {"358b2762-1e82-5e01-b0cf-4f232db1c21c": {"name": "Sterling Silver", "order": 0, "priceCents": 32500, "imageUuids": ["382ebec7-5e1b-4f66-8121-8b50f0dd10e1", "09266877-9c39-475d-bfe3-3f19d685f16f", "7897f8ec-aeff-414f-8821-12be5e3c90de"]}, "15520fc7-d1b7-54d4-a747-a5850fa6e2a1": {"name": "14k Yellow Gold-Filled", "order": 1, "priceCents": 72500, "imageUuids": ["2be565a3-3475-4e7b-ab0e-efffd46067e3", "3ef9cb00-8707-4d40-8196-1a758659e55d", "78bd6f49-6eb9-47dc-8416-6be44926220d"]}, "0d4dbd29-a49f-5de7-a2ed-f546ec31a39a": {"name": "14k Rose Gold-Filled", "order": 2, "priceCents": 72500, "imageUuids": ["ae7ab55a-25d6-429b-bae3-c6f5f3b5166a", "32cec41b-5e7d-462e-8028-774b78285d15", "5890f7ea-f1f5-4721-ad89-c0d691aadba0"]}, "446cfa50-76ec-5328-a2af-9c10c5d62699": {"name": "14k White Gold", "order": 3, "priceCents": 1539700, "imageUuids": ["a1aecbea-659e-4bca-8049-dfcea20a662b", "b9f6d26d-fad5-461d-aad0-e64e43b6976f", "8df82f5f-b738-4153-80f8-d8dec8dc860f"]}, "ba582f6c-43c6-59e3-aeec-d030f00af4ec": {"name": "14k Rose Gold", "order": 4, "priceCents": 1539700, "imageUuids": ["ae7ab55a-25d6-429b-bae3-c6f5f3b5166a", "32cec41b-5e7d-462e-8028-774b78285d15", "5890f7ea-f1f5-4721-ad89-c0d691aadba0"]}, "787257f3-d62d-51d5-9693-605482983f9c": {"name": "14k Yellow Gold", "order": 5, "priceCents": 1539700, "imageUuids": ["2be565a3-3475-4e7b-ab0e-efffd46067e3", "3ef9cb00-8707-4d40-8196-1a758659e55d", "78bd6f49-6eb9-47dc-8416-6be44926220d"]}}}, "d1093598-7154-5635-a0f6-ad5976c74c78": {"name": "Size", "order": 1, "pricesVary": false, "imagesVary": false, "defaultOption": "c867902d-1488-5007-92e2-3d65a71b18f2", "options": {"c867902d-1488-5007-92e2-3d65a71b18f2": {"name": "XXS", "order": 0}, "4babde4c-47e1-5f77-b57b-2171e363a3e1": {"name": "XS", "order": 1}, "0c79cfd8-187b-59ac-a6e9-67365266c485": {"name": "S", "order": 2}, "a6a7ef82-3338-513a-b52b-d139a7ea3957": {"name": "M", "order": 3}, "1ab6762c-7acf-5276-9224-c1c508383358": {"name": "L", "order": 4}, "1dd5c706-8f06-57ea-a3c5-ca86aa81e6f0": {"name": "XL", "order": 5}, "eda8bdd9-83b1-52fe-b77a-ba4a2240b529": {"name": "XXL", "order": 6}}}}'::jsonb, '{"bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:358b2762-1e82-5e01-b0cf-4f232db1c21c|d1093598-7154-5635-a0f6-ad5976c74c78:c867902d-1488-5007-92e2-3d65a71b18f2": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:358b2762-1e82-5e01-b0cf-4f232db1c21c|d1093598-7154-5635-a0f6-ad5976c74c78:4babde4c-47e1-5f77-b57b-2171e363a3e1": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:358b2762-1e82-5e01-b0cf-4f232db1c21c|d1093598-7154-5635-a0f6-ad5976c74c78:0c79cfd8-187b-59ac-a6e9-67365266c485": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:358b2762-1e82-5e01-b0cf-4f232db1c21c|d1093598-7154-5635-a0f6-ad5976c74c78:a6a7ef82-3338-513a-b52b-d139a7ea3957": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:358b2762-1e82-5e01-b0cf-4f232db1c21c|d1093598-7154-5635-a0f6-ad5976c74c78:1ab6762c-7acf-5276-9224-c1c508383358": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:358b2762-1e82-5e01-b0cf-4f232db1c21c|d1093598-7154-5635-a0f6-ad5976c74c78:1dd5c706-8f06-57ea-a3c5-ca86aa81e6f0": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:358b2762-1e82-5e01-b0cf-4f232db1c21c|d1093598-7154-5635-a0f6-ad5976c74c78:eda8bdd9-83b1-52fe-b77a-ba4a2240b529": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:15520fc7-d1b7-54d4-a747-a5850fa6e2a1|d1093598-7154-5635-a0f6-ad5976c74c78:c867902d-1488-5007-92e2-3d65a71b18f2": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:15520fc7-d1b7-54d4-a747-a5850fa6e2a1|d1093598-7154-5635-a0f6-ad5976c74c78:4babde4c-47e1-5f77-b57b-2171e363a3e1": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:15520fc7-d1b7-54d4-a747-a5850fa6e2a1|d1093598-7154-5635-a0f6-ad5976c74c78:0c79cfd8-187b-59ac-a6e9-67365266c485": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:15520fc7-d1b7-54d4-a747-a5850fa6e2a1|d1093598-7154-5635-a0f6-ad5976c74c78:a6a7ef82-3338-513a-b52b-d139a7ea3957": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:15520fc7-d1b7-54d4-a747-a5850fa6e2a1|d1093598-7154-5635-a0f6-ad5976c74c78:1ab6762c-7acf-5276-9224-c1c508383358": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:15520fc7-d1b7-54d4-a747-a5850fa6e2a1|d1093598-7154-5635-a0f6-ad5976c74c78:1dd5c706-8f06-57ea-a3c5-ca86aa81e6f0": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:15520fc7-d1b7-54d4-a747-a5850fa6e2a1|d1093598-7154-5635-a0f6-ad5976c74c78:eda8bdd9-83b1-52fe-b77a-ba4a2240b529": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:0d4dbd29-a49f-5de7-a2ed-f546ec31a39a|d1093598-7154-5635-a0f6-ad5976c74c78:c867902d-1488-5007-92e2-3d65a71b18f2": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:0d4dbd29-a49f-5de7-a2ed-f546ec31a39a|d1093598-7154-5635-a0f6-ad5976c74c78:4babde4c-47e1-5f77-b57b-2171e363a3e1": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:0d4dbd29-a49f-5de7-a2ed-f546ec31a39a|d1093598-7154-5635-a0f6-ad5976c74c78:0c79cfd8-187b-59ac-a6e9-67365266c485": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:0d4dbd29-a49f-5de7-a2ed-f546ec31a39a|d1093598-7154-5635-a0f6-ad5976c74c78:a6a7ef82-3338-513a-b52b-d139a7ea3957": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:0d4dbd29-a49f-5de7-a2ed-f546ec31a39a|d1093598-7154-5635-a0f6-ad5976c74c78:1ab6762c-7acf-5276-9224-c1c508383358": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:0d4dbd29-a49f-5de7-a2ed-f546ec31a39a|d1093598-7154-5635-a0f6-ad5976c74c78:1dd5c706-8f06-57ea-a3c5-ca86aa81e6f0": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:0d4dbd29-a49f-5de7-a2ed-f546ec31a39a|d1093598-7154-5635-a0f6-ad5976c74c78:eda8bdd9-83b1-52fe-b77a-ba4a2240b529": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:446cfa50-76ec-5328-a2af-9c10c5d62699|d1093598-7154-5635-a0f6-ad5976c74c78:c867902d-1488-5007-92e2-3d65a71b18f2": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:446cfa50-76ec-5328-a2af-9c10c5d62699|d1093598-7154-5635-a0f6-ad5976c74c78:4babde4c-47e1-5f77-b57b-2171e363a3e1": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:446cfa50-76ec-5328-a2af-9c10c5d62699|d1093598-7154-5635-a0f6-ad5976c74c78:0c79cfd8-187b-59ac-a6e9-67365266c485": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:446cfa50-76ec-5328-a2af-9c10c5d62699|d1093598-7154-5635-a0f6-ad5976c74c78:a6a7ef82-3338-513a-b52b-d139a7ea3957": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:446cfa50-76ec-5328-a2af-9c10c5d62699|d1093598-7154-5635-a0f6-ad5976c74c78:1ab6762c-7acf-5276-9224-c1c508383358": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:446cfa50-76ec-5328-a2af-9c10c5d62699|d1093598-7154-5635-a0f6-ad5976c74c78:1dd5c706-8f06-57ea-a3c5-ca86aa81e6f0": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:446cfa50-76ec-5328-a2af-9c10c5d62699|d1093598-7154-5635-a0f6-ad5976c74c78:eda8bdd9-83b1-52fe-b77a-ba4a2240b529": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:ba582f6c-43c6-59e3-aeec-d030f00af4ec|d1093598-7154-5635-a0f6-ad5976c74c78:c867902d-1488-5007-92e2-3d65a71b18f2": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:ba582f6c-43c6-59e3-aeec-d030f00af4ec|d1093598-7154-5635-a0f6-ad5976c74c78:4babde4c-47e1-5f77-b57b-2171e363a3e1": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:ba582f6c-43c6-59e3-aeec-d030f00af4ec|d1093598-7154-5635-a0f6-ad5976c74c78:0c79cfd8-187b-59ac-a6e9-67365266c485": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:ba582f6c-43c6-59e3-aeec-d030f00af4ec|d1093598-7154-5635-a0f6-ad5976c74c78:a6a7ef82-3338-513a-b52b-d139a7ea3957": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:ba582f6c-43c6-59e3-aeec-d030f00af4ec|d1093598-7154-5635-a0f6-ad5976c74c78:1ab6762c-7acf-5276-9224-c1c508383358": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:ba582f6c-43c6-59e3-aeec-d030f00af4ec|d1093598-7154-5635-a0f6-ad5976c74c78:1dd5c706-8f06-57ea-a3c5-ca86aa81e6f0": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:ba582f6c-43c6-59e3-aeec-d030f00af4ec|d1093598-7154-5635-a0f6-ad5976c74c78:eda8bdd9-83b1-52fe-b77a-ba4a2240b529": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:787257f3-d62d-51d5-9693-605482983f9c|d1093598-7154-5635-a0f6-ad5976c74c78:c867902d-1488-5007-92e2-3d65a71b18f2": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:787257f3-d62d-51d5-9693-605482983f9c|d1093598-7154-5635-a0f6-ad5976c74c78:4babde4c-47e1-5f77-b57b-2171e363a3e1": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:787257f3-d62d-51d5-9693-605482983f9c|d1093598-7154-5635-a0f6-ad5976c74c78:0c79cfd8-187b-59ac-a6e9-67365266c485": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:787257f3-d62d-51d5-9693-605482983f9c|d1093598-7154-5635-a0f6-ad5976c74c78:a6a7ef82-3338-513a-b52b-d139a7ea3957": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:787257f3-d62d-51d5-9693-605482983f9c|d1093598-7154-5635-a0f6-ad5976c74c78:1ab6762c-7acf-5276-9224-c1c508383358": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:787257f3-d62d-51d5-9693-605482983f9c|d1093598-7154-5635-a0f6-ad5976c74c78:1dd5c706-8f06-57ea-a3c5-ca86aa81e6f0": {"priceCents": null, "disabled": false, "inventory": 5}, "bbcc87c4-1db4-5605-b667-1abfe3c1d1bf:787257f3-d62d-51d5-9693-605482983f9c|d1093598-7154-5635-a0f6-ad5976c74c78:eda8bdd9-83b1-52fe-b77a-ba4a2240b529": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_139_id, listing_139_short_id, listing_139_shop_id, listing_139_category_id, listing_139_country_code, listing_139_title, listing_139_subtitle, listing_139_full_descr, listing_139_price_cents, NULL, NULL, listing_139_image_uuids, NULL, '{"b3c566be-c888-5676-a44f-f01befa50a7d": {"name": "Metal", "order": 0, "pricesVary": true, "imagesVary": true, "defaultOption": "e8a95192-84ee-5154-a98f-ad8a25126e12", "options": {"f39ef2cd-d209-5cff-97bd-005d28390862": {"name": "14k Yellow Gold", "order": 0, "priceCents": 79600, "imageUuids": ["a777accc-4cfd-4739-b732-f2ee03aad49f", "daba5c6b-44ba-4048-93b9-c138cce687ab", "da98b1d6-0094-4409-af74-a1849cc8f7ef"]}, "9465c9d2-1834-5066-953b-bceee53b361e": {"name": "14k White Gold", "order": 1, "priceCents": 79600, "imageUuids": ["007e0bdd-d2c6-4d77-8dba-955a5060ff13", "16111006-fd02-43d9-b6ef-22a54f9b9695", "9012f428-0deb-4900-a629-eddc22d761b0"]}, "fe5a3d63-25e2-5399-9882-248cd2930624": {"name": "14k Rose Gold", "order": 2, "priceCents": 79600, "imageUuids": ["3ee53611-fcfd-4f32-9aac-6937b056da5a", "30676b5d-2228-4d4c-a15d-18102175a54f", "474d8cce-bcae-45c8-86bd-8386944ef60e"]}, "e8a95192-84ee-5154-a98f-ad8a25126e12": {"name": "Sterling Silver", "order": 3, "priceCents": 25500, "imageUuids": ["e339bb8e-7cb8-437a-aacc-c69f477caedb", "04570af0-ca4e-42b3-b3a1-054b5abe8be1", "63f17aab-a602-4970-86e8-7da40d8674a3"]}}}}'::jsonb, '{"b3c566be-c888-5676-a44f-f01befa50a7d:f39ef2cd-d209-5cff-97bd-005d28390862": {"priceCents": null, "disabled": false, "inventory": 5}, "b3c566be-c888-5676-a44f-f01befa50a7d:9465c9d2-1834-5066-953b-bceee53b361e": {"priceCents": null, "disabled": false, "inventory": 5}, "b3c566be-c888-5676-a44f-f01befa50a7d:fe5a3d63-25e2-5399-9882-248cd2930624": {"priceCents": null, "disabled": false, "inventory": 5}, "b3c566be-c888-5676-a44f-f01befa50a7d:e8a95192-84ee-5154-a98f-ad8a25126e12": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_140_id, listing_140_short_id, listing_140_shop_id, listing_140_category_id, listing_140_country_code, listing_140_title, listing_140_subtitle, listing_140_full_descr, listing_140_price_cents, NULL, NULL, listing_140_image_uuids, NULL, '{"37a17438-d15e-52c0-aeb0-79a737795acf": {"name": "Metal", "order": 0, "pricesVary": true, "imagesVary": true, "defaultOption": "145fcf0e-0e8c-522c-81b7-59c0b761de98", "options": {"145fcf0e-0e8c-522c-81b7-59c0b761de98": {"name": "Sterling Silver", "order": 0, "priceCents": 32500, "imageUuids": ["7b2ca23f-4828-4727-8a18-66604c32cb25", "9d578b3b-2d26-40f5-846e-5681a19eb7e7", "bd9e2424-1d39-4da4-a95c-140456cc5c03"]}, "819b1f8d-31c8-5d2c-83db-4be88c1d2e5d": {"name": "14k Yellow Gold-Filled", "order": 1, "priceCents": 72500, "imageUuids": ["0e646e0a-3415-4678-952d-0fdab7a2c673", "f140f9d9-4e8d-4003-a8f8-609aa6ac04c4", "1ec66dcb-9f7f-4810-b6b6-0c849379cdd2", "52b99f10-d6df-4182-b4e6-9b9d69389390"]}, "87c3d492-fafc-5f12-92c9-548bd68786c2": {"name": "14k Rose Gold-Filled", "order": 2, "priceCents": 72500, "imageUuids": ["509caf93-8a10-456f-8e2c-febffa03cef3", "8a1efb0a-e407-4168-b568-641873fe6b5c", "5d6284d2-d6bb-47a4-9418-f4079a19a7e5", "33aeb061-dd3c-4e37-9659-174e6638ab18", "e1c23139-922b-495e-b800-6a6a6da767cf"]}, "490d39e3-5b7d-5b83-8f58-67329c0fa541": {"name": "14k White Gold", "order": 3, "priceCents": 1339700, "imageUuids": ["e903299a-9434-4dae-ba3b-52ad8d6607c5", "22112260-1702-45f3-935a-7542ecbc5ce2", "403211cb-63b9-415a-9f7c-335f75f8297c", "352e11a0-adf8-4bce-bd54-725cf1e5dc71"]}, "97414363-d276-5094-9f6b-197d3398d6db": {"name": "14k Yellow Gold", "order": 4, "priceCents": 1339700, "imageUuids": ["0e646e0a-3415-4678-952d-0fdab7a2c673", "f140f9d9-4e8d-4003-a8f8-609aa6ac04c4", "1ec66dcb-9f7f-4810-b6b6-0c849379cdd2", "52b99f10-d6df-4182-b4e6-9b9d69389390"]}, "92f453fd-287f-5757-90a6-f98e5a8f56a7": {"name": "14k Rose Gold", "order": 5, "priceCents": 1339700, "imageUuids": ["0e646e0a-3415-4678-952d-0fdab7a2c673", "f140f9d9-4e8d-4003-a8f8-609aa6ac04c4", "1ec66dcb-9f7f-4810-b6b6-0c849379cdd2", "52b99f10-d6df-4182-b4e6-9b9d69389390"]}}}, "18189f90-66b0-5540-b5ab-7ecd303dccba": {"name": "Size", "order": 1, "pricesVary": false, "imagesVary": false, "defaultOption": "3790979d-6baa-5f14-9513-52139e943ef4", "options": {"3790979d-6baa-5f14-9513-52139e943ef4": {"name": "XXS", "order": 0}, "ef84fd12-198e-56c4-91b9-541e31458b35": {"name": "XS", "order": 1}, "da796a0d-0f5d-5637-99b0-4e1294612792": {"name": "S", "order": 2}, "2dec69d1-cd2a-5713-b5e4-1e0c62c24da4": {"name": "M", "order": 3}, "5ffe51ab-eaa6-529d-bc06-90f9ba3f70fc": {"name": "L", "order": 4}, "d7adee7a-0360-5d48-9c35-d39afa837b34": {"name": "XL", "order": 5}, "6acb6319-c641-5d91-92cb-a6399cf86b4e": {"name": "XXL", "order": 6}}}}'::jsonb, '{"18189f90-66b0-5540-b5ab-7ecd303dccba:3790979d-6baa-5f14-9513-52139e943ef4|37a17438-d15e-52c0-aeb0-79a737795acf:145fcf0e-0e8c-522c-81b7-59c0b761de98": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:3790979d-6baa-5f14-9513-52139e943ef4|37a17438-d15e-52c0-aeb0-79a737795acf:819b1f8d-31c8-5d2c-83db-4be88c1d2e5d": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:3790979d-6baa-5f14-9513-52139e943ef4|37a17438-d15e-52c0-aeb0-79a737795acf:87c3d492-fafc-5f12-92c9-548bd68786c2": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:3790979d-6baa-5f14-9513-52139e943ef4|37a17438-d15e-52c0-aeb0-79a737795acf:490d39e3-5b7d-5b83-8f58-67329c0fa541": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:3790979d-6baa-5f14-9513-52139e943ef4|37a17438-d15e-52c0-aeb0-79a737795acf:97414363-d276-5094-9f6b-197d3398d6db": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:3790979d-6baa-5f14-9513-52139e943ef4|37a17438-d15e-52c0-aeb0-79a737795acf:92f453fd-287f-5757-90a6-f98e5a8f56a7": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:ef84fd12-198e-56c4-91b9-541e31458b35|37a17438-d15e-52c0-aeb0-79a737795acf:145fcf0e-0e8c-522c-81b7-59c0b761de98": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:ef84fd12-198e-56c4-91b9-541e31458b35|37a17438-d15e-52c0-aeb0-79a737795acf:819b1f8d-31c8-5d2c-83db-4be88c1d2e5d": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:ef84fd12-198e-56c4-91b9-541e31458b35|37a17438-d15e-52c0-aeb0-79a737795acf:87c3d492-fafc-5f12-92c9-548bd68786c2": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:ef84fd12-198e-56c4-91b9-541e31458b35|37a17438-d15e-52c0-aeb0-79a737795acf:490d39e3-5b7d-5b83-8f58-67329c0fa541": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:ef84fd12-198e-56c4-91b9-541e31458b35|37a17438-d15e-52c0-aeb0-79a737795acf:97414363-d276-5094-9f6b-197d3398d6db": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:ef84fd12-198e-56c4-91b9-541e31458b35|37a17438-d15e-52c0-aeb0-79a737795acf:92f453fd-287f-5757-90a6-f98e5a8f56a7": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:da796a0d-0f5d-5637-99b0-4e1294612792|37a17438-d15e-52c0-aeb0-79a737795acf:145fcf0e-0e8c-522c-81b7-59c0b761de98": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:da796a0d-0f5d-5637-99b0-4e1294612792|37a17438-d15e-52c0-aeb0-79a737795acf:819b1f8d-31c8-5d2c-83db-4be88c1d2e5d": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:da796a0d-0f5d-5637-99b0-4e1294612792|37a17438-d15e-52c0-aeb0-79a737795acf:87c3d492-fafc-5f12-92c9-548bd68786c2": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:da796a0d-0f5d-5637-99b0-4e1294612792|37a17438-d15e-52c0-aeb0-79a737795acf:490d39e3-5b7d-5b83-8f58-67329c0fa541": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:da796a0d-0f5d-5637-99b0-4e1294612792|37a17438-d15e-52c0-aeb0-79a737795acf:97414363-d276-5094-9f6b-197d3398d6db": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:da796a0d-0f5d-5637-99b0-4e1294612792|37a17438-d15e-52c0-aeb0-79a737795acf:92f453fd-287f-5757-90a6-f98e5a8f56a7": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:2dec69d1-cd2a-5713-b5e4-1e0c62c24da4|37a17438-d15e-52c0-aeb0-79a737795acf:145fcf0e-0e8c-522c-81b7-59c0b761de98": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:2dec69d1-cd2a-5713-b5e4-1e0c62c24da4|37a17438-d15e-52c0-aeb0-79a737795acf:819b1f8d-31c8-5d2c-83db-4be88c1d2e5d": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:2dec69d1-cd2a-5713-b5e4-1e0c62c24da4|37a17438-d15e-52c0-aeb0-79a737795acf:87c3d492-fafc-5f12-92c9-548bd68786c2": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:2dec69d1-cd2a-5713-b5e4-1e0c62c24da4|37a17438-d15e-52c0-aeb0-79a737795acf:490d39e3-5b7d-5b83-8f58-67329c0fa541": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:2dec69d1-cd2a-5713-b5e4-1e0c62c24da4|37a17438-d15e-52c0-aeb0-79a737795acf:97414363-d276-5094-9f6b-197d3398d6db": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:2dec69d1-cd2a-5713-b5e4-1e0c62c24da4|37a17438-d15e-52c0-aeb0-79a737795acf:92f453fd-287f-5757-90a6-f98e5a8f56a7": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:5ffe51ab-eaa6-529d-bc06-90f9ba3f70fc|37a17438-d15e-52c0-aeb0-79a737795acf:145fcf0e-0e8c-522c-81b7-59c0b761de98": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:5ffe51ab-eaa6-529d-bc06-90f9ba3f70fc|37a17438-d15e-52c0-aeb0-79a737795acf:819b1f8d-31c8-5d2c-83db-4be88c1d2e5d": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:5ffe51ab-eaa6-529d-bc06-90f9ba3f70fc|37a17438-d15e-52c0-aeb0-79a737795acf:87c3d492-fafc-5f12-92c9-548bd68786c2": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:5ffe51ab-eaa6-529d-bc06-90f9ba3f70fc|37a17438-d15e-52c0-aeb0-79a737795acf:490d39e3-5b7d-5b83-8f58-67329c0fa541": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:5ffe51ab-eaa6-529d-bc06-90f9ba3f70fc|37a17438-d15e-52c0-aeb0-79a737795acf:97414363-d276-5094-9f6b-197d3398d6db": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:5ffe51ab-eaa6-529d-bc06-90f9ba3f70fc|37a17438-d15e-52c0-aeb0-79a737795acf:92f453fd-287f-5757-90a6-f98e5a8f56a7": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:d7adee7a-0360-5d48-9c35-d39afa837b34|37a17438-d15e-52c0-aeb0-79a737795acf:145fcf0e-0e8c-522c-81b7-59c0b761de98": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:d7adee7a-0360-5d48-9c35-d39afa837b34|37a17438-d15e-52c0-aeb0-79a737795acf:819b1f8d-31c8-5d2c-83db-4be88c1d2e5d": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:d7adee7a-0360-5d48-9c35-d39afa837b34|37a17438-d15e-52c0-aeb0-79a737795acf:87c3d492-fafc-5f12-92c9-548bd68786c2": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:d7adee7a-0360-5d48-9c35-d39afa837b34|37a17438-d15e-52c0-aeb0-79a737795acf:490d39e3-5b7d-5b83-8f58-67329c0fa541": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:d7adee7a-0360-5d48-9c35-d39afa837b34|37a17438-d15e-52c0-aeb0-79a737795acf:97414363-d276-5094-9f6b-197d3398d6db": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:d7adee7a-0360-5d48-9c35-d39afa837b34|37a17438-d15e-52c0-aeb0-79a737795acf:92f453fd-287f-5757-90a6-f98e5a8f56a7": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:6acb6319-c641-5d91-92cb-a6399cf86b4e|37a17438-d15e-52c0-aeb0-79a737795acf:145fcf0e-0e8c-522c-81b7-59c0b761de98": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:6acb6319-c641-5d91-92cb-a6399cf86b4e|37a17438-d15e-52c0-aeb0-79a737795acf:819b1f8d-31c8-5d2c-83db-4be88c1d2e5d": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:6acb6319-c641-5d91-92cb-a6399cf86b4e|37a17438-d15e-52c0-aeb0-79a737795acf:87c3d492-fafc-5f12-92c9-548bd68786c2": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:6acb6319-c641-5d91-92cb-a6399cf86b4e|37a17438-d15e-52c0-aeb0-79a737795acf:490d39e3-5b7d-5b83-8f58-67329c0fa541": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:6acb6319-c641-5d91-92cb-a6399cf86b4e|37a17438-d15e-52c0-aeb0-79a737795acf:97414363-d276-5094-9f6b-197d3398d6db": {"priceCents": null, "disabled": false, "inventory": 5}, "18189f90-66b0-5540-b5ab-7ecd303dccba:6acb6319-c641-5d91-92cb-a6399cf86b4e|37a17438-d15e-52c0-aeb0-79a737795acf:92f453fd-287f-5757-90a6-f98e5a8f56a7": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_141_id, listing_141_short_id, listing_141_shop_id, listing_141_category_id, listing_141_country_code, listing_141_title, listing_141_subtitle, listing_141_full_descr, listing_141_price_cents, NULL, NULL, listing_141_image_uuids, NULL, '{"d9f4671b-3840-521c-ae70-5ccf089dcc2b": {"name": "Metal", "order": 0, "pricesVary": true, "imagesVary": true, "defaultOption": "4c13e4d1-b703-57a1-bcce-aaae39b1f0a0", "options": {"4c13e4d1-b703-57a1-bcce-aaae39b1f0a0": {"name": "Sterling Silver", "order": 0, "priceCents": 35500, "imageUuids": ["ecc9be10-5a91-43e0-bcca-c252fc8e1159"]}, "6e8654ff-9f66-5ad4-b698-b226744b105d": {"name": "14k Yellow Gold", "order": 1, "priceCents": 512300, "imageUuids": ["9c9a1ec0-f574-42e9-b444-d5ed41c65372", "ce4eca10-0c4b-47a1-9ecf-06f82d0cd925"]}, "5a60bc8c-9871-50b6-bd65-8c5026148d58": {"name": "14k White Gold", "order": 2, "priceCents": 512300, "imageUuids": ["0990129f-40bd-49e9-b0a8-0996554ca0a9"]}, "7e92cd29-10e2-5e06-bd0a-53a777cfb49d": {"name": "14k Rose Gold", "order": 3, "priceCents": 512300, "imageUuids": ["6548e127-b3cd-4ee0-b0d2-6347f69dfa93", "30322dd3-0485-455a-bee6-4bae1d9ad574", "a76a0a38-5010-40d7-9aac-5215e8dd3796", "7bcd0d21-6316-478c-86fc-b2cfef91e4a5"]}, "d2e4a7f9-54a9-597e-835c-8aa1cb49b57a": {"name": "18k Yellow Gold", "order": 4, "priceCents": 755400, "imageUuids": ["5720cb66-b370-48cb-9c2f-1ab0a6a9749a", "6954337c-0f97-4c5b-b2fc-5ff8b2f25622"]}, "eac7db53-706f-50ac-8f12-3d421689ce6a": {"name": "Platinum", "order": 5, "priceCents": 599300, "imageUuids": ["5720cb66-b370-48cb-9c2f-1ab0a6a9749a", "6954337c-0f97-4c5b-b2fc-5ff8b2f25622"]}}}}'::jsonb, '{"d9f4671b-3840-521c-ae70-5ccf089dcc2b:4c13e4d1-b703-57a1-bcce-aaae39b1f0a0": {"priceCents": null, "disabled": false, "inventory": 5}, "d9f4671b-3840-521c-ae70-5ccf089dcc2b:6e8654ff-9f66-5ad4-b698-b226744b105d": {"priceCents": null, "disabled": false, "inventory": 5}, "d9f4671b-3840-521c-ae70-5ccf089dcc2b:5a60bc8c-9871-50b6-bd65-8c5026148d58": {"priceCents": null, "disabled": false, "inventory": 5}, "d9f4671b-3840-521c-ae70-5ccf089dcc2b:7e92cd29-10e2-5e06-bd0a-53a777cfb49d": {"priceCents": null, "disabled": false, "inventory": 5}, "d9f4671b-3840-521c-ae70-5ccf089dcc2b:d2e4a7f9-54a9-597e-835c-8aa1cb49b57a": {"priceCents": null, "disabled": false, "inventory": 5}, "d9f4671b-3840-521c-ae70-5ccf089dcc2b:eac7db53-706f-50ac-8f12-3d421689ce6a": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_142_id, listing_142_short_id, listing_142_shop_id, listing_142_category_id, listing_142_country_code, listing_142_title, listing_142_subtitle, listing_142_full_descr, listing_142_price_cents, NULL, NULL, listing_142_image_uuids, NULL, '{"e1152747-7141-576b-8931-856e63af7bf9": {"name": "Metal", "order": 0, "pricesVary": true, "imagesVary": true, "defaultOption": "7b0f1529-193c-547f-ac14-71a170a9596d", "options": {"7b0f1529-193c-547f-ac14-71a170a9596d": {"name": "Sterling Silver", "order": 0, "priceCents": 25500, "imageUuids": ["0aa4f71a-874f-4ef5-880a-7d0dd867c5d8", "ad10b595-adab-4576-a2f8-250979a2cfd3"]}, "18fc175f-9673-51d7-be28-6c9d7276b708": {"name": "14k Yellow Gold", "order": 1, "priceCents": 164900, "imageUuids": ["9202fee5-5d82-4d4f-a2d9-898fd4b1ad40", "f870a4ef-a96e-4ade-bcf2-969527bff143"]}, "faf76557-c778-511a-b7dd-aff7d098a19b": {"name": "14k Rose Gold", "order": 2, "priceCents": 164900, "imageUuids": ["56dbf538-e008-4b3e-aa57-e8a668f07fe5", "854cc450-ca9a-4a04-9e8e-11f819c9d45e"]}, "ad7cef72-3830-5bf9-a8db-185caca47fca": {"name": "14k White Gold", "order": 3, "priceCents": 164900, "imageUuids": ["f9e60a5d-b839-424c-85fc-4fbfdcd7c737", "0daf2421-8551-42b9-93bb-67492d5101d5"]}}}}'::jsonb, '{"e1152747-7141-576b-8931-856e63af7bf9:7b0f1529-193c-547f-ac14-71a170a9596d": {"priceCents": null, "disabled": false, "inventory": 5}, "e1152747-7141-576b-8931-856e63af7bf9:18fc175f-9673-51d7-be28-6c9d7276b708": {"priceCents": null, "disabled": false, "inventory": 5}, "e1152747-7141-576b-8931-856e63af7bf9:faf76557-c778-511a-b7dd-aff7d098a19b": {"priceCents": null, "disabled": false, "inventory": 5}, "e1152747-7141-576b-8931-856e63af7bf9:ad7cef72-3830-5bf9-a8db-185caca47fca": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_143_id, listing_143_short_id, listing_143_shop_id, listing_143_category_id, listing_143_country_code, listing_143_title, listing_143_subtitle, listing_143_full_descr, listing_143_price_cents, NULL, NULL, listing_143_image_uuids, NULL, '{"de7bbfb9-a307-52ca-8b09-a076213f7673": {"name": "Metal", "order": 0, "pricesVary": true, "imagesVary": true, "defaultOption": "e72a19a8-c1ca-525e-a71a-a755137dceb7", "options": {"e72a19a8-c1ca-525e-a71a-a755137dceb7": {"name": "Sterling Silver", "order": 0, "priceCents": 25500, "imageUuids": ["9c6722b3-8e25-4c24-ae51-a8bf71606ece"]}, "7833d72b-dde6-5567-a280-af72d96c3e9d": {"name": "14k Yellow Gold", "order": 1, "priceCents": 264900, "imageUuids": ["00ad3d7e-0252-42ad-8dc2-d52d4990f3b0", "db779e97-0bc2-484c-ae3b-4393a40b5a70"]}, "d637452d-a889-5f2d-a69f-08f173cc5bdb": {"name": "14k White Gold", "order": 2, "priceCents": 264900, "imageUuids": ["1e139f19-2a57-4049-96ab-697551d99b95", "d4832f77-663d-4760-b68b-5c00a125f308"]}, "764a39ca-a9d8-5526-a7ec-1da6d7194c4d": {"name": "14k Rose Gold", "order": 3, "priceCents": 264900, "imageUuids": ["4a1798e7-67e8-443a-8056-773b7683c99a", "8147dd4d-439d-4e9e-857c-45584964c5fe"]}, "b29f0d54-2647-5544-8f3f-e8e8825080e5": {"name": "18k Yellow Gold", "order": 4, "priceCents": 396400, "imageUuids": ["7b97fdd7-b3a7-4f33-9185-525b12defc78", "4a90463e-4b0d-4346-9ac9-c148632c8aba"]}, "863359cf-024f-5489-acd4-89ac51e39703": {"name": "Platinum", "order": 5, "priceCents": 323200, "imageUuids": ["7bd1cf7e-42e5-4960-94bc-ecb9d4bae815"]}}}}'::jsonb, '{"de7bbfb9-a307-52ca-8b09-a076213f7673:e72a19a8-c1ca-525e-a71a-a755137dceb7": {"priceCents": null, "disabled": false, "inventory": 5}, "de7bbfb9-a307-52ca-8b09-a076213f7673:7833d72b-dde6-5567-a280-af72d96c3e9d": {"priceCents": null, "disabled": false, "inventory": 5}, "de7bbfb9-a307-52ca-8b09-a076213f7673:d637452d-a889-5f2d-a69f-08f173cc5bdb": {"priceCents": null, "disabled": false, "inventory": 5}, "de7bbfb9-a307-52ca-8b09-a076213f7673:764a39ca-a9d8-5526-a7ec-1da6d7194c4d": {"priceCents": null, "disabled": false, "inventory": 5}, "de7bbfb9-a307-52ca-8b09-a076213f7673:b29f0d54-2647-5544-8f3f-e8e8825080e5": {"priceCents": null, "disabled": false, "inventory": 5}, "de7bbfb9-a307-52ca-8b09-a076213f7673:863359cf-024f-5489-acd4-89ac51e39703": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_144_id, listing_144_short_id, listing_144_shop_id, listing_144_category_id, listing_144_country_code, listing_144_title, listing_144_subtitle, listing_144_full_descr, listing_144_price_cents, NULL, NULL, listing_144_image_uuids, NULL, '{"613efb3d-bf34-58a4-ab40-acc76931ec67": {"name": "Metal", "order": 0, "pricesVary": true, "imagesVary": true, "defaultOption": "b7af160f-eba2-5232-82c7-a4b0d58673da", "options": {"b7af160f-eba2-5232-82c7-a4b0d58673da": {"name": "Sterling Silver", "order": 0, "priceCents": 35500, "imageUuids": ["414e4e65-c556-4211-9cf0-a15bb14e0597"]}, "518f3a3a-46fa-5f4c-9759-dfdbbdfb3fa5": {"name": "14k Yellow Gold", "order": 1, "priceCents": 573500, "imageUuids": ["3ffdeba5-50ae-4bca-910e-899b6f388309", "3706e1d2-781a-4725-9a8b-0b0bfe77558f"]}, "58e16303-c119-5dd5-8de9-701d32ac8d68": {"name": "14k White Gold", "order": 2, "priceCents": 573500, "imageUuids": ["13089560-c5c3-41c7-aa09-6e8305f7f6b3", "3a16710c-0557-44df-b256-addf8e93bb2a"]}, "e63db2d6-5a15-5e72-9065-a25f6c434c08": {"name": "14k Rose Gold", "order": 3, "priceCents": 573500, "imageUuids": ["2fe0e8eb-205c-4e94-bef0-df45b5642344"]}, "be3ff702-40d6-5709-853e-b782a959e217": {"name": "18k Yellow Gold", "order": 4, "priceCents": 873500, "imageUuids": ["ab2306d4-424a-41e9-8940-4de577d04c97", "c270eb23-a770-4d61-ab74-0fb5fb9ed4ae"]}, "f869508a-36a9-57f4-90ba-5cc3cfe9c9b0": {"name": "Platinum", "order": 5, "priceCents": 705400, "imageUuids": ["e8aeaae4-5be1-468d-a4f6-9dd604154a21", "6f1b28ff-a6a6-4395-98af-1d8150d724c1"]}}}}'::jsonb, '{"613efb3d-bf34-58a4-ab40-acc76931ec67:b7af160f-eba2-5232-82c7-a4b0d58673da": {"priceCents": null, "disabled": false, "inventory": 5}, "613efb3d-bf34-58a4-ab40-acc76931ec67:518f3a3a-46fa-5f4c-9759-dfdbbdfb3fa5": {"priceCents": null, "disabled": false, "inventory": 5}, "613efb3d-bf34-58a4-ab40-acc76931ec67:58e16303-c119-5dd5-8de9-701d32ac8d68": {"priceCents": null, "disabled": false, "inventory": 5}, "613efb3d-bf34-58a4-ab40-acc76931ec67:e63db2d6-5a15-5e72-9065-a25f6c434c08": {"priceCents": null, "disabled": false, "inventory": 5}, "613efb3d-bf34-58a4-ab40-acc76931ec67:be3ff702-40d6-5709-853e-b782a959e217": {"priceCents": null, "disabled": false, "inventory": 5}, "613efb3d-bf34-58a4-ab40-acc76931ec67:f869508a-36a9-57f4-90ba-5cc3cfe9c9b0": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_145_id, listing_145_short_id, listing_145_shop_id, listing_145_category_id, listing_145_country_code, listing_145_title, listing_145_subtitle, listing_145_full_descr, listing_145_price_cents, NULL, NULL, listing_145_image_uuids, NULL, '{"ffbcba0e-bfee-5250-a515-91ad031fc669": {"name": "Metal", "order": 0, "pricesVary": true, "imagesVary": true, "defaultOption": "19781e2f-b787-55b7-8a2b-70892edaef01", "options": {"19781e2f-b787-55b7-8a2b-70892edaef01": {"name": "Sterling Silver", "order": 0, "priceCents": 32500, "imageUuids": ["8f9c23fe-b4ef-492e-969b-058aa8f630ae", "3a752159-974b-4e2d-a9dc-46e6fb3ee980", "8ba5032b-6923-4c9d-9824-86f00bcb5ebc", "428fd74c-c720-45ee-b380-623941ab7a55"]}, "7f8ec57d-ea06-5b69-902a-1bd54f2f5242": {"name": "14k Yellow Gold-Filled", "order": 1, "priceCents": 72500, "imageUuids": ["dc32b242-ecea-4aed-a857-3b5aa0e8b138", "a2b61914-ef67-44b0-a042-7e03c7f0b759", "ef90055c-4ed2-4db9-a7d3-4fbc375cf18d", "c813165c-8d1c-4d88-b1b0-46e8f3f2b1e7"]}, "cebe335d-de15-511b-a3b9-56668f38c7a1": {"name": "14k Rose Gold-Filled", "order": 2, "priceCents": 72500, "imageUuids": ["6404f86a-54ba-4768-a002-f3bd7cd5a6db", "b5058e44-b77b-4806-a41f-adb155cb2b61", "19968c2f-83de-49e7-a041-21648642a505", "04f55114-7b70-4ed9-a7df-edc2cecba183", "80f5add4-9cf2-429b-9c78-4f03ec336836", "f5a3bfae-b681-4d66-95a6-600ad9296397", "17234b3e-e135-443c-b79f-7d8b247ab22a", "4bef0ae7-ef41-4ec4-b04f-fdc0d0e45981"]}, "3a12cd89-6c63-56f8-a4b4-78c66a14ad17": {"name": "14k White Gold", "order": 3, "priceCents": 1339700, "imageUuids": ["8f9c23fe-b4ef-492e-969b-058aa8f630ae", "3a752159-974b-4e2d-a9dc-46e6fb3ee980", "8ba5032b-6923-4c9d-9824-86f00bcb5ebc", "428fd74c-c720-45ee-b380-623941ab7a55"]}, "df6a65d2-9889-557c-b02b-591fcf96ad49": {"name": "14k Yellow Gold", "order": 4, "priceCents": 1339700, "imageUuids": ["dc32b242-ecea-4aed-a857-3b5aa0e8b138", "a2b61914-ef67-44b0-a042-7e03c7f0b759", "ef90055c-4ed2-4db9-a7d3-4fbc375cf18d", "c813165c-8d1c-4d88-b1b0-46e8f3f2b1e7"]}, "472767ab-b617-58c1-a35e-689ea0487f79": {"name": "14k Rose Gold", "order": 5, "priceCents": 1339700, "imageUuids": ["6404f86a-54ba-4768-a002-f3bd7cd5a6db", "b5058e44-b77b-4806-a41f-adb155cb2b61", "19968c2f-83de-49e7-a041-21648642a505", "04f55114-7b70-4ed9-a7df-edc2cecba183", "80f5add4-9cf2-429b-9c78-4f03ec336836", "f5a3bfae-b681-4d66-95a6-600ad9296397", "17234b3e-e135-443c-b79f-7d8b247ab22a", "4bef0ae7-ef41-4ec4-b04f-fdc0d0e45981"]}}}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4": {"name": "Size", "order": 1, "pricesVary": false, "imagesVary": false, "defaultOption": "9165656e-1002-538f-8cae-f70f82f1f238", "options": {"9165656e-1002-538f-8cae-f70f82f1f238": {"name": "XXS", "order": 0}, "ead4a0ea-07aa-5383-a360-4b6834129b0a": {"name": "XS", "order": 1}, "bc54e319-5fe6-523c-8f33-0d161ec5d2d5": {"name": "S", "order": 2}, "5d4ea7f5-05cb-5c95-8571-839b1661e0cf": {"name": "M", "order": 3}, "32e70b59-8b56-5323-a502-20507db0bb7c": {"name": "L", "order": 4}, "f8e90a61-3a5d-513b-a4d0-14c408f5d9d5": {"name": "XL", "order": 5}, "f0e7e4e1-2779-5e5c-a5ee-d1e3f5fdcd00": {"name": "XXL", "order": 6}}}}'::jsonb, '{"f4528a4a-e2e3-5fe0-936e-51399596e2e4:9165656e-1002-538f-8cae-f70f82f1f238|ffbcba0e-bfee-5250-a515-91ad031fc669:19781e2f-b787-55b7-8a2b-70892edaef01": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:9165656e-1002-538f-8cae-f70f82f1f238|ffbcba0e-bfee-5250-a515-91ad031fc669:7f8ec57d-ea06-5b69-902a-1bd54f2f5242": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:9165656e-1002-538f-8cae-f70f82f1f238|ffbcba0e-bfee-5250-a515-91ad031fc669:cebe335d-de15-511b-a3b9-56668f38c7a1": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:9165656e-1002-538f-8cae-f70f82f1f238|ffbcba0e-bfee-5250-a515-91ad031fc669:3a12cd89-6c63-56f8-a4b4-78c66a14ad17": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:9165656e-1002-538f-8cae-f70f82f1f238|ffbcba0e-bfee-5250-a515-91ad031fc669:df6a65d2-9889-557c-b02b-591fcf96ad49": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:9165656e-1002-538f-8cae-f70f82f1f238|ffbcba0e-bfee-5250-a515-91ad031fc669:472767ab-b617-58c1-a35e-689ea0487f79": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:ead4a0ea-07aa-5383-a360-4b6834129b0a|ffbcba0e-bfee-5250-a515-91ad031fc669:19781e2f-b787-55b7-8a2b-70892edaef01": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:ead4a0ea-07aa-5383-a360-4b6834129b0a|ffbcba0e-bfee-5250-a515-91ad031fc669:7f8ec57d-ea06-5b69-902a-1bd54f2f5242": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:ead4a0ea-07aa-5383-a360-4b6834129b0a|ffbcba0e-bfee-5250-a515-91ad031fc669:cebe335d-de15-511b-a3b9-56668f38c7a1": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:ead4a0ea-07aa-5383-a360-4b6834129b0a|ffbcba0e-bfee-5250-a515-91ad031fc669:3a12cd89-6c63-56f8-a4b4-78c66a14ad17": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:ead4a0ea-07aa-5383-a360-4b6834129b0a|ffbcba0e-bfee-5250-a515-91ad031fc669:df6a65d2-9889-557c-b02b-591fcf96ad49": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:ead4a0ea-07aa-5383-a360-4b6834129b0a|ffbcba0e-bfee-5250-a515-91ad031fc669:472767ab-b617-58c1-a35e-689ea0487f79": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:bc54e319-5fe6-523c-8f33-0d161ec5d2d5|ffbcba0e-bfee-5250-a515-91ad031fc669:19781e2f-b787-55b7-8a2b-70892edaef01": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:bc54e319-5fe6-523c-8f33-0d161ec5d2d5|ffbcba0e-bfee-5250-a515-91ad031fc669:7f8ec57d-ea06-5b69-902a-1bd54f2f5242": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:bc54e319-5fe6-523c-8f33-0d161ec5d2d5|ffbcba0e-bfee-5250-a515-91ad031fc669:cebe335d-de15-511b-a3b9-56668f38c7a1": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:bc54e319-5fe6-523c-8f33-0d161ec5d2d5|ffbcba0e-bfee-5250-a515-91ad031fc669:3a12cd89-6c63-56f8-a4b4-78c66a14ad17": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:bc54e319-5fe6-523c-8f33-0d161ec5d2d5|ffbcba0e-bfee-5250-a515-91ad031fc669:df6a65d2-9889-557c-b02b-591fcf96ad49": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:bc54e319-5fe6-523c-8f33-0d161ec5d2d5|ffbcba0e-bfee-5250-a515-91ad031fc669:472767ab-b617-58c1-a35e-689ea0487f79": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:5d4ea7f5-05cb-5c95-8571-839b1661e0cf|ffbcba0e-bfee-5250-a515-91ad031fc669:19781e2f-b787-55b7-8a2b-70892edaef01": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:5d4ea7f5-05cb-5c95-8571-839b1661e0cf|ffbcba0e-bfee-5250-a515-91ad031fc669:7f8ec57d-ea06-5b69-902a-1bd54f2f5242": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:5d4ea7f5-05cb-5c95-8571-839b1661e0cf|ffbcba0e-bfee-5250-a515-91ad031fc669:cebe335d-de15-511b-a3b9-56668f38c7a1": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:5d4ea7f5-05cb-5c95-8571-839b1661e0cf|ffbcba0e-bfee-5250-a515-91ad031fc669:3a12cd89-6c63-56f8-a4b4-78c66a14ad17": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:5d4ea7f5-05cb-5c95-8571-839b1661e0cf|ffbcba0e-bfee-5250-a515-91ad031fc669:df6a65d2-9889-557c-b02b-591fcf96ad49": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:5d4ea7f5-05cb-5c95-8571-839b1661e0cf|ffbcba0e-bfee-5250-a515-91ad031fc669:472767ab-b617-58c1-a35e-689ea0487f79": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:32e70b59-8b56-5323-a502-20507db0bb7c|ffbcba0e-bfee-5250-a515-91ad031fc669:19781e2f-b787-55b7-8a2b-70892edaef01": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:32e70b59-8b56-5323-a502-20507db0bb7c|ffbcba0e-bfee-5250-a515-91ad031fc669:7f8ec57d-ea06-5b69-902a-1bd54f2f5242": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:32e70b59-8b56-5323-a502-20507db0bb7c|ffbcba0e-bfee-5250-a515-91ad031fc669:cebe335d-de15-511b-a3b9-56668f38c7a1": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:32e70b59-8b56-5323-a502-20507db0bb7c|ffbcba0e-bfee-5250-a515-91ad031fc669:3a12cd89-6c63-56f8-a4b4-78c66a14ad17": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:32e70b59-8b56-5323-a502-20507db0bb7c|ffbcba0e-bfee-5250-a515-91ad031fc669:df6a65d2-9889-557c-b02b-591fcf96ad49": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:32e70b59-8b56-5323-a502-20507db0bb7c|ffbcba0e-bfee-5250-a515-91ad031fc669:472767ab-b617-58c1-a35e-689ea0487f79": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:f8e90a61-3a5d-513b-a4d0-14c408f5d9d5|ffbcba0e-bfee-5250-a515-91ad031fc669:19781e2f-b787-55b7-8a2b-70892edaef01": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:f8e90a61-3a5d-513b-a4d0-14c408f5d9d5|ffbcba0e-bfee-5250-a515-91ad031fc669:7f8ec57d-ea06-5b69-902a-1bd54f2f5242": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:f8e90a61-3a5d-513b-a4d0-14c408f5d9d5|ffbcba0e-bfee-5250-a515-91ad031fc669:cebe335d-de15-511b-a3b9-56668f38c7a1": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:f8e90a61-3a5d-513b-a4d0-14c408f5d9d5|ffbcba0e-bfee-5250-a515-91ad031fc669:3a12cd89-6c63-56f8-a4b4-78c66a14ad17": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:f8e90a61-3a5d-513b-a4d0-14c408f5d9d5|ffbcba0e-bfee-5250-a515-91ad031fc669:df6a65d2-9889-557c-b02b-591fcf96ad49": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:f8e90a61-3a5d-513b-a4d0-14c408f5d9d5|ffbcba0e-bfee-5250-a515-91ad031fc669:472767ab-b617-58c1-a35e-689ea0487f79": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:f0e7e4e1-2779-5e5c-a5ee-d1e3f5fdcd00|ffbcba0e-bfee-5250-a515-91ad031fc669:19781e2f-b787-55b7-8a2b-70892edaef01": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:f0e7e4e1-2779-5e5c-a5ee-d1e3f5fdcd00|ffbcba0e-bfee-5250-a515-91ad031fc669:7f8ec57d-ea06-5b69-902a-1bd54f2f5242": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:f0e7e4e1-2779-5e5c-a5ee-d1e3f5fdcd00|ffbcba0e-bfee-5250-a515-91ad031fc669:cebe335d-de15-511b-a3b9-56668f38c7a1": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:f0e7e4e1-2779-5e5c-a5ee-d1e3f5fdcd00|ffbcba0e-bfee-5250-a515-91ad031fc669:3a12cd89-6c63-56f8-a4b4-78c66a14ad17": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:f0e7e4e1-2779-5e5c-a5ee-d1e3f5fdcd00|ffbcba0e-bfee-5250-a515-91ad031fc669:df6a65d2-9889-557c-b02b-591fcf96ad49": {"priceCents": null, "disabled": false, "inventory": 5}, "f4528a4a-e2e3-5fe0-936e-51399596e2e4:f0e7e4e1-2779-5e5c-a5ee-d1e3f5fdcd00|ffbcba0e-bfee-5250-a515-91ad031fc669:472767ab-b617-58c1-a35e-689ea0487f79": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_146_id, listing_146_short_id, listing_146_shop_id, listing_146_category_id, listing_146_country_code, listing_146_title, listing_146_subtitle, listing_146_full_descr, listing_146_price_cents, NULL, NULL, listing_146_image_uuids, NULL, '{"ddc38a97-a0d2-5269-af39-8c80a33e719e": {"name": "Metal", "order": 0, "pricesVary": true, "imagesVary": true, "defaultOption": "6c7dab43-e971-53b5-986c-f7e8941cc433", "options": {"6c7dab43-e971-53b5-986c-f7e8941cc433": {"name": "Sterling Silver", "order": 0, "priceCents": 25500, "imageUuids": ["b5dd3d34-50e6-4fa9-a963-7dc39f992800"]}, "ef7cca50-e7e4-5f74-950c-980b944f38b6": {"name": "14k Yellow Gold", "order": 1, "priceCents": 354700, "imageUuids": ["74c12c00-e724-41dc-b982-d083cc0b8653"]}, "036bd72c-cc2b-5e5f-8973-6a374d47093d": {"name": "14k Rose Gold", "order": 2, "priceCents": 354700, "imageUuids": ["e82a9838-1eb1-43a6-a16f-ba1da43d64d0"]}, "1f7eba13-b59c-5415-a68a-1634df20f224": {"name": "14k White Gold", "order": 3, "priceCents": 354700, "imageUuids": ["4f6e173d-8337-4e35-aa76-74e6b85af4bd"]}, "8c6ea013-ef79-5c83-bf42-58b0a121f61b": {"name": "18k Yellow Gold", "order": 4, "priceCents": 535700, "imageUuids": ["fcfc6f1c-1303-4a76-939a-8d3a60e3ad11"]}, "a4eda619-74c4-5d40-aaf7-2c8b4ee7e7f1": {"name": "Platinum", "order": 5, "priceCents": 436300, "imageUuids": ["84548b16-0560-4c21-8f05-567cdb3c06c1"]}}}}'::jsonb, '{"ddc38a97-a0d2-5269-af39-8c80a33e719e:6c7dab43-e971-53b5-986c-f7e8941cc433": {"priceCents": null, "disabled": false, "inventory": 5}, "ddc38a97-a0d2-5269-af39-8c80a33e719e:ef7cca50-e7e4-5f74-950c-980b944f38b6": {"priceCents": null, "disabled": false, "inventory": 5}, "ddc38a97-a0d2-5269-af39-8c80a33e719e:036bd72c-cc2b-5e5f-8973-6a374d47093d": {"priceCents": null, "disabled": false, "inventory": 5}, "ddc38a97-a0d2-5269-af39-8c80a33e719e:1f7eba13-b59c-5415-a68a-1634df20f224": {"priceCents": null, "disabled": false, "inventory": 5}, "ddc38a97-a0d2-5269-af39-8c80a33e719e:8c6ea013-ef79-5c83-bf42-58b0a121f61b": {"priceCents": null, "disabled": false, "inventory": 5}, "ddc38a97-a0d2-5269-af39-8c80a33e719e:a4eda619-74c4-5d40-aaf7-2c8b4ee7e7f1": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_147_id, listing_147_short_id, listing_147_shop_id, listing_147_category_id, listing_147_country_code, listing_147_title, listing_147_subtitle, listing_147_full_descr, listing_147_price_cents, NULL, NULL, listing_147_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_148_id, listing_148_short_id, listing_148_shop_id, listing_148_category_id, listing_148_country_code, listing_148_title, listing_148_subtitle, listing_148_full_descr, listing_148_price_cents, NULL, NULL, listing_148_image_uuids, NULL, '{"98fdf2ca-ce12-5e74-9853-eaef21792851": {"name": "Stone", "order": 0, "pricesVary": true, "imagesVary": true, "defaultOption": "944f724c-c350-5c9a-945b-c736c4fa8b89", "options": {"944f724c-c350-5c9a-945b-c736c4fa8b89": {"name": "Lab Diamond", "order": 0, "priceCents": 32500, "imageUuids": ["a41f9a17-846c-44f4-b053-7eb2d1c47885", "9f716394-a86b-4b61-883b-614a5082e200", "00b55fa3-7f41-48a9-b8d7-fca9efe86498", "1493a5ee-23a8-4a02-8746-d5cebf91c596"]}, "4285dfe0-a1ad-5427-a346-61e73323e49e": {"name": "Mozambique Garnet", "order": 1, "priceCents": 32500, "imageUuids": ["00972cce-67dd-46bb-af2a-c1bf7233d395", "a2be1ef0-9314-4e6b-83ec-a7537962d1c3", "6c4ff9fa-77cd-4683-991a-32ac6fb02bd9", "cb9d5c96-d4a4-425e-a915-542725492bcb"]}, "9046ad15-9e8e-541b-9d77-aaf80d8eed84": {"name": "Lab Ruby", "order": 2, "priceCents": 32500, "imageUuids": ["a4a642c6-620b-41d5-b519-f750eeb46bec", "82e60a0b-ba2e-4602-b446-7dbcf582490c", "b5cc37d9-9dd2-48e7-ba63-3bbee3ff484f", "10b62986-58c8-491f-9225-8bad06c4c26f"]}, "41f2f182-6e45-5b6b-b24f-c6ce000d5f39": {"name": "Lab Blue Sapphire", "order": 3, "priceCents": 32500, "imageUuids": ["3cccc2a6-8bcb-447d-adbc-fc81923983eb", "8bb53018-f21f-45fc-8107-62848875d56d", "58ac4318-63de-4d67-880f-1f4767de5d9d", "ec2cd0d6-070f-417b-aac0-6f0db94900a7"]}, "17f0da01-0783-54cc-a92d-b068a62b501b": {"name": "Lab Emerald", "order": 4, "priceCents": 32500, "imageUuids": ["0addf6b0-2a7b-4972-ba92-f026e683a9ec", "80db59ec-f72c-4c5d-bcb3-df825bf5b2f0", "4497f300-ff1d-4889-b758-2ccbbd45ccf4", "1b9114ad-3253-4c24-9188-a5b3ba265803"]}, "9d934b40-5b2b-51a7-8fe0-6a38ef3a89b4": {"name": "Lab Purple Sapphire", "order": 5, "priceCents": 32500, "imageUuids": ["1e8b8a96-c9a2-48b0-84ab-9bc0219300df", "1378b52d-c9da-4e66-b082-5be83c722be7", "5794393f-a605-4fc6-a45e-8450b946b7d0", "b3eb73e9-7cc9-4e19-bc08-0ebe3978fbaa"]}, "22394e45-689f-520e-9173-b4abd45046d4": {"name": "Citrine", "order": 6, "priceCents": 32500, "imageUuids": ["e8d8be60-482c-447c-86fb-e88047edeaca", "b6701326-fd59-45f7-a4a9-17bf5f4d30a2", "514635f4-847e-477e-b4ee-caaa813bf4ef", "6caaf52c-6379-4df7-83e6-7e6fa75988f2"]}, "02dddbfb-1966-5cc4-8ee8-400578c1a2bd": {"name": "No Stone", "order": 7, "priceCents": 25000, "imageUuids": ["a481b091-1e24-4ae0-b7fe-c087e0c4cc99", "e2ae3803-8dad-485a-bf96-ec41e00f9e99", "7685de05-ba4d-4148-8bfd-03bf52bdd3ff", "de9e720e-a221-4eaf-877d-1b7f88cb6d24"]}}}}'::jsonb, '{"98fdf2ca-ce12-5e74-9853-eaef21792851:944f724c-c350-5c9a-945b-c736c4fa8b89": {"priceCents": null, "disabled": false, "inventory": 5}, "98fdf2ca-ce12-5e74-9853-eaef21792851:4285dfe0-a1ad-5427-a346-61e73323e49e": {"priceCents": null, "disabled": false, "inventory": 5}, "98fdf2ca-ce12-5e74-9853-eaef21792851:9046ad15-9e8e-541b-9d77-aaf80d8eed84": {"priceCents": null, "disabled": false, "inventory": 5}, "98fdf2ca-ce12-5e74-9853-eaef21792851:41f2f182-6e45-5b6b-b24f-c6ce000d5f39": {"priceCents": null, "disabled": false, "inventory": 5}, "98fdf2ca-ce12-5e74-9853-eaef21792851:17f0da01-0783-54cc-a92d-b068a62b501b": {"priceCents": null, "disabled": false, "inventory": 5}, "98fdf2ca-ce12-5e74-9853-eaef21792851:9d934b40-5b2b-51a7-8fe0-6a38ef3a89b4": {"priceCents": null, "disabled": false, "inventory": 5}, "98fdf2ca-ce12-5e74-9853-eaef21792851:22394e45-689f-520e-9173-b4abd45046d4": {"priceCents": null, "disabled": false, "inventory": 5}, "98fdf2ca-ce12-5e74-9853-eaef21792851:02dddbfb-1966-5cc4-8ee8-400578c1a2bd": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_149_id, listing_149_short_id, listing_149_shop_id, listing_149_category_id, listing_149_country_code, listing_149_title, listing_149_subtitle, listing_149_full_descr, listing_149_price_cents, NULL, NULL, listing_149_image_uuids, NULL, '{"eca21d0b-ced5-5dfb-9f85-412e3989e8d6": {"name": "Stone", "order": 0, "pricesVary": true, "imagesVary": true, "defaultOption": "0124ac0e-a597-5375-a8c6-f9d09b8f4db7", "options": {"0124ac0e-a597-5375-a8c6-f9d09b8f4db7": {"name": "Lab Emerald", "order": 0, "priceCents": 32500, "imageUuids": ["ae437d24-4dcd-4d72-81e2-8735c270dd59", "91fbcc82-a7ff-46c7-a645-4f013d3bfd7d", "37824111-a16d-4083-aa9a-5d782d015440"]}, "7c5a9328-a6e7-5b1e-b483-d011155b4ad8": {"name": "Mozambique Garnet", "order": 1, "priceCents": 32500, "imageUuids": ["d0e3749c-26ee-4d6c-b566-a49ec520701c", "7da8214b-5678-4ca5-9c44-ef224cab7b8d", "06c418f0-3b44-48ed-a5cd-118f168eae9a"]}, "06f451bb-eea8-5d89-b865-d19ebbf126bf": {"name": "Lab Diamond", "order": 2, "priceCents": 32500, "imageUuids": ["fb24f0eb-c953-4f6d-b5b8-8ec91ad469bc", "1265fe30-9c7c-473e-b3d4-42bc7df5f1b2", "e7fc1a49-e85c-4c68-94d8-c3905b19ef76"]}, "40fb5d38-e270-522c-80d3-9f2a580acc07": {"name": "Lab Ruby", "order": 3, "priceCents": 32500, "imageUuids": ["a757639e-e977-4337-b3cd-39a4620c77b3", "ac1c3a79-dd8d-4ee6-be8e-61eaf0a40bb3", "cdb03772-8cd6-4e30-9d86-e03b494bdf21"]}, "708a7651-7edb-5369-b9d2-397aefd038d0": {"name": "Lab Blue Sapphire", "order": 4, "priceCents": 32500, "imageUuids": ["c7a9d471-c559-457b-a494-baa4bbcc3028", "b8d4cbcd-6322-4293-b10c-014eeb02969c", "d3e339dc-9b07-4612-b6ce-cd321bac5f30"]}, "372e6dec-f314-5d95-af64-33eda5d37430": {"name": "Lab Purple Sapphire", "order": 5, "priceCents": 32500, "imageUuids": ["f22a5169-4c02-4a76-8e60-3f44c53dfc14", "b6d840ea-6f01-4379-8e99-27f669190b50", "5acea679-8dd0-4e00-8f7e-01f3b3bfac09"]}, "0b9c50b3-7e9f-5eb9-b97e-76c83abf4a42": {"name": "Citrine", "order": 6, "priceCents": 32500, "imageUuids": ["fcdbeed7-8162-4100-b2af-8ff4697856ab", "66332409-1a36-445e-bc35-578f4cc8f89a", "1b460e0a-6f4f-4327-8b38-4df91554f3be"]}, "f70cb487-50c4-55ed-a937-cb141a6eac19": {"name": "No Stone", "order": 7, "priceCents": 25000, "imageUuids": ["bd827efa-d711-46cd-9e4a-23cd218caacd", "de104adc-38c7-4880-a98e-e9632c9b6da4"]}}}}'::jsonb, '{"eca21d0b-ced5-5dfb-9f85-412e3989e8d6:0124ac0e-a597-5375-a8c6-f9d09b8f4db7": {"priceCents": null, "disabled": false, "inventory": 5}, "eca21d0b-ced5-5dfb-9f85-412e3989e8d6:7c5a9328-a6e7-5b1e-b483-d011155b4ad8": {"priceCents": null, "disabled": false, "inventory": 5}, "eca21d0b-ced5-5dfb-9f85-412e3989e8d6:06f451bb-eea8-5d89-b865-d19ebbf126bf": {"priceCents": null, "disabled": false, "inventory": 5}, "eca21d0b-ced5-5dfb-9f85-412e3989e8d6:40fb5d38-e270-522c-80d3-9f2a580acc07": {"priceCents": null, "disabled": false, "inventory": 5}, "eca21d0b-ced5-5dfb-9f85-412e3989e8d6:708a7651-7edb-5369-b9d2-397aefd038d0": {"priceCents": null, "disabled": false, "inventory": 5}, "eca21d0b-ced5-5dfb-9f85-412e3989e8d6:372e6dec-f314-5d95-af64-33eda5d37430": {"priceCents": null, "disabled": false, "inventory": 5}, "eca21d0b-ced5-5dfb-9f85-412e3989e8d6:0b9c50b3-7e9f-5eb9-b97e-76c83abf4a42": {"priceCents": null, "disabled": false, "inventory": 5}, "eca21d0b-ced5-5dfb-9f85-412e3989e8d6:f70cb487-50c4-55ed-a937-cb141a6eac19": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_150_id, listing_150_short_id, listing_150_shop_id, listing_150_category_id, listing_150_country_code, listing_150_title, listing_150_subtitle, listing_150_full_descr, listing_150_price_cents, NULL, NULL, listing_150_image_uuids, NULL, '{"e94b27f6-2475-5322-a18e-42a82a154417": {"name": "Stone", "order": 0, "pricesVary": true, "imagesVary": true, "defaultOption": "aa3b2444-3c16-5765-b01c-e88a4ea40648", "options": {"aa3b2444-3c16-5765-b01c-e88a4ea40648": {"name": "Lab Purple Sapphire", "order": 0, "priceCents": 32500, "imageUuids": ["70f91acf-7723-445c-bffc-5171b00396d5", "1083d2e9-9ed9-4c03-bc14-fc390941efeb", "78d0f5eb-e37a-47c0-a28d-3637ca4ab689"]}, "91fabe37-4d76-5081-b4a5-f8f2a1185f7f": {"name": "Mozambique Garnet", "order": 1, "priceCents": 32500, "imageUuids": ["62211c8c-ef27-4814-a676-6aa7b2b2616f", "6a4ce280-fe05-45ea-b75c-b25ed639660e", "d16b440f-93d1-41db-90bd-2fb30df1d196"]}, "82429eb1-b448-5b43-b775-86f36f311df4": {"name": "Lab Diamond", "order": 2, "priceCents": 32500, "imageUuids": ["111142e3-a393-4d4b-9e7d-a508c89f8158", "f367f8fa-44fb-4435-839f-e4e9ab4af02d", "da84651d-eb81-45bd-be42-36b4f2fce728"]}, "5de56777-1e2f-54aa-99aa-83a31b5828b4": {"name": "Lab Ruby", "order": 3, "priceCents": 32500, "imageUuids": ["263e1de1-db7b-46eb-9892-1bc858cc5458", "d7020de2-903f-4ccf-a7b1-6be76331ac7c", "eefda367-30a1-4316-9cda-41f3f9831fc4"]}, "c986f5d0-4826-5e13-ae68-6620d15af0c0": {"name": "Lab Blue Sapphire", "order": 4, "priceCents": 32500, "imageUuids": ["b0ec4d46-c979-43fe-839d-8fd18e25de62", "cc9c11fa-d5e6-417f-9492-1cb308db813c", "d17007f2-355a-49dd-906a-dd7dcb4c1c79"]}, "e6463af4-8c95-5f3b-8312-eaceb83f6607": {"name": "Lab Emerald", "order": 5, "priceCents": 32500, "imageUuids": ["c0d2a870-b93b-4c43-a5f8-a7e3e1c43d7f", "d80d649d-5f07-4879-869e-3ce5503637de", "dca0b39f-36f9-432b-82e5-20c37f94ea19"]}, "2819e267-03e1-56a6-a718-edb9acbdc0e3": {"name": "Citrine", "order": 6, "priceCents": 32500, "imageUuids": ["355124de-e23d-4b6a-bf32-6b790c2b81d0", "d0b9bdfd-1260-4909-8a3f-96895edafddb", "68290bdd-a7e8-460c-9181-fe0f40fd763e"]}, "56c1bc72-c506-5535-bb6c-53d67da41bd4": {"name": "No Stone", "order": 7, "priceCents": 25000, "imageUuids": ["651aed7c-c4d8-4e3b-9358-b4ecc86b537c", "50bf7abd-366e-40bf-b3e6-cf6bafa75517", "1fe4e7a1-e433-4a24-8edc-a2564196215b"]}}}}'::jsonb, '{"e94b27f6-2475-5322-a18e-42a82a154417:aa3b2444-3c16-5765-b01c-e88a4ea40648": {"priceCents": null, "disabled": false, "inventory": 5}, "e94b27f6-2475-5322-a18e-42a82a154417:91fabe37-4d76-5081-b4a5-f8f2a1185f7f": {"priceCents": null, "disabled": false, "inventory": 5}, "e94b27f6-2475-5322-a18e-42a82a154417:82429eb1-b448-5b43-b775-86f36f311df4": {"priceCents": null, "disabled": false, "inventory": 5}, "e94b27f6-2475-5322-a18e-42a82a154417:5de56777-1e2f-54aa-99aa-83a31b5828b4": {"priceCents": null, "disabled": false, "inventory": 5}, "e94b27f6-2475-5322-a18e-42a82a154417:c986f5d0-4826-5e13-ae68-6620d15af0c0": {"priceCents": null, "disabled": false, "inventory": 5}, "e94b27f6-2475-5322-a18e-42a82a154417:e6463af4-8c95-5f3b-8312-eaceb83f6607": {"priceCents": null, "disabled": false, "inventory": 5}, "e94b27f6-2475-5322-a18e-42a82a154417:2819e267-03e1-56a6-a718-edb9acbdc0e3": {"priceCents": null, "disabled": false, "inventory": 5}, "e94b27f6-2475-5322-a18e-42a82a154417:56c1bc72-c506-5535-bb6c-53d67da41bd4": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_151_id, listing_151_short_id, listing_151_shop_id, listing_151_category_id, listing_151_country_code, listing_151_title, listing_151_subtitle, listing_151_full_descr, listing_151_price_cents, NULL, NULL, listing_151_image_uuids, NULL, '{"5ad8637f-d3f9-519a-b460-e0a06f3e3d6b": {"name": "Metal", "order": 0, "pricesVary": true, "imagesVary": true, "defaultOption": "e4647ec7-fad9-5308-a6eb-1f73a85992dc", "options": {"e4647ec7-fad9-5308-a6eb-1f73a85992dc": {"name": "Sterling Silver", "order": 0, "priceCents": 32500, "imageUuids": ["65544b7c-5e64-4e07-8a3f-9b8356bfa716", "a1f425fb-f40d-40cc-b072-230c42e60353", "461c42d4-0d4a-4d9d-90dd-49357c371237"]}, "887f91ea-d398-5501-8bd0-65b1db04f5c5": {"name": "14k Yellow Gold-Filled", "order": 1, "priceCents": 72500, "imageUuids": ["97a587fd-fa2f-4679-986e-8da673611abd", "8fe0c846-06ce-4541-82d5-d3ead6ca2dc4", "7fe27fa6-f680-481d-a654-45fb6bab77ff"]}, "d7875111-3a3f-5d24-a7cc-77cf62b4a8d5": {"name": "14k Rose Gold-Filled", "order": 2, "priceCents": 72500, "imageUuids": ["5c5ac21b-b455-4731-8ac3-a043bb210826", "706b3adf-4a2f-4226-9072-39fe8472ebee", "3bb25f88-43a1-4175-a289-1c524af26013"]}, "a2a760bf-a94a-5bb2-bf54-b8716f21946c": {"name": "14k White Gold", "order": 3, "priceCents": 1339700, "imageUuids": ["572cf142-b718-4320-8d30-ba0efb1f8d8f", "c2864155-b607-4526-b49e-4f4dd15fa5ef", "e8188edd-3809-4ae4-bf94-23601d507bc4"]}, "859d6fac-a959-56e0-b3f8-e4791b62f0d2": {"name": "14k Yellow Gold", "order": 4, "priceCents": 1339700, "imageUuids": ["97a587fd-fa2f-4679-986e-8da673611abd", "8fe0c846-06ce-4541-82d5-d3ead6ca2dc4", "7fe27fa6-f680-481d-a654-45fb6bab77ff"]}, "691fce80-0b57-5e68-a157-6de27ff42de0": {"name": "14k Rose Gold", "order": 5, "priceCents": 1339700, "imageUuids": ["5c5ac21b-b455-4731-8ac3-a043bb210826", "706b3adf-4a2f-4226-9072-39fe8472ebee", "3bb25f88-43a1-4175-a289-1c524af26013"]}}}, "97e58bc4-329f-53fd-8071-aac382bcaf9e": {"name": "Size", "order": 1, "pricesVary": false, "imagesVary": false, "defaultOption": "b99cf998-84e9-5080-b705-f9566e3594d2", "options": {"b99cf998-84e9-5080-b705-f9566e3594d2": {"name": "XXS", "order": 0}, "0dca2e10-1e28-5f08-87c5-632284f20f70": {"name": "XS", "order": 1}, "a6d86eca-d92c-597d-bccb-cd4d21b75a18": {"name": "S", "order": 2}, "d9f1bf92-3a38-5ae0-8c02-9ccbb15e92db": {"name": "M", "order": 3}, "621bb1e0-60b3-5dc6-a2a7-3e59d048e92a": {"name": "L", "order": 4}, "7874feb4-8a3d-55d3-a4a4-2d39c95d29ec": {"name": "XL", "order": 5}, "ce6299f4-a06a-56f8-8236-a9771160c1bf": {"name": "XXL", "order": 6}}}}'::jsonb, '{"5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:e4647ec7-fad9-5308-a6eb-1f73a85992dc|97e58bc4-329f-53fd-8071-aac382bcaf9e:b99cf998-84e9-5080-b705-f9566e3594d2": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:e4647ec7-fad9-5308-a6eb-1f73a85992dc|97e58bc4-329f-53fd-8071-aac382bcaf9e:0dca2e10-1e28-5f08-87c5-632284f20f70": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:e4647ec7-fad9-5308-a6eb-1f73a85992dc|97e58bc4-329f-53fd-8071-aac382bcaf9e:a6d86eca-d92c-597d-bccb-cd4d21b75a18": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:e4647ec7-fad9-5308-a6eb-1f73a85992dc|97e58bc4-329f-53fd-8071-aac382bcaf9e:d9f1bf92-3a38-5ae0-8c02-9ccbb15e92db": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:e4647ec7-fad9-5308-a6eb-1f73a85992dc|97e58bc4-329f-53fd-8071-aac382bcaf9e:621bb1e0-60b3-5dc6-a2a7-3e59d048e92a": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:e4647ec7-fad9-5308-a6eb-1f73a85992dc|97e58bc4-329f-53fd-8071-aac382bcaf9e:7874feb4-8a3d-55d3-a4a4-2d39c95d29ec": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:e4647ec7-fad9-5308-a6eb-1f73a85992dc|97e58bc4-329f-53fd-8071-aac382bcaf9e:ce6299f4-a06a-56f8-8236-a9771160c1bf": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:887f91ea-d398-5501-8bd0-65b1db04f5c5|97e58bc4-329f-53fd-8071-aac382bcaf9e:b99cf998-84e9-5080-b705-f9566e3594d2": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:887f91ea-d398-5501-8bd0-65b1db04f5c5|97e58bc4-329f-53fd-8071-aac382bcaf9e:0dca2e10-1e28-5f08-87c5-632284f20f70": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:887f91ea-d398-5501-8bd0-65b1db04f5c5|97e58bc4-329f-53fd-8071-aac382bcaf9e:a6d86eca-d92c-597d-bccb-cd4d21b75a18": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:887f91ea-d398-5501-8bd0-65b1db04f5c5|97e58bc4-329f-53fd-8071-aac382bcaf9e:d9f1bf92-3a38-5ae0-8c02-9ccbb15e92db": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:887f91ea-d398-5501-8bd0-65b1db04f5c5|97e58bc4-329f-53fd-8071-aac382bcaf9e:621bb1e0-60b3-5dc6-a2a7-3e59d048e92a": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:887f91ea-d398-5501-8bd0-65b1db04f5c5|97e58bc4-329f-53fd-8071-aac382bcaf9e:7874feb4-8a3d-55d3-a4a4-2d39c95d29ec": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:887f91ea-d398-5501-8bd0-65b1db04f5c5|97e58bc4-329f-53fd-8071-aac382bcaf9e:ce6299f4-a06a-56f8-8236-a9771160c1bf": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:d7875111-3a3f-5d24-a7cc-77cf62b4a8d5|97e58bc4-329f-53fd-8071-aac382bcaf9e:b99cf998-84e9-5080-b705-f9566e3594d2": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:d7875111-3a3f-5d24-a7cc-77cf62b4a8d5|97e58bc4-329f-53fd-8071-aac382bcaf9e:0dca2e10-1e28-5f08-87c5-632284f20f70": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:d7875111-3a3f-5d24-a7cc-77cf62b4a8d5|97e58bc4-329f-53fd-8071-aac382bcaf9e:a6d86eca-d92c-597d-bccb-cd4d21b75a18": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:d7875111-3a3f-5d24-a7cc-77cf62b4a8d5|97e58bc4-329f-53fd-8071-aac382bcaf9e:d9f1bf92-3a38-5ae0-8c02-9ccbb15e92db": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:d7875111-3a3f-5d24-a7cc-77cf62b4a8d5|97e58bc4-329f-53fd-8071-aac382bcaf9e:621bb1e0-60b3-5dc6-a2a7-3e59d048e92a": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:d7875111-3a3f-5d24-a7cc-77cf62b4a8d5|97e58bc4-329f-53fd-8071-aac382bcaf9e:7874feb4-8a3d-55d3-a4a4-2d39c95d29ec": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:d7875111-3a3f-5d24-a7cc-77cf62b4a8d5|97e58bc4-329f-53fd-8071-aac382bcaf9e:ce6299f4-a06a-56f8-8236-a9771160c1bf": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:a2a760bf-a94a-5bb2-bf54-b8716f21946c|97e58bc4-329f-53fd-8071-aac382bcaf9e:b99cf998-84e9-5080-b705-f9566e3594d2": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:a2a760bf-a94a-5bb2-bf54-b8716f21946c|97e58bc4-329f-53fd-8071-aac382bcaf9e:0dca2e10-1e28-5f08-87c5-632284f20f70": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:a2a760bf-a94a-5bb2-bf54-b8716f21946c|97e58bc4-329f-53fd-8071-aac382bcaf9e:a6d86eca-d92c-597d-bccb-cd4d21b75a18": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:a2a760bf-a94a-5bb2-bf54-b8716f21946c|97e58bc4-329f-53fd-8071-aac382bcaf9e:d9f1bf92-3a38-5ae0-8c02-9ccbb15e92db": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:a2a760bf-a94a-5bb2-bf54-b8716f21946c|97e58bc4-329f-53fd-8071-aac382bcaf9e:621bb1e0-60b3-5dc6-a2a7-3e59d048e92a": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:a2a760bf-a94a-5bb2-bf54-b8716f21946c|97e58bc4-329f-53fd-8071-aac382bcaf9e:7874feb4-8a3d-55d3-a4a4-2d39c95d29ec": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:a2a760bf-a94a-5bb2-bf54-b8716f21946c|97e58bc4-329f-53fd-8071-aac382bcaf9e:ce6299f4-a06a-56f8-8236-a9771160c1bf": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:859d6fac-a959-56e0-b3f8-e4791b62f0d2|97e58bc4-329f-53fd-8071-aac382bcaf9e:b99cf998-84e9-5080-b705-f9566e3594d2": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:859d6fac-a959-56e0-b3f8-e4791b62f0d2|97e58bc4-329f-53fd-8071-aac382bcaf9e:0dca2e10-1e28-5f08-87c5-632284f20f70": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:859d6fac-a959-56e0-b3f8-e4791b62f0d2|97e58bc4-329f-53fd-8071-aac382bcaf9e:a6d86eca-d92c-597d-bccb-cd4d21b75a18": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:859d6fac-a959-56e0-b3f8-e4791b62f0d2|97e58bc4-329f-53fd-8071-aac382bcaf9e:d9f1bf92-3a38-5ae0-8c02-9ccbb15e92db": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:859d6fac-a959-56e0-b3f8-e4791b62f0d2|97e58bc4-329f-53fd-8071-aac382bcaf9e:621bb1e0-60b3-5dc6-a2a7-3e59d048e92a": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:859d6fac-a959-56e0-b3f8-e4791b62f0d2|97e58bc4-329f-53fd-8071-aac382bcaf9e:7874feb4-8a3d-55d3-a4a4-2d39c95d29ec": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:859d6fac-a959-56e0-b3f8-e4791b62f0d2|97e58bc4-329f-53fd-8071-aac382bcaf9e:ce6299f4-a06a-56f8-8236-a9771160c1bf": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:691fce80-0b57-5e68-a157-6de27ff42de0|97e58bc4-329f-53fd-8071-aac382bcaf9e:b99cf998-84e9-5080-b705-f9566e3594d2": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:691fce80-0b57-5e68-a157-6de27ff42de0|97e58bc4-329f-53fd-8071-aac382bcaf9e:0dca2e10-1e28-5f08-87c5-632284f20f70": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:691fce80-0b57-5e68-a157-6de27ff42de0|97e58bc4-329f-53fd-8071-aac382bcaf9e:a6d86eca-d92c-597d-bccb-cd4d21b75a18": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:691fce80-0b57-5e68-a157-6de27ff42de0|97e58bc4-329f-53fd-8071-aac382bcaf9e:d9f1bf92-3a38-5ae0-8c02-9ccbb15e92db": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:691fce80-0b57-5e68-a157-6de27ff42de0|97e58bc4-329f-53fd-8071-aac382bcaf9e:621bb1e0-60b3-5dc6-a2a7-3e59d048e92a": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:691fce80-0b57-5e68-a157-6de27ff42de0|97e58bc4-329f-53fd-8071-aac382bcaf9e:7874feb4-8a3d-55d3-a4a4-2d39c95d29ec": {"priceCents": null, "disabled": false, "inventory": 5}, "5ad8637f-d3f9-519a-b460-e0a06f3e3d6b:691fce80-0b57-5e68-a157-6de27ff42de0|97e58bc4-329f-53fd-8071-aac382bcaf9e:ce6299f4-a06a-56f8-8236-a9771160c1bf": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_152_id, listing_152_short_id, listing_152_shop_id, listing_152_category_id, listing_152_country_code, listing_152_title, listing_152_subtitle, listing_152_full_descr, listing_152_price_cents, NULL, NULL, listing_152_image_uuids, NULL, '{"7fc79cbb-4220-5952-ab40-e5a733dfc2bc": {"name": "Metal", "order": 0, "pricesVary": true, "imagesVary": true, "defaultOption": "cb0f603c-357a-5aaa-95c3-3af257b5ba60", "options": {"cb0f603c-357a-5aaa-95c3-3af257b5ba60": {"name": "Sterling Silver", "order": 0, "priceCents": 32500, "imageUuids": ["35b2ba53-d59d-4933-8699-44ae6e3df208", "0c266675-5218-4a60-ad95-2f3cbdfe9e9c", "b21dd25f-a93c-492d-bd92-456960529fff"]}, "5464b0fe-8054-5511-8cea-2a6004fd2c34": {"name": "14k Yellow Gold-Filled", "order": 1, "priceCents": 72500, "imageUuids": ["b8974702-d582-467d-9d1f-04f9b016aa2f", "ce036167-aa0b-4735-8dbb-7937c42194be", "17e64268-d184-462e-8765-fe1d76cbb669"]}, "3a80e979-1632-5a34-93b3-66b8ba935067": {"name": "14k Rose Gold-Filled", "order": 2, "priceCents": 72500, "imageUuids": ["0c090c12-4eb0-4a8d-ad8f-7ec1b1c63fbc", "d28f8275-e6d0-4bdf-be8d-514968728955", "a879051a-2108-42c3-b3fc-59b16861bf42"]}, "fadf7bd6-5233-5548-9fa4-6cb39e465b38": {"name": "14k White Gold", "order": 3, "priceCents": 1339700, "imageUuids": ["a300a885-6183-4759-8596-0e4c0aaa18a2", "632793ad-2e75-46d0-ac0f-3b210a333ed8", "effec207-daf6-4fa3-a057-308cd6ba1d58"]}, "d876dea0-0ee9-5b48-8ebf-e1a64b822ec3": {"name": "14k Yellow Gold", "order": 4, "priceCents": 1339700, "imageUuids": ["b8974702-d582-467d-9d1f-04f9b016aa2f", "ce036167-aa0b-4735-8dbb-7937c42194be", "17e64268-d184-462e-8765-fe1d76cbb669"]}, "064230e0-6f39-56a7-92a8-60c8149e216f": {"name": "14k Rose Gold", "order": 5, "priceCents": 1339700, "imageUuids": ["0c090c12-4eb0-4a8d-ad8f-7ec1b1c63fbc", "d28f8275-e6d0-4bdf-be8d-514968728955", "a879051a-2108-42c3-b3fc-59b16861bf42"]}}}, "b844c508-46c7-5a0c-a1e9-986a8157c8b7": {"name": "Size", "order": 1, "pricesVary": false, "imagesVary": false, "defaultOption": "abb1cc7c-d9cd-5594-b243-8db42673b76e", "options": {"abb1cc7c-d9cd-5594-b243-8db42673b76e": {"name": "XXS", "order": 0}, "4b77971f-8ee8-5ea4-83f4-d93687a9a6bd": {"name": "XS", "order": 1}, "a356ad6b-0fa7-5a5b-b203-a1270687b47a": {"name": "S", "order": 2}, "cd369800-a8bf-50d3-8c84-91b2c802e982": {"name": "M", "order": 3}, "e9d5af62-b1b2-55d0-b7ea-5c2dd411522e": {"name": "L", "order": 4}, "229aacdb-6a5d-5727-b088-bde4083477ad": {"name": "XL", "order": 5}, "1135eeba-d434-5a76-b951-79231b2d5a60": {"name": "XXL", "order": 6}}}}'::jsonb, '{"7fc79cbb-4220-5952-ab40-e5a733dfc2bc:cb0f603c-357a-5aaa-95c3-3af257b5ba60|b844c508-46c7-5a0c-a1e9-986a8157c8b7:abb1cc7c-d9cd-5594-b243-8db42673b76e": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:cb0f603c-357a-5aaa-95c3-3af257b5ba60|b844c508-46c7-5a0c-a1e9-986a8157c8b7:4b77971f-8ee8-5ea4-83f4-d93687a9a6bd": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:cb0f603c-357a-5aaa-95c3-3af257b5ba60|b844c508-46c7-5a0c-a1e9-986a8157c8b7:a356ad6b-0fa7-5a5b-b203-a1270687b47a": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:cb0f603c-357a-5aaa-95c3-3af257b5ba60|b844c508-46c7-5a0c-a1e9-986a8157c8b7:cd369800-a8bf-50d3-8c84-91b2c802e982": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:cb0f603c-357a-5aaa-95c3-3af257b5ba60|b844c508-46c7-5a0c-a1e9-986a8157c8b7:e9d5af62-b1b2-55d0-b7ea-5c2dd411522e": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:cb0f603c-357a-5aaa-95c3-3af257b5ba60|b844c508-46c7-5a0c-a1e9-986a8157c8b7:229aacdb-6a5d-5727-b088-bde4083477ad": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:cb0f603c-357a-5aaa-95c3-3af257b5ba60|b844c508-46c7-5a0c-a1e9-986a8157c8b7:1135eeba-d434-5a76-b951-79231b2d5a60": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:5464b0fe-8054-5511-8cea-2a6004fd2c34|b844c508-46c7-5a0c-a1e9-986a8157c8b7:abb1cc7c-d9cd-5594-b243-8db42673b76e": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:5464b0fe-8054-5511-8cea-2a6004fd2c34|b844c508-46c7-5a0c-a1e9-986a8157c8b7:4b77971f-8ee8-5ea4-83f4-d93687a9a6bd": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:5464b0fe-8054-5511-8cea-2a6004fd2c34|b844c508-46c7-5a0c-a1e9-986a8157c8b7:a356ad6b-0fa7-5a5b-b203-a1270687b47a": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:5464b0fe-8054-5511-8cea-2a6004fd2c34|b844c508-46c7-5a0c-a1e9-986a8157c8b7:cd369800-a8bf-50d3-8c84-91b2c802e982": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:5464b0fe-8054-5511-8cea-2a6004fd2c34|b844c508-46c7-5a0c-a1e9-986a8157c8b7:e9d5af62-b1b2-55d0-b7ea-5c2dd411522e": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:5464b0fe-8054-5511-8cea-2a6004fd2c34|b844c508-46c7-5a0c-a1e9-986a8157c8b7:229aacdb-6a5d-5727-b088-bde4083477ad": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:5464b0fe-8054-5511-8cea-2a6004fd2c34|b844c508-46c7-5a0c-a1e9-986a8157c8b7:1135eeba-d434-5a76-b951-79231b2d5a60": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:3a80e979-1632-5a34-93b3-66b8ba935067|b844c508-46c7-5a0c-a1e9-986a8157c8b7:abb1cc7c-d9cd-5594-b243-8db42673b76e": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:3a80e979-1632-5a34-93b3-66b8ba935067|b844c508-46c7-5a0c-a1e9-986a8157c8b7:4b77971f-8ee8-5ea4-83f4-d93687a9a6bd": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:3a80e979-1632-5a34-93b3-66b8ba935067|b844c508-46c7-5a0c-a1e9-986a8157c8b7:a356ad6b-0fa7-5a5b-b203-a1270687b47a": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:3a80e979-1632-5a34-93b3-66b8ba935067|b844c508-46c7-5a0c-a1e9-986a8157c8b7:cd369800-a8bf-50d3-8c84-91b2c802e982": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:3a80e979-1632-5a34-93b3-66b8ba935067|b844c508-46c7-5a0c-a1e9-986a8157c8b7:e9d5af62-b1b2-55d0-b7ea-5c2dd411522e": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:3a80e979-1632-5a34-93b3-66b8ba935067|b844c508-46c7-5a0c-a1e9-986a8157c8b7:229aacdb-6a5d-5727-b088-bde4083477ad": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:3a80e979-1632-5a34-93b3-66b8ba935067|b844c508-46c7-5a0c-a1e9-986a8157c8b7:1135eeba-d434-5a76-b951-79231b2d5a60": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:fadf7bd6-5233-5548-9fa4-6cb39e465b38|b844c508-46c7-5a0c-a1e9-986a8157c8b7:abb1cc7c-d9cd-5594-b243-8db42673b76e": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:fadf7bd6-5233-5548-9fa4-6cb39e465b38|b844c508-46c7-5a0c-a1e9-986a8157c8b7:4b77971f-8ee8-5ea4-83f4-d93687a9a6bd": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:fadf7bd6-5233-5548-9fa4-6cb39e465b38|b844c508-46c7-5a0c-a1e9-986a8157c8b7:a356ad6b-0fa7-5a5b-b203-a1270687b47a": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:fadf7bd6-5233-5548-9fa4-6cb39e465b38|b844c508-46c7-5a0c-a1e9-986a8157c8b7:cd369800-a8bf-50d3-8c84-91b2c802e982": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:fadf7bd6-5233-5548-9fa4-6cb39e465b38|b844c508-46c7-5a0c-a1e9-986a8157c8b7:e9d5af62-b1b2-55d0-b7ea-5c2dd411522e": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:fadf7bd6-5233-5548-9fa4-6cb39e465b38|b844c508-46c7-5a0c-a1e9-986a8157c8b7:229aacdb-6a5d-5727-b088-bde4083477ad": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:fadf7bd6-5233-5548-9fa4-6cb39e465b38|b844c508-46c7-5a0c-a1e9-986a8157c8b7:1135eeba-d434-5a76-b951-79231b2d5a60": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:d876dea0-0ee9-5b48-8ebf-e1a64b822ec3|b844c508-46c7-5a0c-a1e9-986a8157c8b7:abb1cc7c-d9cd-5594-b243-8db42673b76e": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:d876dea0-0ee9-5b48-8ebf-e1a64b822ec3|b844c508-46c7-5a0c-a1e9-986a8157c8b7:4b77971f-8ee8-5ea4-83f4-d93687a9a6bd": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:d876dea0-0ee9-5b48-8ebf-e1a64b822ec3|b844c508-46c7-5a0c-a1e9-986a8157c8b7:a356ad6b-0fa7-5a5b-b203-a1270687b47a": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:d876dea0-0ee9-5b48-8ebf-e1a64b822ec3|b844c508-46c7-5a0c-a1e9-986a8157c8b7:cd369800-a8bf-50d3-8c84-91b2c802e982": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:d876dea0-0ee9-5b48-8ebf-e1a64b822ec3|b844c508-46c7-5a0c-a1e9-986a8157c8b7:e9d5af62-b1b2-55d0-b7ea-5c2dd411522e": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:d876dea0-0ee9-5b48-8ebf-e1a64b822ec3|b844c508-46c7-5a0c-a1e9-986a8157c8b7:229aacdb-6a5d-5727-b088-bde4083477ad": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:d876dea0-0ee9-5b48-8ebf-e1a64b822ec3|b844c508-46c7-5a0c-a1e9-986a8157c8b7:1135eeba-d434-5a76-b951-79231b2d5a60": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:064230e0-6f39-56a7-92a8-60c8149e216f|b844c508-46c7-5a0c-a1e9-986a8157c8b7:abb1cc7c-d9cd-5594-b243-8db42673b76e": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:064230e0-6f39-56a7-92a8-60c8149e216f|b844c508-46c7-5a0c-a1e9-986a8157c8b7:4b77971f-8ee8-5ea4-83f4-d93687a9a6bd": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:064230e0-6f39-56a7-92a8-60c8149e216f|b844c508-46c7-5a0c-a1e9-986a8157c8b7:a356ad6b-0fa7-5a5b-b203-a1270687b47a": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:064230e0-6f39-56a7-92a8-60c8149e216f|b844c508-46c7-5a0c-a1e9-986a8157c8b7:cd369800-a8bf-50d3-8c84-91b2c802e982": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:064230e0-6f39-56a7-92a8-60c8149e216f|b844c508-46c7-5a0c-a1e9-986a8157c8b7:e9d5af62-b1b2-55d0-b7ea-5c2dd411522e": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:064230e0-6f39-56a7-92a8-60c8149e216f|b844c508-46c7-5a0c-a1e9-986a8157c8b7:229aacdb-6a5d-5727-b088-bde4083477ad": {"priceCents": null, "disabled": false, "inventory": 5}, "7fc79cbb-4220-5952-ab40-e5a733dfc2bc:064230e0-6f39-56a7-92a8-60c8149e216f|b844c508-46c7-5a0c-a1e9-986a8157c8b7:1135eeba-d434-5a76-b951-79231b2d5a60": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_153_id, listing_153_short_id, listing_153_shop_id, listing_153_category_id, listing_153_country_code, listing_153_title, listing_153_subtitle, listing_153_full_descr, listing_153_price_cents, NULL, NULL, listing_153_image_uuids, NULL, '{"e79a37b5-7433-5251-b321-b48f465d8bf4": {"name": "Metal", "order": 0, "pricesVary": true, "imagesVary": true, "defaultOption": "a8093905-d622-556c-9225-e384feddc442", "options": {"a8093905-d622-556c-9225-e384feddc442": {"name": "Sterling Silver", "order": 0, "priceCents": 25500, "imageUuids": ["d73ccdd9-c514-4c73-9cd5-8a6fc941f9d2"]}, "b757e676-03aa-5adc-a0af-18a2695bf7e8": {"name": "14k Yellow Gold", "order": 1, "priceCents": 153700, "imageUuids": ["0e485051-5d22-4684-850f-8e14391d0681"]}, "860fe253-c26e-5d77-9391-d15ba67d638c": {"name": "14k Rose Gold", "order": 2, "priceCents": 153700, "imageUuids": ["0fb7bba4-c93d-4f0f-9dc8-99ddd3b9cb74"]}, "5f0c835a-269f-5d5d-aea5-80612e1130e0": {"name": "14k White Gold", "order": 3, "priceCents": 153700, "imageUuids": ["7599c73e-d785-4caf-898b-a07a6087ece3"]}, "1e4cdad0-6012-5094-9d2e-6f9edb885fce": {"name": "18k Yellow Gold", "order": 4, "priceCents": 229400, "imageUuids": ["5b11dc9e-6136-412e-9512-f3005ca4814a"]}, "a9520702-0e43-56e2-8413-e20b08aae046": {"name": "Platinum", "order": 5, "priceCents": 189000, "imageUuids": ["b6c0b2b0-60c1-47dd-a282-82eb32c26732"]}}}}'::jsonb, '{"e79a37b5-7433-5251-b321-b48f465d8bf4:a8093905-d622-556c-9225-e384feddc442": {"priceCents": null, "disabled": false, "inventory": 5}, "e79a37b5-7433-5251-b321-b48f465d8bf4:b757e676-03aa-5adc-a0af-18a2695bf7e8": {"priceCents": null, "disabled": false, "inventory": 5}, "e79a37b5-7433-5251-b321-b48f465d8bf4:860fe253-c26e-5d77-9391-d15ba67d638c": {"priceCents": null, "disabled": false, "inventory": 5}, "e79a37b5-7433-5251-b321-b48f465d8bf4:5f0c835a-269f-5d5d-aea5-80612e1130e0": {"priceCents": null, "disabled": false, "inventory": 5}, "e79a37b5-7433-5251-b321-b48f465d8bf4:1e4cdad0-6012-5094-9d2e-6f9edb885fce": {"priceCents": null, "disabled": false, "inventory": 5}, "e79a37b5-7433-5251-b321-b48f465d8bf4:a9520702-0e43-56e2-8413-e20b08aae046": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_154_id, listing_154_short_id, listing_154_shop_id, listing_154_category_id, listing_154_country_code, listing_154_title, listing_154_subtitle, listing_154_full_descr, listing_154_price_cents, NULL, NULL, listing_154_image_uuids, NULL, '{"242f52cf-c66e-54cc-8d5e-27aa5049c4d5": {"name": "Metal", "order": 0, "pricesVary": true, "imagesVary": true, "defaultOption": "b76b0a1c-8179-5fe6-b00a-1991ed9abf89", "options": {"b76b0a1c-8179-5fe6-b00a-1991ed9abf89": {"name": "Sterling Silver", "order": 0, "priceCents": 25500, "imageUuids": ["7783efbc-c41e-4b3c-ace8-da865c3cdaf2"]}, "1520e40a-ed0d-5d31-a5a3-e9cee672609c": {"name": "14k Yellow Gold", "order": 1, "priceCents": 153700, "imageUuids": ["91368c3d-21f8-43f3-8486-dbbaad5fbca5", "f7427c07-5f04-465f-adfd-7118c44a3daa"]}, "50c79e5f-db34-5109-9391-8c1bed355dd0": {"name": "14k Rose Gold", "order": 2, "priceCents": 153700, "imageUuids": ["b354c8ab-b216-4a1f-895c-e4359bdd8eb1"]}, "d3181be3-537f-5f15-a703-48b90e7c3856": {"name": "14k White Gold", "order": 3, "priceCents": 153700, "imageUuids": ["12fa960a-faac-42f6-ad3a-02a550577e4f"]}, "6e4aadc9-8e72-5e99-8471-2153bd76d275": {"name": "18k Yellow Gold", "order": 4, "priceCents": 229400, "imageUuids": ["1e6dfbcc-26ef-45c7-ade3-7e808b1d1233"]}, "7981f318-fd6c-5882-b92d-2e189a6e72f9": {"name": "Platinum", "order": 5, "priceCents": 189000, "imageUuids": ["b7e03625-8cb3-4d2d-8a20-2eca11ce0c0a"]}}}}'::jsonb, '{"242f52cf-c66e-54cc-8d5e-27aa5049c4d5:b76b0a1c-8179-5fe6-b00a-1991ed9abf89": {"priceCents": null, "disabled": false, "inventory": 5}, "242f52cf-c66e-54cc-8d5e-27aa5049c4d5:1520e40a-ed0d-5d31-a5a3-e9cee672609c": {"priceCents": null, "disabled": false, "inventory": 5}, "242f52cf-c66e-54cc-8d5e-27aa5049c4d5:50c79e5f-db34-5109-9391-8c1bed355dd0": {"priceCents": null, "disabled": false, "inventory": 5}, "242f52cf-c66e-54cc-8d5e-27aa5049c4d5:d3181be3-537f-5f15-a703-48b90e7c3856": {"priceCents": null, "disabled": false, "inventory": 5}, "242f52cf-c66e-54cc-8d5e-27aa5049c4d5:6e4aadc9-8e72-5e99-8471-2153bd76d275": {"priceCents": null, "disabled": false, "inventory": 5}, "242f52cf-c66e-54cc-8d5e-27aa5049c4d5:7981f318-fd6c-5882-b92d-2e189a6e72f9": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_155_id, listing_155_short_id, listing_155_shop_id, listing_155_category_id, listing_155_country_code, listing_155_title, listing_155_subtitle, listing_155_full_descr, listing_155_price_cents, NULL, NULL, listing_155_image_uuids, NULL, '{"209c604b-9ca3-5671-b06b-7342aceb2a29": {"name": "Metal", "order": 0, "pricesVary": true, "imagesVary": true, "defaultOption": "5dadc1e6-c650-5ffb-8fdd-2efbb7dbc8d7", "options": {"5dadc1e6-c650-5ffb-8fdd-2efbb7dbc8d7": {"name": "Sterling Silver", "order": 0, "priceCents": 32500, "imageUuids": ["4b8d4759-9a8a-401d-8166-609727155229", "9562e6ba-7abe-4fd8-8631-40f8c1296b28", "2ebb2eb2-cfac-40fc-8f98-ed56e2156a3e"]}, "67060155-ded6-553c-9fcb-313b203e7ed2": {"name": "14k Yellow Gold-Filled", "order": 1, "priceCents": 72500, "imageUuids": ["bda0160f-af7f-4668-9d3a-1f38b7eb7ca5", "79a2f8bd-0df6-4085-ad6a-a66819d53593"]}, "602c4644-bc6a-5c06-9657-31d84514c627": {"name": "14k Rose Gold-Filled", "order": 2, "priceCents": 72500, "imageUuids": ["f80c4fa8-65cf-4c1a-b7d4-09f9409eb0a8", "c2fa9766-0e51-4169-a9db-2a656ac8ca5a"]}, "0435caf5-5a08-5069-9174-e3c62c776ccd": {"name": "14k White Gold", "order": 3, "priceCents": 1539700, "imageUuids": ["3b89ad70-fdb1-4169-bf87-6c7f852e482f", "c3af4ae5-bcc1-471f-8e37-35294c874d7a"]}, "34e6d86c-bb35-5a6c-9d8a-a77dea4d19e7": {"name": "14k Yellow Gold", "order": 4, "priceCents": 1539700, "imageUuids": ["bda0160f-af7f-4668-9d3a-1f38b7eb7ca5", "79a2f8bd-0df6-4085-ad6a-a66819d53593"]}, "24137a7f-b97c-5383-96bd-3326797c25b3": {"name": "14k Rose Gold", "order": 5, "priceCents": 1597500, "imageUuids": ["f80c4fa8-65cf-4c1a-b7d4-09f9409eb0a8", "c2fa9766-0e51-4169-a9db-2a656ac8ca5a"]}}}, "d14937af-cdb2-5e08-9f64-4a2ac799157e": {"name": "Size", "order": 1, "pricesVary": false, "imagesVary": false, "defaultOption": "e73031d9-ef09-56a8-b167-e0d47a1e6f01", "options": {"e73031d9-ef09-56a8-b167-e0d47a1e6f01": {"name": "XXS", "order": 0}, "8fdd3d74-ed02-5643-9f4c-f933be738b89": {"name": "XS", "order": 1}, "35d7bc27-b355-5aa0-b31e-36cde3512964": {"name": "S", "order": 2}, "f2ef642f-44ac-5fb9-90ba-2875b3403b9a": {"name": "M", "order": 3}, "9393e603-6e11-5675-8213-051d52acb4c7": {"name": "L", "order": 4}, "d70b1e36-1f55-59f9-accb-61abbcca1675": {"name": "XL", "order": 5}, "04075762-3ba0-5c38-8c13-2393fec1019c": {"name": "XXL", "order": 6}}}}'::jsonb, '{"209c604b-9ca3-5671-b06b-7342aceb2a29:5dadc1e6-c650-5ffb-8fdd-2efbb7dbc8d7|d14937af-cdb2-5e08-9f64-4a2ac799157e:e73031d9-ef09-56a8-b167-e0d47a1e6f01": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:5dadc1e6-c650-5ffb-8fdd-2efbb7dbc8d7|d14937af-cdb2-5e08-9f64-4a2ac799157e:8fdd3d74-ed02-5643-9f4c-f933be738b89": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:5dadc1e6-c650-5ffb-8fdd-2efbb7dbc8d7|d14937af-cdb2-5e08-9f64-4a2ac799157e:35d7bc27-b355-5aa0-b31e-36cde3512964": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:5dadc1e6-c650-5ffb-8fdd-2efbb7dbc8d7|d14937af-cdb2-5e08-9f64-4a2ac799157e:f2ef642f-44ac-5fb9-90ba-2875b3403b9a": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:5dadc1e6-c650-5ffb-8fdd-2efbb7dbc8d7|d14937af-cdb2-5e08-9f64-4a2ac799157e:9393e603-6e11-5675-8213-051d52acb4c7": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:5dadc1e6-c650-5ffb-8fdd-2efbb7dbc8d7|d14937af-cdb2-5e08-9f64-4a2ac799157e:d70b1e36-1f55-59f9-accb-61abbcca1675": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:5dadc1e6-c650-5ffb-8fdd-2efbb7dbc8d7|d14937af-cdb2-5e08-9f64-4a2ac799157e:04075762-3ba0-5c38-8c13-2393fec1019c": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:67060155-ded6-553c-9fcb-313b203e7ed2|d14937af-cdb2-5e08-9f64-4a2ac799157e:e73031d9-ef09-56a8-b167-e0d47a1e6f01": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:67060155-ded6-553c-9fcb-313b203e7ed2|d14937af-cdb2-5e08-9f64-4a2ac799157e:8fdd3d74-ed02-5643-9f4c-f933be738b89": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:67060155-ded6-553c-9fcb-313b203e7ed2|d14937af-cdb2-5e08-9f64-4a2ac799157e:35d7bc27-b355-5aa0-b31e-36cde3512964": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:67060155-ded6-553c-9fcb-313b203e7ed2|d14937af-cdb2-5e08-9f64-4a2ac799157e:f2ef642f-44ac-5fb9-90ba-2875b3403b9a": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:67060155-ded6-553c-9fcb-313b203e7ed2|d14937af-cdb2-5e08-9f64-4a2ac799157e:9393e603-6e11-5675-8213-051d52acb4c7": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:67060155-ded6-553c-9fcb-313b203e7ed2|d14937af-cdb2-5e08-9f64-4a2ac799157e:d70b1e36-1f55-59f9-accb-61abbcca1675": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:67060155-ded6-553c-9fcb-313b203e7ed2|d14937af-cdb2-5e08-9f64-4a2ac799157e:04075762-3ba0-5c38-8c13-2393fec1019c": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:602c4644-bc6a-5c06-9657-31d84514c627|d14937af-cdb2-5e08-9f64-4a2ac799157e:e73031d9-ef09-56a8-b167-e0d47a1e6f01": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:602c4644-bc6a-5c06-9657-31d84514c627|d14937af-cdb2-5e08-9f64-4a2ac799157e:8fdd3d74-ed02-5643-9f4c-f933be738b89": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:602c4644-bc6a-5c06-9657-31d84514c627|d14937af-cdb2-5e08-9f64-4a2ac799157e:35d7bc27-b355-5aa0-b31e-36cde3512964": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:602c4644-bc6a-5c06-9657-31d84514c627|d14937af-cdb2-5e08-9f64-4a2ac799157e:f2ef642f-44ac-5fb9-90ba-2875b3403b9a": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:602c4644-bc6a-5c06-9657-31d84514c627|d14937af-cdb2-5e08-9f64-4a2ac799157e:9393e603-6e11-5675-8213-051d52acb4c7": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:602c4644-bc6a-5c06-9657-31d84514c627|d14937af-cdb2-5e08-9f64-4a2ac799157e:d70b1e36-1f55-59f9-accb-61abbcca1675": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:602c4644-bc6a-5c06-9657-31d84514c627|d14937af-cdb2-5e08-9f64-4a2ac799157e:04075762-3ba0-5c38-8c13-2393fec1019c": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:0435caf5-5a08-5069-9174-e3c62c776ccd|d14937af-cdb2-5e08-9f64-4a2ac799157e:e73031d9-ef09-56a8-b167-e0d47a1e6f01": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:0435caf5-5a08-5069-9174-e3c62c776ccd|d14937af-cdb2-5e08-9f64-4a2ac799157e:8fdd3d74-ed02-5643-9f4c-f933be738b89": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:0435caf5-5a08-5069-9174-e3c62c776ccd|d14937af-cdb2-5e08-9f64-4a2ac799157e:35d7bc27-b355-5aa0-b31e-36cde3512964": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:0435caf5-5a08-5069-9174-e3c62c776ccd|d14937af-cdb2-5e08-9f64-4a2ac799157e:f2ef642f-44ac-5fb9-90ba-2875b3403b9a": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:0435caf5-5a08-5069-9174-e3c62c776ccd|d14937af-cdb2-5e08-9f64-4a2ac799157e:9393e603-6e11-5675-8213-051d52acb4c7": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:0435caf5-5a08-5069-9174-e3c62c776ccd|d14937af-cdb2-5e08-9f64-4a2ac799157e:d70b1e36-1f55-59f9-accb-61abbcca1675": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:0435caf5-5a08-5069-9174-e3c62c776ccd|d14937af-cdb2-5e08-9f64-4a2ac799157e:04075762-3ba0-5c38-8c13-2393fec1019c": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:34e6d86c-bb35-5a6c-9d8a-a77dea4d19e7|d14937af-cdb2-5e08-9f64-4a2ac799157e:e73031d9-ef09-56a8-b167-e0d47a1e6f01": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:34e6d86c-bb35-5a6c-9d8a-a77dea4d19e7|d14937af-cdb2-5e08-9f64-4a2ac799157e:8fdd3d74-ed02-5643-9f4c-f933be738b89": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:34e6d86c-bb35-5a6c-9d8a-a77dea4d19e7|d14937af-cdb2-5e08-9f64-4a2ac799157e:35d7bc27-b355-5aa0-b31e-36cde3512964": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:34e6d86c-bb35-5a6c-9d8a-a77dea4d19e7|d14937af-cdb2-5e08-9f64-4a2ac799157e:f2ef642f-44ac-5fb9-90ba-2875b3403b9a": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:34e6d86c-bb35-5a6c-9d8a-a77dea4d19e7|d14937af-cdb2-5e08-9f64-4a2ac799157e:9393e603-6e11-5675-8213-051d52acb4c7": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:34e6d86c-bb35-5a6c-9d8a-a77dea4d19e7|d14937af-cdb2-5e08-9f64-4a2ac799157e:d70b1e36-1f55-59f9-accb-61abbcca1675": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:34e6d86c-bb35-5a6c-9d8a-a77dea4d19e7|d14937af-cdb2-5e08-9f64-4a2ac799157e:04075762-3ba0-5c38-8c13-2393fec1019c": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:24137a7f-b97c-5383-96bd-3326797c25b3|d14937af-cdb2-5e08-9f64-4a2ac799157e:e73031d9-ef09-56a8-b167-e0d47a1e6f01": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:24137a7f-b97c-5383-96bd-3326797c25b3|d14937af-cdb2-5e08-9f64-4a2ac799157e:8fdd3d74-ed02-5643-9f4c-f933be738b89": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:24137a7f-b97c-5383-96bd-3326797c25b3|d14937af-cdb2-5e08-9f64-4a2ac799157e:35d7bc27-b355-5aa0-b31e-36cde3512964": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:24137a7f-b97c-5383-96bd-3326797c25b3|d14937af-cdb2-5e08-9f64-4a2ac799157e:f2ef642f-44ac-5fb9-90ba-2875b3403b9a": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:24137a7f-b97c-5383-96bd-3326797c25b3|d14937af-cdb2-5e08-9f64-4a2ac799157e:9393e603-6e11-5675-8213-051d52acb4c7": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:24137a7f-b97c-5383-96bd-3326797c25b3|d14937af-cdb2-5e08-9f64-4a2ac799157e:d70b1e36-1f55-59f9-accb-61abbcca1675": {"priceCents": null, "disabled": false, "inventory": 5}, "209c604b-9ca3-5671-b06b-7342aceb2a29:24137a7f-b97c-5383-96bd-3326797c25b3|d14937af-cdb2-5e08-9f64-4a2ac799157e:04075762-3ba0-5c38-8c13-2393fec1019c": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_156_id, listing_156_short_id, listing_156_shop_id, listing_156_category_id, listing_156_country_code, listing_156_title, listing_156_subtitle, listing_156_full_descr, listing_156_price_cents, NULL, NULL, listing_156_image_uuids, NULL, '{"52ced4ee-6709-5310-8f0c-2c4e778f1a45": {"name": "Metal", "order": 0, "options": {"9d9620a9-1e5e-5d65-9fe5-542ea037b248": {"name": "Sterling Silver", "order": 0, "imageUuids": ["fdfef09c-c3d7-41bb-a677-6531461922b7", "4be5e7e7-8ffc-4e20-b0da-c0658711096e", "b7931424-1693-4993-84b2-f0906b509681", "08f284af-7a22-46c6-8481-f307773f3c37", "ff1f9686-b869-4cfc-aa6c-e18323d55d6f", "2b97453d-f1de-4bf7-9602-f7e67deeb456"], "priceCents": 36000}, "1e865c44-b353-5e8d-95fc-ab9f7376d044": {"name": "Bronze", "order": 1, "imageUuids": ["e1eb2010-d685-4b1e-98c3-dae1b92375ff", "946157fa-c502-4b0f-bcb7-79c5999f264d", "f53acda3-3cf1-408a-bf8a-57584484143d", "b470299c-a0dd-42c3-bf28-163a2f3b6a6f", "375978fa-1fd8-48ea-b73f-05d78e359610"], "priceCents": 33000}}, "imagesVary": true, "pricesVary": true, "defaultOption": "9d9620a9-1e5e-5d65-9fe5-542ea037b248"}}'::jsonb, '{"52ced4ee-6709-5310-8f0c-2c4e778f1a45:9d9620a9-1e5e-5d65-9fe5-542ea037b248": {"priceCents": null, "disabled": false, "inventory": 5}, "52ced4ee-6709-5310-8f0c-2c4e778f1a45:1e865c44-b353-5e8d-95fc-ab9f7376d044": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_157_id, listing_157_short_id, listing_157_shop_id, listing_157_category_id, listing_157_country_code, listing_157_title, listing_157_subtitle, listing_157_full_descr, listing_157_price_cents, NULL, NULL, listing_157_image_uuids, NULL, '{"e84fe1c6-23a3-51f5-90b6-13c270d050b8": {"name": "Metal", "order": 0, "options": {"39c0741b-8bf1-55c4-9997-b14cdb58be77": {"name": "Sterling Silver", "order": 0, "imageUuids": ["ff0d388a-237a-4092-97c0-70c5a9a468ab", "3c69e5c6-75af-43e1-bdd0-7b28d60aedd5", "fc83e4f6-8e96-4c23-b439-593e1f05cbaf", "f6a23993-8641-4496-b3e0-b253f0010ded", "39dfe333-11b0-4f99-b7cb-18724adc02bd", "10e92df2-2b0e-49a1-94b5-09dc714f3cc8", "eea9552c-5d94-45f4-b26b-6590b0f7274d"], "priceCents": 30000}, "4ec6b471-3ba3-5b2b-914d-b2a9374a0567": {"name": "Bronze", "order": 1, "imageUuids": ["f026d2e2-4e87-4e53-a3f7-cd9bbd5cf260", "96324fa4-5921-43c1-9ebe-c27ff77bc223", "6cc6df5b-c6d3-443a-a9c3-83883b3d4594", "369e7401-1a70-46d9-9662-577f13a60bf2", "ad7b0107-73d3-4fc6-b980-7c3a7ae35b73", "eea9552c-5d94-45f4-b26b-6590b0f7274d"], "priceCents": 27000}}, "imagesVary": true, "pricesVary": true, "defaultOption": "39c0741b-8bf1-55c4-9997-b14cdb58be77"}}'::jsonb, '{"e84fe1c6-23a3-51f5-90b6-13c270d050b8:39c0741b-8bf1-55c4-9997-b14cdb58be77": {"priceCents": null, "disabled": false, "inventory": 5}, "e84fe1c6-23a3-51f5-90b6-13c270d050b8:4ec6b471-3ba3-5b2b-914d-b2a9374a0567": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_158_id, listing_158_short_id, listing_158_shop_id, listing_158_category_id, listing_158_country_code, listing_158_title, listing_158_subtitle, listing_158_full_descr, listing_158_price_cents, NULL, NULL, listing_158_image_uuids, NULL, '{"2b42b98c-f96e-59ed-9f9f-446178015798": {"name": "Metal", "order": 0, "options": {"d055532a-7760-5c6c-99f5-8c0ffebdec2d": {"name": "Sterling Silver", "order": 0, "imageUuids": ["564bd7e0-7f26-4723-bb93-d64d5187b4e0", "d1a33cd4-bb3e-488f-a0a2-85d49b577915", "075f92cb-3f6d-4165-b82c-6638c5ea1231", "55ec15da-5c0a-46f1-8326-624c359f7836", "7c90f9bb-0d89-4c43-b888-354da7ece47e"], "priceCents": 30000}, "12231fb4-a529-5a41-962f-932b48c2830e": {"name": "Bronze", "order": 1, "imageUuids": ["023f6f15-83fc-47da-8c50-c5e24fbc1d02", "dc81bd9d-4628-4d1d-98b3-0607360fe8f4", "6807b09f-111e-4524-8d10-1626073c7e2a", "438fb3c0-0618-494b-8c16-62976b96b426"], "priceCents": 27000}}, "imagesVary": true, "pricesVary": true, "defaultOption": "d055532a-7760-5c6c-99f5-8c0ffebdec2d"}}'::jsonb, '{"2b42b98c-f96e-59ed-9f9f-446178015798:d055532a-7760-5c6c-99f5-8c0ffebdec2d": {"priceCents": null, "disabled": false, "inventory": 5}, "2b42b98c-f96e-59ed-9f9f-446178015798:12231fb4-a529-5a41-962f-932b48c2830e": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_159_id, listing_159_short_id, listing_159_shop_id, listing_159_category_id, listing_159_country_code, listing_159_title, listing_159_subtitle, listing_159_full_descr, listing_159_price_cents, NULL, NULL, listing_159_image_uuids, NULL, '{"78cfc47c-4cc6-5e55-826b-31b1c5968adb": {"name": "Metal", "order": 0, "options": {"82c0fdc4-0b3f-5b83-86cd-8774ffd16e12": {"name": "Sterling Silver", "order": 0, "imageUuids": ["19df8e6c-72a9-4d76-a334-9fcf0fe7df82", "1f30ef2c-e4c5-478b-8e5b-d8f4f87b574c", "1f55dd17-17c2-4895-9c0b-3dfb22605dcb", "93fe3bcc-95f5-45ba-afff-88d1c9ff7a54", "76c15c17-ac4e-4ae7-a95f-5a516690deb1", "b6871d1b-41c9-478f-874d-41c584687f4c"], "priceCents": 42000}, "f508ce6b-24de-5e91-a576-0fbe16ab301d": {"name": "Bronze", "order": 1, "imageUuids": ["5afeaf2e-7f68-4ac1-b9a8-5cbfe1b8e517", "84be5a0f-9025-4a36-bdfa-abe9cc406367", "b9905b8b-dcb6-4b9d-bbc1-b27243f5a75b", "b19baa51-29d5-4d8a-aa79-ef2becd5311c", "76c15c17-ac4e-4ae7-a95f-5a516690deb1"], "priceCents": 38500}}, "imagesVary": true, "pricesVary": true, "defaultOption": "82c0fdc4-0b3f-5b83-86cd-8774ffd16e12"}}'::jsonb, '{"78cfc47c-4cc6-5e55-826b-31b1c5968adb:82c0fdc4-0b3f-5b83-86cd-8774ffd16e12": {"priceCents": null, "disabled": false, "inventory": 5}, "78cfc47c-4cc6-5e55-826b-31b1c5968adb:f508ce6b-24de-5e91-a576-0fbe16ab301d": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_160_id, listing_160_short_id, listing_160_shop_id, listing_160_category_id, listing_160_country_code, listing_160_title, listing_160_subtitle, listing_160_full_descr, listing_160_price_cents, NULL, NULL, listing_160_image_uuids, NULL, '{"4b7431b4-a755-59cc-af07-ba0c1124e885": {"name": "Metal", "order": 0, "options": {"73ea5668-eb8a-5c42-9856-322d7207956d": {"name": "Sterling Silver", "order": 0, "imageUuids": ["a144fe46-e868-4cdd-a7ae-296786688e61", "413de004-e512-45ac-9fb8-7228a0261d8f", "d2fc13f5-55fe-423e-a1bd-a2569f75c964", "811c0e26-13e3-483c-acf5-e57c11d8779c", "f115fab0-aa75-438d-baef-8ad60855cf3c"], "priceCents": 45000}, "4e393d68-582d-5628-9029-742b5c4073b5": {"name": "Bronze", "order": 1, "imageUuids": ["9b8ad6c8-393d-4e4c-815c-98b0fcca59f1", "413de004-e512-45ac-9fb8-7228a0261d8f", "56ecd1cc-50ee-44c9-bafd-a8645fe5092a", "aee1ac55-a8e3-4138-b8a0-35afe39afc65", "811c0e26-13e3-483c-acf5-e57c11d8779c"], "priceCents": 41000}}, "imagesVary": true, "pricesVary": true, "defaultOption": "73ea5668-eb8a-5c42-9856-322d7207956d"}}'::jsonb, '{"4b7431b4-a755-59cc-af07-ba0c1124e885:73ea5668-eb8a-5c42-9856-322d7207956d": {"priceCents": null, "disabled": false, "inventory": 5}, "4b7431b4-a755-59cc-af07-ba0c1124e885:4e393d68-582d-5628-9029-742b5c4073b5": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_161_id, listing_161_short_id, listing_161_shop_id, listing_161_category_id, listing_161_country_code, listing_161_title, listing_161_subtitle, listing_161_full_descr, listing_161_price_cents, NULL, NULL, listing_161_image_uuids, NULL, '{"05205b69-fd2b-50e8-b1f9-64f7d1d9852f": {"name": "Metal", "order": 0, "options": {"13cd873d-88de-566d-84ec-f3fef8c60e12": {"name": "Sterling Silver", "order": 0, "imageUuids": ["c3aa1b33-9014-4f1a-a199-c018350a3835", "c3b2eea7-fee3-417b-abf5-4f376687244f", "c1c468b8-ff56-4498-a098-4c8300ec73bf", "55ec15da-5c0a-46f1-8326-624c359f7836", "baba6167-773e-4374-a43a-15cf0289e658"], "priceCents": 39000}, "2bb1b6e5-c3c6-5a7e-902f-5a7d3d7b7a49": {"name": "Bronze", "order": 1, "imageUuids": ["092f9982-50d6-4b93-8ee3-87f7f4a0fa74", "c3b2eea7-fee3-417b-abf5-4f376687244f", "87a712a5-8eaa-4f99-b428-b06f2844c528", "d8070c93-9f10-4bf5-b8f0-7ddf921e596b"], "priceCents": 36000}}, "imagesVary": true, "pricesVary": true, "defaultOption": "13cd873d-88de-566d-84ec-f3fef8c60e12"}}'::jsonb, '{"05205b69-fd2b-50e8-b1f9-64f7d1d9852f:13cd873d-88de-566d-84ec-f3fef8c60e12": {"priceCents": null, "disabled": false, "inventory": 5}, "05205b69-fd2b-50e8-b1f9-64f7d1d9852f:2bb1b6e5-c3c6-5a7e-902f-5a7d3d7b7a49": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_162_id, listing_162_short_id, listing_162_shop_id, listing_162_category_id, listing_162_country_code, listing_162_title, listing_162_subtitle, listing_162_full_descr, listing_162_price_cents, NULL, NULL, listing_162_image_uuids, NULL, '{"df2d77bf-7f6c-5ce3-84b6-d89b438a7860": {"name": "Metal", "order": 0, "options": {"15374358-45c1-592b-b1d6-e4660bd0599b": {"name": "Sterling Silver", "order": 0, "imageUuids": ["d283db3f-3aa1-4f11-a08e-49aa2c1b833c", "f2004c2e-d4fa-4de8-8822-750edf3cb074", "15b201df-6ab2-4c3d-a28e-affa019ff8c9", "6da8dac8-8350-43a6-8b69-9573e7cbb128", "90ef9c7d-459e-495d-a204-f09f5098b43b", "fa679046-5871-4673-9fbf-67c24de9c82e"], "priceCents": 39000}, "448189d8-1894-51b2-921d-6cb1b1f19fbe": {"name": "Bronze", "order": 1, "imageUuids": ["1f954aa2-94a4-43e2-acfd-7241e48a4173", "f2004c2e-d4fa-4de8-8822-750edf3cb074", "90ef9c7d-459e-495d-a204-f09f5098b43b"], "priceCents": 36000}}, "imagesVary": true, "pricesVary": true, "defaultOption": "15374358-45c1-592b-b1d6-e4660bd0599b"}}'::jsonb, '{"df2d77bf-7f6c-5ce3-84b6-d89b438a7860:15374358-45c1-592b-b1d6-e4660bd0599b": {"priceCents": null, "disabled": false, "inventory": 5}, "df2d77bf-7f6c-5ce3-84b6-d89b438a7860:448189d8-1894-51b2-921d-6cb1b1f19fbe": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_163_id, listing_163_short_id, listing_163_shop_id, listing_163_category_id, listing_163_country_code, listing_163_title, listing_163_subtitle, listing_163_full_descr, listing_163_price_cents, NULL, NULL, listing_163_image_uuids, NULL, '{"91ebe1a4-683b-5ef0-9cfa-8f167a609f07": {"name": "Metal", "order": 0, "options": {"2bd0ad12-55fa-56e8-9807-59c231c5a580": {"name": "Sterling Silver", "order": 0, "imageUuids": ["dfffb731-1bf8-48c1-b194-50528116c4eb", "6eac0989-0fd7-40c2-a096-44c6de1b803d", "1530a9f9-62c1-4b0d-a59b-6c2d88e5a6e7", "9b306a10-eb69-4d3e-9691-acc039122210", "c63c70fa-2cbd-4701-aa8e-6d9e5ee4c55c", "bf21d767-3061-488b-84ca-d2332b59c58c"], "priceCents": 39000}, "5423cf8e-120f-5836-9add-43e22bc2130c": {"name": "Bronze", "order": 1, "imageUuids": ["86460b1a-2a38-4f66-a223-d3b5008ce3f5", "820817c5-554d-41e4-bdd2-351fdb930156", "aeb1eded-472c-4a4c-ae33-31fa6e085836", "149f1947-61e3-4605-943d-fb4c088890e9"], "priceCents": 36000}}, "imagesVary": true, "pricesVary": true, "defaultOption": "2bd0ad12-55fa-56e8-9807-59c231c5a580"}}'::jsonb, '{"91ebe1a4-683b-5ef0-9cfa-8f167a609f07:2bd0ad12-55fa-56e8-9807-59c231c5a580": {"priceCents": null, "disabled": false, "inventory": 5}, "91ebe1a4-683b-5ef0-9cfa-8f167a609f07:5423cf8e-120f-5836-9add-43e22bc2130c": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_164_id, listing_164_short_id, listing_164_shop_id, listing_164_category_id, listing_164_country_code, listing_164_title, listing_164_subtitle, listing_164_full_descr, listing_164_price_cents, NULL, NULL, listing_164_image_uuids, NULL, '{"9cb3f812-4525-5108-aea8-a6feaf3a9c44": {"name": "Metal", "order": 0, "options": {"118d9197-171b-565f-9353-6567d7aed6f1": {"name": "Sterling Silver", "order": 0, "imageUuids": ["dd475ee5-6b91-41a4-9428-d54613db24ab", "81da3c65-213b-46fd-bd35-94bfd018e5c1", "328f8e03-f090-43ed-8181-a0e7177908b0", "caaea342-f9f5-4d6c-90c4-5d62e61b5550", "8a64e1ca-582f-48c3-9de9-23c99cda41b3", "e53f83c3-a9b8-4cd3-913e-27d90cd80bc0"], "priceCents": 48000}, "51e1b933-2660-506f-8b6d-c7ab29d7fec8": {"name": "Bronze", "order": 1, "imageUuids": ["6b01620e-7753-4148-ba8d-da96e338c33f", "81da3c65-213b-46fd-bd35-94bfd018e5c1", "6dc1de3f-27b4-43d8-95b9-eebd9cf401b8", "fc2fe5ef-eb33-43c6-b3fc-35461b440f5c"], "priceCents": 43500}}, "imagesVary": true, "pricesVary": true, "defaultOption": "118d9197-171b-565f-9353-6567d7aed6f1"}}'::jsonb, '{"9cb3f812-4525-5108-aea8-a6feaf3a9c44:118d9197-171b-565f-9353-6567d7aed6f1": {"priceCents": null, "disabled": false, "inventory": 5}, "9cb3f812-4525-5108-aea8-a6feaf3a9c44:51e1b933-2660-506f-8b6d-c7ab29d7fec8": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_165_id, listing_165_short_id, listing_165_shop_id, listing_165_category_id, listing_165_country_code, listing_165_title, listing_165_subtitle, listing_165_full_descr, listing_165_price_cents, NULL, NULL, listing_165_image_uuids, NULL, '{"52963372-d941-5a85-a962-3f173898c18d": {"name": "Metal", "order": 0, "options": {"04aabeff-4a27-5ab1-8991-1dea79048cae": {"name": "Sterling Silver", "order": 0, "imageUuids": ["ecbd594e-00c2-42ad-bc23-51a6ac525069", "22cba2fe-ed4e-4d64-8425-786c2fe3cb89", "f6a23993-8641-4496-b3e0-b253f0010ded", "685d8935-dedf-4368-8b23-28c7c26674d1", "83ce5e2d-dbe1-4ae1-b395-f19e6765c3b8"], "priceCents": 42000}, "8ba0a8f6-4ddf-5a2d-8ee1-51278f169f0e": {"name": "Bronze", "order": 1, "imageUuids": ["e9613c53-0241-4f33-ac9c-d2ec5fcdf4f9", "22cba2fe-ed4e-4d64-8425-786c2fe3cb89", "9c7d99a0-4d28-4fcc-bf9c-fc3333b3a239", "369e7401-1a70-46d9-9662-577f13a60bf2", "2b62f0b5-4ce1-4485-946e-f2d0bb4fd122"], "priceCents": 38500}}, "imagesVary": true, "pricesVary": true, "defaultOption": "04aabeff-4a27-5ab1-8991-1dea79048cae"}}'::jsonb, '{"52963372-d941-5a85-a962-3f173898c18d:04aabeff-4a27-5ab1-8991-1dea79048cae": {"priceCents": null, "disabled": false, "inventory": 5}, "52963372-d941-5a85-a962-3f173898c18d:8ba0a8f6-4ddf-5a2d-8ee1-51278f169f0e": {"priceCents": null, "disabled": false, "inventory": 5}}'::jsonb, true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    INSERT INTO listing (id, short_id, shop_id, category_id, country_code, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, variation_availability, available, personalization_profile_id, inventory, track_inventory, created_at, updated_at)
    VALUES
        (listing_166_id, listing_166_short_id, listing_166_shop_id, listing_166_category_id, listing_166_country_code, listing_166_title, listing_166_subtitle, listing_166_full_descr, listing_166_price_cents, NULL, NULL, listing_166_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_167_id, listing_167_short_id, listing_167_shop_id, listing_167_category_id, listing_167_country_code, listing_167_title, listing_167_subtitle, listing_167_full_descr, listing_167_price_cents, NULL, NULL, listing_167_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_168_id, listing_168_short_id, listing_168_shop_id, listing_168_category_id, listing_168_country_code, listing_168_title, listing_168_subtitle, listing_168_full_descr, listing_168_price_cents, NULL, NULL, listing_168_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_169_id, listing_169_short_id, listing_169_shop_id, listing_169_category_id, listing_169_country_code, listing_169_title, listing_169_subtitle, listing_169_full_descr, listing_169_price_cents, NULL, NULL, listing_169_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_170_id, listing_170_short_id, listing_170_shop_id, listing_170_category_id, listing_170_country_code, listing_170_title, listing_170_subtitle, listing_170_full_descr, listing_170_price_cents, NULL, NULL, listing_170_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_171_id, listing_171_short_id, listing_171_shop_id, listing_171_category_id, listing_171_country_code, listing_171_title, listing_171_subtitle, listing_171_full_descr, listing_171_price_cents, NULL, NULL, listing_171_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_172_id, listing_172_short_id, listing_172_shop_id, listing_172_category_id, listing_172_country_code, listing_172_title, listing_172_subtitle, listing_172_full_descr, listing_172_price_cents, NULL, NULL, listing_172_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_173_id, listing_173_short_id, listing_173_shop_id, listing_173_category_id, listing_173_country_code, listing_173_title, listing_173_subtitle, listing_173_full_descr, listing_173_price_cents, NULL, NULL, listing_173_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_174_id, listing_174_short_id, listing_174_shop_id, listing_174_category_id, listing_174_country_code, listing_174_title, listing_174_subtitle, listing_174_full_descr, listing_174_price_cents, NULL, NULL, listing_174_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (listing_175_id, listing_175_short_id, listing_175_shop_id, listing_175_category_id, listing_175_country_code, listing_175_title, listing_175_subtitle, listing_175_full_descr, listing_175_price_cents, NULL, NULL, listing_175_image_uuids, NULL, '{}', '{}', true, NULL, catalog_default_inventory, catalog_default_track_inventory, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT (id) DO UPDATE SET
        short_id = EXCLUDED.short_id,
        shop_id = EXCLUDED.shop_id,
        category_id = EXCLUDED.category_id,
        country_code = EXCLUDED.country_code,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        full_descr = EXCLUDED.full_descr,
        price_cents = EXCLUDED.price_cents,
        image_uuids = EXCLUDED.image_uuids,
        variations = EXCLUDED.variations,
        variation_availability = EXCLUDED.variation_availability,
        available = EXCLUDED.available,
        inventory = EXCLUDED.inventory,
        track_inventory = EXCLUDED.track_inventory,
        updated_at = CURRENT_TIMESTAMP;

    DELETE FROM listing_category
    WHERE id NOT IN ('RINGS', 'BRACELETS', 'NECKLACES', 'EARRINGS', 'ACCESSORIES');

    PERFORM setval(pg_get_serial_sequence('listing', 'id'), COALESCE((SELECT MAX(id) FROM listing), 1));

    DELETE FROM featured_listing;

    INSERT INTO featured_listing (listing_id)
    VALUES
        (listing_77_id),
        (listing_73_id),
        (listing_84_id),
        (listing_78_id),
        (listing_72_id),
        (listing_156_id),
        (listing_157_id),
        (listing_133_id),
        (listing_92_id),
        (listing_101_id),
        (listing_105_id),
        (listing_120_id),
        (listing_138_id),
        (listing_141_id),
        (listing_150_id),
        (listing_125_id)
    ON CONFLICT (listing_id) DO NOTHING;

END $$;
