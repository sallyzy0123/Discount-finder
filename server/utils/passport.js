"use strict";
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcryptjs');
const { getUserByEmail } = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();

passport.use(
  new Strategy(
      {
          usernameField: 'email',
          passwordField: 'password',
          session: false,
          passReqToCallback: true
      },

      async (request, email, password, done) => {
        console.log("these are the username and password",{email, password})
          const user = await getUserByEmail(email);
          console.log(user)

          if (!user) {
              return done(null, false);
          }
          const passwordOK = await bcrypt.compare(password, user.Password);
          if (!passwordOK) { 
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user, { message: "Logged In Successfully" });
      }
  )
);
  
  // JWT strategy for handling bearer token
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      (jwtPayload, done) => {
        console.log(jwtPayload);
        return done(null, jwtPayload);
      }
    )
  );

module.exports = passport;