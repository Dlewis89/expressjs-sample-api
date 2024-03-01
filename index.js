const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fs = require('fs')

const morgan = require('morgan')

require('dotenv').config()

const app = express()

// Connects the db
mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => console.log('db connected'))
    .catch(err => console.error('db connection error', err))

app.use(express.json({limit: '5mb'}))
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: [
        'http://localhost:3000'
    ]
}))

// autoload all routes files dynamically
fs.readdirSync('./routes').map(file => app.use('/api', require(`./routes/${file}`)))
    
const port = process.env.APP_PORT || 8000

app.listen(port, () => 'server is running')