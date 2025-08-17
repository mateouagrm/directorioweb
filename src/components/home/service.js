import React from 'react'
import pc1 from '../../assets/image/service/pc1.png'
import pc2 from '../../assets/image/service/pc2.png'
import pc3 from '../../assets/image/service/pc3.png'

function Service() {
    return (
        <>
            <section>
                <div className="st-height-b100 st-height-lg-b80"></div>
                <div className="container">
                    <div className="st-section-heading st-style1">
                        <h4 className="st-section-heading-title">SERVICIOS</h4>
                        <h2 className="st-section-heading-subtitle">SERVICIOS</h2>
                    </div>
                    <div className="st-height-b25 st-height-lg-b25"></div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="st-iconbox st-style1">
                                <div className="st-iconbox-icon">
                                    <img src={pc2} alt="Desarrollo Web"/>
                                </div>
                                <h2 className="st-iconbox-title">Desarrollo Web</h2>
                                <div className="st-iconbox-text">Desarrollo Web profesional para hacer realidad tu visión online
                                </div>
                            </div>
                            <div className="st-height-b30 st-height-lg-b30"></div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="st-iconbox st-style1">
                                <div className="st-iconbox-icon">
                                    <img src={pc1} alt="Software a medida"/>
                                </div>
                                <h2 className="st-iconbox-title">Software a medida</h2>
                                <div className="st-iconbox-text">Transformando ideas en software personalizado.
                                </div>
                            </div>
                            <div className="st-height-b30 st-height-lg-b30"></div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="st-iconbox st-style1">
                                <div className="st-iconbox-icon">
                                    <img src={pc3} alt="Productos"/>
                                </div>
                                <h2 className="st-iconbox-title">Productos</h2>
                                <div className="st-iconbox-text">Elige unos de nuestros productos para tus requerimientos.
                                </div>
                            </div>
                            <div className="st-height-b0 st-height-lg-b30"></div>
                        </div>
                    </div>
                </div>
                <div className="st-height-b100 st-height-lg-b80"></div>
            </section>
        </>
    );
}


export default Service