const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'please provide user ID'],
  },
  description: {
    type: String,
    required: [true, 'please provide description.'],
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: date,
  },
})

module.exports = mongoose.model('Exercise', ExerciseSchema)
