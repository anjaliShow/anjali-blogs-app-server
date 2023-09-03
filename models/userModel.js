const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: [true, 'Please enter a Username'],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please enter a Email'],
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please enter a Password'],
      match: [
        /^(?=(?:\D*\d){4})(?=(?:\d*\D){4})[a-zA-Z\d]{8}$/,
        'Password should be at least 8 characters long with 4 alphabets and 4 numbers',
      ],
    },
    avatar: String,
    role: {
      type: String,
      // enum: [],
      default: 'user',
    },
  },
  { timestamps: true }
);

// For Password Hashing
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// For compare password on login time
userSchema.method('comparePassword', async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
});

// For generate JWT Token
userSchema.method('getJWT', function () {
  return JWT.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
});

const User = mongoose.model('User', userSchema);
module.exports = User;
