const asycHandler=require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
const bcrypt=require("bcryptjs");
const path=require("path");
const { cloudinaryUploadImage, cloudinaryRemoveImage, cloudinaryRemoveMultipleImage } = require("../utils/cloudinary");
const fs=require("fs");
const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");
const { post } = require("../routes/commentRoute");
/*----------------------------------------
 * @desc Get All Users 
 * @router /api/users/profile
 * @method GET
 * @access private (only admin)
 *---------------------------------------- 
 */
module.exports.getAllUsersCtrl=asycHandler(async (req,res)=>{
    
    const users=await User.find().select("-password").populate("posts");
    res.status(200).json(users)
});
/*----------------------------------------
 * @desc Get  User Profile
 * @router /api/users/profile/:id
 * @method GET
 * @access private (only admin)
 *---------------------------------------- 
 */
module.exports.getUserprofileCtrl=asycHandler(async (req,res)=>{
    
    const user=await User.findById(req.params.id).select("-password").populate("posts");
    if(!user){
        res.status(404).json({message:"user not found"})
    }
    res.status(200).json(user)
});



/*----------------------------------------
 * @desc Update  User Profile
 * @router /api/users/profile/:id
 * @method PUT
 * @access private (only Youser Himself)
 *---------------------------------------- 
 */

 module.exports.updateUserProfileCtrl=asycHandler(async(req,res)=>{
    // valdetion 
    const {error}=validateUpdateUser(req.body);
    if(error){
        res.status(400).json({message:error.details[0].message})
    }

    //Check password
    if(req.body.password){
        const salt=await bcrypt.genSalt(10);
        req.body.password=await bcrypt.hash(req.body.password,salt);
    }
    // Set The New Value
    const updateUser=await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            password:req.body.password,
            bio:req.body.bio,
        }
    },{new:true}).select("-password").populate("posts");

    // send the response
    res.status(200).json(updateUser)
 });
 /*----------------------------------------
 * @desc Get  Users Count
 * @router /api/users/count
 * @method GET
 * @access private (only admin)
 *---------------------------------------- 
 */
module.exports.getUsersCountCtrl=asycHandler(async (req,res)=>{
    
    // استخدام الدالة countDocuments للحصول على عدد المستخدمين
    const count = await User.countDocuments();

    // إرجاع العدد في استجابة JSON
    res.status(200).json({ count });
});

/*----------------------------------------
 * @desc ProfilePhoto Upload
 * @router /api/users/profile/profile-photo-upload
 * @method POST
 * @access private (only Loggrd In User)
 *---------------------------------------- 
 */
module.exports.profilePhotoUploadCtrl=asycHandler(async (req,res)=>{
    //1.Validation
   if(!req.file){
    res.status(400).json({message:"No File Uploaded"})
   }
   
   //2.Get the path to the Image
//   const imagePath=path.join(__dirname,`../images/${req.file.filename}`)
   //3.Upload to Cloudinary
   const result=await cloudinaryUploadImage(req.file.buffer);
  
   //4.Get The user from DB
   const user=await User.findById(req.user.id);
   //5.DELETE the old profile photo id exist
   
   if(user.profilePhoto.puplicId){
    
 
    await cloudinaryRemoveImage(user.profilePhoto.puplicId)
   }
   //6.Change the profile photo field in the DB
   
   user.profilePhoto={
    url:result.secure_url,
    publicId:result.public_id
   }
  
   await user.save();
   //7.send response to the Client
   res.status(200)
   .json({message:"Your Profile Uploaded Susccessfully",
    profilePhoto:{url:result.secure_url,publicId:result.public_id}
   });

   //8.Remove the I=mage from SERVER
});




/*----------------------------------------
 * @desc Delete User Profile (Account)
 * @router /api/users/profile/:id
 * @method DELETE
 * @access private (only admin or User himself)
 *---------------------------------------- 
 */
 
 module.exports.deleteUserProfileCtrl=asycHandler(async(req,res)=>{
    //1.get the user from Db
    const user=await User.findById(req.params.id);
    if(!user){
        res.status(404).json({message:"user not found"});
    }
    // 2.get all posts from DB
    const posts=await Post.find({user:user._id});
    // 3.get the puplic id from the posts
    const publicids=posts?.map((post)=>post.image.publicId);
    // 4.delete all posts image in Cloudinary Belong to User
    if(publicids?.length>0){
        await cloudinaryRemoveMultipleImage(publicids);
    }
    //5.delete the profile picture

    if(user.profilePhoto.puplicId !== null){
        await cloudinaryRemoveImage(user.profilePhoto.publicId);
    }
  
    // 6.delete user posts & comments
    await Post.deleteMany({user:user._id});
    await Comment.deleteMany({user:user._id});
    //7.delete the user himself
    await User.findByIdAndDelete(req.params.id);
    //8.send response to the client
    res.status(200).json({message:"Your profile has Delete"})
 })