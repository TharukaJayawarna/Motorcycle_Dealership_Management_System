const express = require('express');
const router = express.Router();

const {
    getAllAdditionals, 
    addAdditional,
} = require('../Controllers/AdditionalControllers');

router.get('/getAllAdditionals', getAllAdditionals);
router.post('/addAdditional', addAdditional);

module.exports = router;