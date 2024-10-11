const router=require("express").Router();
const {regiserUserCtrl, loginUserCtrl, verifyUserAccountCtrl}=require("../controllers/authController");


//  /api/auth/register
router.post("/register",regiserUserCtrl);


//  /api/auth/login
router.post("/login",loginUserCtrl);

//  /api/auth/:userId/verify/:token
router.post("/:userId/verify/:token",verifyUserAccountCtrl);
module.exports=router