// const User = require('../models/user.model');

// const adminAuth = async (req, res, next) => {
//   try {
//     const userId = req.userId; // Assuming you have userId in your request object
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (user.role !== 'admin') {
//       return res.status(403).json({ message: 'Access denied. Admins only' });
//     }

//     next();
//   } catch (error) {
//     res.status(500).json({ message: 'Error verifying admin access', error: error.message });
//   }
// };

// module.exports = adminAuth;
