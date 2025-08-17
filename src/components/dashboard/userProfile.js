import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { update_user_name } from '../../redux/actions/user';
import { change_password } from '../../redux/actions/auth';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const UserProfile = ({ user, update_user_name, change_password }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalPasswordOpen, setModalPasswordOpen] = useState(false);
    const [name, setName] = useState(user ? user.name : '');

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loadingPassword, setLoadingPassword] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await update_user_name(name);
        if (success) {
            toast.success("Los datos fueron actualizados exitosamente", { position: "top-right", autoClose: 3000 });
            setModalOpen(false);
        } else {
            toast.error("No se pudo actualizar el nombre. Intenta de nuevo.", { position: "top-right", autoClose: 3000 });
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Las nuevas contraseñas no coinciden", { position: "top-right", autoClose: 3000 });
            return;
        }

        setLoadingPassword(true);
        let data = {
            currentPassword: currentPassword,
            newPassword: newPassword,
        };
        const success = await change_password(data);
        setLoadingPassword(false);

        if (success) {
            toast.success("Contraseña actualizada exitosamente", { position: "top-right", autoClose: 3000 });
            setModalPasswordOpen(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            toast.error("No se pudo actualizar la contraseña. Verifica tu contraseña actual.", { position: "top-right", autoClose: 3000 });
        }
    };

    return (
        <div className='max-w-3xl mx-8 mx-sm-auto mt-8'>
            <div className="row bg-white rounded-2xl shadow-md flex items-center p-8 border">
                {/* Imagen de perfil */}
                <div className="col-12 col-sm-4 p-0 pe-sm-4 ps-sm-0 d-flex justify-content-center mb-4 mb-sm-0 h-100">
                    <div className="rounded-full border-8 border-ecoprimary1 overflow-hidden m-8 bg-gray-200 w-100 h-100">
                        <img src="https://cdn-icons-png.freepik.com/512/10302/10302971.png" alt="Perfil" className="object-cover" />
                    </div>
                </div>

                {/* Información del usuario */}
                <div className="col-12 col-sm-8 flex-1 bg-blue-100 p-4 rounded-3 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Información del usuario</h2>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p><span className="font-medium text-gray-700">Nombre:</span> {user ? user.name : 'Cargando...'}</p>
                            <p><span className="font-medium text-gray-700">Correo:</span> {user ? user.email : 'Cargando...'}</p>
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <button onClick={() => setModalOpen(true)} className="bg-ecoprimary1 text-white px-4 py-2 rounded-3 text-sm transition duration-200 me-2">Editar perfil</button>
                        <button onClick={() => setModalPasswordOpen(true)} className="bg-ecoprimary1 text-white px-4 py-2 rounded-3 text-sm transition duration-200">Actualizar contraseña</button>
                    </div>
                </div>

                {/* Modal Editar Nombre */}
                <Modal
                    isOpen={modalOpen}
                    onRequestClose={() => setModalOpen(false)}
                    className="bg-white rounded-xl p-6 w-full max-w-lg mx-auto mt-24"
                    overlayClassName="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Editar Nombre</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                required
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancelar</button>
                            <button type="submit" className="px-4 py-2 bg-ecoprimary1 text-white rounded hover:bg-ecoprimary2">Guardar</button>
                        </div>
                    </form>
                </Modal>

                {/* Modal Contraseña */}
                <Modal
                    isOpen={modalPasswordOpen}
                    onRequestClose={() => setModalPasswordOpen(false)}
                    className="bg-white rounded-xl p-6 w-full max-w-lg mx-auto mt-24"
                    overlayClassName="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Actualizar contraseña</h2>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña actual</label>
                            <div className="relative">
                                <input
                                    type={showCurrent ? 'text' : 'password'}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                                    required
                                />
                                <span onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-2.5 cursor-pointer text-gray-500">
                                    <FontAwesomeIcon icon={showCurrent ? faEyeSlash : faEye} />
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
                            <div className="relative">
                                <input
                                    type={showNew ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                                    required
                                />
                                <span onClick={() => setShowNew(!showNew)} className="absolute right-3 top-2.5 cursor-pointer text-gray-500">
                                    <FontAwesomeIcon icon={showNew ? faEyeSlash : faEye} />
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Verificar nueva contraseña</label>
                            <div className="relative">
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                                    required
                                />
                                <span onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-2.5 cursor-pointer text-gray-500">
                                    <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} />
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button type="button" onClick={() => setModalPasswordOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancelar</button>
                            <button type="submit" className="px-4 py-2 bg-ecoprimary1 text-white rounded hover:bg-ecoprimary2 flex items-center gap-2">
                                {loadingPassword && (
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                )}
                                Guardar
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.Auth.user
});

export default connect(mapStateToProps, { update_user_name, change_password })(UserProfile);
