const express = require("express");
const authRoutes = require("./routes/auth_routes.js");
const passportSetup=require('./config/passport-setup.js');
const mongoose=require('mongoose');
const keys=require('./config/keys.js');
// const cookieSession=require('cookie-session');
const session = require('express-session');
const passport=require('passport');
const app = express();
const profileRoutes=require("./routes/profile-routes.js")

//set up view engine

app.set("view engine", "ejs");

app.use(session({
   secret: keys.session.cookieKey,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24*60*60*1000 }
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI).then(()=>{
    console.log("connected to mongodb");
});

//set up routes
app.use("/auth", authRoutes);
app.use("/profile",profileRoutes);
//create home route
app.get("/", (req, res) => {
  res.render("home",{user: req.user});
});

app.listen(3000, () => {
  console.log("app now listening for request on port 3000");
});
