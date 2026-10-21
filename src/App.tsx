import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { CaixaView } from './components/CaixaView';
import { RelatoriosView } from './components/RelatoriosView';
import { FormasPagamentoView } from './components/FormasPagamentoView';
import { AuditoriaView } from './components/AuditoriaView';
import { AdminPanel } from './components/AdminPanel';
import { LoginScreen } from './components/LoginScreen';
import {
  getCurrentSession,
  saveCurrentSession,
  logout,
  getCompanyInfo
} from './services/storage';
import type { SubscriberAccount } from './types';

export function App() {
  const [currentUser, setCurrentUser] = useState<SubscriberAccount | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [adminSimulatingTenant, setAdminSimulatingTenant] = useState<SubscriberAccount | null>(null);

  useEffect(() => {
    const session = getCurrentSession();
    if (session) {
      setCurrentUser(session);
      if (session.role === 'ADMIN') {
        setActiveTab('admin');
      }
    }
  }, []);

  const handleLoginSuccess = (account: SubscriberAccount) => {
    setCurrentUser(account);
    setAdminSimulatingTenant(null);
    if (account.role === 'ADMIN') {
      setActiveTab('admin');
    } else {
      setActiveTab('dashboard');
    }
    setRefreshKey(prev => prev + 1);
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setAdminSimulatingTenant(null);
    setActiveTab('dashboard');
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Admin acessando o fechamento de uma empresa assinante específica
  const handleAdminSwitchToTenant = (tenantAccount: SubscriberAccount) => {
    setAdminSimulatingTenant(tenantAccount);
    saveCurrentSession(tenantAccount); // Contextualiza tenant ativo
    setActiveTab('dashboard');
    setRefreshKey(prev => prev + 1);
  };

  // Retornar da simulação para a visão administrativa
  const handleReturnToAdmin = () => {
    if (currentUser && currentUser.role === 'ADMIN') {
      saveCurrentSession(currentUser);
      setAdminSimulatingTenant(null);
      setActiveTab('admin');
      setRefreshKey(prev => prev + 1);
    }
  };

  // Se não estiver logado, exibe tela de login
  if (!currentUser) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  const effectiveUser = adminSimulatingTenant || currentUser;
  const company = getCompanyInfo(effectiveUser.id);

  const getTabTitle = () => {
    switch (activeTab) {
      case 'admin':
        return {
          title: 'Painel Administrativo Master',
          subtitle: 'Gestão completa de assinantes, status de mensalidade e faturamento recorrente (MRR)'
        };
      case 'dashboard':
        return {
          title: 'Dashboard Financeiro Anual',
          subtitle: `Visão executiva com indicadores de Vendas, Despesas, CMV e DIV de ${company.name}`
        };
      case 'caixa':
        return {
          title: 'Fechamento de Caixa Diário',
          subtitle: 'Lançamento de movimentações por meio de pagamento e despesas discriminadas'
        };
      case 'relatorios':
        return {
          title: 'Relatórios Financeiros Mensais',
          subtitle: 'Consolidado mês a mês com exportação executiva em PDF'
        };
      case 'cartoes':
        return {
          title: 'Gestão de Formas de Pagamento',
          subtitle: 'Cadastro e ativação das modalidades e bandeiras de cartão/voucher aceitas'
        };
      case 'auditoria':
        return {
          title: 'Conferência ODS & Integridade',
          subtitle: 'Validação da equivalência matemática e integridade financeira'
        };
      default:
        return { title: 'Sistema de Fechamento', subtitle: '' };
    }
  };

  const { title, subtitle } = getTabTitle();

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900 antialiased overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        companyName={company.name}
        year={company.year}
        currentUser={currentUser}
        onLogout={handleLogout}
        onReturnToAdmin={adminSimulatingTenant ? handleReturnToAdmin : undefined}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header
          title={title}
          subtitle={subtitle}
          currentUser={currentUser}
          onRefresh={handleRefresh}
          onLogout={handleLogout}
          onOpenAdmin={currentUser.role === 'ADMIN' ? () => setActiveTab('admin') : undefined}
        />

        <main className="p-8 max-w-7xl w-full mx-auto space-y-6" key={refreshKey}>
          {activeTab === 'admin' && currentUser.role === 'ADMIN' && (
            <AdminPanel onSwitchToTenant={handleAdminSwitchToTenant} />
          )}
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'caixa' && <CaixaView />}
          {activeTab === 'relatorios' && <RelatoriosView />}
          {activeTab === 'cartoes' && <FormasPagamentoView />}
          {activeTab === 'auditoria' && <AuditoriaView />}
        </main>
      </div>
    </div>
  );
}

export default App;
