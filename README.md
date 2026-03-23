# 🖥️ Node.js Backend

[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://docker.com)

## 📋 Descripción

Backend robusto con Node.js para APIs y servicios. Incluye configuración lista para producción.

## ✨ Características

- ⚡ **Node.js 20+**: Runtime moderno
- 🐳 **Docker**: Multi-stage builds
- 🔒 **Seguridad**: Helmet, validation
- 📊 **Logging**: Winston
- ✅ **Testing Ready**: Estructura para tests

## 🚀 Uso

```bash
npm install
npm run dev    # Desarrollo
npm start      # Producción
```

### Docker

```bash
docker build -t nodejs-backend .
docker run -p 3000:3000 nodejs-backend
```

## 📁 Estructura

```
nodejs-backend-20260321/
├── .dockerignore
├── .env.example
├── .github/
├── .gitignore
├── .grype.yaml
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── Dockerfile
├── LICENSE
├── Makefile
├── README.md
├── SECURITY.md
├── docker-compose.yml
├── index.js
└── package.json
```

## ⚙️ Configuración

| Variable | Default |
|----------|---------|
| `PORT` | 3000 |
| `NODE_ENV` | development |

## 📝 Licencia

MIT - [LICENSE](LICENSE)
