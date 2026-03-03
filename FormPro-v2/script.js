/**
 * ============================================
 * FormPro — Senior Architect JavaScript
 * i18n (PT/EN) + Theme (Auto/Dark/Light)
 * Modular, Testable, Accessible
 * ============================================
 */

'use strict';

/* -----------------------------------------------
   1. UTILITIES
   ----------------------------------------------- */

const Utils = {
  $(sel, ctx = document) { return ctx.querySelector(sel); },
  $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; },
  mask(value, pattern) {
    let i = 0;
    const clean = value.replace(/\D/g, '');
    return pattern.replace(/#/g, () => clean[i++] || '');
  },
  debounce(fn, delay = 300) {
    let t;
    return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), delay); };
  },
  announce(msg) {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  }
};


/* -----------------------------------------------
   2. i18n — BILINGUAL ENGINE
   ----------------------------------------------- */

const I18n = {
  current: 'pt',

  translations: {
    pt: {
      subtitle: 'Cadastro inteligente em 3 etapas',
      step_personal: 'Pessoal',
      step_contact: 'Contato',
      step_security: 'Segurança',
      legend_personal: 'Dados Pessoais',
      desc_personal: 'Precisamos de algumas informações básicas para criar sua conta.',
      legend_contact: 'Informações de Contato',
      desc_contact: 'Como podemos entrar em contato com você?',
      legend_security: 'Segurança da Conta',
      desc_security: 'Crie uma senha forte para proteger sua conta.',
      label_firstName: 'Nome',
      label_lastName: 'Sobrenome',
      label_birthDate: 'Data de Nascimento',
      label_cpf: 'CPF',
      label_gender: 'Gênero',
      gender_male: 'Masculino',
      gender_female: 'Feminino',
      gender_other: 'Outro',
      gender_prefer_not: 'Prefiro não dizer',
      label_email: 'E-mail',
      label_phone: 'Telefone',
      label_cep: 'CEP',
      label_address: 'Endereço',
      label_state: 'Estado',
      select_default: 'Selecione',
      label_password: 'Senha',
      label_confirmPassword: 'Confirmar Senha',
      label_terms: 'Li e aceito os',
      link_terms: 'Termos de Uso',
      label_and: 'e a',
      link_privacy: 'Política de Privacidade',
      label_newsletter: 'Desejo receber novidades e promoções por e-mail',
      btn_prev: 'Voltar',
      btn_next: 'Próximo',
      btn_submit: 'Criar Conta',
      btn_reset: 'Novo Cadastro',
      success_title: 'Cadastro Realizado!',
      success_text: 'Sua conta foi criada com sucesso. Verifique seu e-mail para ativar.',
      footer_made: 'Feito com',
      footer_by: 'por',
      // Placeholders
      ph_firstName: 'Ex: Gregory',
      ph_lastName: 'Ex: Pinto',
      ph_email: 'gregory@email.com',
      ph_cep: '00000-000',
      ph_address: 'Rua, número, complemento',
      ph_password: 'Mínimo 8 caracteres',
      ph_confirmPassword: 'Repita a senha',
      // Validation
      v_required: '{field} é obrigatório.',
      v_minLength: '{field} deve ter pelo menos {min} caracteres.',
      v_email: 'Insira um e-mail válido.',
      v_cpf_length: 'CPF deve ter 11 dígitos.',
      v_cpf_invalid: 'CPF inválido.',
      v_phone: 'Telefone deve ter 10 ou 11 dígitos.',
      v_date_required: 'Selecione uma data válida.',
      v_date_invalid: 'Data inválida.',
      v_date_future: 'A data deve ser no passado.',
      v_date_min_age: 'Idade mínima: 10 anos.',
      v_password_min: 'Mínimo de 8 caracteres.',
      v_password_match: 'As senhas não coincidem.',
      v_terms: 'Você deve aceitar os termos.',
      // Strength
      str_weak: 'Fraca',
      str_fair: 'Razoável',
      str_good: 'Boa',
      str_strong: 'Forte',
    },

    en: {
      subtitle: 'Smart registration in 3 steps',
      step_personal: 'Personal',
      step_contact: 'Contact',
      step_security: 'Security',
      legend_personal: 'Personal Data',
      desc_personal: 'We need some basic information to create your account.',
      legend_contact: 'Contact Information',
      desc_contact: 'How can we reach you?',
      legend_security: 'Account Security',
      desc_security: 'Create a strong password to protect your account.',
      label_firstName: 'First Name',
      label_lastName: 'Last Name',
      label_birthDate: 'Date of Birth',
      label_cpf: 'CPF',
      label_gender: 'Gender',
      gender_male: 'Male',
      gender_female: 'Female',
      gender_other: 'Other',
      gender_prefer_not: 'Prefer not to say',
      label_email: 'Email',
      label_phone: 'Phone',
      label_cep: 'Zip Code',
      label_address: 'Address',
      label_state: 'State',
      select_default: 'Select',
      label_password: 'Password',
      label_confirmPassword: 'Confirm Password',
      label_terms: 'I have read and accept the',
      link_terms: 'Terms of Use',
      label_and: 'and the',
      link_privacy: 'Privacy Policy',
      label_newsletter: 'I want to receive news and promotions by email',
      btn_prev: 'Back',
      btn_next: 'Next',
      btn_submit: 'Create Account',
      btn_reset: 'New Registration',
      success_title: 'Registration Complete!',
      success_text: 'Your account has been created successfully. Check your email to activate.',
      footer_made: 'Made with',
      footer_by: 'by',
      // Placeholders
      ph_firstName: 'E.g. Gregory',
      ph_lastName: 'E.g. Pinto',
      ph_email: 'gregory@email.com',
      ph_cep: '00000-000',
      ph_address: 'Street, number, complement',
      ph_password: 'Minimum 8 characters',
      ph_confirmPassword: 'Repeat your password',
      // Validation
      v_required: '{field} is required.',
      v_minLength: '{field} must have at least {min} characters.',
      v_email: 'Enter a valid email address.',
      v_cpf_length: 'CPF must have 11 digits.',
      v_cpf_invalid: 'Invalid CPF.',
      v_phone: 'Phone must have 10 or 11 digits.',
      v_date_required: 'Select a valid date.',
      v_date_invalid: 'Invalid date.',
      v_date_future: 'Date must be in the past.',
      v_date_min_age: 'Minimum age: 10 years.',
      v_password_min: 'Minimum 8 characters.',
      v_password_match: 'Passwords do not match.',
      v_terms: 'You must accept the terms.',
      // Strength
      str_weak: 'Weak',
      str_fair: 'Fair',
      str_good: 'Good',
      str_strong: 'Strong',
    }
  },

  t(key) {
    return this.translations[this.current]?.[key] || key;
  },

  tv(key, replacements = {}) {
    let str = this.t(key);
    for (const [k, v] of Object.entries(replacements)) {
      str = str.replace(`{${k}}`, v);
    }
    return str;
  },

  apply() {
    // Text content
    Utils.$$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.t(key);
      if (text !== key) el.textContent = text;
    });
    // Placeholders
    Utils.$$('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = this.t(key);
      if (text !== key) el.placeholder = text;
    });
    // Update html lang
    document.documentElement.lang = this.current === 'pt' ? 'pt-BR' : 'en';
    document.documentElement.setAttribute('data-lang', this.current);
  },

  toggle() {
    this.current = this.current === 'pt' ? 'en' : 'pt';
    localStorage.setItem('formproLang', this.current);
    this.apply();
    return this.current;
  },

  init() {
    const saved = localStorage.getItem('formproLang');
    if (saved && this.translations[saved]) {
      this.current = saved;
    } else {
      // Detect browser language
      const browserLang = navigator.language?.slice(0, 2);
      this.current = browserLang === 'pt' ? 'pt' : 'en';
    }
    this.apply();
  }
};


/* -----------------------------------------------
   3. THEME CONTROLLER
   ----------------------------------------------- */

const ThemeController = {
  modes: ['auto', 'light', 'dark'],
  currentIndex: 0,

  get current() {
    return this.modes[this.currentIndex];
  },

  apply() {
    document.documentElement.setAttribute('data-theme', this.current);
    localStorage.setItem('formproTheme', this.current);
  },

  toggle() {
    this.currentIndex = (this.currentIndex + 1) % this.modes.length;
    this.apply();
    return this.current;
  },

  getResolvedTheme() {
    if (this.current !== 'auto') return this.current;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  },

  init() {
    const saved = localStorage.getItem('formproTheme');
    if (saved) {
      const idx = this.modes.indexOf(saved);
      if (idx !== -1) this.currentIndex = idx;
    }
    this.apply();

    // Listen to system changes if on auto
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.current === 'auto') this.apply();
    });
  }
};


/* -----------------------------------------------
   4. INPUT MASKS
   ----------------------------------------------- */

const Masks = {
  cpf(v) { return Utils.mask(v, '###.###.###-##'); },
  phone(v) {
    const d = v.replace(/\D/g, '');
    return d.length <= 10 ? Utils.mask(v, '(##) ####-####') : Utils.mask(v, '(##) #####-####');
  },
  cep(v) { return Utils.mask(v, '#####-###'); }
};


/* -----------------------------------------------
   5. VALIDATORS
   ----------------------------------------------- */

const Validators = {
  required(value, fieldName) {
    if (!value || !value.trim()) return I18n.tv('v_required', { field: fieldName });
    return null;
  },
  minLength(value, min, fieldName) {
    if (value && value.trim().length < min) return I18n.tv('v_minLength', { field: fieldName, min });
    return null;
  },
  email(value) {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return I18n.t('v_email');
    return null;
  },
  cpf(value) {
    const d = value.replace(/\D/g, '');
    if (d.length !== 11) return I18n.t('v_cpf_length');
    if (/^(\d)\1{10}$/.test(d)) return I18n.t('v_cpf_invalid');
    const calc = (slice, w) => {
      const s = slice.split('').reduce((a, c, i) => a + parseInt(c) * w[i], 0);
      const r = s % 11;
      return r < 2 ? 0 : 11 - r;
    };
    const d1 = calc(d.slice(0, 9), [10,9,8,7,6,5,4,3,2]);
    const d2 = calc(d.slice(0, 10), [11,10,9,8,7,6,5,4,3,2]);
    if (parseInt(d[9]) !== d1 || parseInt(d[10]) !== d2) return I18n.t('v_cpf_invalid');
    return null;
  },
  phone(value) {
    const d = value.replace(/\D/g, '');
    if (d.length < 10 || d.length > 11) return I18n.t('v_phone');
    return null;
  },
  date(value) {
    if (!value) return I18n.t('v_date_required');
    const date = new Date(value), now = new Date();
    if (isNaN(date.getTime())) return I18n.t('v_date_invalid');
    if (date >= now) return I18n.t('v_date_future');
    const age = Math.floor((now - date) / (365.25 * 24 * 60 * 60 * 1000));
    if (age < 10) return I18n.t('v_date_min_age');
    if (age > 130) return I18n.t('v_date_invalid');
    return null;
  },
  password(value) {
    if (!value || value.length < 8) return I18n.t('v_password_min');
    return null;
  },
  confirmPassword(value, pw) {
    if (value !== pw) return I18n.t('v_password_match');
    return null;
  },
  checkbox(checked) {
    if (!checked) return I18n.t('v_terms');
    return null;
  }
};


/* -----------------------------------------------
   6. PASSWORD STRENGTH
   ----------------------------------------------- */

const PasswordStrength = {
  calculate(pw) {
    if (!pw) return -1;
    let s = 0;
    if (pw.length >= 8) s++;
    if (pw.length >= 12) s++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
    if (/\d/.test(pw)) s++;
    if (/[^a-zA-Z0-9]/.test(pw)) s++;
    if (s <= 1) return 0;
    if (s <= 2) return 1;
    if (s <= 3) return 2;
    return 3;
  },
  render(pw, fillEl, textEl) {
    const levels = [
      { key: 'str_weak',   color: '#ff4d6a', w: 25 },
      { key: 'str_fair',   color: '#ffb84d', w: 50 },
      { key: 'str_good',   color: '#6c63ff', w: 75 },
      { key: 'str_strong', color: '#00d4aa', w: 100 },
    ];
    const i = this.calculate(pw);
    if (i < 0) {
      fillEl.style.width = '0%'; fillEl.style.background = 'transparent';
      textEl.textContent = ''; textEl.style.color = 'transparent';
      return;
    }
    const l = levels[i];
    fillEl.style.width = l.w + '%';
    fillEl.style.background = l.color;
    textEl.textContent = I18n.t(l.key);
    textEl.style.color = l.color;
  }
};


/* -----------------------------------------------
   7. FORM CONTROLLER
   ----------------------------------------------- */

class FormController {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 3;

    this.form         = Utils.$('#mainForm');
    this.steps        = Utils.$$('.form__step');
    this.progressFill = Utils.$('#progressFill');
    this.progressSteps= Utils.$$('.progress__step');
    this.btnPrev      = Utils.$('#btnPrev');
    this.btnNext      = Utils.$('#btnNext');
    this.btnSubmit    = Utils.$('#btnSubmit');
    this.successScreen= Utils.$('#successScreen');
    this.strengthFill = Utils.$('#strengthFill');
    this.strengthText = Utils.$('#strengthText');

    this.init();
  }

  init() {
    this.bindEvents();
    this.bindMasks();
    this.updateUI();
  }

  bindEvents() {
    this.btnNext.addEventListener('click', () => this.nextStep());
    this.btnPrev.addEventListener('click', () => this.prevStep());
    this.form.addEventListener('submit', e => this.handleSubmit(e));

    this.progressSteps.forEach(btn => {
      btn.addEventListener('click', () => {
        const step = parseInt(btn.dataset.step);
        if (step < this.currentStep) this.goToStep(step);
      });
    });

    Utils.$$('.form__input', this.form).forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', Utils.debounce(() => {
        if (input.classList.contains('form__input--invalid')) this.validateField(input);
      }, 400));
    });

    const pwInput = Utils.$('#password');
    if (pwInput) {
      pwInput.addEventListener('input', () => {
        PasswordStrength.render(pwInput.value, this.strengthFill, this.strengthText);
      });
    }

    Utils.$$('.form__toggle-pw').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = Utils.$(`#${btn.dataset.target}`);
        const isPw = target.type === 'password';
        target.type = isPw ? 'text' : 'password';
        btn.setAttribute('aria-label', isPw
          ? (I18n.current === 'pt' ? 'Ocultar senha' : 'Hide password')
          : (I18n.current === 'pt' ? 'Mostrar senha' : 'Show password'));
      });
    });

    Utils.$('#btnReset')?.addEventListener('click', () => this.reset());

    this.form.addEventListener('keydown', e => {
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (this.currentStep < this.totalSteps) this.nextStep();
      }
    });

    // Theme toggle
    Utils.$('#themeToggle')?.addEventListener('click', () => {
      ThemeController.toggle();
    });

    // Language toggle
    Utils.$('#langToggle')?.addEventListener('click', () => {
      const newLang = I18n.toggle();
      const label = Utils.$('#langLabel');
      if (label) label.textContent = newLang === 'pt' ? 'EN' : 'PT';
      // Re-render password strength with new language
      const pw = Utils.$('#password');
      if (pw) PasswordStrength.render(pw.value, this.strengthFill, this.strengthText);
    });
  }

  bindMasks() {
    const cpf = Utils.$('#cpf'), phone = Utils.$('#phone'), cep = Utils.$('#cep');
    if (cpf)   cpf.addEventListener('input',   () => { cpf.value = Masks.cpf(cpf.value); });
    if (phone) phone.addEventListener('input', () => { phone.value = Masks.phone(phone.value); });
    if (cep)   cep.addEventListener('input',   () => { cep.value = Masks.cep(cep.value); });
  }

  /* --- Field name helpers for validation messages --- */
  fieldName(id) {
    const map = {
      firstName:       I18n.t('label_firstName'),
      lastName:        I18n.t('label_lastName'),
      birthDate:       I18n.t('label_birthDate'),
      cpf:             'CPF',
      email:           I18n.t('label_email'),
      phone:           I18n.t('label_phone'),
      password:        I18n.t('label_password'),
      confirmPassword: I18n.t('label_confirmPassword'),
    };
    return map[id] || id;
  }

  validateField(input) {
    const id = input.id, value = input.value.trim();
    let error = null;
    const name = this.fieldName(id);

    switch (id) {
      case 'firstName':
        error = Validators.required(value, name) || Validators.minLength(value, 2, name); break;
      case 'lastName':
        error = Validators.required(value, name) || Validators.minLength(value, 2, name); break;
      case 'birthDate':
        error = Validators.required(value, name) || Validators.date(value); break;
      case 'cpf':
        error = Validators.required(value, name) || Validators.cpf(value); break;
      case 'email':
        error = Validators.required(value, name) || Validators.email(value); break;
      case 'phone':
        error = Validators.required(value, name) || Validators.phone(value); break;
      case 'password':
        error = Validators.required(value, name) || Validators.password(value); break;
      case 'confirmPassword': {
        const pw = Utils.$('#password').value;
        error = Validators.required(value, name) || Validators.confirmPassword(value, pw); break;
      }
    }

    this.setFieldState(input, error);
    return !error;
  }

  setFieldState(input, error) {
    const errEl = Utils.$(`#${input.id}Error`);
    if (error) {
      input.classList.remove('form__input--valid');
      input.classList.add('form__input--invalid');
      input.setAttribute('aria-invalid', 'true');
      if (errEl) errEl.textContent = error;
    } else {
      input.classList.remove('form__input--invalid');
      input.value.trim()
        ? input.classList.add('form__input--valid')
        : input.classList.remove('form__input--valid');
      input.setAttribute('aria-invalid', 'false');
      if (errEl) errEl.textContent = '';
    }
  }

  validateStep(step) {
    const fieldset = Utils.$(`.form__step[data-step="${step}"]`);
    const inputs = Utils.$$('.form__input[required]', fieldset);
    let valid = true, firstInvalid = null;

    inputs.forEach(input => {
      const ok = this.validateField(input);
      if (!ok && !firstInvalid) firstInvalid = input;
      if (!ok) valid = false;
    });

    if (step === 3) {
      const terms = Utils.$('#terms'), errEl = Utils.$('#termsError');
      if (terms && !terms.checked) {
        valid = false;
        if (errEl) errEl.textContent = I18n.t('v_terms');
        if (!firstInvalid) firstInvalid = terms;
      } else if (errEl) { errEl.textContent = ''; }
    }

    if (firstInvalid) firstInvalid.focus();
    return valid;
  }

  nextStep() {
    if (!this.validateStep(this.currentStep)) return;
    if (this.currentStep < this.totalSteps) { this.currentStep++; this.updateUI(); }
    Utils.announce(I18n.current === 'pt'
      ? `Etapa ${this.currentStep} de ${this.totalSteps}`
      : `Step ${this.currentStep} of ${this.totalSteps}`);
  }

  prevStep() {
    if (this.currentStep > 1) { this.currentStep--; this.updateUI(); }
  }

  goToStep(step) {
    if (step >= 1 && step <= this.totalSteps) { this.currentStep = step; this.updateUI(); }
  }

  updateUI() {
    this.steps.forEach(s => {
      s.classList.toggle('form__step--active', parseInt(s.dataset.step) === this.currentStep);
    });
    this.progressFill.style.width = `${(this.currentStep / this.totalSteps) * 100}%`;
    this.progressSteps.forEach(btn => {
      const n = parseInt(btn.dataset.step);
      btn.classList.remove('progress__step--active', 'progress__step--completed');
      if (n === this.currentStep) btn.classList.add('progress__step--active');
      else if (n < this.currentStep) btn.classList.add('progress__step--completed');
    });
    Utils.$('.progress')?.setAttribute('aria-valuenow', this.currentStep);
    this.btnPrev.disabled = this.currentStep === 1;
    this.btnNext.style.display = this.currentStep < this.totalSteps ? 'inline-flex' : 'none';
    this.btnSubmit.style.display = this.currentStep === this.totalSteps ? 'inline-flex' : 'none';
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (!this.validateStep(this.currentStep)) return;

    const fd = new FormData(this.form);
    const data = Object.fromEntries(fd.entries());
    delete data.password; delete data.confirmPassword;

    this.btnSubmit.classList.add('btn--loading');
    this.btnSubmit.disabled = true;
    await new Promise(r => setTimeout(r, 1800));

    console.log('📋 Form data:', data);

    this.form.hidden = true;
    Utils.$('.progress').hidden = true;
    this.successScreen.hidden = false;
    this.successScreen.focus();
    Utils.announce(I18n.t('success_title'));
  }

  reset() {
    this.form.reset();
    this.currentStep = 1;
    Utils.$$('.form__input', this.form).forEach(inp => {
      inp.classList.remove('form__input--valid', 'form__input--invalid');
      inp.setAttribute('aria-invalid', 'false');
    });
    Utils.$$('.form__error', this.form).forEach(el => { el.textContent = ''; });
    PasswordStrength.render('', this.strengthFill, this.strengthText);
    this.btnSubmit.classList.remove('btn--loading');
    this.btnSubmit.disabled = false;
    this.form.hidden = false;
    Utils.$('.progress').hidden = false;
    this.successScreen.hidden = true;
    this.updateUI();
    Utils.$('#firstName')?.focus();
  }
}


/* -----------------------------------------------
   8. INITIALIZATION
   ----------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  // Init theme (follows system by default)
  ThemeController.init();

  // Init i18n (detects browser language)
  I18n.init();

  // Update lang toggle label
  const label = Utils.$('#langLabel');
  if (label) label.textContent = I18n.current === 'pt' ? 'EN' : 'PT';

  // Init form
  new FormController();
});
