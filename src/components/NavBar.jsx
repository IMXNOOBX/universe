import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import config from '../config/config'

function NavBar({ className }) {
    const [isDropDown, setIsDropDown] = useState(false)
    const trigger = useRef(null);

    useEffect(() => {
        const clickHandler = ({ target }) => {
          if (isDropDown && trigger.current && !trigger.current.contains(target)) {
            setIsDropDown(false);
          }
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
      }, [isDropDown, trigger]);
    
      // close the mobile menu if the esc key is pressed
      useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            // eslint-disable-next-line
          if (isDropDown && keyCode == 27) setIsDropDown(false);
        };

        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
      }, [isDropDown]);

    return (
        <nav className={`flex items-center justify-between p-2 ${className}`}>
            {/* Left */}
            <div className="flex items-center space-x-4">
				<Link to="/">
					<img
						src={config.web.image}
						alt="Logo"
						className="w-12 h-12 rounded-xl object-cover hover:scale-110 transition-all easy-in-out duration-300"
					/>
				</Link>
                <p className="text-white text-lg font-bold hidden sm:block">{config.web.name}</p>
            </div>

            {/* Right */}
            <div className="hidden md:flex space-x-4">
                <Link to="/" className="text-white p-2 px-4 bg-indigo-700 rounded-xl hover:scale-110 transition-all easy-in-out duration-300">Home</Link>
                <Link to="/about" className="text-white p-2 px-4 bg-indigo-700 rounded-xl hover:scale-110 transition-all easy-in-out duration-300">About</Link>
                <Link to="/projects" className="text-white p-2 px-4 bg-indigo-700 rounded-xl  hover:scale-110 transition-all easy-in-out duration-300">Projects</Link>
            </div>
            <div className="relative md:hidden" ref={trigger}>
                <button className="text-white p-2 px-4 bg-indigo-700 rounded-xl hover:underline" onClick={() => setIsDropDown(!isDropDown)}>
                    Menu
                </button>
                {isDropDown && (<>
                    <ul className="z-50 absolute mt-2 right-2 bg-zinc-800 text-white border border-gray-300 rounded-lg">
                        <li>
                            <Link to="/" className="block px-4 py-1 m-1 hover:bg-indigo-700 hover:text-white rounded-lg">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="block px-4 py-1 m-1 hover:bg-indigo-700 hover:text-white rounded-lg">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/projects" className="block px-4 py-1 m-1 hover:bg-indigo-700 hover:text-white rounded-lg">
                                Projects
                            </Link>
                        </li>
                    </ul>

                </>)}
            </div>

        </nav>
    );
}

export default NavBar;
