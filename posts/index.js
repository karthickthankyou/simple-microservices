const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')

const app = express()
const PORT = 4000

const posts = [
    { id: '1', title: 'Karthick is a good writer.' },
    { id: '2', title: 'Karthick is a good boy.' },
]

//Middleware
app.use(cors())
app.use(express.json())

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', (req, res) => {
    console.log(req.body)

    const id = randomBytes(4).toString('hex')
    const { title } = req.body

    posts.push({ id, title })
    res.send({ success: true, posts })
})

app.post('events', (req, res) => {
    console.log(req)
})


app.listen('4000', () => {
    console.log(`Server running on PORT ${PORT}`)

})