const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()

const PORT = 4001

//In memory data
const comments = []

// Middleware
app.use(cors())
app.use(express.json())


app.get('/posts/:id/comments', (req, res) => {
    const { id } = req.params
    const com = comments.filter(comment => comment.postId === id)
    res.send(com)
})

app.post('/posts/:id/comments', async (req, res) => {
    const { id: postId } = req.params
    const id = randomBytes(4).toString('hex')
    const { text } = req.body
    const data = { id, text, postId, status: 'pending' }
    comments.push(data)

    await axios.post('http://localhost:5000/events', {
        type: 'comment_created',
        data
    })
    res.send({ success: true, comments: comments.filter(com => com.postId === postId) })

})

app.post('/events', async (req, res) => {
    const { type, data } = req.body
    switch (type) {
        case 'comment_moderated':
            console.log(type, data)
            comments.push(data)
            await axios.post('http://localhost:5000/events', {
                type: 'comment_updated',
                data
            })
            break
        default:
            break
    }
})

app.listen(PORT, () => {
    console.log(`Comments server running on PORT ${PORT}`)

})