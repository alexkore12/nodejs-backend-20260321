# Node.js Backend

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-latest-red.svg)](https://www.npmjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI-blue.svg)](.github/workflows/ci.yml)
[![Dependabot](https://img.shields.io/badge/Dependabot-Enabled-brightgreen.svg)](.github/dependabot.yml)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://docker.com)

## 📋 Descripción

Backend Node.js modular y escalable para aplicaciones modernas.

## ✨ Características

- 🚀 **Express.js** - Framework web rápido y minimalista
- 📦 **Modular** - Arquitectura de módulos separada
- 🔄 **REST API** - Endpoints RESTful bien estructurados
- 🐳 **Docker** - Containerización lista para producción
- 🔒 **Security** - Headers de seguridad y validación

## 🚀 Instalación

```bash
# Local
npm install
npm start

# Docker
docker build -t nodejs-backend .
docker run -p 3000:3000 nodejs-backend
```

## 📁 Estructura

```
nodejs-backend-20260321/
├── .dockerignore
├── .env.example
├── .gitattributes
├── .gitignore
├── .github/
│   ├── workflows/ci.yml
│   ├── ISSUE_TEMPLATE/
│   ├── dependabot.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── .grype.yaml
├── CODE_OF_CONDUCT.md
├── CODEOWNERS
├── CONTRIBUTING.md
├── deploy.sh                # Script de despliegue
├── docker-compose.yml
├── Dockerfile
├── health_check.py          # Verificación de salud
├── index.js                 # Punto de entrada principal
├── LICENSE
├── Makefile
├── package.json
├── README.md
├── scripts/
│   └── setup.sh             # Script de instalación
├── security.js              # Configuración de seguridad
├── SECURITY.md
├── setup.sh                 # Script de inicialización
└── tests/
    └── api.test.js          # Tests de la API
```

## 🔌 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/items` | Listar items |
| POST | `/api/items` | Crear item |
| PUT | `/api/items/:id` | Actualizar item |
| DELETE | `/api/items/:id` | Eliminar item |

## 🧪 Testing

```bash
npm test
npm run lint
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📝 Licencia

MIT - ver [LICENSE](LICENSE).

---

⭐️ Dale una estrella si te fue útil!

---
⌨️ with ❤️ by [@alexkore12](https://github.com/alexkore12)
