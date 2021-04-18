const { objDeepCompare } = require('../utils')
const User = require('../models/User')

async function authMiddleware(req, res, next){
    const user = await User.findOne({ name: req.body.name })
    user?
        res.status(401).send(JSON.stringify({ err: 'user already exists' })):
        next()
}

module.exports = authMiddleware