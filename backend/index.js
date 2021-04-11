const httpServer = require('http').createServer()
const io = require('socket.io')(httpServer)
const PORT = process.env.PORT || 3000

io.on('connection', (socket)=> {
    socket.json.send({'event':'connected'})
    socket.on('message', (msg) =>
        socket.broadcast.json.send({'event': 'messageReceived', msg })
    )
})

httpServer.listen(PORT)