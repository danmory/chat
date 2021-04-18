const {Schema, model} = require('mongoose')

const schema = new Schema({
    room: { type: String, required: true }
})

module.exports = model('Room', schema)