const express = require('express')
const router = express.Router()
const {
  createUser,
  getUsers,
  createExercise,
  getExercise,
} = require('../controllers/users')

router.route('/').post(createUser).get(getUsers)
router.route('/:_id/exercises').post(createExercise)
router.route('/:_id/logs').get(getExercise)
module.exports = router
