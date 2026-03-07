# Vanilla Prepaid - Configuración con Railway

## 📦 Archivos del Backend

- `server.js` - Servidor Express que maneja el webhook de Discord
- `package.json` - Dependencias del proyecto Node.js
- `.env.example` - Ejemplo de variables de entorno necesarias
- `.gitignore` - Archivos que no se deben subir a Git

## 🚀 Desplegar en Railway

### Paso 1: Preparar el repositorio
1. Sube tu código a GitHub (o GitLab/Bitbucket)
2. Asegúrate de que `.gitignore` esté configurado correctamente

### Paso 2: Crear proyecto en Railway
1. Ve a [railway.app](https://railway.app)
2. Inicia sesión con GitHub
3. Haz clic en **New Project**
4. Selecciona **Deploy from GitHub repo**
5. Conecta tu repositorio

### Paso 3: Configurar Variable de Entorno
1. En tu proyecto de Railway, ve a la pestaña **Variables**
2. Haz clic en **New Variable**
3. Agrega la variable:
   - **Variable Name:** `DISCORD_WEBHOOK_URL`
   - **Value:** Tu webhook URL de Discord completa
4. Railway detectará automáticamente la variable `PORT`

### Paso 4: Desplegar
Railway desplegará automáticamente tu proyecto. Obtendrás una URL como:
```
https://tu-proyecto.up.railway.app
```

### Paso 5: Actualizar el Frontend
En tu archivo [index.html](index.html), actualiza la URL de la API con tu URL de Railway:

```javascript
// Reemplazar esto:
fetch('/.netlify/functions/submit-form', {

// Por esto (usando tu URL de Railway):
fetch('https://tu-proyecto.up.railway.app/api/submit-form', {
```

## 🧪 Probar Localmente

```bash
# Instalar dependencias
npm install

# Crear archivo .env local (NO SUBIR A GIT)
echo "DISCORD_WEBHOOK_URL=tu_webhook_aqui" > .env
echo "PORT=3000" >> .env

# Ejecutar servidor de desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## 📝 Endpoints Disponibles

- `POST /api/submit-form` - Endpoint para enviar datos del formulario
- `GET /health` - Health check del servidor

## ✅ Verificación

1. Una vez desplegado, prueba el health check:
   ```
   https://tu-proyecto.up.railway.app/health
   ```

2. Deberías ver: `{"status":"ok"}`

## 🔒 Seguridad

- ✅ El webhook URL nunca se expone al cliente
- ✅ La variable de entorno solo está disponible en el servidor Railway
- ✅ CORS configurado para aceptar peticiones desde tu frontend
- ✅ El archivo `.env` está en `.gitignore` para protección local

## 💰 Costos

Railway ofrece:
- **$5 USD** de crédito gratis cada mes
- Sin tarjeta de crédito necesaria para empezar
- Suficiente para proyectos pequeños y medianos
