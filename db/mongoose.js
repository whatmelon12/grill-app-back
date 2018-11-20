var mongoose = require('mongoose');

//Configure mongoose to use built in Promise engine.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://omarg:whatmelon12@ds213259.mlab.com:13259/grill-app', 
    { useNewUrlParser: true }, 
    (err) => {
    if(err){
        console.log(`Unable to connect to server. ${err}`);
    }
});

module.exports = {mongoose};