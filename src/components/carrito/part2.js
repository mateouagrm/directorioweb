import React, {useEffect, useMemo, useState} from 'react'
import {connect} from "react-redux";
import PaymentMethod from "./payment_method";
import Invoice from "./invoice";
import Delivery from "./delivery";
import {check_user_invoice, post_user_invoice, set_data_payment} from "../../redux/actions/payment";
import ButtonBack from "../../widgets/button_back";
import ButtonNext from "../../widgets/button_next";


function Part2({next, carrito_redux, post_user_invoice, user, set_data_payment, invoices, check_user_invoice}) {
    const [carrito, setCarrito] = useState(carrito_redux);
    const [data, setData] = useState({});


    useEffect(() => {
        if (Object.keys(data).length > 0) {
            set_data_payment(data);
        }
    }, [data]);

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
        next(1);
    }

    const siguiente = () => {
        let aux = {
            'user_id' : user.id,
            'nit' : data.nit,
            'razon' : data.razon
        }

        let check = invoices.find(inv => inv.name === data.razon && inv.nit === data.nit);
        if (check && !check.is_check) {
            let invoice_item = {
                user_id: user.id,
                invoice_id: check.id
            }
            check_user_invoice(invoice_item);
        }else if (data.nit && data.razon) {
            post_user_invoice(aux);
        }
        next(3);
    }

    const updateData = (value) => {
        setData((prevData) => ({
            ...prevData,
            ...value
        }));
    }


    return (
        <>
            <main className="w-full min-h-screen">
                <div className="p-6 container mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/*Carrito*/}
                        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <PaymentMethod update={updateData}  />
                                <Delivery update={updateData} />
                            </div>
                            <Invoice update={updateData} />

                            <div className="mt-4">
                                <ButtonBack onClick={volver}
                                            label={"← Volver"}/>
                            </div>
                        </div>


                        {/*Resumen*/}
                        <div className=" ">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-xl font-bold mb-4">Resumen</h2>
                                <div className="flex justify-between py-2 border-b">
                                    <span>Sub-total</span>
                                    <span>Bs{subTotal}</span>
                                </div>

                                <div className="flex justify-between py-4 text-lg font-bold">
                                    <span>Total parcial</span>
                                    <span>Bs{subTotal}</span>
                                </div>
                                <ButtonNext className="w-full"
                                            onClick={siguiente}
                                            label={"Continuar →"}
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
    carrito_redux: state.Cart.carrito,
    user: state.Auth.user,
    invoices: state.Payment.invoices,
})

export default connect(mapStateToProps, {
    post_user_invoice, set_data_payment, check_user_invoice
})(Part2)