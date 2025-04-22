const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError=require("./util/ExpressError.js")
const {listingSchema,reviewSchema}=require("./schema.js");


module.exports.isloggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl
        req.flash("error","you must logged in to create listing")
        return res.redirect("/login")
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.local.redirectUrl=req.session.redirectUrl;
    }
    next();
}

// module.exports.isowner=async(req,res,next)=>{
//     let {id}=req.params;
//       let listing=await Listing.findById(id);
//       if(!listing.owner.equals(res.locals.curruser._id)){
//         req.flash("error","you dont have access to this!")
//         return res.redirect(`/listings/${id}`)
//       }
// }

module.exports.isowner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing || !listing.owner || !res.locals.curruser || !listing.owner.equals(res.locals.curruser._id)) {
        req.flash("error", "You don't have access to this!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// validation schema for listing
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errmsg = error.details.map((el) => el.message).join(', ');
        throw new ExpressError(400, errmsg); // Throws custom error
    } else {
        next(); // Passes to the next middleware
    }
};

// validate for reviews

module.exports.validatereview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
      const errmsg = error.details.map((el) => el.message).join(', ');
      throw new ExpressError(400, errmsg); // Throws custom error
  } else {
      next(); // Passes to the next middleware
  }
};

// validation for review author

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.curruser._id)){
        req.flash("error","You don't have access to this!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

