const User = require('../models/user.model');
const validator = require('validator');

exports.addImage = async (req, res) => {
  try {
    const { userId, imageUrl } = req.body;

    if (!validator.isURL(imageUrl)) {
      return res.status(400).send('Invalid image URL');
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.image = imageUrl;
    await user.save();
    res
      .status(200)
      .json({ message: 'Image added successfully', user });
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
};

exports.addPhoneNumber = async (req, res) => {
  try {
    const { userId, PhoneNumber } = req.body;

    if (!validator.isMobilePhone(PhoneNumber, 'any')) {
      return res.status(400).send('Invalid phone number');
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.PhoneNumber = PhoneNumber;
    await user.save();
    res.status(200).json({
      message: 'PhoneNumber added successfully',
      user,
    });
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
};
   


exports.updateName = async (req, res) => {
  try {
    const { userId, name } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found'); 
    }

    user.name = name;
    await user.save();

    res.status(200).json({
      message: 'Name updated successfully',
      user
    });

  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
};

  

exports.updateEmail = async (req, res) => {
  try {
    const { userId, email } = req.body;

    if (!email || !validator.isEmail(email)) {
      return res.status(400).send('Invalid email format');
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).send('This email is already in use');
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.email = email;
    await user.save();

    res.status(200).json({
      message: 'Email updated successfully',
      user
    });

  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
};

