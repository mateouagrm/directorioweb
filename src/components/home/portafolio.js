import React from 'react'
import portfolio1 from '../../assets/image/portafolio/portfolio1.jpg'
import test from '../../assets/image/portafolio/testbast.png';
import hipermaxi from '../../assets/image/portafolio/hipermaxi.png';
import cbn from '../../assets/image/portafolio/cbn.png';
import ItemPortfolio from "../../widgets/itemPortfolio";
import {Link} from "react-router-dom";


function Portafolio() {
    return (
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
                        <ItemPortfolio img={test} title="Ecommerce" description="portal / web" type="publico"/>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <ItemPortfolio img={hipermaxi}/>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="st-portfolio-single st-style1 st-lightgallery">
                            <div className="st-portfolio-item">
                                <a href="assets/img/portfolio/portfolio3_lg.jpg"
                                   className="st-portfolio st-zoom st-lightbox-item">
                                    <div className="st-portfolio-img st-zoom-in">
                                        <img src={cbn} alt="portfolio"/>
                                    </div>
                                    <div className="st-portfolio-item-hover">
                                        <i className="fas fa-plus-circle"></i>
                                        <h5>Product Design</h5>
                                        <p>Design / Marketing</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="st-portfolio-single st-style1 st-lightgallery">
                            <div className="st-portfolio-item">
                                <a href="assets/img/portfolio/portfolio4_lg.jpg"
                                   className="st-portfolio st-zoom st-lightbox-item">
                                    <div className="st-portfolio-img st-zoom-in">
                                        <img src={portfolio1} alt="portfolio"/>
                                    </div>
                                    <div className="st-portfolio-item-hover">
                                        <i className="fas fa-plus-circle"></i>
                                        <h5>Product Design</h5>
                                        <p>Design / Marketing</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="st-portfolio-single st-style1 st-lightgallery">
                            <div className="st-portfolio-item">
                                <a href="assets/img/portfolio/portfolio5_lg.jpg"
                                   className="st-portfolio st-zoom st-lightbox-item">
                                    <div className="st-portfolio-img st-zoom-in">
                                        <img src={portfolio1} alt="portfolio"/>
                                    </div>
                                    <div className="st-portfolio-item-hover">
                                        <i className="fas fa-plus-circle"></i>
                                        <h5>Product Design</h5>
                                        <p>Design / Marketing</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="st-portfolio-single st-style1 st-lightgallery">
                            <div className="st-portfolio-item">
                                <a href="assets/img/portfolio/portfolio6_lg.jpg"
                                   className="st-portfolio st-zoom st-lightbox-item">
                                    <div className="st-portfolio-img st-zoom-in">
                                        <img src={portfolio1} alt="portfolio"/>
                                    </div>
                                    <div className="st-portfolio-item-hover">
                                        <i className="fas fa-plus-circle"></i>
                                        <h5>Product Design</h5>
                                        <p>Design / Marketing</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 text-center">
                        <div className="st-portfolio-btn">
                            <Link className="st-btn st-style1 st-color1" to={`/portafolio`}>
                                Ver Mas
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="st-height-b100 st-height-lg-b80"></div>
        </section>
    );
}


export default Portafolio