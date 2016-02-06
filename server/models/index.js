var db = require('../db');

var messageId = 0;
var userId = 0;
var roomId = 0;

module.exports = {
  messages: {
    get: function () {
      db.connect();

      var allMessagesCommand = 'SELECT messages.text, users.userName, rooms.roomname FROM messages INNER JOIN users ON messages.user_ID = users.id INNER JOIN rooms ON messages.room_ID = rooms.id';

      db.query(allMessagesCommand, function(err, rows, fields) {
        if(err) {
          throw err;
        }
        console.log('One row is ' + JSON.stringify(rows[0]));
        console.log('field is ' + JSON.stringify(fields[0]));
      });

      db.end();

    }, // a function which produces all the messages
    post: function (messageObj) {
      var now = 0;
      db.connect();
      var messagesPost = {id: roomId, text: messageObj.text, createdAt: now,
                        'room_ID': roomId, 'user_ID': userId};
      var roomsPost = {id: roomId, roomName: messageObj.roomname};

      var usersPost = {id: userId, userName: messageObj.username};


      db.query('INSERT INTO rooms SET ?', roomsPost, function(err) {
        if(err) {
          console.log('error inserting into rooms');
        }
      });
      db.query('INSERT INTO users SET ?', usersPost, function(err) {
        if(err) {
          console.log('error inserting into users');
        }
      });
      db.query('INSERT INTO messages SET ?', messagesPost, function(err) {
        if(err) {
          console.log('error inserting into messages');
        }
      });

      db.end();

      userId++;
      roomId++;
      messageId++;
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

