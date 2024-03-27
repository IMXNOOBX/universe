"use client";
export default function Error({
    error,
    reset,
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {
    return (           
        <aside 
            className="mt-20 mx-auto animate-fade-in bg-black/20 backdrop-blur-lg border-2 border-gray-500/50 text-white p-6 rounded-xl w-full font-mono"
        >
        <div className="flex justify-between items-center">
            <div className="flex space-x-2 text-red-500">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 hover:animate-pulse"></div>
            </div>
            <p className="text-sm text-red-500">error</p>
        </div>
        <div className="mt-4 truncate">
            <p className="text-green-500">❌ curl https://github.com/{process.env.NEXT_PUBLIC_GITHUB_USERNAME}.json</p>
            <p className="text-white flex">{"{"}</p>
            <p className="text-red-400 flex ml-6">error: <span className="text-gray-500 ml-1 animate-pulse">{error.message || 'Could not find any information'}</span></p>
            <p className="text-red-400 flex ml-6">message: <span className="text-gray-500 ml-1">Something went wrong while searching the information 🤯</span></p>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p className="text-green-400 flex ml-6">fix: <span className="text-white ml-1 hover:underline cursor-pointer" onClick={() => reset()}>Let's try fixing it.</span></p>
            <p className="text-white flex">{"}"}</p>
        </div>
    </aside>
    );
};