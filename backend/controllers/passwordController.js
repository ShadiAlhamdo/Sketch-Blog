const asycHandler=require("express-async-handler");
const bcrypt=require("bcryptjs");
const {User,generateAuthToken,validateEmail,validateNewPassword}=require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const crypto=require("crypto");
const sendEmail=require("../utils/sendEmail");


/*----------------------------------------
 * @desc Send Reset Password link 
 * @router /api/password/reset-password-link
 * @method POST
 * @access public
 *---------------------------------------- 
 */

 module.exports.sendResetPasswordLinkCtrl=asycHandler(async (req,res)=>{
    //1.Validation
    const {error}=validateEmail(req.body);
    if(error){
      return res.status(400).json({message:error.details[0].message})
    }
    //2.Get The User From Db By Eamil
    const user=await User.findOne({
      email:req.body.email
    });
    if(!user){
      res.status(400).json({message:"User With Given Email Does Not Exist"})
    };
    //3.Creating VerficationToken
    let verificationtoken=await VerificationToken.findOne({
      userId:user._id
    });
    if(!verificationtoken){
      verificationtoken=new VerificationToken({
         userId:user._id,
         token:crypto.randomBytes(32).toString("hex"),
      })
      await verificationtoken.save();
    }
    //4. Creating Link
    const link=`${process.env.CLIENT_DOMAIN}/reset-password/${user._id}/${verificationtoken.token}`
    //5.Creating Html Template
    const htmlTemplate=`
    <a href="${link}">Click Here To Reset Password</a>
    `;
    //6.Sending Email
    await sendEmail(user.email,"Reset Password",htmlTemplate)
    //7. Response to The Client
    res.status(200).json({message:"Password reset Link Sent to Your Email, Please check Your Inbox"})
 });

 /*----------------------------------------
 * @desc Get Reset Password link 
 * @router /api/password/reset-password/:userId/:token
 * @method GET
 * @access public
 *---------------------------------------- 
 */
module.exports.getResetPasswordCtrl=asycHandler(async (req,res)=>{
   const user=await User.findById(req.params.userId)
   if(!user){
      return res.status(400).json({message:"Invalid Link"})
   }
   const verificationToken=VerificationToken.findOne({
      userId:user._id,
      token:req.params.token,
   });
   if(!verificationToken){
      return res.status(400).json({message:"Invalid Link"})
   };

   res.status(200).json({message:"Valid Url"})
});


/*----------------------------------------
 * @desc  Reset Password link 
 * @router /api/password/reset-password/:userId/:token
 * @method POST
 * @access public
 *---------------------------------------- 
 */

 module.exports.resetPasswordCtrl=asycHandler(async (req,res)=>{
    //1.Validation
    const {error}=validateNewPassword(req.body);
    if(error){
      return res.status(400).json({message:error.details[0].message})
    }
    //2.Get The User From Db By Eamil
    const user=await User.findById(req.params.userId)
    if(!user){
      res.status(400).json({message:"User With Given Email Does Not Exist"})
    };

    const verificationToken=await VerificationToken.findOne({
      userId:user._id,
      token:req.params.token
    });
    if(!verificationToken){
      res.status(400).json({message:"User With Given Email Does Not Exist"})
    };

    if(!user.isAccountVerified){
      user.isAccountVerified=true;
    };
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);
    user.password=hashedPassword;
    await user.save();
    await verificationToken.deleteOne({
      userId:user._id,
      token:req.params.token
    });

    res.status(200).json({message:"Password reset Successfully ,please Login"})
 })