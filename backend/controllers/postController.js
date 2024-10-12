const fs=require("fs");
const path=require("path");
const asycHandler=require("express-async-handler");
const {Post,validationCreatePost, validateUpdatePost}=require("../models/Post");
const {cloudinaryUploadImage, cloudinaryRemoveImage}=require("../utils/cloudinary");
const { Comment } = require("../models/Comment");

/*----------------------------------------
 * @desc Caretae New Post 
 * @router /api/posts
 * @method POST
 * @access private (only Logged in User)
 *---------------------------------------- 
 */

 module.exports.createPostCtrl=asycHandler(async (req,res)=>{
    //1. Validation fir Image
    if(!req.file){
        return res.status(400).json({message:"No Image Provided"})
    };
    //2. Validation for Data
    const {error}=validationCreatePost(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message})
    }
    //3. Upload Photo
    const imagePath=path.join(__dirname, `../images/${req.file.filename}`);
    const result=await cloudinaryUploadImage(req.file.filename);
    //4.Create New Post and Save it On DB
    const post=await Post.create({
        title:req.body.title,
        description:req.body.description,
        category:req.body.category,
        user:req.user.id,
        image:{
            url:result.secure_url,
            publicId:result.public_id,
        }
    });
    //5. Send Response to gthe Client 
    res.status(200).json(post)
    //6.Remove Image From the Server 
    fs.unlinkSync(imagePath);
 });

 /*----------------------------------------
 * @desc Get All   Post 
 * @router /api/posts
 * @method GET
 * @access Public
 *---------------------------------------- 
 */

 module.exports.getAllPostsCtrl=asycHandler(async (req,res)=>{
    const POST_PER_PAGE=3;
    const {pageNumber,category}=req.query;
    let posts;
    if(pageNumber){
        posts=await Post.find()
        .skip((pageNumber - 1) * POST_PER_PAGE)
        .limit(POST_PER_PAGE)
        .sort({createdAt: -1 })
        .populate("user",["-password"]);
        }
    else if(category){
            posts=await Post.find({category})
            .sort({createdAt: -1 })
            .populate("user",["-password"]);
        }
        else{
            posts=await Post.find().sort({createdAt: -1 })    
            .populate("user",["-password"])
        }

        res.status(200).json(posts)
    
 });

  /*----------------------------------------
 * @desc Get Single   Post 
 * @router /api/posts/:id
 * @method GET
 * @access Public
 *---------------------------------------- 
 */

 module.exports.getSinglePostCtrl=asycHandler(async (req,res)=>{
   const post =await Post.findById(req.params.id).populate("user",["-password"])
   .populate("comments")
   if(!post){
    res.status(404).json({message:"post not found"})
   }

        res.status(200).json(post)
    
 });

  /*----------------------------------------
 * @desc Get Post  Count
 * @router /api/posts/count
 * @method GET
 * @access Public
 *---------------------------------------- 
 */

 module.exports.getPostCountCtrl=asycHandler(async (req,res)=>{
    const count =await Post.countDocuments();
   
 
         res.status(200).json({count})
     
  });

   /*----------------------------------------
 * @desc Delete Single Post 
 * @router /api/posts/:id
 * @method DELETE
 * @access Private (only Admin or Owner the post)
 *---------------------------------------- 
 */

 module.exports.deletePostCtrl=asycHandler(async (req,res)=>{
    const post =await Post.findById(req.params.id);
    if(!post){
     res.status(404).json({message:"post not found"})
    }
 
    if(req.user.isAdmin || req.user.id==post.user.toString()){
        await Post.findByIdAndDelete(req.params.id);
        await cloudinaryRemoveImage(post.image.publicId);
        // Delete All Comment on this Post
        await Comment.deleteMany({postId:post._id})

        res.status(200).json({message:"post has been delte successfully"})
    }else{
        res.status(403).json({message:"access denied , forbidden"})
    }
    
  });

  /*----------------------------------------
 * @desc Update  Post 
 * @router /api/posts/:id
 * @method PUT
 * @access private (only Owner of the post )
 *---------------------------------------- 
 */

 module.exports.updatePostCtrl=asycHandler(async (req,res)=>{
    //1.Validation
    const {error}=validateUpdatePost(req.body);
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }
    //2.get the post from the db and check if post exist
    const post = await Post.findById(req.params.id);
    if(!post){
        return    res.status(404).json({message:"post not found"})
    }
    // 3. Check if this post belongs to the logged user
    if (!post.user) {
        return res.status(404).json({ message: "user not found for this post" });
    }
    
    if (post.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "access denied, you are not allowed" });
    }

    //4.Update Post
    const UpdatedPost=await Post.findByIdAndUpdate(req.params.id,{
        $set:{
            title:req.body.title,
            description:req.body.description,
            category:req.body.category,
        }
    },{new:true}).populate("user",["-password"])

    //5.Send Response to the Client
    res.status(200).json({UpdatedPost});
 });

 
  /*----------------------------------------
 * @desc Update  Post Image
 * @router /api/posts//update-image/:id
 * @method PUT
 * @access private (only Owner of the post )
 *---------------------------------------- 
 */

 module.exports.updatePostImageCtrl=asycHandler(async (req,res)=>{
    //1.Validation
    if(!req.file){
        return res.status(400).json({message:"No Image Provided"});
    }
    //2.get the post from the db and check if post exist
    const post = await Post.findById(req.params.id);
    if(!post){
        return    res.status(404).json({message:"post not found"})
    }
    // 3. Check if this post belongs to the logged user
    if (!post.user) {
        return res.status(404).json({ message: "user not found for this post" });
    }
    
    if (post.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "access denied, you are not allowed" });
    }

    //4.Delete Old  Image
    await cloudinaryRemoveImage(post.image.publicId)

    //5.Upload New Image
    const imagePath=path.join(__dirname,`../images/${req.file.filename}`);
    const result=await cloudinaryUploadImage(imagePath);

    //6.Update Image In the DB
    const UpdatedPost=await Post.findByIdAndUpdate(req.params.id,{
        $set:{
            image:{
                url:result.secure_url,
                publicId:result.public_id,
            }
        }
    },{new:true});

    //7.Update Image In the DB
    res.status(200).json({UpdatedPost});

    //8.Remove Image from the server
    fs.unlinkSync(imagePath)

 });

 
  /*----------------------------------------
 * @desc Toggle Like
 * @router /api/posts/Like/:id
 * @method PUT
 * @access private (only Logged in user)
 *---------------------------------------- 
 */

 module.exports.toggleLikeCtrl=asycHandler(async (req,res)=>{
    const loggedsInUser=req.user.id;
    const {id:postId}=req.params;
    var  post =await Post.findById(postId);
    if (!post) {
        return res.status(400).json({message:"Post Not found"});
    }
    const isPostAlreadyLiked=post.likes.find((user)=>user.toString()===loggedsInUser)
    if(isPostAlreadyLiked){
        post=await Post.findByIdAndUpdate(postId,{
            $pull:{
                likes:loggedsInUser
            }
        },{new:true})
    }
    else{
        post=await Post.findByIdAndUpdate(postId,{
            $push:{
                likes:loggedsInUser
            }
        },{new:true})
    }

    res.status(200).json(post);
 });