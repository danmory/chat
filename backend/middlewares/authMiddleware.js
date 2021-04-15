const { objDeepCompare } = require('../utils')

function authMiddleware(users){
    /* req.body contains information about the user tried to connect
       in format { name: 'user_name', room: 'room_name' }
    */
    return function(req, res, next){
        users.includes(req.body.name) ?
            res.status(401).send(JSON.stringify({ err: 'user already exists' }))
            :next()
    }
}

module.exports = authMiddleware