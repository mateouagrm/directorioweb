import React from "react";
import Layout from "../hocs/Layout";
import {connect} from "react-redux";
import ItemPortfolio from "../widgets/itemPortfolio";
import test from "../assets/image/portafolio/testbast.png";
import hipermaxi from "../assets/image/portafolio/hipermaxi.png";
import cbn from "../assets/image/portafolio/cbn.png";
import {Link} from "react-router-dom";

const Portfolio = () => {
    return (
        <Layout>
            <section id="portfolio">
                <div className="st-height-b100 st-height-lg-b80"></div>
                <div className="container">
                    <div className="st-section-heading st-style1">
                        <h4 className="st-section-heading-title">PORTAFOLIOS</h4>
                        <h2 className="st-section-heading-subtitle">PORTAFOLIOS</h2>
                    </div>
                    <div className="st-height-b25 st-height-lg-b25"></div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <ItemPortfolio img={test}/>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <ItemPortfolio img={hipermaxi}/>
                        </div>
                        <div className="col-lg-4 col-md-6 ">
                            <ItemPortfolio img={cbn}/>
                        </div>


                    </div>
                </div>
                <div className="st-height-b100 st-height-lg-b80"></div>
            </section>
        </Layout>
    );
};


const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(Portfolio)
