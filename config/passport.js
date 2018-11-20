const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const {User} = require('./../model/user');
const config = require('./config');

var localOptions = {
    usernameField: 'email'
};

//Configure local strategy (email and password)
var localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({email: email}).then((user) => {
        if(!user){
            return done(null, false, {error: 'Login failed. Please try again.'});
        }

        user.comparePassword(password).then((isMatch) => {
            if(!isMatch){
                return done(null, false, {error: 'Login failed. Please try again.'});
            }
             //Sets request user field equal to logged user.
            return done(null, user);
        }).catch((e) => {
            return done(e);
        });
    });
});

//This object is as it is. Defined by passport for jwtOptions
var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
};

var jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload._id).then((user) => {
        if(!user){
            return done(null, false);
        }
        //Sets request user field equal to logged user.
        return done(null, user);
    }).catch((e) => {
        return done(e);
    });
});

passport.use(localLogin);
passport.use(jwtLogin);