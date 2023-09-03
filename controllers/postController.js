const { default: mongoose } = require('mongoose');
const catchAsyncError = require('../middlewares/catchAsyncError');
const Post = require('../models/postModel');
const { deleteFile } = require('../utils/aws/fileUpload');
const { searchQuery, searchModel } = require('../utils/reusableQuery');
const ErrorHandler = require('../utils/errorHandler');

// Create Post By Logged In User
exports.createPost = catchAsyncError(async (req, res, next) => {
  // const postData = { ...req.body };
  const { author, ...data } = req.body;

  const post = await Post.create({
    author: req.user._id,
    // author: req.user.fullName,
    image: req.file?.location,
    ...data,
  });

  res.status(201).json({
    success: true,
    message: 'Post created successfully',
    post,
  });
});

// Get All Posts without Authentication
exports.getallPosts = catchAsyncError(async (req, res, next) => {
  const post = await Post.find().sort({ createdAt: -1 }).populate('author');
  // const post = await Post.find().sort({ createdAt: -1 })

  res.status(201).json({
    success: true,
    post,
  });
});

// Get Single Post without Authenticated
exports.getsinglePost = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate('author');

  res.status(201).json({
    success: true,
    post,
  });
});

// Get Authorized Creator's own posts
exports.getallpostsbyUser = catchAsyncError(async (req, res, next) => {
  const post = await Post.find({ author: req.user._id });
  res.status(200).json({
    success: true,
    post,
  });
});

// Update Authorized Creator's post
exports.updatePost = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (post.image) {
    await deleteFile(post.image);
  }

  const { ...data } = req.body;

  await Post.findByIdAndUpdate(req.params.id, {
    $set: {
      ...data,
      image: req.file?.location,
    },
  });

  res.status(200).json({
    success: true,
    message: 'Post updated Successfully',
  });
});

// Delete Authorized Creator's post
exports.deletesinglePost = catchAsyncError(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  // console.log("post delete", post);

  if (post?.image) {
    await deleteFile(post?.image);
  }

  res.status(201).json({
    success: true,
    message: 'Post Deleted successfully',
  });
});

// Add comment by authenticated user
exports.addComment = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  console.log('req.body', req.body);

  //using mongodb $push method

  await Post.findByIdAndUpdate(
    id,
    {
      $push: { comments: { text: req.body.text, postedBy: req.user._id } },
    },
    {
      new: true,
    }
  );

  // using mongoose push and save method

  // const post = await Post.findById(id);

  // console.log("post", post);

  // post.comments.push({
  //   text: req.body.text,
  //   postedBy: req.user._id,
  // });

  // await post.save();

  res.status(201).json({
    success: true,
    message: 'Comment added successfully',
  });
});

// Get all comments by all users
exports.getallComments = catchAsyncError(async (req, res, next) => {
  const comment = await Post.findById(req.params.id)
    .select('comments')
    .populate({
      path: 'comments.postedBy',
      select: 'fullName avatar',
    });

  res.status(200).json({
    success: true,
    comment,
  });
});

// Delete Comment
exports.deleteComment = catchAsyncError(async (req, res, next) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;
  const post = await Post.findById(postId).select('comments');
  console.log('post', post);

  if (!post) {
    return next(new ErrorHandler('Post not found', 404));
  }

  const comment = post.comments.id(commentId);
  console.log('comment', comment);

  if (!comment) {
    return next(new ErrorHandler('Comment not found', 404));
  }

  await comment.deleteOne();

  // Save the updated post
  await post.save();

  res.status(200).json({
    success: true,
    message: 'Comment deleted successfully',
  });
});

//Search Posts by Post name, Author Date
exports.searchBlogs = catchAsyncError(async (req, res, next) => {
  const { query } = req.query;
  console.log('query', query);

  const searchParams = {
    $or: [
      { title: { $regex: new RegExp(query, 'i') } }, // Search by title
    ],
  };

  const options = {
    sort: { createdAt: -1 },
    // populate: "author",
  };
  // const blogs = await searchQuery(Post, searchParams, options);
  const blogs = await Post.find(searchParams, null, options).populate({
    path: 'author',
    select: 'fullName avatar -_id',
  });

  res.status(200).json({
    success: true,
    blogs,
  });
});
