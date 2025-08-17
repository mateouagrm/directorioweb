import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { set_favorite_product } from "../redux/actions/product";
import { toast } from "react-toastify";


function ItemProducto({ product, set_favorite_product, updateFavoriteStatus }) {

    const isFavorite = product.is_favorite === 1;
    const userLoggedIn = !!localStorage.getItem("token");

    const setFavorite = async () => {
        await set_favorite_product(product.id, !isFavorite);
        // Actualizamos el estado global

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

        // Aquí actualizamos el estado de la lista de productos
        updateFavoriteStatus(product.id, !isFavorite);  // Le pasamos el id del producto y su nuevo estado de favorito
    };


    return (
        <Link className="no-underline" to={`/producto/${product.slug}`}>
            <div className="bg-white border rounded-lg shadow-md relative overflow-hidden transform transition-transform duration-300 hover:scale-105">

                {userLoggedIn && (
                    <button
                        className={`btn-favorite ${isFavorite ? "text-red-500" : "text-gray-500"}`}
                        onClick={(e) => {
                            e.preventDefault();     // Evita que se siga el enlace
                            e.stopPropagation();    // Detiene la propagación del evento hacia el <Link>
                            setFavorite();
                        }}>
                        <FontAwesomeIcon icon={faHeart} className="text-lg" />
                    </button>
                )}
                {
                    product.offer ?
                        (
                            <span className="absolute top-0 right-0 bg-ecoprimary2 text-ecoprimary1 text-xs font-bold px-2 py-1 rounded-bl-lg">
                                <>
                                    {Math.floor(product.offer_percentage_price)}%
                                    <br />
                                    Off
                                </>
                            </span>
                        ) : null
                }
                {/* <Link to={`/producto/${product.id}`}> */}
                <img
                    src={product.first_image}
                    alt={product.name}
                    className="w-full bg-gray-200 object-cover aspect-[1/1] mb-2"
                />
                {/* </Link> */}
                <div className="flex flex-col justify-between px-3 pb-3 min-h-[100px]">
                    <p className="mb-1 text-secondary text-sm line-clamp-2">{product.name}</p>
                    {product.offer ?

                        <p className="font-bold mb-0 text-black">
                            Bs {product.offer_price} <span className="text-gray-400 line-through text-xs">{product.previous_price}</span>
                        </p>
                        :
                        <p className="font-bold mb-0 text-black">
                            Bs {product.price}
                        </p>

                    }
                </div>
                <div className="my-2 mx-2" >
                    <button className="bg-blue-100 text-ecoprimary1 fw-medium px-4 py-2 rounded-2 text-sm w-100">Ver producto</button>
                </div>
            </div>
        </Link>
    );
}

// Conectamos el componente a Redux
export default connect(null, { set_favorite_product })(ItemProducto);
