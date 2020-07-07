const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')

const app = express()

const PORT = 4001

//In memory data
const comments = [
    { id: '1', postId: '1', text: 'Hey good post ya' },
    { id: '2', postId: '1', text: 'Hey very nice post ya' },
    { id: '3', postId: '1', text: 'Hey okay post only ya' },
    { id: '3', postId: '2', text: 'Mm.. good post!' },
]
// Middleware
app.use(cors())
app.use(express.json())


app.get('/posts/:id/comments', (req, res) => {
    const { id } = req.params
    const com = comments.filter(comment => comment.postId === id)
    res.send(com)
})

app.post('/posts/:id/comments', (req, res) => {
    const { id: postId } = req.params
    const id = randomBytes(4).toString('hex')
    const { text } = req.body
    comments.push({ id, text, postId })
    res.send({ success: true, comments: comments.filter(com => com.postId === postId) })

})

app.post('events', (req, res) => {
    console.log(req)
})

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)

})