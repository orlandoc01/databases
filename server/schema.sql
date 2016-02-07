CREATE DATABASE chat;

USE chat;
/* Create other tables and define schemas for them here! */

CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (ID),
  roomname CHAR(50) UNIQUE KEY
);

CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (ID),
  username CHAR(30) UNIQUE KEY
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (ID),
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

