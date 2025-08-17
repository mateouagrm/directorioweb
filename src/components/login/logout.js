import React, {useState, useEffect} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {connect} from "react-redux";
import {set_logout} from "../../redux/actions/auth";
import {useNavigate} from "react-router-dom"; // ✅ Importa useNavigate

function LogoutModal({set_logout, logout}) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate(); // ✅ Hook para redirección

    const handleLogout = async () => {
        await set_logout();
        navigate("/");
        window.location.reload();
    };

    // Este efecto ya no es necesario si usas navigate directamente
    // Puedes eliminarlo si el handleLogout ya hace la redirección
    useEffect(() => {
        if (logout) {
            navigate("/");
        }
    }, [logout]);

    return (
        <>
            <li
                onClick={() => setOpen(true)}
                className="px-2 py-2.5 text-sm cursor-pointer text-bgblack hover:text-white hover:bg-ecoprimary1"
            >
                Cerrar sesión
            </li>

            <Transition show={open} as={React.Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <div className="fixed inset-0 bg-bgblack bg-opacity-30"/>
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
                            <Dialog.Title className="text-lg text-ecoprimary1 font-bold">¿Cerrar sesión?</Dialog.Title>
                            <Dialog.Description className="mt-2 text-gray-600">
                                ¿Estás seguro de que deseas cerrar sesión? Esta acción no se puede deshacer.
                            </Dialog.Description>
                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-lg"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => handleLogout()}
                                    className="px-4 py-2 bg-ecoprimary1 text-white rounded-lg"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

const mapStateToProps = state => ({
    logout: state.Auth.logout
});

export default connect(mapStateToProps, {
    set_logout
})(LogoutModal);
