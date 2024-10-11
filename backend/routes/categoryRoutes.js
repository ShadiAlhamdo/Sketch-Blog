const router =require("express").Router();
const { verifytokenAdmin } = require("../middleWares/verifyToken");
const { createCategoryCtrl, getAllCategoryCtrl, deleteCategoryCtrl, updateCategoryCtrl } = require("../controllers/categoriesController");
const validateObjectid = require("../middleWares/validateObjectid");




// /api/categories
router.route("/")
.post(verifytokenAdmin,createCategoryCtrl)
.get(getAllCategoryCtrl)
// /api/categories/:id
router.route("/:id")
.delete(validateObjectid,verifytokenAdmin,deleteCategoryCtrl)
.put(validateObjectid,verifytokenAdmin,updateCategoryCtrl)


module.exports =router;