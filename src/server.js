
////////////////////////////
///////// Modules /////////
////////////////////////// 

// Core modules
var http = require('http');

// Public modules from npm
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var logfmt = require("logfmt");

var Firebase = require('firebase');
var mandrill = require('mandrill-api/mandrill');



////////////////////////////
///////// Mandrill ////////
////////////////////////// 

// Transactional email.


var m = new mandrill.Mandrill('<MANDRILL_API_KEY>');

var send_email = function (email) {

  var template_name = "<TEMPLATE_NAME>"; // You need to create a mandrill template (https://mandrillapp.com/api/docs/)
  var template_content = [{
          "name": "example name",
          "content": "example content"
      }];
  var message = {
      "subject": "Example subject.",
      "from_email": "startup@example.com", // Company e-mail.
      "to": [{
              "email": email,
              "name": "Recipient Name",
              "type": "to"
          }],
      "important": true,
      "track_opens": true,
      "track_clicks": null,
      "auto_text": null,
      "auto_html": null,
      "inline_css": null,
      "url_strip_qs": null,
      "preserve_recipients": null,
      "view_content_link": null,
      "tracking_domain": null,
      "signing_domain": null,
      "return_path_domain": null,
      "merge": true,
      "global_merge_vars": [{
        "name": "merge1",
        "content": "merge1 content"
      }],
      "tags": [
        "register" // It is important to track develivered emails.
    ],    
  };

  var async = false;

  m.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async}, function(result) {
      
      console.log(result);
      
      // Results have the following structure:
      //    [{
      //        "email": "recipient.email@example.com",
      //        "status": "sent",
      //        "reject_reason": "hard-bounce",
      //        "_id": "abc123abc123abc123abc123abc123"
      //    }]
      
  }, function(error) {
      // Mandrill returns the error as an object with name and message keys
      console.log('A mandrill error occurred: ' + error.name + ' - ' + error.message);
      // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
  });

}



////////////////////////////
///////// Firebase ////////
////////////////////////// 

// Store registrations in an database.

var ref = new Firebase('<FIREBASE_URL>'); // Firebase reference (https://www.firebase.com/docs/web/guide/understanding-data.html)

ref.auth('<FIREBASE_SECRET>', function(error) { // Firebase authentication token (https://www.firebase.com/docs/web/guide/simple-login/custom.html)
  if(error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Login Succeeded!");
  }

});

// Registration counters.

ref.child('known_provider').on("value", function (snapshot) {

	var counter = snapshot.numChildren();
	ref.child('known_provider_counter').set(counter);
	console.log("Known emails registered: " + counter);

});

ref.child('unknown_provider').on("value", function (snapshot) {

	var counter = snapshot.numChildren();
	ref.child('unknown_provider_counter').set(counter);
	console.log("Unknown emails registered: " + counter);

});



////////////////////////////
////////// REST ///////////
//////////////////////////  

// Handle the communication with clients.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// bodyParser populates 'req.body' with (among other things) the value of the POST parameters.
// It's simply a thin wrapper that tries to decode JSON, if fails try to decide URLEncoded, 
// and if fails try to decode Multi-Part.

app.post('/signup', function(req, res) { 
  
  var response = "Signup succeeded.";
  var input = req.body.email.indexOf('@');
  var data = req.body.email.substring(input, req.body.email.length);

  console.log(data);
  
  if (data === '@gmail.com' || data === '@outlook.com' || data === '@yahoo.com' ) {

  	ref.child('known_provider').push({email: req.body.email}); // Sync data with Firebase.
  	
    send_email(req.body.email);

  } else {

  	ref.child('unknown_provider').push({email: req.body.email}); // Sync data with Firebase.
  	
  }

  res.send(response); 
  
});



////////////////////////////
////// Configuration //////
//////////////////////////


app.use(logfmt.requestLogger());

// logfmt is key value logging convention adopted by Heroku.
// The library is for both converting lines in logfmt format to objects
// and for logging objects to a stream in logfmt format.

app.set('port', process.env.PORT || 8080);

// In many environments (e.g. Heroku), and as a convention, 
// you can set the environment variable PORT to tell your web server what port to listen on.
// So, 'process.env.PORT || 8080' means: whatever is in the environment variable PORT, 
// or 8080 if there's nothing there. 


app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/vendor', express.static(__dirname + '/vendor'));
app.use('/partials', express.static(__dirname + '/partials'));

// Configure server to work when HTML5Mode is true

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendfile('index.html', { root: __dirname });
});



////////////////////////////
///////// Server //////////
//////////////////////////

http.createServer(app).listen(app.set('port'), function () {
	console.log('Server running at http://127.0.0.1:' + app.set('port')); // Log valid in development environment only.
});
