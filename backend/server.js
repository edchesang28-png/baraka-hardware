// ============================================
// BARAKA MINI HARDWARE - BACKEND API
// Express.js + MongoDB
// ============================================

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();

// ============ MIDDLEWARE ============
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(express.static('public'));

// ============ FILE UPLOAD SETUP ============
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// ============ MONGODB CONNECTION ============
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/baraka-hardware';

mongoose.connect(mongoURI).then(() => {  console.log('✓ Connected to MongoDB');
}).catch(err => {
  console.log('MongoDB connection error (will use mock data):', err.message);
});

// ============ SCHEMAS ============

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String, default: '' },
  stock: { type: Number, default: 10 },
  rating: { type: Number, default: 5 },
  reviews: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Order Schema
const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  items: [{
    productId: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    quantity: Number
  }],
  totalAmount: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'shipped', 'delivered'] },
  paymentMethod: { type: String, default: 'mpesa' },
  paymentStatus: { type: String, default: 'pending', enum: ['pending', 'completed', 'failed'] },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String },
  message: { type: String, required: true },
  status: { type: String, default: 'new', enum: ['new', 'read', 'responded'] },
  createdAt: { type: Date, default: Date.now }
});

// User Schema (for customer accounts)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String },
  address: { type: String },
  city: { type: String },
  postalCode: { type: String },
  orders: [mongoose.Schema.Types.ObjectId],
  createdAt: { type: Date, default: Date.now }
});

// ============ MODELS ============
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);
const Contact = mongoose.model('Contact', contactSchema);
const User = mongoose.model('User', userSchema);

// ============ ROUTES ============

// ========== PRODUCTS ==========

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      // Return mock products if database is empty
      return res.json(getMockProducts());
    }
    res.json(products);
  } catch (error) {
    console.log('Error fetching products:', error);
    res.json(getMockProducts());
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create product (admin)
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.image;
    
    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      image: imageUrl,
      stock: req.body.stock || 10
    });

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update product (admin)
app.put('/api/products/:id', upload.single('image'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;
    product.stock = req.body.stock !== undefined ? req.body.stock : product.stock;

    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    product.updatedAt = new Date();
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete product (admin)
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted', product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get products by category
app.get('/api/products/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ========== ORDERS ==========

// Create order
app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order({
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      customerPhone: req.body.customerPhone,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      deliveryAddress: req.body.deliveryAddress,
      notes: req.body.notes
    });

    await order.save();

    // Send order confirmation email (placeholder)
    console.log(`Order created: ${order._id}`);
    
    res.json({
      success: true,
      message: 'Order created successfully',
      order: order,
      mpesaLink: generateMpesaLink(order) // M-Pesa integration
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all orders (admin)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get single order
app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update order status (admin)
app.put('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, updatedAt: new Date() },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ========== CONTACTS ==========

// Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      subject: req.body.subject,
      message: req.body.message
    });

    await contact.save();

    // Send email notification (placeholder)
    console.log(`New contact message from ${req.body.name}`);

    res.json({
      success: true,
      message: 'Message received. We will get back to you soon!',
      contact: contact
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all contacts (admin)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mark contact as read (admin)
app.put('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ========== USERS ==========

// Register user
app.post('/api/users/register', async (req, res) => {
  try {
    // Check if user exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password, // In production, hash this!
      address: req.body.address,
      city: req.body.city,
      postalCode: req.body.postalCode
    });

    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      success: true,
      message: 'User registered successfully',
      user: userResponse
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user profile
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('orders');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const userResponse = user.toObject();
    delete userResponse.password;
    res.json(userResponse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ========== ANALYTICS ==========

// Get dashboard stats (admin)
app.get('/api/analytics/stats', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = (await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]))[0]?.total || 0;
    const totalCustomers = await User.countDocuments();

    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);
    const bestProducts = await Product.find().sort({ rating: -1 }).limit(5);

    res.json({
      stats: {
        totalProducts,
        totalOrders,
        totalRevenue,
        totalCustomers
      },
      recentOrders,
      bestProducts
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get revenue by month (admin)
app.get('/api/analytics/revenue', async (req, res) => {
  try {
    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json(revenueData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ========== INTEGRATIONS ==========

// M-Pesa Integration (placeholder)
app.post('/api/mpesa/callback', async (req, res) => {
  try {
    const { Body } = req.body;
    const result = Body.stkCallback;

    if (result.ResultCode === 0) {
      // Payment successful
      console.log('M-Pesa payment successful:', result);
      
      // Update order payment status
      // Order.findByIdAndUpdate(orderId, { paymentStatus: 'completed' })
    } else {
      // Payment failed
      console.log('M-Pesa payment failed:', result);
    }

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// WhatsApp Integration (placeholder)
app.post('/api/whatsapp/send', async (req, res) => {
  try {
    const { phone, message, orderId } = req.body;

    // WhatsApp Business API integration
    console.log(`Sending WhatsApp message to ${phone}: ${message}`);

    res.json({
      success: true,
      message: 'WhatsApp message queued',
      orderId
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ========== HELPER FUNCTIONS ==========

function getMockProducts() {
  return [
    { id: 1, name: 'Premium Mattress King Size', category: 'Mattresses', price: 15000, image: '', description: 'Luxury orthopedic mattress with memory foam' },
    { id: 2, name: 'Professional Exterior Paint', category: 'Paints', price: 2500, image: '', description: 'Weather-resistant paint for long-lasting protection' },
    { id: 3, name: 'High Density Foam Sheet', category: 'Foam', price: 1200, image: '', description: 'Perfect for cushioning and padding' },
    { id: 4, name: 'Wool Blend Carpet', category: 'Carpets', price: 8000, image: '', description: 'Premium quality carpet for any space' },
    { id: 5, name: 'Premium Upholstery Fabric', category: 'Fabrics', price: 500, image: '', description: 'Soft and durable for furniture' },
    { id: 6, name: 'Hardware Fittings Set', category: 'Hardware', price: 3500, image: '', description: 'Complete set of hinges, handles, brackets' },
  ];
}

function generateMpesaLink(order) {
  // Generate M-Pesa STK push link
  return {
    phone: order.customerPhone,
    amount: order.totalAmount,
    reference: `ORD-${order._id}`,
    description: `Baraka Hardware Order #${order._id}`
  };
}

// ========== ERROR HANDLING ==========

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong', message: err.message });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Baraka Mini Hardware API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      orders: '/api/orders',
      contacts: '/api/contact',
      analytics: '/api/analytics/stats'
    }
  });\az
});

// ========== SERVER START ==========

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔═══════════════════════════════════════╗
║   BARAKA MINI HARDWARE API SERVER     ║
║   ✓ Running on port ${PORT}            ║
║   ✓ Ready to serve requests           ║
╚═══════════════════════════════════════╝
  `);
});

module.exports = app;
