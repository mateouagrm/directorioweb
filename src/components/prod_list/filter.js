import React, { useEffect, useState, useRef } from 'react';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'; // Iconos de Font Awesome
import DescuentoFiltro from "./filter/discount";
import PrecioRango from "./filter/price";

function Filter({ sendData }) {
    const [filterData, setFilterData] = useState({});
    const [reset, setReset] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const firstLoad = useRef(true);
    const [isMobile, setIsMobile] = useState(false);

    // Comprobamos el tamaño de la pantalla al cargar la vista
    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsOpen(false);
            setIsMobile(true); // Es móvil
        } else {
            setIsMobile(false); // No es móvil
        }
    }, []);

    // Cuando cambia el filtro
    useEffect(() => {
        if (firstLoad.current) {
            firstLoad.current = false;
            return;
        }

        if (Object.keys(filterData).length !== 0 || reset) {
            sendData(filterData);
        }
    }, [filterData]);

    useEffect(() => {
        if (reset) {
            setReset(false);
        }
    }, [reset]);

    function priceRange(data) {
        setFilterData(prev => ({
            ...prev,
            min: data.min,
            max: data.max,
        }));
    }

    function filterDiscount(data) {
        setFilterData(prev => ({
            ...prev,
            descuento: data.descuento,
        }));
    }

    function resetFilters() {
        setFilterData({});
        setReset(true);
    }

    return (
        <>
            <div className="sticky top-6">
                <div className="h-full w-full">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">

                        {/* Cabecera del filtro */}
                        <div
                            className={`px-3 py-2 flex justify-between items-center mb-0 bg-gray-100 ${isMobile ? 'cursor-pointer' : ''}`} // Se aplica solo en móviles
                            onClick={() => {
                                if (isMobile) { // Solo en móviles puede abrirse/cerrarse
                                    setIsOpen(!isOpen);
                                }
                            }}
                        >
                            <div className='flex justify-content-between w-100 me-3 me-sm-0'>
                                <h5 className="font-semibold mb-0 flex items-center gap-2">
                                    Filtros
                                </h5>

                                <button
                                    type="button"
                                    className="bg-ecoprimary1 px-2 py-1 rounded-4 text-white text-sm font-medium"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        resetFilters();
                                    }}
                                >
                                    Resetear
                                </button>
                            </div>

                            {/* Flecha con clase para control en CSS */}
                            <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className="mobile-arrow" />
                        </div>

                        {/* Contenido del filtro */}
                        {isOpen && (
                            <div className="w-100 p-3">
                                <DescuentoFiltro sendData={filterDiscount} reset={reset} />
                                <hr className="mt-3" />
                                <PrecioRango sendData={priceRange} reset={reset} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Estilos CSS en el mismo archivo JSX */}
            <style jsx>{`
                /* Estilos para ocultar la flecha en pantallas grandes */
                @media (min-width: 768px) {
                    .mobile-arrow {
                        display: none;
                    }
                    /* No permitir el cursor pointer en pantallas grandes */
                    .cursor-pointer {
                        cursor: default;
                    }
                }
            `}</style>
        </>
    );
}

export default connect(null, null)(Filter);
