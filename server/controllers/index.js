var models = require('../models');





module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) {
      var messageObj = req.body;
      res.send({message: 'message received'});

      console.log(messageObj);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},

    // TODO: Send a response
    post: function (req, res) {
      var userObj = req.body;
      res.send({message: 'username recieved'});

      console.log(userObj);
    }
  }
};


