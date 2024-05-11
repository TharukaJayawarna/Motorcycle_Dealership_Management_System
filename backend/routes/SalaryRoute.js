const express = require('express');
const router = express.Router();

const {
    getAllSalaries,
    addSalary,
    getSalary,
    deleteSalary,
    updateSalary,
} = require('../Controllers/SalaryControllers');

router.get('/getAllSalaries', getAllSalaries);
router.post('/addSalary', addSalary);
router.get('/getSalary/:id', getSalary);
router.delete('/deleteSalary/:id', deleteSalary);
router.put('/updateSalary/:id', updateSalary);


module.exports = router;
