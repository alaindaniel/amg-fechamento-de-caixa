import React, { useState } from 'react';
import { Calendar, RefreshCw, Settings, Building2, LogOut, ShieldAlert, KeyRound } from 'lucide-react';
import { resetToSeedData, getCompanyInfo } from '../services/storage';
import { SettingsModal } from './SettingsModal';
import { ChangePasswordModal } from './ChangePasswordModal';
import type { SubscriberAccount } from '../types';

interface HeaderProps {
  title: string;
  subtitle: string;
  currentUser: SubscriberAccount;
  onRefresh: () => void;
  onLogout: () => void;
  onOpenAdmin?: () => void;
  onUserUpdated: (updatedUser: SubscriberAccount) => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  currentUser,
  onRefresh,
  onLogout,
  onOpenAdmin,
  onUserUpdated
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const company = getCompanyInfo();

  const handleReset = () => {
    if (window.confirm("Deseja restaurar os dados originais deste fechamento de caixa? Todas as edições manuais locais serão resetadas.")) {
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
          {/* Badge da Empresa / Tenant */}
          <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-bold text-slate-900 max-w-[180px] truncate" title={company.name}>
              {company.name}
            </span>
          </div>

          <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Exercício {company.year}</span>
          </div>

          {currentUser.role === 'ADMIN' && onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-purple-300 bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold transition-colors shadow-xs cursor-pointer"
              title="Painel Administrativo de Assinantes"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-purple-700" />
              <span>Painel Admin</span>
            </button>
          )}

          {/* Botão de Alterar Senha */}
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-colors shadow-xs cursor-pointer"
            title="Alterar minha senha de acesso"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-700" />
            <span>Alterar Senha</span>
          </button>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-colors shadow-xs cursor-pointer"
            title="Personalizar nome da empresa"
          >
            <Settings className="w-3.5 h-3.5 text-emerald-700" />
            <span>Configurar Empresa</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-600 transition-colors shadow-xs cursor-pointer"
            title="Restaurar dados originais"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Restaurar</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-xs font-bold text-slate-600 transition-colors shadow-xs cursor-pointer"
            title="Sair do sistema"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
        </div>
      </header>

      {/* Modal de Configuração da Empresa */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={onRefresh}
      />

      {/* Modal de Alteração de Senha */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        currentUser={currentUser}
        onPasswordChanged={onUserUpdated}
      />
    </>
  );
};
