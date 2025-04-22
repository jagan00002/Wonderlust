const { required, ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema= new Schema({
    comment:{
        type:String
    },
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
})

module.exports=mongoose.model("Review",reviewSchema);