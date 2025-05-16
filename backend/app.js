const express = require('express')
const app = express()
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const connectToDB = require('./config/db')
connectToDB();
const cors = require('cors')


app.use(express.json())
app.use(cors())

app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
    res.send(`Hello Guys`);
})


module.exports = app;