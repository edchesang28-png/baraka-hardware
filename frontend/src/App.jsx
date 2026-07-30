// ============================================
// BARAKA MINI HARDWARE - UPDATED APP
// ============================================

import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    setProducts(getMockProducts());
  }, []);

  const getMockProducts = () => [
    // Mattresses - Johari Spring
    { id: 1, name: 'Johari Spring Mattress 4×6', category: 'Mattresses', price: 8500, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80', description: 'Single/twin size spring mattress. Orthopedic support with high-density foam layers. Ideal for children\'s beds and single bedrooms.' },
    { id: 2, name: 'Johari Spring Mattress 5×6', category: 'Mattresses', price: 12500, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80', description: 'Standard double size spring mattress. Premium comfort springs with foam padding. Perfect for couple\'s bedroom.' },
    { id: 3, name: 'Johari Spring Mattress 6×6', category: 'Mattresses', price: 16500, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80', description: 'King size spring mattress. Maximum comfort with individually wrapped springs and pillow top finish.' },
    { id: 4, name: 'Johari Quilted Mattress 4×6', category: 'Mattresses', price: 7500, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', description: 'Single quilted mattress with soft quilted top layer. Lightweight and easy to move, great for guest rooms.' },
    { id: 5, name: 'Johari Quilted Mattress 5×6', category: 'Mattresses', price: 11000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', description: 'Double quilted mattress. Comfortable quilted surface for a restful night\'s sleep.' },
    { id: 6, name: 'Johari Quilted Mattress 6×6', category: 'Mattresses', price: 14500, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', description: 'King quilted mattress. Extra wide sleeping surface with plush quilted top.' },
    // Pillows promo
    { id: 7, name: 'Free Pillows Offer — Buy 8-Inch Mattress', category: 'Mattresses', price: 0, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80', description: '🎁 Special Offer: Buy any 8-inch mattress and get TWO free pillows! Ask us in-store or via WhatsApp.' },
    // Fabrics
    { id: 8, name: 'Premium Upholstery Fabric', category: 'Fabrics', price: 500, image: 'https://images.unsplash.com/photo-1558171813-8c884bfc4ed4?w=600&q=80', description: 'High-quality upholstery fabric sold per metre. Wide range of colours and patterns available. Ideal for sofas, chairs and curtains.' },
    { id: 9, name: 'Heavy Duty Curtain Fabric', category: 'Fabrics', price: 500, image: 'https://images.unsplash.com/photo-1558171813-8c884bfc4ed4?w=600&q=80', description: 'Thick blackout curtain fabric sold per metre. Available in multiple colours. Perfect for bedrooms and offices.' },
    // Leather - rolls
    { id: 10, name: 'Synthetic Leather Roll (per metre)', category: 'Leather', price: 600, image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80', description: 'Top-quality synthetic leather sold per metre from a roll. Used for sofa reupholstering, chairs and car seats. Available in black, brown, cream and more.' },
    { id: 11, name: 'Genuine Leather Roll (per metre)', category: 'Leather', price: 600, image: 'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=600&q=80', description: 'Durable genuine leather sold per metre from a roll. Rich texture and long lasting. Perfect for furniture, bags and custom upholstery work.' },
    // Foam Sheets
    { id: 12, name: 'High Density Foam Sheet — 2 inch', category: 'Foam Sheets', price: 1500, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Firm high-density foam sheet, 2 inches thick. Ideal for seat cushions, mattress toppers and upholstery padding. Cut to size available.' },
    { id: 13, name: 'High Density Foam Sheet — 4 inch', category: 'Foam Sheets', price: 2800, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Thick 4-inch high-density foam sheet. Extra support and durability. Perfect for sofa bases, bench seating and mattress repair.' },
    { id: 14, name: 'Standard Foam Sheet — 2 inch', category: 'Foam Sheets', price: 900, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Lightweight standard foam sheet, 2 inches thick. Good for light padding, crafts and general use. Sold per sheet.' },
    // Carpets
    { id: 15, name: 'Wall-to-Wall Carpet (per sqm)', category: 'Carpets', price: 850, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', description: 'Premium wall-to-wall carpet sold per square metre. Soft, durable and available in multiple colours. Ideal for bedrooms, living rooms and offices.' },
    { id: 16, name: 'Heavy Duty Office Carpet (per sqm)', category: 'Carpets', price: 1100, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Tough commercial grade carpet for high-traffic areas. Stain-resistant and easy to clean. Sold per square metre.' },
    { id: 17, name: 'Carpet Roll — Full Roll', category: 'Carpets', price: 9500, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', description: 'Full carpet roll for larger projects. Best value for big rooms, offices or rental properties. Contact us via WhatsApp for roll dimensions.' },
    // Cushions
    { id: 18, name: 'High Density Seat Cushion', category: 'Cushions', price: 1200, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', description: 'Firm high-density foam cushion for sofas and chairs. Maintains shape over time and provides strong support. Great for replacing old sagging cushions.' },
    { id: 19, name: 'Low Density Soft Cushion', category: 'Cushions', price: 750, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80', description: 'Soft and light low-density foam cushion. Comfortable and flexible, perfect for decorative pillows, back cushions and light seating.' },
    { id: 20, name: 'High Density Back Cushion (Large)', category: 'Cushions', price: 1800, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', description: 'Large high-density back support cushion. Extra thick and firm. Ideal for office chairs, sofas and custom upholstery projects.' },
    // Paints
    { id: 21, name: 'Interior Wall Paint — 4L', category: 'Paints', price: 1800, image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80', description: 'Smooth finish interior emulsion paint. Available in a wide range of colours. Covers up to 40sqm per tin.' },
    { id: 22, name: 'Exterior Weatherproof Paint — 4L', category: 'Paints', price: 2500, image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80', description: 'Long-lasting exterior paint with weather resistance. Protects walls from rain, UV and mould. Ideal for outside walls and fences.' },
    { id: 23, name: 'Gloss Paint — 1L', category: 'Paints', price: 750, image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80', description: 'High-gloss enamel paint for doors, windows and metalwork. Durable and easy to clean. Available in multiple colours.' },
  ];

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'baraka2024') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('Invalid password');
    }
  };

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Math.random() }]);
    alert('Added to cart!');
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  let pageComponent;
  if (isAdmin) {
    pageComponent = <AdminDashboard setIsAdmin={setIsAdmin} products={products} setProducts={setProducts} />;
  } else {
    switch(currentPage) {
      case 'home': pageComponent = <HomePage setCurrentPage={setCurrentPage} products={products} addToCart={addToCart} />; break;
      case 'products': pageComponent = <ProductsPage products={products} addToCart={addToCart} />; break;
      case 'about': pageComponent = <AboutPage />; break;
      case 'contact': pageComponent = <ContactPage />; break;
      case 'support': pageComponent = <SupportPage />; break;
      case 'cart': pageComponent = <CartPage cart={cart} removeFromCart={removeFromCart} />; break;
      default: pageComponent = <HomePage setCurrentPage={setCurrentPage} products={products} addToCart={addToCart} />;
    }
  }

  return (
    <div className="app">
      <Navigation setCurrentPage={setCurrentPage} cart={cart} onAdminClick={() => setShowAdminLogin(true)} />
      {showAdminLogin && (
        <AdminLoginModal onClose={() => setShowAdminLogin(false)} onLogin={handleAdminLogin} password={adminPassword} setPassword={setAdminPassword} />
      )}
      <main className="main-content">{pageComponent}</main>
      <WhatsAppButton />
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

// ============ NAVIGATION ============
function Navigation({ setCurrentPage, cart, onAdminClick }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo" onClick={() => setCurrentPage('home')}>
          <span className="logo-icon">🏪</span>
          <span>Baraka Mini Hardware</span>
        </div>
        <ul className="nav-menu">
          <li><a onClick={() => setCurrentPage('home')}>Home</a></li>
          <li><a onClick={() => setCurrentPage('products')}>Products</a></li>
          <li><a onClick={() => setCurrentPage('about')}>About</a></li>
          <li><a onClick={() => setCurrentPage('contact')}>Contact</a></li>
          <li><a onClick={() => setCurrentPage('support')}>Support</a></li>
        </ul>
        <div className="nav-actions">
          <button className="cart-btn" onClick={() => setCurrentPage('cart')}>🛒 Cart ({cart.length})</button>
          <button className="admin-btn" onClick={onAdminClick}>⚙️</button>
        </div>
      </div>
    </nav>
  );
}

// ============ WHATSAPP FLOATING BUTTON ============
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/254723068125?text=Hello%20Baraka%20Mini%20Hardware%2C%20I%20need%20help%20with..."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      title="Chat with us on WhatsApp"
    >
      <span className="whatsapp-icon">💬</span>
      <span className="whatsapp-label">WhatsApp Us</span>
    </a>
  );
}

// ============ HOME PAGE ============
function HomePage({ setCurrentPage, products, addToCart }) {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Baraka Mini Hardware</h1>
          <p>Premium Mattresses, Fabrics, Leather & Paints — Baringo-Kabarnet</p>
          <button className="cta-button" onClick={() => setCurrentPage('products')}>Explore Products →</button>
        </div>
      </section>

      <section className="featured-section">
        <h2>Featured Products</h2>
        <p className="section-subtitle">Top picks from our store</p>
        <div className="products-grid">
          {products.slice(0, 6).map(product => (
            <ProductCard key={product.id} product={product} onAddCart={addToCart} />
          ))}
        </div>
        <div style={{textAlign:'center', marginTop:'2rem'}}>
          <button className="cta-button" onClick={() => setCurrentPage('products')} style={{background:'var(--primary)',color:'white',border:'none'}}>
            View All Products →
          </button>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Baraka?</h2>
        <div className="features-grid">
          <FeatureCard icon="✓" title="Quality Assured" desc="Every product hand-picked for quality and durability" />
          <FeatureCard icon="💰" title="Best Prices" desc="Competitive prices for Baringo-Kabarnet community" />
          <FeatureCard icon="🚚" title="Fast Delivery" desc="Quick delivery across Baringo" />
          <FeatureCard icon="💬" title="WhatsApp Support" desc="Chat with us directly for instant help" />
        </div>
      </section>

      <section className="promo-section">
        <div className="promo-card">
          <div className="promo-text">
            <span className="promo-badge">🎁 Special Offer</span>
            <h3>Buy Any 8-Inch Mattress — Get 2 FREE Pillows!</h3>
            <p>Purchase any of our Johari 8-inch mattresses and we'll throw in two quality pillows at no extra charge. In-store and WhatsApp orders qualify.</p>
            <a href="https://wa.me/254723068125?text=Hi%2C%20I%27m%20interested%20in%20the%20mattress%20%2B%20pillow%20offer!" target="_blank" rel="noopener noreferrer" className="promo-btn">
              Claim Offer on WhatsApp →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// ============ PRODUCTS PAGE ============
function ProductsPage({ products, addToCart }) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filtered = filter === 'All' ? products : products.filter(p => p.category === filter);

  return (
    <section className="products-page">
      <h2>Our Products</h2>
      <p className="section-subtitle">Browse our full range — Baringo-Kabarnet's trusted hardware store</p>
      <div className="filter-buttons">
        {categories.map(cat => (
          <button key={cat} className={`filter-btn ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)}>{cat}</button>
        ))}
      </div>
      <div className="products-grid">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} onAddCart={addToCart} />
        ))}
      </div>
    </section>
  );
}

// ============ PRODUCT CARD ============
function ProductCard({ product, onAddCart }) {
  return (
    <div className="product-card">
      <div className="product-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="placeholder">📦</div>
        )}
      </div>
      <div className="product-info">
        <span className="category-badge">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-footer">
          <span className="price">{product.price === 0 ? 'FREE OFFER' : `KES ${product.price.toLocaleString()}`}</span>
          {product.price > 0 && (
            <button className="add-btn" onClick={() => onAddCart(product)}>Add →</button>
          )}
          {product.price === 0 && (
            <a href="https://wa.me/254723068125?text=Hi%2C%20I%27m%20interested%20in%20the%20free%20pillow%20offer!" target="_blank" rel="noopener noreferrer" className="add-btn" style={{textDecoration:'none',textAlign:'center'}}>
              Ask Us →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ SUPPORT PAGE ============
function SupportPage() {
  const [ticket, setTicket] = useState({ name: '', phone: '', email: '', issue: '', details: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setTicket({ ...ticket, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="support-page">
      <h2>Customer Support</h2>
      <p className="section-subtitle">We're here to help — reach us instantly on WhatsApp or submit a support request below</p>

      <div className="support-options">
        <div className="support-whatsapp-card">
          <div className="support-wa-icon">💬</div>
          <h3>Chat on WhatsApp</h3>
          <p>The fastest way to reach us. We reply within minutes during business hours.</p>
          <p className="support-hours">Mon–Fri: 8:00am – 7:30pm<br/>Sat–Sun: 8:00am – 5:00pm</p>
          <a
            href="https://wa.me/254723068125?text=Hello%20Baraka%20Mini%20Hardware%2C%20I%20need%20help%20with..."
            target="_blank"
            rel="noopener noreferrer"
            className="wa-support-btn"
          >
            Open WhatsApp Chat →
          </a>
        </div>

        <div className="support-form-card">
          <h3>Submit a Support Request</h3>
          <p>Fill in the form below and we'll get back to you by phone or email.</p>

          {submitted ? (
            <div className="support-success">
              <div className="success-icon">✅</div>
              <h4>Request Submitted!</h4>
              <p>Thank you, <strong>{ticket.name}</strong>. We've received your request and will contact you soon at <strong>{ticket.phone}</strong>.</p>
              <button className="submit-btn" onClick={() => { setSubmitted(false); setTicket({ name:'', phone:'', email:'', issue:'', details:'' }); }} style={{marginTop:'1rem'}}>
                Submit Another Request
              </button>
            </div>
          ) : (
            <div className="support-form">
              <input type="text" name="name" placeholder="Your Full Name *" value={ticket.name} onChange={handleChange} required />
              <input type="tel" name="phone" placeholder="Phone Number *" value={ticket.phone} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email Address (optional)" value={ticket.email} onChange={handleChange} />
              <select name="issue" value={ticket.issue} onChange={handleChange} required>
                <option value="">Select Issue Type *</option>
                <option value="product-inquiry">Product Inquiry</option>
                <option value="order-status">Order / Delivery Status</option>
                <option value="pricing">Pricing Question</option>
                <option value="complaint">Complaint</option>
                <option value="other">Other</option>
              </select>
              <textarea name="details" placeholder="Describe your issue or question in detail *" rows="5" value={ticket.details} onChange={handleChange} required></textarea>
              <button className="submit-btn" onClick={handleSubmit} disabled={!ticket.name || !ticket.phone || !ticket.issue || !ticket.details}>
                Submit Request
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="support-faq">
        <h3>Frequently Asked Questions</h3>
        <div className="faq-grid">
          <FaqItem q="What sizes do Johari mattresses come in?" a="We stock 4×6, 5×6 and 6×6 sizes in both Spring and Quilted options." />
          <FaqItem q="How much is fabric per metre?" a="Upholstery and curtain fabrics are KES 500 per metre. Leather is KES 600 per metre." />
          <FaqItem q="Do you deliver to my area?" a="Yes! We deliver across Baringo. Contact us on WhatsApp for delivery costs and timing." />
          <FaqItem q="What is the free pillow offer?" a="Buy any 8-inch Johari mattress and get 2 free pillows. Applies in-store and via WhatsApp orders." />
          <FaqItem q="What paint brands do you stock?" a="We stock interior, exterior and gloss paints. WhatsApp us for current brands and colour cards." />
          <FaqItem q="Can I order via WhatsApp?" a="Yes! Send us a message on 0723 068 125 with what you need and we'll arrange everything." />
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
      <div className="faq-question">
        <span>{q}</span>
        <span className="faq-arrow">{open ? '▲' : '▼'}</span>
      </div>
      {open && <div className="faq-answer">{a}</div>}
    </div>
  );
}

// ============ ABOUT PAGE ============
function AboutPage() {
  return (
    <section className="about-page">
      <h2>About Baraka Mini Hardware</h2>
      <div className="about-content">
        <div className="about-text">
          <h3>Serving Baringo-Kabarnet with Excellence</h3>
          <p>Baraka Mini Hardware is your trusted local store for premium mattresses, fabrics, leather, and paints in Baringo-Kabarnet. We pride ourselves on quality products at fair prices for the community we serve.</p>
          <h3>Our Mission</h3>
          <p>To provide durable, high-quality products that improve homes and businesses across Baringo. Every item in our store is carefully selected to ensure you get real value for your money.</p>
          <h3>Our Values</h3>
          <ul className="values-list">
            <li>✓ Quality products only</li>
            <li>✓ Fair and transparent pricing</li>
            <li>✓ Friendly, honest service</li>
            <li>✓ Local community first</li>
            <li>✓ Fast and reliable delivery</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ============ CONTACT PAGE ============
function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message received! We'll get back to you soon.");
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section className="contact-page">
      <h2>Contact Us</h2>
      <div className="contact-container">
        <div className="contact-form">
          <h3>Send us a Message</h3>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
          <button className="submit-btn" onClick={handleSubmit}>Send Message</button>
        </div>
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <div className="info-item">
            <span className="label">📍 Location</span>
            <p>Baringo-Kabarnet, Kenya</p>
          </div>
          <div className="info-item">
            <span className="label">📞 Phone / WhatsApp</span>
            <p><a href="tel:+254723068125">0723 068 125</a></p>
          </div>
          <div className="info-item">
            <span className="label">✉️ Email</span>
            <p><a href="mailto:barakaminienterprise@gmail.com">barakaminienterprise@gmail.com</a></p>
          </div>
          <div className="info-item">
            <span className="label">⏰ Business Hours</span>
            <p>Mon–Fri: 8:00am – 7:30pm<br/>Sat: 8:00am – 5:00pm<br/>Sun: 8:00am – 5:00pm</p>
          </div>
          <div className="social-links">
            <a href="https://wa.me/254723068125" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
            <a href="mailto:barakaminienterprise@gmail.com">✉️ Email</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ CART PAGE ============
function CartPage({ cart, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <h2>Shopping Cart</h2>
        <div className="empty-cart"><p>Your cart is empty</p></div>
      </section>
    );
  }
  return (
    <section className="cart-page">
      <h2>Shopping Cart ({cart.length} items)</h2>
      <div className="cart-container">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.cartId} className="cart-item">
              <div><h3>{item.name}</h3><p>{item.category}</p></div>
              <div className="item-price">KES {item.price.toLocaleString()}</div>
              <button className="remove-btn" onClick={() => removeFromCart(item.cartId)}>×</button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>KES {total.toLocaleString()}</span></div>
          <div className="summary-row"><span>Delivery</span><span>KES 500</span></div>
          <div className="summary-row total"><span>Total</span><span>KES {(total + 500).toLocaleString()}</span></div>
          <button className="checkout-btn">Proceed to Checkout</button>
          <p className="payment-info">💳 M-Pesa integration coming soon</p>
        </div>
      </div>
    </section>
  );
}

// ============ ADMIN PANEL ============
function AdminDashboard({ setIsAdmin, products, setProducts }) {
  const [activeTab, setActiveTab] = useState('products');
  const [newProduct, setNewProduct] = useState({ name: '', category: 'Mattresses', price: '', description: '', image: '' });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) { alert('Please fill in all required fields'); return; }
    setProducts([...products, { ...newProduct, id: Math.random(), price: parseInt(newProduct.price) }]);
    setNewProduct({ name: '', category: 'Mattresses', price: '', description: '', image: '' });
    alert('Product added!');
  };

  const handleDeleteProduct = (id) => {
    if (confirm('Delete this product?')) setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={() => setIsAdmin(false)}>Logout</button>
      </div>
      <div className="admin-tabs">
        <button className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>Products</button>
        <button className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>Analytics</button>
        <button className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>Settings</button>
      </div>
      {activeTab === 'products' && (
        <div className="admin-section">
          <h3>Manage Products</h3>
          <div className="add-product-form">
            <h4>Add New Product</h4>
            <input type="text" placeholder="Product Name *" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
            <select value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}>
              <option>Mattresses</option><option>Fabrics</option><option>Leather</option><option>Foam Sheets</option><option>Carpets</option><option>Cushions</option><option>Paints</option>
            </select>
            <input type="number" placeholder="Price (KES) *" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
            <input type="text" placeholder="Image URL (optional)" value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} />
            <textarea placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}></textarea>
            <button className="add-btn" onClick={handleAddProduct}>Add Product</button>
          </div>
          <div className="products-list">
            <h4>Current Products ({products.length})</h4>
            {products.map(product => (
              <div key={product.id} className="product-row">
                <div><strong>{product.name}</strong><p>{product.category} — KES {product.price > 0 ? product.price.toLocaleString() : 'Free Offer'}</p></div>
                <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'analytics' && (
        <div className="admin-section">
          <h3>Analytics Dashboard</h3>
          <div className="analytics-grid">
            <StatCard label="Total Products" value={products.length} />
            <StatCard label="Categories" value={new Set(products.map(p => p.category)).size} />
            <StatCard label="Store Value" value={`KES ${products.reduce((sum, p) => sum + p.price, 0).toLocaleString()}`} />
            <StatCard label="Customers" value="—" />
          </div>
        </div>
      )}
      {activeTab === 'settings' && (
        <div className="admin-section">
          <h3>Store Settings</h3>
          <div className="settings-form">
            <div className="setting-item"><label>Store Name</label><input type="text" defaultValue="Baraka Mini Hardware" /></div>
            <div className="setting-item"><label>Phone / WhatsApp</label><input type="text" defaultValue="0723 068 125" /></div>
            <div className="setting-item"><label>Email</label><input type="email" defaultValue="barakaminienterprise@gmail.com" /></div>
            <div className="setting-item"><label>Location</label><input type="text" defaultValue="Baringo-Kabarnet, Kenya" /></div>
            <button className="save-btn">Save Settings</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============ HELPER COMPONENTS ============
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}

function AdminLoginModal({ onClose, onLogin, password, setPassword }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Admin Login</h2>
        <input type="password" placeholder="Enter admin password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
        <button onClick={onLogin} style={{width:'100%',background:'var(--primary)',color:'white',padding:'1rem',border:'none',borderRadius:'8px',fontWeight:700,cursor:'pointer',marginTop:'0.5rem'}}>Login</button>
      </div>
    </div>
  );
}

// ============ FOOTER ============
function Footer({ setCurrentPage }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Baraka Mini Hardware</h4>
          <p>Premium mattresses, fabrics, leather & paints — Baringo-Kabarnet, Kenya</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a onClick={() => setCurrentPage('home')} style={{cursor:'pointer'}}>Home</a></li>
            <li><a onClick={() => setCurrentPage('products')} style={{cursor:'pointer'}}>Products</a></li>
            <li><a onClick={() => setCurrentPage('support')} style={{cursor:'pointer'}}>Support</a></li>
            <li><a onClick={() => setCurrentPage('contact')} style={{cursor:'pointer'}}>Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>📍 Baringo-Kabarnet, Kenya</p>
          <p>📞 0723 068 125</p>
          <p>✉️ barakaminienterprise@gmail.com</p>
          <p>⏰ Mon–Fri: 8am–7:30pm | Sat–Sun: 8am–5pm</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Baraka Mini Hardware. All rights reserved.</p>
      </div>
    </footer>
  );
}
