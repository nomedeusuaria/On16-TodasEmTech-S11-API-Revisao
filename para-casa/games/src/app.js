const express = require('express');
const app = express();
const gameRoutes = require('./routes/gamesRoutes');

app.use(express.json());
app.use('/games', gameRoutes);

module.exports = app