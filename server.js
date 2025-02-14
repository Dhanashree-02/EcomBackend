const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

// Routers
const productRoutes = require('./src/router/productRoutes.js'); // Import routes
const categoryRoutes = require('./src/router/categoriesRouter.js'); // Import routes
const mainCategoriesRouter = require('./src/router/mainCategoriesRouter.js'); // Import routes
const userRouter = require('./src/router/userRouter.js'); // Import routes
const orderRoutes = require('./src/router/orderRouter.js');


const app = express();
app.use(express.json());


// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/maincategories', mainCategoriesRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRoutes)

// Middleware
app.use(express.json());
app.use(cors());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));