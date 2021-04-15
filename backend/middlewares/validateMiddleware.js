function validateMiddleware(req, res, next){
    req.body.hasOwnProperty('name') && req.body.hasOwnProperty('room') ?
        next():
        res.status(400).send('wrong input data')
}

module.exports = validateMiddleware