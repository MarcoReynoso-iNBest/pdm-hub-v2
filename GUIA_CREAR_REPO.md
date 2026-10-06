# 📌 Guía: Crear Repo Nuevo en GitHub con Todos los Archivos

## ✅ Paso 1: Crear el Repo en GitHub

1. Ve a: https://github.com/new
2. Llena así:
   - **Repository name:** `pdm-activity-tracker-v2`
   - **Description:** `PDM Activity Tracker - Next.js Dashboard con Charts, Pipeline, Financials`
   - **Público** ✓
   - **Add a README file** ✓
   - Click **"Create repository"**

3. GitHub te da la URL: `https://github.com/MarcoReynoso-iNBest/pdm-activity-tracker-v2.git`

---

## ✅ Paso 2: Descargar los 11 Archivos

Todos están listos en esta carpeta. Los archivos son:

### 📦 Raíz (11 archivos):
- ✅ `package.json`
- ✅ `next.config.js`
- ✅ `tailwind.config.js`
- ✅ `postcss.config.js`
- ✅ `.gitignore`
- ✅ `.eslintrc.json`
- ✅ `README.md`
- ✅ `layout.jsx`
- ✅ `page.jsx`
- ✅ `globals.css`
- ✅ `DashboardApp.jsx`

---

## ✅ Paso 3: Estructura de Carpetas en el Repo

El repo debe quedar así:

```
pdm-activity-tracker-v2/
├── .eslintrc.json              ← Raíz
├── .gitignore                  ← Raíz
├── README.md                   ← Raíz
├── next.config.js              ← Raíz
├── package.json                ← Raíz
├── postcss.config.js           ← Raíz
├── tailwind.config.js          ← Raíz
└── app/
    ├── globals.css             ← Dentro de app/
    ├── layout.jsx              ← Dentro de app/
    ├── page.jsx                ← Dentro de app/
    └── dashboard/
        └── DashboardApp.jsx    ← Dentro de app/dashboard/
```

---

## ✅ Opción A: Upload Directo en GitHub (MÁS FÁCIL)

### 1. Ve al repo que creaste
`https://github.com/MarcoReynoso-iNBest/pdm-activity-tracker-v2`

### 2. Sube los archivos raíz
- Click en **"Add file"** → **"Upload files"**
- Arrastra estos 8 archivos:
  ```
  .eslintrc.json
  .gitignore
  README.md
  next.config.js
  package.json
  postcss.config.js
  tailwind.config.js
  ```
- Dejar `layout.jsx`, `page.jsx`, `globals.css`, `DashboardApp.jsx` por ahora
- Commit message: `feat: Initial setup with config files`
- Click **"Commit changes"**

### 3. Crea la carpeta `app/`
- Click en **"Add file"** → **"Create new file"**
- En el nombre escribe: `app/.gitkeep`
- Click **"Commit changes"** (para crear la carpeta)

### 4. Crea la carpeta `app/dashboard/`
- Click en **"Add file"** → **"Create new file"**
- En el nombre escribe: `app/dashboard/.gitkeep`
- Click **"Commit changes"**

### 5. Sube los archivos en `app/`
- Click **"Add file"** → **"Upload files"**
- Sube estos 3:
  ```
  layout.jsx
  page.jsx
  globals.css
  ```
- En el campo de carpeta, escribe: `app/`
- Commit message: `feat: Add app layout and styles`
- Click **"Commit changes"**

### 6. Sube `DashboardApp.jsx` en `app/dashboard/`
- Click **"Add file"** → **"Upload files"**
- Sube: `DashboardApp.jsx`
- En el campo de carpeta, escribe: `app/dashboard/`
- Commit message: `feat: Add Dashboard component`
- Click **"Commit changes"**

---

## ✅ Opción B: Desde tu Computadora (Git CLI)

### 1. Clona el repo nuevo
```bash
git clone https://github.com/MarcoReynoso-iNBest/pdm-activity-tracker-v2.git
cd pdm-activity-tracker-v2
```

### 2. Crea la estructura de carpetas
```bash
mkdir -p app/dashboard
```

### 3. Copia todos los archivos a sus lugares

**Archivos en raíz:**
```bash
cp .eslintrc.json .
cp .gitignore .
cp README.md .
cp next.config.js .
cp package.json .
cp postcss.config.js .
cp tailwind.config.js .
```

**Archivos en `app/`:**
```bash
cp layout.jsx app/
cp page.jsx app/
cp globals.css app/
```

**Archivos en `app/dashboard/`:**
```bash
cp DashboardApp.jsx app/dashboard/
```

### 4. Commit y Push
```bash
git add .
git commit -m "feat: Initial PDM Activity Tracker v2 setup"
git push -u origin main
```

---

## ✅ Paso 4: Espera a que Vercel Depliegue

1. Ve a https://vercel.com/dashboard
2. Busca `pdm-activity-tracker-v2`
3. Vercel auto-detecta Next.js y comienza a compilar
4. Espera **2-3 minutos** hasta que diga **"Ready"** ✅

---

## ✅ Paso 5: Verifica el Resultado

Una vez que Vercel diga "Ready", abre la URL que te proporciona (algo como):
```
https://pdm-activity-tracker-v2.vercel.app
```

Deberías ver:
- ✅ Dashboard cargado
- ✅ 6 vistas (Kanban, Tabla, Gráficos, Matriz, Pipeline, Financieros)
- ✅ Filtros funcionando
- ✅ Datos de mock listos

---

## 📋 Checklist Final

- [ ] Repo creado: `pdm-activity-tracker-v2`
- [ ] 11 archivos subidos en estructura correcta
- [ ] Vercel conectado y compiló OK
- [ ] Dashboard abierto en navegador
- [ ] Todas las 6 vistas funcionan
- [ ] Filtros responden
- [ ] Chart.js renderiza gráfico

---

## 🆘 Si Algo Falla

**Error: "Module not found: Can't resolve './globals.css'"**
→ Verifica que `globals.css` esté en `app/` (no en raíz)

**Error: "Chart is not defined"**
→ Verifica que `chart.js` esté en `package.json` dependencies

**Vercel no compila:**
→ Espera 5 min más, revisa la consola de Vercel

---

## ✅ ¡LISTO!

Tu dashboard PDM está vivo en Vercel. Cada push a `main` despliega automáticamente.

**Próximos pasos:**
1. Integrar con API real (si tienes base de datos)
2. Conectar autenticación (login)
3. Agregar más funcionalidades según necesites

