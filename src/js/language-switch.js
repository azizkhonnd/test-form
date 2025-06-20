document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'ru';
  applyLanguage(savedLang);

  const selectedLangSpan = document.querySelector('.custom-select .selected span');
  if (selectedLangSpan) {
    selectedLangSpan.textContent = savedLang.toUpperCase();
  }

  document.querySelectorAll('.custom-select .options div').forEach(option => {
    option.addEventListener('click', () => {
      const lang = option.getAttribute('data-value');
      applyLanguage(lang);
      localStorage.setItem('lang', lang);

      if (selectedLangSpan) {
        selectedLangSpan.textContent = lang.toUpperCase();
      }

      const mobileSelect = document.getElementById('mobileLangSelector');
      if (mobileSelect) {
        mobileSelect.value = lang;
      }
    });
  });

  const mobileSelect = document.getElementById('mobileLangSelector');
  if (mobileSelect) {
    mobileSelect.value = savedLang;
    mobileSelect.addEventListener('change', (e) => {
      const lang = e.target.value;
      applyLanguage(lang);
      localStorage.setItem('lang', lang);

      if (selectedLangSpan) {
        selectedLangSpan.textContent = lang.toUpperCase();
      }
    });
  }
});

function applyLanguage(lang) {
  fetch(`/public/locale/${lang}.json`)
    .then((res) => res.json())
    .then((translations) => {
      document.querySelectorAll('[data-key]').forEach((element) => {
        const key = element.getAttribute('data-key');
        if (translations[key]) {
          if (element.placeholder !== undefined && element.hasAttribute('data-key-placeholder')) {
            element.placeholder = translations[key];
          } else {
            element.textContent = translations[key];
          }
        }
      });
    })
    .catch((err) => {
      console.error('Error loading language file:', err);
    });
}

