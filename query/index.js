const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/query', (req, res) => {

})

app.post('events', (req, res) => {
    console.log(req)
})

