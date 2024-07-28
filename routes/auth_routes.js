// const router = require("express").Router();
// const passport=require('passport');

// //auth login
// router.get("/login", (req, res) => {
//  // res.render("login");
//   res.render("login",{user: req.user});
// });

// //auth logout
// // router.get("/logout", (req, res) => {
// //   req.logout();
// //   res.redirect('/')
// // });
// router.get("/logout", (req, res, next) => {
//     req.logout((err) => {
//       if (err) {
//         return next(err);
//       }
//       res.redirect('/');
//     });
//   });
  

// //auth with google
// router.get("/google",passport.authenticate('google',{
//     scope: ['profile']
// }) );

// //callback route for google to redirect to
// router.get("/google/redirect",passport.authenticate("google"),(req,res)=>{
//     // res.send(req.user);
//   //  res.redirect('/profile/');
//   passport.authenticate("google", (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.redirect("/auth/login");
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return next(err);
//       }
//       req.session.tempUser = user;
//       res.redirect("/auth/confirm-email");
//       });
//     })(req, res, next);
//   });
//   router.get("/confirm-email", (req, res) => {
//     if (!req.session.tempUser) {
//       return res.redirect("/auth/login");
//     }
//     res.render("confirm-email", { user: req.session.tempUser });
//   });
  
//   router.post("/confirm-email", (req, res) => {
//     if (!req.session.tempUser) {
//       return res.redirect("/auth/login");
//     }
//     // Complete the login process and clear the temp user session
//     req.user = req.session.tempUser;
//     delete req.session.tempUser;
//     res.redirect("/profile");
//   });

// module.exports = router;





const router = require("express").Router();
const passport = require('passport');

// auth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// auth logout
// router.get("/logout", (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/');
//   });
// });

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
        res.clearCookie('connect.sid');
        res.clearCookie('google-auth'); // Clear the session cookie
        res.redirect('/');
      });
    });
  });

// auth with google
// router.get("/google", passport.authenticate('google', {
//   scope: ['profile', 'email'] , // Include 'email' to get the user's email
// }));

router.get("/google", (req, res, next) => {
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account' // Force account selection
    })(req, res, next);
  });



// callback route for google to redirect to
router.get("/google/redirect", (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/auth/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.session.tempUser = user;
      res.redirect("/auth/confirm-email");
    });
  })(req, res, next);  // Note the added 'next' parameter here
});

router.get("/confirm-email", (req, res)=> {
    if (!req.session.tempUser) {
      return res.redirect("/auth/login");
    }
    res.render("confirm-email", { user: req.session.tempUser });
  });
  
  router.post("/confirm-email", (req, res) => {
    if (!req.session.tempUser) {
      return res.redirect("/auth/login");
    }
    // Complete the login process and clear the temp user session
    req.user = req.session.tempUser;
    delete req.session.tempUser;
    res.redirect("/profile");
  });
  
  module.exports = router;

