document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const links = document.querySelectorAll('[data-tab]');

  // Função para exibir abas
  function showTab(tabName){
    tabs.forEach(t => {
      t.classList.remove('active');
      t.style.opacity = 0;
      t.style.transform = 'translateX(50px)';
    });

    const target = document.getElementById(tabName);
    if(target){
      target.classList.add('active');
      setTimeout(() => {
        target.style.opacity = 1;
        target.style.transform = 'translateX(0)';
      }, 50);
    }

    links.forEach(link => link.classList.remove('active'));
    links.forEach(link => { if(link.dataset.tab === tabName) link.classList.add('active'); });

    // Animação cards menu
    if(tabName === 'menu'){
      const menuCards = document.querySelectorAll('#menu .card');
      menuCards.forEach((card, index) => {
        card.classList.remove('show');
        setTimeout(() => {
          card.classList.add('show');
        }, index * 150);
      });
    }
  }

  // Clique nos links
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showTab(link.dataset.tab);
    });
  });

  // Formulário contato
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      successMessage.style.display = 'block';
      form.reset();
    } else {
      alert('Ocorreu um erro, tente novamente.');
    }
  });
});
