const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
let phonebook = [
    {   
        id:1,
        name: "kakee",
        number: 300499588,
        date: new Date()
    },
    {
        id:2,
        name: "second",
        number: 300499588,
        date: new Date()
    },
    {
        id:3,
        name: "third",
        number: 300499588,
        date: new Date()
    },
    {
        id:4,
        name: "fourth",
        number: 324324324,
        date: new Date()
    }
]

//GET
app.get('/', (req,res) => {
    res.send('<h1>Hello world</h1>')
})
app.get('/api/phonebook', (req,res) => {
       
   res.json(phonebook)
})
app.get('/api/phonebook/:id', (req,res) => {
    let id = req.params.id
    let person = phonebook.find(person => person.id == id)
     if(person){
        res.json(person)
     }else{
         res.status(404).end('this person does not exists')
     }
})

//POST
const generatedId = () => {
    let maxId = phonebook.length > 0
    ?Math.max(...phonebook.map(mp => mp.id)) 
       : 0
    return maxId + 1
}
app.post('/api/phonebook', (req,res) => {
    let body = req.body
    
    if(!body.name || !body.number){
        res.status(404).end('content is missing')
    }else if(phonebook.find(p => p.name == body.name)){
        res.status(404).end('this person already exists')
    }else{
        const newPerson = {
            id: generatedId(),
            name: body.name,
            number: body.number,
            date: new Date()
        }   
       phonebook = phonebook.concat(newPerson)
       res.send(phonebook)
    }
       
})

app.delete('/api/phonebook/:id', (req, res) => {
    let id = Number(req.params.id)

    phonebook = phonebook.filter(filt => filt.id!==id)
    res.send(phonebook)
})





const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)


  const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})