const multer = require('multer');
const path     = require('path');

const simpanDataUpload = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const type = ['image/jpg', 'image/png'];
    if(type.includes(file.mimetype)){
        cb(null, true);
    }else{
        cb(new Error(`File hanya bertipe jpg, png`), false);
    }
};

const upload = multer({
    storage: simpanDataUpload,
    fileFilter: fileFilter,
    limits: {fileSize: 5 * 1024 * 1024}
});

module.exports = upload;