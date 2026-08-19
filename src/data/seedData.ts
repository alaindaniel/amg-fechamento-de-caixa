// Seed Data extracted from PLANILHA DE FECHAMENTO 2026.ods

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

export const INITIAL_COMPANY: CompanyInfo = {
  name: "VIA TAQUALITO COMÉRCIO DE ALIMENTOS LTDA",
  year: 2026,
  initialBalance: 1.00
};

export const INITIAL_PAYMENT_METHODS: PaymentMethod[] = [
  {
    "id": "pm_1",
    "name": "Dinheiro",
    "type": "CASH",
    "active": true
  },
  {
    "id": "pm_2",
    "name": "Agiplan",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_3",
    "name": "Alelo Refeição",
    "type": "VOUCHER",
    "active": true
  },
  {
    "id": "pm_4",
    "name": "Amex Credito",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_5",
    "name": "Avista Credito",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_6",
    "name": "Avista Debito",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_7",
    "name": "Banescard",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_8",
    "name": "Cabal Credito",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_9",
    "name": "Cabal Debito",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_10",
    "name": "Cabal Refeição",
    "type": "VOUCHER",
    "active": true
  },
  {
    "id": "pm_11",
    "name": "Credsystem",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_12",
    "name": "Diner Credito",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_13",
    "name": "Diners Credito",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_14",
    "name": "E-Commerce",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_15",
    "name": "Elo Credito",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_16",
    "name": "Elo Debito",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_17",
    "name": "Good Card",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_18",
    "name": "Green Card",
    "type": "VOUCHER",
    "active": true
  },
  {
    "id": "pm_19",
    "name": "Hiper Credito",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_20",
    "name": "Hipercard",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_21",
    "name": "iFood",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_22",
    "name": "Master Credito",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_23",
    "name": "Master Debito",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_24",
    "name": "Mercado Pago",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_25",
    "name": "Pix – Debito",
    "type": "PIX",
    "active": true
  },
  {
    "id": "pm_26",
    "name": "Rappi",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_27",
    "name": "Sodexo",
    "type": "VOUCHER",
    "active": true
  },
  {
    "id": "pm_28",
    "name": "Sorocred",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_29",
    "name": "Ticket Restaurante",
    "type": "VOUCHER",
    "active": true
  },
  {
    "id": "pm_30",
    "name": "Visa Credito",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_31",
    "name": "Visa Electron",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_32",
    "name": "Vr Refeição",
    "type": "VOUCHER",
    "active": true
  },
  {
    "id": "pm_33",
    "name": "Pede Pronto",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_34",
    "name": "Fo To Save",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_35",
    "name": "Ben Visa Vale",
    "type": "VOUCHER",
    "active": true
  },
  {
    "id": "pm_36",
    "name": "Pluxee",
    "type": "CARD",
    "active": true
  },
  {
    "id": "pm_37",
    "name": "Ticket Flex",
    "type": "VOUCHER",
    "active": true
  },
  {
    "id": "pm_38",
    "name": "99 Food",
    "type": "CARD",
    "active": true
  }
];

export const MONTH_NAMES: Record<string, string> = {
  "01": "Janeiro",
  "02": "Fevereiro",
  "03": "Março",
  "04": "Abril",
  "05": "Maio",
  "06": "Junho",
  "07": "Julho",
  "08": "Agosto",
  "09": "Setembro",
  "10": "Outubro",
  "11": "Novembro",
  "12": "Dezembro"
};

export const INITIAL_MONTHLY_REPORTS: MonthlyReportData[] = [
  {
    "month": "01",
    "monthName": "Janeiro",
    "totalSales": 0.0,
    "totalCash": 0.0,
    "totalCards": 0.0,
    "totalExpenses": 0.0,
    "totalCmv": 0.0,
    "totalDiv": 0.0,
    "cmvPct": 0.0,
    "divPct": 0.0,
    "dailyAverage": 0.0,
    "salesExpectation": 0.0,
    "finalBalance": 1.0,
    "payments": [
      {
        "method": "Dinheiro",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Agiplan",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Alelo Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Amex Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Banescard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Credsystem",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diner Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diners Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "E-Commerce",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Good Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Green Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hiper Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hipercard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "iFood",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Mercado Pago",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pix – Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Rappi",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sodexo",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sorocred",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Restaurante",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Electron",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Vr Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pede Pronto",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Fo To Save",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ben Visa Vale",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pluxee",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Flex",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "99 Food",
        "amount": 0.0,
        "percentage": 0.0
      }
    ]
  },
  {
    "month": "02",
    "monthName": "Fevereiro",
    "totalSales": 0.0,
    "totalCash": 0.0,
    "totalCards": 0.0,
    "totalExpenses": 0.0,
    "totalCmv": 0.0,
    "totalDiv": 0.0,
    "cmvPct": 0.0,
    "divPct": 0.0,
    "dailyAverage": 0.0,
    "salesExpectation": 0.0,
    "finalBalance": 1.0,
    "payments": [
      {
        "method": "Dinheiro",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Agiplan",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Alelo Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Amex Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Banescard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Credsystem",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diner Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diners Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "E-Commerce",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Good Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Green Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hiper Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hipercard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "iFood",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Mercado Pago",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pix – Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Rappi",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sodexo",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sorocred",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Restaurante",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Electron",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Vr Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pede Pronto",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Fo To Save",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ben Visa Vale",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pluxee",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Flex",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "99 Food",
        "amount": 0.0,
        "percentage": 0.0
      }
    ]
  },
  {
    "month": "03",
    "monthName": "Março",
    "totalSales": 0.0,
    "totalCash": 0.0,
    "totalCards": 0.0,
    "totalExpenses": 0.0,
    "totalCmv": 0.0,
    "totalDiv": 0.0,
    "cmvPct": 0.0,
    "divPct": 0.0,
    "dailyAverage": 0.0,
    "salesExpectation": 0.0,
    "finalBalance": 1.0,
    "payments": [
      {
        "method": "Dinheiro",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Agiplan",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Alelo Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Amex Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Banescard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Credsystem",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diner Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diners Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "E-Commerce",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Good Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Green Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hiper Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hipercard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "iFood",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Mercado Pago",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pix – Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Rappi",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sodexo",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sorocred",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Restaurante",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Electron",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Vr Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pede Pronto",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Fo To Save",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ben Visa Vale",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pluxee",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Flex",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "99 Food",
        "amount": 0.0,
        "percentage": 0.0
      }
    ]
  },
  {
    "month": "04",
    "monthName": "Abril",
    "totalSales": 0.0,
    "totalCash": 0.0,
    "totalCards": 0.0,
    "totalExpenses": 0.0,
    "totalCmv": 0.0,
    "totalDiv": 0.0,
    "cmvPct": 0.0,
    "divPct": 0.0,
    "dailyAverage": 0.0,
    "salesExpectation": 0.0,
    "finalBalance": 1.0,
    "payments": [
      {
        "method": "Dinheiro",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Agiplan",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Alelo Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Amex Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Banescard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Credsystem",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diner Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diners Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "E-Commerce",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Good Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Green Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hiper Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hipercard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "iFood",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Mercado Pago",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pix – Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Rappi",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sodexo",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sorocred",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Restaurante",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Electron",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Vr Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pede Pronto",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Fo To Save",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ben Visa Vale",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pluxee",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Flex",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "99 Food",
        "amount": 0.0,
        "percentage": 0.0
      }
    ]
  },
  {
    "month": "05",
    "monthName": "Maio",
    "totalSales": 0.0,
    "totalCash": 0.0,
    "totalCards": 0.0,
    "totalExpenses": 0.0,
    "totalCmv": 0.0,
    "totalDiv": 0.0,
    "cmvPct": 0.0,
    "divPct": 0.0,
    "dailyAverage": 0.0,
    "salesExpectation": 0.0,
    "finalBalance": 1.0,
    "payments": [
      {
        "method": "Dinheiro",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Agiplan",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Alelo Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Amex Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Banescard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Credsystem",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diner Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diners Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "E-Commerce",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Good Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Green Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hiper Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hipercard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "iFood",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Mercado Pago",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pix – Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Rappi",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sodexo",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sorocred",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Restaurante",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Electron",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Vr Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pede Pronto",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Fo To Save",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ben Visa Vale",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pluxee",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Flex",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "99 Food",
        "amount": 0.0,
        "percentage": 0.0
      }
    ]
  },
  {
    "month": "06",
    "monthName": "Junho",
    "totalSales": 82354.96,
    "totalCash": 5127.65,
    "totalCards": 77227.31,
    "totalExpenses": 75117.44,
    "totalCmv": 61396.82,
    "totalDiv": 13720.62,
    "cmvPct": 0.7455145385293126,
    "divPct": 0.1666034444069914,
    "dailyAverage": 2745.16533333333,
    "salesExpectation": 82354.96,
    "finalBalance": 2915.95,
    "payments": [
      {
        "method": "Dinheiro",
        "amount": 5127.65,
        "percentage": 0.062262795100623
      },
      {
        "method": "Agiplan",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Alelo Refeição",
        "amount": 968.5,
        "percentage": 0.0117600688531693
      },
      {
        "method": "Amex Credito",
        "amount": 1415.55,
        "percentage": 0.0171884000672212
      },
      {
        "method": "Avista Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Banescard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Credsystem",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diner Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diners Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "E-Commerce",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Credito",
        "amount": 2007.02,
        "percentage": 0.024370359720896
      },
      {
        "method": "Elo Debito",
        "amount": 2076.05,
        "percentage": 0.0252085606015715
      },
      {
        "method": "Good Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Green Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hiper Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hipercard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "iFood",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Credito",
        "amount": 17632.49,
        "percentage": 0.21410355854705
      },
      {
        "method": "Master Debito",
        "amount": 19880.05,
        "percentage": 0.241394689524468
      },
      {
        "method": "Mercado Pago",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pix – Debito",
        "amount": 12510.67,
        "percentage": 0.151911554568177
      },
      {
        "method": "Rappi",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sodexo",
        "amount": 554.65,
        "percentage": 0.00673487061374324
      },
      {
        "method": "Sorocred",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Restaurante",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Credito",
        "amount": 11042.67,
        "percentage": 0.134086277256403
      },
      {
        "method": "Visa Electron",
        "amount": 8963.66,
        "percentage": 0.108841774678781
      },
      {
        "method": "Vr Refeição",
        "amount": 176.0,
        "percentage": 0.00213709046789653
      },
      {
        "method": "Pede Pronto",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Fo To Save",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ben Visa Vale",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pluxee",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Flex",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "99 Food",
        "amount": 0.0,
        "percentage": 0.0
      }
    ]
  },
  {
    "month": "07",
    "monthName": "Julho",
    "totalSales": 150999.94,
    "totalCash": 8877.3,
    "totalCards": 142122.64,
    "totalExpenses": 89294.65,
    "totalCmv": 47410.65,
    "totalDiv": 41884.0,
    "cmvPct": 0.31397793932898255,
    "divPct": 0.277377593659971,
    "dailyAverage": 8882.34941176471,
    "salesExpectation": 275352.831764706,
    "finalBalance": 2035.33,
    "payments": [
      {
        "method": "Dinheiro",
        "amount": 8877.3,
        "percentage": 0.0587900895854661
      },
      {
        "method": "Agiplan",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Alelo Refeição",
        "amount": 2209.58,
        "percentage": 0.0146329859468818
      },
      {
        "method": "Amex Credito",
        "amount": 536.0,
        "percentage": 0.0035496702846372
      },
      {
        "method": "Avista Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Banescard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Credsystem",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diner Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diners Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "E-Commerce",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Credito",
        "amount": 2756.57,
        "percentage": 0.0182554377173925
      },
      {
        "method": "Elo Debito",
        "amount": 4456.0,
        "percentage": 0.0295099455006406
      },
      {
        "method": "Good Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Green Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hiper Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hipercard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "iFood",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Credito",
        "amount": 28623.15,
        "percentage": 0.189557360089017
      },
      {
        "method": "Master Debito",
        "amount": 39862.64,
        "percentage": 0.263991098274609
      },
      {
        "method": "Mercado Pago",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pix – Debito",
        "amount": 24130.05,
        "percentage": 0.159801719126511
      },
      {
        "method": "Rappi",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sodexo",
        "amount": 2570.5,
        "percentage": 0.0170231855721267
      },
      {
        "method": "Sorocred",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Restaurante",
        "amount": 1170.0,
        "percentage": 0.00774834744967448
      },
      {
        "method": "Visa Credito",
        "amount": 19920.05,
        "percentage": 0.131920913346058
      },
      {
        "method": "Visa Electron",
        "amount": 15888.1,
        "percentage": 0.105219247106986
      },
      {
        "method": "Vr Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pede Pronto",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Fo To Save",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ben Visa Vale",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pluxee",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Flex",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "99 Food",
        "amount": 0.0,
        "percentage": 0.0
      }
    ]
  },
  {
    "month": "08",
    "monthName": "Agosto",
    "totalSales": 0.0,
    "totalCash": 0.0,
    "totalCards": 0.0,
    "totalExpenses": 0.0,
    "totalCmv": 0.0,
    "totalDiv": 0.0,
    "cmvPct": 0.0,
    "divPct": 0.0,
    "dailyAverage": 0.0,
    "salesExpectation": 0.0,
    "finalBalance": 2035.33,
    "payments": [
      {
        "method": "Dinheiro",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Agiplan",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Alelo Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Amex Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Banescard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Credsystem",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diner Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diners Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "E-Commerce",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Good Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Green Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hiper Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hipercard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "iFood",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Mercado Pago",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pix – Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Rappi",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sodexo",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sorocred",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Restaurante",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Electron",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Vr Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pede Pronto",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Fo To Save",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ben Visa Vale",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pluxee",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Flex",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "99 Food",
        "amount": 0.0,
        "percentage": 0.0
      }
    ]
  },
  {
    "month": "09",
    "monthName": "Setembro",
    "totalSales": 0.0,
    "totalCash": 0.0,
    "totalCards": 0.0,
    "totalExpenses": 0.0,
    "totalCmv": 0.0,
    "totalDiv": 0.0,
    "cmvPct": 0.0,
    "divPct": 0.0,
    "dailyAverage": 0.0,
    "salesExpectation": 0.0,
    "finalBalance": 2035.33,
    "payments": [
      {
        "method": "Dinheiro",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Agiplan",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Alelo Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Amex Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Banescard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Credsystem",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diner Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diners Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "E-Commerce",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Good Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Green Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hiper Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hipercard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "iFood",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Mercado Pago",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pix – Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Rappi",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sodexo",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sorocred",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Restaurante",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Electron",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Vr Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pede Pronto",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Fo To Save",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ben Visa Vale",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pluxee",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Flex",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "99 Food",
        "amount": 0.0,
        "percentage": 0.0
      }
    ]
  },
  {
    "month": "10",
    "monthName": "Outubro",
    "totalSales": 0.0,
    "totalCash": 0.0,
    "totalCards": 0.0,
    "totalExpenses": 0.0,
    "totalCmv": 0.0,
    "totalDiv": 0.0,
    "cmvPct": 0.0,
    "divPct": 0.0,
    "dailyAverage": 0.0,
    "salesExpectation": 0.0,
    "finalBalance": 2035.33,
    "payments": [
      {
        "method": "Dinheiro",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Agiplan",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Alelo Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Amex Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Banescard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Credsystem",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diner Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diners Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "E-Commerce",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Good Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Green Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hiper Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hipercard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "iFood",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Mercado Pago",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pix – Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Rappi",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sodexo",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sorocred",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Restaurante",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Electron",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Vr Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pede Pronto",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Fo To Save",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ben Visa Vale",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pluxee",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Flex",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "99 Food",
        "amount": 0.0,
        "percentage": 0.0
      }
    ]
  },
  {
    "month": "11",
    "monthName": "Novembro",
    "totalSales": 0.0,
    "totalCash": 0.0,
    "totalCards": 0.0,
    "totalExpenses": 0.0,
    "totalCmv": 0.0,
    "totalDiv": 0.0,
    "cmvPct": 0.0,
    "divPct": 0.0,
    "dailyAverage": 0.0,
    "salesExpectation": 0.0,
    "finalBalance": 2035.33,
    "payments": [
      {
        "method": "Dinheiro",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Agiplan",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Alelo Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Amex Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Banescard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Credsystem",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diner Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diners Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "E-Commerce",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Good Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Green Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hiper Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hipercard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "iFood",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Mercado Pago",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pix – Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Rappi",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sodexo",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sorocred",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Restaurante",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Electron",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Vr Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pede Pronto",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Fo To Save",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ben Visa Vale",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pluxee",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Flex",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "99 Food",
        "amount": 0.0,
        "percentage": 0.0
      }
    ]
  },
  {
    "month": "12",
    "monthName": "Dezembro",
    "totalSales": 0.0,
    "totalCash": 0.0,
    "totalCards": 0.0,
    "totalExpenses": 0.0,
    "totalCmv": 0.0,
    "totalDiv": 0.0,
    "cmvPct": 0.0,
    "divPct": 0.0,
    "dailyAverage": 0.0,
    "salesExpectation": 0.0,
    "finalBalance": 2035.33,
    "payments": [
      {
        "method": "Dinheiro",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Agiplan",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Alelo Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Amex Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Avista Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Banescard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Cabal Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Credsystem",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diner Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Diners Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "E-Commerce",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Elo Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Good Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Green Card",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hiper Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Hipercard",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "iFood",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Master Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Mercado Pago",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pix – Debito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Rappi",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sodexo",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Sorocred",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Restaurante",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Credito",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Visa Electron",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Vr Refeição",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pede Pronto",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Fo To Save",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ben Visa Vale",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Pluxee",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "Ticket Flex",
        "amount": 0.0,
        "percentage": 0.0
      },
      {
        "method": "99 Food",
        "amount": 0.0,
        "percentage": 0.0
      }
    ]
  }
];

export const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    "id": "exp_1",
    "month": "06",
    "supplier": "compra de cabo para o radio",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 15.0
  },
  {
    "id": "exp_2",
    "month": "06",
    "supplier": "Passagem anne caroline",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 20.0
  },
  {
    "id": "exp_3",
    "month": "06",
    "supplier": "Passagem",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 37.95
  },
  {
    "id": "exp_4",
    "month": "06",
    "supplier": "Compra 6 uni borifador",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 48.0
  },
  {
    "id": "exp_5",
    "month": "06",
    "supplier": "Compra 9 uni de agua 1,500ml para fucionario treinamento",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 30.0
  },
  {
    "id": "exp_6",
    "month": "06",
    "supplier": "Compra 2 essencia de banilha",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 27.9
  },
  {
    "id": "exp_7",
    "month": "06",
    "supplier": "compra papel chamex a4",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 32.0
  },
  {
    "id": "exp_8",
    "month": "06",
    "supplier": "Compra 1 uni pelicula para celular da loja",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 10.0
  },
  {
    "id": "exp_9",
    "month": "06",
    "supplier": "compra no caçula 1 porta talher ,espremedor de frutas,papel filiparer offset",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 53.0
  },
  {
    "id": "exp_10",
    "month": "06",
    "supplier": "pao para fucionario",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 24.0
  },
  {
    "id": "exp_11",
    "month": "06",
    "supplier": "passagem Aline",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 19.0
  },
  {
    "id": "exp_12",
    "month": "06",
    "supplier": "compra 1640kg banana prata",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 13.1
  },
  {
    "id": "exp_13",
    "month": "06",
    "supplier": "pao para fucionario",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 24.0
  },
  {
    "id": "exp_14",
    "month": "06",
    "supplier": "compra caçula cx caneta bic,6 uni caneta retro,",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 72.95
  },
  {
    "id": "exp_15",
    "month": "06",
    "supplier": "compra guanabara 12 copo 200ml,5 uni açúcar demerara",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 78.35
  },
  {
    "id": "exp_16",
    "month": "06",
    "supplier": "compra caçula 1 extensão eletrica",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 30.0
  },
  {
    "id": "exp_17",
    "month": "06",
    "supplier": "compra de saleiro",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 12.0
  },
  {
    "id": "exp_18",
    "month": "06",
    "supplier": "compra mercado 2 lata de leite ninho,4 uni esponja",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 65.15
  },
  {
    "id": "exp_19",
    "month": "06",
    "supplier": "Compra 1 calça gerente",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 80.0
  },
  {
    "id": "exp_20",
    "month": "06",
    "supplier": "compra de 3 bandeja de morango",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 30.0
  },
  {
    "id": "exp_21",
    "month": "06",
    "supplier": "almoço gerente e jo treinamento",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 53.8
  },
  {
    "id": "exp_22",
    "month": "06",
    "supplier": "3 platificaçõs",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 18.0
  },
  {
    "id": "exp_23",
    "month": "06",
    "supplier": "compra de cofre loja",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 400.0
  },
  {
    "id": "exp_24",
    "month": "06",
    "supplier": "passagem fernanda 2 dias",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 50.6
  },
  {
    "id": "exp_25",
    "month": "06",
    "supplier": "Compra 96 uni agua 200ml",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 95.05
  },
  {
    "id": "exp_26",
    "month": "06",
    "supplier": "uber entrega de mercadoria",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 15.0
  },
  {
    "id": "exp_27",
    "month": "06",
    "supplier": "Compra 1 mouse s fio",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 20.0
  },
  {
    "id": "exp_28",
    "month": "06",
    "supplier": "pao para fucionario",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 24.0
  },
  {
    "id": "exp_29",
    "month": "06",
    "supplier": "Compra 1 cabo para o son",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 30.0
  },
  {
    "id": "exp_30",
    "month": "06",
    "supplier": "Passagem anne caroline 3 dias 25/06-26/06- 27/06",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 60.0
  },
  {
    "id": "exp_31",
    "month": "06",
    "supplier": "Dolce e salato o sorvete rec: 09/06/26 venc: 08/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 1628.0
  },
  {
    "id": "exp_32",
    "month": "06",
    "supplier": "Dolce e salato o sorvete rec: 09/06/26 venc: 23/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 1626.3
  },
  {
    "id": "exp_33",
    "month": "06",
    "supplier": "cooperativa de laticinios rec: 10/06/26 venc: 21/06/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 2673.0
  },
  {
    "id": "exp_34",
    "month": "06",
    "supplier": "compra de 3 cx de luva de vinil",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 69.0
  },
  {
    "id": "exp_35",
    "month": "06",
    "supplier": "passagem samara",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 20.0
  },
  {
    "id": "exp_36",
    "month": "06",
    "supplier": "Rio quality rec: 19/06/26 venc: 02/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 528.0
  },
  {
    "id": "exp_37",
    "month": "06",
    "supplier": "top alto rec:20/06/26 venc: 30/06/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 460.0
  },
  {
    "id": "exp_38",
    "month": "06",
    "supplier": "nestlé brasil rec: 18/06/26 venc: 01/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 628.68
  },
  {
    "id": "exp_39",
    "month": "06",
    "supplier": "conectar rec: 22/06/26 venc: 24/06/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 452.42
  },
  {
    "id": "exp_40",
    "month": "06",
    "supplier": "ws comercio rec: 19/06/26 venc: 09/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 282.12
  },
  {
    "id": "exp_41",
    "month": "06",
    "supplier": "globalmix rec: 22/06/26 venc: 13/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 310.01
  },
  {
    "id": "exp_42",
    "month": "06",
    "supplier": "passagem ana carla",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 20.0
  },
  {
    "id": "exp_43",
    "month": "06",
    "supplier": "passagem fernanda 4 dias 27/06 -28/06- 29/06-30/06",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 101.2
  },
  {
    "id": "exp_44",
    "month": "06",
    "supplier": "jae rec: 25/06/26 venc: 26/06/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 1962.0
  },
  {
    "id": "exp_45",
    "month": "06",
    "supplier": "jae rec: 25/06/26 venc: 26/06/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 300.0
  },
  {
    "id": "exp_46",
    "month": "06",
    "supplier": "ticket serviços rec: 25/06/26 venc: 01/06/25",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 3060.0
  },
  {
    "id": "exp_47",
    "month": "06",
    "supplier": "top alto rec: 05/06/26 venc: 15/06/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 1722.68
  },
  {
    "id": "exp_48",
    "month": "06",
    "supplier": "top alto rec: 06/06/26 venc: 16/06/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 2693.1
  },
  {
    "id": "exp_49",
    "month": "06",
    "supplier": "",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 1014.99
  },
  {
    "id": "exp_50",
    "month": "06",
    "supplier": "Globalmix rec: 05/06/26 venc: 26/06/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 1014.98
  },
  {
    "id": "exp_51",
    "month": "06",
    "supplier": "Globalmix rec: 05/06/26 venc: 03/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 1014.98
  },
  {
    "id": "exp_52",
    "month": "06",
    "supplier": "super vinhos rec: 08/06/26 venc: 22/06/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 1021.0
  },
  {
    "id": "exp_53",
    "month": "06",
    "supplier": "laticinios alhambra rec: 08/06/26 venc: 20/06/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 2963.27
  },
  {
    "id": "exp_54",
    "month": "06",
    "supplier": "atacadista nechio rec: 06/06/26 venc: 19/06/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 2285.66
  },
  {
    "id": "exp_55",
    "month": "06",
    "supplier": "calebito atacadista rec: 08/06/26 venc: 19/06/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 278.68
  },
  {
    "id": "exp_56",
    "month": "06",
    "supplier": "calebito atacadista rec: 08/06/26 venc: 22/06/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 23759.79
  },
  {
    "id": "exp_57",
    "month": "06",
    "supplier": "globalmix rec: 05/06/26 venc: 19/06/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 748.76
  },
  {
    "id": "exp_58",
    "month": "06",
    "supplier": "globalmix rec: 05/06/26 venc:26/06/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 748.77
  },
  {
    "id": "exp_59",
    "month": "06",
    "supplier": "Globalmix rec: 05/06/26 venc: 03/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 748.77
  },
  {
    "id": "exp_60",
    "month": "06",
    "supplier": "ws comercio rec: 01/06/26 venc: 10/06/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 979.62
  },
  {
    "id": "exp_61",
    "month": "06",
    "supplier": "compra caçula 4 cx luva de vinil,1 mardelo,1 cx de son,1 regua",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 150.8
  },
  {
    "id": "exp_62",
    "month": "06",
    "supplier": "Passagem anne caroline",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 20.0
  },
  {
    "id": "exp_63",
    "month": "06",
    "supplier": "compra mercado 2,708kg banana prata",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 21.6
  },
  {
    "id": "exp_64",
    "month": "06",
    "supplier": "uber entrega de mercadoria",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 14.1
  },
  {
    "id": "exp_65",
    "month": "06",
    "supplier": "uber",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 20.4
  },
  {
    "id": "exp_66",
    "month": "06",
    "supplier": "devolucao cliente",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 26.0
  },
  {
    "id": "exp_67",
    "month": "06",
    "supplier": "compra mercado 1 cartela cm 20 ovos",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 14.15
  },
  {
    "id": "exp_68",
    "month": "06",
    "supplier": "pao para fucionario",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 24.6
  },
  {
    "id": "exp_69",
    "month": "06",
    "supplier": "Passagem anne caroline",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 20.0
  },
  {
    "id": "exp_70",
    "month": "06",
    "supplier": "segunda via cartao Aline",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 35.0
  },
  {
    "id": "exp_71",
    "month": "06",
    "supplier": "entregar e recarga cartao Aline",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 30.7
  },
  {
    "id": "exp_72",
    "month": "06",
    "supplier": "Compra 2 dispenser para detegente",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 32.0
  },
  {
    "id": "exp_73",
    "month": "06",
    "supplier": "passagem extra greve juliana",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 7.0
  },
  {
    "id": "exp_74",
    "month": "06",
    "supplier": "Passagem anne caroline",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 20.0
  },
  {
    "id": "exp_75",
    "month": "06",
    "supplier": "passagem extra greve kaua, vitor",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 13.6
  },
  {
    "id": "exp_76",
    "month": "06",
    "supplier": "uber para vir trabalhar greve vitor",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 20.4
  },
  {
    "id": "exp_77",
    "month": "06",
    "supplier": "uber para vir trabalhar greve Fernanda",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 19.0
  },
  {
    "id": "exp_78",
    "month": "06",
    "supplier": "calebito atacadista rec: 29/06/26 venc: 10/07/2026",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 14059.88
  },
  {
    "id": "exp_79",
    "month": "06",
    "supplier": "conectar rec: 29/06/26 venc: 01/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 899.91
  },
  {
    "id": "exp_80",
    "month": "06",
    "supplier": "ws comercio rec:29/06/2026 venc:26/07/2026",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 326.2
  },
  {
    "id": "exp_81",
    "month": "06",
    "supplier": "ws comercio rec:29/06/2026 venc:17/07/2026",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 158.63
  },
  {
    "id": "exp_82",
    "month": "06",
    "supplier": "dfranquias rec: 29/06/2026 venc: 01/07/2026",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 350.0
  },
  {
    "id": "exp_83",
    "month": "06",
    "supplier": "Alain t.i rec: 30/06/2026 venc: 05/07/2026",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 200.0
  },
  {
    "id": "exp_84",
    "month": "06",
    "supplier": "ws comercio rec:30/06/2026 venc: 21/07/2026",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 872.86
  },
  {
    "id": "exp_85",
    "month": "07",
    "supplier": "Compra 96 uni agua mineral copinho 200ml",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 95.02
  },
  {
    "id": "exp_86",
    "month": "07",
    "supplier": "Compra 2kg banana prata",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 20.0
  },
  {
    "id": "exp_87",
    "month": "07",
    "supplier": "uber para leva Aline no upa",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 15.0
  },
  {
    "id": "exp_88",
    "month": "07",
    "supplier": "passagem anne",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 20.0
  },
  {
    "id": "exp_89",
    "month": "07",
    "supplier": "passagem anne 2 dias",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 40.0
  },
  {
    "id": "exp_90",
    "month": "07",
    "supplier": "uber entregar de mercadoria",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 22.0
  },
  {
    "id": "exp_91",
    "month": "07",
    "supplier": "exame Grazielle",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 60.0
  },
  {
    "id": "exp_92",
    "month": "07",
    "supplier": "extra fucionario",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 100.0
  },
  {
    "id": "exp_93",
    "month": "07",
    "supplier": "passagem extra",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 20.0
  },
  {
    "id": "exp_94",
    "month": "07",
    "supplier": "uber",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 20.0
  },
  {
    "id": "exp_95",
    "month": "07",
    "supplier": "uber",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 53.0
  },
  {
    "id": "exp_96",
    "month": "07",
    "supplier": "compra banana prata 2124kg",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 17.0
  },
  {
    "id": "exp_97",
    "month": "07",
    "supplier": "compra de parafuso",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 3.5
  },
  {
    "id": "exp_98",
    "month": "07",
    "supplier": "uber entregar de mercadoria",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 23.5
  },
  {
    "id": "exp_99",
    "month": "07",
    "supplier": "passagem anne 3 dias 07/07/26 -09/07/2026- 11/07/2026",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 60.0
  },
  {
    "id": "exp_100",
    "month": "07",
    "supplier": "Compra 3 uni oleo de coco 100ml",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 27.3
  },
  {
    "id": "exp_101",
    "month": "07",
    "supplier": "pao para fucionario",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 24.35
  },
  {
    "id": "exp_102",
    "month": "07",
    "supplier": "folha de pagamento",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 31828.04
  },
  {
    "id": "exp_103",
    "month": "07",
    "supplier": "passagem do Alain",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 30.0
  },
  {
    "id": "exp_104",
    "month": "07",
    "supplier": "troca de cabo de força computador",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 50.0
  },
  {
    "id": "exp_105",
    "month": "07",
    "supplier": "laticinios alhambra rec: 02/07/26 venc: 15/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 1449.69
  },
  {
    "id": "exp_106",
    "month": "07",
    "supplier": "top alto rec: 04/07/26 venc: 14/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 725.0
  },
  {
    "id": "exp_107",
    "month": "07",
    "supplier": "comercial atacadista rec: 02/07/26 venc: 15/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 1019.5
  },
  {
    "id": "exp_108",
    "month": "07",
    "supplier": "comercial atacadista rec: 06/07/26 venc: 18/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 659.6
  },
  {
    "id": "exp_109",
    "month": "07",
    "supplier": "Ccn-com-centro norte rec: 06/07/26 venc: 20/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 1035.79
  },
  {
    "id": "exp_110",
    "month": "07",
    "supplier": "calebito atacadista rec:06/07/26 venc: 17/06/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 13346.54
  },
  {
    "id": "exp_111",
    "month": "07",
    "supplier": "conectar rec: 06/0726 venc: 08/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 506.87
  },
  {
    "id": "exp_112",
    "month": "07",
    "supplier": "compra caçula 2 garrafa alcool",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 20.0
  },
  {
    "id": "exp_113",
    "month": "07",
    "supplier": "passagem grazielle 2 dias",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 20.0
  },
  {
    "id": "exp_114",
    "month": "07",
    "supplier": "salario de fucionarios pago pela loja",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 4981.15
  },
  {
    "id": "exp_115",
    "month": "07",
    "supplier": "compra caçula 3 quadro multiuso,1 pasta catalogo",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 50.1
  },
  {
    "id": "exp_116",
    "month": "07",
    "supplier": "troca de forte",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 170.0
  },
  {
    "id": "exp_117",
    "month": "07",
    "supplier": "passagem Alain",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 30.0
  },
  {
    "id": "exp_118",
    "month": "07",
    "supplier": "passagem grazielle 1 dia",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 10.0
  },
  {
    "id": "exp_119",
    "month": "07",
    "supplier": "compra caçula 1 pasta sanfonada 12 d , 1 pasta sanfonada 31 d",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 83.0
  },
  {
    "id": "exp_120",
    "month": "07",
    "supplier": "ticket fucionario",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 170.0
  },
  {
    "id": "exp_121",
    "month": "07",
    "supplier": "Compra 20 cx de lapis de cor",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 60.3
  },
  {
    "id": "exp_122",
    "month": "07",
    "supplier": "passagem fucionario",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 260.0
  },
  {
    "id": "exp_123",
    "month": "07",
    "supplier": "ticket fucionario",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 170.0
  },
  {
    "id": "exp_124",
    "month": "07",
    "supplier": "Compra 9 pa de luva pigmentada",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 40.5
  },
  {
    "id": "exp_125",
    "month": "07",
    "supplier": "extra fucionario",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 110.0
  },
  {
    "id": "exp_126",
    "month": "07",
    "supplier": "extra passagem",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 10.0
  },
  {
    "id": "exp_127",
    "month": "07",
    "supplier": "Compra 2 kg de banana prata",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 15.0
  },
  {
    "id": "exp_128",
    "month": "07",
    "supplier": "extra fucionario",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 110.0
  },
  {
    "id": "exp_129",
    "month": "07",
    "supplier": "passagem extra",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 10.0
  },
  {
    "id": "exp_130",
    "month": "07",
    "supplier": "compra caçula 1 grampeador,1 caneta cedula falsa,1 cola branca",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 25.5
  },
  {
    "id": "exp_131",
    "month": "07",
    "supplier": "compr mercado 5 uni oleo de coco 100 ml",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 45.1
  },
  {
    "id": "exp_132",
    "month": "07",
    "supplier": "Farmacia 1 curativo,1 gaze ,esparadrapo",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 12.15
  },
  {
    "id": "exp_133",
    "month": "07",
    "supplier": "laticinios alhambra rec: 08/07/26 venc: 21/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 1320.0
  },
  {
    "id": "exp_134",
    "month": "07",
    "supplier": "top alto rec: 07/07/26 venc: 17/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 407.2
  },
  {
    "id": "exp_135",
    "month": "07",
    "supplier": "super vinhos rec: 08/07/2026 venc: 21/07/2026",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 745.2
  },
  {
    "id": "exp_136",
    "month": "07",
    "supplier": "globalmix rec: 08/07/26 venc: 28/07/2026",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 1029.0
  },
  {
    "id": "exp_137",
    "month": "07",
    "supplier": "globalmix rec: 08/07/26 venc: 04/08/2026",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 1202.89
  },
  {
    "id": "exp_138",
    "month": "07",
    "supplier": "pao para fucionario",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 7.0
  },
  {
    "id": "exp_139",
    "month": "07",
    "supplier": "compra kit c/ 4 jarra copo medidor",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 38.0
  },
  {
    "id": "exp_140",
    "month": "07",
    "supplier": "Compra 1 cx de copo 200ml",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 69.9
  },
  {
    "id": "exp_141",
    "month": "07",
    "supplier": "Compra 1 ralator de queijo",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 15.35
  },
  {
    "id": "exp_142",
    "month": "07",
    "supplier": "Compra 2 cartela de cadeado 12 uni para armario dos fucionarios",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 102.0
  },
  {
    "id": "exp_143",
    "month": "07",
    "supplier": "compra banqueta monobloco",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 34.9
  },
  {
    "id": "exp_144",
    "month": "07",
    "supplier": "compra kit cm 12 luvas pigmentada",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 70.65
  },
  {
    "id": "exp_145",
    "month": "07",
    "supplier": "Compra 1 balança de precisão",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 16.75
  },
  {
    "id": "exp_146",
    "month": "07",
    "supplier": "compra p/ sobremesa 24 uni",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 77.8
  },
  {
    "id": "exp_147",
    "month": "07",
    "supplier": "compra manual do código de defesa do consumido",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 28.4
  },
  {
    "id": "exp_148",
    "month": "07",
    "supplier": "Compra 1 acido latico",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 51.25
  },
  {
    "id": "exp_149",
    "month": "07",
    "supplier": "Compra 1 porta comanda",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 49.6
  },
  {
    "id": "exp_150",
    "month": "07",
    "supplier": "compra kit c/ 3 escova de limpeza chapa",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 32.9
  },
  {
    "id": "exp_151",
    "month": "07",
    "supplier": "Compra 1 suporte porta canudos",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 19.0
  },
  {
    "id": "exp_152",
    "month": "07",
    "supplier": "Compra 1 pincel silicone cozinha",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 19.0
  },
  {
    "id": "exp_153",
    "month": "07",
    "supplier": "Rio quality rec: 11/07/26 venc: 26/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 458.0
  },
  {
    "id": "exp_154",
    "month": "07",
    "supplier": "Rio quality rec: 11/07/26 venc: 26/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 1404.0
  },
  {
    "id": "exp_155",
    "month": "07",
    "supplier": "Top alto rec: 09/07/26 venc: 19/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 436.98
  },
  {
    "id": "exp_156",
    "month": "07",
    "supplier": "Laticinios alhambra rec: 10/07/26 venc: 23/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 1447.78
  },
  {
    "id": "exp_157",
    "month": "07",
    "supplier": "conectar rec: 13/0726 venc: 15/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 1720.61
  },
  {
    "id": "exp_158",
    "month": "07",
    "supplier": "Citta telecom rec: 12/07/26 venc: 20/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 101.27
  },
  {
    "id": "exp_159",
    "month": "07",
    "supplier": "compra mercado 5 sache oleo de coco",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 45.25
  },
  {
    "id": "exp_160",
    "month": "07",
    "supplier": "passagem anne 3 dias 13/07/26 -15/07/2026- 17/07/2026",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 60.0
  },
  {
    "id": "exp_161",
    "month": "07",
    "supplier": "uber greve de onibus kaua",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 41.6
  },
  {
    "id": "exp_162",
    "month": "07",
    "supplier": "uber greve de onibus kaua",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 40.75
  },
  {
    "id": "exp_163",
    "month": "07",
    "supplier": "uber trazer uniformes são joão de meriti",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 51.0
  },
  {
    "id": "exp_164",
    "month": "07",
    "supplier": "uber thais",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 58.0
  },
  {
    "id": "exp_165",
    "month": "07",
    "supplier": "lanche treinamento fucionario",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 152.55
  },
  {
    "id": "exp_166",
    "month": "07",
    "supplier": "lanche treinamento fucionario",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 73.5
  },
  {
    "id": "exp_167",
    "month": "07",
    "supplier": "passagem fucionario anne",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 20.0
  },
  {
    "id": "exp_168",
    "month": "07",
    "supplier": "uber Tatiane greve onibus",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 26.0
  },
  {
    "id": "exp_169",
    "month": "07",
    "supplier": "uber Samara greve onibus",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 38.1
  },
  {
    "id": "exp_170",
    "month": "07",
    "supplier": "uber Biatriz greve onibus",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 15.0
  },
  {
    "id": "exp_171",
    "month": "07",
    "supplier": "Compra 1 uni cx organiadora 56l,3 uni cx org.12 l,2 uni jarra,1 cx p/medicamento",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 280.9
  },
  {
    "id": "exp_172",
    "month": "07",
    "supplier": "Compra 92 uni agua mineral copinho 200ml",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 190.1
  },
  {
    "id": "exp_173",
    "month": "07",
    "supplier": "Compra 1 balde doce de leite rocca",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 189.8
  },
  {
    "id": "exp_174",
    "month": "07",
    "supplier": "Compra 24 colher de sobremesas",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 77.8
  },
  {
    "id": "exp_175",
    "month": "07",
    "supplier": "uber entrega de marcadoria",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 25.0
  },
  {
    "id": "exp_176",
    "month": "07",
    "supplier": "pao para fucionario",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 5.85
  },
  {
    "id": "exp_177",
    "month": "07",
    "supplier": "Compra 1 doce de leite rocca",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 189.8
  },
  {
    "id": "exp_178",
    "month": "07",
    "supplier": "Compra 36 agua mineral c/ gas,45 agua mineral s/gas ,192 agua copinho",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 315.6
  },
  {
    "id": "exp_179",
    "month": "07",
    "supplier": "pao para fucionario",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 22.2
  },
  {
    "id": "exp_180",
    "month": "07",
    "supplier": "calebito atacadista rec: 13/07/26 venc: 24/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 13166.08
  },
  {
    "id": "exp_181",
    "month": "07",
    "supplier": "top alto rec: 15/07/26 venc: 25/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 529.8
  },
  {
    "id": "exp_182",
    "month": "07",
    "supplier": "comercial atacadista rec:15/07/26 venc: 28/0726",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 1299.66
  },
  {
    "id": "exp_183",
    "month": "07",
    "supplier": "ws comercio rec: 09/07/26 venc: 29/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 468.45
  },
  {
    "id": "exp_184",
    "month": "07",
    "supplier": "passagem aline",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 19.0
  },
  {
    "id": "exp_185",
    "month": "07",
    "supplier": "Passagem 2 dias kaua",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 20.0
  },
  {
    "id": "exp_186",
    "month": "07",
    "supplier": "pao para fucionario",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 24.15
  },
  {
    "id": "exp_187",
    "month": "07",
    "supplier": "laticinios alhambra rec:25:07:26 venc: 08/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 2107.78
  },
  {
    "id": "exp_188",
    "month": "07",
    "supplier": "top alto rec: 26/07/26 venc: 06/07/26",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "CMV",
    "amount": 829.9
  },
  {
    "id": "exp_189",
    "month": "07",
    "supplier": "passagem aline",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 20.0
  },
  {
    "id": "exp_190",
    "month": "07",
    "supplier": "passagem andreya",
    "invoiceNumber": "",
    "invoiceDate": "",
    "category": "DIV",
    "amount": 20.0
  }
];
