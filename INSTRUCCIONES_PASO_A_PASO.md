# 📋 Sincronización PDM Hub — Instrucciones Paso a Paso

## 🎯 Objetivo
Sincronizar tu repositorio GitHub (`pdm-activity-tracker`) con la versión mejorada de Vercel que tiene:
- ✅ Vistas: Kanban, Tabla, Gráficos
- ✅ Matriz de Priorización PDM
- ✅ Pipeline Overview
- ✅ Análisis Financiero (Incomes & COGs)
- ✅ Filtros multi-select avanzados

---

## 📌 Antes de Empezar

### Verificar que tienes todo:
```bash
# 1. Clona tu repo (si no lo tienes)
git clone https://github.com/MarcoReynoso-iNBest/pdm-activity-tracker.git
cd pdm-activity-tracker

# 2. Verifica la rama actual
git branch
# Deberías ver algo como: * main

# 3. Actualiza npm
npm install
```

---

## 🚀 OPCIÓN A: Script Automático (Recomendado)

### Paso 1: Descarga los archivos nuevos
Coloca estos 4 archivos en la raíz de tu proyecto:
- `DashboardApp.jsx.nuevo` 
- `globals.css.nuevo`
- `MIGRATION_GUIDE.md`
- `SYNC_SCRIPT.sh`

### Paso 2: Ejecuta el script
```bash
# Dale permisos de ejecución
chmod +x SYNC_SCRIPT.sh

# Ejecuta
bash SYNC_SCRIPT.sh
```

El script hará automáticamente:
- ✅ Crear rama `migrate/vercel-sync`
- ✅ Backup del estado actual
- ✅ Copiar archivos actualizados
- ✅ Instalar dependencias (Chart.js si falta)
- ✅ Test de compilación
- ✅ Hacer commit

### Paso 3: Verifica e integra
```bash
# Ver los cambios
git log --oneline -3

# Enviar a GitHub
git push -u origin migrate/vercel-sync

# En GitHub, crea Pull Request (PR)
# Merge a main después de revisar
```

---

## 🔧 OPCIÓN B: Manual Paso a Paso

### Paso 1: Crear rama de desarrollo
```bash
git checkout -b migrate/vercel-sync
```

### Paso 2: Hacer backup del código actual
```bash
git stash
# Esto guarda un snapshot en caso de necesitarlo luego
```

### Paso 3: Copiar estilos actualizados
```bash
# Reemplaza el archivo CSS
cp globals.css.nuevo app/globals.css

# O si prefieres hacerlo manual:
# 1. Abre app/globals.css
# 2. Copia todo el contenido de globals.css.nuevo
# 3. Pega en app/globals.css
# 4. Guarda
```

### Paso 4: Actualizar el Dashboard
```bash
# Reemplaza el componente principal
cp DashboardApp.jsx.nuevo app/dashboard/DashboardApp.jsx

# O manual:
# 1. Abre app/dashboard/DashboardApp.jsx
# 2. Copia todo de DashboardApp.jsx.nuevo
# 3. Pega en DashboardApp.jsx
# 4. Guarda
```

### Paso 5: Instalar dependencia de gráficos (si falta)
```bash
# Verifica si Chart.js está en package.json
grep "chart.js" package.json

# Si NO aparece, instálalo:
npm install chart.js

# Si SÍ aparece, solo:
npm install
```

### Paso 6: Test en local
```bash
# Inicia el servidor de desarrollo
npm run dev

# Debería iniciar en http://localhost:3000
# Si ves errores, revisa la consola
```

### Paso 7: Verificar cambios
```bash
# Ver qué cambió
git status

# Ver líneas modificadas
git diff app/globals.css | head -50
git diff app/dashboard/DashboardApp.jsx | head -50
```

### Paso 8: Commit
```bash
git add app/globals.css app/dashboard/DashboardApp.jsx package*.json

git commit -m "feat: Sincronizar con Vercel — agregar Charts, Matriz, Pipeline, Incomes & COGs"
```

### Paso 9: Push a GitHub
```bash
git push -u origin migrate/vercel-sync
```

### Paso 10: Crear Pull Request
1. Ve a https://github.com/MarcoReynoso-iNBest/pdm-activity-tracker
2. Verás un banner: "Compare & pull request"
3. Click en el botón verde
4. Rellena descripción (puedes copiar de MIGRATION_GUIDE.md)
5. Click en "Create pull request"

### Paso 11: Revisar & Merge
1. Revisa los cambios en la PR
2. Si todo se ve bien, click en "Merge pull request"
3. Confirma la fusión

### Paso 12: Sync a main local
```bash
git checkout main
git pull origin main

# Ahora main tiene los cambios nuevos
```

---

## 🧪 Verificación Post-Migración

### En Local (npm run dev)
- [ ] Login funciona
- [ ] Dashboard carga con datos
- [ ] Kanban view: ver 5 columnas (Pendiente, Progreso, Bloqueado, Completado, Archivado)
- [ ] Table view: tabla con columnas principales
- [ ] Charts view: gráfico de distribución
- [ ] Matriz de Priorización: ve la página completa
- [ ] Pipeline Overview: ve las etapas (Pending → Collected)
- [ ] Financials: Ingresos, COGs, Margen

### En Vercel Deployment
1. Espera a que Vercel detecte el nuevo push
2. Va a https://pdm-hub.vercel.app
3. Repite las mismas pruebas de arriba
4. Verifica que no hay errores en la consola de browser (F12 > Console)

---

## 🔍 Solución de Problemas

### Error: "Module not found: 'chart.js'"
```bash
npm install chart.js
npm run dev
```

### Error: "DashboardApp is not a default export"
Asegúrate que en `app/dashboard/DashboardApp.jsx` termina con:
```javascript
export default function DashboardApp() { ... }
```

### Error: CSS no carga bien
1. Abre DevTools (F12)
2. Va a "Console"
3. Busca errores en rojo
4. Si dice "variable not defined", revisa que `:root { ... }` esté al inicio de globals.css

### Kanban no muestra las tarjetas
1. Verifica que tienes datos en la DB (Postgres)
2. Revisa la API: va a /api/activities
3. Ve a la consola del navegador (F12) y busca "Error loading activities"

### Charts no renderiza
Si ves el área vacía en "Charts view":
1. Verifica que Chart.js está en package.json: `npm list chart.js`
2. Si no está, instala: `npm install chart.js`
3. Reinicia: `npm run dev`

---

## 📊 Cambios Resumidos

### DashboardApp.jsx
**Antes (857 líneas):**
- Solo Kanban view
- Filtros básicos
- Sin gráficos
- Sin matriz ni pipeline

**Después (800+ líneas):**
- ✅ 4 componentes nuevos (Charts, Matriz, Pipeline, Financials)
- ✅ 3 vistas (Kanban, Table, Charts)
- ✅ Filtros avanzados multi-select
- ✅ Módulos aislados (nav-bar)

### globals.css
**Antes (20 KB):**
- Estilos básicos
- Kanban
- Tarjetas

**Después (30 KB):**
- ✅ Paleta de colores iNBest completa
- ✅ Todos los componentes (tabla, matriz, pipeline, financials)
- ✅ Responsive mejorado
- ✅ Temas de color para estados
- ✅ Animaciones suaves

---

## 📚 Archivos Incluidos

```
SYNC_SCRIPT.sh              ← Script automático (bash)
INSTRUCCIONES_PASO_A_PASO.md   ← Este archivo
MIGRATION_GUIDE.md          ← Guía técnica detallada
DashboardApp.jsx.nuevo      ← Nuevo componente principal
globals.css.nuevo           ← Nuevos estilos
```

---

## ✅ Checklist Final

Antes de dar por terminada la migración:

- [ ] Script ejecutado SIN errores (o pasos manuales completados)
- [ ] `npm run dev` funciona sin errores
- [ ] Verifies al menos 2 vistas (Kanban + Charts)
- [ ] Filters funcionan (selecciona un status y ve cambios)
- [ ] GitHub branch `migrate/vercel-sync` existe
- [ ] PR creado y revisado
- [ ] Merge a `main` completado
- [ ] `git pull origin main` trae los cambios nuevos
- [ ] Vercel auto-deploy detectó los cambios
- [ ] https://pdm-hub.vercel.app muestra las nuevas funcionalidades
- [ ] Datos en DB (Postgres) se sincronizan correctamente

---

## 🆘 Soporte

Si algo no funciona:

1. **Lee MIGRATION_GUIDE.md** (contexto técnico)
2. **Verifica los logs:**
   ```bash
   npm run dev
   # Busca errores en rojo
   ```
3. **Revisa la consola del navegador:**
   - F12 → Console
   - Network tab para errores API

4. **Restaura un backup si necesario:**
   ```bash
   git stash list
   # Ver todos los backups
   
   git stash pop stash@{0}
   # Restaurar el último
   ```

---

## 📞 Contacto

Cualquier duda, contacta a Marco Reynoso (PDM Lead).

---

**Última actualización:** Octubre 2026
