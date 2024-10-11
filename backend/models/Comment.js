const mongoose=require("mongoose");
const Joi=require("joi");


// Comment Schema
const CommentSchema=new mongoose.Schema({
    postId:{
        type:mongoose.Schema.ObjectId,
        ref:"Post",
        required:true,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    text:{
        type:String,
        required:true,

    },
    username:{
        type:String,
        required:true,
    }
},{timestamps:true}
);

// Comment Model

const Comment=mongoose.model("Comment",CommentSchema);


// Validate Create Comment
function validtaeCreateComment(obj) {
    const schema=Joi.object({
        postId:Joi.string().required(),
        text:Joi.string().trim().required(),
    });
    return schema.validate(obj);
};

// Validate Update Comment
function validtaeUpdateComment(obj){
    const schema=Joi.object({
        text:Joi.string().trim().required(),
    });
    return schema.validate(obj);
};

module.exports={
    Comment,
    validtaeCreateComment,
    validtaeUpdateComment,
}