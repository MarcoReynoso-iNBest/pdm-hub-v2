# 📊 PDM Activity Tracker v2

**PDM Activity Tracker** es un dashboard moderno para el equipo PDM de iNBest, construido con **Next.js 16.3.1**, **React 18.3.1**, y **Tailwind CSS**.

## 🎯 Características

✅ **6 Vistas Principales:**
- 📋 **Kanban** - Actividades por etapa visual
- 📄 **Tabla** - Vista tabular completa
- 📈 **Gráficos** - Análisis con Chart.js (doughnut)
- 🎯 **Matriz de Priorización** - Matriz de actividades por prioridad/categoría
- 📊 **Pipeline** - Overview de oportunidades por etapa
- 💰 **Financieros** - Análisis de ingresos, COGs y márgenes

✅ **Filtros Avanzados:**
- Por Responsable (Owner)
- Por Categoría
- Por Etapa del Pipeline
- Combinables y reseteables

✅ **Análisis Financiero:**
- Total de Ingresos
- Total de COGs
- Margen Neto
- Desglose por Responsable

## 🚀 Tecnología

```
Frontend:   Next.js 16.3.1 + React 18.3.1
Styling:    Tailwind CSS 3.4.1
Charts:     Chart.js 4.4.1
Database:   Neon Postgres (serverless)
Auth:       jose (JWT)
Deploy:     Vercel (auto)
```

## 📦 Instalación

### Clonar el repositorio:
```bash
git clone https://github.com/MarcoReynoso-iNBest/pdm-activity-tracker-v2.git
cd pdm-activity-tracker-v2
```

### Instalar dependencias:
```bash
npm install
```

### Ejecutar en desarrollo:
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Estructura del Proyecto

```
app/
├── dashboard/
│   └── DashboardApp.jsx      # Componente principal con todas las vistas
├── layout.jsx                # Layout raíz
├── page.jsx                  # Página de inicio (redirige a DashboardApp)
└── globals.css               # Estilos globales + Tailwind

package.json                  # Dependencias
tailwind.config.js            # Configuración Tailwind
postcss.config.js             # Configuración PostCSS
next.config.js                # Configuración Next.js
```

## 🎨 Componentes Principales

### `DashboardApp`
Componente monolítico que contiene:
- **KanbanView** - Columnas por estado
- **TableView** - Tabla interactiva
- **ChartsView** - Gráficos con Chart.js
- **MatrizView** - Matriz de priorización
- **PipelineView** - Pipeline por etapas
- **FinancialsView** - Análisis por responsable

### Estados (Status)
- 🏃 **Pending** - Pendiente
- 📋 **Quoted** - Cotizado
- 🎤 **Presented** - Presentado
- ⚙️ **In Progress** - En progreso
- ✅ **Won** - Ganado
- 💳 **Collected** - Cobrado

### Prioridades
- 🔴 **P1 (Alta)** - Crítica
- 🟠 **P2 (Media)** - Alta
- 🟢 **P3 (Baja)** - Normal

## 🔧 Configuración

### Environment Variables (si necesitas)
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Base de Datos (Neon Postgres)
La app está lista para conectar a Neon. Agregar en `lib/db.js` si lo necesitas.

## 📊 Mock Data

Actualmente usa mock data hardcodeado en `DashboardApp.jsx`. Para integrar con API:

```javascript
// En useEffect dentro de DashboardApp
async function fetchActivities() {
  const res = await fetch('/api/activities');
  const data = await res.json();
  setActivities(data);
}
```

## 🚀 Despliegue en Vercel

1. Push a GitHub:
```bash
git add .
git commit -m "feat: Initial PDM Activity Tracker v2"
git push -u origin main
```

2. En Vercel:
   - Conecta el repo GitHub
   - Vercel auto-detecta Next.js
   - Deploy automático en cada push ✅

## 📝 Licencia

Propietario de iNBest.

## 👥 Equipo PDM

- **Beatriz Gudiño** - Head of PDM
- **Marco Reynoso** - PDM Specialist
- **David Cardenas** - PDM Team
- **Abigail Roman** - PDM Team

---

**Última actualización:** Octubre 2026  
**Versión:** 2.0.0
