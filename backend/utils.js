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

/** remove user from users list */
function removeUser(users, user){
    users.splice(users.indexOf(user))
}

module.exports = { objDeepCompare, broadcast, removeUser }