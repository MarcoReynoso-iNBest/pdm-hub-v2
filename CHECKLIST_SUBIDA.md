# ✅ Checklist de Subida a GitHub

## 📌 Antes de Empezar

- [ ] Crear nuevo repo en GitHub: `pdm-activity-tracker-v2`
- [ ] Copiar la URL del repo (ej: `https://github.com/MarcoReynoso-iNBest/pdm-activity-tracker-v2.git`)

---

## 📤 Opción 1: Upload en GitHub UI (Recomendado - Sin Git)

### Paso 1: Sube archivos en RAÍZ
Go to: `https://github.com/MarcoReynoso-iNBest/pdm-activity-tracker-v2`

Click: **"Add file"** → **"Upload files"**

Arrastra y suelta estos 8 archivos:
```
□ .eslintrc.json
□ .gitignore
□ README.md
□ next.config.js
□ package.json
□ postcss.config.js
□ tailwind.config.js
```

⚠️ **NO incluyas layout.jsx, page.jsx, globals.css, DashboardApp.jsx aquí**

Commit message: `feat: Initial config files`

Click: **"Commit changes"**

### Paso 2: Crea carpeta `app/`
Click: **"Add file"** → **"Create new file"**

Name: `app/.gitkeep`

Click: **"Commit changes"**

### Paso 3: Crea subcarpeta `app/dashboard/`
Click: **"Add file"** → **"Create new file"**

Name: `app/dashboard/.gitkeep`

Click: **"Commit changes"**

### Paso 4: Sube archivos en `app/`
Click: **"Add file"** → **"Upload files"**

Arrastra estos 3:
```
□ layout.jsx
□ page.jsx
□ globals.css
```

En el campo "Folder path", escribe: `app`

Commit message: `feat: Add app structure and styles`

Click: **"Commit changes"**

### Paso 5: Sube archivo en `app/dashboard/`
Click: **"Add file"** → **"Upload files"**

Arrastra:
```
□ DashboardApp.jsx
```

En el campo "Folder path", escribe: `app/dashboard`

Commit message: `feat: Add Dashboard component`

Click: **"Commit changes"**

---

## 📤 Opción 2: Git CLI (Línea de Comandos)

```bash
# Clona
git clone https://github.com/MarcoReynoso-iNBest/pdm-activity-tracker-v2.git
cd pdm-activity-tracker-v2

# Crea carpetas
mkdir -p app/dashboard

# Copia archivos
cp -v /ruta/a/outputs/.eslintrc.json .
cp -v /ruta/a/outputs/.gitignore .
cp -v /ruta/a/outputs/README.md .
cp -v /ruta/a/outputs/next.config.js .
cp -v /ruta/a/outputs/package.json .
cp -v /ruta/a/outputs/postcss.config.js .
cp -v /ruta/a/outputs/tailwind.config.js .

cp -v /ruta/a/outputs/layout.jsx app/
cp -v /ruta/a/outputs/page.jsx app/
cp -v /ruta/a/outputs/globals.css app/

cp -v /ruta/a/outputs/DashboardApp.jsx app/dashboard/

# Commit y push
git add .
git commit -m "feat: PDM Activity Tracker v2 - Initial setup"
git push -u origin main
```

---

## ⏳ Paso 6: Espera a Vercel

1. Ve a: https://vercel.com/dashboard
2. Busca: `pdm-activity-tracker-v2`
3. Espera hasta que diga **"Ready"** (2-3 min) ✅

---

## 🎯 Paso 7: Verifica

Abre la URL que Vercel te proporciona:
```
https://pdm-activity-tracker-v2.vercel.app
```

Deberías ver:
- ✅ Dashboard con 6 vistas
- ✅ Kanban, Tabla, Gráficos, Matriz, Pipeline, Financieros
- ✅ Filtros funcionan
- ✅ Datos de mock cargados

---

## 🆘 Troubleshooting

| Error | Solución |
|-------|----------|
| "Cannot find module './globals.css'" | Verifica que `globals.css` esté en `app/`, no en raíz |
| "Chart is not defined" | Revisa `package.json` tiene `chart.js` en dependencies |
| Vercel sigue compilando después de 5 min | Chequea en Vercel Dashboard si hay errores de build |
| No se ven los estilos | Tailwind necesita `npm install` - Vercel lo hace automático |

---

## ✅ Final Checklist

- [ ] 7 archivos en RAÍZ
- [ ] 3 archivos en `app/`
- [ ] 1 archivo en `app/dashboard/`
- [ ] Repo en GitHub: https://github.com/MarcoReynoso-iNBest/pdm-activity-tracker-v2
- [ ] Vercel muestra "Ready" (verde) ✅
- [ ] Dashboard carga en navegador
- [ ] Todas las 6 vistas funcionan
- [ ] Filtros responden

🎉 **¡LISTO! Tu dashboard está vivo en Vercel.**

