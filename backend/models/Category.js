const mongoose=require("mongoose");
const Joi=require("joi");

// Category Schema

const CategorySchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
},{timestamps:true}
);

const Category=mongoose.model("Category",CategorySchema);

// Validate Create Category
function validtaeCreateCategory(obj) {
    const schema=Joi.object({
        title:Joi.string().trim().required().label("Title")
    });
    return schema.validate(obj);
};



module.exports={
    Category,
    validtaeCreateCategory,
    
}