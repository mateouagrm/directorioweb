import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";

const ItemExperience = ({data,is}) => {
    const controls = useAnimation();

    return (
        <>
            <div className="st-resume-timeline">
                <h3 className="st-resume-timeline-title">{data.cargo}</h3>
                <div className="st-resume-timeline-duration">{data.inicio} - {data.fin}</div>
                <h4 className="st-resume-timeline-subtitle mb-0">{data.empresa}</h4>
                <span className="text-[#fdfeff] text-sm">{data.ubicacion} - {data.tipo}  </span>
                <div className="st-resume-timeline-text mt-2">
                    <p>{data.descripcion}</p>
                </div>
            </div>
            {
                !is &&
                <div className="st-height-b50 st-height-lg-b30"></div>
            }

        </>

    );
};

export default ItemExperience;
