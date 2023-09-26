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
    res.status(200).json({ users })
  } catch (error) {
    console.log(error)
  }
}

//create Exercise for the user
const createExercise = async (req, res) => {
  const { uid, description, duration, date } = req.body
  let finalExerciseObject = { uid, description, duration }
  if (date) {
    finalExerciseObject = { uid, description, duration, date }
  }
  const exercise = await Exercise.create(finalExerciseObject)
  res.status(201).json({ user: exercise })
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
    const exercises = await result
    res.status(200).json({ user: exercises, counts: exercises.length })
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
