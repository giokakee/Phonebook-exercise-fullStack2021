require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')



const URL = process.env.URL
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


const PersonSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    number: String,
    date: Date
})

PersonSchema.plugin(uniqueValidator)

PersonSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
module.exports = mongoose.model('Person', PersonSchema)