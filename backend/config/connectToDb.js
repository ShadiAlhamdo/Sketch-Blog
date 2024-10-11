const mongoose=require("mongoose");
module.exports=async()=>{
    try{
        
        await mongoose.connect(process.env.MONGO_CLOUD_URI);
        console.log("Connection  To MongoDb ^-^")

    }
    catch(error){
        console.log("Connection Faild To MongoDb")
    }
    
}