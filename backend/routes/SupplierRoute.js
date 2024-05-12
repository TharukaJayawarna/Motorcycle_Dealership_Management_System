const express = require('express');
const router = express.Router();

const {
    getAllSuppliers,
    addSuppliers,
} = require('../Controllers/SupplierControllers');

router.get('/getAllSuppliers', getAllSuppliers);
router.post('/addSuppliers', addSuppliers);

module.exports = router;