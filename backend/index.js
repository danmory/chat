const express = require( 'express')
const http = require('http')
const WebSocketServer = require('ws').Server
const bodyParser = require('body-parser')
const cors = require('cors')
const authMiddleware = require('./middlewares/authMiddleware')
const validateMiddleware = require('./middlewares/validateMiddleware')

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

wss.on('connection', (socket) => {
    // TODO: for each socket assign property 'room' and make event listener on message
})

server.listen(PORT)

function broadcast(m){
    // TODO: broadcast to all users based on room
}