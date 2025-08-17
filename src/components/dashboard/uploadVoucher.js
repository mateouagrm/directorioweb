import React, { useRef, useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { get_purchases } from "../../redux/actions/user";

const API_URL = process.env.REACT_APP_API_URL;

function UploadVoucherModal({ purchase }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropzoneRef = useRef(null);
    const [dropzoneInstance, setDropzoneInstance] = useState(null);
    const dispatch = useDispatch();

    function initDropzone() {
        if (dropzoneRef.current && !dropzoneInstance) {
            const dz = new Dropzone(dropzoneRef.current, {
                url: `${API_URL}api/store_user_voucher_purchase`,
                thumbnailWidth: 120,
                thumbnailHeight: 120,
                maxFilesize: 2,
                maxFiles: 1,
                acceptedFiles: "image/*",
                previewsContainer: dropzoneRef.current, // Usamos el contenedor actual para las previsualizaciones
                dictDefaultMessage: `
                    <div class="text-center text-gray-500">
                        <p class="text-lg">Selecciona o arrastra tu voucher aquí</p>
                    </div>
                `,
                dictFileTooBig: "La Imagen pesa mucho: {{filesize}}Mb. y el máximo permitido es {{maxFilesize}}MB.",
                dictInvalidFileType: "Solo puede subir imágenes",
                dictMaxFilesExceeded: "Solo se permite subir 1 imagen al mismo tiempo.",
                sending: function (file, xhr, formData) {
                    formData.append('sale_id', purchase.id);
                    const token = localStorage.getItem("token"); // O donde sea que guardes el token
                    if (token) {
                        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
                    }
                },
                success: function (file, response) {
                    file.previewElement?.classList.add("dz-success");
    
                    setTimeout(() => {
                        cleanDropzone(file);
                        setIsOpen(false);
                        toast.success('¡Voucher subido exitosamente!', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                        // Recargar las compras después de subir el voucher exitosamente
                        dispatch(get_purchases(1));  // Asegúrate de que el dispatch recargue las compras
                    }, 1000);
                },
                error: function (file, error) {
                    file.previewElement?.classList.add("dz-error");
    
                    let errorMessage = 'Ha ocurrido un error, por favor intenta más tarde';
                    if (typeof error === 'string' && error.length < 60) errorMessage = error;
                    if (error?.message) errorMessage = error.message;
                    if (error?.errors?.file) errorMessage = error.errors.file[0];
                    if (error?.errors?.item_id) errorMessage = error.errors.item_id[0];
    
                    toast.warn(errorMessage, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
    
                    setTimeout(() => {
                        cleanDropzone(file);
                    }, 2000);
                }
            });
            setDropzoneInstance(dz);
        }
    }

    function destroyDropzone() {
        if (dropzoneInstance) {
            dropzoneInstance.destroy();
            setDropzoneInstance(null);
        }
    }

    function cleanDropzone(file) {
        if (dropzoneInstance) {
            dropzoneInstance.removeFile(file);
            const previewElement = file.previewElement;
            if (previewElement && previewElement.parentNode) {
                previewElement.parentNode.removeChild(previewElement);
            }
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-ecoprimary1 text-white px-2 py-1 rounded-2 text-xs w-100"
            >
                Pagar
            </button>

            <Transition show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={(open) => {
                    setIsOpen(open);
                    if (!open) destroyDropzone();
                }}>
                    <div className="fixed inset-0 bg-black bg-opacity-10" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterEnter={initDropzone} // Inicializar cuando el modal ya está visible
                        >
                            <Dialog.Panel className="w-full max-w-3xl bg-white rounded-xl p-6 shadow-lg">
                                <Dialog.Title className="text-2xl font-bold text-ecoprimary1 flex justify-between items-center">
                                    Pago con voucher
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-400 hover:text-gray-600 text-xl ml-4"
                                        aria-label="Cerrar"
                                    >
                                        <FontAwesomeIcon icon={faTimes} size="lg" />
                                    </button>
                                </Dialog.Title>

                                <div className="mt-4">
                                    <div className="bg-blue-100 text-blue-900 p-4 rounded-md mb-4">
                                        <p className="mb-2">
                                            Para finalizar la compra deberás subir tu comprobante de pago con un monto de:
                                        </p>
                                        <p className="text-xl font-bold mb-0">
                                            {purchase.amount} Bs.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="border border-dashed rounded-md">
                                            <img
                                                src={purchase.qr_to_pay}
                                                alt="QR"
                                                className="w-full rounded-lg"
                                            />
                                        </div>
                                        <div className="">
                                            <form
                                                ref={dropzoneRef}
                                                className="h-100 dropzone border border-dashed rounded-md flex items-center justify-center p-4 text-center text-gray-500"
                                                style={{ minHeight: "180px" }}
                                            >
                                                {/* Aquí Dropzone reemplazará automáticamente este contenido */}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default UploadVoucherModal;
