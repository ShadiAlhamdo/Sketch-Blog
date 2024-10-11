const asycHandler=require("express-async-handler");
const {Comment,validtaeCreateComment,validtaeUpdateComment}=require("../models/Comment");
const { User } = require("../models/User");
const { json } = require("express");


/*----------------------------------------
 * @desc Caretae New Comment 
 * @router /api/comments
 * @method POST
 * @access private (only Logged in User)
 *---------------------------------------- 
 */
module.exports.createCommentCtrl=asycHandler(async (req,res)=>{
    const {error}=validtaeCreateComment(req.body);
    if(error){
        res.status(400).json({message:error.details[0].message});
    }
    const profile=await User.findById(req.user.id);

    const comment=await Comment.create({
        postId:req.body.postId,
        text:req.body.text,
        user:req.user.id,
        username:profile.username,
    });

    res.status(200).json(comment)
});


/*----------------------------------------
 * @desc Get All Comment 
 * @router /api/comments
 * @method POST
 * @access private (only Admin)
 *---------------------------------------- 
 */

 module.exports.getAllCommentsCtrl=asycHandler(async (req,res)=>{
    const comments=await Comment.find().populate("user");
    
    res.status(200).json({comments});
 });



 /*----------------------------------------
 * @desc Delete Comment 
 * @router /api/comments/:id
 * @method POST
 * @access private (only Admin Or Owner The Comment)
 *---------------------------------------- 
 */

 module.exports.deleteCommentCtrl=asycHandler(async (req,res)=>{
    const comment=await Comment.findById(req.params.id);
    if(!comment){
        res.status(400).json({message:"Comment Not found"});
    }
    if(req.user.isAdmin || req.user.id === comment.user.toString()){
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Comment deleted Successfully"});
    }
    else{
        res.status(403).json({message:"Access Denied ,Not Allow"});

    }
 });

  /*----------------------------------------
 * @desc Upadte Comment 
 * @router /api/comments/:id
 * @method PUT
 * @access private (only  Owner The Comment)
 *---------------------------------------- 
 */
 module.exports.updateCommnetCtrl=asycHandler(async (req,res)=>{
    
    const {error}=validtaeUpdateComment(req.body);
    if(error){
        res.status(400).json({message:error.details[0].message});
    }
    const comment=await Comment.findById(req.params.id)
    if(!comment){
        res.status(400).json({message:"Comment Not found"});
    }
    if(req.user.id !== comment.user.toString())
    {
        res.status(403).json({message:"Access Denied Not Allow"});
    }

    const updatedCommnet=await Comment.findByIdAndUpdate(req.params.id,{
        $set:{
            text:req.body.text
        }
    },{new:true});
    res.status(200).json(updatedCommnet)
});