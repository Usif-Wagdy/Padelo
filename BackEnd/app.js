const express = require('express');
const morgan = require('morgan');
const app = express();
const courtRouter = require('./routes/court.routes');
const reservationRouter = require('./routes/reservation.routes');

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/courts', courtRouter);
app.use('/api/reservations', reservationRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Padel Court API');
});

module.exports = app;
