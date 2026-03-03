# FormPro — Formulário Completo

> Formulário multi-step com design premium, tema claro/escuro automático e suporte bilíngue PT/EN.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

## ✨ Features

- **Multi-step form** — 3 etapas com navegação fluida e progresso animado
- **Tema Claro/Escuro** — Segue a preferência do sistema (auto) ou toggle manual (auto → light → dark)
- **Bilíngue PT/EN** — Detecta idioma do navegador, com toggle manual
- **Validação em tempo real** — CPF com dígito verificador, e-mail, senhas
- **Máscaras de input** — CPF, telefone e CEP formatados automaticamente
- **Medidor de força de senha** — Feedback visual dinâmico
- **Design System** — CSS Variables com tokens para ambos os temas
- **100% acessível** — ARIA, roles, `prefers-reduced-motion`, navegação por teclado
- **Responsivo** — Mobile-first, funciona em qualquer tela
- **Zero dependências** — HTML + CSS + JS puros

## 🏗️ Arquitetura

```
├── index.html      → Estrutura semântica com data-i18n e data-theme
├── style.css       → Design System dual-theme via CSS Variables
├── script.js       → I18n engine + ThemeController + FormController
├── vercel.json     → Deploy config com security headers
└── README.md
```

## 🚀 Deploy na Vercel

```bash
git add .
git commit -m "feat: dark/light theme + bilingual PT/EN"
git push origin main
npx vercel --yes
```

## 🧑‍💻 Autor

**Gregory Pinto** — [@GregoryGSPinto](https://github.com/GregoryGSPinto)
