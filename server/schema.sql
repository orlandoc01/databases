CREATE DATABASE chat;

USE chat;
/* Create other tables and define schemas for them here! */

CREATE TABLE rooms (
  id INT PRIMARY KEY,
  roomname TEXT
);

CREATE TABLE users(
  id INT PRIMARY KEY,
  username TEXT
);

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT PRIMARY KEY,
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

