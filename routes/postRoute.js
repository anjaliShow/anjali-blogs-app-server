const express = require('express');

const {
  createPost,
  getallPosts,
  getsinglePost,
  updatePost,
  deletesinglePost,
  getallpostsbyUser,
  addComment,
  getallComments,
  searchBlogs,
  deleteComment,
} = require('../controllers/postController');
const { uploadPost } = require('../utils/aws/fileUpload');
const {
  isAuthenticatedUser,
  isCreator,
} = require('../middlewares/authorization');

const router = express.Router();

router
  .route('/create')
  .post(uploadPost.single('image'), isAuthenticatedUser, isCreator, createPost);

router.route('/get').get(getallPosts);

router.route('/get/:id').get(getsinglePost);

router
  .route('/update/:id')
  .put(isAuthenticatedUser, isCreator, uploadPost.single('image'), updatePost);

router
  .route('/delete/:id')
  .delete(isAuthenticatedUser, isCreator, deletesinglePost);

router
  .route('/get-my-posts')
  .get(isAuthenticatedUser, isCreator, getallpostsbyUser);

router.route('/add-comment/:id').put(isAuthenticatedUser, addComment);

router.route('/get-comments/:id').get(getallComments);

router
  .route('/delete-comments/:id/:commentId')
  .delete(isAuthenticatedUser, isCreator, deleteComment);

router.route('/search').get(searchBlogs);

module.exports = router;
