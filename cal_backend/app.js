require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

// app init
const app = express()
const jsonParser = bodyParser.json()

const cors = require('cors')
app.use(cors())

// mongo init
const mongoose = require('mongoose')

let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

console.log('connecting to MongoDB...')

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// router
const CalendarEntry  = require('./models/calendarEntry')

app.get('/', async (req, res) => {
  const cal = await CalendarEntry.find({})
  res.json(cal)
})

app.get('/api/calendar', async (req, res) => {
  const cal = await CalendarEntry.find({})
  res.json(cal)
})

app.post('/api/calendar', jsonParser, async (req, res) => {
  /*
  format:
  {
    datetime: millis since '70
    content: String
  }
  */
  const body = req.body

  if (!body.content) {
    return res.status(400).json({ 
      error: 'content missing' 
    })
  }

  const entry = new CalendarEntry({
    dateTime: body.dateTime,
    content: body.content,
  })

  await entry.save()

  res.json(entry)
})

app.delete('/api/calendar/:id', async (request, response) => {
  const id = request.params.id

  await CalendarEntry.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = app