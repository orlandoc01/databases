var models = require('../models');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

var collectData = function(req, callback) {
  var JSONresponse = '';
  req.on('data', function (chunk) {
    JSONresponse += chunk;
  });

  req.on('end', function(err) {
    if(err) {
      throw err;
    }
    callback(JSONresponse);
  });
};

var sendResponse = function(res, data, statusCode) {
  res.writeHead(headers, statusCode || 200);
  res.end(data);
};




module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) {
      collectData(req, function(JSONdata) {});

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},

    // TODO: Send a response
    post: function (req, res) {
      collectData(req, function(JSONdata) {});
    }
  }
};


