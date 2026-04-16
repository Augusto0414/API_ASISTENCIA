# API de Asistencia 📚

API RESTful para gestión de asistencia de estudiantes, profesores, clases y datos asociados.

## 📋 Qué hace

- ✅ Registrar estudiantes, profesores y clases
- ✅ Controlar asistencia de estudiantes por clase
- ✅ Consultar reportes de asistencia
- ✅ Documentación interactiva con Swagger/OpenAPI

**Stack:** Node.js 20 + Express + TypeORM + PostgreSQL (Supabase)

---

## 🚀 Ejecución Local

### Requisitos

- Node.js 20+
- Docker & Docker Compose (opcional)

### Pasos

1. **Clonar**

   ```bash
   git clone https://github.com/Augusto0414/API_ASISTENCIA.git
   cd API_ASISTENCIA
   npm install
   ```

2. **Configurar `.env`**

   ```env
   PORT=3000
   NODE_ENV=development
   DATABASE_URL=postgres://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>
   ```

   Para Supabase: copia la URL desde el dashboard (Settings → Database → Connection string). **⚠️ No compartas credenciales públicamente.**

3. **Ejecutar**

   ```bash
   # Desarrollo
   npm run dev

   # O con Docker
   docker-compose up -d
   ```

4. **Acceder**
   - API: `http://localhost:3000`
   - Swagger: `http://localhost:3000/docs`

---

## 📡 Endpoints principales

| Método | Ruta          | Descripción        |
| ------ | ------------- | ------------------ |
| GET    | `/asistencia` | Listar asistencias |
| POST   | `/asistencia` | Crear asistencia   |
| GET    | `/profesor`   | Listar profesores  |
| GET    | `/estudiante` | Listar estudiantes |
| GET    | `/clases`     | Listar clases      |
| GET    | `/docs`       | Swagger UI         |

---

## 🌐 APIs Externas

- **Supabase** (PostgreSQL cloud)
  - Connection string en `DATABASE_URL`
  - SSL automático con `sslmode=prefer`

---

## ☁️ Despliegue en Azure

### Arquitectura

```
GitHub (push a main)
  ↓
GitHub Actions (build & push Docker)
  ↓
GitHub Container Registry (ghcr.io)
  ↓
Azure App Service (descarga imagen)
  ↓
API pública en HTTPS
```

### Pasos de despliegue

#### 1. Crear App Service

```bash
az group create --name <RESOURCE_GROUP> --location <REGION>

az appservice plan create --name <PLAN_NAME> \
  --resource-group <RESOURCE_GROUP> --sku B1 --is-linux

az webapp create --resource-group <RESOURCE_GROUP> \
  --plan <PLAN_NAME> --name <APP_NAME> \
  --runtime "NODE|20-lts"
```

#### 2. Configurar Docker desde GitHub Container Registry

```bash
# Crea un Personal Access Token en GitHub (read:packages)
# https://github.com/settings/tokens
# ⚠️ Guarda el token en una variable de entorno, NO en el código

az webapp config container set --name <APP_NAME> \
  --resource-group <RESOURCE_GROUP> \
  --container-image-name ghcr.io/<GITHUB_USER>/<IMAGE_NAME>:latest \
  --container-registry-url https://ghcr.io \
  --container-registry-user <GITHUB_USER> \
  --container-registry-password $env:GITHUB_TOKEN
```

#### 3. Variables de entorno en Azure

```bash
az webapp config appsettings set --name <APP_NAME> \
  --resource-group <RESOURCE_GROUP> --settings \
  PORT=3000 \
  NODE_ENV=production \
  DATABASE_URL="postgres://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>"
```

#### 4. Despliegue automático

- El workflow `.github/workflows/ci-cd.yml` se ejecuta en cada `git push` a `main`
- Compila, construye imagen Docker, la pushea a `ghcr.io`
- Azure automáticamente descarga y ejecuta

**Resultado:** Solo necesitas `git push` → GitHub Actions → Azure redeploy automático

#### 5. Verificar despliegue

```bash
az webapp log tail --name <APP_NAME> \
  --resource-group <RESOURCE_GROUP>

# Acceder
curl https://<APP_NAME>.azurewebsites.net/docs
```

### Azure Storage para archivos (opcional)

Si necesitas subir archivos (fotos, documentos):

```bash
# Crear Storage Account
az storage account create --name <STORAGE_NAME> \
  --resource-group <RESOURCE_GROUP> --sku Standard_LRS

# Crear contenedor
az storage container create --account-name <STORAGE_NAME> \
  --name uploads

# Generar SAS token (acceso temporal - ⚠️ Usa fecha futura)
az storage account generate-sas --account-name <STORAGE_NAME> \
  --services b --resource-types sco \
  --permissions racwd --expiry <YYYY-MM-DD>T23:59Z -o tsv
```

**En código Node.js:**

```typescript
import { BlobServiceClient } from "@azure/storage-blob";

const blobClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const container = blobClient.getContainerClient("uploads");
const block = container.getBlockBlobClient("archivo.pdf");
await block.upload(buffer, buffer.length);
```

---

## 🔑 Variables de entorno

**Desarrollo:**

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgres://<USER>:<PASSWORD>@localhost:5432/asistencia
```

**Producción (Azure):**

```env
PORT=3000
NODE_ENV=production
DATABASE_URL=postgres://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>
DOCKER_REGISTRY_SERVER_URL=https://ghcr.io
DOCKER_REGISTRY_SERVER_USERNAME=<GITHUB_USER>
DOCKER_REGISTRY_SERVER_PASSWORD=<GITHUB_PAT_TOKEN>
AZURE_STORAGE_CONNECTION_STRING=<STORAGE_CONNECTION_STRING>
```

⚠️ **Nunca commitees credenciales en el código. Usa variables de entorno o Azure Key Vault.**

---

## 🛠️ Comandos útiles

```bash
npm run dev       # Desarrollo con nodemon
npm run build     # Compilar TypeScript
npm start         # Producción
```

---

## 📖 Documentación API

**Swagger UI:**

- Local: `http://localhost:3000/docs`
- Producción: `https://<APP_NAME>.azurewebsites.net/docs`

---

## 👨‍💻 Autor

**Augusto0414**

## 📄 Licencia

MIT
