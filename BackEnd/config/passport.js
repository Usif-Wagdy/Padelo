const passport = require('passport');
const GoogleStrategy =
  require('passport-google-oauth20').Strategy;
const User = require('../models/user.model');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        '/auth/google/callback', // Use env variable for flexibility
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if Google profile has an email
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(
            new Error(
              'Google profile does not have an email address',
            ),
            null,
          );
        }

        // Find user in the database
        let user = await User.findOne({ email });

        // If user does not exist, create a new one
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email,
            name: `${profile.name.givenName} ${profile.name.familyName}`,
            role: 'user', // Assign default role
          });
        }

        return done(null, user); // User found or created successfully
      } catch (error) {
        console.error('Error in GoogleStrategy:', error);
        return done(error, null); // Pass error to Passport
      }
    },
  ),
);

// Serialize user into the session (if using sessions)
passport.serializeUser((user, done) => {
  done(null, user.id); // Save only user ID in the session
});

// Deserialize user from the session (if using sessions)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Find user by ID
    done(null, user); // Attach user to the request object
  } catch (error) {
    done(error, null); // Handle errors
  }
});

// Export configured passport
module.exports = passport;
