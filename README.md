# NodeJS Express REST API

## Descripción
API REST con Express.js y autenticación JWT.

## Instalación
```bash
npm install
```

## Ejecución
```bash
npm start
```

## Endpoints
- `GET /api/health` - Health check
- `POST /api/login` - Login (admin/admin)
- `GET /api/protected` - Endpoint protegido

## Autenticación
Usar JWT en header: `Authorization: Bearer <token>`

## Tests
```bash
npm test
```
