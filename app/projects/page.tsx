import ProjectCard from "@/app/projects/card/index";

async function getProjects(username: string = "") {
    if (!username)
        username = process.env.NEXT_PUBLIC_GITHUB_USERNAME as string;

    if (!username)
        throw new Error("NEXT_PUBLIC_GITHUB_USERNAME is not set in .env or .env.local");

    const res = await fetch(
        `http://localhost:3000/api/github/repos`,// `https://api.github.com/users/${username}`,  
        { next: { revalidate: 0 } })// { next: { revalidate: parseInt(process.env.CACHE_TIME || "3600") }})

    return await res.json();
}

export default async  function Projects() {
    let repos = await getProjects();
    /* Short them by stars */
    repos = repos.sort((r: any, o: any) => o.stargazers_count - r.stargazers_count)

  return (
    <div className="relative w-full grid md:grid-cols-2 xl:grid-cols-3 gap-8 text-white my-20 pb-20 animate-fade-in">
        {repos.map((repo: any, i: number) => (
            <div key={i}>
                <ProjectCard project={repo} index={i} />
            </div>
        ))}
    </div>
  );
}
