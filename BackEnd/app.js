const express = require('express');
const morgan = require('morgan');
const app = express();
const courtRouter = require('./routes/courtRoutes');

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/courts', courtRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Padel Court API');
});

module.exports = app;
