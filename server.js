/**
 * GIAL College Website — Express Backend
 * Serves static frontend + REST API for contact forms & newsletter.
 */

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize data files if they don't exist
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
const NEWSLETTER_FILE = path.join(DATA_DIR, 'newsletter.json');

if (!fs.existsSync(CONTACTS_FILE)) {
  fs.writeFileSync(CONTACTS_FILE, '[]', 'utf8');
}
if (!fs.existsSync(NEWSLETTER_FILE)) {
  fs.writeFileSync(NEWSLETTER_FILE, '[]', 'utf8');
}

// ---------- Middleware ----------
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      frameSrc: ["'self'", "https://www.google.com"],
      connectSrc: ["'self'"],
    },
  },
}));
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// ---------- Helper: Read/Write JSON ----------
function readJSON(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// ---------- API Routes ----------

// POST /api/contact — Submit contact form
app.post('/api/contact', (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  // Validation
  if (!firstName || !firstName.trim()) {
    return res.status(400).json({ error: 'First name is required' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const contact = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    firstName: firstName.trim(),
    lastName: (lastName || '').trim(),
    email: email.trim().toLowerCase(),
    phone: (phone || '').trim(),
    message: message.trim(),
    submittedAt: new Date().toISOString(),
    read: false,
  };

  const contacts = readJSON(CONTACTS_FILE);
  contacts.push(contact);
  writeJSON(CONTACTS_FILE, contacts);

  console.log(`[Contact] New submission from ${contact.firstName} (${contact.email})`);
  res.status(201).json({ success: true, message: 'Thank you! We will get back to you soon.' });
});

// GET /api/contacts — List all contacts (admin)
app.get('/api/contacts', (req, res) => {
  const contacts = readJSON(CONTACTS_FILE);
  res.json({ total: contacts.length, contacts: contacts.reverse() });
});

// POST /api/newsletter — Subscribe to newsletter
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  const subscribers = readJSON(NEWSLETTER_FILE);
  const normalizedEmail = email.trim().toLowerCase();

  if (subscribers.some(s => s.email === normalizedEmail)) {
    return res.status(409).json({ error: 'Already subscribed' });
  }

  subscribers.push({
    email: normalizedEmail,
    subscribedAt: new Date().toISOString(),
  });
  writeJSON(NEWSLETTER_FILE, subscribers);

  console.log(`[Newsletter] New subscriber: ${normalizedEmail}`);
  res.status(201).json({ success: true, message: 'Successfully subscribed!' });
});

// GET /api/newsletter — List subscribers (admin)
app.get('/api/newsletter', (req, res) => {
  const subscribers = readJSON(NEWSLETTER_FILE);
  res.json({ total: subscribers.length, subscribers });
});

// ---------- Fallback: SPA routing ----------
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ---------- Error handler ----------
app.use((err, req, res, _next) => {
  console.error('[Server Error]', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// ---------- Start ----------
app.listen(PORT, () => {
  console.log(`\n  🎓 GIAL Website Server`);
  console.log(`  ➜ Local:   http://localhost:${PORT}`);
  console.log(`  ➜ API:     http://localhost:${PORT}/api/contacts`);
  console.log(`  ➜ Press Ctrl+C to stop\n`);
});
