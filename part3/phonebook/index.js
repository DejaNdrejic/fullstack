const express = require ('express')
const app = express()
const cors = require('cors')
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
  res.json(persons)
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
  const id = req.params.id
  const entry = persons.find(e => e.id === id)
  if (entry) {
    res.json(entry)
  } else { res.status('404').end}

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
      error: 'number empty'})
  }
  if (persons.some(p => p.name === body.name)) {
    return res.status(400).json({
      error: 'name already in the phonebook'})
  }
  const  newId = Math.floor(Math.random() * (1000000 - 0 + 1) + 0)
  console.log(newId)
  const entry = {
    id: newId,
    name: body.name,
    number: body.number
  }
  persons = persons.concat(entry)
  res.json(entry)
})

const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
