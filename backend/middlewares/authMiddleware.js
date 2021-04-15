const { objDeepCompare } = require('../utils')

function authMiddleware(users){
    /* req.body contains information about the user tried to connect
       in format { name: 'user_name', room: 'room_name' }
    */
    return function(req, res, next){
        let isExists = false
        for (let user of users){
            if (objDeepCompare(req.body, { name: user.name, room: user.room })){
                isExists = true
                break
            }
        }

        isExists? res.status(401).send(JSON.stringify({ err: 'user already exists' })) : next()
    }
}

module.exports = authMiddleware