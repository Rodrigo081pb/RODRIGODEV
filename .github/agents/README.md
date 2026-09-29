# ?? Agentes Customizados

Este diretório contém agentes especializados do GitHub Copilot para o projeto.

## ?? Flora — Senior Angular UI/UX Developer

**Arquivo**: [flora.agent.md](./flora.agent.md)

### O que ela faz
Flora é uma desenvolvedora frontend sênior especializada em criar componentes Angular com design excepcional. Ela não entrega código genérico — cada componente tem identidade visual, é acessível, performático e parece ter sido criado por uma equipe de produto de nível Stripe ou Linear.

### Quando usar
- ? Criar novos componentes Angular
- ? Refatorar componentes existentes com melhor UX
- ? Implementar animações e interações
- ? Configurar design systems e design tokens
- ? Resolver problemas de acessibilidade
- ? Otimizar performance de componentes
- ? Implementar dark/light mode
- ? Criar layouts responsivos

### Como invocar

**Método 1 — Menção direta**
```
@flora crie um card de projeto com efeito glassmorphism
```

**Método 2 — Template estruturado (recomendado)**
```
@flora
TASK: navbar responsivo com menu mobile animado
CONTEXTO: portfolio pessoal, público tech
VERSÃO ANGULAR: 17+ standalone
REFERÊNCIA VISUAL: dark mode, estilo Linear.app, minimal
```

**Método 3 — Como subagente**
Outros agentes podem invocar a Flora automaticamente quando precisarem de expertise em UI/UX Angular.

### O que esperar
Flora sempre entrega:
- Código TypeScript em strict mode
- Templates HTML semânticos
- CSS com design tokens
- Estados completos (loading, error, empty, success)
- Acessibilidade (ARIA, keyboard navigation)
- Mobile-first responsive
- Dark/light mode quando aplicável

### Restrições
Flora nunca irá:
- Usar `any` sem justificativa
- Manipular DOM diretamente (usa Renderer2/CDK)
- Deixar subscriptions sem cleanup
- Copiar código genérico de bibliotecas
- Usar `!important` sem motivo claro
- Entregar componentes sem todos os estados visuais

---

## ?? Próximas customizações recomendadas

### 1. **Agente de Testes** (test-specialist.agent.md)
Especialista em escrever testes unitários e E2E para componentes Angular
- Jasmine/Karma
- Jest + Testing Library
- Cypress/Playwright

### 2. **Agente de Performance** (perf-auditor.agent.md)
Analisa bundle size, detecta memory leaks, otimiza change detection
- Lighthouse CI
- Bundle analyzer
- Performance profiling

### 3. **Agente de Acessibilidade** (a11y-auditor.agent.md)
Foco exclusivo em WCAG AA/AAA compliance
- Screen reader testing
- Keyboard navigation
- Color contrast
- ARIA best practices

### 4. **Instructions para Angular** (.github/instructions/angular.instructions.md)
Regras always-on para todo código Angular do projeto
- Naming conventions
- Folder structure
- Import order
- Commit patterns

---

## ?? Como criar novos agentes

1. Crie `nome-do-agente.agent.md` nesta pasta
2. Use o frontmatter YAML com `description` rico em palavras-chave
3. Defina `tools` mínimos necessários
4. Siga o template: Identidade ? Restrições ? Abordagem ? Output
5. Teste com `@nome-do-agente <sua task>`

Consulte a [documentação oficial](https://code.visualstudio.com/docs/copilot/customization/custom-agents) para mais detalhes.
