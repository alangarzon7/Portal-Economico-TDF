'use client';

import React, { useState } from 'react';
import { Calculator, DollarSign, Users, ShieldCheck, Info } from 'lucide-react';

export const Ley19640Simulator: React.FC = () => {
  const [sector, setSector] = useState<'electronica' | 'textil' | 'petroquimica' | 'pesca'>('electronica');
  const [facturacionAnual, setFacturacionAnual] = useState<number>(50000000);
  const [empleadosBase, setEmpleadosBase] = useState<number>(45);

  const sectorMultiplier = {
    electronica: { exencionIva: 0.21, exencionGanancias: 0.35, multiplicadorEmpleo: 1.25, arancelImportacion: 0.14 },
    textil: { exencionIva: 0.21, exencionGanancias: 0.35, multiplicadorEmpleo: 1.10, arancelImportacion: 0.10 },
    petroquimica: { exencionIva: 0.21, exencionGanancias: 0.35, multiplicadorEmpleo: 1.40, arancelImportacion: 0.05 },
    pesca: { exencionIva: 0.21, exencionGanancias: 0.35, multiplicadorEmpleo: 1.15, arancelImportacion: 0.08 },
  };

  const current = sectorMultiplier[sector];

  const ahorroIva = facturacionAnual * current.exencionIva;
  const ahorroGanancias = facturacionAnual * current.exencionGanancias;
  const ahorroAranceles = facturacionAnual * 0.3 * current.arancelImportacion;
  const beneficioTotalFiscal = ahorroIva + ahorroGanancias + ahorroAranceles;
  const empleoIndirectoEstimado = Math.round(empleadosBase * current.multiplicadorEmpleo);

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="bg-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full border border-amber-500/30">
            Calculadora de Impacto Fiscal & Productivo
          </span>
          <h2 className="text-2xl font-black mt-2 tracking-tight">
            Simulador de Beneficios Ley 19.640
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Proyección de exenciones tributarias y empleo directo en el marco del Subrégimen Promocional TDF.
          </p>
        </div>
        <div className="bg-slate-800 p-3 rounded-2xl flex items-center gap-2 border border-slate-700">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <span className="text-xs text-slate-300">Marco Legal Vigente hasta 2038</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Sector Productivo</label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl p-3 focus:ring-2 focus:ring-sky-500 outline-none"
            >
              <option value="electronica">Electrónica & Informática de Consumo</option>
              <option value="textil">Textil, Confección & Plásticos</option>
              <option value="petroquimica">Petroquímica & Gas Natural</option>
              <option value="pesca">Agroindustria & Pesca de Altura</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
              Facturación Anual Estimada (ARS): <strong className="text-sky-400">${facturacionAnual.toLocaleString()}</strong>
            </label>
            <input
              type="range"
              min={5000000}
              max={500000000}
              step={5000000}
              value={facturacionAnual}
              onChange={(e) => setFacturacionAnual(Number(e.target.value))}
              className="w-full accent-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2">
              Nómina de Empleados Directos: <strong className="text-emerald-400">{empleadosBase} operarios</strong>
            </label>
            <input
              type="range"
              min={5}
              max={500}
              step={5}
              value={empleadosBase}
              onChange={(e) => setEmpleadosBase(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-800/60 rounded-2xl p-6 border border-slate-700/80 space-y-6">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Calculator className="w-4 h-4 text-sky-400" /> Resultados del Análisis Promocional
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Ahorro Exención IVA (21%)
              </span>
              <div className="text-xl font-extrabold text-emerald-400 mt-1">${ahorroIva.toLocaleString()}</div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-sky-400" /> Ahorro Imp. Ganancias (35%)
              </span>
              <div className="text-xl font-extrabold text-sky-400 mt-1">${ahorroGanancias.toLocaleString()}</div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" /> Ahorro Aranceles Importación
              </span>
              <div className="text-xl font-extrabold text-amber-400 mt-1">${ahorroAranceles.toLocaleString()}</div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-purple-400" /> Empleo Indirecto Generado
              </span>
              <div className="text-xl font-extrabold text-purple-400 mt-1">+{empleoIndirectoEstimado} puestos</div>
            </div>
          </div>

          <div className="p-4 bg-sky-950/40 rounded-xl border border-sky-800/50 flex items-start gap-3">
            <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div className="text-xs text-sky-200 leading-relaxed">
              <strong>Ahorro Fiscal Consolidado Estimado:</strong> ${(beneficioTotalFiscal).toLocaleString()} ARS por ejercicio fiscal. Este valor reinvertido estimula la demanda agregada regional en Ushuaia y Río Grande.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
