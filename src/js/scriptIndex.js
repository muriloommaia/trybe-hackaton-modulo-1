const buttonLogin = document.getElementById('button-login-github');

buttonLogin.addEventListener('click', async () => {
  const user = document.getElementById('input-login').value;
  localStorage.user = user;
  window.location.href = '../public/home.html';
});

// Ao clicar em enter o botão de login será acionado
document.addEventListener("keypress", (event) => {
  if(event.key === 'Enter') {
    buttonLogin.click();
  }
});
