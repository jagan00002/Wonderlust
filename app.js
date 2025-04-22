if(process.env.NODE_ENV!=="production"){
    require('dotenv').config()
}

const express=require("express")
const app=express();
const mongoose=require("mongoose")
const Listing=require("./models/listing.js")
const path=require("path");
const methodOverride=require("method-override")
const ejsMate=require("ejs-mate")
const wrapAsync=require("./util/wrapAsync.js")
const ExpressError=require("./util/ExpressError.js")
const {listingSchema,reviewSchema}=require("./schema.js")
const Review=require("./models/review.js")
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash")
const passport=require("passport")
const LocalStrategy=require("passport-local")
const user=require("./models/user.js")


const listings=require("./routes/listing.js")
const review=require("./routes/review.js")
const users=require("./routes/users.js")


//   await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');   this is for local storoge 
const dburl=process.env.ATLASDB_URL;


main()
.then(()=>{
    console.log("connected to db")
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(dburl);
}

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate)
app.use(express.static(path.join(__dirname,"/public")))


const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
        secret:process.env.SECRET,
    },
    touchAfter: 24 * 3600 // time period in seconds
});

store.on("error",(e)=>{
    console.log("session store error",e)
})

const sessionoptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {  // Corrected capitalization
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // Set as a Date object
        maxAge: 7 * 24 * 60 * 60 * 1000,  // Set as duration, not timestamp
        httpOnly: true
    }
};

// app.get("/",(req,res)=>{
//     res.send("this route is working")
// })



app.use(session(sessionoptions));
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()))

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req,res,next)=>{
    res.locals.sucess=req.flash("sucess")
    res.locals.error=req.flash("error")
    res.locals.curruser=req.user;
    next();
})


// app.get("/demouser", async (req, res) => {
//     let fakeuser = new user({
//         email: "stu@gmail.com",
//         username: "jagan"
//     });

// let registereduser= await user.register( fakeuser ,"helloworld")
// res.send(registereduser)
// })



// express router
app.use("/listings",listings)
app.use("/listings/:id/reviews",review)
app.use("/",users)


// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"MY New Villa",
//         description:"by the beach",
//         image:"",
//         price:8080,
//         location:"Bellary",
//         country:"india"
//     })

//     await sampleListing.save();
//     console.log("saved")
//     res.send("sucessful")
// })




// if requiered route not entered correctly

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found fuck youu!!"))
})
// middleware for custom handle error

app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong!!"}=err;
    res.status(statusCode).render("error.ejs",{message})
    // res.status(statusCode).send(message)
})


app.listen(8080,()=>{
    console.log("listening to the post 8080")
})