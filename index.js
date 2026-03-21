const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (replace with real DB in production)
const users = [
    { id: 1, username: 'admin', password: 'admin123', email: 'admin@example.com', role: 'admin' },
    { id: 2, username: 'user', password: 'user123', email: 'user@example.com', role: 'user' }
];

let nextId = 3;

// Helper to find user by username
const findUserByUsername = (username) => users.find(u => u.username === username);
const findUserById = (id) => users.find(u => u.id === id);

// Auth middleware
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Role middleware
const requireRole = (role) => (req, res, next) => {
    if (!req.user || req.user.role !== role) {
        return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
};

// ============ ROUTES ============

// Root
app.get('/', (req, res) => {
    res.json({
        name: 'Node.js Backend API',
        version: '1.0.0',
        status: 'running',
        docs: '/api/docs'
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Auth routes
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }
    
    const user = findUserByUsername(username);
    
    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
    
    res.json({
        token,
        user: { id: user.id, username: user.username, email: user.email, role: user.role }
    });
});

app.post('/api/auth/register', (req, res) => {
    const { username, password, email } = req.body;
    
    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Username, password, and email required' });
    }
    
    if (findUserByUsername(username)) {
        return res.status(409).json({ error: 'Username already exists' });
    }
    
    const newUser = {
        id: nextId++,
        username,
        password,
        email,
        role: 'user'
    };
    
    users.push(newUser);
    
    const token = jwt.sign(
        { id: newUser.id, username: newUser.username, role: newUser.role },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
    
    res.status(201).json({
        token,
        user: { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role }
    });
});

// Protected routes
app.get('/api/profile', authenticate, (req, res) => {
    const user = findUserById(req.user.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
});

// Users CRUD (admin only)
app.get('/api/users', authenticate, requireRole('admin'), (req, res) => {
    const usersWithoutPassword = users.map(({ password, ...u }) => u);
    res.json(usersWithoutPassword);
});

app.get('/api/users/:id', authenticate, (req, res) => {
    const user = findUserById(parseInt(req.params.id));
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    // Users can only view their own profile unless admin
    if (req.user.role !== 'admin' && req.user.id !== user.id) {
        return res.status(403).json({ error: 'Access denied' });
    }
    
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
});

app.put('/api/users/:id', authenticate, (req, res) => {
    const userId = parseInt(req.params.id);
    const user = findUserById(userId);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    // Users can only update their own profile unless admin
    if (req.user.role !== 'admin' && req.user.id !== user.id) {
        return res.status(403).json({ error: 'Access denied' });
    }
    
    const { username, email, role } = req.body;
    
    if (username) user.username = username;
    if (email) user.email = email;
    if (role && req.user.role === 'admin') user.role = role;
    
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
});

app.delete('/api/users/:id', authenticate, requireRole('admin'), (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    users.splice(userIndex, 1);
    res.json({ message: 'User deleted', id: userId });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`JWT Secret: ${JWT_SECRET.substring(0, 5)}...`);
    });
}

module.exports = app;
