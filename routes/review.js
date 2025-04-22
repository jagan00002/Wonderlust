const express=require("express")
const router=express.Router({mergeParams:true});
const wrapAsync=require("../util/wrapAsync.js")
const {reviewSchema}=require("../schema.js")
const ExpressError=require("../util/ExpressError.js")
const Review=require("../models/review.js")
const Listing=require("../models/listing.js")
const {validatereview, isloggedin, isReviewAuthor}=require("../middleware.js")
const reviewController=require("../controllers/review.js")


// review post route
router.post("/", isloggedin, validatereview,wrapAsync (reviewController.createReview))

// review delete route
router.delete("/:reviewId",isloggedin,isReviewAuthor, wrapAsync(reviewController.deleteReview)) 

module.exports=router;