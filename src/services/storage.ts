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
  MonthlyReportData
} from '../types';

const STORAGE_KEYS = {
  COMPANY: 'taqualito_company',
  PAYMENT_METHODS: 'taqualito_payment_methods',
  EXPENSES: 'taqualito_expenses',
  DAILY_CLOSINGS: 'taqualito_daily_closings',
  MONTHLY_REPORTS: 'taqualito_monthly_reports'
};

export function getCompanyInfo(): CompanyInfo {
  const data = localStorage.getItem(STORAGE_KEYS.COMPANY);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(INITIAL_COMPANY));
    return INITIAL_COMPANY;
  }
  return JSON.parse(data);
}

export function saveCompanyInfo(info: CompanyInfo): void {
  localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(info));
}

export function getPaymentMethods(): PaymentMethod[] {
  const data = localStorage.getItem(STORAGE_KEYS.PAYMENT_METHODS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(INITIAL_PAYMENT_METHODS));
    return INITIAL_PAYMENT_METHODS;
  }
  return JSON.parse(data);
}

export function savePaymentMethods(methods: PaymentMethod[]): void {
  localStorage.setItem(STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(methods));
}

export function addPaymentMethod(name: string, type: PaymentMethod['type']): PaymentMethod[] {
  const methods = getPaymentMethods();
  const newMethod: PaymentMethod = {
    id: `pm_${Date.now()}`,
    name,
    type,
    active: true
  };
  const updated = [...methods, newMethod];
  savePaymentMethods(updated);
  return updated;
}

export function togglePaymentMethod(id: string): PaymentMethod[] {
  const methods = getPaymentMethods();
  const updated = methods.map(m => m.id === id ? { ...m, active: !m.active } : m);
  savePaymentMethods(updated);
  return updated;
}

export function getExpenses(): ExpenseItem[] {
  const data = localStorage.getItem(STORAGE_KEYS.EXPENSES);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(INITIAL_EXPENSES));
    return INITIAL_EXPENSES;
  }
  return JSON.parse(data);
}

export function saveExpense(expense: Omit<ExpenseItem, 'id'>): ExpenseItem[] {
  const expenses = getExpenses();
  const newExp: ExpenseItem = {
    ...expense,
    id: `exp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  };
  const updated = [newExp, ...expenses];
  localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(updated));
  return updated;
}

export function deleteExpense(id: string): ExpenseItem[] {
  const expenses = getExpenses();
  const updated = expenses.filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(updated));
  return updated;
}

export function getMonthlyReports(): MonthlyReportData[] {
  const data = localStorage.getItem(STORAGE_KEYS.MONTHLY_REPORTS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.MONTHLY_REPORTS, JSON.stringify(INITIAL_MONTHLY_REPORTS));
    return INITIAL_MONTHLY_REPORTS;
  }
  return JSON.parse(data);
}

export function saveMonthlyReport(report: MonthlyReportData): void {
  const reports = getMonthlyReports();
  const updated = reports.map(r => r.month === report.month ? report : r);
  localStorage.setItem(STORAGE_KEYS.MONTHLY_REPORTS, JSON.stringify(updated));
}

// Calculate Annual Summary Totals
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

export function getAnnualSummary(): AnnualSummaryData {
  const company = getCompanyInfo();
  const reports = getMonthlyReports();

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

export function resetToSeedData(): void {
  localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(INITIAL_COMPANY));
  localStorage.setItem(STORAGE_KEYS.PAYMENT_METHODS, JSON.stringify(INITIAL_PAYMENT_METHODS));
  localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(INITIAL_EXPENSES));
  localStorage.setItem(STORAGE_KEYS.MONTHLY_REPORTS, JSON.stringify(INITIAL_MONTHLY_REPORTS));
}
