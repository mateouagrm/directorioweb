import React from "react";
import {connect} from "react-redux";

import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faHeart, faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {set_favorite_product} from "../redux/actions/product";
import {toast} from "react-toastify";


function ItemCartProduct({product,eliminarProducto, disminuirProducto, aumentarProducto, key}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center border p-4 rounded-lg shadow-sm gap-4 max-h-fit" key={key}>
            {/* Imagen y botón Eliminar */}
            <div className="flex items-center gap-2 flex-row">
                <FontAwesomeIcon icon={faTrash}  onClick={() => eliminarProducto(product.id)} className="w-4 h-4 sm:mb-1 text-danger"/>
                <div>
                    <img
                        src={product.first_image}
                        alt={product.name}
                        className="w-16 h-auto"
                    />
                </div>
            </div>

            {/* Información del producto */}
            <div className="flex-1 flex flex-col justify-between gap-3">
                {/* Título y precio total */}
                <div className="flex justify-between flex-wrap gap-2">
                    <div>
                        <h3 className="font-semibold text-lg text-gray-800">
                            {product.name}
                        </h3>
                        {
                            product.offer ?
                                <>
                                <span
                                    className="text-sm line-through text-gray-400 md:mr-0 mr-2">Bs {product.previous_price}</span>
                                    <span className=" text-sm font-bold">Bs{product.offer_price}</span>
                                </>
                                :  <span className="text-sm font-bold">Bs {product.price}</span>
                        }
                    </div>
                    <div className="text-right text-sm font-semibold text-gray-800">
                        Bs {product.offer ? Number(product.quantity * product.offer_price) : Number(product.quantity * product.price)}
                    </div>
                </div>

                {/* Controles de cantidad */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => disminuirProducto(product.id)}
                        className="bg-ecoprimary1 text-white rounded px-2 py-1">
                          <FontAwesomeIcon icon={faMinus} size="sm"/>
                    </button>
                    <div className="border rounded px-4 py-1 text-sm font-semibold">
                        {product.quantity}
                    </div>
                    <button className="bg-ecoprimary1 text-white rounded px-2 py-1" onClick={() => aumentarProducto(product.id)}>
                        <FontAwesomeIcon icon={faPlus} size="sm"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

// Conectamos el componente a Redux
export default connect(null, {})(ItemCartProduct);
