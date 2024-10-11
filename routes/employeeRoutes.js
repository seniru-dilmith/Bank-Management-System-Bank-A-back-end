const express = require('express');
const router = express.Router();
const { getEmployees,
    getGeneralEmployeesByBranchId,
    getManagerEmployeesByBranchId,
    getEmployee,
    updateEmployee,
    deleteEmployee} = require('../controllers/employeeController');
// const { authenticateToken } = require('../middlewares/authMiddleware'); // Protected routes

// Routes for employee management
router.get('/get-employees', getEmployees);   // Get all employees
router.get('/get-employee/:id', getEmployee); // Get employee by ID
router.get('/general/branch/:branchId', getGeneralEmployeesByBranchId); // Get employee by branch ID
router.get('/manager/branch/:branchId', getManagerEmployeesByBranchId); // Get employee by branch ID
router.put('/update/:id',updateEmployee); // Update employee
router.delete('/delete/:id', deleteEmployee); // Delete employee

module.exports = router;
