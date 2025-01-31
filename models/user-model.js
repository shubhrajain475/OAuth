// const mongoose=require("mongoose");
// const Schema=mongoose.Schema;

// const userSchema=new Schema({
//     username:String,
//     googleId:String,
//     thumbnaili:String
// });

// const User=mongoose.model('user',userSchema);

// module.exports=User;




const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  googleId: String,
  email: String
});

const User = mongoose.model("user", userSchema);

module.exports = User;
