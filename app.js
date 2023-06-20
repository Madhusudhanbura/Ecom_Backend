const express = require('express');
const app = express()
const bodyparser = require('body-parser')
const authrouter = require('./routes/auth');
const userrouter = require('./routes/user')
const categoryRouter = require('./routes/category')
const prodRouter = require('./routes/product')
const { default: mongoose } = require('mongoose');
const cookie = require('cookie-parser')
const PORT = process.env.PORT
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
app.use('',prodRouter)
app.listen(PORT,() => {
    console.log('Server is listening');
})



