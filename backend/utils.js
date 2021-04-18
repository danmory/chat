const User = require('./models/User')
const Room = require('./models/Room')

/** Comparing objects based on their content */
function objDeepCompare(o1, o2){
    return JSON.stringify(o1) === JSON.stringify(o2)
}

/** Broadcast message to clients based on the room
 * @param m - message
 * @param wss - websocket server(clients should contain property 'room')
 * */
function broadcast(m, wss){
    wss.clients.forEach(client => {
        if (client.room === JSON.parse(m).room){
            client.send(m)
        }
    })
}

/** remove user from existing users */
async function removeUser(name){
    await User.deleteOne({ name })
}

/** remove room if there are no users in it */
async function tryRemoveRoom(room){
    const user = await User.findOne({ room })
    if (!user){
        await Room.deleteOne({ room })
    }
}

module.exports = { objDeepCompare, broadcast, removeUser, tryRemoveRoom }