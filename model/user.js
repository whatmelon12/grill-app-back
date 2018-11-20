const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema({
    email:{
        type: String,
        require: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate:{
            validator: (value) => {validator.isEmail(value)},
            message:'{VALUE} is not valid email'        
        }
    },
    password:{
        type: String,
        require: true,
        minlength: 6
    },
    firstName: String,
    lastName: String,
    zipCode: String    
},{
    timestamps: true
});

UserSchema.pre('save', function(next){
    var user = this;
    var SALT = 10;

    if(!user.isModified('password')){
        return next();
    }

    //Hashes password with a little salt.
    bcrypt.hash(user.password, SALT).then((hash) => {
        user.password = hash;
        next();
    }).catch((e) => {
        next(e);
    });
})

UserSchema.methods.comparePassword = function(passwordAttempt, next){
    return bcrypt.compare(passwordAttempt, this.password);
}

var User = mongoose.model('User', UserSchema);

module.exports = {User};