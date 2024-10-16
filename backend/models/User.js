const mongoose=require("mongoose");
const Joi=require("joi");
const jwt=require("jsonwebtoken")
const passwordCopmlexity=require("joi-password-complexity")
//User Schema
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        trim:true,
        minlenght:2,
        maxlenght:100,
    },
    email:{
        type:String,
        require:true,
        trim:true,
        minlenght:5,
        maxlenght:100,
        unique:true,
    } ,
    password:{
        type:String,
        require:true,
        trim:true,
        minlenght:8,
    } ,
    profilePhoto:{
        type:Object,
        default:{
            url:`data:image/png;base64,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`,
            puplicId:null,
        },
    } ,
    bio:{
        type:String,
        trim:true,
        default:""
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isAccountVerified:{
        type:Boolean,
        default:false,
    }
},{
    timestamps:true,//this field added created add + updated at 
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
});

// populate Posts That Belongs To This User When He/she Get His-Her Profile
UserSchema.virtual("posts",{
    ref:"Post",
    foreignField:"user",
    localField:"_id",
})

// Validte Rigester User
function validateRegisterUser(obj){
    const schema=Joi.object({
        username:Joi.string().min(2).max(100).trim().required(),
        email:Joi.string().min(5).max(100).trim().required().email(),
        password:passwordCopmlexity().required(),

    });
    return schema.validate(obj);
}
// Validte Login User
function validateLoginUser(obj){
    const schema=Joi.object({
        email:Joi.string().min(5).max(100).trim().required().email(),
        password:Joi.string().min(8).trim().required(),

    });
    return schema.validate(obj);
};
// Validte Update User
function validateUpdateUser(obj){
    const schema=Joi.object({
        username:Joi.string().trim().min(2).max(100),
        password:passwordCopmlexity(),
        bio:Joi.string(),

    });
    return schema.validate(obj);
}
//Generate Auth token
UserSchema.methods.generateAuthToken=function(){
    return jwt.sign({id:this._id,isAdmin:this.isAdmin},process.env.JWT_SECRET)
};

// Validte Email 
function validateEmail(obj){
    const schema=Joi.object({
        email:Joi.string().min(5).max(100).trim().required().email(),
    });
    return schema.validate(obj);
};

// Validte New Password
function validateNewPassword(obj){
    const schema=Joi.object({
        password:passwordCopmlexity().required(),
    });
    return schema.validate(obj);
};


//User Model
const User=mongoose.model("User",UserSchema);
module.exports={
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser,
    validateEmail,
    validateNewPassword,
}