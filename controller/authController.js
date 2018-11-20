const jwt = require('jsonwebtoken');
const _ = require('lodash');

const {User} = require('./../model/user');
const config = require('./../config/config');

var generateToken = (user) => {
    return jwt.sign(user, config.secret, {expiresIn: 10080});
};

var minimizeUser = (user) => {
    return _.pick(user, ['_id', 'email', 'role']);
};

var register = (req, res, next) => {
    user = req.body;
    if(!user.email){
        return res.status(422).send({error: 'You must enter an email address'});
    }

    if(!user.password){
        return res.status(422).send({error: 'You must enter a password'});
    }

    User.findOne({email: user.email}).then((existingUser) => {
        if(existingUser){
            return res.status(422).send({error: 'Email already in use'});
        }

        var newUser = new User(user);
        newUser.save().then((user) => {
            var userInfo = minimizeUser(user);
            res.status(201).send({
                token: 'bearer ' + generateToken(userInfo),
                user: userInfo 
            });
        }).catch((e) => {
            next(e);
        });
    });
};

var login = (req, res) => {
    var userInfo = minimizeUser(req.user);
    res.status(201).send({
        token: 'bearer ' + generateToken(userInfo),
        user: userInfo 
    });
}

module.exports = {
    login, 
    register
};