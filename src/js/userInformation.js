const putInformation = ({ avatar_url, login, html_url, name }) => {
  let userAvatar = document.querySelector('.user__avatar');
  userAvatar.src = avatar_url;
  userAvatar = document.querySelector('.user__information__avatar');
  userAvatar.src = avatar_url;
  const nameInformation = document.querySelector('#name');
  nameInformation.innerText = `Olá ${name}!`;
  const username = document.querySelector('.username-github');
  username.innerText = `   ${login}`;
  const userUrl = document.querySelector('#github-url');
  userUrl.href = html_url;
}

const userInformation = JSON.parse(localStorage.getItem('user'));

putInformation(userInformation);