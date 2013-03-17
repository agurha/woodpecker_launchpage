/**
 * Created with JetBrains WebStorm.
 * User: agurha
 * Date: 13/03/2013
 * Time: 19:04
 * To change this template use File | Settings | File Templates.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();


var MailChimpAPI = require('mailchimp').MailChimpAPI;
var apiKey = '344e36a3085102616758d330b90f43ff-us5';
var listID = '1a8aa7f4ff';


try {
  var mcApi = new MailChimpAPI(apiKey, { version : '1.3', secure : false });
} catch (error) {
  console.log(error.message);
}


//SETUP
app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.engine('html', require('ejs').renderFile);
//

// ROUTES
app.get('/', function(req, res) {
  res.render('index.html', {
    pageName : 'Home'
  });
});

app.get('/docs', function(req,res){
  res.render('docs.html', {
    pageName: 'Docs'
  })
})

//app.get('/', routes.index);
//app.get('/users', user.list);

// Accept the Post from the Form on the Index page and use listSubscribe from API
// Turn the Double Optin off and send messages back

app.post('/subscribe', function(req, res){
  console.log(req);
  mcApi.listSubscribe({id: listID, email_address:req.body.email, double_optin: false}, function (error, data) {
    if (error){
      console.log(error);
      res.send("<p class='error'>Something went wrong. Please try again.</p>");
    }
    else {
      console.log(data);
      res.send("<p class='success'>Thanks! We will notify you when Beta is available.</p>");
    }
  })
});


// START SERVER
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
