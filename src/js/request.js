const searchUser = (name) => {
  if (!name) return false;
  let endpoint = `users/${name}`;
  if (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/g.test(name)) endpoint =`search/users?q=${name}`; // if (email) 
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

const userName = document.getElementById('user-name-input');
const userNameButton = document.getElementById('user-name-button');
userNameButton.addEventListener('click', async () => {
  //const value = await searchUser(userName.value);
  window.location.href = `./home.html?username=${userName.value}`;
  
})