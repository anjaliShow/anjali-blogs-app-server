const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const ErrorHandler = require('../errorHandler');
require('dotenv').config();

const s3Config = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  region: process.env.AWS_REGION,
});

const s3UserAvatarStorage = multerS3({
  s3: s3Config,
  // bucket: process.env.AWS_BUCKET_NAME,
  bucket: process.env.AWS_BUCKET_NAME,
  acl: 'private',
  metadata: (req, file, cb) => {
    console.log('clickkk');
    console.log('file aws', file);
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 10000);
    cb(
      null,
      'blog/useravatar/useravatar' + file.fieldname + '-' + uniqueSuffix
    );
  },
});
const s3PostStorage = multerS3({
  s3: s3Config,
  bucket: process.env.AWS_BUCKET_NAME,
  acl: 'private',
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 10000);
    cb(null, 'blog/post/post' + file.fieldname + '-' + uniqueSuffix);
  },
});

const sanitizeFile = (file, callback) => {
  const fileExnt = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

  const isAllowedExtension = fileExnt.includes(
    path.extname(file.originalname.toLowerCase())
  );

  const isAllowedMimeType = file.mimetype.startsWith('images/');

  if (isAllowedExtension && isAllowedMimeType) {
    return callback(null, true);
  } else {
    callback(
      null,
      new ErrorHandler(
        `File type ${path.extname(
          file.originalname.toLowerCase()
        )} is not allowed!`,
        400
      )
    );
  }
};

exports.uploadUserAvatar = multer({
  storage: s3UserAvatarStorage,
  fileFilter: (req, file, cb) => {
    sanitizeFile(file, cb);
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // 2mb file size
  },
});
exports.uploadPost = multer({
  storage: s3PostStorage,
  fileFilter: (req, file, cb) => {
    sanitizeFile(file, cb);
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // 2mb file size
  },
});

exports.deleteFile = async (fileuri) => {
  try {
    console.log('fileuri', fileuri);
    // const fileKey = fileuri.split('/').slice(-3).join('/');
    console.log('fileKey', fileKey);

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    });
    await s3Config.send(command);
  } catch (error) {
    console.log(`Error from AWS s3 bucket ${error}`);
  }
};
