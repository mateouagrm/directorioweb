import React, { useEffect } from "react";
const ItemPortfolio = ({img, title, description, type}) => {

    return (
        <div className="st-portfolio-single st-style1 st-lightgallery">
            <div className="st-portfolio-item">
                <div className="st-portfolio st-zoom st-lightbox-item">
                    <div className="st-portfolio-img st-zoom-in">
                        <img src={img} alt="portfolio"/>
                    </div>
                    <div className="st-portfolio-item-hover">
                        <i className="fas fa-plus-circle"></i>
                        <h5>{title}</h5>
                        <p>{description} / {type}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemPortfolio;
