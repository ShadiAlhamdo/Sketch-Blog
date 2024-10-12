const cloudinary=require("cloudinary");
const stream = require('stream');

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});


//Cloudinary Upload Image
const cloudinaryUploadImage = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const bufferStream = new stream.PassThrough();
        bufferStream.end(fileBuffer);

        bufferStream.pipe(cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
            if (error) {
                return reject(new Error("Cloudinary upload failed"));
            }
            // هنا نعود بالنتيجة التي تحتوي على public_id و secure_url
            resolve({
                publicId: result.public_id,
                secureUrl: result.secure_url
            })
        }));
    });
};

/*
const cloudinaryUploadImage=async(fileToUpload)=>{
    try{
        
        const data=await cloudinary.uploader.upload(fileToUpload,{
            resource_type:"auto",
        });
        return data
    }
    catch(error){
        console.log(error);
       throw new Error("Internal Server Error (cloudinary)");
    }
};
*/

//Cloudinary Remove Image
const cloudinaryRemoveImage=async(imagePublicId)=>{
    try{
        
        const result=await cloudinary.uploader.destroy(imagePublicId);
        return result;
    }
    catch(error){
        console.log(error);
        throw new Error("Internal Server Error (cloudinary)");
    }
}

module.exports={
    cloudinaryUploadImage,
    cloudinaryRemoveImage
};

//Cloudinary Remove Multiple Image
const cloudinaryRemoveMultipleImage=async(puplicIds)=>{
    try{
        
        const result=await cloudinary.v2.api.delete_resources(puplicIds)
        return result;
    }
    catch(error){
        console.log(error);
        throw new Error("Internal Server Error (cloudinary)");
    }
}

module.exports={
    cloudinaryUploadImage,
    cloudinaryRemoveImage,
    cloudinaryRemoveMultipleImage
};