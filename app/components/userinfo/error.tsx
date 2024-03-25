"use client";
import React from "react";

export default function Error({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {
    
    return (           
        <aside className="mt-10 mx-auto bg-black/20 backdrop-blur-lg border-2 border-gray-500/50 text-white p-6 rounded-xl w-full max-w-lg font-mono">
            <div className="flex justify-between items-center">
                <div className="flex space-x-2 text-red-500">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <p className="text-sm w-5 h-2 bg-gray-600/50"></p>
            </div>
            <div className="mt-4">
                <p className="text-green-400">$ curl https://github.com/{process.env.NEXT_PUBLIC_GITHUB_USERNAME}.json</p>
                <p className="text-red-500">Error fetching data.</p>
            </div>
        </aside>
    );
};