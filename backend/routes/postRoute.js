const router=require("express").Router();
const { createPostCtrl, getAllPostsCtrl, getSinglePostCtrl, getPostCountCtrl, deletePostCtrl, updatePostCtrl, updatePostImageCtrl, toggleLikeCtrl } = require("../controllers/postController");
const photoUpload=require("../middleWares/photoUpload");
const validateObjectid = require("../middleWares/validateObjectid");
const {verifyToken}=require("../middleWares/verifyToken")

// /api/posts

router.route("/")
.post(verifyToken,photoUpload
    .single("image"),createPostCtrl)
    .get(getAllPostsCtrl)

// /api/posts/count

router.route("/count").get(getPostCountCtrl)
// /api/posts/:id

router.route("/:id").get(validateObjectid,getSinglePostCtrl)
.delete(validateObjectid,verifyToken,deletePostCtrl)
.put(validateObjectid,verifyToken,updatePostCtrl)


// /api/posts/update-image/:id
router.route("/update-image/:id").put(validateObjectid,verifyToken,photoUpload.single("image"),updatePostImageCtrl)

// /api/posts/like/:id
router.route("/like/:id").put(validateObjectid,verifyToken,toggleLikeCtrl);


module.exports=router;

