const mongoose = require('mongoose');
const validator = require('validator');

var GrillSchema = mongoose.Schema({
    user_id: String,
    model: String,
    description: {
        type: String,
        require: true,
        minlenght: 1
    },
    image_url: {
        type: String,
        require: true,
        minlenght: 1
        // validate: {
        //     validator: (value) => {validator.isDataURI(value)},
        //     message:'{VALUE} is not a valid url'
        // }
    },
    available: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
});

var Grill = mongoose.model('Grill', GrillSchema);

module.exports = {Grill};