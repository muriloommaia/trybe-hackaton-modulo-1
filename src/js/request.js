const exit = document.getElementById('button-exit');

exit.addEventListener('click', () => {
  localStorage.removeItem('user');
  window.location.href = '../public/index.html';
});

const searchUser = (name) => {
  if (!name) return false;
  let endpoint = `users/${name}`;
  if (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/g.test(name)) endpoint = `search/users?q=${name}`; // if (email) 
  return new Promise(async (resolve, reject) => {
    try {
      const result = await (await fetch(`https://api.github.com/${endpoint}`)).json();
      if (result.items && result.total_count) return resolve(result.items[0]); // check if it is email result
      return resolve(result);
    } catch (error) {
      return reject(new Error(error));
    }
  });
}

const searchInfo = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await (await fetch(url)).json();
      return resolve(result);
    } catch (error) {
      return reject(new Error(error));
    }
  });
}

const languageUsedPercentage = (languages, total, language) => {
  const result = Object.keys(languages).reduce((acc, currentLanguage) => ([
    ...acc,
    { [currentLanguage]: (languages[currentLanguage] / total * 100).toFixed(2) }]), []);
  if (language) {
    return result[result.indexOf(language)];
  }
  return result.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);
}

const displayUserInformation = ({ avatar_url, name, login, html_url, following, followers, languagesUsed, languagesUsedTotal }) => {
  const userAvatar = document.querySelectorAll('.profile-photo');
  userAvatar.forEach((user) => user.src = avatar_url);
  const nameInformation = document.querySelector('#name');
  nameInformation.innerText = `Olá ${name}!`;
  const username = document.querySelector('.username-github');
  username.innerText = `   ${login}`;
  const userfollowing = document.getElementById('following');
  userfollowing.innerHTML = following;
  const userfloowers = document.getElementById('followers'); 
  userfloowers.innerHTML = followers.length < 30 ? followers.length : '30+';
  const userUrl = document.querySelector('#github-url');
  userUrl.href = html_url;
  const languageContainer = document.getElementById('programming-language');
  languageUsedPercentage(languagesUsed, languagesUsedTotal).slice(0, 3).forEach((cur) => {
    const newElement = document.createElement('p');
    newElement.className = 'my-1';
    newElement.innerText = `${Object.entries(cur).join('').replace(',', ':  ')}%`
    languageContainer.appendChild(newElement)
  });
}

const getUserInfo = async () => {
  const userName = localStorage.user;
  if (!userName) window.location.href = '../public/index.html';
  const { followers_url, repos_url, avatar_url, name, login, html_url, following } = await searchUser(userName);
  const followers = await searchInfo(followers_url); // get followers count
  const repos = await searchInfo(repos_url); // get repos
  const reposInfo = await Promise.all(repos.map(async ({ name, description, languages_url, language, fork}) => {
    const languages = await searchInfo(languages_url);
    return { name, description, language, languages, fork };
  })); //get repo languages
  const languagesUsed = reposInfo.reduce((acc, currentLanguages) => {
    if (currentLanguages.fork) return acc;
    Object.keys(currentLanguages.languages).forEach((currentLanguage) => {
      if (!acc[currentLanguage]) acc[currentLanguage] = 0;
      acc[currentLanguage] = parseInt(acc[currentLanguage], 10) + parseInt(currentLanguages.languages[currentLanguage], 10);
    });
    return acc;
  }, {});
  const languagesUsedTotal = Object.keys(languagesUsed).reduce((acc, cur) => acc + parseInt(languagesUsed[cur], 10), 0) //sum
  displayUserInformation({ avatar_url, name, login, html_url, following, followers, languagesUsed, reposInfo, languagesUsedTotal });
}
getUserInfo();
