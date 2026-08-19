import React, { useState, useEffect } from 'react';
import { getMonthlyReports, getCompanyInfo } from '../services/storage';
import type { MonthlyReportData } from '../types';
import { FileSpreadsheet, Printer } from 'lucide-react';

export const RelatoriosView: React.FC = () => {
  const [reports, setReports] = useState<MonthlyReportData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('06');
  const company = getCompanyInfo();

  useEffect(() => {
    setReports(getMonthlyReports());
  }, []);

  const report = reports.find(r => r.month === selectedMonth) || reports[0];

  const formatMoney = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatPct = (val: number) => {
    return (val * 100).toFixed(2) + '%';
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:space-y-4">
      {/* Month Selection & PDF Export Bar (Hidden when printing PDF) */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div className="flex items-center space-x-3">
          <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Relatório Mensal — {report?.monthName || 'Mês'} ({company.year})
            </h2>
            <p className="text-xs text-slate-500">
              Extrato financeiro consolidado de {company.name}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <label className="text-xs font-semibold text-slate-500 uppercase">
              Selecionar Mês:
            </label>
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-900 text-sm font-semibold rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {reports.map(r => (
                <option key={r.month} value={r.month}>
                  {r.monthName} ({r.totalSales > 0 ? formatMoney(r.totalSales) : 'Sem vendas'})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleExportPDF}
            className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-4 py-2 rounded-lg font-bold text-xs transition-colors shadow-md shadow-emerald-500/20"
            title="Exportar este relatório para PDF"
          >
            <Printer className="w-4 h-4" />
            <span>Gerar PDF / Imprimir</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Header (Visible only in PDF Print) */}
      <div className="hidden print:block border-b-2 border-slate-900 pb-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              {company.name}
            </h1>
            <p className="text-sm font-bold text-slate-700 mt-1">
              RELATÓRIO FINANCEIRO MENSAL — {report?.monthName?.toUpperCase()} DE {company.year}
            </p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <p>Emissão: {new Date().toLocaleDateString('pt-BR')}</p>
            <p className="font-semibold text-slate-700">Exercício: {company.year}</p>
          </div>
        </div>
      </div>

      {report && (
        <div className="space-y-6 print:space-y-4">
          {/* Executive KPI Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 print:grid-cols-4 print:gap-2">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm print:p-3 print:border-slate-300">
              <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                Total de Vendas
              </span>
              <p className="text-2xl font-extrabold text-slate-900 mt-2 print:text-lg">
                {formatMoney(report.totalSales)}
              </p>
              <div className="flex justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                <span>Dinheiro: {formatMoney(report.totalCash)}</span>
                <span>Cartões: {formatMoney(report.totalCards)}</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm print:p-3 print:border-slate-300">
              <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                Despesas Mensais
              </span>
              <p className="text-2xl font-extrabold text-rose-600 mt-2 print:text-lg">
                {formatMoney(report.totalExpenses)}
              </p>
              <div className="flex justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                <span>CMV: {formatMoney(report.totalCmv)}</span>
                <span>DIV: {formatMoney(report.totalDiv)}</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm print:p-3 print:border-slate-300">
              <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                CMV do Mês (%)
              </span>
              <p className="text-2xl font-extrabold text-amber-600 mt-2 print:text-lg">
                {report.totalSales > 0 ? formatPct(report.cmvPct) : '0,00%'}
              </p>
              <p className="text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                Participação de mercadoria
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm print:p-3 print:border-slate-300">
              <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                Expectativa Vendas
              </span>
              <p className="text-2xl font-extrabold text-teal-600 mt-2 print:text-lg">
                {formatMoney(report.salesExpectation)}
              </p>
              <p className="text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                Média diária: {formatMoney(report.dailyAverage)}
              </p>
            </div>
          </div>

          {/* Breakdown by Payment Method & Financial Indicators */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:grid-cols-3 print:gap-4">
            {/* Payment Method Table (2 cols) */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4 print:p-4 print:col-span-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Distribuição por Forma de Pagamento
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {report.payments.filter(p => p.amount > 0).length} modalidades ativas
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <th className="py-2.5 px-4">Forma de Pagamento</th>
                      <th className="py-2.5 px-4 text-right">Valor Arrecadado (R$)</th>
                      <th className="py-2.5 px-4 text-right">Participação %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {report.payments.map((p, idx) => (
                      <tr
                        key={idx}
                        className={`hover:bg-slate-50 transition-colors ${
                          p.amount > 0 ? 'font-semibold text-slate-900 bg-slate-50/50' : 'text-slate-400'
                        }`}
                      >
                        <td className="py-2 px-4">{p.method}</td>
                        <td className="py-2 px-4 text-right">{formatMoney(p.amount)}</td>
                        <td className="py-2 px-4 text-right font-medium">
                          {p.amount > 0 ? formatPct(p.percentage) : '0,00%'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-900 text-white font-bold border-t border-slate-900 print:bg-slate-800">
                      <td className="py-3 px-4">TOTAL VENDAS</td>
                      <td className="py-3 px-4 text-right text-emerald-400 print:text-emerald-300">
                        {formatMoney(report.totalSales)}
                      </td>
                      <td className="py-3 px-4 text-right">100,00%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Financial Summary & Indicators Side Card (1 col) */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5 flex flex-col justify-between print:p-4 print:col-span-1">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-4 border-b border-slate-200 pb-3">
                  Resumo Financeiro do Mês
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-600 font-medium">Entrada Total</span>
                    <span className="font-bold text-slate-900">{formatMoney(report.totalSales)}</span>
                  </div>

                  <div className="flex justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-slate-600 font-medium">Redução Z (Fiscal)</span>
                    <span className="font-bold text-slate-900">{formatMoney(report.totalSales)}</span>
                  </div>

                  <div className="flex justify-between p-3 bg-blue-50 rounded-lg text-blue-900 font-semibold border border-blue-200">
                    <span>Total Cartões</span>
                    <span>{formatMoney(report.totalCards)}</span>
                  </div>

                  <div className="flex justify-between p-3 bg-amber-50 rounded-lg text-amber-900 font-semibold border border-amber-200">
                    <span>CMV (Mercadorias)</span>
                    <span>{formatMoney(report.totalCmv)}</span>
                  </div>

                  <div className="flex justify-between p-3 bg-purple-50 rounded-lg text-purple-900 font-semibold border border-purple-200">
                    <span>DIV (Despesas Diversas)</span>
                    <span>{formatMoney(report.totalDiv)}</span>
                  </div>

                  <div className="flex justify-between p-3 bg-rose-50 rounded-lg text-rose-900 font-bold border border-rose-200">
                    <span>Total Despesas (CMV + DIV)</span>
                    <span>{formatMoney(report.totalExpenses)}</span>
                  </div>

                  <div className="p-4 bg-slate-900 text-white rounded-lg border border-slate-800 shadow-sm mt-4 print:bg-slate-800">
                    <span className="text-[11px] text-slate-400 block uppercase font-medium">
                      Saldo Final do Mês
                    </span>
                    <span className="text-xl font-extrabold text-emerald-400 mt-1 block">
                      {formatMoney(report.finalBalance)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PDF Signature Footer (Visible only in PDF print) */}
          <div className="hidden print:flex justify-between items-end pt-12 mt-8 border-t border-slate-300 text-xs text-slate-600">
            <div className="text-center w-64 border-t border-slate-400 pt-2">
              <p className="font-bold text-slate-900">{company.name}</p>
              <p className="text-[10px] text-slate-500">Assinatura do Responsável Financeiro</p>
            </div>
            <div className="text-center w-64 border-t border-slate-400 pt-2">
              <p className="font-bold text-slate-900">Conferência / Auditoria</p>
              <p className="text-[10px] text-slate-500">Data e Carimbo</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
