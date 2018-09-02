var express               = require('express');
var mongoose              = require("mongoose");
var passport              = require('passport');
var LocalStrategy         = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User                  = require('./models/user.js');
var bodyParser            = require("body-parser");

//connect to db
//useNewUrlParser: true to prevent warnings or sth
mongoose.connect("mongodb://localhost/connectedin_db", { useNewUrlParser: true });

//initialize app with express
var app = express();

//Router
var router = express.Router()

//controllers
var authController = require("./controllers/auth.js");
app.use(authController);

//uses
app.use(express.static(__dirname + '/../assets/'));
app.use(bodyParser.urlencoded({extended: true}));

//express session
app.use(require('express-session')({
    secret            : "pol&kos",
    resave            : false,
    saveUninitialized : false
}));

app.set('view engine', 'ejs');

//passport stuff
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ==============
//    ROUTES
// ==============





app.listen(8090,function(){
  console.log("Server Has Started");
});
