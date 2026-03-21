const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

// JWT Secret
const JWT_SECRET = 'your-secret-key';

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Mock authentication
    if (username === 'admin' && password === 'admin') {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    }
    res.status(401).json({ error: 'Invalid credentials' });
});

// Middleware
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
};

app.get('/api/protected', authenticate, (req, res) => {
    res.json({ message: 'Protected data', user: req.user });
});

module.exports = app;
