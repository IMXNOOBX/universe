import React from "react";

export default function Loading() {
    return (
        <aside 
            className="mt-20 mx-auto opacity-0 animate-fade-in bg-black/20 backdrop-blur-lg border-2 border-gray-500/50 text-white p-6 rounded-xl w-full font-mono"
            >
            <div className="flex justify-between items-center">
                <div className="flex space-x-2 text-red-500">
                    <div className="w-3 h-3 rounded-full bg-red-500 hover:animate-pulse"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 hover:animate-pulse"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 hover:animate-pulse"></div>
                </div>
                <p className="text-sm">github</p>
            </div>
            <div className="mt-4 truncate">
                <p className="text-green-400">$ curl https://github.com/{process.env.NEXT_PUBLIC_GITHUB_USERNAME}.json</p>
                <p className="text-white flex">{"{"}</p>
                <p className="text-gray-500 flex ml-6">username: <span className="text-white ml-1 bg-gray-600 animate-pulse rounded-md w-28 my-1"></span></p>
                <p className="text-gray-500 flex ml-6">avatar: <span className="rounded-md ml-2 bg-gray-600 animate-pulse w-40 my-1" /></p>
                <p className="text-gray-500 flex ml-6">blog: <span className="text-white ml-1 bg-gray-600 animate-pulse rounded-md w-60 my-1"></span></p>
                <p className="text-gray-500 flex ml-6">company: <span className="text-white ml-1 bg-gray-600 animate-pulse rounded-md w-32 my-1"></span></p>
                <p className="text-gray-500 flex ml-6">bio: <span className="text-white ml-1 bg-gray-600 animate-pulse rounded-md w-72 my-1"></span></p>
                <p className="text-gray-500 flex ml-6">public repositories: <span className="text-white ml-1 bg-gray-600 animate-pulse rounded-md w-10 my-1"></span></p>
                <p className="text-gray-500 flex ml-6">developer since: <span className="text-white ml-1 bg-gray-600 animate-pulse rounded-md w-32 my-1"></span></p>
                <p className="text-white flex">{"}"}</p>
            </div>
        </aside>
    );
};