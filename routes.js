const express = require('express');
const passport = require('passport');

//Code executes when required. Passport gets configured by just importing its conf.
const passportConfig = require('./config/passport');
const authController = require('./controller/authController');
const grillController = require('./controller/grillController');

//Set up passport authenticator middleware
var requireLogin = passport.authenticate('local', {session: false});
var requireAuth = passport.authenticate('jwt', {session: false});

module.exports = function(app){
    var apiRoute = express.Router(),
    authRoute = express.Router(),
    grillRoute = express.Router();

    apiRoute.use('/auth', authRoute);
    authRoute.post('/register', authController.register);
    authRoute.post('/login', requireLogin, authController.login);
    authRoute.get('/test', requireAuth, (req, res) => {
        res.send({error: 'Success'});
    });

    apiRoute.use('/grill', grillRoute);
    grillRoute.post('/', requireAuth, grillController.CreateGrill);
    grillRoute.get('/', requireAuth, grillController.GetGrills);
    grillRoute.get('/:id', requireAuth, grillController.GetGrillById);
    grillRoute.patch('/:id', requireAuth, grillController.UpdateGrill);
    grillRoute.delete('/:id', requireAuth, grillController.DeleteGrill);

    app.use('/api', apiRoute);
}