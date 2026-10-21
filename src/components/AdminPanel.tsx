import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Search,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Building2,
  Trash2,
  Edit,
  Save,
  X,
  Clock,
  ArrowRight,
  ShieldAlert,
  KeyRound
} from 'lucide-react';
import {
  getAllSubscribers,
  createSubscriber,
  updateSubscriber,
  deleteSubscriber
} from '../services/storage';
import { ChangePasswordModal } from './ChangePasswordModal';
import type { SubscriberAccount, SubscriptionStatus } from '../types';

interface AdminPanelProps {
  onSwitchToTenant: (account: SubscriberAccount) => void;
  currentUser: SubscriberAccount;
  onUserUpdated: (account: SubscriberAccount) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onSwitchToTenant,
  currentUser,
  onUserUpdated
}) => {
  const [subscribers, setSubscribers] = useState<SubscriberAccount[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isChangeAdminPasswordOpen, setIsChangeAdminPasswordOpen] = useState<boolean>(false);

  // Form State
  const [companyName, setCompanyName] = useState<string>('');
  const [cnpj, setCnpj] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [planName, setPlanName] = useState<string>('Plano Pro Mensal');
  const [monthlyFee, setMonthlyFee] = useState<string>('149.90');
  const [status, setStatus] = useState<SubscriptionStatus>('ACTIVE');
  const [expiresAt, setExpiresAt] = useState<string>('2026-12-31');
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = () => {
    setSubscribers(getAllSubscribers());
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setCompanyName('');
    setCnpj('');
    setEmail('');
    setPassword('123456');
    setPhone('');
    setPlanName('Plano Pro Mensal');
    setMonthlyFee('149.90');
    setStatus('ACTIVE');
    setExpiresAt(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10));
    setNotes('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (sub: SubscriberAccount) => {
    setEditingId(sub.id);
    setCompanyName(sub.companyName);
    setCnpj(sub.cnpj);
    setEmail(sub.email);
    setPassword(sub.password);
    setPhone(sub.phone || '');
    setPlanName(sub.planName);
    setMonthlyFee(sub.monthlyFee.toString());
    setStatus(sub.status);
    setExpiresAt(sub.expiresAt);
    setNotes(sub.notes || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !cnpj.trim() || !password.trim()) {
      alert('Preencha os campos obrigatórios (Razão Social/Empresa, CNPJ e Senha).');
      return;
    }

    const feeNum = parseFloat(monthlyFee) || 0;

    if (editingId) {
      updateSubscriber(editingId, {
        companyName: companyName.trim(),
        cnpj: cnpj.trim(),
        email: email.trim(),
        password: password.trim(),
        phone: phone.trim(),
        planName,
        monthlyFee: feeNum,
        status,
        expiresAt,
        notes
      });
    } else {
      createSubscriber({
        companyName: companyName.trim(),
        cnpj: cnpj.trim(),
        email: email.trim() || `${cnpj.replace(/\D/g, '')}@cliente.com`,
        password: password.trim(),
        role: 'SUBSCRIBER',
        phone: phone.trim(),
        planName,
        monthlyFee: feeNum,
        status,
        expiresAt,
        notes
      });
    }

    setIsModalOpen(false);
    loadSubscribers();
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja excluir o assinante "${name}"? Todos os lançamentos financeiros vinculados serão apagados permanentemente.`)) {
      const updated = deleteSubscriber(id);
      setSubscribers(updated);
    }
  };

  const handleToggleStatus = (sub: SubscriberAccount) => {
    const nextStatus: SubscriptionStatus = sub.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
    const updated = updateSubscriber(sub.id, { status: nextStatus });
    setSubscribers(updated);
  };

  // Métricas do SaaS
  const customerSubscribers = subscribers.filter(s => s.role !== 'ADMIN');
  const activeSubs = customerSubscribers.filter(s => s.status === 'ACTIVE');
  const mrr = activeSubs.reduce((acc, s) => acc + s.monthlyFee, 0);

  // Filtragem
  const filtered = customerSubscribers.filter(s => {
    const matchesSearch =
      s.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.cnpj.includes(searchTerm) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatMoney = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Métricas MRR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-900 to-indigo-950 p-6 rounded-2xl border border-purple-800 text-white shadow-xl">
          <div className="flex items-center justify-between text-purple-300">
            <span className="text-xs font-bold uppercase tracking-wider">Faturamento Mensal (MRR)</span>
            <DollarSign className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-2xl font-black mt-2 text-white">{formatMoney(mrr)}</p>
          <p className="text-[11px] text-purple-300 mt-1">Recorrência mensal ativa</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Assinantes Ativos</span>
            <Users className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-2xl font-black mt-2 text-slate-900">{activeSubs.length}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Clientes adimplentes</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total de Empresas</span>
            <Building2 className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-black mt-2 text-slate-900">{customerSubscribers.length}</p>
          <p className="text-[11px] text-slate-500 mt-1">Cadastradas no sistema</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center space-y-2">
          <button
            onClick={handleOpenCreate}
            className="w-full py-2.5 px-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 stroke-[2.5]" />
            <span>Novo Assinante</span>
          </button>

          <button
            onClick={() => setIsChangeAdminPasswordOpen(true)}
            className="w-full py-2.5 px-3 bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
            title="Alterar a senha do Administrador Master"
          >
            <KeyRound className="w-4 h-4 text-purple-700" />
            <span>Alterar Senha Admin</span>
          </button>
        </div>
      </div>

      {/* Caixa de Segurança do Admin Master */}
      <div className="bg-gradient-to-r from-slate-900 to-purple-950 p-4 rounded-xl border border-purple-800/60 text-white flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2.5">
          <ShieldAlert className="w-5 h-5 text-purple-400 shrink-0" />
          <div>
            <span className="font-bold text-purple-200">Segurança da Conta Master:</span>
            <p className="text-slate-400 text-[11px]">
              O seu login de administrador é <span className="text-white font-mono font-bold">{currentUser.email}</span>. Altere sua senha para que apenas você tenha acesso a esta área.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsChangeAdminPasswordOpen(true)}
          className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer shadow-sm shrink-0"
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Trocar Senha Master</span>
        </button>
      </div>

      {/* Tabela de Assinantes e Controles */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Filtros e Busca */}
        <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3 flex-1 min-w-[260px]">
            <div className="relative w-full max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por Razão Social, CNPJ ou E-mail..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none"
            >
              <option value="ALL">Todos os Status</option>
              <option value="ACTIVE">Ativos</option>
              <option value="TRIAL">Trial / Teste</option>
              <option value="EXPIRED">Expirados</option>
              <option value="BLOCKED">Bloqueados</option>
            </select>
          </div>

          <div className="text-xs text-slate-500 font-semibold">
            Mostrando {filtered.length} de {customerSubscribers.length} assinantes
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Empresa / Razão Social</th>
                <th className="py-3.5 px-4">CNPJ & Login</th>
                <th className="py-3.5 px-4">Senha</th>
                <th className="py-3.5 px-4">Plano & Valor</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Vencimento</th>
                <th className="py-3.5 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-medium">
                    Nenhum assinante encontrado para o filtro selecionado.
                  </td>
                </tr>
              ) : (
                filtered.map(sub => (
                  <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">{sub.companyName}</div>
                      <div className="text-[11px] text-slate-500 flex items-center space-x-1.5 mt-0.5">
                        <span>{sub.email}</span>
                        {sub.phone && <span>• {sub.phone}</span>}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">
                      {sub.cnpj}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-purple-700 bg-purple-50/50 px-2 py-1 rounded inline-block font-bold">
                      {sub.password}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{formatMoney(sub.monthlyFee)}/mês</div>
                      <div className="text-[10px] text-slate-500">{sub.planName}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleStatus(sub)}
                        title="Clique para alternar status"
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                          sub.status === 'ACTIVE'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : sub.status === 'TRIAL'
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            : sub.status === 'EXPIRED'
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                        }`}
                      >
                        {sub.status === 'ACTIVE' && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                        {sub.status === 'BLOCKED' && <XCircle className="w-3 h-3 text-rose-600" />}
                        {sub.status === 'EXPIRED' && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                        {sub.status === 'TRIAL' && <Clock className="w-3 h-3 text-blue-600" />}
                        <span>{sub.status}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {sub.expiresAt}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        {/* Botão de Entrar como o Cliente */}
                        <button
                          onClick={() => onSwitchToTenant(sub)}
                          className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg font-bold text-[11px] flex items-center space-x-1 transition-colors cursor-pointer"
                          title="Acessar o fechamento de caixa desta empresa"
                        >
                          <span>Acessar</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>

                        <button
                          onClick={() => handleOpenEdit(sub)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Editar cadastro"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(sub.id, sub.companyName)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Excluir assinante"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Criação / Edição de Assinante */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden animate-scale-in">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold tracking-tight">
                    {editingId ? 'Editar Assinante' : 'Cadastrar Novo Assinante'}
                  </h2>
                  <p className="text-[11px] text-slate-400">Defina os dados de login e mensalidade</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Razão Social / Nome da Empresa *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="Ex: Padaria Central LTDA"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    CNPJ (Login Principal) *
                  </label>
                  <input
                    type="text"
                    required
                    value={cnpj}
                    onChange={e => setCnpj(e.target.value)}
                    placeholder="00.000.000/0001-00"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Senha de Acesso *
                  </label>
                  <input
                    type="text"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Ex: 123456"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    E-mail do Cliente
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="contato@empresa.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    WhatsApp / Telefone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Plano Contratado
                  </label>
                  <select
                    value={planName}
                    onChange={e => setPlanName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  >
                    <option value="Plano Básico Mensal">Plano Básico Mensal</option>
                    <option value="Plano Pro Mensal">Plano Pro Mensal</option>
                    <option value="Plano Premium Anual">Plano Premium Anual</option>
                    <option value="Período de Demonstração (Trial)">Período de Demonstração (Trial)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mensalidade (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={monthlyFee}
                    onChange={e => setMonthlyFee(e.target.value)}
                    placeholder="149.90"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Status do Acesso
                  </label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as SubscriptionStatus)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-bold focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  >
                    <option value="ACTIVE">ATIVO (Liberado)</option>
                    <option value="TRIAL">TRIAL (Em Teste)</option>
                    <option value="EXPIRED">EXPIRADO (Vencido)</option>
                    <option value="BLOCKED">BLOQUEADO (Suspenso)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Data de Vencimento
                  </label>
                  <input
                    type="date"
                    value={expiresAt}
                    onChange={e => setExpiresAt(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-1.5 px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md shadow-purple-600/20 transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingId ? 'Salvar Assinante' : 'Cadastrar Assinante'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Alteração de Senha do Admin Master */}
      <ChangePasswordModal
        isOpen={isChangeAdminPasswordOpen}
        onClose={() => setIsChangeAdminPasswordOpen(false)}
        currentUser={currentUser}
        onPasswordChanged={onUserUpdated}
      />
    </div>
  );
};
