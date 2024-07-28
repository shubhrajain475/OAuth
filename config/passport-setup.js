// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20");
// const keys = require("./keys.js");
// const User = require("../models/user-model.js");

// passport.serializeUser((user,done)=>{
//     done(null,user.id);
// })
// passport.deserializeUser((id,done)=>{
//     User.findById(id).then((user)=>{
//         done(null,user);
//     })
// })

// passport.use(
//   new GoogleStrategy(
//     {
//       //options for the google strategy
//       callbackURL: "/auth/google/redirect",
//       clientID: keys.google.clientID,
//       clientSecret: keys.google.clientSecret,
//     },
//     (accessToken, refreshToken, profile, done) => {
//         console.log(profile);
//       //check if user already exists in database
//       User.findOne({ googleId: profile.id }).then((currentUser) => {
//         if (currentUser) {
//           console.log("user is:", currentUser);
//           done(null,currentUser);
        
//         } else {
//           new User({
//             username: profile.displayName,
//             googleId: profile.id,
//             thumbnail:profile._json.picture
//           })
//             .save()
//             .then((newUser) => {
//               console.log("new user created" + newUser);
//            done(null,newUser);
//             });
//         }
//       });
//     }
//   )
// );



const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require("mongoose");
const User = require("../models/user-model");
const keys = require("./keys");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/redirect",
      state: true
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have this user
          done(null, currentUser);
        } else {
          // if not, create user in our db
          new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            });
        }
      });
    }
  )
);

