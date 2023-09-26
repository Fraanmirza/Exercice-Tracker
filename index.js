const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
const userRoute = require('./routes/users')
const connectDB = require('./db/connect')
const path = require('path')
app.use(cors())

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))

//static resources
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

//user route
app.use('/api/users', userRoute)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)

    const listener = app.listen(process.env.PORT || 3000, () => {
      console.log('Your app is listening on port ' + listener.address().port)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
