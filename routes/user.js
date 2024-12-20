const express = require("express");
//const validateToken = require("../middleware/auth");
const router = express.Router();
const {userSignup,userLogin} = require("../controllers/user")

// router.post("/signup", (req,res) => {
//     res.status(200).json({message:"hello"})
// }) 
router.post("/signup", userSignup)
router.post("/login", userLogin)


// router.get("/", validateToken, (req,res) => {
//     res.render("home")
// })
// router.get("/signup", (req,res)=> {
//     res.render("signup")
// });
// router.get("/login", (req,res) => {
//     res.render("login");
// })
module.exports=router