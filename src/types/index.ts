export interface CompanyInfo {
  name: string;
  year: number;
  initialBalance: number;
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
