import React, { useState } from 'react';
import { KeyRound, X, Save, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { updateSubscriber } from '../services/storage';
import type { SubscriberAccount } from '../types';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: SubscriberAccount;
  onPasswordChanged: (updatedAccount: SubscriberAccount) => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onPasswordChanged
}) => {
  const [currentPasswordInput, setCurrentPasswordInput] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showCurrent, setShowCurrent] = useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Valida senha atual
    if (currentPasswordInput.trim() !== currentUser.password) {
      setError('A senha atual informada está incorreta.');
      return;
    }

    // Valida nova senha
    if (!newPassword.trim()) {
      setError('Por favor, informe a nova senha.');
      return;
    }

    if (newPassword.trim().length < 4) {
      setError('A nova senha deve ter no mínimo 4 caracteres.');
      return;
    }

    if (newPassword.trim() !== confirmPassword.trim()) {
      setError('A confirmação não coincide com a nova senha.');
      return;
    }

    // Salva nova senha
    const updatedAccounts = updateSubscriber(currentUser.id, {
      password: newPassword.trim()
    });

    const updated = updatedAccounts.find(a => a.id === currentUser.id) || {
      ...currentUser,
      password: newPassword.trim()
    };

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onPasswordChanged(updated);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight">Alterar Senha de Acesso</h2>
              <p className="text-[11px] text-slate-400">
                Conta: <span className="text-emerald-400 font-semibold">{currentUser.companyName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Senha Atual */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Senha Atual *
            </label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                required
                value={currentPasswordInput}
                onChange={e => setCurrentPasswordInput(e.target.value)}
                placeholder="Digite sua senha atual"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Nova Senha */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nova Senha *
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Digite a nova senha desejada"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Mínimo de 4 caracteres. Use uma senha forte e segura.
            </p>
          </div>

          {/* Confirmar Nova Senha */}
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Confirmar Nova Senha *
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Digite a nova senha novamente"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center space-x-2 text-rose-700 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center space-x-2 text-emerald-800 font-bold">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Senha alterada com sucesso!</span>
            </div>
          )}

          {/* Actions */}
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
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold shadow-md shadow-emerald-500/20 transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Nova Senha</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
