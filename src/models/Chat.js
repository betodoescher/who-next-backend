const { Schema, model } = require('mongoose')

const ChatSchema = new Schema({
  _idUserOrigin: {
    type: Schema.Types.ObjectId,
    required: true
  },
  _idUserDestiny: {
    type: Schema.Types.ObjectId,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  Users: [{
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }]
}, {
  timestamps: true
})

module.exports = model('Chat', ChatSchema)
