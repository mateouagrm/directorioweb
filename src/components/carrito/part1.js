import React, {useMemo, useState, useEffect} from 'react'
import {connect} from "react-redux";
import {update_to_cart} from "../../redux/actions/carrito";
import {toast} from 'react-toastify';
import  ItemCartProduct from "../../widgets/item_cart_product";
import ButtonBack from "../../widgets/button_back";
import ButtonNext from "../../widgets/button_next";

function Part1({update_to_cart, carrito_redux, next, token}) {

    const [carrito, setCarrito] = useState(carrito_redux);

    useEffect(() => {
        update_to_cart(carrito)
    }, [carrito]);

    const subTotal = useMemo(() => {
        return carrito.reduce((acc, producto) => {
            let price = producto.price;
            if (producto.offer) {
                price = producto.offer_price;
            }
            return acc + price * producto.quantity;
        }, 0);
    }, [carrito]);

    const disminuirProducto = (id) => {
        setCarrito((prevCarrito) =>
            prevCarrito.map((p) => p.id === id ? {...p, quantity: p.quantity - 1} : p)
                .filter((p) => p.quantity > 0)
        );
    };
    const aumentarProducto = (id) => {
        setCarrito((prevCarrito) =>
            prevCarrito.map((p) => p.id === id ? {...p, quantity: p.quantity + 1} : p)
        );
    };
    const eliminarProducto = (id) => {
        setCarrito((prevCarrito) => prevCarrito.filter((p) => p.id !== id));
    };


    const volver = () => {
        window.history.back();
    }
    const siguiente = () => {
        if (token) {
            if (carrito.length > 0) {
                next(2);
            } else {
                toast.warn("No se pudo continuar con la compra. Intenta de nuevo o agregue productos al carrito.", {
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

        } else {
            toast.warn("No se pudo continuar con la compra. Intenta de nuevo o inicie sesion.", {
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

    }

    return (
        <>
            <main className="w-full min-h-screen">
                <div className="p-2 lg:p-6 container mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/*Carrito*/}
                        <div className="md:col-span-2 bg-white rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold mb-4 pl-6 pt-6">Carrito</h2>
                            {/*Productos*/}
                            <div
                                className="divide-y mt-4 px-4 md:px-6 max-h-[60vh] md:h-[25rem] overflow-y-auto grid gap-2">
                                {
                                    carrito.map((product, index) =>
                                        <ItemCartProduct eliminarProducto={eliminarProducto}
                                                         disminuirProducto={disminuirProducto}
                                                         aumentarProducto={aumentarProducto}
                                                         product={product}
                                                         key={index}/>
                                    )
                                }

                            </div>
                            {/*Botón seguir comprando*/}
                            <div className="px-2 pb-2">
                                <ButtonBack onClick={volver}
                                            label={"← Seguir comprando"}/>
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
    token: state.Auth.token,
})

export default connect(mapStateToProps, {
    update_to_cart
})(Part1)