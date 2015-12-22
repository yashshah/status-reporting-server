// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var Appbase = require('appbase-js');

var appbaseRef = new Appbase({
  url: 'https://scalr.api.appbase.io',
  appname: 'workingon',
  username: 'iiyvFcb3A',
  password: 'b3a36a4d-e517-451c-a04f-a11dc2c4b4bc'
});

var port = process.env.PORT || 7080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/status', function(req, res) {
    res.json({ text: 'Your status has been updated! Keep working!' });
    var jsonString = {
	    "status":req.query.text,
	    "twitterHandle":"@"+req.query.user_name
	}  
    var jsonObj = JSON.parse(JSON.stringify(jsonString));
    console.log(jsonObj)
    appbaseRef.index({
        type: 'feed',
        body: jsonObj
    }).on('data', function(response) {
    	console.log("Done")
        console.log(response);
    }).on('error', function(error) {
    	console.log("Oops")

        console.log(error);
    });

});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
