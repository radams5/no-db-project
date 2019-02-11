const express = require('express')
const ctrl = require('./controller')

const app = express()

app.use(express.json())

//Endpoints

app.get('/api/shoes', ctrl.getShoes)

app.post('/api/shoes', ctrl.createShoe)

app.delete('/api/shoes/:id', ctrl.deleteShoes)
app.put('/api/shoes/:id/bid', ctrl.increaseBid)
app.put('/api/shoes/:id/condition', ctrl.updateCondition)


//
const port = 3001
app.listen(port, () => console.log('polishing  your shoes'))