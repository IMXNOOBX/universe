import React from "react";
import Link from "next/link";
import Image from "next/image";
// import Icon from "@/public/assets/vercel.svg";
// import Github from "@/public/assets/github.svg";
// import Discord from "@/public/assets/discord.svg";
// import Openlayout from "@/public/assets/openlayout.svg";

const Profile = ({ pfp, applicationp, className, full }: { pfp: any, applicationp: any, className: string, full: boolean }) => {
    return (
        <div className={`group transition ease-in-out select-none relative p-1 ${className}`}>
            <Image src={pfp} className={`w-full fill-current select-none hover:drop-shadow-2xl rounded-xl transition-all ease-in duration-300 group-hover:scale-105 aspect-square ${full && 'border-2 border-gray-700'}`} alt="icon" />
            <Image src={applicationp} className="w-6 absolute -bottom-1 select-none right-0 group-hover:-translate-x-10 group-hover:-translate-y-10 ease-out group-hover:rotate-full transition-all duration-300" alt="icon" />
        </div>
    );
};

export default Profile;