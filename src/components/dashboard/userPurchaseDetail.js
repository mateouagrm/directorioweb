import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { get_sale, petition_true_get_sale } from '../../redux/actions/user';
import { useNavigate, useParams } from 'react-router-dom';
import { faAngleLeft, faMoneyBill, faTruck, faBox, faStore } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserPurchases = ({
    purchase,
    get_sale,
    petition_true_get_sale,
    peticion_purchase,
}) => {
    const { codigo } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (codigo) {
            getDetail();
        }
    }, [codigo]);

    const getDetail = () => {
        petition_true_get_sale();
        get_sale(codigo);
    }

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
            case 'awaiting':
                return 'bg-yellow-500 text-white';
            case 'accepted':
                return 'bg-green-500 text-white';
            case 'canceled':
                return 'bg-red-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <div className='row max-w-6xl mx-2 mx-xl-auto pt-12'>

            <div className='col-12 mx-xl-auto'>
                <div className="p-3 p-sm-4 bg-white rounded-xl border shadow-sm">
                    <div className='flex'>
                        <button
                            className="flex align-items-center bg-ecoprimary1 text-white px-3 py-2 rounded-3"
                            onClick={() => navigate('/dashboard/compras')}
                        >
                            <FontAwesomeIcon icon={faAngleLeft} className="text-xl" />
                        </button>

                        <h2 className="text-2xl font-bold text-ecoprimary1 mb-0 ms-2">Detalle de la compra: {codigo} </h2>
                    </div>
                    <hr></hr>

                    {purchase &&
                        (
                            <div className='flex justify-content-between'>
                                <span className='fw-bold'>
                                    {formatDate(purchase.created_at)}
                                </span>
                                <div className='flex align-items-center'>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getStateColor(purchase.delivery_state.name)}`}>
                                        {purchase.delivery_state.name}
                                    </span>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>

            {/* FORMA DE PAGO */}
            <div className='col-12 col-sm-6 mt-4'>
                <div className="p-3 p-sm-4 bg-white rounded-xl border shadow-sm">
                    <div className='flex mb-3 align-items-center'>
                        <button
                            className="flex align-items-center justify-content-center bg-blue-200 text-ecoprimary1 rounded-3 w-[38px] h-[38px]"
                            onClick={() => navigate('/dashboard/compras')}
                        >
                            <FontAwesomeIcon icon={faMoneyBill} className="text-xl" />
                        </button>
                        <h2 className="ms-2 mb-0 text-xl font-bold text-ecoprimary1">Forma de pago: </h2>

                    </div>
                    {peticion_purchase ? (
                        <div className="flex justify-center">
                            <div className="animate-spin border-4 border-t-4 border-ecoprimary1 border-solid rounded-full w-8 h-8"></div>
                        </div>
                    ) : purchase === null ? (
                        <p className="text-gray-500">No hay datos registrados.</p>
                    ) : (
                        <>
                            <div className="bg-blue-50 text-sm rounded-lg overflow-hidden p-3 fw-medium">
                                {purchase.payment_method.name}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* FORMA DE ENTREGA */}
            <div className='col-12 col-sm-6 mt-4'>
                <div className="p-3 p-sm-4 bg-white rounded-xl border shadow-sm">
                    <div className='flex mb-3 align-items-center'>
                        <button
                            className="flex align-items-center justify-content-center bg-blue-200 text-ecoprimary1 rounded-3 w-[38px] h-[38px]"
                            onClick={() => navigate('/dashboard/compras')}
                        >
                            <FontAwesomeIcon icon={faTruck} className="text-xl" />
                        </button>
                        <h2 className="ms-2 mb-0 text-xl font-bold text-ecoprimary1">Forma de entrega: </h2>
                    </div>
                    {peticion_purchase ? (
                        <div className="flex justify-center">
                            <div className="animate-spin border-4 border-t-4 border-ecoprimary1 border-solid rounded-full w-8 h-8"></div>
                        </div>
                    ) : purchase === null ? (
                        <p className="text-gray-500">No hay datos registrados.</p>
                    ) : (
                        <>
                            <div className="bg-blue-50 text-sm rounded-lg overflow-hidden p-3 fw-medium flex justify-content-between">
                                {purchase.delivery_method.name}


                            </div>

                        </>
                    )}
                </div>
            </div>

            {/* PRODUCTOS */}
            <div className='col-12 mx-xl-auto mt-4 '>
                <div className="p-3 p-sm-4 bg-white rounded-xl border shadow-sm">
                    <div className='flex mb-3 align-items-center'>
                        <button
                            className="flex align-items-center justify-content-center bg-blue-200 text-ecoprimary1 rounded-3 w-[38px] h-[38px]"
                            onClick={() => navigate('/dashboard/compras')}
                        >
                            <FontAwesomeIcon icon={faBox} className="text-xl" />
                        </button>
                        <h2 className="ms-2 mb-0 text-xl font-bold text-ecoprimary1">Productos: </h2>
                    </div>
                    {peticion_purchase ? (
                        <div className="flex justify-center">
                            <div className="animate-spin border-4 border-t-4 border-ecoprimary1 border-solid rounded-full w-8 h-8"></div>
                        </div>
                    ) : purchase === null ? (
                        <p className="text-gray-500">No hay datos registrados.</p>
                    ) : (
                        <>
                            <div className="overflow-x-auto w-full">
                                <table className="min-w-full text-sm rounded-lg overflow-hidden">
                                    <thead className="bg-blue-200 text-ecoprimary1">
                                        <tr>
                                            <th className="px-3 py-2 text-left">ID</th>
                                            <th className="px-3 py-2 text-left">Imagen</th>
                                            <th className="px-3 py-2 text-left min-w-[120px]">Nombre</th>
                                            <th className="px-3 py-2 text-left min-w-[120px]">Monto</th>
                                            <th className="px-3 py-2 text-left">Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {purchase.products.map((product, index) => (
                                            <tr key={index} className="bg-blue-50">
                                                <td className="px-3 py-2">{product.id}</td>
                                                <td className="px-3 py-2">
                                                    {product.first_image ? (
                                                        <img
                                                            src={product.first_image}
                                                            alt={product.name}
                                                            className="w-12 h-12 object-cover rounded-md"
                                                        />
                                                    ) : (
                                                        <span className="text-gray-400 text-sm">Sin imagen</span>
                                                    )}
                                                </td>
                                                <td className="px-3 py-2">{product.name}</td>
                                                <td className="px-3 py-2">{product.pivot.price} Bs.</td>
                                                <td className="px-3 py-2">{product.pivot.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* TIENDA*/}
            <div className='col-12 col-sm-6 mt-4'>
                <div className="p-3 p-sm-4 bg-white rounded-xl border shadow-sm">
                    <div className='flex mb-3 align-items-center'>
                        <button
                            className="flex align-items-center justify-content-center bg-blue-200 text-ecoprimary1 rounded-3 w-[38px] h-[38px]"
                            onClick={() => navigate('/dashboard/compras')}
                        >
                            <FontAwesomeIcon icon={faStore} className="text-xl" />
                        </button>
                        <h2 className="ms-2 mb-0 text-xl font-bold text-ecoprimary1">Tienda: </h2>

                    </div>
                    {peticion_purchase ? (
                        <div className="flex justify-center">
                            <div className="animate-spin border-4 border-t-4 border-ecoprimary1 border-solid rounded-full w-8 h-8"></div>
                        </div>
                    ) : purchase === null ? (
                        <p className="text-gray-500">No hay datos registrados.</p>
                    ) : (
                        <>
                            <div className="bg-blue-50 text-sm rounded-lg overflow-hidden p-3 fw-medium flex align-items-center">
                                <img
                                    src={purchase.store.logo}
                                    alt={purchase.store.name}
                                    className="w-12 h-12 object-cover rounded-md"
                                />
                                <div className='ms-2 fs-6'>
                                    {purchase.store.name}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {/* FORMA DE ENTREGA */}
            <div className='col-12 col-sm-6 mt-4'>
                <div className="p-3 p-sm-4 bg-white rounded-xl border shadow-sm">
                    <div className='flex mb-3 align-items-center'>
                        <button
                            className="flex align-items-center justify-content-center bg-blue-200 text-ecoprimary1 rounded-3 w-[38px] h-[38px]"
                            onClick={() => navigate('/dashboard/compras')}
                        >
                            <FontAwesomeIcon icon={faMoneyBill} className="text-xl" />
                        </button>
                        <h2 className="ms-2 mb-0 text-xl font-bold text-ecoprimary1">Total compra: </h2>
                    </div>
                    {peticion_purchase ? (
                        <div className="flex justify-center">
                            <div className="animate-spin border-4 border-t-4 border-ecoprimary1 border-solid rounded-full w-8 h-8"></div>
                        </div>
                    ) : purchase === null ? (
                        <p className="text-gray-500">No hay datos registrados.</p>
                    ) : (
                        <>
                            <div className="bg-blue-50 text-sm rounded-lg overflow-hidden p-3 fw-medium">
                                <div className='flex justify-content-between mb-2'>
                                    Productos:
                                    <span>{purchase.amount} Bs</span>
                                </div>
                                <div className='flex justify-content-between'>
                                    Envio:
                                    <span>{purchase.delivery} Bs</span>
                                </div>
                                <hr className='my-2'></hr>
                                <div className='flex justify-content-between text-lg'>
                                    Total
                                    <span>
                                        {(parseFloat(purchase.amount) + parseFloat(purchase.delivery)).toFixed(2)} Bs
                                    </span>
                                </div>
                            </div>

                        </>
                    )}
                </div>
            </div>


        </div>
    );
};

const mapStateToProps = state => ({
    purchase: state.User.purchase,
    peticion_purchase: state.User.peticion_purchase
});

export default connect(mapStateToProps, { get_sale, petition_true_get_sale })(UserPurchases);
