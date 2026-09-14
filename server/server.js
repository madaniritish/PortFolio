const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Load environment variables relative to server directory
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

// Resolve file paths reliably relative to server directory if relative
const resolveFilePath = (filePath, defaultRelativePath) => {
  const targetPath = filePath || defaultRelativePath;
  if (path.isAbsolute(targetPath)) {
    return targetPath;
  }
  return path.resolve(__dirname, targetPath);
};

const projectsFilePath = resolveFilePath(process.env.PROJECTS_FILE, './data/projects.json');
const contactsFilePath = resolveFilePath(process.env.CONTACTS_FILE, './data/contacts.json');

// Helper to read JSON data file
const readDataFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
};

// Helper to write JSON data file
const writeDataFile = async (filePath, data) => {
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., curl, Postman, mobile apps)
    if (!origin || origin === allowedOrigin || origin === 'http://localhost:5173' || origin === 'http://127.0.0.1:5173') {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
}));

app.use(express.json());

// B1: Health Check Endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// B2: Get all projects
app.get('/api/projects', async (req, res, next) => {
  try {
    const projects = await readDataFile(projectsFilePath);
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

// B3: Get single project by ID
app.get('/api/projects/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const projects = await readDataFile(projectsFilePath);
    const project = projects.find((p) => String(p.id) === String(id));

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
});

// B4: Submit contact message (with server-side validation & persistence)
app.post('/api/contact', async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Server-side validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const newContact = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    const contacts = await readDataFile(contactsFilePath);
    contacts.push(newContact);
    await writeDataFile(contactsFilePath, contacts);

    res.status(201).json({ message: 'Contact submission received successfully' });
  } catch (err) {
    next(err);
  }
});

// B5: Get all contact submissions (Open endpoint for assignment verification)
app.get('/api/contact', async (req, res, next) => {
  try {
    const contacts = await readDataFile(contactsFilePath);
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
});

// B6: Catch-all 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// B6: Global centralized error handling middleware
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  // Handle JSON parsing syntax error
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Malformed JSON in request body' });
  }

  // Handle CORS errors
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'Not allowed by CORS' });
  }

  console.error('Unhandled Server Error:', err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Portfolio API server listening on port ${PORT}`);
});

module.exports = app;
