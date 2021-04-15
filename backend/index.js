const express = require( 'express')
const http = require('http')
const WebSocketServer = require('ws').Server
const bodyParser = require('body-parser')
const cors = require('cors')
const authMiddleware = require('./middlewares/authMiddleware')
const validateMiddleware = require('./middlewares/validateMiddleware')
const { broadcast } = require('./utils')

const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server })

const PORT = parseInt(process.env.PORT) || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

const users = []

app.post('/enter', [validateMiddleware, authMiddleware(users)], (req, res) => {
    users.push(req.body)
    res.sendStatus(200)
})

wss.on('connection', (socket, req) => {
    socket.room = req.url.replace('/', '')
    socket.on('message', message => {
        broadcast(message, wss)
    })
})

server.listen(PORT)