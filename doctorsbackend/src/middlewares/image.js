const multer = require("multer");
const httpStatus = require('http-status');


// const upload = multer({
//     dest: 'avatars',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//             return cb(new Error('Please upload an image'))
//         }

//         cb(undefined, true)
//     }
// })
var store = multer.diskStorage({
    filename: function(req,file,cb){
      console.log("filename");
      cb(null, Date.now()+'.'+file.originalname);
    },
    destination: function(req,file,cb){
      console.log("storage");
      cb(null,'./public/');
    }
  });
const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|pdf|doc)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
let upload = multer({ storage: store }).single('img');


module.exports={upload}