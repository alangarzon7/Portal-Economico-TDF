'use client';

import React from 'react';
import { Database, Download, Code, FileSpreadsheet } from 'lucide-react';

export const OpenDataRepository: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-sky-100 rounded-xl text-sky-600">
          <Database className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Repositorio Abierto de Microdatos TDF</h3>
          <p className="text-xs text-slate-500">Acceso libre a series de tiempo sin procesar para investigadores de la UNTDF e institutos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            alert("Descargando dataset en formato CSV...");
          }}
          className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all text-xs font-semibold text-slate-700"
        >
          <span className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Exportar Dataset IPC Fueguino (CSV)
          </span>
          <Download className="w-4 h-4 text-slate-400" />
        </a>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            alert("Accediendo a la API REST pública (JSON)...");
          }}
          className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all text-xs font-semibold text-slate-700"
        >
          <span className="flex items-center gap-2">
            <Code className="w-4 h-4 text-sky-600" /> API REST Endpoint (JSON)
          </span>
          <Download className="w-4 h-4 text-slate-400" />
        </a>
      </div>
    </div>
  );
};
