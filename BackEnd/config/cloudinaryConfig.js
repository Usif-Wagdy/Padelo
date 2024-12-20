const cloudinary = require('cloudinary').v2;
const {
  CloudinaryStorage,
} = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'daxm65zyi',
  api_key: '137132137829925',
  api_secret: 'QaueEe7IdbkMZP8FGgTY0kSbuuo',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'user_photos',
    allowed_formats: ['jpeg', 'png', 'jpg'],
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
