import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Dna, Circles, MutatingDots } from 'react-loader-spinner'
import RepoLangs from "../components/RepositoryLanguages"
import PaginationControls from "../components/PaginationControls"
import config from '../config/config'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Star from '../assets/icons8-star-48.png'
import StarG from '../assets/icons8-star.gif'
import Fork from '../assets/icons8-code-fork-50.png'

function Projects() {
	const { page } = useParams();
	const currentPage = parseInt(page) || 1;

	console.log(currentPage)

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

		// Calculate start and end indices for the displayed repositories
		const startIndex = (currentPage - 1) * config.gh.repos_per_page;
		const endIndex = startIndex + config.gh.repos_per_page;

		let intervalId
		if (Array.isArray(userRepos)) {
			const shoted_repos = userRepos.sort((r, o) => o.stargazers_count - r.stargazers_count)
			const visibleRepos = shoted_repos.slice(startIndex, endIndex);
			setSortedRepos(visibleRepos);


			if (intervalId)
				clearInterval(intervalId)
		} else {
			intervalId = setInterval(() => {
				fetch_data(`https://api.github.com/users/${config.gh.account}/repos`, setUserRepos)
			}, 5000)
		}

		return () => clearInterval(intervalId)
	}, [userRepos, currentPage])

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
						{userRepos.length === 0 && (<>
							<div className='flex flex-col mt-40 h-96 backdrop-blur-sm bg-zinc-900/50 rounded-lg'>
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
						{sortedRepos.length === 0 && (<>
							<div className='flex flex-col mt-40 h-96 backdrop-blur-sm bg-zinc-900/50 rounded-lg'>
								<div className='text-white text-center mt-20 p-4 font-bold'>
									There are no more repositories here, Here is a cool spinner instead
								</div>
								<div className='mx-auto'>
									<MutatingDots
										height="100"
										width="100"
										color="#5E33FF"
										secondaryColor='#8D33FF'
										radius='12.5'
										ariaLabel="mutating-dots-loading"
										wrapperStyle={{}}
										wrapperClass=""
										visible={true}
									/>
								</div>
								<div className="p-2 px-4 mt-4 mx-auto bg-indigo-800 rounded-lg text-white font-medium">
									<Link to={`/`}>Go Home</Link>
								</div>
							</div>
						</>)}
						<div className={`mt-4 shadow-sm backdrop-blur-lg p-4 rounded-xl grid gap-4 grid-cols-1 ${sortedRepos.length > 3 ? "md:grid-cols-3" : ""} ${sortedRepos.length === 0 && "hidden"}`}>
							{sortedRepos.map((repo, i) => (<>
								{/*${expandedRepo === repo && "row-span-2 scale-[102%]"}*/}
								<div
									key={i}
									className={`bg-zinc-800/40 text-white p-2 rounded-lg hover:scale-[102%] transition-all ease-in-out delay-150 duration-300 shadow-sm ${(sortedRepos.length > 3 && i < 3) ? "md:col-span-3" : ""} ${expandedRepo === repo && "scale-[102%]"}`}
									onClick={() => setExpandedRepo(repo)}
									ref={expandedRepo === repo ? expandedRepoRef : null}
								>
									<div className="flex">
										<a rel="noreferrer" target="_blank" href={repo.html_url} className="text-xl underline underline-offset-1 text-indigo-400 group font-bold truncate">
											{repo.name}
										</a>
										{repo.archived && (<span className="px-2 py-0 my-1 ml-2 rounded-xl bg-yellow-500/50 border-2 border-yellow-400 text-xs">
											Archived
										</span>)}
										{repo.fork && (<span className="px-2 py-0 my-1 ml-2 rounded-xl bg-cyan-500/50 border-2 border-cyan-400 text-xs">
											Fork
										</span>)}
										{repo.is_template && (<span className="px-2 py-0 my-1 ml-2 rounded-xl bg-green-500/50 border-2 border-green-400 text-xs">
											Template
										</span>)}
										{repo.forks_count !==
										 0 && (
											<a rel="noreferrer" target="_blank" href={repo.html_url + "/stargazers"} className="flex ml-auto mr-2">
												<img className="w-6 h-6 mr-1 group-hover:scale-120 group-hover:hidden group-hover:translate-x-6 transition ease-in-out delay-150 duration-100" src={Fork} alt="Fork" /> {/*Show default*/}
												<span className="group-hover:invisible">{repo.forks_count}</span>
											</a>
										)}
										<a rel="noreferrer" target="_blank" href={repo.html_url + "/stargazers"} className={`${repo.forks_count === 0 && "ml-auto"} flex group`}>
											<img className="w-6 h-6 mr-1 group-hover:scale-120 group-hover:hidden group-hover:translate-x-6 transition ease-in-out delay-150 duration-100" src={Star} alt="Star" /> {/*Show default*/}
											<img className="w-6 h-6 mr-1 hidden group-hover:block group-hover:translate-x-4 transition ease-in-out delay-150 duration-100" src={StarG} alt="Star" /> {/*Show when hover*/}

											<span className="group-hover:invisible">{repo.stargazers_count}</span>
										</a>
									</div>
									<div className={`${repo.topics.length < 1 ? "hidden" : "mt-2 max-w-sm break-words"}`}> {/* skip if there are too many topics */}
										{repo.topics?.slice(0, 4).map((topic, i) => (
											<span
												key={i}
												className={`bg-blue-600/50 border border-blue-400 px-1 text-center align-middle text-sm pb-1 rounded-lg ${i < 3 ? "mr-1" : ""}`}
											>
												{topic}
											</span>
										))}
										{repo.topics?.length > 3 && <span className="text-gray-400 pl-1">...</span>}
									</div>
									<div className="mt-2 bg-zinc-900/50 p-2 rounded-lg">
										{repo.description || "There is no description for this repository."}
									</div>
									<div className={`${expandedRepo === repo && "bg-zinc-900/40 mt-2 p-2"} rounded-lg`}>
										{expandedRepo === repo ? (<>
											<span className='mt-2'>Languages</span>
											<RepoLangs username={config.gh.account} repo={repo.name} className={"mt-2 flex-wrap h-auto"} showAll={expandedRepo === repo} />
										</>) : (<>
											<RepoLangs langs={[{ language: repo?.language }]} className={"mt-2 flex-wrap h-auto"} />
										</>)}
									</div>
									{expandedRepo === repo && (<>
										<div className='bg-zinc-900/40 mt-2 p-2 rounded-lg'>
											{repo.license && (<>
												<div className='text-zinc-400'>
													License: {" "}
													<a className='text-white hover:text-sky-400' rel="noreferrer" href={repo.license.url}>({repo.license.key}){repo.license.name}</a>
												</div>
											</>)}
											{repo.homepage && (<>
												<div className='text-zinc-400 truncate'>
													HomePage: {" "}
													<a className='text-white hover:text-sky-400' rel="noreferrer" href={repo.homepage}>{repo.homepage}</a>
												</div>
											</>)}
											{repo.open_issues !== 0 && (<>
												<div className='text-zinc-400'>
													Open Issues: <span className='text-white'>{repo.open_issues}</span>
												</div>
											</>)}
											{repo.watchers !== 0 && (<>
												<div className='text-zinc-400'>
													Watchers: <span className='text-white'>{repo.watchers}</span>
												</div>
											</>)}
											{repo.default_branch && (<>
												<div className='text-zinc-400 truncate'>
													Branch: <span className='text-white'>{repo.default_branch}</span>
												</div>
											</>)}
										</div>
									</>)}
								</div>
							</>))}
						</div>
							<PaginationControls
								className="relative flex z-auto m-2 mt-6 bottom-0 text-white"
								currentPage={currentPage}
								totalPages={Math.ceil(userRepos.length / config.gh.repos_per_page)}
							/>
					</>)}
				</div>
			</div>
			<Footer className="absolute bottom-0 bg-zinc-900/40 w-full mb-0 mt-4" />
		</div>
	);

}

export default Projects;