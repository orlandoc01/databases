var db = require('../db');
var Promise = require('bluebird');
var mysql = require('mysql');

Promise.promisifyAll(mysql);


db.connect();
module.exports = {
  messages: {
    get: function (callback) {
      db.connect();

      var allMessagesCommand = 'SELECT messages.id, messages.text, messages.createdAt, rooms.roomname, users.username' +
      ' FROM messages INNER JOIN rooms ON messages.room_id = rooms.id' +
      ' INNER JOIN users ON messages.user_id = users.id;';

      db.query(allMessagesCommand, function(err, rows) {
        if(err) {
          throw err;
        }
        callback(rows);
      });

      db.end();

    }, 
    post: function (messageObj) {
      var now = 0;
      //db.connect();
      var messagesPost = {text: messageObj.text, createdAt: now,
                        'room_ID': 0, 'user_ID': 0};
      var roomsPost = {roomname: messageObj.roomname};

      var usersPost = {username: messageObj.username};

      console.log('starting db query');
      db.query('INSERT INTO rooms SET ?', roomsPost, function(err, roomResult) {
          
          //Show Arguments
        var args = Array.prototype.slice.call(arguments);
        args.forEach( function(val, index) {
          console.log("at index " + index + " is " + JSON.stringify(val));
        });

          //console error
        if(err && err.errno === 1062) {
          console.log('error ' + err.errno);
        }

        //start new query
        console.log('Room result ID is ' + roomResult.insertId);
        console.log('users post is ' + JSON.stringify(usersPost));
        db.query('INSERT INTO users SET ?', usersPost, function(err, userResult) {
          //show all arguments
          var args = Array.prototype.slice.call(arguments);
          args.forEach( function(val, index) {
            console.log("at index " + index + " is " + JSON.stringify(val));
          });

          //console error
          if(err && err.errno === 1062) {
            console.log('error ' + err.errno);
          }
          console.log('User result ID is ' + userResult.insertId);

          //construct new query
          messagesPost['room_ID'] = roomResult.insertId;
          messagesPost['user_ID'] = userResult.insertId;
          db.query('INSERT INTO messages SET ?', messagesPost, function(err) {
            if(err) {
              console.log('error inserting into messages');
            }
            //complete
            console.log('COmpleted storage');
            console.log();
            console.log();
            //db.end();


          });
        });

      });
  
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (userObj) {
      db.connect();

      var user = {id: userId, username:userObj.username};

      db.query('INSERT INTO users SET ?', user, function(err) {
        if(err) {
          console.log('Error setting user');
        }
      });

      db.end();
    }
  }
};

