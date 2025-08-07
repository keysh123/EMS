const express = require('express');
const verifyUser = require('../middleware/authMiddleware')
const {addDepartment , getDepartments,getDepartmentInfo,editDepartment,deleteDepartment} = require('../controllers/departmentController')

const router = express.Router();

router.post('/add-department',verifyUser,addDepartment)
router.put('/edit-department/:id',verifyUser,editDepartment)
router.get('/get-departments',verifyUser,getDepartments)
router.get('/get-info/:id',verifyUser,getDepartmentInfo)
router.delete('/delete/:id',verifyUser,deleteDepartment)


module.exports = router