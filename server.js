const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const logger = require('morgan')
// const flash = require('express-flash-2')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectToDB = require('./config/database');
const homeRoutes = require('./routes/home');
const numsRoutes = require('./routes/numsRoutes')
const path = require('path')



require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

//Connect to Mongo
connectToDB()


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }))


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

app.use(cookieParser('keyboard cat'))


//  app.use(flash())

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


//Routes 
app.use('/', homeRoutes)
app.use('/numbers', numsRoutes)

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

  app.get('*', (req,res) =>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


const port = process.env.PORT || 6000
// const port =  process.env.PORT || 6000 
app.listen( port, () => console.log(`server on port ${port}`))



