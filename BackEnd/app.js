const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('./config/passport');

const courtRouter = require('./routes/court.routes');
const reservationRouter = require('./routes/reservation.routes');
const userRouter = require('./routes/user.routes');
const adminCourtRouter = require('./routes/admin.courts.routes');
const adminUserRouter = require('./routes/admin.users.routes');
const authRouter = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use('/api/courts', courtRouter);
app.use('/api/reservations', reservationRouter);
app.use('/api/users', userRouter);
app.use('/admin/users', adminUserRouter);
app.use('/admin/courts', adminCourtRouter);
app.use('/auth', authRouter);

module.exports = app;
