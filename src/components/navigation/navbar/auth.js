import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Popover, Transition } from "@headlessui/react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Register from "../../login/register";
import Login from "../../login/login";
import LogoutModal from "../../login/logout";

const customStyles = {
    overlay: {
        backgroundColor: '#000000a6',
        zIndex: '30',
    },
    content: {
        top: '50%', // Centrar el modal verticalmente
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)', // Ajustar para centrar
        borderRadius: '10px',
        padding: '0px',
        border: '0px',
        background: 'transparent',
        width: '90%', // Ancho más grande (casi todo el ancho)
        maxWidth: '400px', // Limitar a un máximo tamaño (equivalente a 'modal-lg' en Bootstrap)
        height: 'auto', // Puedes establecer una altura fija o dejar que se ajuste automáticamente
    },
};


function Auth({ token, user }) {
    const [modalLogin, setLogin] = useState(false);
    const [modalRegister, setRegister] = useState(false);

    const startLogin = () => setLogin(true);
    const endLogin = () => setLogin(false);
    const startRegister = () => setRegister(true);
    const endRegister = () => setRegister(false);

    function afterOpenModal() {
        console.log("despues de abrir");
    }

    return (
        <>
            <Popover className="">
                {({ open }) => (
                    <>
                  

                        <Popover.Button className="bg-blue-100 p-2 rounded-full">

                            {
                                token ?
                                    <div className='flex px-2'>
                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className="block h-6 w-6 cursor-pointer text-ecoprimary1 rounded-full"
                                        />
                                        <span className="hidden ms-2 d-md-block text-ecoprimary1 font-semibold text-sm">{user.name}</span>
                                    </div>
                                    :
                                    <div>
                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className="block md:hidden h-6 w-6 cursor-pointer text-ecoprimary1 rounded-full"
                                        />
                                        <span className="hidden d-md-block text-ecoprimary1 font-semibold text-sm px-2">Iniciar sesión / Registrarse</span>
                                    </div>
                            }

                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            {/* Cambio clave aquí */}
                            <Popover.Panel className="absolute right-0 mt-2 px-4 z-20">
                                <div className="overflow-hidden shadow-lg w-44 z-20 ring-1 ring-black">
                                    <ul className="bg-white pl-0 mb-0 rounded-3 overflow-hidden">
                                        {
                                            token ?
                                                <>
                                                    <li>
                                                        <Link
                                                            to={`/dashboard`}
                                                            className="px-2 py-2.5 text-sm cursor-pointer hover:bg-ecoprimary1 flex items-center justify-between text-bgblack hover:text-white no-underline"
                                                        >
                                                            Dashboard
                                                        </Link>
                                                    </li>
                                                    <LogoutModal />
                                                </>
                                                :
                                                <>
                                                    <li onClick={startLogin}
                                                        className="px-2 py-2.5 text-sm cursor-pointer text-bgblack hover:text-white hover:bg-ecoprimary1">
                                                        Iniciar sesión
                                                    </li>
                                                    <li onClick={startRegister}
                                                        className="px-2 py-2.5 text-sm cursor-pointer text-bgblack hover:text-white hover:bg-ecoprimary1">
                                                        Registrarse
                                                    </li>
                                                </>
                                        }
                                    </ul>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
            <Modal
                isOpen={modalLogin}
                ariaHideApp={false}
                onAfterOpen={afterOpenModal}
                onRequestClose={endLogin}
                style={customStyles}
                contentLabel="login"
            >
                <Login />
            </Modal>
            <Modal
                isOpen={modalRegister}
                ariaHideApp={false}
                onAfterOpen={afterOpenModal}
                onRequestClose={endRegister}
                style={customStyles}
                contentLabel="register"
            >
                <Register />
            </Modal>
        </>
    );
}

const mapStateToProps = state => ({
    token: state.Auth.token,
    user: state.Auth.user,
});

export default connect(mapStateToProps, {})(Auth);
