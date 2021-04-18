const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: { type: String, required: true },
    room: { type: String, required: true }
})

module.exports = model('User', schema)