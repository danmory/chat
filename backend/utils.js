function objDeepCompare(o1, o2){
    return JSON.stringify(o1) === JSON.stringify(o2)
}

function broadcast(m, wss){
    wss.clients.forEach(client => {
        if (client.room === JSON.parse(m).room){
            client.send(m)
        }
    })
}

module.exports = { objDeepCompare, broadcast}