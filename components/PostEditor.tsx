'use client';

import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { FileText, Table, Calculator, Upload, CheckCircle2 } from 'lucide-react';
import { QualityBadgeType } from './QualityBadge';

export const PostEditor: React.FC = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('macroeconomia');
  const [content, setContent] = useState('');
  const [datasetUrl, setDatasetUrl] = useState('');
  const [isFormalReport, setIsFormalReport] = useState(false);
  const [qualityBadge, setQualityBadge] = useState<QualityBadgeType>('silver_featured');

  const isEconomist = user?.role === 'verified_economist';
  const isResearcher = user?.role === 'researcher' || isEconomist;

  const insertMathFormula = () => {
    setContent((prev) => prev + '\n\n$$\\Delta IPC = \\frac{IPC_t - IPC_{t-1}}{IPC_{t-1}} \\times 100$$\n\n');
  };

  const insertTableTemplate = () => {
    setContent((prev) => prev + '\n\n| Sector Industrial | Empleo Directo | Var. i.a % |\n|---|---|---|\n| Electrónica TDF | 8,450 | +2.3% |\n| Textil & Plásticos | 2,100 | -1.1% |\n\n');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Crear Análisis Económico</h2>
          <p className="text-xs text-slate-500">Publica en la red académica y comunitaria de Tierra del Fuego.</p>
        </div>
        {isEconomist && (
          <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verificado para Informes Formales
          </span>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Título de la Publicación</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ej. Impacto de la exención industrial de la Ley 19.640 en el PBG 2024"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-slate-900"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Categoría</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none bg-white text-slate-900 text-sm"
            >
              {!isResearcher && <option value="comunidad_opinion">Comunidad / Opinión</option>}
              {isResearcher && (
                <>
                  <option value="macroeconomia">Macroeconomía</option>
                  <option value="finanzas_publicas">Finanzas Públicas</option>
                  <option value="empleo_salarios">Empleo & Salarios</option>
                  <option value="comercio_industria">Comercio e Industria</option>
                </>
              )}
            </select>
          </div>

          {isResearcher && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Distinción de Calidad del Informe</label>
              <select
                value={qualityBadge}
                onChange={(e) => setQualityBadge(e.target.value as QualityBadgeType)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none bg-white text-slate-900 text-sm"
              >
                <option value="gold_excellence">🥇 Excelencia Econométrica (Oro)</option>
                <option value="silver_featured">🥈 Análisis Destacado (Plata)</option>
                <option value="bronze_technical">🥉 Nota Técnica (Bronce)</option>
              </select>
          </div>
          )}
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={insertMathFormula}
            className="px-3 py-1.5 bg-white rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1 border border-slate-200"
          >
            <Calculator className="w-3.5 h-3.5 text-sky-600" /> Insertar Fórmula KaTeX
          </button>
          <button
            type="button"
            onClick={insertTableTemplate}
            className="px-3 py-1.5 bg-white rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1 border border-slate-200"
          >
            <Table className="w-3.5 h-3.5 text-emerald-600" /> Insertar Tabla de Datos
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Contenido (Markdown + LaTeX)</label>
          <textarea
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe tu análisis aquí... Puedes usar formato Markdown y LaTeX como $$IPC = \sum w_i P_i$$"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 font-mono text-sm"
          />
        </div>

        {isResearcher && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Adjuntar Dataset de Respaldo (URL CSV / Excel)</label>
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={datasetUrl}
                onChange={(e) => setDatasetUrl(e.target.value)}
                placeholder="https://datos.gob.ar/dataset/..."
                className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none text-sm text-slate-900"
              />
              <button type="button" className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-700 flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" /> Cargar
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          className="w-full py-3 bg-sky-600 text-white font-bold rounded-xl shadow-lg shadow-sky-600/20 hover:bg-sky-500 transition-all flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" /> Publicar Análisis Econométrico
        </button>
      </div>
    </div>
  );
};
