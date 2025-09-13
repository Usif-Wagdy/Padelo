const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const sendEmail = require('./../email');
const crypto = require('crypto');
const mongoose = require('mongoose');

const signToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      role: user.role,
      image: user.image,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
};

exports.addUser = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    if (!name || name.trim() === '') {
      throw new Error('Name is required');
    }

    if (!email || !validator.isEmail(email)) {
      throw new Error('A valid email is required');
    }

    if (
      !password ||
      !validator.isStrongPassword(password)
    ) {
      throw new Error(
        'Password must be strong. Include at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol.',
      );
    }

    const existingUser = await User.findOne({
      email,
    }).session(session);
    if (existingUser) {
      throw new Error(
        `The email ${email} is already registered.`,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = crypto.randomInt(
      100000,
      999999,
    );
    const verificationCodeExpires =
      Date.now() + 5 * 60 * 1000;

    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      isVerified: false,
      emailVerificationCode: verificationCode,
      verificationCodeExpires: verificationCodeExpires,
    });

    await newUser.save({ session });

    console.log('Sending email to:', email);

    const emailContent = `
    <!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Email Verification</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <style>
      @media (prefers-color-scheme: dark) {
        .bg-body { background-color: #0b1220 !important; }
        .bg-card { background-color: #111827 !important; }
        .text-main { color: #e5e7eb !important; }
        .text-muted { color: #9ca3af !important; }
        .btn {
          background-color: #10b981 !important;
          color: #0b1220 !important;
        }
        .btn:hover { background-color: #0ea271 !important; }
        .divider { border-color: #1f2937 !important; }
      }
      @media only screen and (max-width: 600px) {
        .container { width: 100% !important; }
        .p-24 { padding: 16px !important; }
        .mb-24 { margin-bottom: 16px !important; }
      }
    </style>
  </head>
  <body class="bg-body" style="margin:0; padding:0; background:#f3f4f6;">
    <!-- Preheader text -->
    <div style="display:none; font-size:1px; color:#f3f4f6; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
      Verify your email address to activate your Padelo account.
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td align="center" style="padding: 24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="container" style="width:600px; max-width:100%; background:#ffffff; border-radius:14px; box-shadow:0 10px 30px rgba(0,0,0,0.06); overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="padding: 24px 24px 0 24px; background: linear-gradient(180deg, #ecfdf5 0%, #ffffff 65%);">
                <div style="font-family: Arial, Helvetica, sans-serif; font-size:20px; font-weight:700; color:#0f172a;">
                  Padelo
                </div>
                <div style="height: 8px;"></div>
                <h1 class="text-main" style="margin:0; font-family: Arial, Helvetica, sans-serif; font-size:24px; line-height:32px; color:#111827;">
                  Verify Your Email
                </h1>
                <div style="height: 16px;"></div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td class="bg-card p-24" style="padding:24px; background:#ffffff;">
                <p class="text-main" style="margin:0 0 12px 0; font-family: Arial, Helvetica, sans-serif; font-size:16px; line-height:24px; color:#111827;">
                  Hi <strong>${name}</strong>,
                </p>
                <p class="text-muted" style="margin:0 0 16px 0; font-family: Arial, Helvetica, sans-serif; font-size:15px; line-height:24px; color:#4b5563;">
                  Thanks for joining Padelo! Please confirm your email by entering the verification code below. This helps us secure your account and get you started right away.
                </p>

                <!-- Verification Code -->
                <div style="text-align:center; margin:24px 0;">
                  <div class="verification-code"
                    style="display:inline-block; font-size:24px; font-weight:bold; color:#10b981; background:#ecfdf5; border:1px solid #10b981; padding:12px 24px; border-radius:8px; font-family:Arial, Helvetica, sans-serif;">
                    ${verificationCode}
                  </div>
                </div>

                <p class="text-muted" style="margin:0 0 16px 0; font-family: Arial, Helvetica, sans-serif; font-size:13px; line-height:20px; color:#6b7280; text-align:center;">
                  Enter this code on your profile page after login to activate your account.
                </p>

                <hr class="divider" style="border:none; border-top:1px solid #e5e7eb; margin:24px 0;">
                <p class="text-muted" style="margin:0; font-family: Arial, Helvetica, sans-serif; font-size:13px; line-height:20px; color:#6b7280;">
                  Didn’t sign up? You can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 20px; background:#f9fafb; text-align:center;">
                <p class="text-muted" style="margin:0 0 8px 0; font-family: Arial, Helvetica, sans-serif; font-size:12px; line-height:18px; color:#6b7280;">
                  Need help? <a href="mailto:padeloteamcs@gmail.com" style="color:#10b981; text-decoration:none;">Contact support</a>
                </p>
                <p class="text-muted" style="margin:0; font-family: Arial, Helvetica, sans-serif; font-size:12px; line-height:18px; color:#9ca3af;">
                  © ${new Date().getFullYear()} Padelo. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;

    await sendEmail({
      email: email,
      subject: 'Verify Your Email Address',
      html: emailContent,
    });

    await session.commitTransaction();
    session.endSession();

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
    await session.abortTransaction();
    session.endSession();

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
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const resetEmailContent = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Password Reset</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Preheader (hidden preview text in inbox) -->
    <meta name="x-apple-disable-message-reformatting">
    <style>
      /* Dark mode support (some clients) */
      @media (prefers-color-scheme: dark) {
        .bg-body { background-color: #0b1220 !important; }
        .bg-card { background-color: #111827 !important; }
        .text-main { color: #e5e7eb !important; }
        .text-muted { color: #9ca3af !important; }
        .btn {
          background-color: #10b981 !important;
          color: #0b1220 !important;
        }
        .btn:hover { background-color: #0ea271 !important; }
        .divider { border-color: #1f2937 !important; }
      }
      /* Mobile tweaks */
      @media only screen and (max-width: 600px) {
        .container { width: 100% !important; }
        .p-24 { padding: 16px !important; }
        .mb-24 { margin-bottom: 16px !important; }
      }
    </style>
  </head>
  <body class="bg-body" style="margin:0; padding:0; background:#f3f4f6;">
    <!-- Preheader text (hidden) -->
    <div style="display:none; font-size:1px; color:#f3f4f6; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
      Reset your password — this link expires in 10 minutes.
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td align="center" style="padding: 24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="container" style="width:600px; max-width:100%; background:#ffffff; border-radius:14px; box-shadow:0 10px 30px rgba(0,0,0,0.06); overflow:hidden;">
            <!-- Header -->
            <tr>
              <td align="center" style="padding: 24px 24px 0 24px; background: linear-gradient(180deg, #ecfdf5 0%, #ffffff 65%);">
                <!-- Logo (optional) -->
                <div style="font-family: Arial, Helvetica, sans-serif; font-size:20px; font-weight:700; color:#0f172a;">
                  Padelo
                </div>
                <div style="height: 8px;"></div>
                <h1 class="text-main" style="margin:0; font-family: Arial, Helvetica, sans-serif; font-size:24px; line-height:32px; color:#111827;">
                  Password Reset Request
                </h1>
                <div style="height: 16px;"></div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td class="bg-card p-24" style="padding:24px; background:#ffffff;">
                <p class="text-main" style="margin:0 0 12px 0; font-family: Arial, Helvetica, sans-serif; font-size:16px; line-height:24px; color:#111827;">
                  Hi <strong>${user.name}</strong>,
                </p>
                <p class="text-muted" style="margin:0 0 16px 0; font-family: Arial, Helvetica, sans-serif; font-size:15px; line-height:24px; color:#4b5563;">
                  We received a request to reset your password. Click the button below to set a new one. This link is valid for <strong>10 minutes</strong>.
                </p>

                <!-- Button (with VML fallback for Outlook) -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:24px auto;">
                  <tr>
                    <td align="center">
                      <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${resetURL}" arcsize="12%" strokecolor="#10b981" strokeweight="1px" fillcolor="#10b981" style="height:48px; v-text-anchor:middle; width:260px;">
                          <w:anchorlock/>
                          <center style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold;">
                            Reset Your Password
                          </center>
                        </v:roundrect>
                      <![endif]-->
                      <!--[if !mso]><!-- -->
                      <a href="${resetURL}" class="btn"
                        style="display:inline-block; background:#10b981; color:#ffffff; text-decoration:none; font-family:Arial, Helvetica, sans-serif; font-weight:700; font-size:16px; line-height:48px; height:48px; padding:0 24px; border-radius:10px; border:1px solid #0ea371;">
                        Reset Your Password
                      </a>
                      <!--<![endif]-->
                    </td>
                  </tr>
                </table>

                <!-- Fallback link -->
                <p class="text-muted" style="margin:0 0 8px 0; font-family: Arial, Helvetica, sans-serif; font-size:13px; line-height:20px; color:#6b7280; text-align:center;">
                  If the button doesn’t work, copy and paste this link into your browser:
                </p>
                <p style="margin:0 0 16px 0; font-family: Arial, Helvetica, sans-serif; font-size:13px; line-height:20px; color:#2563eb; word-break:break-all; text-align:center;">
                  <a href="${resetURL}" style="color:#2563eb; text-decoration:underline;">${resetURL}</a>
                </p>

                <hr class="divider" style="border:none; border-top:1px solid #e5e7eb; margin:24px 0;">
                <p class="text-muted" style="margin:0; font-family: Arial, Helvetica, sans-serif; font-size:13px; line-height:20px; color:#6b7280;">
                  Didn’t request this change? You can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 20px; background:#f9fafb; text-align:center;">
                <p class="text-muted" style="margin:0 0 8px 0; font-family: Arial, Helvetica, sans-serif; font-size:12px; line-height:18px; color:#6b7280;">
                  Need help? <a href="mailto:padeloteamcs@gmail.com" style="color:#10b981; text-decoration:none;">Contact support</a>
                </p>
                <p class="text-muted" style="margin:0; font-family: Arial, Helvetica, sans-serif; font-size:12px; line-height:18px; color:#9ca3af;">
                  © ${new Date().getFullYear()} Padelo. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      html: resetEmailContent,
    });

    return res.status(200).json({
      message: 'email has been sent successfully',
    });
  } catch (err) {
    console.error('Error sending email:', err);

    return res.status(500).json({
      message:
        'There was an error sending the email. Try again later.',
    });
  }
};

exports.ResetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      // ✅ Use the correct field name (capital E)
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Token is invalid or expired' });
    }

    if (!req.body.password) {
      return res
        .status(400)
        .json({ message: 'Password is required' });
    }

    // (Optional) enforce strength here as well, for safety
    // if (!validator.isStrongPassword(req.body.password)) {
    //   return res.status(400).json({ message: 'Password must be strong...' });
    // }

    user.password = await bcrypt.hash(
      req.body.password,
      10,
    );

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    // ✅ pass the full user object (or re-fetch minimal fields) to signToken
    const token = signToken(user);

    // (Optional) avoid returning password field; make sure your schema excludes it by default
    res.status(200).json({ user, token });
  } catch (err) {
    console.error('ResetPassword error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message:
          'Both current and new password are required',
      });
    }

    const user =
      await User.findById(userId).select('+password');
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: 'Current password is incorrect' });
    }

    if (!validator.isStrongPassword(newPassword)) {
      return res.status(400).json({
        message:
          'New password must be strong. Include at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol.',
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res
      .status(200)
      .json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(
      'Error changing password:',
      error.message,
    );
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: 'User not found' });
    }
    const token = signToken(user);
    console.log(code, user.verificationCode);
    if (
      user.emailVerificationCode !== code ||
      user.verificationCodeExpires < Date.now()
    ) {
      return res.status(400).json({
        error: 'Invalid or expired verification code',
      });
    }

    user.isVerified = true;
    user.emailVerificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    res.status(200).json({
      message: 'Email verified successfully',
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ error: 'User not found' });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ error: 'Email is already verified' });
    }

    if (user.verificationCodeExpires < Date.now()) {
      const verificationCode = crypto.randomInt(
        100000,
        999999,
      );
      const verificationCodeExpires =
        Date.now() + 5 * 60 * 1000;

      user.emailVerificationCode = verificationCode;
      user.verificationCodeExpires =
        verificationCodeExpires;

      await user.save();

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
                <h1>Verify Your Email Address, ${user.name}!</h1>
              </div>
              <div class="email-body">
                <p>Hi ${user.name},</p>
                <p>It seems like you didn't complete the email verification. Here is your new verification code:</p>
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
        email: user.email,
        subject: 'Verify Your Email Address',
        html: emailContent,
      });

      return res.status(200).json({
        message:
          'A new verification code has been sent to your email.',
      });
    } else {
      return res.status(400).json({
        error:
          'Your verification code is still valid. Please check your inbox.',
      });
    }
  } catch (error) {
    console.error(
      'Error during resend verification code:',
      error,
    );
    res
      .status(500)
      .json({ error: 'Error resending verification code' });
  }
};
