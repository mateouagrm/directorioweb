import React, { useState } from 'react';
import logo from '../../assets/image/happy/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faCartShopping, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    // Animación del menú móvil
    const menuVariants = {
        hidden: { height: 0, opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
        visible: { height: "auto", opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
        exit: { height: 0, opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }
    };

    return (
        <header className="st-site-header st-style1 st-sticky-header text-white shadow-md relative z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Nav menu - Desktop */}
                <nav className="hidden md:flex space-x-6">
                    <a href="#" className="text-happy font-medium no-underline">INICIO</a>
                    <a href="#" className="text-happy font-medium no-underline">NUESTRA MISION</a>
                    <a href="#" className="text-happy font-medium no-underline">NUESTRO EQUIPO</a>
                </nav>
                <div className="text-happy"><img src={logo} width={233} height={109} sizes={'223px'} alt=""/></div>
                <nav className="hidden md:flex space-x-6">
                    <a href="#" className="text-happy font-medium no-underline">NUESTRO ESPACIO</a>
                    <a href="#" className="text-happy font-medium no-underline">NUESTRA ETICA</a>
                    <a href="#" className="text-happy font-medium no-underline">NUESTRO TEMARIO</a>
                </nav>
            </div>

            {/* Mobile Menu with Framer Motion */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                        className="md:hidden bg-red-600 text-white absolute top-full left-0 w-full flex flex-col items-start px-4 space-y-4 overflow-hidden"
                    >
                        <a href="#" className="hover:text-yellow-400">Home</a>
                        <a href="#" className="hover:text-yellow-400">About</a>
                        <a href="#" className="hover:text-yellow-400">Resume</a>
                        <a href="#" className="hover:text-yellow-400">Portfolio</a>
                        <a href="#" className="hover:text-yellow-400">Blog</a>
                        <a href="#" className="hover:text-yellow-400">Contact</a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
export default Navbar
