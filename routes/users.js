const express=require("express")
const router=express.Router();
const user=require("../models/user.js");
const wrapAsync = require("../util/wrapAsync.js");
const passport = require("passport");
const usersController=require("../controllers/users.js");
const { saveRedirectUrl } = require("../middleware.js");

// signup get n post
router.route("/signup")
.get(usersController.renderSignupForm)
.post(wrapAsync(usersController.Signup))

// login get n post
router.route("/login")
.get(usersController.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),usersController.login)

// logout
router.get("/logout",usersController.logout)

module.exports=router;