const Order = require("../modules/OrderModels");

// Get all orders
const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add order
const addOrder = async (req, res) => {
  try {
    const { Order_ID, Item_Name, Quantity, Net_Amount, Cus_Name, Email, Address, Date } = req.body;
    let Payment_slip = null;

    if (req.file) {
      Payment_slip = `http://localhost:8070/uploads/${req.file.filename}`;
    }

    const newOrder = new Order({
      Order_ID,
      Item_Name,
      Quantity,
      Net_Amount,
      Cus_Name,
      Email,
      Address,
      Date,
      Payment_slip
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get order by ID
const getById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update order
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllOrder,
  addOrder,
  getById,
  updateOrder,
  deleteOrder
};