const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { technicianMiddleware } = require('../middleware/technicianMiddleware');
const { getEmployees, addEmployee, updateEmployee, removeEmployee } = require('../controllers/employeeController');
const { addEmployeeValidation, updateEmployeeValidation } = require('../validations/employeeValidation');

// Route to get all employees
router.get('/employees', authMiddleware, technicianMiddleware, getEmployees);

// Route to add a new employee
router.post('/add-employee', authMiddleware, technicianMiddleware, addEmployeeValidation, addEmployee);

// Route to update an employee  
router.put('/update-employee', authMiddleware, technicianMiddleware, updateEmployeeValidation, updateEmployee);

// Route to remove an employee
router.delete('/remove-employee/:id', authMiddleware, technicianMiddleware, removeEmployee);

module.exports = router;