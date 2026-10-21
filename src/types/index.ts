export interface CompanyInfo {
  name: string;
  year: number;
  initialBalance: number;
}

export type UserRole = 'ADMIN' | 'SUBSCRIBER';

export type SubscriptionStatus = 'ACTIVE' | 'TRIAL' | 'EXPIRED' | 'BLOCKED';

export interface SubscriberAccount {
  id: string;
  cnpj: string; // Ex: "00.000.000/0001-00" ou apenas números
  companyName: string; // Razão Social / Nome Fantasia
  email: string;
  password: string; // Senha de acesso
  role: UserRole;
  status: SubscriptionStatus;
  planName: string; // Mensal Pro, Basic, etc.
  monthlyFee: number; // Ex: 97.00
  expiresAt: string; // YYYY-MM-DD
  createdAt: string;
  lastLogin?: string;
  phone?: string;
  notes?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'CASH' | 'CARD' | 'VOUCHER' | 'PIX' | 'OTHER';
  active: boolean;
}

export interface ExpenseItem {
  id: string;
  month: string;
  supplier: string;
  invoiceNumber: string;
  invoiceDate: string;
  category: 'CMV' | 'DIV';
  amount: number;
}

export type AuditActionType = 'CREATE' | 'UPDATE' | 'DELETE' | 'CASH_CLOSING';

export interface AuditLogItem {
  id: string;
  timestamp: string; // ISO String
  userIdentifier: string; // CNPJ / Razão Social do usuário logado
  userName: string;
  action: AuditActionType;
  entity: string; // 'Despesa / Compra' | 'Fechamento Diário' | 'Forma de Pagamento'
  details: string; // Descrição legível
  justification?: string; // Motivo obrigatório da alteração/remoção
  previousValue?: string; // Snapshot do valor anterior
  newValue?: string; // Snapshot do valor novo
}

export interface DailyClosing {
  id: string;
  date: string; // YYYY-MM-DD
  month: string; // "01".."12"
  day: number;
  initialBalance: number;
  reductionZ: number;
  cashEntries: number; // Outras entradas
  notes: string;
  payments: Record<string, number>; // paymentMethodId or name -> amount
  finalBalance: number;
  cashDifference: number;
}

export interface MonthlyPaymentEntry {
  method: string;
  amount: number;
  percentage: number;
}

export interface MonthlyReportData {
  month: string;
  monthName: string;
  totalSales: number;
  totalCash: number;
  totalCards: number;
  totalExpenses: number;
  totalCmv: number;
  totalDiv: number;
  cmvPct: number;
  divPct: number;
  dailyAverage: number;
  salesExpectation: number;
  finalBalance: number;
  payments: MonthlyPaymentEntry[];
}
