# Node.js Backend API

API REST desarrollada con Express y JWT con implementación de seguridad robusta.

## Versión 2.0 - Seguridad Mejorada

### 🔒 Características de Seguridad

| Feature | Implementación |
|---------|----------------|
| **Helmet** | Content Security Policy, HSTS, X-Frame-Options, etc. |
| **Rate Limiting** | 100 req/15min general, 10 req/15min auth |
| **Input Validation** | express-validator con sanitización |
| **CORS Restringido** | Orígenes configurables |
| **Request Size Limit** | 10kb max |
| **Error Handling** | Errores no expuestos en producción |

- **Grype**: Escaneo de vulnerabilidades (alternativa a Trivy)
- ⚠️ Trivy comprometido (supply chain attack, marzo 2026)

## Uso

### Instalación

```bash
npm install
```

### Configuración

```bash
# Crear archivo .env
cp .env.example .env

# Editar variables
JWT_SECRET=your-super-secret-key
PORT=3000
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### Ejecutar

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

### Docker

```bash
docker build -t nodejs-backend .
docker run -p 3000:3000 -e JWT_SECRET=secret nodejs-backend
```

## Endpoints

### Autenticación

| Método | Endpoint | Descripción | Rate Limit |
|--------|----------|-------------|------------|
| POST | `/api/auth/login` | Iniciar sesión | 10/15min |
| POST | `/api/auth/register` | Registrarse | 10/15min |

### Usuarios (Protegidos)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/profile` | Perfil del usuario actual |
| GET | `/api/users` | Listar usuarios (admin) |
| GET | `/api/users/:id` | Obtener usuario |
| PUT | `/api/users/:id` | Actualizar usuario |
| DELETE | `/api/users/:id` | Eliminar usuario (admin) |

### Sistema

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

### Respuesta

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

### Usar token

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

## Validación

El registro requiere:
- Username: 3-30 caracteres, solo letras, números, _ y -
- Password: Mínimo 6 caracteres, debe incluir mayúscula, minúscula y número
- Email: Formato válido

## Notas de Seguridad

⚠️ **Producción**:
1. Cambiar `JWT_SECRET` a un valor seguro
2. Configurar `ALLOWED_ORIGINS`
3. Usar HTTPS
4. Implementar hashing de contraseñas (bcrypt)
5. Usar base de datos real

## Tech Stack

- Express.js
- JWT
- Helmet
- express-rate-limit
- express-validator
