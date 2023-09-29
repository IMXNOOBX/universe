import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

import timeSince from '../utils/timeUtils'; // Adjust the path as needed
import config from '../config/config';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function Home() {
	const [userInfo, setUserInfo] = useState({})

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
		fetch_data(`https://api.github.com/users/${config.gh.account}`, setUserInfo)
	}, [])

	return (
		<div className="min-h-screen bg-zinc-900 protfolio-background relative">
			{/* Overlay */}
			<div className="absolute inset-0 bg-black opacity-30"></div>

			{/* Hero content */}
			<div className='absolute inset-0 backdrop-blur-sm'>
				<NavBar className="backdrop-blur-lg mx-4 lg:mx-auto mt-6 max-w-5xl rounded-xl bg-zinc-900/30" />
				<div className="flex flex-col mt-20 items-center text-white">
					{/* <h1 className="text-5xl font-bold">{config.gh.account}</h1> */}
					<h1 className="text-5xl font-bold">
						<TypeAnimation
							sequence={[
								config.gh.account,
								10000, 
								`Welcome to ${config.web.name}`,
								1000
							]}
							wrapper="span"
							speed={{type: "keyStrokeDelayInMs", value: 200}}
							style={{ display: 'inline-block' }}
							repeat={Infinity}
						/>
					</h1>
				</div>

				<div className="relative rounded-lg mt-16 bg-zinc-900/40 max-w-3xl mx-auto transform transition-transform ease-in-out duration-300 hover:glowing">
					<div className="backdrop-blur-lg p-4 rounded-xl">
						<div className="flex justify-between">
							{/* justify-between */}
							<div className="flex">
								{/* Left */}
								<div className="shadow-2xl">
									<img
										src={userInfo ? userInfo.avatar_url : ""}
										className="rounded-lg w-16 hover:scale-110 transition ease-in-out delay-150"
										alt="avatar"
									/>
								</div>
								<div className="ml-4">
									<Link
										to={userInfo && userInfo.html_url}
										className="text-2xl font-semibold mb-2 text-white hover:underline underline-offset-2"
									>
										{userInfo ? userInfo.name : "Unknown"}
									</Link>
									{userInfo?.twitter_username && (
										<a href={`http://x.com/${userInfo.twitter_username}`} target="_blank" rel="noopener noreferrer">x</a>
									)}
									<div className="flex">
										<p className="text-gray-300 mr-2">
											Followers:{" "}
											<span className="font-medium text-green-500">
												{userInfo ? userInfo.followers : "N/A"}
											</span>
										</p>
										<p className="text-gray-300">
											Following:{" "}
											<span className="font-medium text-blue-500">
												{userInfo ? userInfo.following : "N/A"}
											</span>
										</p>
									</div>
								</div>

							</div>
							<div className="text-right">
								{/* Right */}
								<p className="text-zinc-400 mt-2 ml-auto">
									{userInfo.created_at
										? new Date(userInfo.updated_at).toLocaleDateString()
										: "Unknown"}
								</p>
								{userInfo?.location && (
									<p className="text-white font-medium">
										{userInfo?.location || ""}
									</p>
								)}
							</div>
						</div>
						{userInfo?.bio && (
							<div className='my-2 bg-zinc-900/40 p-2 rounded-lg text-white'>
								<div className="font-bold">
									Bio
								</div>
								<div className="">
									{userInfo.bio}
								</div>
							</div>
						)}
						<div className='mt-2 bg-zinc-900/40 p-2 rounded-lg text-white'>
							{userInfo.company && (
								<div>
									<span className='text-zinc-400'>Company:</span> {userInfo.company}
								</div>
							)}
							{userInfo.blog && (
								<div>
									<span className='text-zinc-400'>Blog:</span>{' '}
									<a href={userInfo.blog} className="underline" target="_blank" rel="noopener noreferrer">
										{userInfo.blog}
									</a>
								</div>
							)}
							<div>
								<span className='text-zinc-400'>Repositories:</span> {userInfo.public_repos || 0}
							</div>
							{userInfo.public_gists !== 0 && (
								<div>
									<span className='text-zinc-400'>Gists:</span> {userInfo.public_gists}
								</div>
							)}
							{userInfo.created_at && (
								<div>
									<span className='text-zinc-400'>In Github since:</span> {new Date(userInfo.created_at).toLocaleDateString()} (<span className='text-sm'>{timeSince(userInfo.created_at)}</span>)
								</div>
							)}
						</div>

					</div>
				</div>
			</div>
			<Footer className="absolute bottom-0 bg-zinc-900/40 w-full" />
		</div>
	);
}

export default Home;
