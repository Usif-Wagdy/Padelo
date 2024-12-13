const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const app = express();
const courtRouter = require('./routes/court.routes');
const reservationRouter = require('./routes/reservation.routes');
const userRouter = require('./routes/user.routes');

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/courts', courtRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/users', userRouter);

module.exports = app;
