const express = require('express');
bodyParser = require('body-parser'),
cors = require('cors');


// serveur
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
var corsOptions = {
    origin: process.env.corsOrigin
  }
  app.use(cors(corsOptions));

// erreur cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


// definition des routes de user
const UserRoute = require('./routes/user.route')
app.use('/api/auth',UserRoute)

// definition des routes des commentaires
const TaskRoute = require('./routes/task.route')
app.use('/api/task',TaskRoute)

module.exports = app;