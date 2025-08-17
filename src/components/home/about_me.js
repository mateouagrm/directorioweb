import React from 'react'
import cesar from '../../assets/image/portafolio/cesar.webp'

function AboutMe() {
    return (
        <>
            <section id="about" className="st-about-wrap">
                <div className="st-height-b100 st-height-lg-b80"></div>
                <div className="container">
                    <div className="st-section-heading st-style1">
                        <h4 className="st-section-heading-title">Acerca de mi</h4>
                        <h2 className="st-section-heading-subtitle">Acerca de mi</h2>
                    </div>
                    <div className="st-height-b25 st-height-lg-b25"></div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 wow fadeInLeft">
                            <div className="st-about-img-wrap">
                                <div
                                    className="st-about-img st-dynamic-bg st-bg bg-cover bg-center"
                                    style={{ backgroundImage: `url(${cesar})` }}
                                ></div>
                            </div>
                            <div className="st-height-b0 st-height-lg-b30"></div>
                        </div>
                        <div className="col-lg-6">
                            <div className="st-vertical-middle">
                                <div className="st-vertical-middle-in">
                                    <div className="st-text-block st-style1">
                                        <h2 className="st-text-block-title">¡Hola! Soy Cesar Fuentes</h2>
                                        <h4 className="st-text-block-subtitle">Ingeniero en Sistemas</h4>
                                        <div className="st-text-block-text">
                                            <p>Soy Ingeniero en Sistemas especializado en desarrollo web, e-commerce y
                                                soluciones digitales a medida.
                                                Mi enfoque se centra en crear plataformas eficientes, seguras y
                                                escalables que respondan a las necesidades reales de cada cliente. Tengo
                                                experiencia en el diseño y desarrollo de sitios web personalizados y
                                                tiendas en línea, optimizadas para ofrecer una excelente experiencia de
                                                usuario y maximizar el rendimiento del negocio.</p>
                                        </div>
                                        <ul className="st-text-block-details st-mp0">
                                            <li><span>Cumpleaño</span> : <span>Mayo 12, 1994</span></li>
                                            <li><span>Celular</span> : <span>+591 73643349</span></li>
                                            <li><span>Correo</span> : <span>cesarfuentes0594@gmail.com</span></li>
                                            <li><span>Nacionalidad</span> : <span>boliviana</span></li>
                                            <li><span>Lenguaje</span> : <span>Español</span></li>
                                            <li><span>Freelance</span> : <span>Disponible</span></li>
                                            <li><span>Hobby</span> : <span>Aventurero</span></li>
                                        </ul>
                                        <div className="st-text-block-btn">
                                            <a href="#" className="st-btn st-style1 st-color1">Descargar CV</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


export default AboutMe