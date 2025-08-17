import React, { useEffect, useState } from "react";
import Layout from "../hocs/Layout";
import { connect } from "react-redux";
import Filter from "../components/prod_list/filter";
import InfiniteScroll from "react-infinite-scroll-component";
import LoaderSpinner from "../widgets/loaderSpinner";
import ItemProducto from "../widgets/item_producto";
import { get_new_products, petition_true_new } from "../redux/actions/catalog";

const NewProduct = ({
    get_new_products,
    new_products,
    petition_true_new,
    productos_peticion_new,
    peticion_new,
}) => {

    const [arrayProducts, setArrayProducts] = useState([]);
    const [filter, setFilter] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setArrayProducts([]); // limpia antes de cargar
        setPage(1);
        get_new_products(filter, 1);
    }, [filter]);


    useEffect(() => {
        if (new_products) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setArrayProducts(new_products);
        }
    }, [new_products]);


    const get_array_products = (page = 1) => {
        let datos = {
            new: 1,
        }
        if (filter) {
            datos = { ...datos, min: filter.min, max: filter.max, descuento: filter.descuento }
        }
        get_new_products(datos, page);
    }


    // Función para obtener más productos
    const get_products_next = () => {
        petition_true_new();
        if (productos_peticion_new) {
            const nextPage = page + 1;
            setPage(nextPage);
            get_array_products(nextPage);
        }
    };

    const updateFavoriteStatus = async (productId, isFavorite) => {
        const updatedProducts = arrayProducts.map(product =>
            product.id === productId
                ? { ...product, is_favorite: isFavorite ? 1 : 0 }
                : product
        );
        setArrayProducts(updatedProducts);
    };

    return (
        <Layout>
            <main className="w-full min-h-screen">
                <section className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-sm-4 col-lg-3 col-xl-2 mt-4 px-3 ps-sm-4 pe-sm-0">
                            <Filter sendData={setFilter} />
                        </div>
                        <div className="col-12 col-sm-8 col-lg-9 col-xl-10 px-2 px-sm-4 mt-3">
                            <div>
                                <InfiniteScroll
                                    dataLength={arrayProducts.length}
                                    next={get_products_next}
                                    hasMore={productos_peticion_new}
                                    loader={
                                        (peticion_new && productos_peticion_new) &&
                                        <div className="mt-4">
                                            <LoaderSpinner bool={peticion_new}></LoaderSpinner>
                                        </div>
                                    }
                                    scrollableTarget="scrollableDiv"
                                    endMessage={
                                        <div className={`text-center ${arrayProducts.length === 0 ? 'mt-0' : 'mt-4'}`}>
                                            <div className="d-inline-block px-3 py-2 rounded-5 bg-ecoprimary1 text-white">
                                                <b className="text-white p-0 m-0">
                                                    {arrayProducts.length === 0
                                                        ? 'No hay productos disponibles'
                                                        : 'No hay más productos para mostrar'}
                                                </b>
                                            </div>
                                        </div>
                                    }
                                >
                                    <div className="mt-2 d-flex flex-wrap justify-content-start">
                                        {
                                            arrayProducts.map((product, index) =>
                                                <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3 px-2" key={index}>
                                                    <ItemProducto
                                                        product={product}
                                                        updateFavoriteStatus={updateFavoriteStatus}  // Pasamos la función
                                                    />
                                                </div>
                                            )
                                        }
                                    </div>
                                </InfiniteScroll>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
};


const mapStateToProps = state => ({
    new_products: state.Catalog.new_products,
    productos_peticion_new: state.Catalog.productos_peticion_new,
    peticion_new: state.Catalog.peticion_new,
})

export default connect(mapStateToProps, {
    get_new_products, petition_true_new
})(NewProduct)
