import React, { useEffect, useState } from "react";
import Layout from "../hocs/Layout";
import { connect } from "react-redux";
import { get_products, petition_true, clean_prods } from "../redux/actions/product";
import ItemProducto from "../widgets/item_producto";
import Filter from "../components/prod_list/filter";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import LoaderSpinner from "../widgets/loaderSpinner";

const ProdList = ({
    get_products,
    petition_true,
    clean_prods,
    products,
    categories,
    peticion,
    productos_peticion
}) => {
    const { catSlug, subcatSlug, subsubcatSlug, storeSlug  } = useParams();
    const [arrayProducts, setArrayProducts] = useState([]);
    const [filter, setFilter] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (categories.length > 0) {
            clean_prods();
            get_array_products(1);
        }
    }, [catSlug, filter]);

    useEffect(() => {
        if (categories.length > 0) {
            clean_prods();
            get_array_products(1);
        }
    }, [storeSlug, filter]);


    useEffect(() => {
        if (categories.length > 0) {
            clean_prods();
            setPage(1);
            get_array_products(1);
        }
    }, [catSlug, subcatSlug, subsubcatSlug]);

    useEffect(() => {
        if (categories.length > 0) {
            get_array_products(1);
        }
        window.scrollTo(0, 0);
    }, [categories]);

    useEffect(() => {
        if (products) {
            setArrayProducts(products);
        }
    }, [products]);

    function get_categories_ids() {
        let category = categories.find(cat => cat.slug === catSlug);
        let sub_category_id = null;
        let sub_sub_category_id = null;

        if (!category) return {}; // prevenir errores si no se encuentra la categoría

        if (subcatSlug) {
            let sub_category = category.categories.find(subcat => subcat.slug === subcatSlug);
            if (sub_category) {
                sub_category_id = sub_category.id;
                if (subsubcatSlug) {
                    let sub_sub_category = sub_category.sub_categories.find(subsubcat => subsubcat.slug === subsubcatSlug);
                    if (sub_sub_category) {
                        sub_sub_category_id = sub_sub_category.id;
                    }
                }
            }
        }

        return {
            category_id: category.id,
            sub_category_id: sub_category_id,
            sub_sub_category_id: sub_sub_category_id,
        };
    }

    const get_array_products = (page = 1) => {
        let { category_id, sub_category_id, sub_sub_category_id } = get_categories_ids();
        let datos = {
            category_id: category_id,
            sub_category_id: sub_category_id,
            sub_sub_category_id: sub_sub_category_id,
            store_slug: storeSlug,
        }
        if (filter) {
            datos = { ...datos, min: filter.min, max: filter.max, descuento: filter.descuento }
        }
        get_products(datos, page);
    }

    // Función para obtener más productos
    const get_products_next = () => {
        petition_true();
        if (productos_peticion) {
            const nextPage = page + 1;
            setPage(nextPage);
            get_array_products(nextPage);
        }
    };

    const updateFavoriteStatus = (productId, isFavorite) => {
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
                            <InfiniteScroll
                                dataLength={arrayProducts.length}
                                next={get_products_next}
                                hasMore={productos_peticion}
                                loader={
                                    (peticion && productos_peticion) &&
                                    <div className="mt-4">
                                        <LoaderSpinner bool={peticion}></LoaderSpinner>
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
                                    {arrayProducts.map((product, index) => (
                                        <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3 px-2" key={index}>
                                            <ItemProducto
                                                product={product}
                                                updateFavoriteStatus={updateFavoriteStatus}  // Pasamos la función
                                            />
                                        </div>
                                    ))}
                                </div>
                            </InfiniteScroll>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
};


const mapStateToProps = state => ({
    categories: state.Home.categories,
    products: state.Product.products,
    peticion: state.Product.peticion,
    end_message: state.Product.end_message,
    productos_peticion: state.Product.productos_peticion,
});

export default connect(mapStateToProps, { get_products, petition_true, clean_prods })(ProdList);
