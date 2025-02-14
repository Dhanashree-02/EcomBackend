const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder } = require('../controllers/orderController');

// Create a new order
router.post('/create', createOrder);

// Get all orders
router.get('/all', getAllOrders);

// Get order by ID
router.get('/:id', getOrderById);

// Update order status
router.put('/update/:id', updateOrderStatus);

// Delete an order
router.delete('/delete/:id', deleteOrder);

module.exports = router;