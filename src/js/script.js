
const buttonLogin = document.getElementById('button-login-github');

buttonLogin.addEventListener('click', async () => {
  const user = document.getElementById('input-login').value;
  localStorage.setItem('user', JSON.stringify(await searchUser(user)));
  console.log(localStorage.getItem('user'));
  window.location.href = '../public/home.html';
});
