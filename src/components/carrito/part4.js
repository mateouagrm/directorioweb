import React, {useEffect, useMemo, useState} from 'react'
import {connect} from "react-redux";
import {buy, cleanPurchase} from "../../redux/actions/carrito";
import {toast} from 'react-toastify';
import Payment from "../../redux/reducers/payment";
import ItemCartProductInfo from "../../widgets/item_cart_product_info";
import Swal from 'sweetalert2';
import {useNavigate} from "react-router-dom";
import ButtonBack from "../../widgets/button_back";
import ButtonNext from "../../widgets/button_next";

function Part4({buy, next, carrito_redux, user, location, saled, cleanPurchase, data_payment}) {
    const navigate = useNavigate();
    const [carrito, setCarrito] = useState(carrito_redux);

    useEffect(() => {
        if (saled) {

        }
    }, [saled]);


    const subTotal = useMemo(() => {
        return carrito.reduce((acc, producto) => {
            let price = producto.price;
            if (producto.offer) {
                price = producto.offer_price;
            }
            return acc + price * producto.quantity;
        }, 0);
    }, [carrito]);

    const volver = () => {
        next(3);
    }
    const siguiente = async () => {
        let products = carrito.map((item) => {
            return {
                id: item.id,
                offer: item.offer,
                price: item.price,
                offer_price: item.offer_price,
                quantity: item.quantity,
                store_id: item.store_id,
                color: null,
            }
        });
        let store_id = carrito[0].store_id;

        let address_id = null;
        if (data_payment.delivery_method_id === 1) {
            address_id = location.id;
        }

        let data = {
            'products': JSON.stringify(products),
            'client_id': user.id,
            'payment_method_id': data_payment.payment_method_id,
            'delivery_method_id': data_payment.delivery_method_id,
            'invoice_id': localStorage.getItem('invoice_id'),
            'address_id': address_id,
            'store_id': store_id,
        };
        const success = await buy(data);
        if (success) {
            await Swal.fire({
                title:'Exito!',
                text: "La compra fue realizado exitosamente",
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#0049a8',
                cancelButtonColor: '#e5e7eb',
                cancelButtonText: ' ← Ir a inicio',
                confirmButtonText: ' Ir a listado de compra! →',
                reverseButtons: true,
                allowEscapeKey: false,
                backdrop: true,
                allowOutsideClick: false
            }).then((result) => {
                cleanPurchase();
                if (result.isConfirmed) {
                    navigate('/dashboard/compras');
                }
                if (result.isDismissed) {
                    navigate('/');
                }
            });
        } else {
            toast.error("No se pudo realizar la compra. Intenta de nuevo.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: "No se pudo realizar la compra. Intenta de nuevo...",
                confirmButtonColor: '#000000',
            })
        }
    }

    return (
        <>
            <main className="w-full min-h-screen">
                <div className="p-6 container mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/*Carrito*/}
                        <div className="md:col-span-2 bg-white rounded-lg shadow-lg ">
                            <h2 className="text-xl font-bold mb-4 pl-6 pt-6">Carrito</h2>
                            {/*Productos*/}
                            <div className="divide-y mt-4 px-4 md:px-6 max-h-[60vh] md:h-[25rem] overflow-y-auto grid gap-2">
                                {
                                    carrito.map((product, index) =>
                                        <ItemCartProductInfo  product={product} key={index} />
                                    )
                                }

                            </div>
                            {/*Botón seguir comprando*/}
                            <div className="px-2 py-2">
                                <ButtonBack onClick={volver} label="← Volver"/>
                            </div>

                        </div>

                        {/*Resumen*/}
                        <div className=" ">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-xl font-bold mb-4">Resumen</h2>
                                <div className="flex justify-between py-2 border-b">
                                    <span>Sub-total</span>
                                    <span>Bs {subTotal}</span>
                                </div>

                                <div className="flex justify-between py-4 text-lg font-bold">
                                    <span>Total parcial</span>
                                    <span>Bs {subTotal}</span>
                                </div>
                                <ButtonNext className="w-full"
                                            onClick={siguiente}
                                            label={"Comprar!!!"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

const mapStateToProps = state => ({
    saled: state.Cart.saled,
    carrito_redux: state.Cart.carrito,
    user: state.Auth.user,
    location: state.Location.location,
    data_payment: state.Payment.data_payment,
})

export default connect(mapStateToProps, {
    buy, cleanPurchase
})(Part4)