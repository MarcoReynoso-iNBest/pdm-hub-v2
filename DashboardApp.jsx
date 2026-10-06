'use client';

import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

export default function DashboardApp() {
  const [view, setView] = useState('kanban'); // kanban, table, charts
  const [selectedOwner, setSelectedOwner] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [chartInstance, setChartInstance] = useState(null);

  // Mock data - same as before
  const activities = [
    { id: 1, title: 'Cotización AWS', owner: 'Marco', category: 'Sales', stage: 'Pending', priority: 1, budget: 50000, revenue: 120000 },
    { id: 2, title: 'Propuesta Microsoft', owner: 'Beatriz', category: 'Presales', stage: 'In Progress', priority: 2, budget: 30000, revenue: 85000 },
    { id: 3, title: 'Demo Google Cloud', owner: 'David', category: 'Sales', stage: 'Presented', priority: 1, budget: 20000, revenue: 60000 },
    { id: 4, title: 'Training iNBest', owner: 'Abigail', category: 'Training', stage: 'Collected', priority: 3, budget: 15000, revenue: 40000 },
    { id: 5, title: 'Especialización SAP', owner: 'Marco', category: 'Presales', stage: 'In Progress', priority: 2, budget: 45000, revenue: 110000 },
  ];

  const STAGE_META = {
    'Pending': { order: 1, color: '#ef4444' },
    'Quoted': { order: 2, color: '#f97316' },
    'Presented': { order: 3, color: '#eab308' },
    'In Progress': { order: 4, color: '#3b82f6' },
    'Won': { order: 5, color: '#10b981' },
    'Collected': { order: 6, color: '#8b5cf6' },
  };

  const owners = ['all', 'Marco', 'Beatriz', 'David', 'Abigail'];
  const categories = ['all', 'Sales', 'Presales', 'Training'];
  const stages = ['all', ...Object.keys(STAGE_META)];

  // Filter activities
  const filteredActivities = activities.filter(a =>
    (selectedOwner === 'all' || a.owner === selectedOwner) &&
    (selectedCategory === 'all' || a.category === selectedCategory) &&
    (selectedStage === 'all' || a.stage === selectedStage)
  );

  // Kanban view
  const KanbanView = () => (
    <div className="grid grid-cols-6 gap-4">
      {stages.map(stage => {
        if (stage === 'all') return null;
        const stageActivities = filteredActivities.filter(a => a.stage === stage);
        return (
          <div key={stage} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-sm mb-4 text-gray-700">
              {stage}
              <span className="ml-2 bg-gray-300 text-gray-800 text-xs px-2 py-1 rounded">
                {stageActivities.length}
              </span>
            </h3>
            <div className="space-y-3">
              {stageActivities.map(a => (
                <div key={a.id} className="bg-white p-3 rounded border-l-4 border-blue-500 shadow-sm hover:shadow-md cursor-pointer transition">
                  <p className="text-sm font-medium text-gray-900">{a.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{a.owner}</p>
                  <p className="text-xs text-gray-500 mt-1">{a.category}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-600">${(a.revenue / 1000).toFixed(0)}K</span>
                    <span className={`text-xs px-2 py-1 rounded font-semibold ${a.priority === 1 ? 'bg-red-100 text-red-800' : a.priority === 2 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                      P{a.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  // Table view
  const TableView = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 border-b-2 border-gray-300">
          <tr>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">Actividad</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">Owner</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">Categoría</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700">Etapa</th>
            <th className="p-3 text-right text-sm font-semibold text-gray-700">Ingreso</th>
            <th className="p-3 text-right text-sm font-semibold text-gray-700">Prioridad</th>
          </tr>
        </thead>
        <tbody>
          {filteredActivities.map(a => (
            <tr key={a.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
              <td className="p-3 text-sm text-gray-900 font-medium">{a.title}</td>
              <td className="p-3 text-sm text-gray-700">{a.owner}</td>
              <td className="p-3 text-sm text-gray-700">{a.category}</td>
              <td className="p-3 text-sm">
                <span className="px-2 py-1 rounded text-xs font-semibold" style={{ backgroundColor: STAGE_META[a.stage].color + '20', color: STAGE_META[a.stage].color }}>
                  {a.stage}
                </span>
              </td>
              <td className="p-3 text-sm text-right font-semibold text-green-600">${(a.revenue / 1000).toFixed(0)}K</td>
              <td className="p-3 text-sm text-right">
                <span className={`px-2 py-1 rounded text-xs font-bold ${a.priority === 1 ? 'bg-red-100 text-red-800' : a.priority === 2 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                  P{a.priority}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Charts view
  const ChartsView = () => {
    useEffect(() => {
      const ctx = document.getElementById('myChart');
      if (!ctx) return;

      // Cleanup old chart
      if (chartInstance) {
        chartInstance.destroy();
      }

      const stageRevenue = {};
      Object.keys(STAGE_META).forEach(s => stageRevenue[s] = 0);
      filteredActivities.forEach(a => {
        stageRevenue[a.stage] = (stageRevenue[a.stage] || 0) + a.revenue;
      });

      const sortedStages = Object.entries(stageRevenue)
        .sort((a, b) => STAGE_META[a[0]].order - STAGE_META[b[0]].order);

      const newChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: sortedStages.map(([s]) => s),
          datasets: [{
            data: sortedStages.map(([, v]) => v),
            backgroundColor: sortedStages.map(([s]) => STAGE_META[s].color),
            borderColor: '#fff',
            borderWidth: 2,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { font: { size: 12 }, padding: 15 },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `$${(context.parsed / 1000).toFixed(0)}K`;
                },
              },
            },
          },
        },
      });

      setChartInstance(newChart);

      return () => {
        newChart.destroy();
      };
    }, [filteredActivities]);

    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Ingresos por Etapa</h3>
          <canvas id="myChart"></canvas>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Resumen Financiero</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-gray-700">Total Ingreso</span>
              <span className="text-2xl font-bold text-green-600">${(filteredActivities.reduce((sum, a) => sum + a.revenue, 0) / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-gray-700">Total Presupuesto</span>
              <span className="text-2xl font-bold text-orange-600">${(filteredActivities.reduce((sum, a) => sum + a.budget, 0) / 1000).toFixed(0)}K</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Margen Promedio</span>
              <span className="text-2xl font-bold text-blue-600">
                {filteredActivities.length > 0 ? ((100 - (filteredActivities.reduce((sum, a) => sum + a.budget, 0) / filteredActivities.reduce((sum, a) => sum + a.revenue, 0) * 100))).toFixed(1) : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Matriz Priorización
  const MatrizView = () => {
    const matriz = {};
    ['Sales', 'Presales', 'Training'].forEach(cat => {
      matriz[cat] = { 1: 0, 2: 0, 3: 0 };
    });
    filteredActivities.forEach(a => {
      if (matriz[a.category]) {
        matriz[a.category][a.priority]++;
      }
    });

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-blue-100 border-b-2 border-blue-300">
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 border border-gray-300">Categoría</th>
              <th className="p-3 text-center text-sm font-semibold text-red-700 border border-gray-300">🔴 P1 (Crítica)</th>
              <th className="p-3 text-center text-sm font-semibold text-orange-700 border border-gray-300">🟠 P2 (Alta)</th>
              <th className="p-3 text-center text-sm font-semibold text-green-700 border border-gray-300">🟢 P3 (Normal)</th>
              <th className="p-3 text-right text-sm font-semibold text-gray-700 border border-gray-300">Total</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(matriz).map(([cat, priorities]) => (
              <tr key={cat} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3 text-sm font-semibold text-gray-900 border border-gray-300">{cat}</td>
                <td className="p-3 text-center text-sm font-bold text-red-600 border border-gray-300 bg-red-50">{priorities[1]}</td>
                <td className="p-3 text-center text-sm font-bold text-orange-600 border border-gray-300 bg-orange-50">{priorities[2]}</td>
                <td className="p-3 text-center text-sm font-bold text-green-600 border border-gray-300 bg-green-50">{priorities[3]}</td>
                <td className="p-3 text-right text-sm font-bold text-gray-900 border border-gray-300">{priorities[1] + priorities[2] + priorities[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Pipeline Overview
  const PipelineView = () => {
    const pipelineData = {};
    Object.keys(STAGE_META).forEach(s => pipelineData[s] = { count: 0, revenue: 0 });
    filteredActivities.forEach(a => {
      pipelineData[a.stage].count++;
      pipelineData[a.stage].revenue += a.revenue;
    });

    return (
      <div className="space-y-4">
        {Object.entries(pipelineData)
          .sort((a, b) => STAGE_META[a[0]].order - STAGE_META[b[0]].order)
          .map(([stage, data]) => (
            <div key={stage} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-900">{stage}</h4>
                <span className="text-sm text-gray-600">{data.count} actividades</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300 flex items-center justify-center text-xs font-bold text-white"
                  style={{ width: `${(data.revenue / 150000) * 100}%`, backgroundColor: STAGE_META[stage].color }}
                >
                  ${(data.revenue / 1000).toFixed(0)}K
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  };

  // Financials by Owner
  const FinancialsView = () => {
    const ownerData = {};
    owners.filter(o => o !== 'all').forEach(o => {
      ownerData[o] = { revenue: 0, budget: 0, count: 0 };
    });
    filteredActivities.forEach(a => {
      if (ownerData[a.owner]) {
        ownerData[a.owner].revenue += a.revenue;
        ownerData[a.owner].budget += a.budget;
        ownerData[a.owner].count++;
      }
    });

    return (
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(ownerData).map(([owner, data]) => (
          <div key={owner} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">{owner}</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Ingresos</span>
                <span className="font-bold text-green-600">${(data.revenue / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">COGs</span>
                <span className="font-bold text-orange-600">${(data.budget / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="font-semibold text-gray-900">Margen</span>
                <span className="font-bold text-blue-600">
                  {data.revenue > 0 ? ((100 - (data.budget / data.revenue * 100)).toFixed(1)) : 0}%
                </span>
              </div>
              <div className="text-xs text-gray-500 text-center pt-2">
                {data.count} actividades
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">📊 PDM Activity Tracker</h1>

          {/* Navigation Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200 pb-4">
            {['kanban', 'table', 'charts', 'matriz', 'pipeline', 'financials'].map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  view === v
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {v === 'kanban' && '📋 Kanban'}
                {v === 'table' && '📋 Tabla'}
                {v === 'charts' && '📈 Gráficos'}
                {v === 'matriz' && '🎯 Matriz'}
                {v === 'pipeline' && '🔄 Pipeline'}
                {v === 'financials' && '💰 Financieros'}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Responsable</label>
              <select
                value={selectedOwner}
                onChange={(e) => setSelectedOwner(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {owners.map(o => (
                  <option key={o} value={o}>{o === 'all' ? '📍 Todos' : o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c === 'all' ? '📍 Todas' : c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Etapa</label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {stages.map(s => (
                  <option key={s} value={s}>{s === 'all' ? '📍 Todas' : s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {view === 'kanban' && <KanbanView />}
        {view === 'table' && <TableView />}
        {view === 'charts' && <ChartsView />}
        {view === 'matriz' && <MatrizView />}
        {view === 'pipeline' && <PipelineView />}
        {view === 'financials' && <FinancialsView />}
      </div>
    </div>
  );
}
