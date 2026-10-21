import React from 'react';
import {
  LayoutDashboard,
  Calculator,
  FileSpreadsheet,
  CreditCard,
  Building2,
  DollarSign,
  ShieldAlert,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import type { SubscriberAccount } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  companyName: string;
  year: number;
  currentUser: SubscriberAccount;
  onLogout: () => void;
  onReturnToAdmin?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  companyName,
  year,
  currentUser,
  onLogout,
  onReturnToAdmin
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Anual', icon: LayoutDashboard },
    { id: 'caixa', label: 'Fechamento de Caixa', icon: Calculator },
    { id: 'relatorios', label: 'Relatórios Mensais', icon: FileSpreadsheet },
    { id: 'cartoes', label: 'Formas de Pagamento', icon: CreditCard },
    { id: 'auditoria', label: 'Auditoria & Antifraude', icon: ShieldCheck }
  ];

  // Se o usuário for ADMIN, adiciona atalho para Gestão de Assinantes
  if (currentUser.role === 'ADMIN') {
    menuItems.push({ id: 'admin', label: 'Gestão de Assinantes', icon: ShieldAlert });
  }

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col justify-between h-screen sticky top-0 shadow-xl border-r border-slate-800 shrink-0">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center space-x-3 bg-slate-950/50">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-bold shrink-0">
            <DollarSign className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="overflow-hidden">
            <h1 className="font-bold text-sm tracking-tight text-white leading-tight truncate" title={companyName}>
              {companyName}
            </h1>
            <p className="text-xs text-emerald-400 font-medium mt-0.5">
              Fechamento {year}
            </p>
          </div>
        </div>

        {/* Indicador de Admin simulando cliente */}
        {onReturnToAdmin && (
          <div className="p-3 bg-purple-900/40 border-b border-purple-800/60 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1.5 text-purple-300 font-bold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Visão de Assinante</span>
            </div>
            <button
              onClick={onReturnToAdmin}
              className="text-[10px] bg-purple-600 hover:bg-purple-500 text-white px-2 py-0.5 rounded font-bold transition-colors cursor-pointer"
            >
              Voltar ao Admin
            </button>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Navegação Principal
          </div>
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Status & Logout */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-xs text-slate-400 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate max-w-[110px]" title={currentUser.companyName}>
              {currentUser.companyName}
            </span>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-500/20">
            {currentUser.role === 'ADMIN' ? 'MASTER' : 'ASSINANTE'}
          </span>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-300 rounded-lg text-xs font-bold transition-all cursor-pointer border border-slate-700/60"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sair da Conta</span>
        </button>
      </div>
    </aside>
  );
};
