const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { getEmployees, updateEmployeeFromId, getGeneralEmployeesByBranchId, getManagerEmployeesByBranchId, getEmployee, deleteEmployee } = require('../controllers/employeeController');
const { branchManagerMiddleware } = require('../middleware/branchManagerMiddleware');

// Get all employees
router.get('/get-employees', authMiddleware, branchManagerMiddleware, getEmployees);  

// Get employee by ID
router.get('/get-employee/:id', authMiddleware, branchManagerMiddleware, getEmployee); 

// Get employee by branch ID
router.get('/general/branch/:branchId', authMiddleware, branchManagerMiddleware, getGeneralEmployeesByBranchId); 

// Get employee by branch ID
router.get('/manager/branch/:branchId', authMiddleware, branchManagerMiddleware, getManagerEmployeesByBranchId); 

// Update employee
router.put('/update/:id', authMiddleware, branchManagerMiddleware, updateEmployeeFromId); 
 
// Delete employee
router.delete('/delete/:id', authMiddleware, branchManagerMiddleware, deleteEmployee); 

module.exports = router;
