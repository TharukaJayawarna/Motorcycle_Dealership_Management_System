const express = require('express');
const router = express.Router();
const preOrderController = require('../controllers/PreOrderControllers');
const multer = require('multer');
const path = require('path');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

router.get('/', preOrderController.getAllPreOrder);
router.post('/', upload.single('Payment_slip'), preOrderController.addPreOrder);
router.get('/:id', preOrderController.getPreOrderById);
router.put('/:id', upload.single('Payment_slip'), preOrderController.updatePreOrder);
router.delete('/:id', preOrderController.deletePreOrder);

module.exports = router;