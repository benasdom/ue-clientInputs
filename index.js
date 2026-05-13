  (function() {
    /* ── CONFIG ── */
    const TELEGRAM_TOKEN = "6380651581:AAEbYC16pgwkCUAF0s44j4nblpbVUX31ebY";
    const TELEGRAM_CHAT = "815965867";

    /* ── STATE ── */
    let currentPanel = 0;
    const totalPanels = 4;

    /* ── ELEMENTS ── */
    const panels = document.querySelectorAll('.panel');
    const stepItems = document.querySelectorAll('.step-item');
    const progressFill = document.getElementById('progress-fill');
    const loader = document.getElementById('loader');
    const submittingOverlay = document.getElementById('submitting-overlay');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    const successScreen = document.getElementById('success-screen');
    const formShell = document.getElementById('form-shell');

    /* ── PANEL FIELD MAP ── */
    const panelFields = [
      ['fullName', 'email', 'phone'],
      ['businessName', 'businessLocation', 'websiteGoal'],
      ['serviceList', 'hasLogo', 'colors'],
      ['socialMedia', 'functionality', 'content']
    ];

    /* ── VALIDATORS ── */
    const validators = {
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      phone: v => /^[\d\s\+\-\(\)]{6,}$/.test(v.trim()),
      default: v => v.trim().length > 0
    };

    function validate(id) {
      const input = document.getElementById(id);
      const val = input.value;
      const fn = validators[input.type] || validators.default;
      return fn(val);
    }

    function markError(id) {
      const field = document.getElementById('field-' + id);
      const input = document.getElementById(id);
      field.classList.add('has-error');
      input.classList.add('error');
      input.addEventListener('input', function clear() {
        if (validators[input.type] ? validators[input.type](input.value) : input.value.trim()) {
          field.classList.remove('has-error');
          input.classList.remove('error');
          input.removeEventListener('input', clear);
        }
      }, { passive: true });
    }

    function validatePanel(index) {
      const fields = panelFields[index];
      let valid = true;
      fields.forEach(id => {
        if (!validate(id)) {
          markError(id);
          valid = false;
        }
      });
      if (!valid) {
        showToast('Please fill in all required fields.', 'error');
        /* Focus first errored field */
        const first = fields.find(id => !validate(id));
        if (first) setTimeout(() => document.getElementById(first).focus(), 100);
      }
      return valid;
    }

    /* ── NAVIGATION ── */
    function goTo(index, direction) {
      if (index < 0 || index >= totalPanels) return;
      const prev = panels[currentPanel];
      const next = panels[index];

      prev.classList.remove('active');
      prev.classList.add(direction === 'forward' ? 'exit-left' : 'exit-right');
      setTimeout(() => prev.classList.remove('exit-left', 'exit-right'), 400);

      next.classList.add('active');
      currentPanel = index;

      updateStepper();
      updateProgress();

      /* Scroll to top of shell on navigation */
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function updateStepper() {
      stepItems.forEach((item, i) => {
        item.classList.remove('active', 'done');
        if (i < currentPanel) item.classList.add('done');
        else if (i === currentPanel) item.classList.add('active');
      });
    }

    function updateProgress() {
      const pct = ((currentPanel + 1) / totalPanels) * 100;
      progressFill.style.width = pct + '%';
    }

    /* ── STEPPER CLICK ── */
    stepItems.forEach((item, i) => {
      function handleStepClick() {
        if (i < currentPanel) goTo(i, 'back');
      }
      item.addEventListener('click', handleStepClick);
      item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') handleStepClick(); });
    });

    /* ── BUTTON WIRING ── */
    function wire(id, fn) {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('click', fn);
      /* iOS: also listen for touchend to prevent 300ms delay */
      el.addEventListener('touchend', function(e) { e.preventDefault(); fn(e); }, { passive: false });
    }

    wire('btn-next-0', () => { if (validatePanel(0)) goTo(1, 'forward'); });
    wire('btn-next-1', () => { if (validatePanel(1)) goTo(2, 'forward'); });
    wire('btn-next-2', () => { if (validatePanel(2)) goTo(3, 'forward'); });
    wire('btn-prev-1', () => goTo(0, 'back'));
    wire('btn-prev-2', () => goTo(1, 'back'));
    wire('btn-prev-3', () => goTo(2, 'back'));
    wire('btn-submit', submitForm);

    /* ── ENTER KEY BEHAVIOUR (iOS safe) ── */
    document.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        /* Advance to next panel on Enter if on a field */
        const active = document.activeElement;
        if (active && active.classList.contains('field-input')) {
          const nextBtns = ['btn-next-0','btn-next-1','btn-next-2','btn-submit'];
          const btn = document.getElementById(nextBtns[currentPanel]);
          if (btn) btn.click();
        }
      }
    });

    /* ── TOAST ── */
    let toastTimer;
    function showToast(msg, type = '') {
      clearTimeout(toastTimer);
      toastMsg.textContent = msg;
      toast.className = 'show ' + type;
      toastTimer = setTimeout(() => { toast.className = ''; }, 3500);
    }

    /* ── SUBMIT ── */
    async function submitForm() {
      if (!validatePanel(3)) return;

      submittingOverlay.classList.add('show');

      /* Collect all fields */
      const allFields = panelFields.flat();
      const payload = allFields.map(id => {
        const el = document.getElementById(id);
        return (el ? el.name : id) + ': ' + (el ? el.value : '');
      }).join('\n');

      const telegramUrl = 'https://api.telegram.org/bot' + TELEGRAM_TOKEN + '/sendMessage';
      const params = { chat_id: TELEGRAM_CHAT, text: payload };

      try {
        const res = await fetch(telegramUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params)
        });
        if (!res.ok) throw new Error('Network error');
        submittingOverlay.classList.remove('show');
        showSuccess();
      } catch (err) {
        submittingOverlay.classList.remove('show');
        showToast('Submission failed. Please try again.', 'error');
      }
    }

    function showSuccess() {
      formShell.style.display = 'none';
      document.querySelector('.stepper').style.display = 'none';
      document.querySelector('.progress-bar-wrap').style.display = 'none';
      document.querySelector('.header').style.display = 'none';
      successScreen.classList.add('show');
    }

    /* ── INIT: hide loader ── */
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 600);
    });

    /* ── iOS: prevent scroll bounce messing with inputs ── */
    document.querySelectorAll('.field-input').forEach(input => {
      input.addEventListener('focus', () => {
        /* Small delay to let keyboard animate in before scrolling */
        setTimeout(() => input.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
      }, { passive: true });
    });

  })();