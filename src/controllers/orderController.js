const Order = require('../modals/orderModel.js');

// Create Order
const createOrder = async (req, res) => {
    try {
        const { userName, productName, totalAmount, shippingAddress, paymentMethod } = req.body;
        
        const newOrder = new Order({
            userName,
            productName,
            totalAmount,
            shippingAddress,
            paymentMethod
        });

        await newOrder.save();
        res.status(201).send({ message: "Order created successfully", order: newOrder });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Get All Orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Get Order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).send({ message: "Order not found" });
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
    try {
        const { status, paymentStatus } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status, paymentStatus }, { new: true });

        if (!updatedOrder) return res.status(404).send({ message: "Order not found" });
        res.status(200).send({ message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Delete Order
const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).send({ message: "Order not found" });
        res.status(200).send({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
};
