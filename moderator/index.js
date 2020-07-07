const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const PORT = 4003

app.use(cors())
app.use(express.json())

app.post('/events', async (req, res) => {
    const { type, data } = req.body
    switch (type) {
        case 'comment_created':
            const status = data.text.includes('orange') ? 'rejected' : 'approved'
            console.log('checking', type, { ...data, status })

            await axios.post('http://localhost:5000/events', {
                type: 'comment_moderated',
                data: { ...data, status }
            })

        default:
            break
    }
})

app.listen(PORT, () => {
    console.log(`Moderator server running on PORT ${PORT}`)
})