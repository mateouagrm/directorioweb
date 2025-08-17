import React, {useEffect, useState} from "react";
import Layout from "../hocs/Layout";
import {connect} from "react-redux";
import {useParams} from "react-router-dom"
import Gallery from "../components/prod_information/gallery";
import Information from "../components/prod_information/information";
import RelatedAds from "../components/prod_information/related_ads";
import {clear_product, get_product, get_products_relations} from "../redux/actions/product";
import { toast } from 'react-toastify';

const ProdInformation = ({get_product,clear_product, item_product,get_products_relations, store_id}) => {
    const {productoSlug} = useParams();
    const [arrayResources, SetArrayResources] = useState([]);
    const [buy, SetBuy] = useState(true);

    useEffect(() => {
        get_product(productoSlug);
        return () => {
            clear_product();
        };
    }, [productoSlug]); // ✅ ahora el efecto se ejecutará cada vez que cambie el slug


    useEffect(() => {
        if (item_product && store_id && store_id !== "null") {
            console.log("verificar ,",item_product.store_id , store_id);
            if (Number(item_product.store_id) !== Number(store_id)) {
                SetBuy(false);
                toast.error("No puede realizar la compra de este producto. Intenta de nuevo.", {
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
    }, [item_product]);


    useEffect(() => {
        if (item_product) {
            SetArrayResources(item_product.resources);
            let data = {
                category_id: item_product.category_id,
                sub_category_id: item_product.sub_category_id,
            };
            get_products_relations(data);
        }
    }, [item_product]);

    return (
        <Layout>
            <main className="w-full min-h-screen">
                <section className="">
                    <div className="container" id="gallery">
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <Gallery data={arrayResources}/>
                            </div>
                            <div className="col-12 col-lg-6">
                                 <Information data={item_product} buy={buy}/>
                            </div>
                        </div>
                    </div>
                </section>

                <RelatedAds/>

            </main>
        </Layout>
    );
};


const mapStateToProps = state => ({
    item_product: state.Product.item_product,
    store_id: state.Cart.store_id,
})

export default connect(mapStateToProps, {
    get_product,get_products_relations,clear_product
})(ProdInformation)
