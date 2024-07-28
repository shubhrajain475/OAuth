const router = require("express").Router();


const authCheck=(req,res,next)=>{
  if(!req.user){
        //if user is not logged in
        res.redirect("/auth/login");
  }
  else{
       //if logged in
       next();
  }
}
router.get("/",authCheck, (req, res) => {
 // res.render('profile',{user:req.user});
  res.render("profile",{user: req.user});
});

module.exports=router;



// const router = require("express").Router();

// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect('/auth/login'); // or another appropriate response for unauthenticated users
//   }
// }

// router.get("/", isAuthenticated, (req, res) => {
//   console.log("Profile route hit"); // Debugging log
//   if (req.user) {
//     res.send("You are logged in, this is your profile - " + req.user.username);
//   } else {
//     res.redirect('/auth/login'); // or another appropriate response for unauthenticated users
//   }
// });

// module.exports = router;


// const router = require("express").Router();

// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect('/auth/login'); // or another appropriate response for unauthenticated users
//   }
// }

// router.get("/", isAuthenticated, (req, res) => {
//   console.log("Profile route hit"); // Debugging log
//   try {
//     if (req.user) {
//       res.send("You are logged in, this is your profile - " + req.user.username);
//     } else {
//       res.send("User is not authenticated"); // Handle unauthenticated user case
//     }
//   } catch (error) {
//     console.error("Error in profile route:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// module.exports = router;



