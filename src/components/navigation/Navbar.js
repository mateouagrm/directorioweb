import React, {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Link, useLocation} from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const leftLinks = [
        {name: 'INICIO', url: '/'},
        {name: 'MIEMBRO', url: '/miembro'},
        {name: 'NEGOCIO', url: '/negocio'},
        {name: 'EMPLEO', url: '/empleo'},
    ];

    const rightLinks = [
        {name: 'PERFIL', url: '/perfil'},
    ];
    const navPositionClass = location.pathname === "/" ? "fixed" : "static";

    return (
        <nav
            className={`static top-0 w-full header-bg z-50 px-4 py-3 flex items-center justify-between`}>
            {/* Desktop menu */}
            <div className="hidden md:flex flex-1 pl-3 justify-start">
                <div className="flex space-x-6">
                    {leftLinks.map((item) => (
                        <Link to={item.url} key={item.name} className="header-text-directory font-bold mx-4 no-underline">
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Right menu desktop */}
            <div className="hidden md:flex flex-1 pr-3 justify-end">
                <div className="flex space-x-6">
                    {rightLinks.map((item) => (
                        <Link to={item.url} key={item.name} className="header-text-directory font-bold mx-4 no-underline">
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden flex items-center ml-auto">
                <button onClick={() => setIsOpen(true)}>
                    <FontAwesomeIcon icon={faBars} size="lg" className="header-text-directory"/>
                </button>
            </div>

            {/* Mobile menu (side panel) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{x: "-100%"}}
                        animate={{x: 0}}
                        exit={{x: "-100%"}}
                        transition={{duration: 0.3}}
                        className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-4"
                    >
                        {/* Close button */}
                        <div className="flex justify-end">
                            <button onClick={() => setIsOpen(false)}>
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    size="lg"
                                    className="header-text-directory"
                                />
                            </button>
                        </div>

                        {/* Menu items */}
                        <div className="mt-6 flex flex-col space-y-6">
                            {[...leftLinks, ...rightLinks].map((item) => (
                                <Link to={item.url}
                                      key={item.name}
                                      className="header-text-directory font-bold no-underline"
                                      onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navbar;
