require('dotenv').config()
const express = require ('express')
const app = express()
const cors = require('cors')
const Person = require('./models/mango.js')
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

// morgan middleware
const morgan = require('morgan')
// custom token - returns post data
morgan.token('post-data', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return "-"
})
app.use(morgan('tiny'))
app.use(morgan(':method :url :status :response-time ms :post-data'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// get all entries
app.get('/api/persons', (req,res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

// get length and req time
app.get('/info', (req,res) => {
  const dateNow = new Date()
  res.send(`
    <div>
      Phonebook has info for ${persons.length} people<br>
      ${dateNow.toString()}<br>
    </div>
    `)
})

// get single entry
app.get('/api/persons/:id', (req,res) => {
  Person.findById(req.params.id).then(p => {
    res.json(p)
  })
})

// delete single entry
app.delete('/api/persons/:id', (req,res) => {
  const id = req.params.id
  persons = persons.filter(e => e.id !== id)
  res.status(204).end()
})

// add new entry
app.post('/api/persons', (req,res) => {
  const body = req.body
  if (!body.name) {
    return res.status(400).json({
      error: 'name empty'})
  }
  if (!body.number) {
    return res.status(400).json({
      error: 'number empty'
    })
  }
  const entry = new Person ({
    name: body.name,
    number: body.number
  })
  entry.save().then(saved => {
    res.json(saved)
  })
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
