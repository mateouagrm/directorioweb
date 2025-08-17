import React from "react";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faHeart, faMinus, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";


function ItemLocation({location, item, updateLocation}) {
    return (
        <div className="w-100" >
            <ul className={classNames("cursor-pointer", "marker:text-green", "list-outside", "list-disc", "rounded-lg", "shadow-md", "ml-5", "font-normal",
                {
                    "bg-ecoprimary1 text-white": item.id === location.id,
                    "bg-default1 hover:bg-default2 text-default3": item.id !== location.id
                }
            )}
                onClick={() => updateLocation(item)}>
                <li className="">{item.address}</li>
                <li>{item.description}</li>
                <li>{item.phone}</li>
            </ul>
        </div>
    );
}


const mapStateToProps = state => ({
    location: state.Location.location,
})


// Conectamos el componente a Redux
export default connect(mapStateToProps, {})(ItemLocation);
