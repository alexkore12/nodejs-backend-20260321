# Node.js Backend API

API REST desarrollada con Express y JWT con implementación de seguridad robusta - Versión 2.2.0

## Características de Seguridad

| Feature | Implementación |
|---------|----------------|
| Helmet | Content Security Policy, HSTS, X-Frame-Options, etc. |
| Rate Limiting | 100 req/15min general, 10 req/15min auth |
| Input Validation | express-validator con sanitización |
| CORS Restringido | Orígenes configurables |
| Request Size Limit | 10kb max |
| Error Handling | Errores no expuestos en producción |
| JWT Auth | Tokens con expiración |

## Alternativas de Seguridad

- **Grype**: Escaneo de vulnerabilidades (alternativa a Trivy)
- ⚠️ **Trivy comprometido** (supply chain attack, marzo 2026)

## Instalación

```bash
# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env

# Editar variables
nano .env
```

### Variables de Entorno

```bash
JWT_SECRET=your-super-secret-key
PORT=3000
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

## Uso

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm start
```

### Tests

```bash
# Ejecutar tests
npm test

# Coverage
npm test -- --coverage
```

## Docker

```bash
docker build -t nodejs-backend .
docker run -p 3000:3000 -e JWT_SECRET=secret nodejs-backend
```

## API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Rate Limit |
|--------|----------|-------------|------------|
| POST | `/api/auth/login` | Iniciar sesión | 10/15min |
| POST | `/api/auth/register` | Registrarse | 10/15min |

### Usuarios (Protegido)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/profile` | Perfil del usuario actual |
| GET | `/api/users` | Listar usuarios (admin) |
| GET | `/api/users/:id` | Obtener usuario |
| PUT | `/api/users/:id` | Actualizar usuario |
| DELETE | `/api/users/:id` | Eliminar usuario (admin) |

### Health

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Info del API |
| GET | `/api/health` | Health check |

## Ejemplos

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

Respuesta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Acceder a Ruta Protegida

```bash
curl http://localhost:3000/api/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Headers de Seguridad

```
Content-Security-Policy: default-src 'self'
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
```

## Validación de Entrada

El registro requiere:

- **Username**: 3-30 caracteres, solo letras, números, _ y -
- **Password**: Mínimo 6 caracteres, debe incluir mayúscula, minúscula y número
- **Email**: Formato válido

## Estructura del Proyecto

```
nodejs-backend-20260321/
├── index.js                 # Entry point
├── src/                     # Código fuente
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions CI/CD
├── tests/
│   └── api.test.js          # Suite de tests (v2.2)
├── package.json
├── Dockerfile
├── .env.example
└── README.md
```

## Tests

### Cobertura de Tests

| Categoría | Tests |
|-----------|-------|
| Security Headers | ✅ Helmet, CORS |
| Health Check | ✅ Status endpoint |
| Authentication | ✅ Register, Login, JWT |
| Protected Routes | ✅ /profile, /users |
| Input Validation | ✅ Password, Email, Username |
| Error Handling | ✅ 404, error format |

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Con coverage
npm test -- --coverage

# Modo watch
npm run test:watch
```

## GitHub Actions CI/CD

El proyecto incluye workflow automático:

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Grype
        uses: anchore/grype-action@v0.17.0
        with:
          severity-cutoff: High
```

## Mejores Prácticas de Producción

⚠️ **Producción**:

- Cambiar `JWT_SECRET` a un valor seguro
- Configurar `ALLOWED_ORIGINS`
- Usar HTTPS
- Implementar hashing de contraseñas (bcrypt)
- Usar base de datos real

## Changelog

- ✅ v2.2.0 - GitHub Actions CI/CD, Grype security
- ✅ v2.1 - Suite completa de tests
- ✅ v2.0 - Seguridad robusta
- ✅ v1.0 - Versión inicial

## Dependencias

- Express.js
- JWT
- Helmet
- express-rate-limit
- express-validator
- Jest
- Supertest

## Licencia

MIT

## Autor

GitHub: [alexkore12](https://github.com/alexkore12)

OpenClaw AI Assistant - 2026-03-22
