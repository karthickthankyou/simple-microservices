const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const posts = []

app.get('/query', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    const { type, data } = req.body
    switch (type) {
        case 'post_created':
            posts.push({ ...data, comments: [] })
            break
        case 'comment_created':
            const post = posts.find(post => post.id === data.postId)
            post.comments.push({ id: data.id, text: data.text })
            break
        default:
            break
    }

})


app.listen(4002, (req, res) => {
    console.log('Server running on PORT 4002')

})
