const express = require( 'express')
const bodyParser = require('body-parser')
const cors = require('cors')
const authMiddleware = require('./middlewares/authMiddleware')
const validateMiddleware = require('./middlewares/validateMiddleware')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

const users = []

app.post('/enter', [validateMiddleware, authMiddleware(users)], (req, res) => {
    users.push(req.body)
    res.sendStatus(200)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`started on port ${PORT}`))