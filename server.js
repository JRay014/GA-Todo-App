const express = require('express');
const logger = require('morgan');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(logger('dev'));

const todoRoutes = require('./routes/todo-routes');
const authRouter = require('./routes/auth-router');

app.use('/todo-routes', todoRoutes);
app.use('/auth-routes', authRouter);

app.use('*', (req, res) => {
    res.status(404).send({error: 'Not Found'});
  });

app.use((err, req, res, next) => {
    console.log(err);
    res.status(error.status || 500).json({
        message: err.message,
        stack: err.stack,
    });
});