import {
  INITIAL_COMPANY,
  INITIAL_PAYMENT_METHODS,
  INITIAL_MONTHLY_REPORTS,
  INITIAL_EXPENSES
} from '../data/seedData';
import type {
  CompanyInfo,
  PaymentMethod,
  ExpenseItem,
  MonthlyReportData,
  SubscriberAccount
} from '../types';

// Chave global de contas e sessão
const STORAGE_KEYS = {
  ACCOUNTS: 'amg_subscribers_accounts',
  SESSION: 'amg_current_session'
};

// Contas iniciais (Admin master + Empresa demonstração padrão)
export const DEFAULT_ACCOUNTS: SubscriberAccount[] = [
  {
    id: 'admin_master',
    cnpj: '00.000.000/0001-00',
    companyName: 'Administrador Master',
    email: 'admin@sistema.com',
    password: 'admin',
    role: 'ADMIN',
    status: 'ACTIVE',
    planName: 'Acesso Master',
    monthlyFee: 0,
    expiresAt: '2099-12-31',
    createdAt: '2026-01-01',
    phone: '(11) 99999-9999',
    notes: 'Conta administrativa para gestão dos assinantes'
  },
  {
    id: 'empresa_demo_ods',
    cnpj: '12.345.678/0001-90',
    companyName: 'VIA TAQUALITO COMÉRCIO DE ALIMENTOS LTDA',
    email: 'contato@taqualito.com',
    password: '123',
    role: 'SUBSCRIBER',
    status: 'ACTIVE',
    planName: 'Plano Pro Mensal',
    monthlyFee: 149.90,
    expiresAt: '2026-12-31',
    createdAt: '2026-06-01',
    phone: '(11) 98888-7777',
    notes: 'Assinante com base histórica completa de 2026'
  }
];

// Gerenciamento de Assinantes / Contas
export function getAllSubscribers(): SubscriberAccount[] {
  const data = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(DEFAULT_ACCOUNTS));
    return DEFAULT_ACCOUNTS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return DEFAULT_ACCOUNTS;
  }
}

export function saveAllSubscribers(accounts: SubscriberAccount[]): void {
  localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
}

export function createSubscriber(accountData: Omit<SubscriberAccount, 'id' | 'createdAt'>): SubscriberAccount {
  const accounts = getAllSubscribers();
  const newAccount: SubscriberAccount = {
    ...accountData,
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString().substring(0, 10)
  };
  accounts.push(newAccount);
  saveAllSubscribers(accounts);

  // Inicializa dados limpos para a nova empresa
  initCompanyData(newAccount.id, newAccount.companyName);

  return newAccount;
}

export function updateSubscriber(id: string, updates: Partial<SubscriberAccount>): SubscriberAccount[] {
  const accounts = getAllSubscribers();
  const updated = accounts.map(acc => {
    if (acc.id === id) {
      const merged = { ...acc, ...updates };
      // Se alterou o nome da empresa, atualiza também a CompanyInfo da empresa
      if (updates.companyName) {
        const comp = getCompanyInfo(id);
        saveCompanyInfo({ ...comp, name: updates.companyName }, id);
      }
      return merged;
    }
    return acc;
  });
  saveAllSubscribers(updated);

  // Se o usuário atual for a conta editada, atualiza sessão
  const current = getCurrentSession();
  if (current && current.id === id) {
    saveCurrentSession({ ...current, ...updates });
  }

  return updated;
}

export function deleteSubscriber(id: string): SubscriberAccount[] {
  if (id === 'admin_master') return getAllSubscribers(); // Protege admin
  const accounts = getAllSubscribers().filter(a => a.id !== id);
  saveAllSubscribers(accounts);

  // Limpa dados isolados da empresa excluída
  localStorage.removeItem(`amg_data_${id}_company`);
  localStorage.removeItem(`amg_data_${id}_payment_methods`);
  localStorage.removeItem(`amg_data_${id}_expenses`);
  localStorage.removeItem(`amg_data_${id}_daily_closings`);
  localStorage.removeItem(`amg_data_${id}_monthly_reports`);

  return accounts;
}

// Autenticação e Sessão
export function getCurrentSession(): SubscriberAccount | null {
  const data = localStorage.getItem(STORAGE_KEYS.SESSION);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function saveCurrentSession(account: SubscriberAccount): void {
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(account));
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}

export function login(identifier: string, password: string): { success: boolean; account?: SubscriberAccount; error?: string } {
  const cleanId = identifier.trim().toLowerCase();
  const cleanPass = password.trim();

  const accounts = getAllSubscribers();
  const found = accounts.find(acc => {
    const matchEmail = acc.email.toLowerCase() === cleanId;
    const matchCompany = acc.companyName.toLowerCase() === cleanId;
    const matchCnpjClean = acc.cnpj.replace(/\D/g, '') === cleanId.replace(/\D/g, '');
    const matchCnpjRaw = acc.cnpj.toLowerCase() === cleanId;

    return matchEmail || matchCompany || matchCnpjClean || matchCnpjRaw;
  });

  if (!found) {
    return { success: false, error: 'Usuário não encontrado. Verifique o CNPJ, Razão Social ou E-mail informado.' };
  }

  if (found.password !== cleanPass) {
    return { success: false, error: 'Senha incorreta. Tente novamente.' };
  }

  if (found.status === 'BLOCKED') {
    return { success: false, error: 'Acesso suspenso. Entre em contato com o suporte/administração.' };
  }

  if (found.status === 'EXPIRED') {
    return { success: false, error: 'Assinatura expirada. Renove sua mensalidade para continuar utilizando o sistema.' };
  }

  // Atualiza lastLogin
  found.lastLogin = new Date().toISOString();
  saveAllSubscribers(accounts);
  saveCurrentSession(found);

  return { success: true, account: found };
}

// -------------------------------------------------------------
// DADOS ISOLADOS POR TENANT / EMPRESA
// -------------------------------------------------------------
function getTenantKey(key: string, tenantId?: string): string {
  const activeId = tenantId || getCurrentSession()?.id || 'empresa_demo_ods';
  return `amg_data_${activeId}_${key}`;
}

export function initCompanyData(tenantId: string, companyName: string): void {
  // Salva dados iniciais zerados para uma nova empresa
  const newCompany: CompanyInfo = {
    name: companyName,
    year: 2026,
    initialBalance: 0
  };
  localStorage.setItem(getTenantKey('company', tenantId), JSON.stringify(newCompany));
  localStorage.setItem(getTenantKey('payment_methods', tenantId), JSON.stringify(INITIAL_PAYMENT_METHODS));
  localStorage.setItem(getTenantKey('expenses', tenantId), JSON.stringify([]));

  // 12 meses zerados
  const emptyReports: MonthlyReportData[] = INITIAL_MONTHLY_REPORTS.map(r => ({
    ...r,
    totalSales: 0,
    totalCash: 0,
    totalCards: 0,
    totalExpenses: 0,
    totalCmv: 0,
    totalDiv: 0,
    cmvPct: 0,
    divPct: 0,
    dailyAverage: 0,
    salesExpectation: 0,
    finalBalance: 0,
    payments: r.payments.map(p => ({ ...p, amount: 0, percentage: 0 }))
  }));
  localStorage.setItem(getTenantKey('monthly_reports', tenantId), JSON.stringify(emptyReports));
}

export function getCompanyInfo(tenantId?: string): CompanyInfo {
  const key = getTenantKey('company', tenantId);
  const data = localStorage.getItem(key);
  if (!data) {
    // Se for a conta demo, alimenta com seed da Taqualito
    const activeId = tenantId || getCurrentSession()?.id || 'empresa_demo_ods';
    if (activeId === 'empresa_demo_ods') {
      localStorage.setItem(key, JSON.stringify(INITIAL_COMPANY));
      return INITIAL_COMPANY;
    }
    const currentAcc = getAllSubscribers().find(a => a.id === activeId);
    const newComp: CompanyInfo = {
      name: currentAcc?.companyName || 'Minha Empresa',
      year: 2026,
      initialBalance: 0
    };
    localStorage.setItem(key, JSON.stringify(newComp));
    return newComp;
  }
  return JSON.parse(data);
}

export function saveCompanyInfo(info: CompanyInfo, tenantId?: string): void {
  const key = getTenantKey('company', tenantId);
  localStorage.setItem(key, JSON.stringify(info));

  // Atualiza também o nome na lista de assinantes
  const activeId = tenantId || getCurrentSession()?.id;
  if (activeId && activeId !== 'admin_master') {
    const accounts = getAllSubscribers();
    const acc = accounts.find(a => a.id === activeId);
    if (acc && acc.companyName !== info.name) {
      acc.companyName = info.name;
      saveAllSubscribers(accounts);
    }
  }
}

export function getPaymentMethods(tenantId?: string): PaymentMethod[] {
  const key = getTenantKey('payment_methods', tenantId);
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(INITIAL_PAYMENT_METHODS));
    return INITIAL_PAYMENT_METHODS;
  }
  return JSON.parse(data);
}

export function savePaymentMethods(methods: PaymentMethod[], tenantId?: string): void {
  const key = getTenantKey('payment_methods', tenantId);
  localStorage.setItem(key, JSON.stringify(methods));
}

export function addPaymentMethod(name: string, type: PaymentMethod['type'], tenantId?: string): PaymentMethod[] {
  const methods = getPaymentMethods(tenantId);
  const newMethod: PaymentMethod = {
    id: `pm_${Date.now()}`,
    name,
    type,
    active: true
  };
  const updated = [...methods, newMethod];
  savePaymentMethods(updated, tenantId);
  return updated;
}

export function togglePaymentMethod(id: string, tenantId?: string): PaymentMethod[] {
  const methods = getPaymentMethods(tenantId);
  const updated = methods.map(m => m.id === id ? { ...m, active: !m.active } : m);
  savePaymentMethods(updated, tenantId);
  return updated;
}

export function getExpenses(tenantId?: string): ExpenseItem[] {
  const key = getTenantKey('expenses', tenantId);
  const data = localStorage.getItem(key);
  if (!data) {
    const activeId = tenantId || getCurrentSession()?.id || 'empresa_demo_ods';
    if (activeId === 'empresa_demo_ods') {
      localStorage.setItem(key, JSON.stringify(INITIAL_EXPENSES));
      return INITIAL_EXPENSES;
    }
    localStorage.setItem(key, JSON.stringify([]));
    return [];
  }
  return JSON.parse(data);
}

export function saveExpense(expense: Omit<ExpenseItem, 'id'>, tenantId?: string): ExpenseItem[] {
  const expenses = getExpenses(tenantId);
  const newExp: ExpenseItem = {
    ...expense,
    id: `exp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  };
  const updated = [newExp, ...expenses];
  localStorage.setItem(getTenantKey('expenses', tenantId), JSON.stringify(updated));
  return updated;
}

export function deleteExpense(id: string, tenantId?: string): ExpenseItem[] {
  const expenses = getExpenses(tenantId);
  const updated = expenses.filter(e => e.id !== id);
  localStorage.setItem(getTenantKey('expenses', tenantId), JSON.stringify(updated));
  return updated;
}

export function getMonthlyReports(tenantId?: string): MonthlyReportData[] {
  const key = getTenantKey('monthly_reports', tenantId);
  const data = localStorage.getItem(key);
  if (!data) {
    const activeId = tenantId || getCurrentSession()?.id || 'empresa_demo_ods';
    if (activeId === 'empresa_demo_ods') {
      localStorage.setItem(key, JSON.stringify(INITIAL_MONTHLY_REPORTS));
      return INITIAL_MONTHLY_REPORTS;
    }
    // Cria 12 meses zerados
    const emptyReports = INITIAL_MONTHLY_REPORTS.map(r => ({
      ...r,
      totalSales: 0,
      totalCash: 0,
      totalCards: 0,
      totalExpenses: 0,
      totalCmv: 0,
      totalDiv: 0,
      cmvPct: 0,
      divPct: 0,
      dailyAverage: 0,
      salesExpectation: 0,
      finalBalance: 0,
      payments: r.payments.map(p => ({ ...p, amount: 0, percentage: 0 }))
    }));
    localStorage.setItem(key, JSON.stringify(emptyReports));
    return emptyReports;
  }
  return JSON.parse(data);
}

export function saveMonthlyReport(report: MonthlyReportData, tenantId?: string): void {
  const reports = getMonthlyReports(tenantId);
  const updated = reports.map(r => r.month === report.month ? report : r);
  localStorage.setItem(getTenantKey('monthly_reports', tenantId), JSON.stringify(updated));
}

// Resumo Anual
export interface AnnualSummaryData {
  company: CompanyInfo;
  monthlyReports: MonthlyReportData[];
  totalSales: number;
  totalCash: number;
  totalCards: number;
  totalExpenses: number;
  totalCmv: number;
  totalDiv: number;
  cashPct: number;
  cardsPct: number;
  expensesPct: number;
  cmvPct: number;
  divPct: number;
  avgCmvH1: number;
  avgCmvH2: number;
  avgCmvAnnual: number;
}

export function getAnnualSummary(tenantId?: string): AnnualSummaryData {
  const company = getCompanyInfo(tenantId);
  const reports = getMonthlyReports(tenantId);

  let totalSales = 0;
  let totalCash = 0;
  let totalCards = 0;
  let totalExpenses = 0;
  let totalCmv = 0;
  let totalDiv = 0;

  reports.forEach(r => {
    totalSales += r.totalSales;
    totalCash += r.totalCash;
    totalCards += r.totalCards;
    totalExpenses += r.totalExpenses;
    totalCmv += r.totalCmv;
    totalDiv += r.totalDiv;
  });

  const cashPct = totalSales > 0 ? totalCash / totalSales : 0;
  const cardsPct = totalSales > 0 ? totalCards / totalSales : 0;
  const expensesPct = totalSales > 0 ? totalExpenses / totalSales : 0;
  const cmvPct = totalSales > 0 ? totalCmv / totalSales : 0;
  const divPct = totalSales > 0 ? totalDiv / totalSales : 0;

  const h1CmvPcts = reports.slice(0, 6).filter(r => r.cmvPct > 0).map(r => r.cmvPct);
  const h2CmvPcts = reports.slice(6, 12).filter(r => r.cmvPct > 0).map(r => r.cmvPct);
  const annualCmvPcts = reports.filter(r => r.cmvPct > 0).map(r => r.cmvPct);

  const avgCmvH1 = h1CmvPcts.length > 0 ? h1CmvPcts.reduce((a, b) => a + b, 0) / h1CmvPcts.length : 0;
  const avgCmvH2 = h2CmvPcts.length > 0 ? h2CmvPcts.reduce((a, b) => a + b, 0) / h2CmvPcts.length : 0;
  const avgCmvAnnual = annualCmvPcts.length > 0 ? annualCmvPcts.reduce((a, b) => a + b, 0) / annualCmvPcts.length : 0;

  return {
    company,
    monthlyReports: reports,
    totalSales,
    totalCash,
    totalCards,
    totalExpenses,
    totalCmv,
    totalDiv,
    cashPct,
    cardsPct,
    expensesPct,
    cmvPct,
    divPct,
    avgCmvH1,
    avgCmvH2,
    avgCmvAnnual
  };
}

export function resetToSeedData(tenantId?: string): void {
  const activeId = tenantId || getCurrentSession()?.id || 'empresa_demo_ods';
  if (activeId === 'empresa_demo_ods') {
    localStorage.setItem(getTenantKey('company', activeId), JSON.stringify(INITIAL_COMPANY));
    localStorage.setItem(getTenantKey('payment_methods', activeId), JSON.stringify(INITIAL_PAYMENT_METHODS));
    localStorage.setItem(getTenantKey('expenses', activeId), JSON.stringify(INITIAL_EXPENSES));
    localStorage.setItem(getTenantKey('monthly_reports', activeId), JSON.stringify(INITIAL_MONTHLY_REPORTS));
  } else {
    initCompanyData(activeId, getCompanyInfo(activeId).name);
  }
}
