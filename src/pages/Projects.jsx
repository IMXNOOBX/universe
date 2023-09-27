import { useEffect, useState, useRef } from 'react';
import { Dna, Circles } from 'react-loader-spinner'
import RepoLangs from "../components/RepositoryLanguages"
import config from '../config/config'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Star from '../assets/icons8-star-48.png'
import StarG from '../assets/icons8-star.gif'
import Loading from '../assets/icons8-loading-infinity.gif'

function Projects() {
	const [userRepos, setUserRepos] = useState([])
	const [sortedRepos, setSortedRepos] = useState([])
	const [expandedRepo, setExpandedRepo] = useState(null);
	const expandedRepoRef = useRef(null);

	const fetch_data = async (url, saveTo) => {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json'
			},
		});

		const data = await response.json();

		if (data?.message)
			console.error(data?.message)

		saveTo(data)
	}

	useEffect(() => {
		// fetch_data(`https://api.github.com/users/${config.gh.account}`, setUserInfo)
		fetch_data(`https://api.github.com/users/${config.gh.account}/repos`, setUserRepos)
	}, [])

	useEffect(() => {
		// const sortedRepos = [...userRepos].sort((r, o) => o.stargazers_count - r.stargazers_count);
		let intervalId
		if (Array.isArray(userRepos)) {
			setSortedRepos(userRepos.sort((r, o) => o.stargazers_count - r.stargazers_count));

			if (intervalId)
				clearInterval(intervalId)
		} else {
			intervalId = setInterval(() => {
				fetch_data(`https://api.github.com/users/${config.gh.account}/repos`, setUserRepos)
			}, 5000)
		}

		return () => clearInterval(intervalId)
	}, [userRepos])

	useEffect(() => {
		const clickHandler = ({ target }) => {
			if (expandedRepo && expandedRepoRef.current && !expandedRepoRef.current.contains(target)) {
				setExpandedRepo(null);
			}
		};
		document.addEventListener("click", clickHandler);
		return () => document.removeEventListener("click", clickHandler);
	}, [expandedRepo, expandedRepoRef]);

	// close the mobile menu if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }) => {
			// eslint-disable-next-line
			if (expandedRepo && keyCode == 27) setExpandedRepo(null);
		};

		document.addEventListener("keydown", keyHandler);
		return () => document.removeEventListener("keydown", keyHandler);
	}, [expandedRepo]);

	return (
		<div className="min-h-screen overflow-auto transition-all bg-zinc-800 protfolio-background relative">
			<div className="absolute inset-0 bg-black opacity-20 h-full"></div>

			<div className='inset-0 mb-20'>
				<NavBar className="backdrop-blur-lg mx-4 lg:mx-auto mt-6 max-w-5xl rounded-xl bg-zinc-900/40" />

				<div className="max-w-6xl mx-auto p-4">
					{!Array.isArray(userRepos) ? (<>
						<div className="flex flex-col items-center justify-center h-96 mt-40 backdrop-blur-sm">
							<Dna
								visible={true}
								height="150"
								width="150"
								ariaLabel="dna-loading"
								wrapperStyle={{}}
								wrapperClass="dna-wrapper"
							/>
							<div className='block mt-4 text-center text-white'>
								Api is been slower than usual, check the console for errors if this persists
							</div>
						</div>
					</>) : (<>
						{userRepos.length == 0 && (<>
							<div className='flex flex-col mt-40 h-96 backdrop-blur-sm bg-zinc-900/50'>
								<div className='text-white text-center mt-20 p-4 font-bold'>
									This user has no public repositories, Here is a cool spinner instead
								</div>
								<div className='mx-auto'>
									<Circles
										height="150"
										width="150"
										color="#81F8D6"
										ariaLabel="circles-loading"
										wrapperStyle={{}}
										wrapperClass=""
										visible={true}
									/>
								</div>
							</div>
							</>)}
						<div className={`mt-4 shadow-sm backdrop-blur-lg p-4 rounded-xl grid gap-4 grid-cols-1 ${sortedRepos.length > 3 ? "md:grid-cols-3" : ""} ${sortedRepos.length == 0 && "hidden"}`}>
							{sortedRepos.map((repo, i) => (<>
								{/*${expandedRepo === repo && "row-span-2 scale-[102%]"}*/}
								<div
									key={i}
									className={`bg-zinc-800/20 text-white p-2 rounded-lg hover:scale-[102%] transition-all ease-in-out delay-150 duration-300 ${(sortedRepos.length > 3 && i < 3) ? "md:col-span-3" : ""} ${expandedRepo === repo && "{/*row-span-2*/} scale-[102%]"}`}
									onClick={() => setExpandedRepo(repo)}
									ref={expandedRepo === repo ? expandedRepoRef : null}
								>
									<div className="flex">
										<a rel="noreferrer" target="_blank" href={repo.html_url} className="text-xl underline underline-offset-1 text-indigo-400 group font-bold">
											{repo.name}
										</a>
										{repo.archived && (<span className="px-2 py-0 my-1 ml-2 rounded-xl bg-yellow-500 border-2 border-yellow-400 text-xs">
											Archived
										</span>)}
										<a rel="noreferrer" target="_blank" href={repo.html_url + "/stargazers"} className="flex ml-auto group">
											<img className="w-6 h-6 mr-1 group-hover:scale-120 group-hover:hidden group-hover:translate-x-6 transition ease-in-out delay-150 duration-100" src={Star} alt="Star" /> {/*Show default*/}
											<img className="w-6 h-6 mr-1 hidden group-hover:block group-hover:translate-x-4 transition ease-in-out delay-150 duration-100" src={StarG} alt="Star" /> {/*Show when hover*/}

											<span className="group-hover:invisible">{repo.stargazers_count}</span>
										</a>
									</div>
									<div className={`${repo.topics.length < 1 ? "hidden" : "mt-2 max-w-sm break-words"}`}> {/* skip if there are too many topics */}
										{repo.topics?.slice(0, 4).map((topic, i) => (
											<span
												key={i}
												className={`bg-blue-500 border border-blue-400 px-1 rounded-lg ${i < 3 ? "mr-1" : ""}`}
											>
												{topic}
											</span>
										))}
										{repo.topics?.length > 3 && <span className="text-gray-400 pl-1">...</span>}
									</div>
									<div className="mt-2 bg-zinc-900/40 p-2 rounded-lg">
										{repo.description || "There is no description for this repository."}
									</div>
									<div className={`${expandedRepo === repo && "bg-zinc-900/40 mt-2 p-2"} rounded-lg `}>
										{expandedRepo === repo ? (<>
											<span className='mt-2'>Languages</span>
											<RepoLangs username={config.gh.account} repo={repo.name} className={"mt-2 flex-wrap h-auto"} showAll={expandedRepo === repo} />
										</>) : (<>
											<RepoLangs langs={[{ language: repo.language }]} className={"mt-2 flex-wrap h-auto"} />
										</>)}
									</div>
								</div>
							</>))}
						</div>
					</>)}
				</div>
			</div>
			<Footer className="absolute bottom-0 bg-zinc-900/40 w-full mb-0 mt-4" />
		</div>
	);

}

export default Projects;