const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
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
      lowercase: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Required only if googleId is not present
      },
      select: false, // Do not return the password by default
    },
    googleId: { type: String }, // Google OAuth ID for Google-authenticated users
    image: {
      type: String,
      default: 'https://www.viverefermo.it/images/user.png',
    },
    phoneNumber: {
      type: String,
    },
    isVerified: { type: Boolean, default: false },
    emailVerificationCode: { type: String },
    verificationCodeExpires: { type: Date },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    passwordChangedAt: Date,
  },
  { timestamps: true },
);

// Middleware to update `passwordChangedAt` timestamp when password changes
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew)
    return next();
  this.passwordChangedAt = Date.now() - 1000; // Slight delay to ensure token validity
  next();
});

// Method to create a password reset token
userSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
