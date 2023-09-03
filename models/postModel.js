const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    subTitle: {
      type: String,
      // required: [true, "Subtitle is required"],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      // type: String,
      ref: 'User',
    },
    // image: {
    //   url: String,
    //   alt: String,
    // },
    image: String,
    comments: [
      {
        text: String,
        postedBy: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
        crteatedAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
