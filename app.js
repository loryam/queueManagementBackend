const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

/*   skeleton project taken from Brad Traversy https://github.com/bradtraversy/nodeauthapp  */

// Connect To Database
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

// Port Number
const port = process.env.port | 3000;

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Routes
const users = require('./routes/users');
app.use('/users', users);

const facilities = require('./routes/facilities');
app.use('/facilities', facilities);

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
