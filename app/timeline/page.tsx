"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from "react-intersection-observer";
import { motion } from 'framer-motion';
import TimelineCard from './cards';

import OpenLayout from "@/public/assets/openlayout.svg";

const threshold = 200;
export default function Timeline() {
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const [refTitle, inVewTitle] = useInView({ threshold: 0.5 });

    useEffect(() => {
        const handleScroll = () => {
            // Dont start until we reach the threshold (The block) 
            if (threshold > window.scrollY)
                return setScrollPercentage(0);

            // console.log(window.scrollY, window.innerHeight, document.documentElement.scrollHeight)

            const scrollTop = window.scrollY - threshold; // Remove the threshold so it starts from the beginning
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const totalScroll = documentHeight - windowHeight;
            const percentage = (scrollTop / totalScroll) * 100;

            // console.log(percentage);
            setScrollPercentage(percentage);
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <motion.div
            className="relative h-full overflow-hidden pb-20 flex flex-col justify-center items-center text-white"
            initial="hidden"
            animate={"visible"}
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
                    }
                }
            }}
        >
            <motion.h2
                className="text-6xl font-bold mb-4 flex flex-col items-center opacity-100"
                animate={{
                    opacity: scrollPercentage == 0 ? 0.1 : 1
                }}
                ref={refTitle}
            >
                <span className="text-green-500 text-xs drop-shadow-[#4ADE80_0px_2px_5px]">Top</span>
                Projects
            </motion.h2>
            <motion.div
                animate={{
                    opacity: scrollPercentage == 0 ? 0 : 1
                }}
                className="absolute top-24 left-50 w-4 h-full rounded-md bg-gradient-to-b from-green-500/5 to-green-500/50 border-2 border-green-500"
                style={{
                    height: `${scrollPercentage}%`,
                }}
            />

            <div className="w-full h-full flex items-start justify-center mt-24">
                <div className="flex flex-col w-full space-y-10 sm:space-y-20">
                    <TimelineCard
                        visible={scrollPercentage > 25}
                        logo={OpenLayout}
                        right={true}
                        title="Open Layout"
                        content="Open layout is a team-work project, brought to life, with the goal of making easier the usage of layouts/templates by making an online portal where finding inspiration, resources and tools is as easy as you can imagine."
                        links={[
                            { name: "OpenLayout", url: "https://openlayout.me" },
                            { name: "GitHub", url: "https://github.com/open-layout" },
                            { name: "npm", url: "https://npm.openlayout.me" },
                            { name: "Docs", url: "https://docs.openlayout.me" }
                        ]}
                    />
                    <TimelineCard
                        visible={scrollPercentage > 50}
                        right={false}
                        title="FStick"
                        content="FStick is a project to play around with the M5 StickC Plus and the ESP32 board. It aims to mimic the flipper zero features at a lower cost. The project has been developed in C and has been greatly supported by the community."
                        links={[
                            { name: "GitHub", url: "https://github.com/IMXNOOBX/fstick" },
                            { name: "Docs", url: "https://docs.imxnoobx.com/fstick" }
                        ]}
                    />
                    <TimelineCard
                        visible={scrollPercentage > 75}
                        right={true}
                        title="CS2 external esp"
                        content="This is a project i made to learn more about the windows API & game hacking. Its a simple overlay window that will draw over the game where enemies and teammates are with a box, and providing information such as health, distance and more. The project is intended for learning pourposes and should not be used in a real game."
                        links={[
                            { name: "GitHub", url: "https://github.com/IMXNOOBX/cs2-external-esp" },
                            { name: "Video", url: "https://youtu.be/SV_lddIxQ5w" }
                        ]}
                    />
                </div>
            </div>
        </motion.div>
    );
}
