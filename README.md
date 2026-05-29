# NetView

Plataforma de streaming tipo Netflix construida con **Yii2** (backend REST API) e **Ionic 8 + Angular 20** (frontend móvil).

## 🎬 Características

- Catálogo de películas y series con géneros e idiomas
- Búsqueda y filtros por categoría
- Sistema de favoritos
- Múltiples perfiles por usuario
- Sistema de roles (cliente / admin)
- Panel administrativo completo (CRUDs)
- Subida de imágenes (portadas y avatares)
- Autenticación JWT-like con Bearer Token

## 🛠 Stack

- **Backend:** PHP 8.2 + Yii2 + MariaDB 10.6
- **Frontend:** Ionic 8 + Angular 20 + TypeScript
- **Infra:** Docker + Docker Compose
- **Auth:** Webvimark UserManagement

## 📁 Estructura del repositorio

```
netview/
├── yii2basic/         ← Backend Yii2 (API REST)
│   ├── controllers/
│   ├── models/
│   ├── config/
│   ├── web/imagenes/  ← Uploads (no se versiona)
│   └── docker-compose.yml
│
└── yii2basicapp/      ← Frontend Ionic
    ├── src/app/
    └── Dockerfile
```

## 🚀 Levantar localmente

### Requisitos
- Docker Desktop instalado
- Git

### Pasos

```bash
# 1. Clonar el repo
git clone https://github.com/PriegoReach/Netview.git
cd netview

# 2. Levantar todo
docker compose up -d

# 3. Aplicar migraciones y seed (primera vez)
docker exec -it netview_php bash -c "cd /var/www/html && php yii migrate"
docker exec -it netview_php bash -c "cd /var/www/html && php seed.php"
```

### Acceso

- **Backend API:** http://localhost
- **Frontend Ionic:** http://localhost:8100
- **phpMyAdmin:** http://localhost:8080
- **MariaDB:** localhost:3308

### Credenciales de prueba

| Usuario | Contraseña | Rol |
|---|---|---|
| superadmin | admin | Admin |
| miguel_premium | Test1234 | Admin |
| carlos_basico | Test1234 | cliente |
| sofia_estandar | Test1234 | cliente |

## 📚 Documentación adicional

- [Backend (Yii2)](./yii2basic/README.md)
- [Frontend (Ionic)](./yii2basicapp/README.md)
- [Despliegue en Azure](./docs/AZURE.md)

## 📝 Licencia

MIT
