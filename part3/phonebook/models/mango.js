const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
mongoose.set('strictQuery',false)

console.log('connecting')
mongoose.connect(url)
.then(res => {
  console.log('connected!')
})
  .catch(er => {
    console.log('error: ', err.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
