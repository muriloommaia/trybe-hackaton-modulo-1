const putInformation = ({ avatar_url, login, html_url, name }) => {
  const userAvatar = document.querySelectorAll('.profile-photo');
  userAvatar[0].src = avatar_url;
  userAvatar[1].src = avatar_url;
  const nameInformation = document.querySelector('#name');
  nameInformation.innerText = `${name}`;
  const username = document.querySelector('.username-github');
  username.innerText = `   ${login}`;
  const userUrl = document.querySelector('#github-url');
  userUrl.href = html_url;
}

const getUserInformation = async () => {
  if (localStorage.user) putInformation(await searchUser(localStorage.user));
  else window.location.href = '../public/index.html';
}

getUserInformation();

const exit = document.querySelector('.button-exit');

exit.addEventListener('click', () => {
  localStorage.removeItem('user');
  window.location.href = '../public/index.html';
});
