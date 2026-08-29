'use client';

import React from 'react';
import { useAuth, UserRole } from './AuthProvider';
import { Building2, Award, UserCheck, RefreshCw, Database } from 'lucide-react';

interface Props {
  dataSource: 'live' | 'mock';
  onToggleSource: () => void;
}

export const DashboardHero: React.FC<Props> = ({ dataSource, onToggleSource }) => {
  const { user, loginAsMockRole } = useAuth();

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-sky-500/20 text-sky-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-sky-500/30">
                Observatorio Provincial
              </span>
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <Database className="w-3.5 h-3.5" /> Fuente: {dataSource === 'live' ? 'IPIEC / INDEC (API REST)' : 'Mock Data Local'}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Portal Económico Tierra del Fuego
            </h1>
            <p className="mt-2 text-slate-400 text-sm max-w-2xl">
              Monitor de alta frecuencia para indicadores macroeconómicos, empleo, IPC regional e informes de investigación econométrica.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <div className="text-xs font-medium text-slate-400 mb-2 flex items-center justify-between">
              <span>Modulador de Rol Actual:</span>
              <button 
                onClick={onToggleSource}
                className="text-sky-400 hover:underline flex items-center gap-1 text-[11px]"
              >
                <RefreshCw className="w-3 h-3" /> Cambiar Fuente ({dataSource})
              </button>
            </div>
            <div className="flex gap-2">
              {(['reader', 'researcher', 'verified_economist'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => loginAsMockRole(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    user?.role === r 
                      ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30' 
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {r === 'reader' && 'Lector'}
                  {r === 'researcher' && 'Investigador'}
                  {r === 'verified_economist' && 'Economista ★'}
                </button>
              ))}
            </div>
            {user && (
              <div className="mt-3 text-xs text-slate-300 flex items-center gap-2 border-t border-slate-700/60 pt-2">
                {user.role === 'verified_economist' && <Award className="w-4 h-4 text-amber-400" />}
                {user.role === 'researcher' && <Building2 className="w-4 h-4 text-sky-400" />}
                {user.role === 'reader' && <UserCheck className="w-4 h-4 text-slate-400" />}
                <span className="font-semibold">{user.fullName}</span> 
                <span className="text-slate-500">({user.institution || 'Comunidad'})</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
