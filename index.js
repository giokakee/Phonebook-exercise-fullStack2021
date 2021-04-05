const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const Person = require('./models/mongo')
const mongoose = require('mongoose')



app.use(express.json())
app.use(cors())
app.use(express.static('build'))


//GET
app.get('/', (req,res) => {
    res.send('<h1>Hello world</h1>')
})
app.get('/api/phonebook', async (req,res) => {
 try{
     const post = await Person.find({})
     res.json(post)
 } catch(err){
     res.json({message: err})
 }
})
app.get('/api/phonebook/:id', (req,res) => {
    // let id = req.params.id
    // let person = phonebook.find(person => person.id == id)
    //  if(person){
    //     res.json(person)
    //  }else{
    //      res.status(404).end('this person does not exists')
    //  }
})

//POST
// const generatedId = () => {
//     let maxId = phonebook.length > 0
//     ?Math.max(...phonebook.map(mp => mp.id)) 
//        : 0
//     return maxId + 1
// }
app.post('/api/phonebook', async  (req,res) => {
      let body = req.body 
      try{
          const person = await new Person ({
              name: body.name,
              number: body.number,
              date: new Date()
            }) 
            await  person.save()
            console.log('zimbabue')
            console.log(`person ${body.name} saved`)
            const post = await Person.find({})
            res.json(post)
        } catch(err){
            res.json({message: err})
        }    
});

app.delete('/api/phonebook/:id', async (req, res, next) => {
     let id = req.params.id
Person.findByIdAndRemove(id)
    .then(removedPerson => {
        Person.find({})
            .then(persons => {
                console.log(`${removedPerson.name} removed`)
                res.json(persons)
            }).catch(err => next(err))
    }).catch(err => {
        next(err)
    })
});





const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)


  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
  app.use(errorHandler)


  const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})