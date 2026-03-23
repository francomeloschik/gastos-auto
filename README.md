# 🚗 Gastos del Auto — PWA

App instalable para registrar combustible y mantenimiento del auto.
Funciona offline, se instala en el celular como app nativa, y se sincroniza con Google Sheets.

---

## 📁 Archivos del proyecto

```
index.html          ← La app completa
manifest.json       ← Configuración PWA (nombre, ícono, colores)
sw.js               ← Service Worker (modo offline)
google_apps_script.js ← Código para pegar en Google Apps Script
README.md           ← Este archivo
```

---

## 🚀 Paso 1 — Subir a GitHub Pages

1. Creá una cuenta en [github.com](https://github.com) si no tenés
2. Clic en **"New repository"** (botón verde)
3. Nombre: `gastos-auto` (o cualquiera)
4. Marcá **"Public"**
5. Clic en **"Create repository"**
6. En la pantalla siguiente, clic en **"uploading an existing file"**
7. Arrastrá los 4 archivos: `index.html`, `manifest.json`, `sw.js`, `google_apps_script.js`
8. Clic en **"Commit changes"**
9. Ir a **Settings** > **Pages** (menú izquierdo)
10. En "Source" seleccioná **"Deploy from a branch"**
11. Branch: **main**, folder: **/ (root)**
12. Clic en **Save**
13. En 2-3 minutos tu app estará en: `https://TU_USUARIO.github.io/gastos-auto`

---

## 📱 Paso 2 — Instalar en el celular

### Android (Chrome)
1. Abrí la URL en Chrome
2. Aparece un banner "Agregar a pantalla de inicio" → tocá **Instalar**
3. Si no aparece: menú ⋮ > **"Instalar app"** o **"Agregar a pantalla de inicio"**

### iPhone (Safari)
1. Abrí la URL en Safari (no funciona en Chrome en iOS)
2. Tocá el botón de compartir ↑
3. Scroll hacia abajo → **"Agregar a pantalla de inicio"**
4. Tocá **Agregar**

---

## 🔄 Paso 3 — Sincronización con Google Sheets (opcional)

Esto permite que los datos se guarden en una Google Sheet y estén disponibles
desde el celular y la PC al mismo tiempo.

### Crear el Apps Script

1. Abrí [sheets.google.com](https://sheets.google.com) y creá una planilla nueva
2. Nómbrala **"Gastos Auto"** (o como quieras)
3. Ir a **Extensiones > Apps Script**
4. Borrá todo el contenido del editor
5. Copiá y pegá el contenido de `google_apps_script.js`
6. Clic en 💾 (Guardar), nombrá el proyecto **"GastosAuto"**

### Implementar como web app

7. Clic en **"Implementar"** (botón azul arriba a la derecha)
8. Seleccioná **"Nueva implementación"**
9. Clic en el ⚙️ engranaje > **"Aplicación web"**
10. Configurar así:
    - **Descripción**: GastosAuto
    - **Ejecutar como**: Yo (tu cuenta)
    - **Quién tiene acceso**: Cualquier persona
11. Clic en **"Implementar"**
12. Google te pide permiso → **"Autorizar acceso"** → elegí tu cuenta → **"Permitir"**
13. Copiá la **URL de la aplicación web** (empieza con `https://script.google.com/macros/s/...`)

### Conectar con la app

14. Abrí la app en el celular o PC
15. Tocá el botón **"Sync"** (arriba a la derecha)
16. Pegá la URL en el campo **"URL del Apps Script Web App"**
17. Tocá **"Sincronizar con Google Sheets"**
18. ✅ Todos tus registros se copian a la planilla

A partir de ahora, cada vez que guardás un gasto nuevo desde la app, se envía automáticamente a Sheets. Para sincronizar desde otro dispositivo: abrí la app, configurá la misma URL, y tocá Sync.

---

## 💡 Notas

- Los datos se guardan **localmente** en cada dispositivo (localStorage)
- La sincronización con Sheets es el puente entre dispositivos
- La app funciona **sin internet** gracias al Service Worker
- Para transferir datos manualmente: Sync > Exportar JSON en un dispositivo, Importar JSON en el otro
