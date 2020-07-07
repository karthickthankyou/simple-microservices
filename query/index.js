const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(cors())

const posts = []

app.get('/query', (req, res) => {
    res.send(posts)
})

const handleEvents = (type, data) => {
    switch (type) {
        case 'post_created':
            posts.push({ ...data, comments: [] })
            break
        case 'comment_created':
            {
                console.log(type, data)
                const post = posts.find(post => post.id === data.postId)
                const { postId, ...comment } = data
                post.comments.push({ ...comment })
                break
            }
        case 'comment_updated':
            {
                console.log(type, data)
                const post = posts.find(post => post.id === data.postId)
                const otherComments = post.comments.filter(com => com.id !== data.id)
                const { postId, ...comment } = data
                otherComments.push({ ...comment })
                post.comments = otherComments
                break
            }
        default:
            break
    }
}

app.post('/events', (req, res) => {
    const { type, data } = req.body
    handleEvents(type, data)
})


app.listen(4002, async () => {
    console.log('Query server running on PORT 4002')

    const res = await axios.get('http://localhost:5000/events')
    console.log(res.data.events)

    for (let i = 0; i < res.data.events.length; i++) {
        const { type, data } = res.data.events[i]
        handleEvents(type, data)
    }

    console.log(posts)

})
