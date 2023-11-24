const express = require('express')
const routes = require('./routers')
const bodyparser = require('body-parser')
const cors = require('cors')
const connectDB = require('./config')
const app = express()
require('dotenv').config();


connectDB()
app.use(cors())
app.use(bodyparser.json())
app.use('/api',routes)

const PORT = process.env.PORT || 5000;

app.listen(5000,()=>{
    console.log('server is ON');
})