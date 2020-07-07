const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()

app.use(cors())
app.use(express.json())

const events = []

app.post('/events', (req, res) => {
    const data = req.body

    events.push(data)

    axios.post('http://localhost:4000/events', data)
    axios.post('http://localhost:4001/events', data)
    axios.post('http://localhost:4002/events', data)
    axios.post('http://localhost:4003/events', data)

    res.send({ success: true })
})

app.get('/events', (req, res) => {
    res.send({ events })
})


app.listen(5000, () => {
    console.log('App listening on port 5000')
})