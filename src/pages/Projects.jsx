import { useEffect, useState } from 'react';
import config from '../config/config'

function Projects() {
	const [userInfo, setUserInfo] = useState({})
	const [userRepos, setUserRepos] = useState([])

	const fetch_data = async (url, saveTo) => {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			},
		});

		const data = await response.json();

		saveTo(data)
	}

	useEffect(() => {
		fetch_data(`https://api.github.com/users/${config.gh_account}`, setUserInfo)
		fetch_data(`https://api.github.com/users/${config.gh_account}/repos`, setUserRepos)
	}, [])

	useEffect(() => {
		console.log(userInfo)
		console.log(userRepos)
	}, [userInfo, userRepos])

	return (
		<div className="min-h-screen overflow-hidden transition-all bg-[url('../assets/background.jpg')]">
			<div className="max-w-6xl container mx-auto p-4 mt-6">
				<div className="relative rounded-lg shadow-2xl hover:scale-[102%] transition ease-in-out delay-150 duration-300 ">
					<div className="absolute inset-x-0 h-6 rounded-xl bg-white mx-10 top-1/2 animate-pulse"></div>
					<div className="backdrop-blur-lg p-4 rounded-xl">
						<div className="flex justify-between"> {/* justify-between */}
							<div className="flex"> {/* Left */}
								<div className="shadow-2xl">
									<img src={userInfo ? userInfo.avatar_url : ""} className="rounded-lg w-16 hover:scale-110 transition ease-in-out delay-150" alt="avatar" />
								</div>
								<div className="ml-4">
									<a href={userInfo && userInfo.html_url} className="text-2xl font-semibold mb-2 text-white hover:underline underline-offset-2">
										{userInfo ? userInfo.name : "Unknown"}
									</a>
									<div className="flex">
										<p className="text-gray-300 mr-2">
											Followers: {userInfo ? userInfo.followers : "N/A"}
										</p>
										<p className="text-gray-300">
											Following: {userInfo ? userInfo.following : "N/A"}
										</p>
									</div>
								</div>
							</div>
							<div className="text-right"> {/* Right */}
								<p className="text-gray-300 mt-2 ml-auto">
									{userInfo ? userInfo.location : "Unknown"} {userInfo ? new Date(userInfo.created_at).toLocaleDateString() : "Unknown"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='mt-6 backdrop-blur-lg p-4 rounded-xl'>
					{userRepos.map((repo, i) => (<>
						<div key={i} className="backdrop-blur-lg text-white p-2">
							{repo.name}
						</div>
					</>))}
				</div>
			</div>
		</div>
	);

}

export default Projects;