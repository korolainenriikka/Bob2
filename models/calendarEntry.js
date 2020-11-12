const mongoose = require('mongoose')

const calendarEntrySchema = new mongoose.Schema({
  dateTime: {
    type: Date,
    required: true
  },
  content: {
    type: String,
    required: true,
  }
})

module.exports =  mongoose.model('CalendarEntry', calendarEntrySchema)