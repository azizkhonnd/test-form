document.querySelectorAll('.custom-select').forEach(select => {
  const selected = select.querySelector('.selected');
  const options = select.querySelector('.options');

  selected.addEventListener('click', () => {
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
  });

  options.querySelectorAll('div').forEach(option => {
    option.addEventListener('click', () => {
      const span = selected.querySelector('span');
      if (span) {
        span.textContent = option.textContent;
      }
      options.style.display = 'none';
    });
  });

  document.addEventListener('click', (e) => {
    if (!select.contains(e.target)) {
      options.style.display = 'none';
    }
  });
});
