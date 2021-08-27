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
  userfloowers.innerHTML = followers.length;
  const userUrl = document.querySelector('#github-url');
  userUrl.href = html_url;
  const languageContainer = document.getElementById('programming-language');
  languageUsedPercentage(languagesUsed, languagesUsedTotal).slice(0, 3).forEach((cur) => {
    const newElement = document.createElement('p');
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

`{
    "login": "pauloeduardods",
    "id": 69918154,
    "node_id": "MDQ6VXNlcjY5OTE4MTU0",
    "avatar_url": "https://avatars.githubusercontent.com/u/69918154?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/pauloeduardods",
    "html_url": "https://github.com/pauloeduardods",
    "followers_url": "https://api.github.com/users/pauloeduardods/followers",
    "following_url": "https://api.github.com/users/pauloeduardods/following{/other_user}",
    "gists_url": "https://api.github.com/users/pauloeduardods/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/pauloeduardods/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/pauloeduardods/subscriptions",
    "organizations_url": "https://api.github.com/users/pauloeduardods/orgs",
    "repos_url": "https://api.github.com/users/pauloeduardods/repos",
    "events_url": "https://api.github.com/users/pauloeduardods/events{/privacy}",
    "received_events_url": "https://api.github.com/users/pauloeduardods/received_events",
    "type": "User",
    "site_admin": false,
    "name": "Paulo Eduardo de Sordi Gomes",
    "company": null,
    "blog": "",
    "location": "Brazil ",
    "email": null,
    "hireable": true,
    "bio": "Studying web development at Trybe",
    "twitter_username": null,
    "public_repos": 11,
    "public_gists": 0,
    "followers": 21,
    "following": 24,
    "created_at": "2020-08-19T17:29:09Z",
    "updated_at": "2021-08-24T13:20:43Z"
}`