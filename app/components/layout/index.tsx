"use client";
import React, { useEffect, useState } from "react";

const Layout = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
        setLoaded(true);
        }, 200);

        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="fixed top-0 h-screen w-screen"> {/* h-full w-full */}
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className={`absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#5D5DFF_100%)] transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
    );
};

export default Layout;