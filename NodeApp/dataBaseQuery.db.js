// create database gsd;

// Use gsd;

// CREATE TABLE user (id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(255),
//  last_name VARCHAR(255), email VARCHAR(255), password VARCHAR(255),
//  role  VARCHAR(255),
//  is_verified BOOLEAN,token VARCHAR(255),createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP)

// Select * from user;

// CREATE TABLE Conversation (id INT AUTO_INCREMENT PRIMARY KEY, buyerId int(10),
//  sellerId int(10),createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP);

// CREATE TABLE Chat (id INT AUTO_INCREMENT PRIMARY KEY, senderId int(10),
//  conversationId int(10),text VARCHAR(255),name VARCHAR(255),time DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP);

//CREATE TABLE`tbl_reviews`(
//    `review_id` int(10) NOT NULL,
//    `media_id` int(10) NOT NULL,
//    `ratings` int(10) NOT NULL,
//    `comment` text NOT NULL,
//    `posted_by` int(11) NOT NULL,
//    `posted_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
//) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;



//SELECT tr.*, CONCAT(u.first_name, " ", u.last_name) AS posted_by FROM`tbl_reviews` tr
//JOIN user u
//on tr.posted_by = u.id;
