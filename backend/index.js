require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {connectToDB} = require('./db/db')
// const userRegister = require('./userseed')
const port = process.env.PORT

connectToDB()
// userRegister()

const app = express()
app.use(cors())
app.use(express.json())
app.listen(port , ()=>{
    console.log(`Server started on port on ${port}`);
})