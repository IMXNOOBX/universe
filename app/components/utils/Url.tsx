import React from "react";
import Link from "next/link";
import Image from "next/image";
import LinkImg from "@/public/assets/link.png";

export default function Url({ url, target, rel, children }: { url: string, target?: string, rel?: string, children?: React.ReactNode }) {
    const domain = url.replace(/(https?:\/\/)?(www\.)?/i, '').split('/')[0];
    return (
        <>
            <Link
                href={url}
                target={target}
                rel={rel}

                className={`group/url flex gap-2 justify-center ml-1
                    items-center ${children ? '' : 'bg-indigo-500/50 border border-indigo-500 text-gray-300 hover:bg-indigo-300/50 hover:border-indigo-200 hover:text-white'}  
                    font-semibold px-1 rounded-lg text-sm transition duration-300`}
            >
                <span className={children ? `bg-left-bottom bg-gradient-to-r rounded-md from-indigo-500/70 to-indigo-500/70 bg-[length:0%_2px] bg-no-repeat group-hover/url:bg-[length:100%_2px] transition-all duration-500 ease-out` : ''}>
                    {children || domain}
                </span>
                <Image className="h-4 w-4 transition duration-300 group-hover/url:rotate-180" src={LinkImg} alt={domain} />
            </Link>
        </>
    );
};