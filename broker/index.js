const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()

app.use(cors())
app.use(express.json())

app.post('/events', (req, res) => {
    const data = req.body

    axios.post('http://localhost:4000/events', data)
    axios.post('http://localhost:4001/events', data)
    axios.post('http://localhost:4002/events', data)

    res.send({ success: true })
})


app.listen(5000, () => {
    console.log('App listening on port 5000')
})