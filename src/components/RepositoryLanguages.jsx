import React, { useEffect, useState } from 'react';

function GitHubLanguages({ username, repo, className, showAll, langs }) {
    const [languages, setLanguages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
		if (langs) {
            if (langs[0].language) setLanguages(langs)
			return setIsLoading(false)
		}

        fetch(`https://api.github.com/repos/${username}/${repo}/languages`)
            .then((response) => response.json())
            .then((data) => {
                // Convert the language data into an array of objects with language and percentage
                const totalBytes = Object.values(data).reduce((a, b) => a + b, 0);
                const languagesArray = Object.entries(data).map(([language, bytes]) => ({
                    language,
                    percentage: ((bytes / totalBytes) * 100).toFixed(2),
                }));
                setLanguages(languagesArray);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, [username, repo, langs]);

    return (
        <div className={className}>
            {showAll ? (<>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {languages.length === 0 && (
                            <div className="mb-2">

                                    <span className="px-2 shadow-xl font-medium text-red-400">No Languages</span>
                            </div>
                        )}
                        {languages.map((lang, index) => (
                            <div key={index} className="mb-2">
                                <div className="flex items-center">
                                    <div
                                        className={`h-4 rounded-md mr-2 ${getLanguageColor(lang.language, showAll)}`}
                                        style={{
                                            width: `${lang.percentage}%`,
                                        }}
                                    ></div>
                                    <span className="mr-2">{lang.language}</span>
                                    <div className="text-gray-600 text-sm">{lang.percentage}%</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </>) : (<>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="flex overflow-auto">
                        {languages.length === 0 && (
                            <div className="mb-2">
                                    <div
                                    className={`rounded-lg mr-2 bg-zinc-800/20 text-red-400`}
                                >
                                    <span className="px-2 shadow-xl font-medium">No Languages</span>
                                </div>
                            </div>
                        )}
                        {languages.map((lang, index) => (
                            <div key={index} className="mb-2">
                                    <div
                                        className={`rounded-lg mr-2 bg-zinc-800/20 ${getLanguageColor(lang?.language, showAll)}`}
                                    >
                                        <span className="px-2 shadow-xl font-medium">{lang.language}</span>
                                    </div>
                            </div>
                        ))}
                    </div>
                )}
            </>)}
        </div>
    );
}

// Define colors for specific languages (you can customize these)
function getLanguageColor(language, all) {
    switch (language?.toLowerCase()) {
        case 'javascript':
            return all ? 'bg-yellow-400' : 'text-yellow-400';
        case 'typescript':
            return all ? 'bg-cyan-400' : 'text-cyan-400';
        case 'python':
            return all ? 'bg-sky-400' : 'text-sky-400';
        case 'java':
            return all ? 'bg-orange-600' : 'text-orange-600';
        case 'kotlin':
            return all ? 'bg-violet-500' : 'text-violet-500';
        case 'html':
            return all ? 'bg-orange-500' : 'text-orange-500';
        case 'c++':
            return all ? 'bg-rose-500' : 'text-rose-500';
        case 'c':
            return all ? 'bg-stone-400' : 'text-stone-400';
        case 'c#':
            return all ? 'bg-emerald-400' : 'text-emerald-400';
        case 'lua':
            return all ? 'bg-blue-700' : 'text-blue-700';
        // Add more languages and colors as needed
        default:
            return all ? 'bg-stone-500' : 'text-stone-500'; // Default color
    }
}

export default GitHubLanguages;
