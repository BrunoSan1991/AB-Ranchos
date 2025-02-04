// document.addEventListener('DOMContentLoaded', function() {
//     // Função para renderizar o conteúdo inicial do modal
//     function renderInitialContent() {
//       const modalContent = document.getElementById('modalContent');
//       modalContent.innerHTML = `
//         <h4 class="mb-4">Bem-vindo ao AB Ranchos</h4>
//         <div class="row">
//           <!-- Campo de Número de Telefone -->
//           <div class="col-md-12 col-sm-12 col-xl-12 mb-3">
//             <label for="phoneInput" class="form-label">Número de Telefone</label>
//             <div class="input-group">
//               <span class="input-group-text" id="countryCode">+55</span>
//               <input type="text" class="form-control" id="phoneInput"
//                      placeholder="(DDD) Número do telefone" maxlength="15" />
//             </div>
//           </div>
//         </div>
    
//         <p class="text-muted">
//           Ligaremos ou enviaremos uma mensagem para confirmar seu número.
//           Podem ser aplicadas tarifas padrão de dados e mensagens.
//           <a href="#">Política de Privacidade</a>
//         </p>
    
//         <!-- Botão Continuar -->
//         <button class="btn btn-custom">Continuar</button>
    
//         <!-- Divider -->
//         <div class="divider">ou</div>
    
//         <!-- Botões Alternativos -->
//         <div class="button-container">
//           <a class="btn btn-google over mb-2" id="enterEmailButton">Entrar com E-mail</a>
//           <a href="http://localhost:3000/auth/google" class="btn btn-google" id="google-login">
//             <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo">
//             Continuar com Google
//           </a>
//         </div>
//       `;
    
//       // Vincula o evento para o botão "Entrar com E-mail"
//       document.getElementById('enterEmailButton').addEventListener('click', showEmailModal);
//     }
    
//     // Função para renderizar o modal de e-mail
//     function showEmailModal() {
//       const modalContent = document.getElementById('modalContent');
//       modalContent.innerHTML = `
//         <h4 class="mb-4">Bem-vindo ao AB Ranchos</h4>
//         <div class="row">
//           <!-- Campo de E-mail -->
//           <div class="col-md-12 col-sm-12 col-xl-12 mb-3">
//             <label for="emailInput" class="form-label">E-mail</label>
//             <input type="email" class="form-control" id="emailInput" placeholder="Digite seu e-mail" />
//           </div>
//         </div>
    
//         <!-- Botão Continuar -->
//         <button class="btn btn-custom" id="enterCadasterButton">Continuar</button>
    
//         <!-- Link para voltar -->
//         <div class="mt-3">
//           <a href="#" id="backButton">Voltar</a>
//         </div>
//       `;
    
//       // Vincula o evento do botão "Voltar" para restaurar o conteúdo inicial
//       document.getElementById('backButton').addEventListener('click', function(e) {
//         e.preventDefault();
//         renderInitialContent();
//       });
    
//       // Vincula o evento do botão "Continuar" para exibir o formulário de cadastro
//       document.getElementById('enterCadasterButton').addEventListener('click', function() {
//         const emailValue = document.getElementById('emailInput').value;
//         showRegistrationForm(emailValue);
//       });
//     }
    
//     // Função para renderizar o formulário de cadastro
//     function showRegistrationForm(emailValue) {
//       const modalContent = document.getElementById('modalContent');
//       modalContent.innerHTML = `
//         <h4 class="mb-4">Concluir cadastro</h4>
//         <form>
//           <!-- Campo Nome -->
//           <div class="mb-3">
//             <label for="nomeCompleto" class="form-label">Nome completo</label>
//             <input type="text" class="form-control" id="nomeCompleto" placeholder="Nome no documento de identificação" />
//           </div>
          
//           <!-- Campo Sobrenome -->
//           <div class="mb-3">
//             <label for="sobrenome" class="form-label">Sobrenome</label>
//             <input type="text" class="form-control" id="sobrenome" placeholder="Sobrenome no documento de identificação" />
//           </div>
          
//           <!-- Campo Data de Nascimento -->
//           <div class="mb-3">
//             <label for="dataNascimento" class="form-label">Data de nascimento</label>
//             <input type="date" class="form-control" id="dataNascimento" />
//           </div>
          
//           <!-- Campo E-mail -->
//           <div class="mb-3">
//             <label for="emailInput" class="form-label">E-mail</label>
//             <input type="email" class="form-control" id="emailInput" value="${emailValue}" readonly />
//           </div>
          
//           <!-- Campo Senha -->
//           <div class="mb-3">
//             <label for="senha" class="form-label">Senha</label>
//             <input type="password" class="form-control" id="senha" placeholder="Digite sua senha" />
//           </div>
          
//           <!-- Botão Concordar e Continuar -->
//           <div class="botaoCadastro d-flex justify-content-center">
//             <button class="btn btn-primary">Concordar e continuar</button>
//           </div>
//         </form>
        
//         <!-- Link para voltar -->
//         <div class="mt-3">
//           <a href="#" id="backButton">Voltar</a>
//         </div>
//       `;
    
//       // Vincula o evento do botão "Voltar" para restaurar o conteúdo inicial
//       document.getElementById('backButton').addEventListener('click', function(e) {
//         e.preventDefault();
//         renderInitialContent();
//       });
//     }
    
//     // Inicializa o modal com o conteúdo inicial
//     renderInitialContent();
    
//     // (Opcional) Reinicializa o conteúdo do modal sempre que ele for aberto
//     var cadastreModal = document.getElementById('cadastreModal');
//     cadastreModal.addEventListener('shown.bs.modal', function () {
//       renderInitialContent();
//     });
//   });
  