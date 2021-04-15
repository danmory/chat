function validateMiddleware(req, res, next){
    req.body.hasOwnProperty('name') &&
    req.body.hasOwnProperty('room') &&
    req.body.name !== ''               &&
    req.body.room !== ''                ?
        next() :
        res.status(400).send(JSON.stringify({ err: 'wrong input data' }))
}

module.exports = validateMiddleware