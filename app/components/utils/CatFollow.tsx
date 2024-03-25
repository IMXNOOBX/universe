"use client";
import React, { use, useEffect, useState } from "react";
import { m, motion } from 'framer-motion';

import Image from "next/image";

import Cat from "@/public/assets/cattopfp.jpg";

const cat_size = 32;
const cat_distance = 10;
let mouse_timer: NodeJS.Timeout;
const states = ['following', 'going', 'sleeping'];
export default function CatFollow() {
    const [catPos, setCatPos] = useState({ x: -32, y: -32 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [state, setState] = useState(states[0]);

    const getCatImage = () => {
        switch (state) {
            case 'following':
                return Cat;
            case 'going':
                return Cat;
            case 'sleeping':
                return Cat;
            default:
                return Cat;
        }
    }

    /* Handle Mouse Position */
    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            // setState('following');
            setMousePos({ x: e.pageX, y: e.pageY });

            clearTimeout(mouse_timer);

            mouse_timer = setTimeout(() => {
                setState('sleeping');
            }, 5000);
        };

        const handleClick = () => {
            setState('going');
        }

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleClick);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleClick);
        };
    }, [mousePos]);

    /* Handle scrolling */
    useEffect(() => {
        const handleScroll = () => {
            setState('sleeping');
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [catPos]);

    /* Handle Cat Move */
    useEffect(() => {
        const moveCatInterval = setInterval(() => {
            console.log(mousePos, catPos, state);
            if (mousePos.x === 0 && mousePos.y === 0) return;

            if (state === 'sleeping') {
                mousePos.x = window.innerWidth - cat_size * 2;
                mousePos.y = window.innerHeight + window.scrollY - cat_size;
            }

            const distance = Math.sqrt(
                Math.pow(mousePos.x - catPos.x, 2) + Math.pow(mousePos.y - catPos.y, 2)
            );

            if (state !== 'going' && distance < 40) return;

            const speed = 0.1;
            const dx = mousePos.x - catPos.x;
            const dy = mousePos.y - catPos.y;

            const x = catPos.x + dx * speed;
            const y = catPos.y + dy * speed;

            setCatPos({ x, y });

            if (state === 'going' && distance < 10) setState('following');
        }, 50);

        return () => clearInterval(moveCatInterval);
    }, [mousePos, catPos, state]);

    return (
        <>
            <motion.div
                className="absolute flex z-50 pointer-events-none text- overflow-visible"

                style={{
                    left: catPos.x + cat_size / 2,
                    top: catPos.y - cat_size / 2,
                }}
            >
                <Image 
                    src={getCatImage()} 
                    alt="cat" 
                    width={cat_size} 
                    height={cat_size} 
                    style={{ 
                        rotate: state == 'sleeping' ? "-45deg" : "0deg"
                    }} 
                />
                {state == 'sleeping' && (
                    <span className="text-white -translate-x-3 -translate-y-3 animate-pulse text-xs">zZz</span>
                )}
            </motion.div>
        </>
    );
};