# Security Hardening Guide

## Node.js Backend API - Security Best Practices

This document outlines the security measures implemented in this API and additional recommendations for production deployments.

## ✅ Implemented Security Features

### 1. Helmet.js - Security Headers

```javascript
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    crossOriginEmbedderPolicy: false,
}));
```

**Headers implemented:**
- `Content-Security-Policy` - Prevents XSS
- `Strict-Transport-Security` - Enforces HTTPS
- `X-Content-Type-Options` - Prevents MIME sniffing
- `X-Frame-Options` - Prevents clickjacking
- `X-XSS-Protection` - XSS filter for older browsers

### 2. Rate Limiting

```javascript
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests' },
});
```

**Configuration by endpoint:**
| Endpoint | Limit |
|----------|-------|
| General | 100/15min |
| Auth | 10/15min |
| API | 100/15min |

### 3. Input Validation

```javascript
const registerValidation = [
    body('username')
        .isLength({ min: 3, max: 30 })
        .matches(/^[a-zA-Z0-9_-]+$/),
    body('password')
        .isLength({ min: 6 })
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    body('email').isEmail()
];
```

### 4. CORS Configuration

```javascript
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
};
```

## 🚀 Production Hardening Checklist

### Environment Variables

```bash
# Required
JWT_SECRET=<cryptographically-strong-random-string>
NODE_ENV=production
PORT=443

# Recommended
ALLOWED_ORIGINS=https://yourdomain.com
RATE_LIMIT_general=50
RATE_LIMIT_auth=5
LOG_LEVEL=warn
```

### Database Security

1. **Use connection pooling** with limits
2. **Encrypt connections** (TLS/SSL)
3. **Principle of least privilege** for DB user
4. **Regular password rotation**

```javascript
// Example: Secure connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: true
    },
    connectionLimit: 10
});
```

### Authentication Best Practices

1. **Password Hashing** - Use bcrypt with cost factor 12+
2. **JWT** - Use short expiration (15min), refresh tokens
3. **HTTPS only** - Set `secure: true` on cookies
4. **Account lockout** - Implement after 5 failed attempts

```javascript
// Password hashing with bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 12;

async function hashPassword(password) {
    return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}
```

### API Security

1. **Request size limits**
```javascript
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));
```

2. **Disable fingerprinting**
```javascript
app.disable('x-powered-by');
```

3. **Add security headers** - Already done with Helmet

### Logging & Monitoring

1. **Log security events**
```javascript
const securityLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'security.log' })
    ]
});

// Log failed login attempts
securityLogger.info('Failed login attempt', {
    ip: req.ip,
    username: username,
    timestamp: new Date()
});
```

2. **Set up alerts** for:
   - Multiple failed logins
   - Unusual API usage patterns
   - Error rate spikes

### Docker Security

```dockerfile
# Use specific version, not latest
FROM node:20-alpine

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set ownership
COPY --chown=nodejs:nodejs . .

# Switch to non-root user
USER nodejs

# Read-only filesystem (where possible)
WORKDIR /home/nodejs/app
```

### Kubernetes Security

```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 10000
  capabilities:
    drop:
      - ALL
  readOnlyRootFilesystem: true

resources:
  limits:
    memory: "256Mi"
    cpu: "500m"
  requests:
    memory: "128Mi"
    cpu: "250m"
```

## 🔒 SSL/TLS Configuration

### Using Let's Encrypt (Nginx)

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

## 🧪 Security Testing

### Tools to Use

1. **npm audit** - Dependency vulnerabilities
2. **OWASP ZAP** - Dynamic scanning
3. **Snyk** - Continuous security
4. **SonarQube** - Code quality & security

```bash
# Run security checks
npm audit
npm audit fix

# Use Snyk
npm install -g snyk
snyk test

# Use Nmap for port scanning (if authorized)
nmap -sV -sC -p- yourdomain.com
```

## 📋 Compliance Notes

For production deployments, ensure compliance with:

- **GDPR** - Data protection (EU)
- **CCPA** - Consumer privacy (California)
- **SOC 2** - Security controls
- **PCI DSS** - Payment card data (if applicable)

## 🚨 Incident Response

If a security breach occurs:

1. **Contain** - Isolate affected systems
2. **Assess** - Identify scope of breach
3. **Notify** - Report to authorities/users as required
4. **Remediate** - Fix vulnerabilities
5. **Review** - Update security measures

---

**Last Updated:** March 2026
**Version:** 2.0

---

## ⚠️ CVE-2026-28500 - ONNX Supply Chain Attack

**Fecha:** Marzo 2026 | **Severidad:** HIGH (CVSS 8.6)

### Descripción
Se descubrió una vulnerabilidad crítica en la biblioteca ONNX que permite ataques a la cadena de suministro (supply chain attack).

### Vulnerabilidad
- **Vector:** `onnx.hub.load()` con parámetro `silent=True`
- **Problema:** El parámetro silent=True salta las advertencias de seguridad, permitiendo que cargas maliciosas se ejecuten sin notificación
- **Impacto:** Exfiltración de archivos sensibles (SSH keys, credenciales cloud, tokens)

### Referencias
- NVD: https://nvd.nist.gov/vuln/detail/CVE-2026-28500
- Reddit r/pwnhub: Discusión original

### Acción Recomendada
Si tu proyecto usa ONNX, verifica la versión y considera actualizar cuando hay parche disponible. Evita usar `silent=True` en producción.
