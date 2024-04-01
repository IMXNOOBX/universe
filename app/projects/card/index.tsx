import React from "react";
import Image from "next/image";
import Teste from "@/public/assets/nightcatto.jpg"
import Fork from "@/public/assets/fork.png";
import { MotionDiv } from "@/app/components/utils/animation";
import Url from "@/app/components/utils/Url";

export default async function ProjectCard({ project, index }: { project: any, index: number }) {
    const clean_name = project.name.replace(/-/g, " ");

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
                        delay: index * 0.1
                    }
                }
            }}
        >
            <div className={`bg-zinc-800/50 border ${project.archived ? 'border-yellow-400/50' : 'border-zinc-700/50'}  backdrop-blur-lg p-4 rounded-2xl group animate-bounds-jump`}>
                {/* Image and title block */}
                <div className="relative flex overflow-hidden">
                    <Image className="rounded-lg w-full h-40 aspect-video" src={Teste} alt={project.name} />
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
                        className="absolute flex w-full m-2 -ml-2 pl-4 bottom-2 opacity-0 transition delay-100 duration-300 translate-y-20 group-hover:opacity-100 group-hover:translate-y-0"
                        >
                        <div className="text-xs mt-auto">
                            {project.archived && <div className="text-yellow-300 drop-shadow-[#FFFF00_0px_0px_5px]">Archived</div>}
                            {project.language}
                        </div>
                        {project.forks != 0 && (
                            <div className="ml-auto flex items-center gap-1">
                                {project.forks}
                                <Image src={Fork} alt="forks" className="w-4 h-4" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Body of the card */}
                <div className="mt-2">
                    {/* Description */}
                    <div className="rounded-lg bg-zinc-800/50 p-1">
                        {project.description}
                    </div>
                </div>
            </div>
        </MotionDiv>
    );
};