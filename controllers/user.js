// const userSignup=require("../models/user")
// const bcrypt=require("bcrypt")
//  const userSignup = async (req, res)=> {
//     const {username,email,password}=req.body
//     if(!username || !email || !password)
//       res.status(400).json({message:"All fields are mandatory"})
//     }
    

//  const existUserCheck=await User.findOne({email})
//  if(existUserCheck){
//      res.status(400).json({message:"user already exist"});
//  }
//  const hasPassword=await bcrypt.hash(password,10)
//  const user=await User.create({
//     username,
//      email,
//      password:hasPassword,
//  })
//      res.status(200).json(user);
 



// module.exports={userSignup}   


const User = require('../models/user');
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")
const userSignup = async(req,res) => {
  console.log(req.body)
  const {username,email,password}=req.body
  if(!username || !email || !password){
 req.flash("error", "user not found")
 return res.redirect("/login")
  //res.status(400).json({message:"All fields are mandatory"})

  }
  const existUserCheck=await User.findOne({email})
  if(existUserCheck){
          res.status(400).json({message:"user already exist"});
      }
      const hashPassword = await bcrypt.hash(password,10)
  const user = await User.create({
        username,
          email,
          password:hashPassword
      })


  //.status(200).json();
  res.redirect("/login")
}



const userLogin = async(req, res) => {
  const {email,password} = req.body;
  const user = await User.findOne({email});

  if (!user) {
    req.flash("error", "user not found")
    return res.redirect("/login")
  }

  if(user && (await bcrypt.compare(password,user.password))){
    const token= jwt.sign(
      {email: user.email, username: user.username, id: user._id },
      process.env.SECRET_KEY
    );
    res.cookie("token", token)
    return res.redirect("/")
  }
  else{
    return res.redirect("/login")
    //req.flash("error", "Invaild credentials"); return res.redirect("/login");

  }
}

module.exports = { userSignup,userLogin };