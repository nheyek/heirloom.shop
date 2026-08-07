DO $$

DECLARE
    old_sample_shop_ids CONSTANT INT[] := ARRAY[1, 2, 3, 4, 5, 6];

    sample_shop_1_id INT := 1;
    sample_shop_1_short_id VARCHAR := 'nK4z';
    sample_shop_1_title VARCHAR := 'H.M. Kala';
    sample_shop_1_profile_image_uuid VARCHAR := '3BD1143B-AA53-4BFD-BB1C-2ABC02C53C9C';
    sample_shop_1_location VARCHAR := 'Graz';
    sample_shop_1_classification VARCHAR := 'Sundials';
    sample_shop_1_country_code CHAR(2) := 'AT';
    sample_shop_1_profile_rich_text TEXT := '<h1>Our Story</h1><p>H.M. Kala is a family workshop just outside Graz, Austria, founded by watchmaker Michael Kala and now in its third generation of hand-finishing precision sundials and nocturnals in solid brass and steel, for over 25 years.</p><h1>Ancient Design, Modern Precision</h1><p>Each instrument is a faithful study of the Universal Equinoctial Ring Sundial, a design used by sailors and mathematicians for centuries and now on permanent display at the Royal Observatory in Greenwich. We rework the historic form to modern tolerances so it keeps true solar time to within 10 minutes, anywhere in the world, using nothing but the sun.</p><h1>More Than a Clock</h1><p>Once its center dial is set to the date, the sundial doubles as a precise compass and a small model of the Earth, since its bridge sits parallel to the planet''s axis and points true north. Every sundial weighs just 40 grams and measures 60mm across, the same size as a classic pocket watch, small enough to wear as a pendant or carry in a pocket.</p><h1>Handmade, Start to Finish</h1><p>The pieces are still cut, pressed, and inked on machines Michael built himself, then assembled, checked, and packaged by hand in the same small workshop where the family started, with every third unit fully disassembled for quality control. Each sundial ships with a detailed instruction booklet and gift packaging, ready to give as a keepsake.</p><h1>The Nocturnal</h1><p>In 2022, customer requests led the family to add a Nocturnal to the lineup, a companion star dial that tells the time at night using the fixed stars, for the Northern and Southern Hemispheres alike.</p>';

    sample_shop_2_id INT := 2;
    sample_shop_2_short_id VARCHAR := 'pQ2w';
    sample_shop_2_title VARCHAR := 'Klimchi';
    sample_shop_2_profile_image_uuid VARCHAR := 'FCA75979-783E-48BF-81E6-30FAE96BAADA';
    sample_shop_2_location VARCHAR := 'Kamenický Šenov';
    sample_shop_2_classification VARCHAR := 'Handcrafted Bohemian glassware';
    sample_shop_2_country_code CHAR(2) := 'CZ';
    sample_shop_2_profile_rich_text TEXT := '<h1>Our Story</h1><p>Klimchi was revived in 2019 by Lukáš Klimčák, who returned to his stepfather''s glassworks in Kamenický Šenov to continue a family tradition of Bohemian glassmaking. Working alongside creative director František Jungvirt, he set out to bring a contemporary eye to techniques passed down through generations.</p><h1>A Factory Built to Last</h1><p>Our kilns sit inside a factory built in 1905 by the same French engineers who constructed the Eiffel Tower, in a town known as Crystal Valley for glassmaking traditions that stretch back to the 16th century, when local farmers turned to glass to survive poor harvests.</p><h1>Color Melted In, Not Sprayed On</h1><p>Rather than spray color onto a finished piece, we melt pigment directly into the glass itself, producing the deep violets, crystalline roses, and glistening aquamarines that give each collection its signature look.</p><h1>Three Days, One Piece</h1><p>Every piece, including our signature hobnail glassware, is shaped by hand: blown into wooden molds, then sculpted and finished while the glass is still hot, a process that can take up to three days from first breath to finished form.</p><h1>A Legacy, Recognized</h1><p>In December 2023, traditional Czech glassmaking craftsmanship was added to UNESCO''s Representative List of the Intangible Cultural Heritage of Humanity, honoring the same techniques still used in our workshop today.</p>';

    sample_shop_3_id INT := 3;
    sample_shop_3_short_id VARCHAR := 'sF7t';
    sample_shop_3_title VARCHAR := 'Santa Barbara Forge';
    sample_shop_3_profile_image_uuid VARCHAR := '41582661-49C7-41E2-8B35-F5ECC74BF465';
    sample_shop_3_location VARCHAR := 'Santa Barbara, CA';
    sample_shop_3_classification VARCHAR := 'Hand-Forged Ironwork';
    sample_shop_3_profile_rich_text TEXT := '<h1>Our Story</h1><p>Santa Barbara''s blacksmithing tradition dates back to 1916, when the Craviotto Bros. opened a steel shop that became the heart of ironwork in the city, until the brothers retired in the mid-1990s and the forge fell silent.</p><h1>Passing the Torch</h1><p>In 2010, we took over the Craviotto Bros.'' original workshop, meeting with the family directly to carry their craft forward &mdash; a passing of the torch in the truest sense. What started as one small forge has grown into a full workshop for architectural ironwork, bespoke furniture, and cookware.</p><h1>From Railings to Ranges</h1><p>We added cookware to the shop wanting to give customers something more intimate than a custom gate or staircase. The first pan was built small on purpose, so it would fit in any kitchen, before the line grew to include larger pans, spatulas, ladles, and hand-forged cleavers.</p><h1>Why Hand-Forged Steel</h1><p>Hammering steel by hand compresses and aligns its grain in a way casting never can, so our pans season faster, heat more evenly, and end up lighter and less porous than cast iron of the same size.</p><h1>Made to Be Handed Down</h1><p>Every piece that leaves our forge, from a stair rail to a skillet, still carries the mark of the hammer and the hands that shaped it, built the same way the Craviotto Bros. built things a century ago: to outlast the person who bought it.</p>';
    sample_shop_3_country_code CHAR(2) := 'US';

    sample_shop_4_id INT := 4;
    sample_shop_4_short_id VARCHAR := 'rW9c';
    sample_shop_4_title VARCHAR := 'Rookwood';
    sample_shop_4_profile_image_uuid VARCHAR := 'E067F679-4583-4126-A5DD-AFBEEB177391';
    sample_shop_4_location VARCHAR := 'Cincinnati, OH';
    sample_shop_4_classification VARCHAR := 'Art Pottery & Tile';
    sample_shop_4_country_code CHAR(2) := 'US';
    sample_shop_4_profile_rich_text TEXT := '<h1>Our Story</h1><p>Rookwood Pottery was founded in 1880 by Maria Longworth Storer, the first woman to found a manufacturing company in the United States. Inspired by the Japanese and French ceramics she saw at the Centennial Exhibition, she started the company with a single kiln in Cincinnati and a simple rule: designs shall be original, and individuality shall be the goal.</p><h1>A Golden Age of Glaze</h1><p>Rookwood''s chemists spent decades perfecting glazes found nowhere else, from the glowing amber Tiger Eye to the soft, frosted Vellum finish introduced in 1904. By 1900 the young company had already won a gold medal at the Paris Exposition, cementing Cincinnati''s place at the center of the American art pottery movement.</p><h1>Beyond the Vase</h1><p>Rookwood tile found its way into some of the country''s grandest interiors, including Cincinnati''s Union Terminal and Carew Tower, New York''s Grand Central Station, and the Seelbach Hotel in Louisville. Even after a century, those installations remain, glazed testaments to work done in this same city.</p><h1>Handmade, Still</h1><p>Every piece still passes through more than a dozen hands on its way from wet clay to finished glaze, thrown, trimmed, dipped, and fired using techniques developed generations ago. We treat the small imperfections that come with that process not as flaws, but as proof that a person, not a machine, made your piece.</p><h1>Back Home in Cincinnati</h1><p>The company closed its kilns in 1967, but collector Arthur Townley bought what remained in 1982, and in 2004 partnered with Cincinnati investors to bring Rookwood back to its original neighborhood, Over-the-Rhine, where it fires pottery again today.</p>';

    sample_listing_1_id INT := 1;
    sample_listing_1_short_id VARCHAR := '4K93K';
    sample_listing_1_shop_id INT := sample_shop_1_id;
    sample_listing_1_category_id VARCHAR := 'ACCESSORIES';
    sample_listing_1_title VARCHAR := 'Pocket Sundial';
    sample_listing_1_subtitle VARCHAR := 'Tell the true solar time anywhere in the world using just the power of the sun';
    sample_listing_1_price_cents INT := 8300;
    sample_listing_1_image_uuids text[] := '{"262d2bb0-d6c2-44df-ab69-be79b035472c", "114462dd-1c2c-41b7-823b-04ba279cd953", "97b2e865-c9c5-450e-9d7f-43dde9e25328", "dc9f2103-17bb-46a3-a14e-c266a28814c5", "9e9c8c90-25f2-453e-b1bd-67c46cb850e5", "db9312e1-0b91-455e-b5ee-e598ab07a7b9", "3604da2b-807d-42ba-a2ad-b4162c1969af"}';
    sample_listing_1_full_descr JSONB := '[
        {
            "title": "Basic Info",
            "richText": "<ul><li><p>Tells the true solar time anywhere in the world using just the power of the sun, achieving surprising accuracy estimated by experts to be better than +/- 10 minutes!</p></li><li><p>Crafted by our family of watchmakers for over 27 years in the same small workshop near Graz in Austria!</p></li><li><p>Measures just 60mm / 2.36 inches in diameter, fitting easily in your pocket and meeting the international sizing standard for pocket watches too!</p></li><li><p>Solid brass &amp; steel construction, with artisan black ink and every third sundial fully disassembled &amp; checked to ensure quality!</p></li><li><p>Inspired by the historic Universal Equinoctial Ring Sundial, currently on display at the Royal Observatory in Greenwich!</p></li><li><p>Can also be used as a precise compass once set up, making a truly versatile instrument!</p></li></ul><p></p>"
        },
        {
            "title": "About the Sundial",
            "richText": "<p>Although sundials have been around for a very long time, they never worked across latitudes until around 500 years ago.</p><p>At that time the Universal Equinoctial Ring Sundial - the inspiration for our sundial - began to be used by a new wave of sailors, explorers and travellers.</p><p>Our sundial tells the true solar time anywhere in the world because the Sun''s angle to the equatorial plane takes different values over the course of the year, and the small hole mask in the centre of the sundial is adjustable, plus set to the date.</p><p>Once set up it is also a model of our planet with the bridge parallel to the earth''s axis, so it can thus be used as a precise compass too!</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li><p>Made of solid brass and steel with artisan black ink coating - for a reassuring weight.</p></li><li><p>Fully assembled weight: 40 g.</p></li><li><p>Ø 60 mm / 2.36 inches diameter.</p></li><li><p>Includes 10 language instruction manual.</p></li><li><p>Comes with an organic cork inlay and an elegant white slider case.</p></li><li><p>The outer and inner rings can be folded together for easy transport.</p></li></ul><p></p>"
        }
    ]';

    sample_listing_2_id INT := 2;
    sample_listing_2_short_id VARCHAR := 'Yb3Hn';
    sample_listing_2_shop_id INT := sample_shop_3_id;
    sample_listing_2_category_id VARCHAR := 'HOUSEWARES';
    sample_listing_2_title VARCHAR := 'Sonora Small Pan';
    sample_listing_2_subtitle VARCHAR := 'Hand-forged carbon steel pan with a short handle, gently sloping sidewalls, and hammered texture.';
    sample_listing_2_price_cents INT := 15500;
    sample_listing_2_image_uuids text[] := '{"3DE08646-9C92-4B2E-94A3-8EEE7AB5C6C0", "202AE1CC-8A97-4A99-8AAC-E2D0C37DD2B4", "21B3D03E-DEF2-4712-8030-D3DCBCF2370B", "4A672E7C-AE45-4D43-A148-9E0A7B718BC7", "53B8648E-BD2B-4D51-AF64-FF15F4ECC078"}';
    sample_listing_2_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>With a short hand-forged handle, gently sloping sidewalls, and hammered texture, our small carbon steel Sonora pan is an extremely versatile utensil for any kitchen. Fantastic for omelets, vegetables, and single meat cuts.</p><p>Made in our shop in Santa Barbara, California. Each item we make is unique and comes with slight imperfections in shape, finish, and color. It''s all part of the character of the pieces we sell, and will not affect performance.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li><p>Total length (handle to rim): 15.5\"</p></li><li><p>Rim to rim: 8.75\"</p></li><li><p>Flat interior cooking surface: 6.25\"</p></li><li><p>Height from table to handle top: 4\"</p></li><li><p>Height from table to bowl lip: 1.25\"</p></li><li><p>Handle length: 7.25\"</p></li><li><p>Weight: approximately 3 lbs</p></li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Like a good leather jacket, it only gets better with age. As your pan gains its season it will change gracefully and become even more non-stick.</p>"
        }
    ]';

    sample_listing_3_id INT := 3;
    sample_listing_3_short_id VARCHAR := 'Qz7Rk';
    sample_listing_3_shop_id INT := sample_shop_3_id;
    sample_listing_3_category_id VARCHAR := 'HOUSEWARES';
    sample_listing_3_title VARCHAR := 'Sonora Large Pan with Handle';
    sample_listing_3_subtitle VARCHAR := 'Hand-forged carbon steel large frying pan with a pineapple-twist helper handle riveted opposite the straight handle.';
    sample_listing_3_price_cents INT := 24500;
    sample_listing_3_image_uuids text[] := '{"C4C307F8-6130-46A9-A8CB-A0892802EFE5", "4728F288-C50F-42C4-B662-99611B97E1F6", "EE11BA0E-024C-40E1-97B2-3BC38D5EE469", "52E80887-33D6-4360-9280-7466C83B45FE", "4E187B30-37BF-4781-BE49-030C01DC6557", "4AE12AE3-DB88-4B02-A222-F29B5B563204", "8C6ACC56-0E36-4252-A50A-52D80F753D02"}';
    sample_listing_3_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>All the beauty and functionality of the carbon steel Sonora Large Frying Pan, but with an added hand-forged pineapple-twist helper handle riveted to the rim opposite the straight handle.</p><p>Made in our shop in Santa Barbara, California. Each item we make is unique and comes with slight imperfections in shape, finish, and color. It''s all part of the character of the pieces we sell, and will not affect performance.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li><p>Total length (handle to opposite handle): 21.5\"</p></li><li><p>Rim to rim: 11\"</p></li><li><p>Flat interior cooking surface: 9.25\"</p></li><li><p>Height from table to long handle top: 4.5\"</p></li><li><p>Height from table to bowl lip: 1.375\"</p></li><li><p>Long handle length: 9\"</p></li><li><p>Helper handle height: 3.5\"</p></li><li><p>Weight: approximately 5.8 lbs</p></li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Like a good leather jacket, it only gets better with age. As your pan gains its season it will change gracefully and become even more non-stick.</p>"
        }
    ]';

    sample_listing_4_id INT := 4;
    sample_listing_4_short_id VARCHAR := 'Wm2Fp';
    sample_listing_4_shop_id INT := sample_shop_3_id;
    sample_listing_4_category_id VARCHAR := 'HOUSEWARES';
    sample_listing_4_title VARCHAR := 'Sonora Roaster';
    sample_listing_4_subtitle VARCHAR := 'Hand-forged carbon steel roaster with two helper handles and a gently curving sidewall, sized for larger meals.';
    sample_listing_4_price_cents INT := 30500;
    sample_listing_4_image_uuids text[] := '{"6FF3E7F8-23DE-490C-A348-3CFB227FFDC7", "ADE78DEA-75CB-4CE6-AA6C-B0FE71637C26", "60830011-8454-45EC-AA45-578DBE530E6E", "FF5B2BC4-5CB4-4DC1-B48F-7A2585E29099", "39AF3CA5-4856-43B0-BB1C-AA6DBE718543", "77A728E0-90D2-42DC-A60A-276861A9B868", "5A1E2109-A2B9-42B9-A8E5-E7EE7B9521C0", "FF235BEE-6A5E-4E40-9467-E80A3558100A"}';
    sample_listing_4_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>With two hand-forged helper handles and a gently curving sidewall, our carbon steel Sonora Roaster pan provides a versatile cooking surface that can handle several foods at once. A stunning centerpiece of any kitchen or table, this pan is ideal for cooking larger meals. Cook eggs on one side and chorizo in the other, or throw in the entire bird!</p><p>Made in our shop in Santa Barbara, California. Each item we make is unique and comes with slight imperfections in shape, finish, and color. It''s all part of the character of the pieces we sell, and will not affect performance.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li><p>Total width (handle to handle): 15.5\"</p></li><li><p>Rim to rim: 13.5\"</p></li><li><p>Flat interior cooking surface: 11\"</p></li><li><p>Height from table to handle top: 4\"</p></li><li><p>Height from table to bowl lip: 1.75\"</p></li><li><p>10 gauge steel (approx. 0.135\" thick)</p></li><li><p>Weight: approximately 6.3 lbs</p></li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Like a good leather jacket, it only gets better with age. As your pan gains its season it will change gracefully and become even more non-stick.</p>"
        }
    ]';

    sample_listing_5_id INT := 5;
    sample_listing_5_short_id VARCHAR := 'Tp9Xr';
    sample_listing_5_shop_id INT := sample_shop_4_id;
    sample_listing_5_category_id VARCHAR := 'HOUSEWARES';
    sample_listing_5_title VARCHAR := 'Rook Dish';
    sample_listing_5_subtitle VARCHAR := 'A rare heritage design from the Rookwood archives, revived after more than 60 years out of production.';
    sample_listing_5_price_cents INT := 11000;
    sample_listing_5_image_uuids text[] := '{"436504A3-8AF9-4A69-9B27-792CB1AB6BE4", "933602E5-BF83-4664-AC34-9B9980813790", "84D75D43-D1D8-4C57-B685-2086A8992380", "C24A2AC9-9BD6-486A-BD43-5B4CEEE00835", "CDB69E96-25E0-4424-9BF6-F2A6139397A5"}';
    sample_listing_5_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>A rare heritage design from the Rookwood archives, unseen in production for over 60 years, makes its return. First introduced in the early 1900s by John D. Wareham, a pivotal figure in Rookwood''s history, the piece stands as a symbol of our namesake.</p><p>Originally designed as an ashtray, the dish now functions beautifully as a catchall or jewelry dish. Each piece features variation in glaze, making every one uniquely individual.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li><p>Height: 4\"</p></li><li><p>Width at widest point: 8\"</p></li><li><p>Designer: John D. Wareham</p></li><li><p>Mold number: 1139-25</p></li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Heritage ceramic. Hand wash recommended to preserve the glaze finish.</p>"
        }
    ]';

    sample_listing_6_id INT := 6;
    sample_listing_6_short_id VARCHAR := 'Bv4Ln';
    sample_listing_6_shop_id INT := sample_shop_4_id;
    sample_listing_6_category_id VARCHAR := 'HOUSEWARES';
    sample_listing_6_title VARCHAR := 'Boule Vase';
    sample_listing_6_subtitle VARCHAR := 'A vase to return to, shaping small bouquets into moments worth noticing, perfectly scaled and always at home.';
    sample_listing_6_price_cents INT := 9800;
    -- Raffia (white) hero shot doubles as the listing's main image, followed
    -- by the secondary images from both color galleries; Patina's own hero
    -- shot lives only on its variation option, per imagesVary.
    sample_listing_6_image_uuids text[] := '{"0AB209D4-DB13-4328-B5EF-28979E679303", "2CF8F2CE-6E68-4B97-9269-AEA7235FDCD7", "23B51B91-4EBF-4FE4-97EF-F14E7FCF703F", "19774E62-C6B1-4D0D-91BD-6E3671168CF2", "168A2FED-05EE-432F-A085-B7768FF80568", "850BBEE6-8826-46CA-8FA9-46A43E872F50", "7E6AB14D-71C7-48A0-A1B0-4436103E2CF1", "4DC42FAA-B854-4A57-A2DA-8BBB564736C1", "E9F618BE-F4B4-47F8-98D6-A5507A453F29"}';
    sample_listing_6_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>A 1920s Rookwood design, original mold no. 2918E, designed by John D. Wareham, who joined Rookwood in 1893 as a decorator and later served as president from 1934 to 1954. Revived in 2025 with an updated mold no. 2918E-25 as part of the Heritage Collection.</p><p>Available in Raffia, a warm creamy white with a soft, gentle sheen, or Patina, a deep green with a reflective, mirror-like finish. Variation in glaze makes each piece uniquely its own.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li><p>Height: 7.5\"</p></li><li><p>Width at widest point: 5.5\"</p></li><li><p>Designer: John D. Wareham</p></li><li><p>Mold number: 2918E-25</p></li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Heritage ceramic. Hand wash recommended to preserve the glaze finish.</p>"
        }
    ]';

    sample_listing_6_color_variation_id CONSTANT VARCHAR := 'ec353f9f-d888-40f1-9fd9-4095d37ab23c';
    sample_listing_6_color_raffia_id    CONSTANT VARCHAR := '69851e94-e5af-4ab4-bffa-1188c5239fc4';
    sample_listing_6_color_patina_id    CONSTANT VARCHAR := '244100e9-24f7-467d-8206-5c3e695d7858';
    sample_listing_6_raffia_image_uuid  CONSTANT VARCHAR := '0AB209D4-DB13-4328-B5EF-28979E679303';
    sample_listing_6_patina_image_uuid  CONSTANT VARCHAR := 'EE8D4704-513C-4B84-A9A4-E45FD577F2F1';

    sample_listing_7_id INT := 7;
    sample_listing_7_short_id VARCHAR := 'Hn8Vc';
    sample_listing_7_shop_id INT := sample_shop_2_id;
    sample_listing_7_category_id VARCHAR := 'HOUSEWARES';
    sample_listing_7_title VARCHAR := 'Crystal Hobnail Jug';
    sample_listing_7_subtitle VARCHAR := 'All-purpose hobnail crystal glass jug that holds up to 2 litres, with a tapered handle and ice-restraining lip.';
    sample_listing_7_price_cents INT := 17800;
    sample_listing_7_image_uuids text[] := '{"B33110EF-C8F1-4F12-B270-9C6438B11F45", "1C503BA1-9B4E-47F9-9C0E-CA57BCD1F299", "1F446E79-C7A7-4D7F-88A8-40FCC9E2DEE8", "2A08BAED-AFA5-413E-86C6-F66EE03E3C64", "A5A49593-6F85-43F2-8929-8D3820FE20C7", "B34387C8-89F4-4C17-B2CB-579BCC23D812", "7D1EEE94-73EB-4A51-A6BD-DD2C0B3D211A", "5D59546D-9312-42FE-9A5B-D96230FF5795", "BF1EFBF4-6BB4-467A-8DDE-3E6E2F44A715", "1341C77B-BB2D-46C1-BE00-21E4F701744F", "B931E71E-7579-4741-8AB9-B5B74D10DA5F", "320B9163-F011-4FB1-8181-90841F9FC0FF", "63125E9C-1687-4A0F-A190-17857A8E78A2"}';
    sample_listing_7_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Whether it''s wine or lemonade, prepare to liven up any casual indoor or outdoor gathering with our all-purpose hobnail crystal glass jug. A modern approach towards the Bohemian glass tradition combined with the elegance of crystal glass, your crystal hobnail jug will make your interior shine.</p><p>Premium features such as a tapered handle give you a comfortable hold on the jug while the ice lip restrains wayward ice cubes. This crystal glass jug is lead-free and dishwasher safe.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li><p>Capacity: up to 2 litres</p></li><li><p>Handcrafted by Bohemian glass artisans</p></li><li><p>Lead-free crystal glass</p></li><li><p>Dishwasher safe</p></li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Dishwasher safe, though hand washing is recommended to preserve the hobnail detailing and shine over time.</p>"
        }
    ]';

    sample_listing_8_id INT := 8;
    sample_listing_8_short_id VARCHAR := 'Rk3Tz';
    sample_listing_8_shop_id INT := sample_shop_2_id;
    sample_listing_8_category_id VARCHAR := 'HOUSEWARES';
    sample_listing_8_title VARCHAR := 'Tall Crystal Hobnail Jug';
    sample_listing_8_subtitle VARCHAR := 'Slender hobnail crystal pitcher that holds up to 1 litre, with a textured handle and ice-restraining lip.';
    sample_listing_8_price_cents INT := 17800;
    sample_listing_8_image_uuids text[] := '{"EE90EB07-B882-45DC-8E7E-281FAC46D260", "BF8D1C75-0A33-46B7-9121-BAC238026403", "F43B3834-098E-40AF-BE42-873270E33EBC", "B65CEDC3-1931-4D3E-8A77-35FB3650A1DD", "1158E0CA-3905-4C6B-8430-727CA87161C8", "01B9B61D-BB19-4F67-8AF5-24655A9A657F", "C388D363-C3F1-494D-8D64-2415FC15A78C", "79A744D1-E929-4391-B32C-C44E16AF9FB1"}';
    sample_listing_8_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Our classic Bohemian crystal glassware truly comes into its own with this clear slender jug. The superior craftsmanship of the hobnail design allows light to play beautifully through its tapered sides, making it a truly stunning centrepiece for all those particularly special occasions.</p><p>Premium features such as a textured handle give you a comfortable hold on the jug while the ice lip restrains wayward ice cubes. This crystal glass jug is lead-free and dishwasher safe.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li><p>Capacity: up to 1 litre</p></li><li><p>Handcrafted by Bohemian glass artisans</p></li><li><p>Lead-free crystal glass</p></li><li><p>Dishwasher safe</p></li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Dishwasher safe, though hand washing is recommended to preserve the hobnail detailing and shine over time.</p>"
        }
    ]';

    sample_listing_9_id INT := 9;
    sample_listing_9_short_id VARCHAR := 'Tv5Qm';
    sample_listing_9_shop_id INT := sample_shop_2_id;
    sample_listing_9_category_id VARCHAR := 'HOUSEWARES';
    sample_listing_9_title VARCHAR := 'Crystal Hobnail Tumblers';
    sample_listing_9_subtitle VARCHAR := 'Avant-garde, minimalist hobnail crystal tumblers that hold up to 200ml each, available in standard and tall sizes.';
    sample_listing_9_price_cents INT := 4500;
    -- Composite of both sizes side by side (true-to-scale) leads the gallery,
    -- followed by the standard-size secondary images. Both size-specific
    -- hero shots (standard and tall) are option-only, living solely on their
    -- variation option's imageUuid, per imagesVary on Size only.
    sample_listing_9_image_uuids text[] := '{"42DD2634-3BEB-4725-A718-466AD7B5106E", "A3F60973-7F68-4A1E-BC2A-1CFC8B89B543", "10DE9211-36F5-4F54-8B07-3F6B44A7A498", "F8DD3CD6-A196-4ADC-BEB4-8F1CE5E93E20", "1B8B2390-B4E2-4745-A124-4336EA1DEC7E", "2118BDB8-2D64-4184-A731-76A00F52DC0F", "7C0F1D14-A3BD-441A-9EF5-0D4DDC3A9CB2", "9695586B-244F-4CB9-B555-917A30964E3F", "B73D2F91-9D25-4130-A839-B3A93BA412ED", "CB56C905-358E-4FD8-8C95-DA5211F2D096"}';
    sample_listing_9_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>Be different from the crowd and take a unique twist on a timeless classic. A modern approach to the Bohemian glass tradition, our crystal tumblers, handcrafted, have an avant-garde, yet minimalist hobnail design. This is not only bound to bring a bit of charm to your dining experience but also serves a very practical purpose, as it is comfortable and reassuring to hold.</p><p>Available in our standard size or the taller, slimmer profile for a more elongated pour.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li><p>Capacity: up to 200ml per tumbler</p></li><li><p>Handcrafted by Bohemian glass artisans</p></li><li><p>Lead-free crystal glass</p></li><li><p>Dishwasher safe</p></li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Dishwasher safe, though hand washing is recommended to preserve the hobnail detailing and shine over time.</p>"
        }
    ]';

    sample_listing_9_size_variation_id CONSTANT VARCHAR := 'c6e48559-809f-4589-a54b-94c6b34dde77';
    sample_listing_9_size_standard_id  CONSTANT VARCHAR := 'f6ab158c-2031-4a85-aa06-0277541ab632';
    sample_listing_9_size_tall_id      CONSTANT VARCHAR := '51388297-0b35-4556-9007-d554fd0bd049';
    sample_listing_9_qty_variation_id  CONSTANT VARCHAR := '043e9cb6-77f6-46a4-be50-7bec617f1572';
    sample_listing_9_qty_one_id        CONSTANT VARCHAR := 'e88d7e06-7deb-42ad-aa71-cac79c67e875';
    sample_listing_9_qty_set2_id       CONSTANT VARCHAR := 'c39e17a6-64eb-4be5-ae63-b754dfddbab6';
    sample_listing_9_qty_set4_id       CONSTANT VARCHAR := 'e8c0c427-2620-4edd-92c3-a9ff9c2e05b1';
    sample_listing_9_qty_set6_id       CONSTANT VARCHAR := 'fab33e56-62d3-4b3e-ac0f-be23ced6be85';
    sample_listing_9_standard_hero_image_uuid CONSTANT VARCHAR := '3C6CBD7A-D91C-4371-92A0-A64C73B4D517';
    sample_listing_9_tall_hero_image_uuid     CONSTANT VARCHAR := 'E79FF762-7091-482D-9D10-C68154443FF6';

    sample_listing_10_id INT := 10;
    sample_listing_10_short_id VARCHAR := 'Cn6Vz';
    sample_listing_10_shop_id INT := sample_shop_4_id;
    sample_listing_10_category_id VARCHAR := 'HOUSEWARES';
    sample_listing_10_title VARCHAR := 'Cornet Vase';
    sample_listing_10_subtitle VARCHAR := 'A vase that holds its own—designed for sweeping stems and bold florals, offering height, balance, and unmistakable character.';
    sample_listing_10_price_cents INT := 12800;
    -- Raffia (white) hero shot doubles as the listing's main image, followed
    -- by the secondary images from both color galleries; Patina's own hero
    -- shot lives only on its variation option, per imagesVary.
    sample_listing_10_image_uuids text[] := '{"2F80CB9C-0411-42A8-97E6-B4231BF56B74", "236CD809-2713-4932-8CD9-5135C31439C5", "01DCACC4-5572-4B64-9EA5-4EDC83FE582E", "D46636E8-31FA-4B51-A44A-55363F9CD594", "FB639FFD-9AF8-483B-BFCA-5FB4A871A746", "0CDB8D60-2374-4FB7-BB89-A94E7AA59EE3"}';
    sample_listing_10_full_descr JSONB := '[
        {
            "title": "Details",
            "richText": "<p>A 1920s Rookwood design, original mold no. 2880, designed by John D. Wareham. Revived in 2025 with an updated mold no. 2880-25 to mark its reintroduction, as part of the Heritage Collection, a rotating selection of Rookwood designs from the archives showcasing historic forms dating back to 1880.</p><p>Available in Raffia, a warm creamy white with a soft, gentle sheen, or Patina, a deep green with a reflective, mirror-like finish. Variation in glaze makes each piece uniquely its own.</p>"
        },
        {
            "title": "Dimensions",
            "richText": "<ul><li><p>Height: 9.25\"</p></li><li><p>Width at widest point: 5\"</p></li><li><p>Designer: John D. Wareham</p></li><li><p>Mold number: 2880-25</p></li></ul>"
        },
        {
            "title": "Care",
            "richText": "<p>Heritage ceramic. Hand wash recommended to preserve the glaze finish.</p>"
        }
    ]';

    sample_listing_10_color_variation_id CONSTANT VARCHAR := '9ca03d37-45af-4e1e-9ceb-590169370054';
    sample_listing_10_color_raffia_id    CONSTANT VARCHAR := '5161c2e5-f544-43fa-80e5-a63e6d39d979';
    sample_listing_10_color_patina_id    CONSTANT VARCHAR := 'fd06615a-5966-4819-8bc7-9bbce76264cb';
    sample_listing_10_raffia_image_uuid  CONSTANT VARCHAR := '2F80CB9C-0411-42A8-97E6-B4231BF56B74';
    sample_listing_10_patina_image_uuid  CONSTANT VARCHAR := '309DB998-A98A-41C5-A924-5EBA1AF83560';

    sample_listing_11_id INT := 11;
    sample_listing_11_short_id VARCHAR := 'Nc7Kv';
    sample_listing_11_shop_id INT := sample_shop_1_id;
    sample_listing_11_category_id VARCHAR := 'ACCESSORIES';
    sample_listing_11_title VARCHAR := 'Universal Pocket Nocturnal';
    sample_listing_11_subtitle VARCHAR := 'Tell the time at night anywhere in the world using the fixed stars, in both the Northern and Southern Hemispheres';
    sample_listing_11_price_cents INT := 9000;
    sample_listing_11_image_uuids text[] := '{"E945E386-1772-4573-A72E-3867893D9FEA", "E37E90B1-4F63-4239-AEEF-2712DBFDC3D0", "2C8A5471-C274-45A2-A3C9-00C6A6E64DC5", "EB2EA53E-BA24-4FA9-8E97-4BC1F68E6E0B", "AE5324F8-2B3E-47A9-8D42-A9EF7916D908"}';
    sample_listing_11_full_descr JSONB := '[
        {
            "title": "Basic Info",
            "richText": "<ul><li><p>Own the first Nocturnal ever that can tell the time at night at any location in EITHER the Northern Hemisphere or the Southern Hemisphere using the fixed stars visible in the night sky!</p></li><li><p>Produced in collaboration with designer Tony Sprent in Tasmania to utilise Polaris in the Northern Hemisphere and multiple celestial bodies in the Southern Hemisphere (Alpha and Beta Centauri, plus the Southern Cross)!</p></li><li><p>Measures just 60mm / 2.36 inches in diameter, fitting easily in your pocket and meeting the international sizing standard for pocket watches!</p></li><li><p>Will remain accurate for many years because the variation in the direct ascension varies very little over the course of centuries, making it a truly long-lived instrument!</p></li><li><p>Produced to our designs &amp; exacting standards in a small family workshop outside of Madrid, Spain!</p></li><li><p>Solid brass construction, with every Universal Pocket Nocturnal carefully hand-checked to ensure quality!</p></li></ul><p></p>"
        },
        {
            "title": "About the Nocturnal",
            "richText": "<p>Produced in a small workshop outside Madrid, Spain, this carefully crafted instrument measures just 60 mm (approximately 2 inches) in diameter and meets international sizing standards for pocket watches. Made of solid brass, the Kala Universal Pocket Nocturnal is a contemporary take on historical models.</p><p>The Universal Pocket Nocturnal is a star clock used to determine the time at night using fixed stars visible in both the Northern and Southern Hemispheres - Polaris in the Northern Hemisphere and Alpha &amp; Beta Centauri, plus the Southern Cross, in the Southern Hemisphere.</p><p>This charming instrument will remain operationally accurate for many years because the variation in the direct ascension varies very little over the course of centuries, making it a truly long-lived instrument and unique gift.</p>"
        },
        {
            "title": "Specifications",
            "richText": "<ul><li><p>Made of solid brass and steel with artisan black ink coating - for a reassuring weight.</p></li><li><p>Fully assembled weight: 81.8 g.</p></li><li><p>Ø 60 mm / 2.36 inches diameter.</p></li><li><p>Includes 2 language instruction manual (English and German).</p></li><li><p>Comes with an organic cork inlay and an elegant grey slider case.</p></li></ul><p></p>"
        }
    ]';

BEGIN

    -- Clear out unused profile tables tied to the sample shops. Note: shop
    -- and listing themselves are intentionally NOT deleted here (they're
    -- upserted below instead) — deleting them would cascade through
    -- ON DELETE CASCADE to user_favorite_shop/user_favorite_listing and
    -- silently wipe out real users' favorites on every reseed.
    DELETE FROM listing_processing_profile WHERE shop_id = ANY(old_sample_shop_ids);
    DELETE FROM listing_shipping_profile WHERE shop_id = ANY(old_sample_shop_ids);
    DELETE FROM listing_return_profile WHERE shop_id = ANY(old_sample_shop_ids);
    DELETE FROM listing_personalization_profile WHERE shop_id = ANY(old_sample_shop_ids);

    INSERT INTO shop (id, short_id, title, profile_rich_text, profile_image_uuid, shop_location, classification, country_code, direct_fulfillment, created_at, updated_at)
    VALUES
        (sample_shop_1_id, sample_shop_1_short_id, sample_shop_1_title, sample_shop_1_profile_rich_text, sample_shop_1_profile_image_uuid, sample_shop_1_location, sample_shop_1_classification, sample_shop_1_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_shop_2_id, sample_shop_2_short_id, sample_shop_2_title, sample_shop_2_profile_rich_text, sample_shop_2_profile_image_uuid, sample_shop_2_location, sample_shop_2_classification, sample_shop_2_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_shop_3_id, sample_shop_3_short_id, sample_shop_3_title, sample_shop_3_profile_rich_text, sample_shop_3_profile_image_uuid, sample_shop_3_location, sample_shop_3_classification, sample_shop_3_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_shop_4_id, sample_shop_4_short_id, sample_shop_4_title, sample_shop_4_profile_rich_text, sample_shop_4_profile_image_uuid, sample_shop_4_location, sample_shop_4_classification, sample_shop_4_country_code, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
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

    INSERT INTO listing (id, short_id, shop_id, category_id, title, subtitle, full_descr, price_cents, shipping_profile_id, return_profile_id, image_uuids, processing_profile_id, variations, combinations, available, personalization_profile_id, created_at, updated_at)
    VALUES
        (sample_listing_1_id, sample_listing_1_short_id, sample_listing_1_shop_id, sample_listing_1_category_id, sample_listing_1_title, sample_listing_1_subtitle, sample_listing_1_full_descr, sample_listing_1_price_cents, NULL, NULL, sample_listing_1_image_uuids, NULL, '{}', '{}', true, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_listing_2_id, sample_listing_2_short_id, sample_listing_2_shop_id, sample_listing_2_category_id, sample_listing_2_title, sample_listing_2_subtitle, sample_listing_2_full_descr, sample_listing_2_price_cents, NULL, NULL, sample_listing_2_image_uuids, NULL, '{}', '{}', true, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_listing_3_id, sample_listing_3_short_id, sample_listing_3_shop_id, sample_listing_3_category_id, sample_listing_3_title, sample_listing_3_subtitle, sample_listing_3_full_descr, sample_listing_3_price_cents, NULL, NULL, sample_listing_3_image_uuids, NULL, '{}', '{}', true, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_listing_4_id, sample_listing_4_short_id, sample_listing_4_shop_id, sample_listing_4_category_id, sample_listing_4_title, sample_listing_4_subtitle, sample_listing_4_full_descr, sample_listing_4_price_cents, NULL, NULL, sample_listing_4_image_uuids, NULL, '{}', '{}', true, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_listing_5_id, sample_listing_5_short_id, sample_listing_5_shop_id, sample_listing_5_category_id, sample_listing_5_title, sample_listing_5_subtitle, sample_listing_5_full_descr, sample_listing_5_price_cents, NULL, NULL, sample_listing_5_image_uuids, NULL, '{}', '{}', true, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_listing_6_id, sample_listing_6_short_id, sample_listing_6_shop_id, sample_listing_6_category_id, sample_listing_6_title, sample_listing_6_subtitle, sample_listing_6_full_descr, sample_listing_6_price_cents, NULL, NULL, sample_listing_6_image_uuids, NULL,
            jsonb_build_object(
                sample_listing_6_color_variation_id, jsonb_build_object(
                    'name', 'Color',
                    'pricesVary', false,
                    'imagesVary', true,
                    'order', 0,
                    'options', jsonb_build_object(
                        sample_listing_6_color_raffia_id, jsonb_build_object('name', 'Raffia', 'order', 0, 'priceCents', null, 'imageUuid', sample_listing_6_raffia_image_uuid),
                        sample_listing_6_color_patina_id, jsonb_build_object('name', 'Patina', 'order', 1, 'priceCents', null, 'imageUuid', sample_listing_6_patina_image_uuid)
                    )
                )
            ),
            jsonb_build_object(
                sample_listing_6_color_variation_id || ':' || sample_listing_6_color_raffia_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false),
                sample_listing_6_color_variation_id || ':' || sample_listing_6_color_patina_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false)
            ), true, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_listing_7_id, sample_listing_7_short_id, sample_listing_7_shop_id, sample_listing_7_category_id, sample_listing_7_title, sample_listing_7_subtitle, sample_listing_7_full_descr, sample_listing_7_price_cents, NULL, NULL, sample_listing_7_image_uuids, NULL, '{}', '{}', true, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_listing_8_id, sample_listing_8_short_id, sample_listing_8_shop_id, sample_listing_8_category_id, sample_listing_8_title, sample_listing_8_subtitle, sample_listing_8_full_descr, sample_listing_8_price_cents, NULL, NULL, sample_listing_8_image_uuids, NULL, '{}', '{}', true, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_listing_9_id, sample_listing_9_short_id, sample_listing_9_shop_id, sample_listing_9_category_id, sample_listing_9_title, sample_listing_9_subtitle, sample_listing_9_full_descr, sample_listing_9_price_cents, NULL, NULL, sample_listing_9_image_uuids, NULL,
            jsonb_build_object(
                sample_listing_9_size_variation_id, jsonb_build_object(
                    'name', 'Size',
                    'pricesVary', true,
                    'imagesVary', true,
                    'order', 0,
                    'options', jsonb_build_object(
                        sample_listing_9_size_standard_id, jsonb_build_object('name', 'Standard', 'order', 0, 'priceCents', null, 'imageUuid', sample_listing_9_standard_hero_image_uuid),
                        sample_listing_9_size_tall_id, jsonb_build_object('name', 'Tall', 'order', 1, 'priceCents', null, 'imageUuid', sample_listing_9_tall_hero_image_uuid)
                    )
                ),
                sample_listing_9_qty_variation_id, jsonb_build_object(
                    'name', 'Quantity',
                    'pricesVary', true,
                    'imagesVary', false,
                    'order', 1,
                    'options', jsonb_build_object(
                        sample_listing_9_qty_one_id,  jsonb_build_object('name', 'Single',      'order', 0, 'priceCents', null, 'imageUuid', null),
                        sample_listing_9_qty_set2_id, jsonb_build_object('name', 'Set of 2',    'order', 1, 'priceCents', null, 'imageUuid', null),
                        sample_listing_9_qty_set4_id, jsonb_build_object('name', 'Set of 4',    'order', 2, 'priceCents', null, 'imageUuid', null),
                        sample_listing_9_qty_set6_id, jsonb_build_object('name', 'Set of 6',    'order', 3, 'priceCents', null, 'imageUuid', null)
                    )
                )
            ),
            jsonb_build_object(
                sample_listing_9_qty_variation_id || ':' || sample_listing_9_qty_one_id  || '|' || sample_listing_9_size_variation_id || ':' || sample_listing_9_size_standard_id, jsonb_build_object('priceCents', 4500,  'imageUuid', null, 'disabled', false),
                sample_listing_9_qty_variation_id || ':' || sample_listing_9_qty_one_id  || '|' || sample_listing_9_size_variation_id || ':' || sample_listing_9_size_tall_id,     jsonb_build_object('priceCents', 5800,  'imageUuid', null, 'disabled', false),
                sample_listing_9_qty_variation_id || ':' || sample_listing_9_qty_set2_id || '|' || sample_listing_9_size_variation_id || ':' || sample_listing_9_size_standard_id, jsonb_build_object('priceCents', 7800,  'imageUuid', null, 'disabled', false),
                sample_listing_9_qty_variation_id || ':' || sample_listing_9_qty_set2_id || '|' || sample_listing_9_size_variation_id || ':' || sample_listing_9_size_tall_id,     jsonb_build_object('priceCents', 10500, 'imageUuid', null, 'disabled', false),
                sample_listing_9_qty_variation_id || ':' || sample_listing_9_qty_set4_id || '|' || sample_listing_9_size_variation_id || ':' || sample_listing_9_size_standard_id, jsonb_build_object('priceCents', 14800, 'imageUuid', null, 'disabled', false),
                sample_listing_9_qty_variation_id || ':' || sample_listing_9_qty_set4_id || '|' || sample_listing_9_size_variation_id || ':' || sample_listing_9_size_tall_id,     jsonb_build_object('priceCents', 17800, 'imageUuid', null, 'disabled', false),
                sample_listing_9_qty_variation_id || ':' || sample_listing_9_qty_set6_id || '|' || sample_listing_9_size_variation_id || ':' || sample_listing_9_size_standard_id, jsonb_build_object('priceCents', 18800, 'imageUuid', null, 'disabled', false),
                sample_listing_9_qty_variation_id || ':' || sample_listing_9_qty_set6_id || '|' || sample_listing_9_size_variation_id || ':' || sample_listing_9_size_tall_id,     jsonb_build_object('priceCents', 22800, 'imageUuid', null, 'disabled', false)
            ), true, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_listing_10_id, sample_listing_10_short_id, sample_listing_10_shop_id, sample_listing_10_category_id, sample_listing_10_title, sample_listing_10_subtitle, sample_listing_10_full_descr, sample_listing_10_price_cents, NULL, NULL, sample_listing_10_image_uuids, NULL,
            jsonb_build_object(
                sample_listing_10_color_variation_id, jsonb_build_object(
                    'name', 'Color',
                    'pricesVary', false,
                    'imagesVary', true,
                    'order', 0,
                    'options', jsonb_build_object(
                        sample_listing_10_color_raffia_id, jsonb_build_object('name', 'Raffia', 'order', 0, 'priceCents', null, 'imageUuid', sample_listing_10_raffia_image_uuid),
                        sample_listing_10_color_patina_id, jsonb_build_object('name', 'Patina', 'order', 1, 'priceCents', null, 'imageUuid', sample_listing_10_patina_image_uuid)
                    )
                )
            ),
            jsonb_build_object(
                sample_listing_10_color_variation_id || ':' || sample_listing_10_color_raffia_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false),
                sample_listing_10_color_variation_id || ':' || sample_listing_10_color_patina_id, jsonb_build_object('priceCents', null, 'imageUuid', null, 'disabled', false)
            ), true, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        (sample_listing_11_id, sample_listing_11_short_id, sample_listing_11_shop_id, sample_listing_11_category_id, sample_listing_11_title, sample_listing_11_subtitle, sample_listing_11_full_descr, sample_listing_11_price_cents, NULL, NULL, sample_listing_11_image_uuids, NULL, '{}', '{}', true, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
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
        (sample_shop_3_id), -- Santa Barbara Forge
        (sample_shop_2_id), -- Klimchi
        (sample_shop_4_id), -- Rookwood
        (sample_shop_1_id); -- H.M. Kala

    INSERT INTO featured_listing (listing_id)
    VALUES
        (sample_listing_1_id), -- Pocket Sundial
        (sample_listing_2_id), -- Sonora Small Pan
        (sample_listing_4_id), -- Sonora Roaster
        (sample_listing_7_id), -- Crystal Hobnail Jug
        (sample_listing_9_id), -- Crystal Hobnail Tumblers
        (sample_listing_6_id), -- Boule Vase
        (sample_listing_5_id); -- Rook Dish

COMMIT;

END $$;
