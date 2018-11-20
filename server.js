const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const {mongoose} = require('./db/mongoose');
const apiRouter = require('./routes');

const port = process.env.port || 3000;

var app = express();
app.use(bodyParser.json());
app.use(cors());

apiRouter(app);

app.listen(port, () => {
    console.log(`Started in port ${port}`);
})