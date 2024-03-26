export async function GET(req: Request) {

    // await new Promise(resolve => setTimeout(resolve, 2000));

    const json_response = {
        login: 'IMXNOOBXa',
        id: 69653071,
        node_id: 'MDQ6VXNlcjY5NjUzMDcx',
        avatar_url: 'https://avatars.githubusercontent.com/u/69653071?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/IMXNOOBX',
        html_url: 'https://github.com/IMXNOOBX',
        followers_url: 'https://api.github.com/users/IMXNOOBX/followers',
        following_url: 'https://api.github.com/users/IMXNOOBX/following{/other_user}',
        gists_url: 'https://api.github.com/users/IMXNOOBX/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/IMXNOOBX/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/IMXNOOBX/subscriptions',
        organizations_url: 'https://api.github.com/users/IMXNOOBX/orgs',
        repos_url: 'https://api.github.com/users/IMXNOOBX/repos',
        events_url: 'https://api.github.com/users/IMXNOOBX/events{/privacy}',
        received_events_url: 'https://api.github.com/users/IMXNOOBX/received_events',
        type: 'User',
        site_admin: false,
        name: 'IMXNOOBX',
        company: 'Academy Of Life',
        blog: 'https://imxnoobx.com',
        location: 'Earth',
        email: null,
        hireable: null,
        bio: '• hey hi! hope you have a great day! •ﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠ  \r\n' +
            '•> Hiii im noob!ﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠﾠ•> If you need help dm me <3',
        twitter_username: null,
        public_repos: 25,
        public_gists: 0,
        followers: 64,
        following: 25,
        created_at: '2020-08-13T21:26:43Z',
        updated_at: '2024-03-11T06:46:08Z'
    }

    return Response.json(json_response, { status: 200 })
}