-- Categories
INSERT IGNORE INTO `category`(name) VALUES('Espresso Drinks');
INSERT IGNORE INTO `category`(name) VALUES('Brewed Coffee');
INSERT IGNORE INTO `category`(name) VALUES('Tea');
INSERT IGNORE INTO `category`(name) VALUES('Extras');

-- Products
INSERT IGNORE INTO `product`(name, price, stock, categoryId)
SELECT 'Latte', 9, 10, id FROM category WHERE name = 'Espresso Drinks';
INSERT IGNORE INTO `product`(name, price, stock, categoryId)
SELECT 'Macchiato', 10, 10, id FROM category WHERE name = 'Espresso Drinks';
INSERT IGNORE INTO `product`(name, price, stock, categoryId)
SELECT 'Cappuccino', 5, 10, id FROM category WHERE name = 'Espresso Drinks';
INSERT IGNORE INTO `product`(name, price, stock, categoryId)
SELECT 'Americano', 4, 10, id FROM category WHERE name = 'Espresso Drinks';
INSERT IGNORE INTO `product`(name, price, stock, categoryId)
SELECT 'Espresso', 2, 10, id FROM category WHERE name = 'Espresso Drinks';

INSERT IGNORE INTO `product`(name, price, stock, categoryId)
SELECT 'Filter coffee', 8.5, 10, id FROM category WHERE name = 'Brewed Coffee';
INSERT IGNORE INTO `product`(name, price, stock, categoryId)
SELECT 'Caffe Misto', 4.3, 10, id FROM category WHERE name = 'Brewed Coffee';

INSERT IGNORE INTO `product`(name, price, stock, categoryId)
SELECT 'Mint', 3, 10, id FROM category WHERE name = 'Tea';
INSERT IGNORE INTO `product`(name, price, stock, categoryId)
SELECT 'Chamomile', 3, 10, id FROM category WHERE name = 'Tea';
INSERT IGNORE INTO `product`(name, price, stock, categoryId)
SELECT 'Earl Grey', 3, 10, id FROM category WHERE name = 'Tea';

INSERT IGNORE INTO `product`(name, price, stock, categoryId)
SELECT 'Cinnamon', 0.5, 10, id FROM category WHERE name = 'Extras';
INSERT IGNORE INTO `product`(name, price, stock, categoryId)
SELECT 'Yellow sugar', 0.5, 10, id FROM category WHERE name = 'Extras';
INSERT IGNORE INTO `product`(name, price, stock, categoryId)
SELECT 'Syrup', 0.8, 10, id FROM category WHERE name = 'Extras';
INSERT IGNORE INTO `product`(name, price, stock, categoryId)
SELECT 'Whipped Cream', 1, 10, id FROM category WHERE name = 'Extras';