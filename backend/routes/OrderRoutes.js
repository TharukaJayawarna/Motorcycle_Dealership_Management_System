const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderControllers");
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

router.get("/", OrderController.getAllOrder);
router.post("/", upload.single('Payment_slip'), OrderController.addOrder);
router.get("/:id", OrderController.getById);
router.put("/:id", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;