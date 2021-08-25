const buttonLogin = document.querySelector('.button-login-github');

let userData = {};

const getUserData = async (user) => {
  const fetchGithub = await fetch(`https://api.github.com/users/${user}`);
  const userObject = await fetchGithub.json();
  return userObject;
}

buttonLogin.addEventListener('click', async () => {
  const user = document.querySelector('.input-login').value; // Faz a validação desse dado aqui e depois joga na getUserData
  userData = await getUserData(user);
  console.log(userData);
});
