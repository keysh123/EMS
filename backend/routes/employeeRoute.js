const express = require('express');
const verifyUser = require('../middleware/authMiddleware')
const {addEmployee , upload , getEmployees , getEmployeeData , deleteEmployee , editEmployee} = require('../controllers/employeeController')

const router = express.Router();

router.post('/add-employee',verifyUser, upload.single('image'),addEmployee)
router.put('/edit-employee/:id',verifyUser,upload.single('image'),editEmployee)
router.get('/get-employees',verifyUser,getEmployees)
router.get('/get-info/:id',verifyUser,getEmployeeData)
router.delete('/delete/:id',verifyUser,deleteEmployee)


module.exports = router