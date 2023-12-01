-- restaurant
-- les prix sont basés sur les menus complets
INSERT INTO restaurant VALUES(1, 'Kodawari Ramen', '10€ - 20€', 'https://www.kodawari-ramen.com/');
INSERT INTO restaurant VALUES(2, 'Higuma', '10€ - 20€', 'http://higuma.fr/');
INSERT INTO restaurant VALUES(3, 'Tomo', '5€ - 10€', 'https://patisserietomo.fr/');
INSERT INTO restaurant VALUES(4, 'Aki', '10€ - 20€', 'https://akiparis.fr/');
INSERT INTO restaurant VALUES(5, 'Kanadé', '50€ - 70€', 'https://restaurant-kanade-paris.jimdofree.com/');
INSERT INTO restaurant VALUES(6, 'Juji-ya', '10€ - 20€', 'https://jujiya-bento.com/');
INSERT INTO restaurant VALUES(7, 'Tonkatsu Tombo', '20€ - 30€', 'https://www.facebook.com/pages/Tonkatsu-Tombo/269647273138831');
INSERT INTO restaurant VALUES(8, 'OMURICE Étoile', '10€ - 20€', 'https://www.instagram.com/omurice.paris/?hl=fr');
INSERT INTO restaurant VALUES(9, 'Happatei', '10€ - 20€', 'https://kintarogroup.com/happatei/');
INSERT INTO restaurant VALUES(10, 'OKOMUSU', '10€ - 20€', 'https://www.okomusu.fr/');
INSERT INTO restaurant VALUES(11, 'Bobo snack', '5€ - 10€', 'https://www.bobosnack.com/');
INSERT INTO restaurant VALUES(12, 'Abri soba', '20€ - 30€', 'https://lefooding.com/restaurants/restaurant-abri-soba-paris-3');

-- establishment
INSERT INTO establishment VALUES(011, 1, 'Kodawari Ramen Yokochō', 'Spécialisé dans la préparation de ramen à base de viande. Décor en ruelle étroite abritant des izakaya', 'Specializing in meat ramen. Narrow alley decor housing izakaya',11.45, 23.0);
INSERT INTO establishment VALUES(012, 1, 'Kodawari Ramen Tsukiji', 'Spécialisé dans la préparation de ramen à base de poisson. Le décor reprend celui du marché historique aux poissons Tsukiji de Tokyo','Specializing in fish ramen. The decor is reminiscent of Tokyo''s historic Tsukiji fish market.', 11.45, 23.0);
INSERT INTO establishment VALUES(021, 2, 'Higuma', 'Restaurant japonais de style décontracté servant ramens, plats sautés et donburis', 'Casual Japanese restaurant serving ramen, stir-fry and donburi',11.30, 22.0);
INSERT INTO establishment VALUES(031, 3, 'Tomo Odéon', 'Salon de thé japonais proposant thé vert, plats de nouilles et dorayakis', 'Japanese tea room offering green tea, noodle dishes and dorayaki',12.0, 19.0);
INSERT INTO establishment VALUES(032, 3, 'Tomo Opéra', 'Salon de thé japonais proposant thé vert, plats de nouilles et dorayakis','Japanese tea room offering green tea, noodle dishes and dorayaki', 12.0, 19.0);
INSERT INTO establishment VALUES(041, 4, 'Aki Boulangerie', 'Boulangerie proposant des desserts japonais classiques, y compris melon pains et cookies au thé matcha.','Bakery serving classic Japanese desserts, including melon bread and matcha tea cookies.', 7.30, 20.30);
INSERT INTO establishment VALUES(042, 4, 'Mochi Mochi Aki', 'Petite boulangerie proposant des desserts japonais, à emporter.', 'Small bakery offering Japanese desserts to take away.', 11.00, 18.30);
INSERT INTO establishment VALUES(043, 4, 'Aki Restaurant', 'Okonomiyaki, nouilles soba et autres spécialités d''Osaka servis dans un restaurant à l''ambiance détendue doté d''une cuisine ouverte.', 'Okonomiyaki, soba noodles and other Osaka specialties served in a relaxed restaurant with an open kitchen.',7.30, 20.30);
INSERT INTO establishment VALUES(051, 5, 'Kanadé', 'Spécialités japonaises, dont les donburi, les sushis et les bentos, servis dans une salle contemporaine.','Japanese specialties, including donburi, sushi and bentos, served in a contemporary dining room.', 12.00, 22.00);
INSERT INTO establishment VALUES(061, 6, 'Juji-ya Bento', 'Petit restaurant sur 2 niveaux avec tables basiques, proposant bentos personnalisables et articles d''épicerie japonais.', 'Small 2-level restaurant with basic tables, offering customizable bentos and Japanese grocery items.',11.30, 21.00);
INSERT INTO establishment VALUES(071, 7, 'Tonkatsu Tombo', 'Restaurant simple proposant un choix de menus japonais fixes, avec des côtelettes de porc frites et leur accompagnement.', 'Simple restaurant offering a choice of set Japanese menus, with fried pork chops and side dishes.',12.00, 22.00);
INSERT INTO establishment VALUES(081, 8, 'OMURICE Étoile', 'Un riz sauté sauté à la tomate caché dans une omelette moelleuse décoré avec un joli dessin au ketchup.', 'Sautéed rice with tomato hidden in a fluffy omelette decorated with a pretty ketchup design.',12.00, 21.00);
INSERT INTO establishment VALUES(091, 9, 'Happatei', 'Restaurant coloré servant des pancakes, des nouilles et des gaufres japonais dans une ambiance détendue.', 'Colorful restaurant serving Japanese pancakes, noodles and waffles in a relaxed atmosphere.', 11.30, 22.30);
INSERT INTO establishment VALUES(101, 10, 'OKOMUSU', 'Des spécialités d''okonomiyaki (galettes japonaises garnies) servies dans un cadre moderne aux murs de pierres.', 'Specialties of okonomiyaki (filled Japanese pancakes) served in a modern stone-walled setting.', 12.00, 21.00);
INSERT INTO establishment VALUES(111, 11, 'Bobo snack', 'Ramen, Doburi, Tempura, Karaage...', 'Ramen, doburi, tempura, karaage...', 12.00, 21.00);
INSERT INTO establishment VALUES(121, 12, 'Abri soba', 'Restaurant de nouilles au sarrasin (soba)', 'Buckwheat noodle (soba) restaurant', 12.00, 22.30);

-- type_food
INSERT INTO type_food VALUES(1,'Ramens', 'Plat');
INSERT INTO type_food VALUES(2,'Gyozas', 'Plat');
INSERT INTO type_food VALUES(3,'Kimchi', 'Plat');
INSERT INTO type_food VALUES(4,'Bière', 'Alcool');
INSERT INTO type_food VALUES(5,'Umeshu', 'Alcool');
INSERT INTO type_food VALUES(6,'Sake', 'Alcool');
INSERT INTO type_food VALUES(7,'Thé', 'Soft');
INSERT INTO type_food VALUES(8,'Ramune', 'Soft');
INSERT INTO type_food VALUES(9,'Sautés au wok', 'Plat');
INSERT INTO type_food VALUES(10,'Donburi', 'Plat');
INSERT INTO type_food VALUES(11,'Végétarien', 'Plat');
INSERT INTO type_food VALUES(12,'Curry', 'Plat');
INSERT INTO type_food VALUES(13,'Dorayaki', 'Dessert');
INSERT INTO type_food VALUES(14,'Wagashi', 'Dessert');
INSERT INTO type_food VALUES(15,'Daifuku', 'Dessert');
INSERT INTO type_food VALUES(16,'Matcha', 'Soft');
INSERT INTO type_food VALUES(17,'Végétarien', 'Dessert');
INSERT INTO type_food VALUES(18,'Sushis', 'Plat');
INSERT INTO type_food VALUES(19,'Bento', 'Plat');
INSERT INTO type_food VALUES(20,'Okonomiyaki', 'Plat');
INSERT INTO type_food VALUES(21,'Tonkatsu', 'Plat');
INSERT INTO type_food VALUES(22,'Udon', 'Plat');
INSERT INTO type_food VALUES(23,'Karaage', 'Plat');
INSERT INTO type_food VALUES(24,'Melon pan', 'Dessert');
INSERT INTO type_food VALUES(25,'Soba', 'Plat');
INSERT INTO type_food VALUES(26,'Omurice', 'Plat');

-- food_to_restaurant
INSERT INTO food_to_restaurant VALUES(1,1);
INSERT INTO food_to_restaurant VALUES(1,2);
INSERT INTO food_to_restaurant VALUES(1,11);

INSERT INTO food_to_restaurant VALUES(2,1);
INSERT INTO food_to_restaurant VALUES(2,2);

INSERT INTO food_to_restaurant VALUES(3,1);
INSERT INTO food_to_restaurant VALUES(3,4);

INSERT INTO food_to_restaurant VALUES(4,1);
INSERT INTO food_to_restaurant VALUES(4,2);
INSERT INTO food_to_restaurant VALUES(4,7);
INSERT INTO food_to_restaurant VALUES(4,10);
INSERT INTO food_to_restaurant VALUES(4,11);
INSERT INTO food_to_restaurant VALUES(4,12);

INSERT INTO food_to_restaurant VALUES(5,1);
INSERT INTO food_to_restaurant VALUES(5,5);
INSERT INTO food_to_restaurant VALUES(5,7);
INSERT INTO food_to_restaurant VALUES(5,10);
INSERT INTO food_to_restaurant VALUES(5,11);

INSERT INTO food_to_restaurant VALUES(6,1);
INSERT INTO food_to_restaurant VALUES(6,2);
INSERT INTO food_to_restaurant VALUES(6,5);
INSERT INTO food_to_restaurant VALUES(6,6);
INSERT INTO food_to_restaurant VALUES(6,7);
INSERT INTO food_to_restaurant VALUES(6,10);
INSERT INTO food_to_restaurant VALUES(6,11);
INSERT INTO food_to_restaurant VALUES(6,12);

INSERT INTO food_to_restaurant VALUES(7,1);
INSERT INTO food_to_restaurant VALUES(7,2);
INSERT INTO food_to_restaurant VALUES(7,3);
INSERT INTO food_to_restaurant VALUES(7,4);

INSERT INTO food_to_restaurant VALUES(8,1);
INSERT INTO food_to_restaurant VALUES(8,5);

INSERT INTO food_to_restaurant VALUES(9,2);
INSERT INTO food_to_restaurant VALUES(9,4);
INSERT INTO food_to_restaurant VALUES(9,9);
INSERT INTO food_to_restaurant VALUES(9,10);
INSERT INTO food_to_restaurant VALUES(9,11);

INSERT INTO food_to_restaurant VALUES(10,2);
INSERT INTO food_to_restaurant VALUES(10,4);
INSERT INTO food_to_restaurant VALUES(10,5);
INSERT INTO food_to_restaurant VALUES(10,11);

INSERT INTO food_to_restaurant VALUES(11,1);
INSERT INTO food_to_restaurant VALUES(11,2);
INSERT INTO food_to_restaurant VALUES(11,4);
INSERT INTO food_to_restaurant VALUES(11,6);
INSERT INTO food_to_restaurant VALUES(11,11);
INSERT INTO food_to_restaurant VALUES(11,12);

INSERT INTO food_to_restaurant VALUES(12,2);
INSERT INTO food_to_restaurant VALUES(12,4);
INSERT INTO food_to_restaurant VALUES(12,7);

INSERT INTO food_to_restaurant VALUES(13,3);
INSERT INTO food_to_restaurant VALUES(13,4);
INSERT INTO food_to_restaurant VALUES(13,11);

INSERT INTO food_to_restaurant VALUES(14,3);

INSERT INTO food_to_restaurant VALUES(15,3);
INSERT INTO food_to_restaurant VALUES(15,4);

INSERT INTO food_to_restaurant VALUES(16,3);
INSERT INTO food_to_restaurant VALUES(16,4);

INSERT INTO food_to_restaurant VALUES(17,3);
INSERT INTO food_to_restaurant VALUES(17,4);
INSERT INTO food_to_restaurant VALUES(17,5);

INSERT INTO food_to_restaurant VALUES(18,5);

INSERT INTO food_to_restaurant VALUES(19,6);
INSERT INTO food_to_restaurant VALUES(19,4);
INSERT INTO food_to_restaurant VALUES(19,5);

INSERT INTO food_to_restaurant VALUES(20,9);
INSERT INTO food_to_restaurant VALUES(20,10);

INSERT INTO food_to_restaurant VALUES(21,7);

INSERT INTO food_to_restaurant VALUES(22,5);
INSERT INTO food_to_restaurant VALUES(22,11);

INSERT INTO food_to_restaurant VALUES(23,4);
INSERT INTO food_to_restaurant VALUES(23,11);
INSERT INTO food_to_restaurant VALUES(23,12);

INSERT INTO food_to_restaurant VALUES(24,4);

INSERT INTO food_to_restaurant VALUES(25,4);
INSERT INTO food_to_restaurant VALUES(25,5);
INSERT INTO food_to_restaurant VALUES(25,12);

INSERT INTO food_to_restaurant VALUES(26,8);

-- empty users and corresponding playlists without activity. notes arent given by default
-- users
-- note
-- foodlist_user
-- foodlist