const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')

const app = express()
const jsonParser = bodyParser.json()

app.use(cors())

let cal = [
  {
    "date": "23/10/2020",
    "time": "11:10",
    "content": "hampsulääksy",
    "id": 132
  },
]

const generateId = () => {
  const maxId = cal.length > 0
    ? Math.max(...cal.map(n => n.id))
    : 0
  return maxId + 1
}


app.get('/', (req, res) => {
  res.json(cal)
})

app.get('/calendar', (req, res) => {
  res.json(cal)
})

app.post('/calendar', jsonParser, (req, res) => {
  const body = req.body
  console.log(req)

  if (!body.content) {
    return res.status(400).json({ 
      error: 'content missing' 
    })
  }

  const entry = {
    date: body.date,
    time: body.time,
    content: body.content,
    id: generateId(),
  }

  cal = cal.concat(entry)

  res.json(entry)
})

app.delete('/calendar/:id', (request, response) => {
  const id = Number(request.params.id)
  cal = cal.filter(cal => cal.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
