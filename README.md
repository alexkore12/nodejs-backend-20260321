# Node.js Backend API

Backend API moderno con Express.js y JWT authentication.

## 🚀 Características

- **Express.js** - Framework web minimalista
- **JWT Authentication** - Autenticación segura
- **Middleware** - Protección de rutas
- **CORS** - Cross-origin requests
- **Validation** - Validación de datos
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
