const express = require('express');
const app = express()
const bodyparser = require('body-parser')
const authrouter = require('./routes/auth');
const { default: mongoose } = require('mongoose');
require('dotenv').config()

mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('DB CONNECTED'))
    .catch(() => console.log('ERROR CONNECTING DB'));
app.use(bodyparser.json())
app.use('/home',authrouter)
app.listen(3000,() => {
    console.log('Server is listening');
})



