import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Button({ image, to, className, children }: { image: any, to: any, className: string, children: React.ReactNode }) {
    return (
        <div className={`group select-none cursor-pointer ${className}`}>
            <Link href={to}>
                <div className="flex transition-all duration-300 bg-transparent group-hover:py-2">
                    <Image src={image} className={`select-none w-8 transition-all duration-300 rotate-45 border-opacity-0 group-hover:rotate-0 group-hover:shadow-[#5D5DFF_0px_0px_30px] group-hover:bg-indigo-500/50 group-hover:border-2 group-hover:border-opacity-100 border-indigo-500 rounded-xl group-hover:p-1 group-hover:translate-y-3`} alt="icon" />
                    <div className="flex absolute my-auto transition-all translate-x-3 duration-300 text-xs w-0 opacity-0 group-hover:text-base group-hover:w-full group-hover:opacity-100 group-hover:-translate-y-4 group-hover:translate-x-0 font-semibold justify-center whitespace-nowrap">
                        {children}
                    </div>
                </div>
            </Link>
        </div>
    );
};