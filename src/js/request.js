const searchUser = async (name) => {
  await fetch(`https://api.github.com/users/${name}`)
  fetch(`https://api.github.com/users/${name}`).then((res) => res.json()).then(createElement)
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