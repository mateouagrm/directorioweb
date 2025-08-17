import React from 'react'
import pc1 from '../../assets/image/service/pc1.png'
import pc2 from '../../assets/image/service/pc2.png'
import pc3 from '../../assets/image/service/pc3.png'
import ProgressBar from "../../widgets/ProgressBar";

const skills = [
    { title: "Laravel", percentage: 95 },
    { title: "Node.js", percentage: 75 },
    { title: "Adonis.js", percentage: 90 },
    { title: "React.js", percentage: 85 },
    { title: "Vue.js", percentage: 80 },
    { title: "MySql", percentage: 90 },
    { title: "PostgreSql", percentage: 70 },
    { title: "Digital Ocean", percentage: 70 },
    { title: "Figma", percentage: 50 },
];

function Skill() {
    return (
        <>
            <section className="st-dark-bg">
                <div className="st-height-b100 st-height-lg-b80"></div>
                <div className="container">
                    <div className="st-section-heading st-style1">
                        <h4 className="st-section-heading-title">MIS HABILIDADES</h4>
                        <h2 className="st-section-heading-subtitle">MIS HABILIDADES</h2>
                    </div>
                    <div className="st-height-b25 st-height-lg-b25"></div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="st-skill-wrap">
                                <div className="st-skill-heading">
                                    <h2 className="st-skill-title">Gran experiencia trabajando con estas
                                        herramientas.</h2>
                                    <div className="st-skill-subtitle">
                                        Manejo de GitLab como repositorio, mysql y postgreSql como motor de base de datos,
                                        <br/> Laravel ( manejo de patrones de diseño, arquitectura limpia, ejecucion de tareas en 2do planos,
                                        creacion y consumo de servicios ApiRest y Soap, integracion de servicios amazon s3 ),
                                        <br/>
                                        Node.js y Adonis.js ( creacion de sistemas en tiempo real, creacion y consumo de servicio ApiRest, integración de
                                        APIs de OpenAI ), <br/> Vue.js ( consumo de apiRest, integracion de socket trabajo conjunto con laravel,
                                        manejo de estado Vuex, tailwind y bootstrap para css ) <br/>
                                        React.js ( estructura modular y limpia, manejo de redux para estado y consumo de ApiRest, integracion de socket en tiempo real,
                                        spa, tailwind y bootstrap para css ).
                                        <br/>
                                        Digital Ocean ( para el despliegue y gestión de servidores Linux en producción para laravel y node  )
                                        <br/>
                                        figma ( para diseñar componentes y pantallas antes del inicio de la implementación )
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="st-height-b0 st-height-lg-b30"></div>
                            <div className="bg-[#0a0a15] p-6 rounded-xl">
                                {skills.map((skill) => (
                                    <ProgressBar key={skill.title} {...skill} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


export default Skill