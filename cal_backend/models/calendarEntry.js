const { Mongoose } = require('mongoose')

const mongoose = require('mongoose')

const calendarEntrySchema = new mongoose.Schema({
  dateTime: Date,
  content: String
})

module.exports =  mongoose.model('CalendarEntry', calendarEntrySchema)