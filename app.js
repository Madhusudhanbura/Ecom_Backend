const express = require('express');
const app = express()
const bodyparser = require('body-parser')
const authrouter = require('./routes/auth');
const userrouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const { default: mongoose } = require('mongoose');
const cookie = require('cookie-parser')
require('dotenv').config()

mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('DB CONNECTED'))
    .catch(() => console.log('ERROR CONNECTING DB'));
app.use(bodyparser.json())
app.use(cookie())
app.use('',authrouter)
app.use('',userrouter)
app.use('',categoryRouter)
app.listen(3000,() => {
    console.log('Server is listening');
})



