const asycHandler=require("express-async-handler");
const { validtaeCreateCategory, Category } = require("../models/Category");
const { json } = require("express");



/*----------------------------------------
 * @desc Caretae New Category 
 * @router /api/categories
 * @method POST
 * @access private (only Admin)
 *---------------------------------------- 
 */

 module.exports.createCategoryCtrl=asycHandler(async(req,res)=>{
    const {error}=validtaeCreateCategory(req.body);
    if(error){
        res.status(400).json({message:error.details[0].message});
    }
    const category =await Category.create({
        title:req.body.title,
        user:req.user.id,
    })
    res.status(200).json(category);
 });

 
/*----------------------------------------
 * @desc Get All Category 
 * @router /api/categories
 * @method GET
 * @access Public 
 *---------------------------------------- 
 */

 module.exports.getAllCategoryCtrl=asycHandler(async(req,res)=>{
    
    const categories=await Category.find()
    res.status(200).json(categories);
 });

  /*----------------------------------------
 * @desc Update Category 
 * @router /api/categories/:id
 * @method PUT
 * @access Private  (Only Admin)
 *---------------------------------------- 
 */
 module.exports.updateCategoryCtrl=asycHandler(async (req,res)=>{
    const {error}=validtaeCreateCategory(req.body);
    if(error){
        res.status(400).json({message:error.details[0].message});
    }
    const category=await Category.findById(req.params.id)
    if(!category){
        res.status(400).json({message:"Comment Not found"});
    }
    const updatedCategoryt=await Category.findByIdAndUpdate(req.params.id,{
        $set:{
            title:req.body.title
        }
    },{new:true});
    res.status(200).json(updatedCategoryt)
});
 /*----------------------------------------
 * @desc Delete Category 
 * @router /api/categories/:id
 * @method DELETE
 * @access Private  (Only Admin)
 *---------------------------------------- 
 */

 module.exports.deleteCategoryCtrl=asycHandler(async (req,res)=>{
    const category=await Category.findById(req.params.id);
    if(!category){
        res.status(400).json({message:"Category Not Found"})
    }
    await Category.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"Category has deleted Successfully ",CategoryId:category._id}) 
});