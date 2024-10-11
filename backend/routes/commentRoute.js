const { createCommentCtrl, getAllCommentsCtrl, deleteCommentCtrl, updateCommnetCtrl } = require("../controllers/commentController");
const validateObjectid = require("../middleWares/validateObjectid");
const { verifyToken, verifytokenAdmin, verifytokenOnlyUser, verifyTokenAndAuthorization } = require("../middleWares/verifyToken");
const { validtaeCreateComment } = require("../models/Comment");

const router=require("express").Router();

// /api/comments
router.route("/")
.post(verifyToken,createCommentCtrl)
.get(verifytokenAdmin,getAllCommentsCtrl)


// /api/comments/:id
router.route("/:id")
.delete(validateObjectid,verifyToken,deleteCommentCtrl)
.put(validateObjectid,verifyToken,updateCommnetCtrl)
module.exports=router;