import React from "react";
import Image from "next/image";
import Teste from "@/public/assets/nightcatto.jpg"
import Fork from "@/public/assets/fork.png";
import { MotionDiv } from "@/app/components/utils/animation";
import Url from "@/app/components/utils/Url";

export default async function ProjectCard({ project, index }: { project: any, index: number }) {
    const clean_name = project.name.replace(/-/g, " ");
    const card_banner = `https://opengraph.githubassets.com/1/${project.full_name}`;

    return (
        <MotionDiv
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {
                    opacity: 0,
                    y: 10,
                },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 2,
                        delay: index * 0.2
                    }
                }
            }}
        >
            <div className={`bg-zinc-800/50 border overflow-hidden ${project.archived ? 'border-yellow-400/50' : 'border-zinc-700/50'}  backdrop-blur-lg p-4 rounded-2xl group animate-bounds-jump`}>
                {/* Image and title block */}
                <div className="relative flex overflow-hidden">
                    <Image className="rounded-lg object-cover brightness-50 ransition duration-300 group-hover:brightness-100 group-hover:object-top h-40 aspect-video" src={card_banner} width={1600} height={600} /* onError={(e) => e.currentTarget.src = Teste.toString()} */ alt={project.name} />
                    <div className="absolute top-2 left-2 backdrop-blur-lg bg-zinc-800/30 border border-zinc-700/30 rounded-lg px-2 py-1">
                        {clean_name}
                    </div>
                    {project.stargazers_count > 0 && ( // Only show stars if there are any
                        <div className="absolute top-2 right-2 backdrop-blur-lg bg-yellow-800/30 border border-yellow-700/30 rounded-xl px-2 py-1">
                            {project.stargazers_count}
                        </div>
                    )}
                    {/* Show on hover data, such as language, topics, license & etc */}
                    <div 
                        className="absolute flex w-full m-2 -ml-2 pl-4 bottom-0 opacity-0 transition delay-100 duration-300 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0"
                        >
                        <div className="flex w-full px-1 rounded-lg border transition duration-300 border-white/0 group-hover:border-zinc-700/50 group-hover:backdrop-blur-sm group-hover:bg-zinc-700/40">
                            <div className="text-xs my-1">
                                {project.archived && <div className="text-yellow-300 drop-shadow-[#FFFF00_0px_0px_5px]">Archived</div>}
                                {project.language || "Markdown"}
                            </div>
                            {project.forks != 0 && (
                                <div className="ml-auto flex items-center gap-1">
                                    {project.forks}
                                    <Image src={Fork} alt="forks" className="w-4 h-4" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Body of the card */}
                <div className="mt-2">
                    {/* Links & Tags */}
                    <div className="flex flex-row">
                        <Url 
                            url={project.html_url} 
                            target="_blank" rel="noopener noreferrer"
                        >
                            {clean_name}
                        </Url>
                        <div className="flex flex-row gap-2 ml-auto min-w-0">
                            {project.topics.slice(0, 3).map((topic: string, index: number) => (
                                <div key={index} className="rounded-lg h-min text-xs bg-zinc-700/50 border border-zinc-700/50 transition duration-300 hover:border-zinc-100/50 px-1 py-auto truncate">
                                    {topic}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="rounded-lg bg-zinc-800/50 p-1 mt-2">
                        {project.description}
                    </div>
                </div>
            </div>
        </MotionDiv>
    );
};