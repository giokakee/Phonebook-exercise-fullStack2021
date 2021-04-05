require('dotenv').config()
const mongoose = require('mongoose')



const url = process.env.url

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


const PersonSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    number: String,
    date: Date
})

PersonSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
module.exports = mongoose.model('Person', PersonSchema)