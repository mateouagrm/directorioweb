import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Disclosure } from '@headlessui/react';
import { Link } from 'react-router-dom';
import logo from '../../assets/image/logo.svg';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';

import Auth from './navbar/auth';

function NavbarUser() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            {/* Sidebar izquierdo */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-40 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b bg-ecoprimary1">
                    <h2 className="text-lg text-ecoprimary2 font-semibold mb-0">Menú</h2>
                    <button onClick={() => setSidebarOpen(false)}>
                        <XMarkIcon className="h-6 w-6 text-ecoprimary1" />
                    </button>
                </div>

                <nav className="py-2 space-y-4">
                    <Link to="/dashboard/perfil" onClick={() => setSidebarOpen(false)} className="no-underline">
                        <div className="p-3 hover:bg-blue-100 cursor-pointer">
                            <span className="text-ecoprimary1 font-semibold">Perfil</span>
                        </div>
                    </Link>
                    <Link to="/dashboard/compras" onClick={() => setSidebarOpen(false)} className="no-underline">
                        <div className="p-3 hover:bg-blue-100 cursor-pointer">
                            <span className="text-ecoprimary1 font-semibold">Compras</span>
                        </div>
                    </Link>

                </nav>
            </div>

            {/* Overlay oscuro al abrir el sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-10 z-30"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Navbar principal */}
            <Disclosure as="nav" className="bg-white shadow-sm z-20 relative">
                {({ open }) => (
                    <>
                        <div className="max-w mx-auto px-0 px-sm-8 px-lg-12">
                            <div className="bg-white">
                                <div className="col-12 flex justify-between items-center px-4 py-3">
                                    {/* Lado izquierdo: botón + logo + WhatsApp */}
                                    <div className="col-4 flex items-center gap-2">
                                        <button className="text-ecoprimary1" onClick={() => setSidebarOpen(true)}>
                                            <Bars3Icon className="h-7 w-7" />
                                        </button>

                                        <Link to="/">
                                            <img src={logo} alt="Piray Market" width={120} height={47} />
                                        </Link>


                                    </div>

                                    {/* Lado derecho: íconos + Auth */}

                                    <div className="col-4 flex items-center justify-content-end gap-3">
                                        <Auth />
                                        <Link
                                            className='bg-blue-100 p-2 rounded-full'
                                            to={'/favoritos'}>
                                            <FontAwesomeIcon
                                                icon={faHeart}
                                                className="block h-6 w-6 text-ecoprimary1 rounded-full" />
                                        </Link>

                                        <Link
                                            className='bg-blue-100 p-2 rounded-full'
                                            to={'/carrito'}>
                                            <FontAwesomeIcon
                                                icon={faCartShopping}
                                                className="block h-6 w-6 text-ecoprimary1 rounded-full" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                )}
            </Disclosure>
        </>
    );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(NavbarUser);



