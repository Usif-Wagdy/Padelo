// This middleware handles authentication by verifying JWT tokens
// It extracts the token from the Authorization header and validates it
// If valid, it adds the decoded user data to the request object
// If invalid or missing, it returns an appropriate error response

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Extract token from Authorization header and remove 'Bearer ' prefix
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, 'mohamed-hosam-is-creating-now-the-ultra-secured-password-in-the-world');
    // Add decoded user data to request object
    req.user = decoded;
    // Continue to next middleware/route handler
    next();
  } catch (err) {
    // Return error if token is invalid
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = authMiddleware;