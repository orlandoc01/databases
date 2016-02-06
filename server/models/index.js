var db = require('../db');

var messageId = 0;
var userId = 0;
var roomId = 0;

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (messageObj) {
      var now = 0;
      db.connect();
      db.query('INSERT INTO messages VALUES (' + (messageId++) + ',' + 
              messageObj.text + ',' + now + ',' + (roomId++) + ',' + 
              (userId++) +');');

      db.query('INSERT INTO rooms VALUES (' + roomId + ',' + 
              messageObj.roomname + ');');

      db.query('INSERT INTO users VALUES (' + userId + ',' + 
              messageObj.username + ');');

      db.end();
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

