const putInformation = ({ avatar_url, login, url, name }) => {
  const userAvatar = document.querySelector('.user__avatar');
  userAvatar.src = avatar_url;
}

const initialize = async (user) => {
  const userInformation = await searchUser(user);
  putInformation(userInformation);
}