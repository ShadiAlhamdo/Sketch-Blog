const { getAllUsersCtrl, getUserprofileCtrl, updateUserProfileCtrl, getUsersCountCtrl, profilePhotoUploadCtrl, deleteUserProfile, deleteUserProfileCtrl } = require("../controllers/usersController");
const photoUpload = require("../middleWares/photoUpload");
const PhotoUpload = require("../middleWares/photoUpload");
const validateObjectid = require("../middleWares/validateObjectid");
const {  verifytokenAdmin, verifytokenOnlyUser, verifyToken, verifyTokenAndAuthorization } = require("../middleWares/verifyToken");

const router=require("express").Router();


// /api/users/profile
router.route("/profile").get(verifytokenAdmin,getAllUsersCtrl);

// /api/user/profile/:id
router.route("/profile/:id").get(validateObjectid,getUserprofileCtrl);

// /api/user/profile/:id
router.route("/profile/:id")
.get(validateObjectid,getUserprofileCtrl)
.put(validateObjectid,verifytokenOnlyUser,updateUserProfileCtrl)
.delete(validateObjectid,verifyTokenAndAuthorization,deleteUserProfileCtrl)
// /api/users/count
router.route("/count").get(verifytokenAdmin,getUsersCountCtrl);

// /api/users/profile
router.route("/profile/profile-photo-upload")
.post(verifyToken,profilePhotoUploadCtrl);

module.exports=router;