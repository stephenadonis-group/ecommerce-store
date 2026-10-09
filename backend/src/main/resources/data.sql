-- Categories seed data
INSERT INTO categories (name, slug) VALUES
('Smartphones', 'smartphones'),
('Laptops', 'laptops'),
('Tablets', 'tablets'),
('Fragrances', 'fragrances'),
('Beauty', 'beauty'),
('Furniture', 'furniture'),
('Mens Shirts', 'mens-shirts'),
('Sunglasses', 'sunglasses')
ON DUPLICATE KEY UPDATE name = VALUES(name);
