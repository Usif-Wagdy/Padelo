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
