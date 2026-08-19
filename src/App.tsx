import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { CaixaView } from './components/CaixaView';
import { RelatoriosView } from './components/RelatoriosView';
import { FormasPagamentoView } from './components/FormasPagamentoView';
import { AuditoriaView } from './components/AuditoriaView';
import { getCompanyInfo } from './services/storage';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [company, setCompany] = useState(getCompanyInfo());

  const handleRefresh = () => {
    setCompany(getCompanyInfo());
    setRefreshKey(prev => prev + 1);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return {
          title: 'Dashboard Financeiro Anual',
          subtitle: 'Visão executiva com indicadores de Vendas, Despesas, CMV e DIV de 2026'
        };
      case 'caixa':
        return {
          title: 'Fechamento de Caixa Diário',
          subtitle: 'Lançamento de movimentações por meio de pagamento e despesas fornecedor por fornecedor'
        };
      case 'relatorios':
        return {
          title: 'Relatórios Financeiros Mensais',
          subtitle: 'Consolidado mês a mês equivalente à estrutura da planilha original'
        };
      case 'cartoes':
        return {
          title: 'Gestão de Formas de Pagamento',
          subtitle: 'Cadastro e ativação das 37 modalidades e bandeiras de cartão/voucher'
        };
      case 'auditoria':
        return {
          title: 'Conferência ODS & Integridade',
          subtitle: 'Validação da equivalência exata entre a planilha original e o sistema'
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
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header
          title={title}
          subtitle={subtitle}
          onRefresh={handleRefresh}
        />

        <main className="p-8 max-w-7xl w-full mx-auto space-y-6" key={refreshKey}>
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
