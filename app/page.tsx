'use client';

import React, { useState } from 'react';
import { AuthProvider } from '@/components/AuthProvider';
import { DashboardHero } from '@/components/DashboardHero';
import { RegionalDashboard } from '@/components/RegionalDashboard';
import { Ley19640Simulator } from '@/components/Ley19640Simulator';
import { OpenDataRepository } from '@/components/OpenDataRepository';
import { PostCard } from '@/components/PostCard';
import { PostEditor } from '@/components/PostEditor';
import { PlusCircle, BarChart3, BookOpen, Layers } from 'lucide-react';

export default function Home() {
  const [dataSource, setDataSource] = useState<'live' | 'mock'>('mock');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'ley19640' | 'comunidad' | 'crear'>('dashboard');

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
        <DashboardHero 
          dataSource={dataSource} 
          onToggleSource={() => setDataSource(prev => prev === 'live' ? 'mock' : 'live')} 
        />

        <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 overflow-x-auto">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-4 px-1 border-b-2 font-bold text-sm flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'dashboard'
                    ? 'border-sky-600 text-sky-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <BarChart3 className="w-4 h-4" /> Dashboard Económico TDF
              </button>

              <button
                onClick={() => setActiveTab('ley19640')}
                className={`py-4 px-1 border-b-2 font-bold text-sm flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'ley19640'
                    ? 'border-sky-600 text-sky-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Layers className="w-4 h-4 text-amber-500" /> Simulador Ley 19.640
              </button>

              <button
                onClick={() => setActiveTab('comunidad')}
                className={`py-4 px-1 border-b-2 font-bold text-sm flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'comunidad'
                    ? 'border-sky-600 text-sky-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <BookOpen className="w-4 h-4" /> Investigaciones & Comunidad
              </button>

              <button
                onClick={() => setActiveTab('crear')}
                className={`py-4 px-1 border-b-2 font-bold text-sm flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'crear'
                    ? 'border-sky-600 text-sky-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <PlusCircle className="w-4 h-4 text-emerald-500" /> Publicar Análisis
              </button>
            </nav>
          </div>
        </div>

        <main className="pb-16">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <RegionalDashboard />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <OpenDataRepository />
              </div>
            </div>
          )}

          {activeTab === 'ley19640' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
              <Ley19640Simulator />
            </div>
          )}

          {activeTab === 'comunidad' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Artículos e Informes Econométricos</h2>
                <button
                  onClick={() => setActiveTab('crear')}
                  className="bg-sky-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-sky-500 transition-all flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" /> Nuevo Informe
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PostCard
                  title="Impacto del IPC Fueguino en los Acuerdos Salariales del Sector Electrónico 2024"
                  excerpt="Análisis econométrico sobre la divergencia entre el IPC general de INDEC y la variación de precios en el aglomerado Río Grande - Ushuaia..."
                  authorName="Lic. Martín Benítez"
                  authorRole="verified_economist"
                  institution="Instituto de Investigaciones Económicas TDF"
                  category="Macroeconomía"
                  verificationLevel="verified_specialist"
                  qualityBadge="gold_excellence"
                  isFormalReport={true}
                  datasetUrl="https://apis.datos.gob.ar/series/api/series/"
                  views={342}
                  commentsCount={18}
                  date="28 Ago 2024"
                />

                <PostCard
                  title="Proyección del Empleo Industrial en Ushuaia tras la prórroga del Subrégimen"
                  excerpt="Estudio descriptivo utilizando modelos ARIMA para predecir la demanda de mano de obra en los sectores textil y tecnológico..."
                  authorName="Dr. Gustavo Meza"
                  authorRole="researcher"
                  institution="Universidad Nacional de Tierra del Fuego (UNTDF)"
                  category="Empleo & Salarios"
                  verificationLevel="community_reviewed"
                  qualityBadge="silver_featured"
                  isFormalReport={false}
                  datasetUrl="https://ipiec.tierradelfuego.gob.ar"
                  views={189}
                  commentsCount={7}
                  date="25 Ago 2024"
                />
              </div>
            </div>
          )}

          {activeTab === 'crear' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
              <PostEditor />
            </div>
          )}
        </main>
      </div>
    </AuthProvider>
  );
}
