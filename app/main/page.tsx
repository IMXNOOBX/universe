import React, { Suspense } from "react";

import Link from "next/link";
import Image from "next/image";

import UserCard from "@/app/main/userinfo";
import UserCardError from "@/app/main/userinfo/error";
import UserCardLoading from "@/app/main/userinfo/loading";
import { MotionDiv } from "../components/utils/animation";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export default function Intro() {
    return (
        <div className={`static w-full flex flex-col mt-10 sm:mt-16 lg:mt-20 text-white/50 opacity-100 translate-x-0 `}>
            <MotionDiv 
                initial="hidden" 
                animate="visible" 
                variants={{
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
                <h1 className="font-bold text-4xl mc:text-5xl sm:text-6xl lg:text-8xl opacity-100 text-border-2 lg:ml-20 truncate transition duration-300 hover:drop-shadow-[#FFF_0px_0px_5px] animate-bounds-jump">IMXNOOBX</h1>
                <h2 className="font-bold mc:text-2xl sm:text-2xl lg:text-3xl lg:ml-40 truncate animate-bounds-jump">Welcome to my portfolio</h2>
            </MotionDiv>

            <ErrorBoundary errorComponent={UserCardError}>
                <Suspense fallback={<UserCardLoading />}>
                    <UserCard />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};