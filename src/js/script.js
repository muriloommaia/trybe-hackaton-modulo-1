const buttonLogin = document.querySelector('.button-login-github');

let userData = {};

const getUserData = (user) => {
  const fetchGithub = await fetch(`https://api.github.com/users/${user}`);
  const userObject = await fetchGithub.json();
  return userObject;
}

buttonLogin.addEventListener('click', async () => {
  const user = document.querySelector('.input-login').value;
  userData = await getUserData(user);
});

module.exports = { userData };
