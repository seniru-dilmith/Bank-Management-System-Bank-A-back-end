const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { technicianMiddleware } = require('../middleware/technicianMiddleware');
const { addEmployeeValidation, updateEmployeeValidation } = require('../validations/employeeValidation');
const { getEmployees, addEmployee, updateEmployee, updateEmployeeFromId, removeEmployee, getGeneralEmployeesByBranchId, getManagerEmployeesByBranchId, getEmployee, deleteEmployee } = require('../controllers/employeeController');
const { branchManagerMiddleware } = require('../middleware/branchManagerMiddleware');

// Routes for employee management
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

// Route to get all employees
router.get('/employees', authMiddleware, technicianMiddleware, getEmployees);

// Route to add a new employee
router.post('/add-employee', authMiddleware, technicianMiddleware, addEmployeeValidation, addEmployee);

// Route to update an employee  
router.put('/update-employee', authMiddleware, technicianMiddleware, updateEmployeeValidation, updateEmployee);

// Route to remove an employee
router.delete('/remove-employee/:id', authMiddleware, technicianMiddleware, removeEmployee);

module.exports = router;
