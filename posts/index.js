const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')
const axios = require('axios')

const app = express()
const PORT = 4000

const posts = []


//Middleware
app.use(cors())
app.use(express.json())

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', async (req, res) => {
    console.log(req.body)

    const id = randomBytes(4).toString('hex')
    const { title } = req.body

    const data = { id, title }

    posts.push(data)
    await axios.post('http://localhost:5000/events',
        { type: 'post_created', data }
    )
    res.send({ success: true, posts })
})

app.post('/events', (req, res) => {
    // console.log(req.body)
})


app.listen('4000', () => {
    console.log(`Server running on PORT ${PORT}`)

})