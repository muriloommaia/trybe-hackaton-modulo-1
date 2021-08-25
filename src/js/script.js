async function teste(){
  console.log(await searchUser('pauloeduardodesordigomes@gmail.com'));
  console.log(await searchUser('pauloeduardods'));
}
teste();
const buttonLogin = document.getElementById('button-login-github');

let userData = {};

buttonLogin.addEventListener('click', async () => {
  const user = document.getElementById('input-login').value;
  console.log('Ai');
  await initialize(user);
});
