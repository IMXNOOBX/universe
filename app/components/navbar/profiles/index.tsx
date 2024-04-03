import React from "react";
import Link from "next/link";
import Image from "next/image";

const Profile = ({ to, pfp, applicationp, className, full }: { to: string, pfp: any, applicationp: any, className: string, full: boolean }) => {
    return (
        <div 
            className={`group transition ease-in-out select-none relative p-1 cursor-pointer ${className}`}
            onClick={() => window.open(to, '_blank')}
            >
            <Image src={pfp} priority={true} className={`w-full fill-current select-none hover:drop-shadow-2xl rounded-xl transition-all ease-in duration-300 group-hover:scale-105 aspect-square ${full && 'border-2 border-gray-700'}`} alt="icon" />
            <Image src={applicationp} className="h-6 w-6 absolute -bottom-1 select-none right-0 group-hover:-translate-x-10 group-hover:-translate-y-10 ease-out group-hover:rotate-full transition-all duration-300 drop-shadow-[#FFF_0px_0px_10px]" alt="icon" />
        </div>
    );
};

export default Profile;
