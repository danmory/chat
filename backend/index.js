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
const rooms = []

app.post('/enter', [validateMiddleware, authMiddleware(users)], (req, res) => {
    users.push(req.body.name)
    rooms.push(req.body.room)
    res.sendStatus(200)
})

wss.on('connection', (socket, req) => {
    [socket.name, socket.room] = req.url.replace('/', '').split('&')
    if (!rooms.includes(socket.room) || !users.includes(socket.name)){
        socket.close()
    }
    socket.on('message', message => broadcast(message, wss) )
    socket.on('close', () => users.splice(users.indexOf(socket.name)) )
})

server.listen(PORT)