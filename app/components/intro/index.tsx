"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

const Intro = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`static w-full flex transition-all duration-300 delay-300 flex-col mt-20 text-white/50 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-96'}`}>
            <h1 className="font-bold text-8xl opacity-100 text-border-2">IMXNOOBX</h1>
            <h2 className="font-bold text-3xl">Welcome to my website</h2>
            
            <aside className="mt-2 justify-center items-center bg-black/20 backdrop-blur-lg border-2 border-gray-500/50 text-white p-6 rounded-xl w-full max-w-lg font-mono">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-2 text-red-500">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <p className="text-sm">bash</p>
                </div>
                <div className="mt-4">
                    <p className="text-green-400">$ npm install next</p>
                    <p className="text-white">+ next@10.2.3</p>
                    <p className="text-white">added 1 package, and audited 2 packages in 3s</p>
                    <p className="text-green-400">$</p>
                </div>
            </aside>

        </div>
    );
};

export default Intro;