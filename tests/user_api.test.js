const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

test('created user can log in', async () => {
  const newUser = {
    username: 'testijäbä',
    password: 'salainen'
  }

  await api
    .post('/api/users/new')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .post('/api/users/login')
    .send(newUser)
    .expect(200)

  expect(response).not.toBe(null)
})

test('false credentials cannot log in', async () => {
  const newUser = {
    username: 'testijäbä',
    password: 'huonosalis'
  }

  const falseLogin = {
    username: 'testiijäbä',
    password: 'vääräsalis'
  }

  await api
    .post('/api/users/new')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/users/login')
    .send(falseLogin)
    .expect(401)
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close()
  done()
})

