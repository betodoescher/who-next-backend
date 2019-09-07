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
  },
  chats: [{
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  }]
}, {
  timestamps: true
})

module.exports = model('Users', UsersSchema)
