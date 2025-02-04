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


  