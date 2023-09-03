const express = require("express");
const {
  register,
  login,
  logout,
  getProfile,
} = require("../controllers/userController");
const { uploadUserAvatar } = require("../utils/aws/fileUpload");
const {
  isAuthenticatedUser,
  isCreator,
} = require("../middlewares/authorization");
const router = express.Router();

router.route("/register").post(uploadUserAvatar.single("avatar"), register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/get-profile").get(isAuthenticatedUser, getProfile);

module.exports = router;
