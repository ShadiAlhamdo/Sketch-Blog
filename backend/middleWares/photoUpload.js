const multer = require('multer');

const storage = multer.memoryStorage();
const PhotoUpload = multer({ storage });

module.exports=PhotoUpload;
