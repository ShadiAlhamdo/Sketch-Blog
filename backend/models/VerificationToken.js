const mongoose=require("mongoose");

// VerificationToken Schema

const VerificationTokenSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    token:{
        type:String,
        required:true,
    },
},{timestamps:true}
);
// Verification Token Model
const VerificationToken=mongoose.model("verificationtoken",VerificationTokenSchema);





module.exports=VerificationToken;
