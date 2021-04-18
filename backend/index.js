const express = require( 'express')
const http = require('http')
const WebSocketServer = require('ws').Server
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const authMiddleware = require('./middlewares/authMiddleware')
const validateMiddleware = require('./middlewares/validateMiddleware')
const { broadcast, removeUser, tryRemoveRoom } = require('./utils')
const User = require('./models/User')
const Room = require('./models/Room')

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

/* PROCESS USERS WANT TO AUTHORIZE */
app.post('/enter', [validateMiddleware, authMiddleware], async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            room: req.body.room
        })
        await user.save()

        if (!(await Room.findOne({ room: req.body.room }))) {
            const room = new Room({
                room: req.body.room
            })
            await room.save()
        }
    } catch (e){
        console.log(e)
        res.sendStatus(500)
    }
    res.sendStatus(200)
})

/* WORKING WITH SOCKET */
wss.on('connection', async (socket, req) => {
    /* SAVE USER NAME AND ROOM IN SOCKET*/
    try {
        [socket.name, socket.room] = req.url.replace('/', '').split('&')
    } catch{
        socket.close()
    }
    /* CHECK WHETHER USER CREATED ITS ACCOUNT BEFORE
    *  IF NOT THEN CONNECTION WILL NOT BE ESTABLISHED
    * */
    const room = await Room.findOne({ room: socket.room })
    const user = await User.findOne({ name: socket.name })
    if (!user || !room){
        socket.close()
    }
    socket.on('message', message => broadcast(message, wss) )
    socket.on('close', async () => {
        await removeUser(socket.name)
        await tryRemoveRoom(socket.room)
    } )
})


async function start(){
    try{
        await mongoose.connect('mongodb+srv://dbadmin:dbadmin@cluster0.vgwux.mongodb.net/chat', {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('connected to db')
        server.listen(PORT)
    }catch (e){
        console.log(e)
    }
}

start()