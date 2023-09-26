const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'please provide user name '],
  },
})

module.exports = mongoose.model('User', UserSchema)
