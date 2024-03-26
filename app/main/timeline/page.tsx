"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";

export default function Timeline() {
    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>
            <div className="relative">
                <div className="w-10 h-full bg-green-200 absolute top-0 left-0 z-10" /*style={{ height: `${(scroll / window.innerHeight) * 100}%` }}*/ />
                <div className="mx-auto max-w-xl relative">
                    <div className="border-r-2 border-green-200 border-dashed h-full absolute top-0 left-5" />
                    <div className="mx-auto max-w-md">
                        <div className="my-4 flex justify-between items-center">
                            <div className="w-4 h-4 rounded-full bg-green-200" />
                            <div className="w-1 bg-green-200 h-full flex-1" />
                            <div className="w-4 h-4 rounded-full bg-green-200" />
                        </div>
                        <div className="my-4 flex justify-between items-center">
                            <div className="w-4 h-4 rounded-full bg-green-200" />
                            <div className="w-1 bg-green-200 h-full flex-1" />
                            <div className="w-4 h-4 rounded-full bg-green-200" />
                        </div>
                        <div className="my-4 flex justify-between items-center">
                            <div className="w-4 h-4 rounded-full bg-green-200" />
                            <div className="w-1 bg-green-200 h-full flex-1" />
                            <div className="w-4 h-4 rounded-full bg-green-200" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};