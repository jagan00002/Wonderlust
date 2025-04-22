const user=require("../models/user.js");

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.Signup=async(req,res,next)=>{
    try{
        let {username,email,password}=req.body;
        const newuser=new user({email,username});
        const registereduser= await user.register(newuser,password);
        console.log(registereduser);

        // code to move from sigup to signin autamatically
        
        req.login(registereduser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("sucess","welcome to Wonderlust!")
            res.redirect("/listings")
        })
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup")
    }
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs")
}

module.exports.login=async(req,res)=>{
    req.flash("sucess","welcome back to Wonderlust!")
    let redirectUrl=res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl)
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        req.flash("sucess","You have sucessfully logged out")
        res.redirect("/listings")
    })
}