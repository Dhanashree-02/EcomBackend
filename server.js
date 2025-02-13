const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

// Routers
const productRoutes = require('./src/router/productRoutes.js'); // Import routes
const categoryRoutes = require('./src/router/categoriesRouter.js'); // Import routes



const app = express();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

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
