import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { set_search } from "../../../redux/actions/product";
import { useNavigate } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Search({ set_search, search }) {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    // useEffect(() => {
    //         setQuery(search);
    // }, [search]);



    const enter_option = (event) => {
        // console.log("pasooo  ",event.key);
        if (event.key === 'Backspace') {
            if (query === '' || query.length === 1) {
                event.preventDefault();
                setQuery("");
            }
        }
        if (event.key === 'Enter' || event.type === 'click') {
            if (query !== "" && query.trim() !== "") {
                set_search(query)
                navigate("/busqueda/" + query.trim());
            }
        }
    };


    const handleChange = (event) => {
        const { value } = event.target;
        const regex = /^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
        if (regex.test(value)) {
            setQuery(event.target.value);
            save_text_filter(event.target.value);
        }
    };
    function save_text_filter(text) {
        localStorage.setItem("filter_global", text);
    }
    return (
        <div className="col-12 flex items-center mb-md-0">
            <div className="flex items-center border rounded-md px-2 w-full focus-within:ring-2 focus-within:ring-blue-500">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400 mx-2" />
                <input
                    type="text"
                    placeholder="¿Qué estás buscando?"
                    value={query}
                    onKeyDown={enter_option}
                    onChange={(e) => handleChange(e)}
                    className="flex-1 p-2 outline-none text-gray-600"
                />
            </div>
        </div>

    )
}

const mapStateToProps = state => ({
    search: state.Product.search,
})

export default connect(mapStateToProps, {
    set_search
})(Search)

