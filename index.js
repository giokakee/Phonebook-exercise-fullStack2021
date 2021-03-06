const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/mongo')
const bodyParser = require('body-parser')
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())




//GET
app.get('/', (req,res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/api/phonebook', async (req,res) => {
    
    try{
        const persons = await Person.find({})
        res.json(persons.map(mp => mp.toJSON()))
    }catch(err){
        console.log('this name already exists or ther problem')
        res.status(404).end()
    }
   
})
app.get('/api/phonebook/:id', (req,res) => {
   res.send({id: req.params.id})
})

//POST

app.post('/api/phonebook', async  (req,res) => {
      let body = req.body 
    console.log('zimbabuee')
      try{
          const person = await new Person ({
              name: body.name,
              number: body.number,
              date: new Date()
            }) 
            await  person.save()
            console.log(`person ${body.name} saved`)
            const post = await Person.find({})
            res.send(post.map(persons => persons.toJSON()))
        } catch(err){
            console.log([{message: err.message},{errorName: err.name}])
        }    
});

app.delete('/api/phonebook/:id', async (req, res, next) => {
     let id = req.params.id
Person.findByIdAndRemove(id)
    .then(removedPerson => {
        Person.find({})
            .then(persons => {
                console.log(`${removedPerson.name} removed`)
                res.send(persons)
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