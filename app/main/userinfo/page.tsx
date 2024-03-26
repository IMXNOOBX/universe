import React from "react";
import Image from "next/image";
import { MotionDiv } from "../../components/utils/animation";

async function getUserInfo(username: string = "") {
    if (!username)
        username = process.env.NEXT_PUBLIC_GITHUB_USERNAME as string;

    if (!username)
        throw new Error("NEXT_PUBLIC_GITHUB_USERNAME is not set in .env or .env.local");

    const res = await fetch(
        `http://localhost:3000/api/github`,// `https://api.github.com/users/${username}`,  
        { next: { revalidate: 0 }})// { next: { revalidate: parseInt(process.env.CACHE_TIME || "3600") }})

    return await res.json();
}

export default async function UserCard() {
    const userInfo = await getUserInfo();

    if (!userInfo)
        throw new Error("Error fetching data.");

    // if (Math.floor(Math.random() * 2) == 1)
    //     throw new Error("Manual Error fetching data.");

    const clean_since = (userInfo?.created_at) ? 
        userInfo.created_at.split('T')[0].replace(/-/g, "/") : 
            "very long ago";

    return (
        <MotionDiv initial="hidden" animate="visible" variants={{
            hidden: {
                opacity: 0,
                y: 10,
            },
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 2,
                }
            }
        }}
        >
            {/* Credits to https://uiverse.io/Yaya12085/soft-jellyfish-99 */}
            <aside className="mt-20 mx-auto bg-black/20 backdrop-blur-lg border-2 border-gray-500/50 text-white p-6 rounded-xl w-full font-mono">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-2 text-red-500">
                        <div className="w-3 h-3 rounded-full bg-red-500 hover:animate-pulse"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 hover:animate-pulse"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 hover:animate-pulse"></div>
                    </div>
                    <p className="text-sm">github</p>
                </div>
                <div className="mt-4 truncate">
                    <p className="text-green-400">$ curl https://github.com/{userInfo.name}.json</p>
                    <p className="text-white flex">{"{"}</p>
                    <p className="text-gray-500 flex ml-6">username: <span className="text-white ml-1">{userInfo.name}</span></p>
                    <p className="text-gray-500 flex ml-6">avatar: <Image className="rounded-lg ml-2" width={24} height={24} src={userInfo?.avatar_url} alt="user avatar" /></p>
                    <p className="text-gray-500 flex ml-6">blog: <span className="text-white ml-1 hover:underline"><a href={userInfo.blog} target="_blank" rel="noopener noreferrer">{userInfo?.blog}</a></span></p>
                    <p className="text-gray-500 flex ml-6">company: <span className="text-white ml-1">{userInfo?.company}</span></p>
                    <p className="text-gray-500 flex ml-6">bio: <span className="text-white ml-1">{userInfo?.bio}</span></p>
                    <p className="text-gray-500 flex ml-6">public repositories: <span className="text-white ml-1">{userInfo.public_repos}</span></p>
                    <p className="text-gray-500 flex ml-6">developer since: <span className="text-white ml-1">{clean_since}</span></p>
                    <p className="text-white flex">{"}"}</p>
                    <br />
                    <p className="text-white">found 1 user, following {userInfo.following} developers and followed by {userInfo.followers} enthusiast.</p>
                </div>
            </aside>
        </MotionDiv>
    );
};