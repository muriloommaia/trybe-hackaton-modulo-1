
const buttonLogin = document.getElementById('button-login-github');

buttonLogin.addEventListener('click', async () => {
  const user = document.getElementById('input-login').value;
  localStorage.user = user;
  window.location.href = '../public/home.html';
});