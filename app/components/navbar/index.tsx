"use client";

import React, { use, useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation'

import Link from "next/link";
import Image from "next/image";
import Profile from "./profiles";
import Navlink from "./navlink";

import Right from "@/public/assets/right.png";
import Pfp from "@/public/assets/pfp.png";
import Cattopfp from "@/public/assets/cattopfp.jpg";
import Nightcattofpf from "@/public/assets/nightcatto.jpg";
import Github from "@/public/assets/github-white.svg";
import Discord from "@/public/assets/discord-white.svg";
import Openlayout from "@/public/assets/openlayout.svg";
import Bot from "@/public/assets/bot.png";
import Project from "@/public/assets/project.png";
// import Et from "@/public/assets/et.png";
// import Call from "@/public/assets/call.png";
import Home from "@/public/assets/home.png";

import Menu from "@/public/assets/menu.png"

const threshold = 70;
export default function Navbar() {
    const pathname = usePathname();
    const [navOpen, setNavOpen] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [quote, setQuoute] = useState('');

    /* TODO: Remove this and make it in a server component with an hour cache */
    useEffect(() => {
        const state = localStorage.getItem('nav')
        if (state != undefined)
            setNavOpen(state == 'true');
        else
            setNavOpen(window.innerWidth > 640); // By default on phone do not show the nav open

        fetch('/api/quote')
            .then(res => res.json())
            .then(data => setQuoute(data.quote))
            .catch(console.error)
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= threshold) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleNav = () => {
        const state = !navOpen;

        setNavOpen(state);

        localStorage.setItem('nav', state.toString());
    };

    return (
        <nav className="w-full sticky top-0">
            {/* Left side, navbar and routes buttons */}
            {/* Check how i did it at: https://stackoverflow.com/questions/73884269/custom-group-states-in-tailwind-css */}
            <div className={`lg:flex items-center relative transition-opacity overflow-hidden ${navOpen ? 'open' : 'close'}`}>
                <motion.div
                    initial="hidden"
                    animate={scrolled ? "hidden" : "visible"}
                    variants={{
                        hidden: {
                            opacity: 0,
                            x: '-100%',
                            transition: {
                                duration: .5,
                            }
                        },
                        visible: {
                            opacity: 1,
                            x: 0,
                            width: 'auto',
                            transition: {
                                duration: .5,
                            }
                        },
                    }}>
                    <div
                        // lg:w-2/6 lg:hover:w-full
                        className={`relative lg:w-full 2lg:w-auto transition-all duration-300 ease-in-out group/nav m-4 bg-gray-600/10 backdrop-blur-lg rounded-2xl border-2 border-gray-700/50 p-2 z-10`}
                    // onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                    //     // (e.target as HTMLDivElement).style.transitionDelay = '0s';
                    // }}
                    // onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                    //     // (e.target as HTMLDivElement).style.transitionDelay = '1s';
                    // }}
                    >
                        <div className="flex">
                            <Link href={'/'}>
                                <Image src={Pfp} className="w-14 rounded-xl border-2 [.open_&]:-translate-x-60 [.open_&]:rotate-full lg:[.open_&]:rotate-0 border-gray-700/50 transition duration-300 hover:scale-105 lg:[.open_&]:-translate-x-4 hover:shadow-lg" alt="icon" />
                            </Link>
                            <div className="flex flex-col justify-center ml-2">
                                <div className="hidden xs:flex transition duration-300 [.open_&]:w-0 [.open_&]:-translate-x-60 lg:[.open_&]:translate-x-0">
                                    <h1 className="lg:opacity-0 text-2xl text-white w-0 font-extrabold transition duration-300  lg:[.open_&]:opacity-100">My</h1>
                                    <h1 className="text-2xl font-bold text-white transition translate-x-10 lg:translate-x-0 lg:[.open_&]:translate-x-10">Universe</h1>
                                </div>
                                {/* Add random phoetical phrase */}
                                <p
                                    className={`text-gray-300 opacity-0 h-0 hidden lg:block w-10 cursor-pointer select-none 
                                        [.open_&]:w-full [.open_&]:h-auto transition duration-300 [.open_&]:opacity-100 xl:[.open_&]:translate-x-10 
                                        overflow-hidden truncate whitespace-nowrap xl:[.open_&]:mr-16 drop-shadow-[#FFF_0px_0px_5px] max-w-screen-sm overflow-x-auto 
                                        ${quote ? 'cursor-pointer' : 'cursor-not-allowed animate-pulse'}
                                    `}
                                    onClick={(e) => navigator.clipboard.writeText(quote)}
                                    title={quote}
                                >
                                    {quote ? quote : '...'.repeat(20)}
                                </p>
                                <p className="hidden xs:block text-gray-300 transition duration-200 [.open_&]:duration-0 [.open_&]:opacity-0 [.open_&]:hidden [.open_&]:-translate-y-10 lg:[.open_&]:h-0">
                                    By <span className="font-semibold from-white to-indigo-600 underline cursor-pointer" onClick={(e) => navigator.clipboard.writeText(e.currentTarget.innerText)}>@imxnoobx</span>
                                </p>
                            </div>
                            {/* Desktop nav buttons */}
                            <div className="hidden lg:flex ml-auto gap-6  mr-4 2lg:[.open_&]:translate-x-5 text-white lg:gap-8">
                                <Navlink
                                    to="/"
                                    isActive={pathname === "/"}
                                    className="my-auto w-0 [.open_&]:w-auto -translate-x-40 opacity-0 [.open_&]:translate-x-0 [.open_&]:opacity-100 transition-all duration-300 delay-75 [.open_&]:delay-300"
                                    image={Home}>
                                    Home
                                </Navlink>
                                <Navlink
                                    to="/projects"
                                    isActive={pathname === "/projects"}
                                    className="my-auto w-0 [.open_&]:w-auto -translate-x-40 opacity-0 [.open_&]:translate-x-0 [.open_&]:opacity-100 transition-all duration-300 delay-75 [.open_&]:delay-300"
                                    image={Project}>
                                    Projects
                                </Navlink>
                            </div>
                            {/* Desktop Open/Close button */}
                            <div className="ml-auto hidden lg:block text-white transition duration-500 [.open_&]:rotate-180 2lg:[.open_&]:translate-x-14 animate-pulse [.open_&]:mx-0 [.open_&]:animate-none my-auto">
                                <Image src={Right} className="w-8 cursor-pointer p-1 rounded-xl bg-white/30 border-2 border-white/50" alt="icon" onClick={toggleNav} />
                            </div>

                            {/* Phone nav */}
                            <div className="flex lg:hidden [.open_&]:w-full ml-auto mr-4">
                                <div className="hidden [.open_&]:flex mr-auto gap-8 transition-all [.open_&]:-translate-x-10 text-white">
                                    <Navlink
                                        to="/"
                                        isActive={pathname === "/"}
                                        className="my-auto w-0 [.open_&]:w-auto -translate-x-40 opacity-0 [.open_&]:translate-x-0 [.open_&]:opacity-100 transition-all duration-300 delay-75 [.open_&]:delay-300"
                                        image={Home}>
                                        Home
                                    </Navlink>
                                    <Navlink
                                        to="/projects"
                                        isActive={pathname === "/projects"}
                                        className="my-auto w-0 [.open_&]:w-auto -translate-x-40 opacity-0 [.open_&]:translate-x-0 [.open_&]:opacity-100 transition-all duration-300 delay-75 [.open_&]:delay-300"
                                        image={Project}>
                                        Projects
                                    </Navlink>
                                </div>
                                <Image src={Menu} className="my-auto w-8 transition-all duration-300 [.open_&]:rotate-90" alt="Toggle Menu" onClick={toggleNav} />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right side, quick social buttons */}
                <motion.div
                    initial="hidden"
                    animate={scrolled ? "hidden" : "visible"}
                    variants={{
                        hidden: {
                            opacity: 0,
                            x: '100%',
                            transition: {
                                duration: .5,
                            }
                        },
                        visible: {
                            opacity: 1,
                            x: 0,
                            marginLeft: 'auto',
                            transition: {
                                duration: .6,
                            }
                        },
                    }}>
                    <div className={`w-auto hidden 2lg:flex m-4 bg-white/30 border-2 border-gray-200/50 text-black backdrop-blur-lg rounded-2xl p-2 relative z-10 transition duration-1000`}>
                        <div className="flex gap-4">
                            <Profile to="https://github.com/IMXNOOBX" pfp={Pfp} applicationp={Github} full={true} className="w-14" />
                            <Profile to="https://bot.noob.bio" pfp={Cattopfp} applicationp={Bot} full={true} className="w-14" />
                            {/* <Profile to="https://openlayout.me" pfp={Cattopfp} applicationp={Openlayout} full={true} className="w-14" /> */}
                            <Profile to="https://discord.com/channels/@me/652969127756955658" pfp={Nightcattofpf} applicationp={Discord} full={true} className="w-14" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </nav>
    );
};