/**
 * ============================================
 * FormPro — Senior Architect Level JavaScript
 * Modular, Testable, Accessible, Production-Ready
 * ============================================
 */

'use strict';

/* -----------------------------------------------
   1. UTILITY FUNCTIONS
   ----------------------------------------------- */

const Utils = {
  /** Query a single element */
  $(selector, context = document) {
    return context.querySelector(selector);
  },

  /** Query multiple elements */
  $$(selector, context = document) {
    return [...context.querySelectorAll(selector)];
  },

  /** Apply an input mask pattern */
  mask(value, pattern) {
    let i = 0;
    const clean = value.replace(/\D/g, '');
    return pattern.replace(/#/g, () => clean[i++] || '');
  },

  /** Debounce a function */
  debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  /** Announce text to screen readers */
  announce(message) {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.className = 'sr-only';
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
  }
};


/* -----------------------------------------------
   2. INPUT MASKS
   ----------------------------------------------- */

const Masks = {
  cpf(value) {
    return Utils.mask(value, '###.###.###-##');
  },

  phone(value) {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 10) {
      return Utils.mask(value, '(##) ####-####');
    }
    return Utils.mask(value, '(##) #####-####');
  },

  cep(value) {
    return Utils.mask(value, '#####-###');
  }
};


/* -----------------------------------------------
   3. VALIDATORS
   ----------------------------------------------- */

const Validators = {
  required(value, fieldName = 'Este campo') {
    if (!value || !value.trim()) {
      return `${fieldName} é obrigatório.`;
    }
    return null;
  },

  minLength(value, min, fieldName = 'Este campo') {
    if (value && value.trim().length < min) {
      return `${fieldName} deve ter pelo menos ${min} caracteres.`;
    }
    return null;
  },

  email(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !regex.test(value)) {
      return 'Insira um e-mail válido.';
    }
    return null;
  },

  cpf(value) {
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 11) {
      return 'CPF deve ter 11 dígitos.';
    }
    // Check for known invalid sequences
    if (/^(\d)\1{10}$/.test(digits)) {
      return 'CPF inválido.';
    }
    // Validate check digits
    const calcDigit = (slice, weights) => {
      const sum = slice.split('').reduce((acc, d, i) => acc + parseInt(d) * weights[i], 0);
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };
    const w1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    const w2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    const d1 = calcDigit(digits.slice(0, 9), w1);
    const d2 = calcDigit(digits.slice(0, 10), w2);
    if (parseInt(digits[9]) !== d1 || parseInt(digits[10]) !== d2) {
      return 'CPF inválido.';
    }
    return null;
  },

  phone(value) {
    const digits = value.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 11) {
      return 'Telefone deve ter 10 ou 11 dígitos.';
    }
    return null;
  },

  date(value) {
    if (!value) return 'Selecione uma data válida.';
    const date = new Date(value);
    const now = new Date();
    if (isNaN(date.getTime())) return 'Data inválida.';
    if (date >= now) return 'A data deve ser no passado.';
    const age = Math.floor((now - date) / (365.25 * 24 * 60 * 60 * 1000));
    if (age < 10) return 'Idade mínima: 10 anos.';
    if (age > 130) return 'Data inválida.';
    return null;
  },

  password(value) {
    if (!value || value.length < 8) return 'Mínimo de 8 caracteres.';
    return null;
  },

  confirmPassword(value, password) {
    if (value !== password) return 'As senhas não coincidem.';
    return null;
  },

  checkbox(checked) {
    if (!checked) return 'Você deve aceitar para continuar.';
    return null;
  }
};


/* -----------------------------------------------
   4. PASSWORD STRENGTH METER
   ----------------------------------------------- */

const PasswordStrength = {
  levels: [
    { label: 'Fraca',    color: '#ff4d6a', width: 25 },
    { label: 'Razoável', color: '#ffb84d', width: 50 },
    { label: 'Boa',      color: '#6c63ff', width: 75 },
    { label: 'Forte',    color: '#00d4aa', width: 100 },
  ],

  calculate(password) {
    if (!password) return -1;
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    // Map 0-5 score to 0-3 index
    if (score <= 1) return 0;
    if (score <= 2) return 1;
    if (score <= 3) return 2;
    return 3;
  },

  render(password, fillEl, textEl) {
    const index = this.calculate(password);
    if (index < 0) {
      fillEl.style.width = '0%';
      fillEl.style.background = 'transparent';
      textEl.textContent = '';
      textEl.style.color = 'transparent';
      return;
    }
    const level = this.levels[index];
    fillEl.style.width = level.width + '%';
    fillEl.style.background = level.color;
    textEl.textContent = level.label;
    textEl.style.color = level.color;
  }
};


/* -----------------------------------------------
   5. FORM CONTROLLER (Multi-step)
   ----------------------------------------------- */

class FormController {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 3;

    // Cache DOM elements
    this.form = Utils.$('#mainForm');
    this.steps = Utils.$$('.form__step');
    this.progressFill = Utils.$('#progressFill');
    this.progressSteps = Utils.$$('.progress__step');
    this.btnPrev = Utils.$('#btnPrev');
    this.btnNext = Utils.$('#btnNext');
    this.btnSubmit = Utils.$('#btnSubmit');
    this.successScreen = Utils.$('#successScreen');
    this.strengthFill = Utils.$('#strengthFill');
    this.strengthText = Utils.$('#strengthText');

    this.init();
  }

  init() {
    this.bindEvents();
    this.bindMasks();
    this.updateUI();
  }

  /* --- Event Binding --- */
  bindEvents() {
    // Navigation
    this.btnNext.addEventListener('click', () => this.nextStep());
    this.btnPrev.addEventListener('click', () => this.prevStep());
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Progress step clicks
    this.progressSteps.forEach((btn) => {
      btn.addEventListener('click', () => {
        const step = parseInt(btn.dataset.step);
        if (step < this.currentStep) {
          this.goToStep(step);
        }
      });
    });

    // Real-time validation on blur
    Utils.$$('.form__input', this.form).forEach((input) => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', Utils.debounce(() => {
        if (input.classList.contains('form__input--invalid')) {
          this.validateField(input);
        }
      }, 400));
    });

    // Password strength
    const pwInput = Utils.$('#password');
    if (pwInput) {
      pwInput.addEventListener('input', () => {
        PasswordStrength.render(pwInput.value, this.strengthFill, this.strengthText);
      });
    }

    // Password toggle buttons
    Utils.$$('.form__toggle-pw').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = Utils.$(`#${btn.dataset.target}`);
        const isPassword = target.type === 'password';
        target.type = isPassword ? 'text' : 'password';
        btn.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha');
      });
    });

    // Reset / New form
    const btnReset = Utils.$('#btnReset');
    if (btnReset) {
      btnReset.addEventListener('click', () => this.reset());
    }

    // Keyboard: Enter to advance
    this.form.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (this.currentStep < this.totalSteps) {
          this.nextStep();
        }
      }
    });
  }

  /* --- Input Masks --- */
  bindMasks() {
    const cpfInput = Utils.$('#cpf');
    const phoneInput = Utils.$('#phone');
    const cepInput = Utils.$('#cep');

    if (cpfInput) {
      cpfInput.addEventListener('input', () => {
        cpfInput.value = Masks.cpf(cpfInput.value);
      });
    }
    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        phoneInput.value = Masks.phone(phoneInput.value);
      });
    }
    if (cepInput) {
      cepInput.addEventListener('input', () => {
        cepInput.value = Masks.cep(cepInput.value);
      });
    }
  }

  /* --- Validation Engine --- */
  validateField(input) {
    const id = input.id;
    const value = input.value.trim();
    let error = null;

    switch (id) {
      case 'firstName':
        error = Validators.required(value, 'Nome') || Validators.minLength(value, 2, 'Nome');
        break;
      case 'lastName':
        error = Validators.required(value, 'Sobrenome') || Validators.minLength(value, 2, 'Sobrenome');
        break;
      case 'birthDate':
        error = Validators.required(value, 'Data de nascimento') || Validators.date(value);
        break;
      case 'cpf':
        error = Validators.required(value, 'CPF') || Validators.cpf(value);
        break;
      case 'email':
        error = Validators.required(value, 'E-mail') || Validators.email(value);
        break;
      case 'phone':
        error = Validators.required(value, 'Telefone') || Validators.phone(value);
        break;
      case 'password':
        error = Validators.required(value, 'Senha') || Validators.password(value);
        break;
      case 'confirmPassword': {
        const pw = Utils.$('#password').value;
        error = Validators.required(value, 'Confirmação') || Validators.confirmPassword(value, pw);
        break;
      }
      default:
        break; // Optional fields
    }

    this.setFieldState(input, error);
    return !error;
  }

  setFieldState(input, error) {
    const errorEl = Utils.$(`#${input.id}Error`);
    if (error) {
      input.classList.remove('form__input--valid');
      input.classList.add('form__input--invalid');
      input.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.textContent = error;
    } else {
      input.classList.remove('form__input--invalid');
      if (input.value.trim()) {
        input.classList.add('form__input--valid');
      } else {
        input.classList.remove('form__input--valid');
      }
      input.setAttribute('aria-invalid', 'false');
      if (errorEl) errorEl.textContent = '';
    }
  }

  validateStep(step) {
    const fieldset = Utils.$(`.form__step[data-step="${step}"]`);
    const inputs = Utils.$$('.form__input[required]', fieldset);
    let isValid = true;
    let firstInvalid = null;

    inputs.forEach((input) => {
      const valid = this.validateField(input);
      if (!valid && !firstInvalid) {
        firstInvalid = input;
      }
      if (!valid) isValid = false;
    });

    // Step 3: check terms
    if (step === 3) {
      const terms = Utils.$('#terms');
      const termsError = Utils.$('#termsError');
      if (terms && !terms.checked) {
        isValid = false;
        if (termsError) termsError.textContent = 'Você deve aceitar os termos.';
        if (!firstInvalid) firstInvalid = terms;
      } else if (termsError) {
        termsError.textContent = '';
      }
    }

    if (firstInvalid) {
      firstInvalid.focus();
    }

    return isValid;
  }

  /* --- Step Navigation --- */
  nextStep() {
    if (!this.validateStep(this.currentStep)) return;

    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.updateUI();
      Utils.announce(`Etapa ${this.currentStep} de ${this.totalSteps}`);
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateUI();
      Utils.announce(`Etapa ${this.currentStep} de ${this.totalSteps}`);
    }
  }

  goToStep(step) {
    if (step >= 1 && step <= this.totalSteps) {
      this.currentStep = step;
      this.updateUI();
    }
  }

  updateUI() {
    // Steps visibility
    this.steps.forEach((s) => {
      const stepNum = parseInt(s.dataset.step);
      s.classList.toggle('form__step--active', stepNum === this.currentStep);
    });

    // Progress bar fill
    const percent = (this.currentStep / this.totalSteps) * 100;
    this.progressFill.style.width = `${percent}%`;

    // Progress dots
    this.progressSteps.forEach((btn) => {
      const stepNum = parseInt(btn.dataset.step);
      btn.classList.remove('progress__step--active', 'progress__step--completed');
      if (stepNum === this.currentStep) {
        btn.classList.add('progress__step--active');
      } else if (stepNum < this.currentStep) {
        btn.classList.add('progress__step--completed');
      }
    });

    // ARIA
    const progressBar = Utils.$('.progress');
    if (progressBar) {
      progressBar.setAttribute('aria-valuenow', this.currentStep);
    }

    // Buttons
    this.btnPrev.disabled = this.currentStep === 1;
    this.btnNext.style.display = this.currentStep < this.totalSteps ? 'inline-flex' : 'none';
    this.btnSubmit.style.display = this.currentStep === this.totalSteps ? 'inline-flex' : 'none';
  }

  /* --- Submit --- */
  async handleSubmit(e) {
    e.preventDefault();

    if (!this.validateStep(this.currentStep)) return;

    // Collect form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());
    delete data.password;
    delete data.confirmPassword;

    // Simulate submit with loading
    this.btnSubmit.classList.add('btn--loading');
    this.btnSubmit.disabled = true;

    await new Promise((resolve) => setTimeout(resolve, 1800));

    console.log('📋 Dados do formulário:', data);

    // Show success
    this.form.hidden = true;
    Utils.$('.progress').hidden = true;
    this.successScreen.hidden = false;
    this.successScreen.focus();

    Utils.announce('Cadastro realizado com sucesso!');
  }

  /* --- Reset --- */
  reset() {
    this.form.reset();
    this.currentStep = 1;

    // Clear all validation states
    Utils.$$('.form__input', this.form).forEach((input) => {
      input.classList.remove('form__input--valid', 'form__input--invalid');
      input.setAttribute('aria-invalid', 'false');
    });
    Utils.$$('.form__error', this.form).forEach((el) => {
      el.textContent = '';
    });

    // Reset password strength
    PasswordStrength.render('', this.strengthFill, this.strengthText);

    // Reset submit button
    this.btnSubmit.classList.remove('btn--loading');
    this.btnSubmit.disabled = false;

    // Show form
    this.form.hidden = false;
    Utils.$('.progress').hidden = false;
    this.successScreen.hidden = true;

    this.updateUI();
    Utils.$('#firstName').focus();
  }
}


/* -----------------------------------------------
   6. INITIALIZATION
   ----------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  new FormController();
});
