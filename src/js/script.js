async function teste(){
  console.log(await searchUser('pauloeduardodesordigomes@gmail.com'));
  console.log(await searchUser('pauloeduardods'));
  console.log(await (await fetch('https://api.github.com/repos/pauloeduardods/trybe-exercises/languages')).json())
}
//teste();
const buttonLogin = document.getElementById('button-login-github');

let userData = {};

buttonLogin.addEventListener('click', async () => {
  const user = document.getElementById('input-login').value; // Faz a validação desse dado aqui e depois joga na getUserData
  const userResult = await(searchUser(user));
  console.log(userResult)
});
