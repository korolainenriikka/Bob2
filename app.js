require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const calendarRouter = require('./routes/calendar_api_router')
const authRouter = require('./routes/auth_router')

app.use(cors())
app.use(express.static('build'))

const mongoose = require('mongoose')

let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

console.log('connecting to MongoDB...')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// router

app.use('/api/calendar', calendarRouter)
app.use('/api/users', authRouter)

module.exports = app