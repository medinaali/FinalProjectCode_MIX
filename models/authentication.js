var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var users = require('./users');

/*
 * Initialize the use of Passport in this app
 * @param {Express} app - The Express app this is associated with
 * @returns {Passport} passport - The Passport object for this app.
 */

exports.init = function (app) {
  // If you are using sessions, or Passport sessions, include the middleware
  // For more info: https://github.com/expressjs/session
  app.use(expressSession((
    {secret: 'Tartans', // Sessions will be "signed" to prevent tampering
     resave: false,     // Don't resave session if not saved
     saveUninitialized: true }))); // Save uninitialized session
  // Initialize Passport
  app.use(passport.initialize());
  // Include middleware for Passport sessions.
  app.use(passport.session());
  // Return the Passport object configured here.
  return passport;
}



passport.use(new Strategy(
  function(username, password, done) {
    users.findByUsername(username, function(err, foundUser) {
      if (err) { return done(err); }
      if (!foundUser) { return done(null, false); }
      if (foundUser.password != password) { return done(null, false); }
      return done(null, foundUser);
    });
  }));


passport.serializeUser(function(user, done) {
  // Pass null for no error, and the user ID as a key to lookup the user
  // upon deserialization.
  done(null, user._id);
});


passport.deserializeUser(function(id, done) {
  users.findById(id, function (err, foundUser) {
    // pass back err (if any) and the user object associated with this ID
    done(err, foundUser);
  });
});


