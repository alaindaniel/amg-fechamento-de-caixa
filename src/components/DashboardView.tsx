import React from 'react';
import {
  TrendingUp,
  CreditCard,
  DollarSign,
  Receipt,
  PieChart as PieIcon,
  Percent
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { getAnnualSummary } from '../services/storage';

export const DashboardView: React.FC = () => {
  const data = getAnnualSummary();

  const formatMoney = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatPct = (val: number) => {
    return (val * 100).toFixed(2) + '%';
  };

  const chartData = data.monthlyReports.map(r => ({
    name: r.monthName.substring(0, 3),
    Vendas: r.totalSales,
    Despesas: r.totalExpenses,
    CMV: r.totalCmv,
    DIV: r.totalDiv
  }));

  return (
    <div className="space-y-6">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Vendas Totais */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
              Vendas Totais
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-bold text-slate-900 mt-3 tracking-tight">
            {formatMoney(data.totalSales)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Acumulado do ano 2026</p>
        </div>

        {/* Dinheiro */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
              Em Dinheiro
            </span>
            <div className="p-2 rounded-lg bg-teal-50 text-teal-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-bold text-slate-900 mt-3 tracking-tight">
            {formatMoney(data.totalCash)}
          </p>
          <p className="text-[11px] text-teal-600 font-medium mt-1">
            {formatPct(data.cashPct)} do total de vendas
          </p>
        </div>

        {/* Cartões */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
              Cartões / Vouchers
            </span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-bold text-slate-900 mt-3 tracking-tight">
            {formatMoney(data.totalCards)}
          </p>
          <p className="text-[11px] text-blue-600 font-medium mt-1">
            {formatPct(data.cardsPct)} do total de vendas
          </p>
        </div>

        {/* Total Despesas */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
              Total Despesas
            </span>
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-bold text-slate-900 mt-3 tracking-tight">
            {formatMoney(data.totalExpenses)}
          </p>
          <p className="text-[11px] text-rose-600 font-medium mt-1">
            {formatPct(data.expensesPct)} das vendas
          </p>
        </div>

        {/* CMV */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
              CMV Total
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <PieIcon className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-bold text-slate-900 mt-3 tracking-tight">
            {formatMoney(data.totalCmv)}
          </p>
          <p className="text-[11px] text-amber-600 font-semibold mt-1">
            CMV Médio: {formatPct(data.cmvPct)}
          </p>
        </div>

        {/* DIV */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
              DIV Total
            </span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-bold text-slate-900 mt-3 tracking-tight">
            {formatMoney(data.totalDiv)}
          </p>
          <p className="text-[11px] text-purple-600 font-medium mt-1">
            DIV Médio: {formatPct(data.divPct)}
          </p>
        </div>
      </div>

      {/* Chart & KPI Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Financial Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Evolução Mensal de Vendas e Custos
              </h2>
              <p className="text-xs text-slate-500">
                Comparativo de Receita Bruta, Despesas Totais e CMV por Mês
              </p>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={val => `R$${(val/1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(val: any) => [formatMoney(Number(val) || 0)]}
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', color: '#FFF', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ paddingTop: '15px', fontSize: '12px' }} />
                <Bar dataKey="Vendas" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Despesas" fill="#F43F5E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="CMV" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CMV Semester Indicators Box */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Indicadores de CMV</h2>
            <p className="text-xs text-slate-500">Métricas acumuladas idênticas à planilha ODS</p>

            <div className="mt-6 space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Média CMV 1º Semestre</div>
                <div className="text-2xl font-bold text-amber-600 mt-1">
                  {formatPct(data.avgCmvH1)}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Janeiro a Junho</div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Média CMV 2º Semestre</div>
                <div className="text-2xl font-bold text-amber-600 mt-1">
                  {formatPct(data.avgCmvH2)}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Julho a Dezembro</div>
              </div>

              <div className="p-4 bg-slate-900 text-white rounded-lg shadow-sm">
                <div className="text-xs text-slate-300 font-medium">Média Anual de CMV</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">
                  {formatPct(data.avgCmvAnnual)}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Média ponderada do exercício</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Annual Summary Table (Resumo_Anual) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Relatório Anual Consolidado — {data.company.name} ({data.company.year})
            </h2>
            <p className="text-xs text-slate-500">
              Exercício financeiro oficial de {data.company.year}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
                <th className="py-3 px-4">Mês</th>
                <th className="py-3 px-4 text-right">Venda</th>
                <th className="py-3 px-4 text-right">Dinheiro</th>
                <th className="py-3 px-4 text-right">Cartão</th>
                <th className="py-3 px-4 text-right">Despesas</th>
                <th className="py-3 px-4 text-right">DIV</th>
                <th className="py-3 px-4 text-right">CMV</th>
                <th className="py-3 px-4 text-right">CMV %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {data.monthlyReports.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-medium">{r.monthName}</td>
                  <td className="py-3 px-4 text-right font-medium text-slate-900">
                    {formatMoney(r.totalSales)}
                  </td>
                  <td className="py-3 px-4 text-right">{formatMoney(r.totalCash)}</td>
                  <td className="py-3 px-4 text-right">{formatMoney(r.totalCards)}</td>
                  <td className="py-3 px-4 text-right text-rose-600">{formatMoney(r.totalExpenses)}</td>
                  <td className="py-3 px-4 text-right text-purple-600">{formatMoney(r.totalDiv)}</td>
                  <td className="py-3 px-4 text-right text-amber-600 font-medium">{formatMoney(r.totalCmv)}</td>
                  <td className="py-3 px-4 text-right font-bold text-amber-600">
                    {r.totalSales > 0 ? formatPct(r.cmvPct) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              {/* TOTAL ROW */}
              <tr className="bg-slate-900 text-white font-bold text-xs border-t-2 border-slate-900">
                <td className="py-3.5 px-4 uppercase tracking-wider">TOTAL ANUAL</td>
                <td className="py-3.5 px-4 text-right text-emerald-400">{formatMoney(data.totalSales)}</td>
                <td className="py-3.5 px-4 text-right">{formatMoney(data.totalCash)}</td>
                <td className="py-3.5 px-4 text-right">{formatMoney(data.totalCards)}</td>
                <td className="py-3.5 px-4 text-right text-rose-300">{formatMoney(data.totalExpenses)}</td>
                <td className="py-3.5 px-4 text-right text-purple-300">{formatMoney(data.totalDiv)}</td>
                <td className="py-3.5 px-4 text-right text-amber-300">{formatMoney(data.totalCmv)}</td>
                <td className="py-3.5 px-4 text-right text-amber-400">{formatPct(data.cmvPct)}</td>
              </tr>
              {/* PERCENTAGES ROW */}
              <tr className="bg-slate-800 text-slate-200 text-xs font-semibold">
                <td className="py-2.5 px-4 text-slate-400">PARTICIPAÇÃO %</td>
                <td className="py-2.5 px-4 text-right">100,00%</td>
                <td className="py-2.5 px-4 text-right">{formatPct(data.cashPct)}</td>
                <td className="py-2.5 px-4 text-right">{formatPct(data.cardsPct)}</td>
                <td className="py-2.5 px-4 text-right text-rose-300">{formatPct(data.expensesPct)}</td>
                <td className="py-2.5 px-4 text-right text-purple-300">{formatPct(data.divPct)}</td>
                <td className="py-2.5 px-4 text-right text-amber-300">{formatPct(data.cmvPct)}</td>
                <td className="py-2.5 px-4 text-right text-slate-400">-</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
