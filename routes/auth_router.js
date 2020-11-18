const authRouter = require('express').Router()

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const User = require('../models/user')

const bcrypt = require('bcrypt')

authRouter.post('/new', jsonParser, async(req, res) => {
  const body = req.body

  if (!body.username || !body.password) {
    return res.status(400).json({
      error: 'username or password missing'
    })
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(body.password, salt)

  const user = new User({
    username: body.username,
    passwordHash: hash
  })

  user.save()
    .then((user) => {
      res.json(user)
    })
    .catch(error => {
      return res.status(400).json({
        error: error
      })
    })
})

authRouter.post('/login', jsonParser, async(req, res) => {
  console.log('auth routeris')
  const credentials = req.body

  if (!credentials.username || !credentials.password) {
    return res.status(400).json({
      error: 'username or password missing'
    })
  }
  console.log('credsut kunnos')

  const user = await User.findOne({ username: credentials.username })
  console.log(user)
  if (!user) {
    res.status(401).end()
  } else {
    const passwordCorrect = await bcrypt.compare(credentials.password, user.passwordHash)

    if (passwordCorrect) {
      res.status(200).json({
        token: process.env.TOKEN
      })
    } else {
      res.status(401).end()
    }
  }
})

module.exports = authRouter