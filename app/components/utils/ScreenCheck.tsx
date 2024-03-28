"use client";
import { useEffect } from "react";

export default function Check() {
    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth <= parseInt(process.env.MIN_SCREEN_SIZE || '200'))
            throw new Error("The window is too small to display the content");
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.addEventListener('resize', handleResize);
        };
    }, []);
    
    return <></>
};