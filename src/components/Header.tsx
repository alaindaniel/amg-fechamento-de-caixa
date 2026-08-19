import React, { useState } from 'react';
import { Calendar, RefreshCw, Settings, Building2 } from 'lucide-react';
import { resetToSeedData, getCompanyInfo } from '../services/storage';
import { SettingsModal } from './SettingsModal';

interface HeaderProps {
  title: string;
  subtitle: string;
  onRefresh: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onRefresh }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const company = getCompanyInfo();

  const handleReset = () => {
    if (window.confirm("Deseja restaurar os dados originais migrados da planilha .ods? Todas as edições manuais locais serão resetadas para a versão da planilha.")) {
      resetToSeedData();
      onRefresh();
    }
  };

  return (
    <>
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-bold text-slate-900 max-w-[180px] truncate">
              {company.name}
            </span>
          </div>

          <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Exercício {company.year}</span>
          </div>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-colors shadow-xs"
            title="Personalizar nome da empresa"
          >
            <Settings className="w-3.5 h-3.5 text-emerald-700" />
            <span>Configurar Empresa</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-600 transition-colors shadow-xs"
            title="Restaurar dados originais da planilha ODS"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Restaurar ODS</span>
          </button>
        </div>
      </header>

      {/* Company Customization Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={onRefresh}
      />
    </>
  );
};
