import React, { useState } from 'react';
import {
  AlertTriangle,
  Trash2,
  Edit,
  Save,
  X,
  ShieldAlert
} from 'lucide-react';
import type { ExpenseItem } from '../types';

interface EditOrDeleteExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'EDIT' | 'DELETE';
  expense: ExpenseItem | null;
  onConfirmDelete: (id: string, justification: string) => void;
  onConfirmEdit: (id: string, updates: Partial<ExpenseItem>, justification: string) => void;
}

export const EditOrDeleteExpenseModal: React.FC<EditOrDeleteExpenseModalProps> = ({
  isOpen,
  onClose,
  mode,
  expense,
  onConfirmDelete,
  onConfirmEdit
}) => {
  const [justification, setJustification] = useState<string>('');
  const [confirmStep, setConfirmStep] = useState<boolean>(false);
  const [confirmPhrase, setConfirmPhrase] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Edit fields
  const [supplier, setSupplier] = useState<string>('');
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [invoiceDate, setInvoiceDate] = useState<string>('');
  const [category, setCategory] = useState<'CMV' | 'DIV'>('CMV');
  const [amount, setAmount] = useState<string>('');

  React.useEffect(() => {
    if (expense) {
      setSupplier(expense.supplier);
      setInvoiceNumber(expense.invoiceNumber);
      setInvoiceDate(expense.invoiceDate);
      setCategory(expense.category);
      setAmount(expense.amount.toString());
      setJustification('');
      setConfirmStep(false);
      setConfirmPhrase('');
      setError('');
    }
  }, [expense, mode, isOpen]);

  if (!isOpen || !expense) return null;

  const expectedPhrase = mode === 'DELETE' ? 'EXCLUIR' : 'CONFIRMAR';

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!justification.trim() || justification.trim().length < 8) {
      setError('A justificativa é obrigatória e deve ter pelo menos 8 caracteres para auditoria antifraude.');
      return;
    }

    if (mode === 'EDIT') {
      const numAmount = parseFloat(amount);
      if (!supplier.trim() || isNaN(numAmount) || numAmount <= 0) {
        setError('Preencha um fornecedor válido e valor maior que zero.');
        return;
      }
    }

    // Avança para o 2º passo (Dupla Confirmação)
    setConfirmStep(true);
  };

  const handleFinalConfirm = () => {
    if (confirmPhrase.trim().toUpperCase() !== expectedPhrase) {
      setError(`Digite exatamente "${expectedPhrase}" para validar a dupla confirmação.`);
      return;
    }

    if (mode === 'DELETE') {
      onConfirmDelete(expense.id, justification.trim());
    } else {
      onConfirmEdit(
        expense.id,
        {
          supplier: supplier.trim(),
          invoiceNumber: invoiceNumber.trim(),
          invoiceDate: invoiceDate.trim(),
          category,
          amount: parseFloat(amount)
        },
        justification.trim()
      );
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in">
        {/* Header */}
        <div className={`p-5 text-white flex items-center justify-between ${
          mode === 'DELETE' ? 'bg-rose-950 border-b border-rose-900' : 'bg-slate-900 border-b border-slate-800'
        }`}>
          <div className="flex items-center space-x-2.5">
            <div className={`p-2 rounded-lg ${
              mode === 'DELETE' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
            }`}>
              {mode === 'DELETE' ? <Trash2 className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight">
                {mode === 'DELETE' ? 'Exclusão com Dupla Confirmação' : 'Alteração de Lançamento Financeiro'}
              </h2>
              <p className="text-[11px] text-slate-400">
                Auditoria Antifraude: esta operação será gravada no log permanente
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Informações da Despesa Atual */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs">
          <div className="flex items-center justify-between text-slate-700">
            <span className="font-bold">Lançamento Selecionado:</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              expense.category === 'CMV' ? 'bg-amber-100 text-amber-800' : 'bg-purple-100 text-purple-800'
            }`}>
              {expense.category}
            </span>
          </div>
          <p className="text-slate-900 font-extrabold text-sm mt-1">
            {expense.supplier} — R$ {expense.amount.toFixed(2)}
          </p>
          <p className="text-[11px] text-slate-500">
            NF: {expense.invoiceNumber || 'S/N'} • Emissão: {expense.invoiceDate || 'N/D'}
          </p>
        </div>

        {/* Passo 1: Edição e Justificativa */}
        {!confirmStep ? (
          <form onSubmit={handleNextStep} className="p-6 space-y-4 text-xs">
            {mode === 'EDIT' && (
              <div className="space-y-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Fornecedor / Favorecido *
                  </label>
                  <input
                    type="text"
                    required
                    value={supplier}
                    onChange={e => setSupplier(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Nº Nota Fiscal
                    </label>
                    <input
                      type="text"
                      value={invoiceNumber}
                      onChange={e => setInvoiceNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Data Emissão
                    </label>
                    <input
                      type="text"
                      value={invoiceDate}
                      onChange={e => setInvoiceDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Classificação
                    </label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value as 'CMV' | 'DIV')}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    >
                      <option value="CMV">CMV (Mercadoria)</option>
                      <option value="DIV">DIV (Despesa Geral)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Novo Valor (R$) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold text-base focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Campo de Justificativa Obrigatório */}
            <div className="pt-2">
              <label className="block font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Justificativa Obrigatória da Auditoria *</span>
              </label>
              <textarea
                required
                rows={3}
                value={justification}
                onChange={e => setJustification(e.target.value)}
                placeholder="Explique detalhadamente o motivo desta alteração/remoção (ex: 'Nota cancelada pelo fornecedor', 'Digitação errada do valor na NF', etc.)"
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Esta justificativa ficará vinculada ao seu usuário, data e hora no histórico de auditoria.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 font-bold flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`flex items-center space-x-1.5 px-5 py-2 rounded-lg font-bold text-white transition-all cursor-pointer shadow-md ${
                  mode === 'DELETE'
                    ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                    : 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                }`}
              >
                <span>Avançar para Confirmação</span>
              </button>
            </div>
          </form>
        ) : (
          /* Passo 2: Dupla Confirmação com Frase de Segurança */
          <div className="p-6 space-y-4 text-xs">
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-900 space-y-2">
              <div className="flex items-center space-x-2 font-black text-amber-800 text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>DUPLA CONFIRMAÇÃO DE SEGURANÇA</span>
              </div>
              <p className="text-xs text-amber-900 font-medium leading-relaxed">
                Você está prestes a {mode === 'DELETE' ? 'EXCLUIR PERMANENTEMENTE' : 'ALTERAR OS VALORES DE'} este lançamento contábil.
                O registro será gravado com carimbo de data, hora e assinatura do usuário logado.
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Para confirmar, digite a palavra <span className="text-rose-600 font-black font-mono">"{expectedPhrase}"</span> abaixo:
              </label>
              <input
                type="text"
                autoFocus
                value={confirmPhrase}
                onChange={e => setConfirmPhrase(e.target.value)}
                placeholder={`Digite ${expectedPhrase}`}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold text-sm tracking-wider uppercase focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 font-bold flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setConfirmStep(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
              >
                Voltar
              </button>

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleFinalConfirm}
                  className={`flex items-center space-x-1.5 px-6 py-2 rounded-lg font-black text-white transition-all cursor-pointer shadow-md ${
                    mode === 'DELETE'
                      ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                      : 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  <span>{mode === 'DELETE' ? 'Sim, Excluir Lançamento' : 'Sim, Salvar Alteração'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
