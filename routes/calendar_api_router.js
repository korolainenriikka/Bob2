const calendarRouter = require('express').Router()
const CalendarEntry  = require('../models/calendarEntry')

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

calendarRouter.get('/', async (req, res) => {
  const cal = await CalendarEntry.find({})
  res.json(cal)
})

calendarRouter.post('/', jsonParser, (req, res) => {
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

  entry.save()
    .then((entry) => {
      res.json(entry)
    })
    .catch(error => {
      return res.status(400).json({
        error: error
      })
    })
})

calendarRouter.delete('/:id', async (request, response) => {
  const res = await CalendarEntry.findByIdAndRemove(request.params.id)
  if ( !res ) {
    response.status(404).end()
  }
  response.status(204).end()
})

module.exports = calendarRouter