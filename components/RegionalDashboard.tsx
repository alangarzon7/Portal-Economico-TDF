'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { TrendingUp, TrendingDown, Calendar, ShieldCheck } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  changeMoM: number;
  changeYoY: number;
  updatedAt: string;
  isSelected: boolean;
  onClick: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  changeMoM,
  changeYoY,
  updatedAt,
  isSelected,
  onClick,
}) => {
  const isPositive = changeMoM <= 0;
  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border ${
        isSelected
          ? 'bg-slate-900 text-white border-sky-500 shadow-xl ring-2 ring-sky-500/20'
          : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 hover:shadow-md'
      }`}
    >
      <div className="flex justify-between items-start">
        <span className={`text-xs font-semibold uppercase tracking-wider ${isSelected ? 'text-sky-400' : 'text-slate-500'}`}>
          {title}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
          <ShieldCheck className="w-3 h-3 text-emerald-500" /> Oficial
        </span>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-black tracking-tight">{value}</span>
        <span className={`text-sm font-medium ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>{unit}</span>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          {changeMoM >= 0 ? (
            <TrendingUp className={`w-4 h-4 ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`} />
          ) : (
            <TrendingDown className={`w-4 h-4 ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`} />
          )}
          <span className={`font-bold ${changeMoM >= 0 ? (isPositive ? 'text-emerald-500' : 'text-rose-500') : 'text-emerald-500'}`}>
            {changeMoM > 0 ? `+${changeMoM}%` : `${changeMoM}%`}
          </span>
          <span className={isSelected ? 'text-slate-400' : 'text-slate-500'}>mensual</span>
        </div>
        <span className={isSelected ? 'text-slate-400' : 'text-slate-500'}>
          i.a: <strong className={isSelected ? 'text-slate-200' : 'text-slate-700'}>{changeYoY}%</strong>
        </span>
      </div>
    </div>
  );
};

export const RegionalDashboard: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'ipc' | 'desempleo' | 'canasta' | 'pbg'>('ipc');
  const [timeRange, setTimeRange] = useState<'1M' | '6M' | '1A' | 'HIST'>('1A');

  const seriesData = [
    { fecha: 'Set 23', tdf: 12.5, nacional: 12.7 },
    { fecha: 'Oct 23', tdf: 8.3, nacional: 8.3 },
    { fecha: 'Nov 23', tdf: 12.8, nacional: 12.8 },
    { fecha: 'Dic 23', tdf: 26.9, nacional: 25.5 },
    { fecha: 'Ene 24', tdf: 19.8, nacional: 20.6 },
    { fecha: 'Feb 24', tdf: 13.5, nacional: 13.2 },
    { fecha: 'Mar 24', tdf: 11.2, nacional: 11.0 },
    { fecha: 'Abr 24', tdf: 8.5, nacional: 8.8 },
    { fecha: 'May 24', tdf: 4.9, nacional: 4.2 },
    { fecha: 'Jun 24', tdf: 5.1, nacional: 4.6 },
    { fecha: 'Jul 24', tdf: 4.8, nacional: 4.0 },
    { fecha: 'Ago 24', tdf: 4.2, nacional: 3.9 },
  ];

  return (
    <section className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <MetricCard
            title="IPC Fueguino (Inflación)"
            value="4.2"
            unit="%"
            changeMoM={4.2}
            changeYoY={238.5}
            updatedAt="Agosto 2024"
            isSelected={selectedMetric === 'ipc'}
            onClick={() => setSelectedMetric('ipc')}
          />
          <MetricCard
            title="Desempleo Agl. Ushuaia-RG"
            value="7.4"
            unit="%"
            changeMoM={0.5}
            changeYoY={1.2}
            updatedAt="T2 2024"
            isSelected={selectedMetric === 'desempleo'}
            onClick={() => setSelectedMetric('desempleo')}
          />
          <MetricCard
            title="Canasta Básica Total TDF"
            value="$945.800"
            unit="ARS"
            changeMoM={4.1}
            changeYoY={230.1}
            updatedAt="Agosto 2024"
            isSelected={selectedMetric === 'canasta'}
            onClick={() => setSelectedMetric('canasta')}
          />
          <MetricCard
            title="PBG Trimestral TDF"
            value="$452.100"
            unit="M ARS"
            changeMoM={-1.2}
            changeYoY={-3.4}
            updatedAt="T2 2024"
            isSelected={selectedMetric === 'pbg'}
            onClick={() => setSelectedMetric('pbg')}
          />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Evolución Comparativa: Tierra del Fuego vs. Total Nacional
              </h3>
              <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                <Calendar className="w-3.5 h-3.5" /> Última actualización oficial: 15 de Agosto 2024 | Fuente: IPIEC & INDEC
              </p>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
              {(['1M', '6M', '1A', 'HIST'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    timeRange === r ? 'bg-white text-sky-600 shadow-sm' : 'hover:text-slate-900'
                  }`}
                >
                  {r === 'HIST' ? 'Histórico' : r}
                </button>
              ))}
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={seriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTdf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNac" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="fecha" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                  itemStyle={{ fontSize: '13px' }}
                />
                <Legend verticalAlign="top" height={36} />
                <Area type="monotone" dataKey="tdf" name="Tierra del Fuego" stroke="#0284c7" strokeWidth={3} fillOpacity={1} fill="url(#colorTdf)" />
                <Area type="monotone" dataKey="nacional" name="Promedio Nacional" stroke="#64748b" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorNac)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
