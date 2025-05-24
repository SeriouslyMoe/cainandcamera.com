const express = require('express');
const fs = require('fs');
const session = require('express-session');
const crypto = require('crypto');

const path = require('path');
const app = express();
const port = 3000;

// Function to generate a random secret key
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex'); // Generates a 64-character hex string
};

const galleryDir = path.join(__dirname, 'public/images/dynamic');

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // serve static files like images

// Session middleware
app.use(
  session({
    secret: generateSecretKey(),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Initialize cart in session
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
});

// Add item to cart
app.post('/cart/add', (req, res) => {
  const { id, name, price, quantity } = req.body;
  const cart = req.session.cart;

  // Check if item already exists in cart
  const itemIndex = cart.findIndex((item) => item.id === id);
  if (itemIndex > -1) {
    // Update quantity if item exists
    cart[itemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cart.push({ id, name, price, quantity });
  }

  res.json({ success: true, cart });
});

// Remove item from cart
app.post('/cart/remove', (req, res) => {
  const { id } = req.body;
  const cart = req.session.cart;

  // Remove item from cart
  req.session.cart = cart.filter((item) => item.id !== id);

  res.json({ success: true, cart });
});

// Get cart data
app.get('/cart', (req, res) => {
  res.json({ cart: req.session.cart });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/access/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'access.html'));
});

app.get('/about/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/checkout/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'checkout.html'));
});

app.get('/contact-us/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact-us.html'));
});

app.get('/gallery/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'gallery.html'));
});

app.get('/news/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'news.html'));
});

app.get('/privacy-policy/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'privacy.html'));
});

app.get('/services/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'services.html'));
});

app.get('/services/crop/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'crop.html'));
});

app.get('/services/retouch/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'retouch.html'));
});

app.get('/api/gallery-images', (req, res) => {
  fs.readdir(galleryDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Unable to read gallery directory' });
    const images = files.filter(file => file.match(/\.(jpg|jpeg|png|webp)$/i));
    res.json(images);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});