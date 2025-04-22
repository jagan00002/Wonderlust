// og
const express=require("express")
const router=express.Router();
const wrapAsync=require("../util/wrapAsync.js")
const {listingSchema}=require("../schema.js")
const ExpressError=require("../util/ExpressError.js")
const Listing=require("../models/listing.js")
const {isloggedin,isowner,validateListing}=require("../middleware.js")
const listingController=require("../controllers/listing.js")
const multer  = require('multer')

// cloudinary storage
const {storage}=require("../cloudConfig.js")
const { cloudinary } = require("../cloudConfig.js");

// multer save all files into the cloudinar storage
const upload = multer({ storage });


// router.route
router.route("/")
.get(wrapAsync (listingController.index))
.post(isloggedin, upload.single("listing[image]"),validateListing, wrapAsync (listingController.createRoute))

// new route
router.get("/new",isloggedin,listingController.newRoute)

router.route("/:id")
.get(wrapAsync (listingController.showRoute))
.put(isloggedin,isowner,upload.single("listing[image]"),validateListing,wrapAsync (listingController.updateRoute))
.delete(isloggedin,isowner,wrapAsync (listingController.deleteRoute))
  
  // edit og
   router.get("/:id/edit",isloggedin,isowner,wrapAsync(listingController.editRoute))

  module.exports=router;

