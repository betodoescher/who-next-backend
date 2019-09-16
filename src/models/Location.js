const mongoose = require('mongoose'); 

mongoose.set('useCreateIndex', true);

const { Schema, model } = require('mongoose')

const LocationSchema = new Schema({
  _idUser: {
    type: Schema.Types.ObjectId,
    required: true
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
  }
}, {
  timestamps: true
})

LocationSchema.index({ geometry: "2dsphere" });

module.exports = model('Location', LocationSchema)
