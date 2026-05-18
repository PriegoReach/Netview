# ============================================================
# Archivo: yii2basicapp/Dockerfile
# 
# Multi-stage build:
#   Stage 1 (builder): Compila Angular/Ionic a archivos estáticos
#   Stage 2 (runtime): Nginx liviano que sirve los archivos
#
# Resultado: imagen final ~50MB en lugar de ~1GB
# ============================================================

# ──── STAGE 1: BUILD ──────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json y lock primero (aprovecha cache de Docker)
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci --legacy-peer-deps

# Copiar el resto del código fuente
COPY . .

# Build de producción con configuración prod (usa environment.prod.ts)
# El output va a www/ por defecto en proyectos Ionic
RUN npm run build -- --configuration=production

# ──── STAGE 2: RUNTIME ────────────────────────────────────────
FROM nginx:1.27-alpine

# Eliminar configuración default de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar el build al directorio que sirve Nginx
# IMPORTANTE: Angular 20 puede outputtear a www/ o www/browser/
# El COPY de abajo cubre ambos casos
COPY --from=builder /app/www/ /usr/share/nginx/html/

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80 (interno del contenedor)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
