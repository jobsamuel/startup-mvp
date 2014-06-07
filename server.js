// Carrito-MVP Web Server - v0.1
// Jobsamuel Núñez. All right reserved 2014.

var express = require('express');
var app = express();

// In many environments (e.g. Heroku), and as a convention, 
// you can set the environment variable PORT to tell your web server what port to listen on.
// So, 'process.env.PORT || 8080' means: whatever is in the environment variable PORT, 
// or 8080 if there's nothing there.

app.set('port', process.env.PORT || 8080); 

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/partials', express.static(__dirname + '/partials'));

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendfile('index.html', { root: __dirname });
});

app.listen(app.set('port'));
console.log('Server running at http://127.0.0.1:8080/');