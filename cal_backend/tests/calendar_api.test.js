const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const calendarEntry = require('../models/calendarEntry')

const api = supertest(app)

beforeEach(async () => {
  await calendarEntry.deleteMany({})
})

test('calendar returned as json', async () => {
  await api
    .get('/api/calendar')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('entry added to calendar is found in database', async () => {
  const entryToAdd = new calendarEntry({
    dateTime: new Date(),
    content: 'this is a test event!'
  })._doc

  await api
    .post('/api/calendar')
    .send(entryToAdd)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/calendar')
  const calendarInDb = response.body
  const contents = calendarInDb.map(c => c.content)

  expect(calendarInDb.length).toBe(1)
  expect(contents).toContain('this is a test event!')
})

test('post without content is not added to database', async () => {
  await api
    .post('/api/calendar')
    .send({})
    .expect(400)

    const response = await api.get('/api/calendar')
    const calendarInDb = response.body
    expect(calendarInDb.length).toBe(0)
})

test('post without required fields is not added to database', async () => {
  const entryToAdd = new calendarEntry({
    content: 'this is a test event!'
  })._doc

  await api
    .post('/api/calendar')
    .send(entryToAdd)
    .expect(400)

    const response = await api.get('/api/calendar')
    const calendarInDb = response.body
    expect(calendarInDb.length).toBe(0)
})

test('delete removes entry from database', async () => {
  const entryToAdd = new calendarEntry({
    dateTime: new Date(),
    content: 'this is a test event!'
  })._doc

  const res = await api
    .post('/api/calendar')
    .send(entryToAdd)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  await api
    .delete(`/api/calendar/${res.body._id}`)
    .expect(204)

  const calendarInDb = await calendarEntry.find({})
  expect(calendarInDb.length).toBe(0)
})

test('delete with nonexistent id response 404 not found', async () => {
  await api
    .delete(`/api/calendar/5f9a93887b894a2a736fa025`)
    .expect(404)
})

afterAll(() => {
  mongoose.connection.close()
})