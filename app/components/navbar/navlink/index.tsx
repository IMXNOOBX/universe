import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Button({ image, to, isActive = false, className, children }: { image: any, to: any, className: string, isActive?: boolean, children: React.ReactNode }) {

    return (
        <div className={`group select-none cursor-pointer ${className}`}>
            <Link href={to}>
                <div 
                    className={`flex transition-all duration-300 bg-transparent ${isActive ? 'py-2' : 'group-hover:py-2'}`}>
                    <Image 
                        src={image} 
                        className={
                            `select-none w-8 transition-all duration-300 rotate-45 border-opacity-0 border-indigo-500 rounded-xl ${ isActive ? 
                                    'rotate-0 shadow-[#5D5DFF_0px_0px_30px] bg-indigo-500/50 border-2 border-opacity-100  p-1 translate-y-3'
                                    : 'group-hover:rotate-0 group-hover:shadow-[#5D5DFF_0px_0px_30px] group-hover:bg-indigo-500/50 group-hover:border-2 group-hover:border-opacity-100  group-hover:p-1 group-hover:translate-y-3'
                                }`
                            } 
                            alt="icon" 
                    />
                    <div 
                        className={`flex absolute my-auto transition-all duration-300 text-xs w-0 opacity-0 font-semibold justify-center whitespace-nowrap ${ isActive ? 
                            'text-base w-full opacity-100 -translate-y-4 translate-x-0' 
                                : 'translate-x-3 group-hover:text-base group-hover:w-full group-hover:opacity-100 group-hover:-translate-y-4 group-hover:translate-x-0'
                            } `}>
                        {children}
                    </div>
                </div>
            </Link>
        </div>
    );
};