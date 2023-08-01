const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('../plugins');
const { roles } = require('../../config/roles');
const moment = require('moment')

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: 'patient',
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
    },
    created_at: {
      type: Date,
      required: true,
      default: moment().format("YYYY-MM-DD HH:mm:ss"),
    },
    updated_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
// userSchema.plugin(toJSON);
// userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
