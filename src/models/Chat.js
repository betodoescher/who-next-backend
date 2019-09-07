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
  }
}, {
  timestamps: true
})

module.exports = model('Chat', ChatSchema)
