# Sistema de Fechamento de Caixa 2026 (SaaS)

Sistema web completo desenvolvido a partir da engenharia reversa da planilha de fechamento de caixa (`PLANILHA DE FECHAMENTO 2026.ods`), preparado para comercialização no modelo SaaS com personalização por cliente (White-Label).

## 🚀 Repositório & Deploy
- **Repositório GitHub:** [https://github.com/alaindaniel/amg-fechamento-de-caixa](https://github.com/alaindaniel/amg-fechamento-de-caixa)
- **Deploy GitHub Pages:** [https://alaindaniel.github.io/amg-fechamento-de-caixa/](https://alaindaniel.github.io/amg-fechamento-de-caixa/)

## 🛠️ Tecnologias Utilizadas
- **React 19** + **TypeScript**
- **Vite** (com suporte a base relativa para GitHub Pages)
- **Tailwind CSS v4**
- **Lucide React** (Ícones modernos)
- **Recharts** (Gráficos financeiros)
- **GitHub Actions** (CI/CD para deploy automático)

## 📌 Funcionalidades Principais
1. **Dashboard Anual:**
   - Cards executivos: Vendas Totais, Dinheiro, Cartões/Vouchers, Despesas, CMV (%) e DIV (%).
   - Gráfico de barras com histórico mensal de faturamento e despesas.
   - Tabela anual consolidada idêntica ao Resumo Anual da planilha.
2. **Fechamento de Caixa Diário:**
   - Lançamento por forma de pagamento (37 formas mapeadas).
   - Discriminação de compras e despesas por fornecedor com classificação instantânea em CMV ou DIV.
   - Cálculo automático de Redução Z, Diferença de Caixa e Saldo Final Previsto.
3. **Relatórios Mensais:**
   - Extrato mês a mês com porcentagem de participação por meio de pagamento.
   - Geração de relatório pronto para impressão / exportação em PDF (A4 formatado).
4. **Customização da Empresa (SaaS):**
   - Modal para personalizar o nome da empresa, ano de exercício e saldo inicial.
5. **Painel de Auditoria & Integridade ODS:**
   - Conferência matemática comprovando 100% de precisão em relação à planilha original.

## 💻 Como Rodar Localmente
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento local
npm run dev

# Compilar para produção
npm run build

# Publicar no GitHub Pages
npm run deploy
```
