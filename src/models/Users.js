const { Schema, model } = require('mongoose')

const UsersSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    require: true
  },
  bio: String,
  avatar: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = model('Users', UsersSchema)
