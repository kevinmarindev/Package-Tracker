const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const logger = require('morgan')
const connectToDB = require('./config/database');
const homeRoutes = require('./routes/home')


require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

//Connect to Mongo
connectToDB()


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))



// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      cookie: {},
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection})
    })
  );


// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


//Routes 
app.use('/', homeRoutes)


const port = process.env.PORT || 5000
app.listen( port, () => console.log(`server on port ${port}`))



