import React, { useEffect, useState } from "react";
import Layout from "../hocs/Layout";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
    get_search_products,
    petition_true_search,
    set_search,
    limpiar_search,
} from "../redux/actions/product";
import Filter from "../components/prod_list/filter";
import InfiniteScroll from "react-infinite-scroll-component";
import LoaderSpinner from "../widgets/loaderSpinner";
import ItemProducto from "../widgets/item_producto";

const SearchProduct = ({
    set_search,
    get_search_products,
    search_products,
    petition_true_search,
    productos_peticion_search,
    peticion_search,
    limpiar_search,
}) => {
    const { producto } = useParams();

    const [arrayProducts, setArrayProducts] = useState([]);
    const [filter, setFilter] = useState(null);
    const [page, setPage] = useState(1);

    // Petición inicial cuando cambia el filtro o el término de búsqueda
    useEffect(() => {
        limpiar_search();
        setArrayProducts([]);
        setPage(1);
        get_array_products(1); // Reutilizas la lógica
    }, [filter, producto]);


    // Actualiza el array local cuando Redux actualiza
    useEffect(() => {
        setArrayProducts(search_products);
    }, [search_products]);

    // Limpieza al desmontar componente
    useEffect(() => {
        return () => {
            localStorage.removeItem("filter_global");
            set_search(null);
        };
    }, []);

    const get_array_products = (page = 1) => {
        let datos = {
            search: producto,
        };
        if (filter) {
            datos = { ...datos, min: filter.min, max: filter.max, descuento: filter.descuento }
        }
        get_search_products(datos, page);
    };

    const get_products_next = () => {
        if (productos_peticion_search) {
            const nextPage = page + 1;
            petition_true_search();
            setPage(nextPage);
            get_array_products(nextPage); // usar el valor actualizado directamente
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
                                    hasMore={productos_peticion_search}
                                    loader={
                                        (peticion_search && productos_peticion_search) &&
                                        <LoaderSpinner bool={peticion_search} />
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
                                        {arrayProducts.map((product, index) => (
                                            <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3 px-2" key={index}>
                                                <ItemProducto
                                                    product={product}
                                                    updateFavoriteStatus={updateFavoriteStatus}
                                                />
                                            </div>
                                        ))}
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
    search_products: state.Product.search_products,
    productos_peticion_search: state.Product.productos_peticion_search,
    peticion_search: state.Product.peticion_search,
    end_message_search: state.Product.end_message_search,
});

export default connect(mapStateToProps, {
    get_search_products,
    petition_true_search,
    set_search,
    limpiar_search,
})(SearchProduct);
