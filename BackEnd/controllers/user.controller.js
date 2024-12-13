const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email })) {
      return res
        .status(400)
        .send(`This email "${email}" already exists`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error registering user', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .send('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .send('Invalid email or password');
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.addImage = async (req, res) => {
  try {
    const { userId, imageUrl } = req.body;
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
