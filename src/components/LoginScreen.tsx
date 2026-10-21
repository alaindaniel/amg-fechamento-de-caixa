import React, { useState } from 'react';
import {
  Lock,
  Building2,
  KeyRound,
  AlertCircle,
  ShieldCheck,
  UserCheck,
  LogIn
} from 'lucide-react';
import { login } from '../services/storage';
import type { SubscriberAccount } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (account: SubscriberAccount) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('Por favor, digite seu CNPJ, Razão Social ou E-mail.');
      return;
    }

    if (!password.trim()) {
      setError('Por favor, informe sua senha.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = login(identifier, password);
      setIsLoading(false);

      if (res.success && res.account) {
        onLoginSuccess(res.account);
      } else {
        setError(res.error || 'Credenciais inválidas.');
      }
    }, 400);
  };

  const fillQuick = (idVal: string, passVal: string) => {
    setIdentifier(idVal);
    setPassword(passVal);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-xl shadow-emerald-500/20 mb-4 font-black">
            <Building2 className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Fechamento de Caixa SaaS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Plataforma Financeira Multitenant e Gestão de Assinantes
          </p>
        </div>

        {/* Card do Formulário */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-7 shadow-2xl backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                CNPJ, Razão Social ou E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <UserCheck className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder="Ex: 12.345.678/0001-90 ou Taqualito"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Senha de Acesso
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Sua senha secreta"
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start space-x-2 text-xs text-rose-400 font-semibold animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2 mt-2 disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4 stroke-[2.5]" />
                  <span>Acessar o Sistema</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Box */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-xs">
            <p className="text-slate-400 font-bold mb-2.5 text-center flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Acessos Rápidos de Demonstração:</span>
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillQuick('admin@sistema.com', 'admin')}
                className="p-2.5 bg-slate-950/80 hover:bg-slate-800 border border-purple-500/30 hover:border-purple-400 text-left rounded-xl transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-1.5 text-purple-400 font-bold text-[11px]">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Painel Admin Master</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5 truncate">Gestor de Assinantes</p>
                <span className="text-[9px] text-slate-500 block mt-1">admin / admin</span>
              </button>

              <button
                type="button"
                onClick={() => fillQuick('12.345.678/0001-90', '123')}
                className="p-2.5 bg-slate-950/80 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-400 text-left rounded-xl transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-[11px]">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Empresa Assinante</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5 truncate">Via Taqualito LTDA</p>
                <span className="text-[9px] text-slate-500 block mt-1">CNPJ / senha: 123</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-slate-500 text-[11px] mt-6">
          Sistema Seguro com Isolamento Completo de Bancos de Dados por Empresa
        </p>
      </div>
    </div>
  );
};
