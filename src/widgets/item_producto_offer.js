import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { set_favorite_product } from "../redux/actions/product";
import { toast } from "react-toastify";

function ItemProductoOffer({ product, set_favorite_product, get_products }) {

    const isFavorite = product.is_favorite === 1;

    const setFavorite = async () => {
        await set_favorite_product(product.id);
        toast.success(
            isFavorite ? "Producto eliminado de favoritos" : "Producto agregado a favoritos",
            {
                position: "top-right",
                autoClose: 3000, // Cerrar en 3 segundos
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
        );
        get_products(1);
    };



    return (
        <div className="bg-white border border-orange-500 rounded-lg shadow pt-4 pb-2 relative overflow-hidden">
            <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                {((1 - (product.offer_price / product.previous_price)) * 100).toFixed()}%
                <br />
                Off
            </span>
            <Link to={`/producto/${product.id}`}>
                <img
                    src={product.first_image}
                    alt={product.name}
                    className="mx-auto w-full max-w-[120px] h-auto aspect-square bg-gray-200"
                />
            </Link>
            <div className="w-100 pt-2">
                <div className="mt-2">
                    <div className="flex justify-between items-center px-2">
                        <p className="text-sm font-bold mb-0">
                            Bs {product.price} <span className="text-gray-400 line-through text-xs">{product.oldPrice}</span>
                        </p>
                        {/* Botón de favorito */}
                        <button
                            className={`${isFavorite ? "text-red-500" : "text-gray-500"}`}
                            onClick={setFavorite}
                        >
                            <FontAwesomeIcon icon={faHeart} className="text-lg" />
                        </button>
                    </div>
                    <p className="text-sm font-medium float-start px-2">{product.name}</p>
                </div>
            </div>
        </div>
    );
}

// Conectamos el componente a Redux
export default connect(null, { set_favorite_product })(ItemProductoOffer);
