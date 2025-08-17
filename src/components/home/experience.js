import React from 'react'
import work from '../../assets/image/resume/resume-icon1.png'
import school from '../../assets/image/resume/resume-icon2.png'
import ItemExperience from "../../widgets/itemExperience";
import ItemEducation from "../../widgets/itemEducation";

const experiences = [
    {
        cargo: "Profesional independiente",
        tipo: "independiente",
        empresa: "",
        inicio: "septiembre 2024",
        fin: "actualidad",
        ubicacion: "santa cruz, Bolivia",
        descripcion: "Asesor en desarrollo de proyectos de software, implementación de sistemas, integración de aplicaciones y levantamiento de requerimientos para diseñar y crear soluciones tecnológicas basadas en las necesidades del cliente."
    },
    {
        cargo: "Líder Técnico",
        tipo: "contrato temporal",
        empresa: "DIMA Ltda.",
        inicio: "septiembre 2021",
        fin: "junio 2024",
        ubicacion: "santa cruz, Bolivia",
        descripcion: "Responsable del sistema de comercio electrónico web Hipermaxi con frontend react.js y desarrollador de otros sistemas."
    },
    {
        cargo: "Líder Técnico",
        tipo: "jornada completo",
        empresa: "Soluciones Inteligentes - workcorp",
        inicio: "enero 2020",
        fin: "septiembre 2021",
        ubicacion: "santa cruz, Bolivia",
        descripcion: "Responsable del sistema nacional de servicios tributarios. Ingeniero de software del sistema de control de inventario."
    },

    {
        cargo: "Líder Técnico",
        tipo: "jornada completo",
        empresa: "Desarrollamelo",
        inicio: "septiembre 2019",
        fin: "enero 2020",
        ubicacion: "santa cruz, Bolivia",
        descripcion: "Responsable del control del sistema web de logística de transporte."
    },

    {
        cargo: "Ingeniero de Software",
        tipo: "jornada completo",
        empresa: "Aztik - Soluciones Digitales",
        inicio: "mayo 2019",
        fin: "septiembre 2019",
        ubicacion: "santa cruz, Bolivia",
        descripcion: "Desarrollo de plataforma web, implementación de informes de clasificación, control de asistencia, tiempo de sesión en el juego, errores de palabras durante el juego, puntuación. Implementación de estadísticas de estudiantes a partir del uso del juego."
    },
    {
        cargo: "Ingeniero de Software",
        tipo: "jornada completo",
        empresa: "Supermercadomovil",
        inicio: "enero 2019",
        fin: "mayo 2019",
        ubicacion: "santa cruz, Bolivia",
        descripcion: "Desarrollador de sistemas ecommerce con PHP en Laravel para el BackEnd, Vue.js y Bootstrap para el FrontEnd."
    },

    {
        cargo: "Ingeniero de Software",
        tipo: "jornada completo",
        empresa: "Write Bolivia S.R.L",
        inicio: "noviembre 2018",
        fin: "Abril 2019",
        ubicacion: "santa cruz, Bolivia",
        descripcion: "software del sistema de recomendación"
    },

];

const educations = [
    {
        grado: "Ingenieria",
        formacion: "Ingenieria en Sistemas",
        escuela: "Universidad Autónoma Gabriel René Moreno",
        fin: "2019",
        ubicacion: "santa cruz, Bolivia",
    },
    {
        grado: "Bachillerato",
        formacion: "Secundaria",
        escuela: "Col. Nal. Guido Villa Gómez ",
        fin: "2012",
        ubicacion: "santa cruz, Bolivia",
    },

];

function Experience() {
    return (
        <section id="resume" className="st-dark-bg">
            <div className="st-height-b100 st-height-lg-b80"></div>
            <div className="container">
                <div className="st-section-heading st-style1">
                    <h4 className="st-section-heading-title">Résume</h4>
                    <h2 className="st-section-heading-subtitle">Résume</h2>
                </div>
                <div className="st-height-b25 st-height-lg-b25"></div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="st-resume-wrap">
                            <div className="st-resume-heading">
                                <img src={work} alt="resume-icon"/>
                                <h2 className="st-resume-heading-title">Experiencia laboral</h2>
                            </div>

                            <div className="st-height-b50 st-height-lg-b30"></div>

                            <div className="st-resume-timeline-wrap">
                                {experiences.map((item, index) => (<ItemExperience key={index} data={item}
                                                                                   is={Number(index) === experiences.length - 1}/>))}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">

                        <div className="st-height-b0 st-height-lg-b50"></div>
                        <div className="st-resume-wrap">
                            <div className="st-resume-heading">
                                <img src={school} alt="resume-icon"/>
                                <h2 className="st-resume-heading-title">Educación</h2>
                            </div>
                            <div className="st-height-b50 st-height-lg-b30"></div>

                            <div className="st-resume-timeline-wrap">
                                {educations.map((item, index) => (<ItemEducation key={index} data={item}
                                                                                 is={Number(index) === educations.length - 1}/>))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="st-height-b100 st-height-lg-b80"></div>
        </section>
    );
}


export default Experience