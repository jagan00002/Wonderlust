const Joi = require("joi"); // Ensure correct import

module.exports.listingSchema=Joi.object({
    listing:Joi.object({
        title: Joi.string().required(),  // ✅ Use lowercase 'string()'
        price: Joi.number().required().min(0),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        image: Joi.string().allow("",null)
            
    }).required(),
})


module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.string().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()
})
