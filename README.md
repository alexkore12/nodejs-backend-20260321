# Node.js Backend API

Backend API moderno con Express.js y JWT authentication.

## 🚀 Características

- **Express.js** - Framework web minimalista
- **JWT Authentication** - Autenticación segura con tokens
- **Helmet** - Headers de seguridad HTTP
- **CORS** - Control de accesos cross-origin
- **Rate Limiting** - Protección contra DDoS
- **Validation** - Validación de datos con Joi
- **Logging** - Morgan + Winston
- **Docker** - Despliegue contenerizado

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/alexkore12/nodejs-backend-20260321.git
cd nodejs-backend-20260321

# Instalar dependencias
npm install

# O con yarn
yarn
```

## ⚙️ Configuración

Variables de entorno (`.env`):

```env
PORT=3000
JWT_SECRET=your-super-secret-key
NODE_ENV=development
```

## ▶️ Uso

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 📡 Endpoints

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/` | ❌ | Info API |
| GET | `/api/health` | ❌ | Health check |
| POST | `/api/auth/login` | ❌ | Login |
| POST | `/api/auth/register` | ❌ | Registro |
| GET | `/api/users` | ✅ | Listar usuarios |
| GET | `/api/users/:id` | ✅ | Usuario por ID |
| PUT | `/api/users/:id` | ✅ | Actualizar usuario |
| DELETE | `/api/users/:id` | ✅ | Eliminar usuario |
| GET | `/api/profile` | ✅ | Perfil actual |

## 🔐 Autenticación

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Usar token
curl http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🔒 Seguridad

### Headers de Seguridad (Helmet)
- ✅ Content Security Policy
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ X-XSS-Protection
- ✅ Strict-Transport-Security

### Rate Limiting
- ✅ Límite de requests por IP
- ✅ Headers estándar (RateLimit-*)

### Autenticación JWT
- ✅ Tokens con expiración
- ✅ Hash de contraseñas con bcrypt
- ✅ Middleware de verificación de token

### Recomendaciones para Producción
1. Usar HTTPS con certificado válido
2. Configurar CORS con orígenes específicos
3. Cambiar JWT_SECRET por valor seguro
4. Implementar refresh tokens
5. Usar variables de entorno para secrets

## 🧪 Testing

```bash
# Tests unitarios
npm test

# Coverage
npm test -- --coverage
```

## 🐳 Docker

```bash
# Build
docker build -t nodejs-backend .

# Run
docker run -p 3000:3000 \
  -e JWT_SECRET=secret \
  nodejs-backend
```

## 📁 Estructura

```
├── src/
│   ├── index.js        # Entry point
│   ├── routes/         # API routes
│   │   ├── auth.js
│   │   └── users.js
│   ├── middleware/     # Custom middleware
│   │   └── auth.js
│   └── models/        # Data models
├── tests/             # Test files
├── Dockerfile
├── package.json
└── README.md
```

## 🛠️ Scripts

- `npm start` - Iniciar producción
- `npm run dev` - Desarrollo con nodemon
- `npm test` - Ejecutar tests

## 📝 Licencia

MIT - Alejandro Kore

## 🤖 Actualizado por

OpenClaw AI Assistant - 2026-03-21
*Mejoras: Headers de seguridad Helmet, rate limiting, logging*
