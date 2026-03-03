# FormPro — Formulário Completo

> Formulário multi-step com design premium, validação inteligente e arquitetura de nível sênior.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

## ✨ Features

- **Multi-step form** — 3 etapas com navegação fluida e barra de progresso animada
- **Validação em tempo real** — CPF com cálculo de dígito verificador, e-mail, senhas
- **Máscaras de input** — CPF, telefone e CEP formatados automaticamente
- **Medidor de força de senha** — Feedback visual dinâmico
- **Design System completo** — CSS Variables, tokens de design, dark theme sofisticado
- **100% acessível** — ARIA labels, roles, `prefers-reduced-motion`, navegação por teclado
- **Responsivo** — Mobile-first, funciona em qualquer tela
- **Zero dependências** — HTML + CSS + JS puros
- **Pronto para Vercel** — `vercel.json` com headers de segurança

## 🏗️ Arquitetura

```
├── index.html      → Estrutura semântica com ARIA
├── style.css       → Design System com CSS Variables
├── script.js       → Módulos: Utils, Masks, Validators, PasswordStrength, FormController
├── vercel.json     → Config de deploy com security headers
└── README.md
```

### Padrões aplicados

- **BEM** para nomenclatura CSS
- **Module Pattern** para encapsulamento JS
- **Single Responsibility** — cada módulo tem uma responsabilidade
- **Validação com CPF real** — algoritmo completo de dígitos verificadores
- **Progressive Enhancement** — funciona sem JS (HTML nativo)
- **Print Styles** — estilos otimizados para impressão

## 🚀 Deploy na Vercel

1. Faça push deste código no seu repositório GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. Clique em **Deploy** — sem configuração adicional necessária

Ou via CLI:

```bash
npm i -g vercel
vercel
```

## 🧑‍💻 Autor

**Gregory Pinto** — [@GregoryGSPinto](https://github.com/GregoryGSPinto)

---

Feito com ◆ dedicação e padrões de engenharia sênior.
