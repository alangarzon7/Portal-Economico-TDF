'use client';

import React from 'react';
import { Award, UserCheck, Eye, MessageSquare, Download, CheckCircle2 } from 'lucide-react';
import { UserRole } from './AuthProvider';
import { QualityBadge, QualityBadgeType } from './QualityBadge';

interface PostCardProps {
  title: string;
  excerpt: string;
  authorName: string;
  authorRole: UserRole;
  institution?: string;
  category: string;
  verificationLevel: 'unverified' | 'community_reviewed' | 'verified_specialist';
  qualityBadge?: QualityBadgeType;
  isFormalReport?: boolean;
  datasetUrl?: string;
  views: number;
  commentsCount: number;
  date: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  title,
  excerpt,
  authorName,
  authorRole,
  institution,
  category,
  verificationLevel,
  qualityBadge,
  isFormalReport,
  datasetUrl,
  views,
  commentsCount,
  date,
}) => {
  return (
    <article className={`p-6 rounded-2xl bg-white border transition-all duration-200 hover:shadow-md ${
      isFormalReport ? 'border-amber-400/60 ring-1 ring-amber-400/20 bg-amber-50/10' : 'border-slate-200'
    }`}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md">
          {category}
        </span>

        <div className="flex items-center gap-2">
          {qualityBadge && <QualityBadge badge={qualityBadge} />}
          {verificationLevel === 'verified_specialist' && !qualityBadge && (
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Especialista Verificado
            </span>
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 hover:text-sky-600 transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-slate-600 text-sm line-clamp-2 leading-relaxed">
        {excerpt}
      </p>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {authorRole === 'verified_economist' && <Award className="w-4 h-4 text-amber-500" />}
          <div>
            <div className="text-xs font-bold text-slate-900">{authorName}</div>
            <div className="text-[11px] text-slate-500">{institution || 'Investigador Independiente'}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-400 text-xs">
          {datasetUrl && (
            <a href={datasetUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sky-600 font-semibold hover:underline">
              <Download className="w-3.5 h-3.5" /> Dataset
            </a>
          )}
          <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {views}</span>
          <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {commentsCount}</span>
        </div>
      </div>
    </article>
  );
};
