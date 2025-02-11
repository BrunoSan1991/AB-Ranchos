
const phoneInput = document.getElementById("phoneInput");

// Função para formatar o telefone no padrão brasileiro
function formatPhone(value) {
    if (!value) return ""; // Retorna vazio se o campo estiver vazio

    let cleanValue = value.replace(/\D/g, ""); // Remove tudo que não é número

    if (cleanValue.length > 11) {
        cleanValue = cleanValue.slice(0, 11); // Limita a 11 dígitos (DDD + número)
    }

    // Aplica a máscara correta conforme o tamanho do número
    if (cleanValue.length <= 10) {
        return cleanValue.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
    } else {
        return cleanValue.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
    }
}

// Event listener para formatar dinamicamente o telefone
phoneInput.addEventListener("input", function (e) {
    let cursorPosition = e.target.selectionStart;
    let oldLength = e.target.value.length;
    let key = e.inputType; // Captura a ação do usuário

    let formattedValue = formatPhone(e.target.value);

    // Se o usuário pressionou backspace e o cursor está antes de um hífen, apague o hífen também
    if (key === "deleteContentBackward" && formattedValue[cursorPosition - 1] === "-") {
        formattedValue = formattedValue.slice(0, cursorPosition - 1) + formattedValue.slice(cursorPosition);
        cursorPosition--; // Ajusta a posição do cursor
    }

    e.target.value = formattedValue;

    // Ajusta a posição do cursor ao apagar ou inserir caracteres
    let newLength = formattedValue.length;
    let diff = newLength - oldLength;
    let newCursorPos = cursorPosition + (diff > 0 ? diff : 0);

    setTimeout(() => e.target.setSelectionRange(newCursorPos, newCursorPos), 0);
});



  document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os cards com a classe "card-airbnb"
    const cards = document.querySelectorAll('.card-airbnb');
    
    cards.forEach(card => {
      // Obtém o array de imagens do data attribute ou define um padrão
      const imagesData = card.getAttribute('data-images');
      const images = imagesData ? imagesData.split(',') : [
        '/img/12.png',
        '/img/13.png',
        '/img/image.png'
      ];
      
      let currentIndex = 0;
      const imgElement = card.querySelector('.card-img-top');
      const btnPrev = card.querySelector('.prev');
      const btnNext = card.querySelector('.next');

      // Evento para o botão "Voltar"
      btnPrev.addEventListener('click', function(e) {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        imgElement.src = images[currentIndex];
      });

      // Evento para o botão "Seguir"
      btnNext.addEventListener('click', function(e) {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % images.length;
        imgElement.src = images[currentIndex];
      });
    });
  });



// Sua configuração do Firebase (substitua pelos dados do seu projeto)
var firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);


// Inicialize o reCAPTCHA
const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
  size: 'invisible', // ou 'normal' se preferir mostrar o widget
  callback: (response) => {
    // reCAPTCHA resolvido, podemos enviar o SMS
    console.log("reCAPTCHA resolvido");
  },
  'expired-callback': () => {
    // Resposta expirada, reconfigure se necessário
    console.log("reCAPTCHA expirou");
  }
});

// Renderize o widget se estiver em modo 'normal'
recaptchaVerifier.render().then(widgetId => {
  window.recaptchaWidgetId = widgetId;
});

// Função para enviar o SMS
document.getElementById('sendCodeBtn').addEventListener('click', function() {
  // Obtenha o número de telefone do input e concatene com o código do país
  let phoneNumber = document.getElementById('countryCode').innerText + document.getElementById('phoneInput').value;
  // Opcional: formate o número removendo caracteres indesejados
  phoneNumber = phoneNumber.replace(/\D/g, ''); // Remove tudo que não é dígito
  phoneNumber = '+' + phoneNumber; // Garante o sinal de +

  // Use a função signInWithPhoneNumber
  firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
    .then((confirmationResult) => {
      // SMS enviado. Guarde o objeto confirmationResult para verificar o código posteriormente.
      window.confirmationResult = confirmationResult;
      alert("Código enviado! Verifique seu telefone.");
    })
    .catch((error) => {
      // Ocorreu algum erro
      console.error("Erro ao enviar SMS: ", error);
      alert("Erro ao enviar SMS. Tente novamente.");
    });
});


document.getElementById('verifyCodeBtn').addEventListener('click', function() {
  const code = document.getElementById('codeInput').value;
  window.confirmationResult.confirm(code)
    .then((result) => {
      // Usuário autenticado com sucesso.
      const user = result.user;
      alert("Telefone autenticado com sucesso!");
      console.log("Usuário autenticado: ", user);
    })
    .catch((error) => {
      // Código inválido ou expirado.
      console.error("Erro ao verificar o código: ", error);
      alert("Código inválido. Tente novamente.");
    });
});