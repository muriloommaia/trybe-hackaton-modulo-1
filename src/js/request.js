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

const displayUserInformation = ({ avatar_url, login, html_url, name }) => {
  const userAvatar = document.querySelectorAll('.profile-photo');
  userAvatar[0].src = avatar_url;
  userAvatar[1].src = avatar_url;
  const nameInformation = document.querySelector('#name');
  nameInformation.innerText = `Olá ${name}!`;
  const username = document.querySelector('.username-github');
  username.innerText = `   ${login}`;
  const userUrl = document.querySelector('#github-url');
  userUrl.href = html_url;
}

const getUserInfo = async () => {
  const userName = localStorage.user;
  if (!userName) window.location.href = '../public/index.html';
  const result = await searchUser(userName);
  const followers = await searchInfo(result.followers_url); // get followers count
  const repo = await searchInfo(result.repos_url); // get repos
  const repoLanguages = await Promise.all(repo.map(async ({ name, description, languages_url, language}) => {
    const languages = await searchInfo(languages_url);
    return { name, description, language, languages };
  })); //get repo languages
  displayUserInformation(result);
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