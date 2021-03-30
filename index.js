const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3001


app.use(express.json())

let phonebook = [
    {   
        id:1,
        name: "kakee",
        number: 579009135,
        date: new Date()
    },
    {
        id:2,
        name: "second",
        number: 579009135,
        date: new Date()
    },
    {
        id:3,
        name: "third",
        number: 579009135,
        date: new Date()
    }
]

//GET
app.get('/', (req,res) => {
    res.send('<h1>Hello world</h1>')
})
app.get('/phonebook', (req,res) => {
    res.json(phonebook)
})
app.get('/phonebook/:id', (req,res) => {
    let id = req.params.id
    let person = phonebook.find(person => person.id == id)
    res.send(person)
})

//POST
const generatedId = () => {
    let maxId = phonebook.length > 0
    ?Math.max(...phonebook.map(mp => mp.id)) 
       : 0
    return maxId + 1
}
app.post('/phonebook', (req,res) => {
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

app.delete('/phonebook/:id', (req, res) => {
    let id = Number(req.params.id)

    phonebook = phonebook.filter(filt => filt.id!==id)
    res.send(phonebook)
})





const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)


app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})