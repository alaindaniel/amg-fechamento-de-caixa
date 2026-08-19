import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Save,
  CheckCircle
} from 'lucide-react';
import {
  getPaymentMethods,
  getExpenses,
  saveExpense,
  deleteExpense,
  getMonthlyReports,
  saveMonthlyReport
} from '../services/storage';
import type { PaymentMethod, ExpenseItem } from '../types';

export const CaixaView: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('06');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);

  // Daily Form State
  const [initialBalance, setInitialBalance] = useState<number>(1.00);
  const [reductionZ, setReductionZ] = useState<number>(0);
  const [cashEntries, setCashEntries] = useState<number>(0);
  const [paymentValues, setPaymentValues] = useState<Record<string, number>>({});
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // New Expense Form State
  const [newSupplier, setNewSupplier] = useState<string>('');
  const [newInvoiceNumber, setNewInvoiceNumber] = useState<string>('');
  const [newInvoiceDate, setNewInvoiceDate] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'CMV' | 'DIV'>('CMV');
  const [newAmount, setNewAmount] = useState<string>('');

  useEffect(() => {
    setPaymentMethods(getPaymentMethods());
    setExpenses(getExpenses());
  }, []);

  const monthNames: Record<string, string> = {
    '01': 'Janeiro', '02': 'Fevereiro', '03': 'Março', '04': 'Abril',
    '05': 'Maio', '06': 'Junho', '07': 'Julho', '08': 'Agosto',
    '09': 'Setembro', '10': 'Outubro', '11': 'Novembro', '12': 'Dezembro'
  };

  const currentMonthExpenses = expenses.filter(e => e.month === selectedMonth);

  // Calculations
  const totalCash = paymentValues['Dinheiro'] || 0;
  const totalCards = Object.entries(paymentValues)
    .filter(([key]) => key !== 'Dinheiro')
    .reduce((acc, [, val]) => acc + (val || 0), 0);
  
  const totalSales = totalCash + totalCards;
  const cashDifference = totalSales - reductionZ;

  const totalCmv = currentMonthExpenses
    .filter(e => e.category === 'CMV')
    .reduce((acc, e) => acc + e.amount, 0);

  const totalDiv = currentMonthExpenses
    .filter(e => e.category === 'DIV')
    .reduce((acc, e) => acc + e.amount, 0);

  const totalExpenses = totalCmv + totalDiv;
  const finalBalance = initialBalance + totalCash + cashEntries - totalExpenses;

  const handlePaymentChange = (methodName: string, valStr: string) => {
    const val = parseFloat(valStr) || 0;
    setPaymentValues(prev => ({
      ...prev,
      [methodName]: val
    }));
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(newAmount);
    if (!newSupplier || isNaN(amount) || amount <= 0) {
      alert("Por favor, preencha o nome do fornecedor e um valor válido.");
      return;
    }

    const updated = saveExpense({
      month: selectedMonth,
      supplier: newSupplier,
      invoiceNumber: newInvoiceNumber || 'S/N',
      invoiceDate: newInvoiceDate || new Date().toISOString().substring(0, 10),
      category: newCategory,
      amount
    });

    setExpenses(updated);
    setNewSupplier('');
    setNewInvoiceNumber('');
    setNewInvoiceDate('');
    setNewAmount('');
  };

  const handleDeleteExpense = (id: string) => {
    if (window.confirm("Remover esta despesa?")) {
      const updated = deleteExpense(id);
      setExpenses(updated);
    }
  };

  const handleSaveDailyClosing = () => {
    const reports = getMonthlyReports();
    const currentReport = reports.find(r => r.month === selectedMonth);
    
    if (currentReport) {
      const updatedPayments = currentReport.payments.map(p => {
        const addedVal = paymentValues[p.method] || 0;
        return {
          ...p,
          amount: p.amount > 0 ? p.amount : addedVal
        };
      });

      const newTotalSales = currentReport.totalSales > 0 ? currentReport.totalSales : totalSales;
      const newTotalCash = currentReport.totalCash > 0 ? currentReport.totalCash : totalCash;
      const newTotalCards = currentReport.totalCards > 0 ? currentReport.totalCards : totalCards;

      saveMonthlyReport({
        ...currentReport,
        totalSales: newTotalSales,
        totalCash: newTotalCash,
        totalCards: newTotalCards,
        totalExpenses,
        totalCmv,
        totalDiv,
        cmvPct: newTotalSales > 0 ? totalCmv / newTotalSales : 0,
        divPct: newTotalSales > 0 ? totalDiv / newTotalSales : 0,
        finalBalance,
        payments: updatedPayments
      });
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const formatMoney = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="space-y-6">
      {/* Top Selection Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Mês de Exercício
            </label>
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {Object.entries(monthNames).map(([code, name]) => (
                <option key={code} value={code}>
                  {name} (Mês {code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Dia
            </label>
            <select
              value={selectedDay}
              onChange={e => setSelectedDay(parseInt(e.target.value))}
              className="bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                <option key={d} value={d}>
                  Dia {d < 10 ? `0${d}` : d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {savedSuccess && (
            <span className="flex items-center space-x-1 text-emerald-600 text-xs font-semibold">
              <CheckCircle className="w-4 h-4" />
              <span>Fechamento Salvo!</span>
            </span>
          )}
          <button
            onClick={handleSaveDailyClosing}
            className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-4 py-2 rounded-lg font-bold text-xs transition-colors shadow-md shadow-emerald-500/20"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Fechamento Diário</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Formas de Pagamento & Saldo / DRE Diário */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payments Form (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Movimentações por Forma de Pagamento
            </h2>
            <p className="text-xs text-slate-500">
              Informe os valores arrecadados no dia {selectedDay} de {monthNames[selectedMonth]} por modalidade
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
            {paymentMethods.filter((pm: PaymentMethod) => pm.active).map((pm: PaymentMethod) => (
              <div
                key={pm.id}
                className={`p-3 rounded-lg border text-xs transition-all ${
                  pm.name === 'Dinheiro'
                    ? 'border-emerald-300 bg-emerald-50/50'
                    : 'border-slate-200 bg-slate-50/30'
                }`}
              >
                <div className="flex items-center justify-between text-slate-700 font-semibold mb-1.5">
                  <span className="truncate">{pm.name}</span>
                  {pm.name === 'Dinheiro' && (
                    <span className="bg-emerald-200 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded font-bold">
                      Espécie
                    </span>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-slate-400 font-medium">R$</span>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={paymentValues[pm.name] || ''}
                    onChange={e => handlePaymentChange(pm.name, e.target.value)}
                    className="w-full pl-8 pr-2 py-1.5 bg-white border border-slate-300 rounded font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-right"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Totals Summary Bar */}
          <div className="p-4 bg-slate-900 text-white rounded-lg flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Vendas em Dinheiro</span>
              <span className="text-lg font-bold text-emerald-400">{formatMoney(totalCash)}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Vendas em Cartão/Voucher</span>
              <span className="text-lg font-bold text-blue-400">{formatMoney(totalCards)}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Total de Vendas no Dia</span>
              <span className="text-xl font-extrabold text-white">{formatMoney(totalSales)}</span>
            </div>
          </div>
        </div>

        {/* Closing Totals & Cash Balance Summary (1 col) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Resumo de Caixa & Conferência</h2>
            <p className="text-xs text-slate-500">Cálculo de Redução Z e Saldo Final</p>

            <div className="mt-5 space-y-3 text-xs">
              {/* Saldo Inicial */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-700">Saldo Inicial</span>
                <input
                  type="number"
                  step="0.01"
                  value={initialBalance}
                  onChange={e => setInitialBalance(parseFloat(e.target.value) || 0)}
                  className="w-24 px-2 py-1 bg-white border border-slate-300 rounded font-bold text-slate-900 text-right"
                />
              </div>

              {/* Redução Z */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div>
                  <span className="font-semibold text-slate-700 block">Redução Z (Fiscal)</span>
                  <span className="text-[10px] text-slate-400">Total bruto do ECF</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  value={reductionZ}
                  onChange={e => setReductionZ(parseFloat(e.target.value) || 0)}
                  className="w-24 px-2 py-1 bg-white border border-slate-300 rounded font-bold text-slate-900 text-right"
                />
              </div>

              {/* Diferença de Caixa */}
              <div className={`p-3 rounded-lg border flex items-center justify-between font-bold ${
                cashDifference < 0
                  ? 'bg-rose-50 border-rose-200 text-rose-700'
                  : cashDifference > 0
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <span>Diferença de Caixa</span>
                <span>{formatMoney(cashDifference)}</span>
              </div>

              {/* Outras Entradas */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-700">Outras Entradas</span>
                <input
                  type="number"
                  step="0.01"
                  value={cashEntries}
                  onChange={e => setCashEntries(parseFloat(e.target.value) || 0)}
                  className="w-24 px-2 py-1 bg-white border border-slate-300 rounded font-bold text-slate-900 text-right"
                />
              </div>

              {/* Total Despesas Mês */}
              <div className="flex items-center justify-between p-3 bg-rose-50/50 rounded-lg border border-rose-200 text-rose-900 font-semibold">
                <span>Despesas Totais (Mês)</span>
                <span>{formatMoney(totalExpenses)}</span>
              </div>

              {/* Saldo Final Calculated */}
              <div className="p-4 bg-slate-900 text-white rounded-lg border border-slate-800 shadow-sm mt-4">
                <span className="text-xs text-slate-400 block font-medium uppercase tracking-wider">
                  Saldo Final Previsto
                </span>
                <span className="text-2xl font-extrabold text-emerald-400 mt-1 block">
                  {formatMoney(finalBalance)}
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Saldo Inicial + Dinheiro + Entradas - Despesas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expenses Breakdown Section (Despesas discriminadas) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Lançamento de Despesas e Compras (Mês {selectedMonth})
            </h2>
            <p className="text-xs text-slate-500">
              Discriminação de Fornecedores, N° de Nota, Data de Emissão e Classificação (CMV / DIV)
            </p>
          </div>
          <div className="flex space-x-4 text-xs">
            <span className="px-3 py-1.5 bg-amber-50 text-amber-800 rounded-lg font-bold border border-amber-200">
              Total CMV: {formatMoney(totalCmv)}
            </span>
            <span className="px-3 py-1.5 bg-purple-50 text-purple-800 rounded-lg font-bold border border-purple-200">
              Total DIV: {formatMoney(totalDiv)}
            </span>
          </div>
        </div>

        {/* Add Expense Form */}
        <form onSubmit={handleAddExpense} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="md:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
              Fornecedor / Favorecido
            </label>
            <input
              type="text"
              placeholder="Ex: Frigorífico X, Hortifruti..."
              value={newSupplier}
              onChange={e => setNewSupplier(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
              Nº Nota Fiscal
            </label>
            <input
              type="text"
              placeholder="Ex: 1234"
              value={newInvoiceNumber}
              onChange={e => setNewInvoiceNumber(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
              Data Emissão
            </label>
            <input
              type="text"
              placeholder="DD/MM/AAAA"
              value={newInvoiceDate}
              onChange={e => setNewInvoiceDate(e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
              Classificação
            </label>
            <select
              value={newCategory}
              onChange={e => setNewCategory(e.target.value as 'CMV' | 'DIV')}
              className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="CMV">CMV (Mercadoria)</option>
              <option value="DIV">DIV (Despesa Geral)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
              Valor (R$)
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={newAmount}
                onChange={e => setNewAmount(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 p-2 rounded-lg font-bold text-xs transition-colors shadow-sm shrink-0 flex items-center justify-center"
                title="Adicionar Despesa"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Expenses List Table */}
        <div className="overflow-x-auto max-h-80 overflow-y-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/90 text-slate-700 font-semibold border-b border-slate-200 sticky top-0 bg-white z-10">
                <th className="py-2.5 px-4">Fornecedor</th>
                <th className="py-2.5 px-4">Nº Nota</th>
                <th className="py-2.5 px-4">Emissão</th>
                <th className="py-2.5 px-4 text-center">Categoria</th>
                <th className="py-2.5 px-4 text-right">Valor (R$)</th>
                <th className="py-2.5 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {currentMonthExpenses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-400 italic">
                    Nenhuma despesa cadastrada para este mês.
                  </td>
                </tr>
              ) : (
                currentMonthExpenses.map((exp: ExpenseItem) => (
                  <tr key={exp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 font-medium text-slate-900">{exp.supplier}</td>
                    <td className="py-2.5 px-4 text-slate-600">{exp.invoiceNumber}</td>
                    <td className="py-2.5 px-4 text-slate-600">{exp.invoiceDate}</td>
                    <td className="py-2.5 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        exp.category === 'CMV'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-purple-100 text-purple-800 border border-purple-200'
                      }`}>
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-900">
                      {formatMoney(exp.amount)}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <button
                        onClick={() => handleDeleteExpense(exp.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1 rounded"
                        title="Remover Despesa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
