// const Joi = require('joi');

// const listingSchema = Joi.object({
//     listing:Joi.object({
//         title:Joi.string().required(),
//         description:Joi.string().required(),
//         location:Joi.string().required(),
//         price:Joi.number().required().min(0),
//         country:Joi.string().required(),
//         image:Joi.string().required("",null),
//     }).required()
// })

// module.exports=listingSchema;




const Joi = require('joi'); // If you're using Joi for schema validation
const ExpressError = require('./ExpressError'); // Import your custom error class

// Define the listing schema
const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().uri().required(),
        price: Joi.number().min(0).required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
    }).required(),
});

// Middleware function for validation
const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errmsg = error.details.map((el) => el.message).join(', ');
        throw new ExpressError(400, errmsg); // Throws custom error
    } else {
        next(); // Passes to the next middleware
    }
};

module.exports = validateListing;
