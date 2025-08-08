require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./db/db');
// const userRegister = require('./userseed')
const authRouter = require('./routes/authRoute');
const departmentRouter = require('./routes/departmentRoute');
const employeeRouter = require('./routes/employeeRoute');
const path = require('path');

const port = process.env.PORT;

connectToDB();
// userRegister()

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);

// Serve static files from public/uploads
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
