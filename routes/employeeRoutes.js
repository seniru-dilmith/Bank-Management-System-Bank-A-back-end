const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
// const { authenticateToken } = require('../middlewares/authMiddleware'); // Protected routes

// Routes for employee management
router.get('/', employeeController.getEmployees);   // Get all employees
router.get('/:id', employeeController.getEmployee); // Get employee by ID
router.get('/general/branch/:branchId', employeeController.getGeneralEmployeesByBranchId); // Get employee by branch ID
router.get('/manager/branch/:branchId', employeeController.getManagerEmployeesByBranchId); // Get employee by branch ID
router.post('/', employeeController.createEmployee); // Create new employee
router.put('/:id',employeeController.updateEmployee); // Update employee
router.delete('/:id', employeeController.deleteEmployee); // Delete employee

module.exports = router;
