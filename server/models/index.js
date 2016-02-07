var db = require('../db');
var Promise = require('bluebird');
var mysql = require('mysql');

//Promise.promisifyAll(mysql);
Promise.promisifyAll(db);


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
      var dummy = function(err) {console.log('something weird happened' + err);};

      var now = 0;
      //db.connect();
      var messagesPost = {text: messageObj.text, createdAt: now,
                        'room_ID': 0, 'user_ID': 0};
      var roomsPost = {roomname: messageObj.roomname};
      var usersPost = {username: messageObj.username};

      //First promise, does first query
      db.queryAsync('INSERT INTO rooms SET ?', roomsPost)

      //Second, grabs from first, then does second query
        .then(function(roomResult){
          messagesPost['room_ID'] = roomResult.insertId;
          return db.queryAync('INSERT INTO users SET ?', usersPost);
        }, function(err) {
          return db.queryAsync('SELECT rooms.id FROM rooms WHERE rooms.roomname = "' + 
            roomsPost.roomname + '";')
          .then(function(rows){
            console.log("OMG WERE IN PROMISES AND ID IS " + rows[0].id);
            messagesPost['room_ID'] = rows[0].id;
            console.log();
            return db.queryAsync('INSERT INTO users SET ?', usersPost);
          });
        })

        //Grabs from second query, then does third query
         .then(function(userResult){
           messagesPost['user_ID'] = userResult.insertId;
           return db.queryAsync('INSERT INTO messages SET ?', messagesPost);
         }, function(err) {
           return db.queryAsync('SELECT users.id FROM users WHERE users.username = "' + 
            usersPost.username + '";')
          .then(function(rows){
            console.log("OMG WERE IN PROMISES AND ID IS " + rows[0].id);
            messagesPost['user_ID'] = rows[0].id;
            console.log();
            return db.queryAsync('INSERT INTO messages SET ?', messagesPost);
          });
         });


      // db.query('INSERT INTO rooms SET ?', roomsPost, function(err, roomResult) {
      //   db.query('INSERT INTO users SET ?', usersPost, function(err, userResult) {
      //     //construct new query
      //     messagesPost['room_ID'] = roomResult.insertId;
      //     messagesPost['user_ID'] = userResult.insertId;
      //     db.query('INSERT INTO messages SET ?', messagesPost, function(err) {
      //       if(err) {
      //         console.log('error inserting into messages');
      //       }
      //       //complete
      //       console.log('COmpleted storage');
      //       console.log();
      //       console.log();
      //       //db.end();


      //     });
      //   });

      // });
  
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

