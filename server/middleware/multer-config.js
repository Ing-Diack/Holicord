const multer = require("multer");

const MIMES_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extention = MIMES_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extention);
    }
});
module.exports = multer({ storage: storage }).single('image');