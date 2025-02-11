document.addEventListener('DOMContentLoaded', () => {
    // Obtém referências para as seções
    const sections = {
      initial: document.getElementById('initialSection'),
      email: document.getElementById('emailSection'),
      registration: document.getElementById('registrationSection')
    };
  
    // Função para exibir a seção desejada
    function showSection(sectionName) {
      Object.values(sections).forEach(section => section.classList.remove('active'));
      sections[sectionName].classList.add('active');
    }
  
    // Evento para exibir a view de e-mail
    document.getElementById('enterEmailButton').addEventListener('click', (e) => {
      e.preventDefault();
      showSection('email');
    });
  
    // Botão "Voltar" da view de e-mail
    document.getElementById('backToInitialFromEmail').addEventListener('click', (e) => {
      e.preventDefault();
      showSection('initial');
    });
  
    // Evento para exibir o formulário de cadastro
    document.getElementById('enterCadasterButton').addEventListener('click', (e) => {
      e.preventDefault();
      // Pega o valor do e-mail inserido
      const emailValue = document.getElementById('emailInput').value;
      // Define o e-mail no campo do formulário de cadastro
      document.getElementById('emailInputCadastro').value = emailValue;
      showSection('registration');
    });
  
    // Botão "Voltar" da view de cadastro
    document.getElementById('backToInitialFromRegistration').addEventListener('click', (e) => {
      e.preventDefault();
      showSection('initial');
    });
  
    // (Opcional) Reinicia para a view inicial sempre que o modal for aberto
    const cadastreModal = document.getElementById('cadastreModal');
    cadastreModal.addEventListener('shown.bs.modal', () => {
      showSection('initial');
    });
  });
  
  