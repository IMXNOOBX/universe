import React from "react";

import Link from "next/link";
import Image from "next/image";

import UserCard from "@/app/components/userinfo/page";
import { MotionDiv } from "../utils/animation";

export default async function Intro() {
    return (
        <div className={`static w-full flex flex-col mt-10 sm:mt-16 lg:mt-20 text-white/50 opacity-100 translate-x-0`}>
            <MotionDiv initial="hidden" animate="visible" variants={{
                hidden: {
                    opacity: 0,
                    x: '-20%',
                    width: 0,
                },
                visible: {
                    opacity: 1,
                    x: 0,
                    width: 'auto',
                    transition: {
                        duration: 5,
                    }
                }
            }}>
                <h1 className="font-bold text-4xl sm:text-6xl lg:text-8xl opacity-100 text-border-2 lg:ml-20 truncate">IMXNOOBX</h1>
                <h2 className="font-bold text-1xl sm:text-2xl lg:text-3xl lg:ml-40 truncate">Welcome to my portfolio</h2>
            </MotionDiv>

            <UserCard />
        </div>
    );
};