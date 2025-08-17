import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import ItemProducto from "../../widgets/item_producto";



function RelatedAds({ products_relations }) {

    const [arrayRelated, setArrayRelated] = useState([]);

    useEffect(() => {
        if (products_relations) {
            setArrayRelated(products_relations);
        }
    }, [products_relations]);

    const updateFavoriteStatus = (productId, isFavorite) => {
        // Actualizar el estado de los productos localmente
        const updatedProducts = arrayRelated.map(product =>
            product.id === productId ? { ...product, is_favorite: isFavorite ? 1 : 0 } : product
        );

        setArrayRelated(updatedProducts);
    };

    return (
        <>
            <section className="mt-5">
                <div className="container">
                    <h2 className="text-left pb-[24px] border-b border-ecoprimary1">
                        Productos relacionados
                    </h2>
                    <div className="body-container">
                        <div className="row">
                            {
                                arrayRelated.map((product, index) =>
                                    <div className="col-6 col-lg-2 mb-3 p-2" key={index}>
                                        <ItemProducto
                                            product={product}
                                            updateFavoriteStatus={updateFavoriteStatus}  // Pasamos la función
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}

const mapStateToProps = state => ({
    products_relations: state.Product.products_relations,
})

export default connect(mapStateToProps, {})(RelatedAds)