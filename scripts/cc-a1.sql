CREATE DATABASE IF NOT EXISTS `Cloud-Computing`;
USE `Cloud-Computing`;

DROP TABLE orders;
DROP TABLE items;
DROP TABLE users;

CREATE TABLE IF NOT EXISTS users (
	userid int NOT NULL AUTO_INCREMENT,
	firstname VARCHAR(255),
    lastname VARCHAR(255),
    phonenumber VARCHAR(255),
    email VARCHAR(255),
    address VARCHAR(255),
    suburb VARCHAR(255),
    postcode VARCHAR(255),
    credits int,
    usertype VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY (userid)
);

CREATE TABLE IF NOT EXISTS items (
	itemid int NOT NULL AUTO_INCREMENT,
    itemname VARCHAR(255),
    price int,
    itemdescription VARCHAR(255),
	sellerid int,
    issold bool,
    PRIMARY KEY(itemid),
    FOREIGN KEY (sellerid) REFERENCES users(userid)
);

CREATE TABLE IF NOT EXISTS orders (
	orderid int NOT NULL AUTO_INCREMENT,
    total int,
    orderdate VARCHAR(255),
    orderstatus VARCHAR(255),
    buyerid int,
    itemid int,
    PRIMARY KEY(orderid),
    FOREIGN KEY (itemid) references items(itemid),
	FOREIGN KEY (buyerid) REFERENCES users(userid)
);


INSERT INTO users (firstname, lastname, address, suburb, postcode, email, phonenumber, credits, usertype, password)
VALUES 
	("Paula", "Kurniawan", "3 The Esplanade Taylors Hill VIC 3037", "Taylors Hill", "3037", "seller1@gmail.com" ,"0449998488", 20, "seller", "abc123"),
    ("Penny", "Stalevski", "10 Sausage Way Caroline Springs VIC 3023", "Caroline Springs", "3023", "seller2@gmail.com" ,"0449998488", 20, "seller", "abc123"),
	("Ash", "Black", "3 Bone Crescent Hillside VIC 3037", "Hillside", "3037", "buyer1@gmail.com" ,"0415984808", 100, "buyer", "abc123"),
	("Joe", "Smith", "5 The Esplanade Burnside VIC 3023","Burnside","3023", "buyer2@gmail.com" ,"0449898489", 100, "buyer", "abc123");



INSERT INTO items (itemname, price, itemdescription, sellerid, issold)
VALUES 
	("Harry potter mug", 10, "A mug that has Hogwarts on it", 1, true),
	("Avatar mug", 5 , "A mug that has Aang on it", 1, true),
    ("Pikachu plushie", 20, "Your best pikachu companion", 1, true),
    ("Eevie plushie", 15, "Squirtle your drink", 1, false),
    ("Demon slayer mug", 10, "A mug that has Tanjiro on it", 2, false),
	("Naruto mug", 5 , "A mug that has Naruto on it", 2, false),
    ("Pearl earrings", 20, "Authentic pearls from QLD", 2, false);

    
INSERT INTO orders (total, orderdate, orderstatus, buyerid, itemid)
VALUES 
	(12, "13/04/22", "Pending", 2, 1),
	(6.8, "13/04/22", "Pending", 3, 2),
    (20.50, "13/04/22", "Pending", 2, 3);
    
    
    
