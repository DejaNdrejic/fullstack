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


// get all entries
app.get('/api/persons', (req,res) => {
  Person.find({}).then(p => {
    res.json(p)
  })
})

// get length and req time
app.get('/info', async (req,res) => {
  const dateNow = await new Date()
  const dbLength = await Person.countDocuments({})
  res.send(`
    <div>
      Phonebook has info for ${dbLength} people<br>
      ${dateNow.toString()}<br>
    </div>
    `)
})

// get single entry
app.get('/api/persons/:id', (req,res,next) => {
  Person.findById(req.params.id)
    .then(p => {
    res.json(p)
  })
  .catch(err => next(err))
})

// delete single entry
app.delete('/api/persons/:id', (req,res,next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

// add new entry
// if contact exists update it
app.post('/api/persons', async (req,res) => {
  const {name, number} = req.body
  if (!name || !number) {
    return res.status(400).json({
      error: 'name and number required'})
  }
  let contact = await Person.findOne({name})
  if (contact) {
  //update
    contact.number = number
    const updated = await contact.save()
        res.json(updated)
  } else {
    //create new
    contact = await Person.create ({name, number })
      res.json(contact)
    }
})

// update entry
app.put('/api/persons/:id', (req,res) => {
  const {name, number} = req.body
  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    {new: true, context: 'query'}
  )
  .then(updated => {
    if (updated) {
      res.json(updated)
    } else { res.status(404).end()}
  })

})

// middleware for handling unsuported routes
// must be last loaded(before error handling)
const unknownEnd = (req,res) => {
  res.status(404).send({err: 'unknown endpoint'})
}
app.use(unknownEnd)

// invalid id error handling
const errorHandle = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({err: 'malformatted id'})
  }
  next(err)
}
// has to be last loaded
app.use(errorHandle)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})


