import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {add_to_cart, dec_to_cart, inc_to_cart, remove_to_cart} from "../../redux/actions/carrito";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

function Information({data, carrito, add_to_cart, inc_to_cart, dec_to_cart, remove_to_cart, buy}) {
    const [cantidad, guardarCantidad] = useState(0);


    useEffect(() => {
        if (data) {
            let producto_carrito = carrito.find((prd) => prd.id === data.id);
            if (producto_carrito) {
                guardarCantidad(producto_carrito.quantity);
            } else {
                guardarCantidad(0);
            }
        }
    }, [data]);


    const add_carrito = () => {
        if (buy) {
            if (cantidad < Number(data.stock)) {
                guardarCantidad(Number(cantidad) + 1);
                if (cantidad === 0) {

                    add_to_cart(data, 1);
                } else {
                    inc_to_cart(data);
                }
            }else{

            }

        }
    }

    const reducir_carrito = () => {
        if (cantidad === 1) {
            guardarCantidad(cantidad - 1);
            remove_to_cart(data);
        } else if (cantidad >= 1) {
            guardarCantidad(cantidad - 1);
            dec_to_cart(data);
        }
    }

    return (
        <>
            {
                data &&
                <div className="p-6">
                    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
                        <h1 className="text-lg font-bold">{data.name}</h1>
                        <Link className={"no-underline"} to={`/productos/${data.tienda.slug}`}>
                            <div className="bg-default1 w-full px-2 py-2 flex items-center justify-between">
                                <div className="">
                                    <p className="text-ecoprimary1 font-normal mb-0">Tienda :
                                        <span className="font-medium ml-2">{data.tienda.name}</span>
                                    </p>
                                    <span className="text-xs text-default3">Presiona para ver la tienda</span>
                                </div>
                                <div>
                                    <FontAwesomeIcon
                                        icon={faChevronRight}
                                        className="block h-6 w-6 text-ecoprimary1"/>
                                </div>
                            </div>
                        </Link>
                        <div className="flex items-center mt-2">
                            {
                                data.offer ?
                                    <>
                                        <span className="text-red-500 text-2xl font-bold">Bs. {data.offer_price}</span>
                                        <span
                                            className="text-gray-400 line-through ml-2">Bs. {data.previous_price}</span>
                                        <span
                                            className="bg-yellow-400 text-xs text-black font-bold px-2 py-1 ml-2 rounded">{((1 - (data.offer_price / data.previous_price)) * 100).toFixed()}% OFF</span>
                                    </>
                                    :
                                    <span className="text-red-500 text-2xl font-bold">Bs. {data.price}</span>
                            }
                        </div>
                        {/*<p className="mt-4 font-medium">Color</p>*/}
                        <div className="flex gap-2">
                            {/*{*/}
                            {/*    Object.keys(data.colour).length !== 0 &&*/}
                            {/*    data.colour.map((item, key) =>*/}
                            {/*        <>*/}
                            {/*            <div className="flex items-center gap-2 mt-2">*/}
                            {/*                <div*/}
                            {/*                    className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center">*/}
                            {/*                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>*/}
                            {/*                </div>*/}
                            {/*                {item.name}*/}
                            {/*            </div>*/}
                            {/*        </>*/}
                            {/*    )*/}
                            {/*}*/}
                        </div>
                        <div className="flex items-center mt-4 gap-4">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button onClick={() => reducir_carrito()} className="text-gray-600 px-3 py-2">
                                    <FontAwesomeIcon
                                        icon={faMinus}
                                        className="block h-6 w-6"/>
                                </button>
                                <span className="mx-3">{cantidad}</span>
                                <button onClick={() => add_carrito()} className="text-gray-600  px-3 py-2">
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className="block h-6 w-6"/>
                                </button>
                            </div>
                            {
                                cantidad > 0 &&
                                <Link className="no-underline"
                                      to={'/carrito'}>
                                    <button type="button"
                                            className="bg-ecoprimary1 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                                        <span>COMPRAR</span>
                                        <span>&#128722;</span>
                                    </button>
                                </Link>

                            }

                        </div>

                        {/*<div className="flex items-center mt-4 gap-4 text-gray-500 text-sm">*/}
                        {/*    <button className="flex items-center gap-1">&#9825; Agregar a favorito</button>*/}
                        {/*    <button className="flex items-center gap-1">&#128279; Compartir</button>*/}
                        {/*</div>*/}

                        {/*<div className="mt-4 text-sm text-gray-700 flex justify-between border-b border-gray-300">*/}
                        {/*    <div>*/}
                        {/*        <p><strong>Categoria:</strong>*/}
                        {/*            <span className="text-blue-600">*/}
                        {/*                /!* {data.category_name} *!/*/}
                        {/*            </span>*/}
                        {/*        </p>*/}
                        {/*        <p><strong>Sub categoria:</strong>*/}
                        {/*            <span className="text-blue-600">*/}
                        {/*                /!* {data.sub_category_name} *!/*/}
                        {/*            </span>*/}
                        {/*        </p>*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <p><strong>Stock:</strong> En Stock</p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="mt-2">
                            <h2 className="text-lg font-semibold">Descripción</h2>
                            <div className="text-gray-600 text-sm mt-2"
                                 dangerouslySetInnerHTML={{__html: data.description}}/>
                        </div>
                    </div>
                </div>
            }

        </>
    );
}

const mapStateToProps = state => ({
    carrito: state.Cart.carrito,
})

export default connect(mapStateToProps, {
    add_to_cart, inc_to_cart, dec_to_cart, remove_to_cart
})(Information)