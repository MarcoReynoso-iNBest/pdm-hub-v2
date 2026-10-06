# Guía de Migración: PDM Hub — HTML a Next.js

## Estado Actual
- **Repositorio GitHub**: Next.js 16.3.1 + App Router (app/) + React 18.3.1
- **Vercel Deployment**: HTML monolítico (pdm_hub_3.html) con funcionalidades adicionales
- **Objetivo**: Sincronizar el repo GitHub con la versión mejorada de Vercel

## Diferencias Detectadas

### 1. Funcionalidades Adicionales en Vercel (NO en GitHub)
- **Matriz de Priorización PDM** (MTX: módulo aislado)
- **Pipeline Overview** (con STAGE_META + gráficos dinámicos)
- **Incomes & COGs** (análisis financiero)
- **Chart.js 4.4.1** integrado
- **Vistas extendidas**: Charts, Kanban mejorado, Table con filtros avanzados

### 2. Estructura en GitHub (Actual)
```
app/
├── dashboard/
│   ├── DashboardApp.jsx (857 líneas, lógica principal)
│   └── page.jsx
├── login/
├── api/
├── globals.css
└── layout.jsx
lib/
├── assets.js (logo)
├── credentials.js
├── db.js
└── session.js
```

### 3. Lo que Necesita Sincronizarse

#### A. Estilos CSS Actualizados
- Paleta de colores mejorada (vars en :root)
- Tipografía Geist (incluida en assets)
- Componentes: kanban, charts, matriz, tabla

#### B. Componentes Faltantes
- ChartView (renderCharts → React)
- MatrizPriorizacion (MTX → componente)
- PipelineOverview (STAGE_META → React)
- IncomesCOGs (análisis financiero)

#### C. Datos y Estado
- Sincronización con Postgres (ya existe en app/api)
- Persistencia de filtros/vistas
- Timestamps (createdAt, closedAt)

## Plan de Migración (3 pasos)

### PASO 1: Actualizar DashboardApp.jsx
- Agregar componentes nuevos (ChartView, MatrizPriorizacion, etc.)
- Extender lógica de renderizado
- Mantener Backend (API routes existentes)

### PASO 2: Actualizar globals.css
- Importar estilos de Vercel
- Mantener diseño responsive
- Asegurar compatibilidad con componentes nuevos

### PASO 3: Crear componentes modulares
- ChartView.jsx
- MatrizPriorizacion.jsx
- PipelineOverview.jsx
- IncomesCOGs.jsx

## Scripts de Migración

```bash
# 1. Hacer backup del repo actual
git checkout -b migrate/vercel-sync

# 2. Copiar estilos actualizados
cp globals.css.nuevo app/globals.css

# 3. Actualizar DashboardApp.jsx
cp DashboardApp.jsx.nuevo app/dashboard/DashboardApp.jsx

# 4. Crear componentes nuevos
mkdir -p app/dashboard/components
cp ChartView.jsx app/dashboard/components/
cp MatrizPriorizacion.jsx app/dashboard/components/
cp PipelineOverview.jsx app/dashboard/components/
cp IncomesCOGs.jsx app/dashboard/components/

# 5. Actualizar package.json si necesario
npm install

# 6. Test local
npm run dev

# 7. Push a GitHub
git add .
git commit -m "feat: Sincronizar con Vercel — agregar Charts, Matriz, Pipeline, Incomes"
git push origin migrate/vercel-sync
```

## Verificación Post-Migración

- [ ] Login funciona (Jose + session)
- [ ] Dashboard carga con datos de Postgres
- [ ] Vistas: Kanban, Tabla, Charts
- [ ] Matriz de Priorización aislada
- [ ] Pipeline Overview con gráficos
- [ ] Incomes & COGs calcula correctamente
- [ ] Filtros multi-select funcionan
- [ ] Persistencia en Postgres verificada
- [ ] Build Next.js sin errores
- [ ] Deploy a Vercel exitoso
