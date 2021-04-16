const express = require( 'express')
const http = require('http')
const WebSocketServer = require('ws').Server
const bodyParser = require('body-parser')
const cors = require('cors')
const authMiddleware = require('./middlewares/authMiddleware')
const validateMiddleware = require('./middlewares/validateMiddleware')
const { broadcast, removeUser } = require('./utils')

/* INITIALIZATION OF THE SERVER */
const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server })

/* PORT TO USE */
const PORT = parseInt(process.env.PORT) || 3000

/* MIDDLEWARES TO USE */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

const users = []
const rooms = []

/* PROCESS USERS WANT TO AUTHORIZE */
app.post('/enter', [validateMiddleware, authMiddleware(users)], (req, res) => {
    users.push(req.body.name)
    rooms.push(req.body.room)
    res.sendStatus(200)
})

/* WORKING WITH SOCKET */
wss.on('connection', (socket, req) => {
    /* SAVE USER NAME AND ROOM IN SOCKET*/
    [socket.name, socket.room] = req.url.replace('/', '').split('&')
    /* CHECK WHETHER USER CREATED ITS ACCOUNT BEFORE USING /enter ENDPOINT
    *  IF NOT THEN CONNECTION WILL NOT BE ESTABLISHED
    * */
    if (!rooms.includes(socket.room) || !users.includes(socket.name)){
        socket.close()
    }
    socket.on('message', message => broadcast(message, wss) )
    socket.on('close', () => removeUser(users, socket.name) )
})

server.listen(PORT)

