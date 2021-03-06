const {ObjectID} = require('mongodb');
const _ = require('lodash');
const {Grill} = require('./../model/grill');

var GetGrillById = (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send({error: 'Object id is invalid'});
    }

    Grill.findOne({
        _id: id,
        user_id: req.user._id
    }).then((grill) => {
        if(!grill){
            return res.status(404).send({error: 'Entity not found'});
        }
        res.send({grill});
    }).catch((e) => {
        res.status(400).send({error: e});
    })
} 

var GetGrills = (req, res) => {
    Grill.find({
        user_id: req.user._id
    }).then((grill) => {
        res.send({grill});
    }).catch((e) => {
        res.status(400).send({error: e});
    })
}

var CreateGrill = (req, res) => {
    var grill = req.body;
    grill.user_id = req.user._id;
    new Grill(grill).save().then((grill) => {
        res.send({grill});
    }).catch((e) => {
        res.status(400).send({error: e});
    });
}

var UpdateGrill = (req, res) => {
    var id = req.params.id;
    var grill_update = _.pick(req.body, ['model', 'description', 'image_url', 'available']);
    console.log(grill_update);

    if(!ObjectID.isValid(id)){
        return res.status(404).send({error: 'Object id is invalid'});
    }

    Grill.findOneAndUpdate({
        _id: id,
        user_id: req.user._id
    }, {$set: grill_update}, {new: true}).then((grill) => {
        if(!grill){
            return res.status(404).send({error: 'Entity not found'});
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send(e);
    });
}

var DeleteGrill = (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send({error: 'Object id is invalid'});
    }

    Grill.findOneAndRemove({
        _id: id,
        user_id: req.user._id
    }).then((grill) => {
        if(!grill){
            return res.status(404).send({error: 'Entity not found'});
        }
        res.send({grill});
    }).catch((e) => {
        res.status(400).send({error: e});
    });
}

module.exports = {
    GetGrillById,
    GetGrills,
    CreateGrill,
    UpdateGrill,
    DeleteGrill
}