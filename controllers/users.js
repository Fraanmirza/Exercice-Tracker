const User = require('../models/user')
const Exercise = require('../models/exercise')
//create users
const createUser = async (req, res) => {
  try {
    const username = req.body.username
    const user = await User.create({ username })
    console.log('user: ', user)
    res.status(201).json({ username: user.username, _id: user._id })
  } catch (error) {
    console.log(error)
  }
}

//get users

const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
  }
}

//create Exercise for the user
const createExercise = async (req, res) => {
  const uid = req.params._id
  const { description, duration, date } = req.body
  let finalExerciseObject = { uid, description, duration }
  if (date) {
    finalExerciseObject = { uid, description, duration, date }
  }
  const user = await User.findOne({ _id: uid })
  const exercise = await Exercise.create(finalExerciseObject)
  res.status(201).json({
    user: {
      username: user.username,
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString(),
      _id: exercise._id,
    },
  })
}

//get exercises for a user
const getExercise = async (req, res) => {
  try {
    const uid = req.params._id
    const { from, to, limit } = req.query
    let queryObject = {
      uid,
    }
    if (from && to) {
      queryObject.date = { $gte: from, $lt: to }
    }
    let result = Exercise.find(queryObject)
    if (limit) {
      result = result.limit(Number(limit))
    }
    let exercises = await result
    const user = await User.findOne({ _id: uid })
    exercises = exercises.map((item) => {
      return {
        description: item.description,
        duration: item.duration,
        date: item.date.toDateString(),
      }
    })
    res.status(200).json({
      username: user.username,
      count: exercises.length,
      _id: uid,
      log: exercises,
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createUser,
  getUsers,
  createExercise,
  getExercise,
}
