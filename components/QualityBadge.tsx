'use client';

import React from 'react';
import { Award, Sparkles, FileSpreadsheet } from 'lucide-react';

export type QualityBadgeType = 'gold_excellence' | 'silver_featured' | 'bronze_technical';

interface Props {
  badge: QualityBadgeType;
}

export const QualityBadge: React.FC<Props> = ({ badge }) => {
  const badgeConfig = {
    gold_excellence: {
      label: '🥇 Excelencia Econométrica',
      color: 'bg-amber-500/10 text-amber-700 border-amber-400/50',
      icon: <Award className="w-3.5 h-3.5 text-amber-500" />,
      tooltip: 'Modelado cuantitativo riguroso, dataset verificado y fuentes oficiales.'
    },
    silver_featured: {
      label: '🥈 Análisis Destacado',
      color: 'bg-slate-200 text-slate-800 border-slate-300',
      icon: <Sparkles className="w-3.5 h-3.5 text-slate-500" />,
      tooltip: 'Análisis estructurado con visualización de series de tiempo validadas.'
    },
    bronze_technical: {
      label: '🥉 Nota Técnica',
      color: 'bg-orange-500/10 text-orange-800 border-orange-300',
      icon: <FileSpreadsheet className="w-3.5 h-3.5 text-orange-600" />,
      tooltip: 'Informe preliminar o reporte de variables regionales.'
    }
  };

  const config = badgeConfig[badge];

  return (
    <span 
      title={config.tooltip}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold shadow-sm cursor-help ${config.color}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
};
