import React from "react";
import Link from "next/link";
import Image from "next/image";
import LinkImg from "@/public/assets/link.png";

export default function Url({ url, target, rel }: { url: string, target: string, rel: string }) {
    const domain = url.replace(/(https?:\/\/)?(www\.)?/i, '').split('/')[0];
    return (
        <>
            <Link
                href={url}
                target={target}
                rel={rel}

                className="group flex gap-2 justify-center 
                    items-center bg-indigo-500/50 border border-indigo-500 text-gray-300 
                    font-semibold px-1 rounded-lg text-sm transition duration-300 hover:bg-indigo-300/50 hover:border-indigo-200 hover:text-white"
            >
                {domain}
                <Image className="h-4 w-4 transition duration-300 group-hover:rotate-180" src={LinkImg} alt={domain} />
            </Link>
        </>
    );
};