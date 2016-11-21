-- Database name
sigma
-- Document your create tables SQL here
CREATE TABLE treats(
id serial PRIMARY KEY,
name VARCHAR(30) NOT NULL,
description VARCHAR(200) NOT NULL,
pic VARCHAR(30)
);

SELECT *
FROM treats;

INSERT INTO treats (name, description, pic)
VALUES ('Cupcake', 'A delicious cupcake', '/assets/cupcake.jpg'),
('Donuts', 'Mmmm donuts', '/assets/donuts.jpg');
