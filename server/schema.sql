CREATE DATABASE chat;

USE chat;
/* Create other tables and define schemas for them here! */

CREATE TABLE rooms (
  id INT PRIMARY KEY AUTO_INCREMENT,
  roomname CHAR(50) UNIQUE KEY
);

CREATE TABLE users(
  id INT PRIMARY KEY AUTO_INCREMENT,
  username CHAR(30) UNIQUE KEY
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT PRIMARY KEY AUTO_INCREMENT,
  text TEXT,
  createdAt DATETIME,
  room_ID INT,
  FOREIGN KEY(room_ID) references rooms(id),
  user_ID INT,
  FOREIGN KEY(user_ID) references users(id)
);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

