const buttonLogin = document.querySelector('.button-login-github');

let userData = {};

buttonLogin.addEventListener('click', async () => {
  const user = document.querySelector('.input-login').value;
  const fetchGithub = await fetch(`https://api.github.com/users/${user}`);
  userData = await fetchGithub.json();
});

module.exports = { userData };
