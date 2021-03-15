const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');
const app = express();
const path = require('path');
const helmet = require('helmet');
const Ddos = require('ddos');
var ddos = new Ddos({burst:10, limit:15})


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.log(err));

app.use(ddos.express);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);


module.exports = app;