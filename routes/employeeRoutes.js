const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { technicianMiddleware } = require('../middleware/technicianMiddleware');
const { getEmployees, addEmployee, updateEmployee, removeEmployee } = require('../controllers/employeeController');
const { addEmployeeValidation, updateEmployeeValidation } = require('../validations/employeeValidation');
const { getEmployees, addEmployee, updateEmployee, removeEmployee, getGeneralEmployeesByBranchId, getManagerEmployeesByBranchId, getEmployee, deleteEmployee } = require('../controllers/employeeController');

// Routes for employee management
router.get('/get-employees', getEmployees);   // Get all employees
router.get('/get-employee/:id', getEmployee); // Get employee by ID
router.get('/general/branch/:branchId', getGeneralEmployeesByBranchId); // Get employee by branch ID
router.get('/manager/branch/:branchId', getManagerEmployeesByBranchId); // Get employee by branch ID
router.put('/update/:id',updateEmployee); // Update employee
router.delete('/delete/:id', deleteEmployee); // Delete employee

// Route to get all employees
router.get('/employees', authMiddleware, technicianMiddleware, getEmployees);

// Route to add a new employee
router.post('/add-employee', authMiddleware, technicianMiddleware, addEmployeeValidation, addEmployee);

// Route to update an employee  
router.put('/update-employee', authMiddleware, technicianMiddleware, updateEmployeeValidation, updateEmployee);

// Route to remove an employee
router.delete('/remove-employee/:id', authMiddleware, technicianMiddleware, removeEmployee);

module.exports = router;
