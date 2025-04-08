const express = require('express');
const router = express.Router();
const { signUpValidation , loginValidation , forgotValidation } = require('../helpers/validation');
const userController = require("../controllers/userController");
const path = require('path');
const multer = require('multer');
const auth = require("../middleware/auth")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null , path.join(__dirname, '../public/images'));
    } ,
    filename: function(req, file, cb){
        const name = Date.now() + '-' + file.originalname ;
        cb(null , name);
    }
});

const filefilter = (req , file , cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null , true);
    }
    else {
        cb(null, false);
    }
}

const upload = multer({ 
    storage: storage,
    fileFilter: filefilter,
});


router.post("/register", upload.single('image') , signUpValidation, userController.register);
router.post("/login", loginValidation , userController.login);
router.get('/get-user', auth.isAuthorize ,userController.getUser);
router.post('/forgot-password', forgotValidation , userController.forgotPassword);


module.exports = router;