"use client";
import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';

import Image from "next/image";
import Scroll from "@/public/assets/scroll.png";

const threshold = 10;
export default function ScrollTo({ point }: { point: number | undefined }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY >= threshold) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        };

        // We add a delay because window is not defined on the first render
        setTimeout(() => handleScroll, 1000);
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

    return (
        <motion.div
            initial="hidden"
            animate={scrolled ? "scrolled" : "visible"}
            variants={{
                hidden: {
                    opacity: 0,
                    x: '-40px',
                    y: 100,
                },
                visible: {
                    opacity: 1,
                    y: 0,
                    x: '-40px', // Compensate for the padding of the parent div
                    left: '50%',
                    rotate: 180,
                    transition: {
                        duration: 1,
                    }
                },
                scrolled: {
                    opacity: 1,
                    // position: 'fixed',
                    x: '-40px',
                    bottom: '10%',
                    left: '50%',
                    top: 'auto',
                    scale: 0.6,
                    rotate: 0,
                    transition: {
                        duration: .5,
                    }
                }
            }}
            onClick={() => window.scrollTo({ top: scrolled ? 0 :point || window.innerHeight, behavior: 'smooth' })}
            className="overflow-hidden fixed bottom-20 left-1/2 flex items-center justify-center w-20 h-20 cursor-pointer z-50 select-none"
        >
            <span className="absolute inline-flex h-10 w-10 bg-white/10 animate-ping rounded-full opacity-75"></span>
            <Image src={Scroll} alt="scroll" className="w-10 h-10" priority={true} />
        </motion.div>
    );
};