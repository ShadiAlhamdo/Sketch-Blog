const multer = require('multer');

const storage = multer.memoryStorage();
const photoUpload = multer({ storage });
module.exports=photoUpload;
/*const path=require("path");
const multer=require("multer");

// Photo Stoarge    
const photostorage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,path.join(__dirname,"../images"));
    },
    filename:function(req,file,callback){
        if(file){
            callback(null,new Date().toISOString().replace(/:/g,"-")+file.originalname);
        }
        else{
            callback(null,false);
        }
    }
});

// Photo Upload Middle ware

const PhotoUpload=multer({
    storage:photostorage,
    fileFilter:function(req,file,cb){
        if(file.mimetype.startsWith("image")){
            cb(null,true)
        }
        else{
            cb({message:"Unsupported File Format"},false)
        }
    },
    limits:{fieldSize: 1024*1024} //1 megabyte
});


module.exports=PhotoUpload;
 */