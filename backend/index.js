require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {connectToDB} = require('./db/db')
// const userRegister = require('./userseed')
const authRouter = require('./routes/authRoute')
const departmentRouter = require('./routes/departmentRoute')
const port = process.env.PORT

connectToDB()
// userRegister()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/user',authRouter)
app.use('/api/department',departmentRouter)
app.listen(port , ()=>{
    console.log(`Server started on port on ${port}`);
})