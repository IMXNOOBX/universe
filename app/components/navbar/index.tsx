"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Profile from "./profiles";
import Pfp from "@/public/assets/pfp.png";
import Cattopfp from "@/public/assets/cattopfp.jpg";
import Nightcattofpf from "@/public/assets/nightcatto.jpg";
import Github from "@/public/assets/github-white.svg";
import Discord from "@/public/assets/discord-white.svg";
import Openlayout from "@/public/assets/openlayout.svg";
import Link from "next/link";

const Navbar = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <nav className="w-full sticky top-0 md:px-32 px-10">
            {/* Left side, navbar and routes buttons */}
            <div className={`lg:flex items-center relative transition-opacity overflow-hidden ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                <div
                    className={`relative transition-all duration-300 ease-in-out mr-auto lg:w-2/6 lg:hover:w-full group/nav m-4 bg-gray-600/10 backdrop-blur-lg rounded-2xl border-2 border-gray-700/50 p-2 z-10 ${
                        loaded ? 'translate-x-0' : '-translate-x-full'
                    }`}
                    onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                        // (e.target as HTMLDivElement).style.transitionDelay = '0s';
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                        // (e.target as HTMLDivElement).style.transitionDelay = '1s';
                    }}
                >
                    <div className="flex">
                        <Image src={Pfp} className="w-14 rounded-xl border-2 border-gray-700/50 transition duration-300 hover:scale-105 group-hover/nav:-translate-x-4 hover:shadow-lg" alt="icon" />
                        <div className="flex flex-col justify-center ml-2">
                            <div className="flex">
                                <h1 className="opacity-0 text-2xl w-0 font-bold transition duration-300 group-hover/nav:opacity-100 group-hover/nav:">My</h1>
                                <h1 className="text-2xl font-bold text-white transition group-hover/nav:translate-x-10">Universe</h1>
                            </div>
                            {/* Add random phoetical phrase */}
                            <p className="text-gray-300 hidden md:block w-3/4 group-hover/nav:w-full truncate">With great power comes great responsibility.</p>
                        </div>
                        {/* Desktop nav buttons */}
                        <div className="hidden lg:flex ml-auto gap-4 mr-4">
                            <Link 
                                href="/"
                                className="my-auto hidden group-hover/nav:block transition-all duration-300 delay-100"
                            >
                                ET
                            </Link>
                            <Link 
                                href="/"
                                className="my-auto hidden group-hover/nav:block transition-all duration-300 delay-200"
                            >
                                Call
                            </Link>
                            <Link 
                                href="/"
                                className="my-auto hidden group-hover/nav:block transition-all duration-300 delay-300"
                            >
                                Home
                            </Link>
                        </div>

                        {/* Phone nav */}
                        <div className="lg:hidden ml-auto">
                            a
                        </div>
                    </div>
                </div>
                {/* Right side, quick social buttons */}
                <div className={`w-auto hidden lg:flex m-4 bg-white/30 border-2 border-gray-200/50 text-black backdrop-blur-lg rounded-2xl p-2 relative z-10 transition duration-1000 ${loaded ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex gap-4">
                        <Profile pfp={Pfp} applicationp={Github} full={true} className="w-14" />
                        <Profile pfp={Cattopfp} applicationp={Discord} full={true} className="w-14" />
                        <Profile pfp={Nightcattofpf} applicationp={Openlayout} full={true} className="w-14" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
