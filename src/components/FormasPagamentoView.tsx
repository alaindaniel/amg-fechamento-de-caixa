import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, Check, X } from 'lucide-react';
import { getPaymentMethods, addPaymentMethod, togglePaymentMethod } from '../services/storage';
import type { PaymentMethod } from '../types';

export const FormasPagamentoView: React.FC = () => {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [newName, setNewName] = useState<string>('');
  const [newType, setNewType] = useState<PaymentMethod['type']>('CARD');
  const [filterType, setFilterType] = useState<string>('ALL');

  useEffect(() => {
    setMethods(getPaymentMethods());
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const updated = addPaymentMethod(newName.trim(), newType);
    setMethods(updated);
    setNewName('');
  };

  const handleToggle = (id: string) => {
    const updated = togglePaymentMethod(id);
    setMethods(updated);
  };

  const filteredMethods = methods.filter(m => {
    if (filterType === 'ALL') return true;
    return m.type === filterType;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Formas de Pagamento Cadastradas ({methods.length})
          </h2>
          <p className="text-xs text-slate-500">
            Lista completa extraída da aba Cartoes da planilha original. Ative ou adicione novas modalidades.
          </p>
        </div>

        <div className="flex space-x-2">
          {['ALL', 'CASH', 'CARD', 'VOUCHER', 'PIX'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterType === t
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t === 'ALL' ? 'Todas' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Add New Method Form */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Cadastrar Nova Forma de Pagamento</h3>
        <form onSubmit={handleAdd} className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Nome da Bandeira / Modalidade..."
            value={newName}
            onChange={e => setNewName(e.target.value)}
            className="flex-1 min-w-[200px] px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
          <select
            value={newType}
            onChange={e => setNewType(e.target.value as PaymentMethod['type'])}
            className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="CARD">Cartão de Crédito/Débito</option>
            <option value="VOUCHER">Voucher / Vale Refeição</option>
            <option value="PIX">Pix / Transferência</option>
            <option value="CASH">Dinheiro / Espécie</option>
            <option value="OTHER">Outros</option>
          </select>
          <button
            type="submit"
            className="flex items-center space-x-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar</span>
          </button>
        </form>
      </div>

      {/* Methods Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMethods.map(m => (
          <div
            key={m.id}
            className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
              m.active
                ? 'bg-white border-slate-200 shadow-xs'
                : 'bg-slate-50 border-slate-200 opacity-60'
            }`}
          >
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className={`p-2 rounded-lg shrink-0 ${
                m.type === 'CASH'
                  ? 'bg-emerald-100 text-emerald-700'
                  : m.type === 'PIX'
                  ? 'bg-teal-100 text-teal-700'
                  : m.type === 'VOUCHER'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                <CreditCard className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-900 truncate">{m.name}</p>
                <span className="text-[10px] text-slate-500 font-medium">{m.type}</span>
              </div>
            </div>

            <button
              onClick={() => handleToggle(m.id)}
              className={`p-1.5 rounded-lg border text-xs font-bold transition-colors ${
                m.active
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300'
              }`}
              title={m.active ? 'Ativo - Clique para desativar' : 'Inativo - Clique para ativar'}
            >
              {m.active ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
