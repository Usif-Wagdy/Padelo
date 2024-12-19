const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const sendEmail = require('./../email');
const crypto = require('crypto');

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, role: user.role }, 
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
};

exports.addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    if (!name || name.trim() === '') {
      return res
        .status(400)
        .json({ message: 'Name is required' });
    }

    if (!email || !validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: 'A valid email is required' });
    }

    if (
      !password ||
      !validator.isStrongPassword(password)
    ) {
      return res.status(400).json({
        message:
          'Password must be strong. Include at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol.',
      });
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: `The email "${email}" is already registered.`,
      });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const verificationCode = crypto.randomInt(
      100000,
      999999,
    ); 

    
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      isVerified: false, 
      verificationCode, 
    });

    
    await newUser.save();
    console.log('Sending email to:', email);
    const emailContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 30px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .email-header {
            text-align: center;
            padding-bottom: 20px;
          }
          .email-header h1 {
            color: #4CAF50;
          }
          .email-body {
            font-size: 16px;
            line-height: 1.6;
          }
          .verification-code {
            font-size: 24px;
            font-weight: bold;
            color: #4CAF50;
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            background-color: #e8f5e9;
            border: 1px solid #4CAF50;
            border-radius: 5px;
          }
          .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 14px;
            color: #777;
          }
          .footer a {
            color: #4CAF50;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>Welcome to Our Service, ${name}!</h1>
          </div>
          <div class="email-body">
            <p>Hi ${name},</p>
            <p>Thank you for registering with us. To complete your registration, please use the verification code below:</p>
            <div class="verification-code">${verificationCode}</div>
            <p>Please enter this code on the verification page to activate your account.</p>
            <p>If you did not request this, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>Thank you for choosing us!</p>
            <p>If you have any questions, feel free to <a href="mailto:support@example.com">contact our support team</a>.</p>
          </div>
        </div>
      </body>
    </html>
  `;
    
    await sendEmail({
      email: email,
      subject: 'Verify Your Email Address',
      html: emailContent,
    });

    
    res.status(201).json({
      message:
        'User registered successfully. Please verify your email to activate your account.',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isVerified: newUser.isVerified,
      },
    });
  } catch (error) {
    
    res.status(500).json({
      message: 'Error registering user',
      error: error.message,
    });
    console.error(
      `Error during user registration: ${error}`,
    );
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send('Email and password are required');
    }

    console.log('Login Request Body:', req.body);

    const user = await User.findOne({ email }).select(
      '+password',
    );
    if (!user) {
      console.log('User not found for email:', email);
      return res
        .status(401)
        .send('Invalid email or password');
    }

    console.log('User retrieved from DB:', user);

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      console.log('Invalid password for user:', email);
      return res
        .status(401)
        .send('Invalid email or password');
    }

    const token = signToken(user);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: 'No user found with this email' });
    }

    const resetToken = user.createResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}:

    const message = `Forgot your password? Submit your new password here: ${resetURL}`;

    await sendEmail({
      email: user.email,
      subject:
        'Your Password Reset Link (valid for 10 minutes)',
      text: message,
    });

    return res
      .status(200)
      .json({ message: 'Token sent successfully :)' });
  } catch (err) {
    console.error('Error sending email:', err);

    return res.status(500).json({
      message:
        'There was an error sending the email. Try again later.',
    });
  }
};
exports.ResetPassword = async (req, res) => {
  const hashedtoken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedtoken,
    passwordResetexpires: { $gt: Date.now() },
  });
  if (!user) {
    return res
      .status(400)
      .json({ message: 'Token is invalid or expired' });
  }

  user.password = await bcrypt.hash(req.body.password, 10);

  user.passwordResetToken = undefined;
  user.passwordResetexpires = undefined;
  await user.save();

  const token = signToken(user._id);
  res.status(200).json({ user, token });
};
