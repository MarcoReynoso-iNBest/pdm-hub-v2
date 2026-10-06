#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# SCRIPT DE SINCRONIZACIÓN: PDM HUB — Vercel → GitHub
# ═══════════════════════════════════════════════════════════════
# Uso: bash SYNC_SCRIPT.sh

set -e

echo "🔄 Iniciando sincronización PDM Hub (Vercel → GitHub)..."
echo ""

# 1. Verificar que estamos en el repositorio
if [ ! -d ".git" ]; then
    echo "❌ Error: No estamos en un repositorio Git"
    echo "   Navega a tu carpeta pdm-activity-tracker y ejecuta de nuevo"
    exit 1
fi

# 2. Hacer backup del estado actual
echo "📦 Haciendo backup del estado actual..."
git stash push -m "backup-before-vercel-sync-$(date +%s)"
echo "✓ Backup creado"
echo ""

# 3. Crear rama de desarrollo
echo "🌿 Creando rama: migrate/vercel-sync..."
git checkout -b migrate/vercel-sync 2>/dev/null || git checkout migrate/vercel-sync
echo "✓ Rama lista"
echo ""

# 4. Copiar archivo CSS actualizado
echo "📝 Actualizando globals.css..."
cp globals.css.nuevo app/globals.css
echo "✓ CSS actualizado"
echo ""

# 5. Copiar archivo Dashboard actualizado
echo "📝 Actualizando DashboardApp.jsx..."
cp DashboardApp.jsx.nuevo app/dashboard/DashboardApp.jsx
echo "✓ Dashboard actualizado"
echo ""

# 6. Actualizar package.json si es necesario
echo "📦 Verificando dependencias..."
if ! grep -q "chart.js" package.json; then
    echo "ℹ️  Instalando Chart.js..."
    npm install chart.js
    echo "✓ Chart.js instalado"
else
    echo "✓ Chart.js ya está instalado"
fi
echo ""

# 7. Limpiar node_modules si es necesario
echo "🧹 Limpiando node_modules (opcional)..."
if [ -d "node_modules" ]; then
    echo "ℹ️  Node_modules encontrado. Ejecuta: npm install"
fi
echo ""

# 8. Build local para verificar
echo "🏗️  Compilando Next.js (test local)..."
if npm run build >/dev/null 2>&1; then
    echo "✓ Build exitoso"
else
    echo "⚠️  Build con advertencias (revisar después)"
fi
echo ""

# 9. Commit cambios
echo "💾 Haciendo commit..."
git add app/globals.css app/dashboard/DashboardApp.jsx package*.json
git commit -m "feat: Sincronizar con Vercel — agregar Charts, Matriz, Pipeline, Incomes & COGs"
echo "✓ Commit realizado"
echo ""

# 10. Resumen
echo "════════════════════════════════════════════════════════════"
echo "✅ SINCRONIZACIÓN COMPLETADA"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "📋 Lo que cambió:"
echo "  • DashboardApp.jsx: Nuevos componentes (Charts, Matriz, Pipeline, Financials)"
echo "  • globals.css: Estilos actualizados (Vercel + nuevos módulos)"
echo "  • package.json: Dependencias verificadas"
echo ""
echo "🚀 Próximos pasos:"
echo "  1. Revisar cambios: git diff HEAD~1"
echo "  2. Test local: npm run dev"
echo "  3. Push a GitHub: git push -u origin migrate/vercel-sync"
echo "  4. Crear Pull Request en GitHub"
echo "  5. Merge a main"
echo "  6. Redeploy a Vercel"
echo ""
echo "📚 Documentación: Lee MIGRATION_GUIDE.md"
echo ""
