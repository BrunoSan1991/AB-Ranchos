// ========== FORMATAÇÃO DE TELEFONE ==========
const phoneInput = document.getElementById("phoneInput");

function formatPhone(value) {
  if (!value) return "";
  let cleanValue = value.replace(/\D/g, "");
  if (cleanValue.length > 11) {
    cleanValue = cleanValue.slice(0, 11);
  }
  if (cleanValue.length <= 10) {
    return cleanValue.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
  } else {
    return cleanValue.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
  }
}

phoneInput.addEventListener("input", function (e) {
  let cursorPosition = e.target.selectionStart;
  let oldLength = e.target.value.length;
  let key = e.inputType;

  let formattedValue = formatPhone(e.target.value);

  if (key === "deleteContentBackward" && formattedValue[cursorPosition - 1] === "-") {
    formattedValue = formattedValue.slice(0, cursorPosition - 1) + formattedValue.slice(cursorPosition);
    cursorPosition--;
  }

  e.target.value = formattedValue;

  let newLength = formattedValue.length;
  let diff = newLength - oldLength;
  let newCursorPos = cursorPosition + (diff > 0 ? diff : 0);

  setTimeout(() => e.target.setSelectionRange(newCursorPos, newCursorPos), 0);
});

// ========== TROCA DE SEÇÕES ==========
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(section => {
    section.style.display = "none";
  });
  document.getElementById(sectionId).style.display = "block";
}

// ========== reCAPTCHA ==========
let appVerifier;
document.addEventListener("DOMContentLoaded", () => {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
    size: "invisible",
    callback: (response) => {
      // CAPTCHA resolvido
    },
  });
  appVerifier = window.recaptchaVerifier;
});

// ========== ENVIO DE SMS ==========
document.getElementById("continuePhoneButton").addEventListener("click", function () {
  const phoneValue = phoneInput.value.replace(/\D/g, "");
  const fullPhoneNumber = "+55" + phoneValue;

  if (phoneValue.length < 10 || phoneValue.length > 11) {
    alert("Digite um número de telefone válido com DDD.");
    return;
  }

  firebase.auth().signInWithPhoneNumber(fullPhoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      showSection("codeValidationSection");
    })
    .catch((error) => {
      console.error("Erro ao enviar SMS:", error);
      alert("Falha ao enviar SMS. Verifique o número e tente novamente.");
    });
});

// ========== VERIFICAÇÃO DO CÓDIGO E ENVIO PARA BACKEND ==========
document.getElementById("validateCodeButton").addEventListener("click", async () => {
  const code = document.getElementById("validationCode").value.trim();

  if (!code) {
    alert("Digite o código recebido por SMS.");
    return;
  }

  try {
    const result = await window.confirmationResult.confirm(code);
    const user = result.user;
    const idToken = await user.getIdToken();

    const response = await fetch("/verifica-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: idToken }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Usuário autenticado com sucesso! UID: " + data.uid);
      // TODO: Redirecionar para cadastro ou dashboard
    } else {
      alert("Token inválido: " + data.message);
    }
  } catch (error) {
    console.error("Erro ao verificar código:", error);
    alert("Erro ao verificar o código. Verifique e tente novamente.");
  }
});

// ========== BOTÃO VOLTAR ==========
document.getElementById("backToPhoneSection").addEventListener("click", (e) => {
  e.preventDefault();
  showSection("initialSection");
});


document.getElementById("useTestPhone").addEventListener("click", (e) => {
  e.preventDefault();
  
  // Número de teste do Firebase
  const testNumber = "(11) 99999-9999"; // formato já com máscara
  const testCode = "123456";

  // Preenche o campo de telefone
  phoneInput.value = testNumber;

  // Quando clicar no botão de continuar, ele vai usar esse número
  alert("Número de teste preenchido. Clique em 'Continuar' e use o código: " + testCode);
});
