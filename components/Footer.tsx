import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

export const Footer: React.FC = () => {
  const { t } = useTranslations();

  return (
    <footer className="h-8 bg-white border-t border-slate-200/80 px-6 flex items-center justify-between text-[11px] text-slate-500">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 font-medium text-slate-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          {t('slaAdherence', 'SLA Adherence')}: 94.2%
        </span>
        <span className="text-slate-300">·</span>
        <span className="hidden sm:inline text-slate-500">
          Line Depts: MPCB, MIDC, DISH, MSEDCL, CFO, CGWA
        </span>
      </div>

      <div className="flex items-center gap-3 text-slate-500">
        <span>{t('sihBanner', 'SIH 2026 PS-130')}</span>
        <span className="text-slate-300">·</span>
        <span>{t('lastSync', 'Last Sync')}: 11:42 AM</span>
      </div>
    </footer>
  );
};
