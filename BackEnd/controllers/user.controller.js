const User = require('../models/user.model');
const validator = require('validator');
const mongoose = require('mongoose');

exports.addImage = async (req, res) => {
  try {
    const userId = req.params.id.trim();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ error: 'Invalid user ID format' });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ error: 'No photo uploaded' });
    }

    const imageUrl = req.file.path;

    const updatedUser = await exports.updateUserPhoto(
      userId,
      imageUrl,
    );

    res.status(200).json({
      message: 'Photo uploaded successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Photo upload failed' });
  }
};

exports.updateUserPhoto = async (userId, imageUrl) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: imageUrl },
      { new: true },
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  } catch (error) {
    console.error(
      'Error updating user photo:',
      error.message,
    );
    throw error;
  }
};



const escapeHtml = (str) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

exports.updateUser = async (req, res) => {
  try {
    userId = req.user.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const updatedData = req.body;


    const restrictedFields = ['password', '_id', 'googleId', 'isVerified', 'role'];
    restrictedFields.forEach(field => delete updateData[field]);
    const sanitizedData = {};
    Object.keys(updatedData).forEach(key => {
      if (restrictedFields.includes(key)) {
        return;
      }
      sanitizedData[key] = escapeHtml(updatedData[key]);
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: sanitizedData },
      { new: true, runValidators: true },
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user,
    });


  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }

}



exports.checkAuth = async (req, res) => {
  try {

    userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User authenticated successfully',
      user,
    });


  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Server Error' });
  }

}

