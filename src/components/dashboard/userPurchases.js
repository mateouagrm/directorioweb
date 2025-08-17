import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { get_purchases } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';
import UploadVoucherModal from './uploadVoucher';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const UserPurchases = ({
    purchases,
    get_purchases,
    current_page,
    last_page,
    links,
    peticion_purchases
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [voucherUrl, setVoucherUrl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        get_purchases(1);
    }, [get_purchases]);

    useEffect(() => {
        if (!peticion_purchases) {  // Si no está haciendo la petición de compras
            get_purchases(1);  // Vuelve a cargar las compras
        }
    }, [peticion_purchases, get_purchases]);

    const translateState = (state) => {
        switch (state) {
            case 'awaiting':
                return 'Pendiente';
            case 'accepted':
                return 'Aceptada';
            case 'canceled':
                return 'Cancelada';
            default:
                return state;
        }
    };

    const formatDate = (date) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString('es-ES', options);
    };

    const getStateColor = (state) => {
        switch (state) {
            case 'en espera':
                return 'bg-yellow-500 text-white';
            case 'aceptado':
                return 'bg-green-500 text-white';
            case 'preparado':
                return 'bg-green-500 text-white';
            case 'en camino':
                return 'bg-blue-500 text-white';
            case 'entregado':
                return 'bg-gray-500 text-white';
            case 'cancelado':
                return 'bg-red-500 text-white';
            case 'devolucion':
                return 'bg-orange-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const verifyShowVoucher = (purchase) => {
        if (purchase.qr_to_pay != null && purchase.payment_method_id == 1) {
            return true;
        }
        else {
            return false;
        }
    }

    const openModal = (voucherUrl) => {
        setVoucherUrl(voucherUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setVoucherUrl(null);
    };

    return (
        <div className="max-w-6xl mx-xl-auto mt-12 mx-4 p-4 bg-white rounded-xl border shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-ecoprimary1">Tus Compras</h2>

            {peticion_purchases ? (
                <div className="flex justify-center">
                    <div className="animate-spin border-4 border-t-4 border-orange-500 border-solid rounded-full w-10 h-10"></div>
                </div>
            ) : purchases.length === 0 ? (
                <p className="text-gray-500">No tienes compras registradas.</p>
            ) : (
                <>
                    <div className="overflow-x-auto w-full">
                        <table className="min-w-full text-sm rounded-lg overflow-hidden divide-y divide-gray-200">
                            <thead className="bg-blue-200 text-ecoprimary1">
                                <tr>
                                    <th className="px-3 py-2 text-left min-w-[50px]">ID</th>
                                    <th className="px-2 py-2 text-left min-w-[120px]">Código</th>
                                    <th className="px-2 py-2 text-left min-w-[120px]">Monto</th>
                                    <th className="px-2 py-2 text-left min-w-[180px]">Voucher</th>
                                    <th className="px-2 py-2 text-left">Método de pago</th>
                                    <th className="px-2 py-2 text-left min-w-[120px]">Forma de entrega</th>
                                    <th className="px-2 py-2 text-left min-w-[150px]">Fecha</th>
                                    <th className="px-2 py-2 text-left min-w-[120px]">Estado de entrega</th>
                                    <th className="px-2 py-2 text-left min-w-[120px]">Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchases.map((purchase, index) => (
                                    <tr key={index} className="bg-blue-50">
                                        <td className="px-3 py-2">{purchase.id}</td>
                                        <td className="px-2 py-2">{purchase.code}</td>
                                        <td className="px-2 py-2">{purchase.amount} Bs.</td>
                                        <td className="px-2 py-2">
                                            <div className='bg-white rounded-3 p-2 w-100'>
                                                {verifyShowVoucher(purchase) ?
                                                    <div>
                                                        {!(['entregado', 'cancelado', 'devolucion'].includes(purchase.delivery_state.name)) &&
                                                            <div>
                                                                <UploadVoucherModal key={purchase.id} purchase={purchase} />
                                                                <hr className='my-1'></hr>
                                                            </div>
                                                        }

                                                        {purchase.voucher == null ? (
                                                            <div className='bg-red-500 text-white px-2 py-1 rounded-2 text-center text-xs'>
                                                                Sin comprobante
                                                            </div>
                                                        ) : (
                                                            <button
                                                                className="bg-blue-500 text-white px-2 py-1 rounded-2 text-xs w-100"
                                                                onClick={() => openModal(purchase.voucher)}
                                                            >
                                                                Ver comprobante
                                                            </button>
                                                        )}
                                                    </div>
                                                    :
                                                    <div className='flex justify-content-center bg-gray-100 rounded-3 p-2 w-100'>
                                                        S/D
                                                    </div>
                                                }
                                            </div>

                                        </td>
                                        <td className="px-2 py-2">{purchase.payment_method.name}</td>
                                        <td className="px-2 py-2">{purchase.delivery_method.name}</td>
                                        <td className="px-2 py-2">{formatDate(purchase.created_at)}</td>
                                        <td className="px-2 py-2">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getStateColor(purchase.delivery_state.name)}`}>
                                                {translateState(purchase.delivery_state.name)}
                                            </span>
                                        </td>
                                        <td className="px-2 py-2">
                                            <button
                                                className="bg-ecoprimary1 text-white px-2 py-1 rounded-2 text-xs transition duration-200"
                                                onClick={() => navigate(`/dashboard/compra/${purchase.code}`)}
                                            >
                                                Ver detalle
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Paginación */}
                    <div className="flex justify-end mt-6 space-x-2">
                        {links && links.map((link, index) => {
                            const label = link.label.replace('&laquo;', '«').replace('&raquo;', '»');
                            return (
                                <button
                                    key={index}
                                    disabled={!link.url}
                                    onClick={() => {
                                        const urlParams = new URLSearchParams(link.url?.split('?')[1]);
                                        const page = parseInt(urlParams.get('page'));
                                        if (page) get_purchases(page);
                                    }}
                                    className={`px-3 py-1 rounded-md border 
                                        ${link.active
                                            ? 'bg-ecoprimary1 text-white font-bold'
                                            : 'bg-white text-ecoprimary1 hover:bg-blue-100 border-ecoprimary1'}`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}

            {/* Modal para mostrar el voucher */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 overflow-hidden">
                        {/* Encabezado con título y botón de cerrar */}
                        <div className="p-3 text-2xl font-bold text-ecoprimary1 flex justify-between items-center">
                            Comprobante
                            <button
                                onClick={() => closeModal()}
                                className="text-gray-400 hover:text-gray-600 text-xl ml-4"
                                aria-label="Cerrar"
                            >
                                <FontAwesomeIcon icon={faTimes} size="lg" />
                            </button>
                        </div>

                        {/* Contenedor de la imagen */}
                        <div className="flex justify-center p-3">
                            <img
                                src={voucherUrl}
                                alt="Voucher"
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    purchases: state.User.purchases,
    current_page: state.User.current_page,
    last_page: state.User.last_page,
    links: state.User.links,
    peticion_purchases: state.User.peticion_purchases
});

export default connect(mapStateToProps, { get_purchases })(UserPurchases);
