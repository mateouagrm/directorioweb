import React, {useState, useEffect, useMemo} from 'react'
import {connect} from "react-redux";
import Location from "./Location";
import {toast} from "react-toastify";
import ButtonBack from "../../widgets/button_back";
import ButtonNext from "../../widgets/button_next";

function Part3({next, user, location, carrito_redux, data_payment}) {
    const [carrito, setCarrito] = useState(carrito_redux);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [descriptionOption, setDescriptionOption] = useState('');
    const [isDeliveryStore, setIsDeliveryStore] = useState(data_payment.delivery_method_id == 1 ? true : false);

    const subTotal = useMemo(() => {
        return carrito.reduce((acc, producto) => {
            let price = producto.price;
            if (producto.offer) {
                price = producto.offer_price;
            }
            return acc + price * producto.quantity;
        }, 0);
    }, [carrito]);

    useEffect(() => {
        if (location) {
            setPhone(location.phone);
            setAddress(location.address);
        }

    }, [location]);

    useEffect(() => {
        let data_entrega = JSON.parse(localStorage.getItem('data_entrega')) ?? '';
        if (data_entrega) {
            setDescriptionOption(data_entrega.descriptionOption);
        }

    }, []);

    const volver = () => {
        next(2);
    }
    const siguiente = () => {
        if (isDeliveryStore) {
            if (location) {
                let data = {
                    'phone': phone,
                    'address': address,
                    'descriptionOption': descriptionOption,
                };
                localStorage.setItem("data_entrega", JSON.stringify(data));
                next(4);
            } else {
                toast.warn("No se pudo continuar con la compra. Intenta de nuevo o seleccione una dirección.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }else {
            next(4);
        }



    }

    return (
        <>
            <main className="w-full min-h-screen">
                <div className="p-6 container mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/*Carrito*/}
                        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg ">
                            <h2 className="text-lg font-bold mb-4">Datos dirección de entrega</h2>

                            <div className="mb-4">
                                <label className="block text-gray-700">Datos personales</label>
                                <div className="flex flex-col md:flex-row gap-2">
                                    <input type="text" placeholder="Nombre" value={name}
                                           onChange={(e) => setName(e.target.value)}
                                           className="form-control w-full md:w-1/2"/>
                                </div>
                            </div>
                            {
                                isDeliveryStore &&
                                <div className="mb-4">
                                    <label className="block text-gray-700">Dirección</label>
                                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                                           className="form-control w-full" placeholder=""/>
                                </div>
                            }


                            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700">Correo</label>
                                    <input type="email" value={email || ''}
                                           className="form-control w-full !bg-[#cccccc]" readOnly={true}
                                           placeholder="correo_del_registro@gmail.com"/>
                                </div>
                                <div>
                                    <label className="block text-gray-700">Celular</label>
                                    <input type="text" className="form-control w-full" value={phone || ''}
                                           onChange={(e) => setPhone(e.target.value)} placeholder="+59173643349"/>
                                </div>
                            </div>
                            {
                                isDeliveryStore &&
                                <div className="mb-4">
                                    <Location/>
                                </div>
                            }
                            <div className="mt-4">
                                <ButtonBack onClick={volver} label="← Volver"/>
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
    user: state.Auth.user,
    location: state.Location.location,
    carrito_redux: state.Cart.carrito,
    data_payment: state.Payment.data_payment,
})

export default connect(mapStateToProps, {})(Part3)