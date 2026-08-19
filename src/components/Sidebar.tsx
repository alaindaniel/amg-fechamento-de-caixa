import React from 'react';
import {
  LayoutDashboard,
  Calculator,
  FileSpreadsheet,
  CreditCard,
  CheckCircle2,
  Building2,
  DollarSign
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  companyName: string;
  year: number;
  onOpenSettings?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  companyName,
  year
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Anual', icon: LayoutDashboard },
    { id: 'caixa', label: 'Fechamento de Caixa', icon: Calculator },
    { id: 'relatorios', label: 'Relatórios Mensais', icon: FileSpreadsheet },
    { id: 'cartoes', label: 'Formas de Pagamento', icon: CreditCard },
    { id: 'auditoria', label: 'Conferência ODS', icon: CheckCircle2 }
  ];

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
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
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

      {/* Footer Status */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/30 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="truncate max-w-[110px]" title={companyName}>{companyName}</span>
        </div>
        <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[11px] font-medium border border-emerald-500/20">
          SaaS v2026
        </span>
      </div>
    </aside>
  );
};
