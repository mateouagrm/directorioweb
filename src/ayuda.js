import React, {useState, useEffect, useRef} from 'react';
import {get_categorias, get_subcategorias, set_all_prod_category} from "../../redux/actions/home";
import {connect} from "react-redux";
import {useParams} from 'react-router'
import "../../assets/styles/globalColorPrincipal.css";
import "../../assets/styles/menu.css";
import {useNavigate} from "react-router-dom";
import convertSlug from "../../components/Utils/slug";
import useScreenSize from "../../widgets/useScreenSize";
import classNames from "classnames";


const Subcategoria = ({
                          get_categorias,
                          categorias,
                          sucursal,
                          ps_categoria,
                          get_subcategorias,
                          cambio_sucursal,
                          set_all_prod_category
                      }) => {

    const params = useParams();
    const {width, height} = useScreenSize();
    const CategoriaId = params.CategoriaId;
    const navigate = useNavigate();
    let IdSucursal = sucursal.IdSucursal;
    let IdMarket = sucursal.IdMarket;
    const [subcategorias, setSubcategorias] = useState([]);
    const [catselec, setCatselec] = useState(null);
    const {ciudadp, sucursalp} = useParams();
    const [url_navigation, setUrl_navigationl] = useState(null);
    const [positionWidth, setPositionWidth] = useState(0);
    const [countGrid, setCountGrid] = useState(1);

    useEffect(() => {
        if (width < 768) {
            setCountGrid(1)
        }
        if (width >= 768 && width < 991.98) {
            setCountGrid(2)
        }
        if (width >= 991.98) {
            setCountGrid(3)
        }
    }, [width])
    useEffect(() => {
        if (categorias.length === 0) {
            get_categorias(IdSucursal, IdMarket);
        }
    }, [categorias])



    useEffect(() => {
        if (subcategorias.length === 0 && categorias.length > 0) {
            cargarSubcategoria();
        }
    }, [subcategorias])

    useEffect(() => {
        setSubcategorias([]);
    }, [cambio_sucursal])


    const outCategoria = async () => {
        setCatselec(null);
    }
    const obtenerDatos = async (e) => {
        let value = e.clientX / width;
        setPositionWidth(value)
        setCatselec(ps_categoria.IdCategoria);
    }

    const convert_url = async () => {

        let resp = (ciudadp + ' ' + sucursalp);
        let new_url = convertSlug.data_barra(resp);

        let url_parameters = new_url;
        return url_parameters;

    }

    async function cargar_url_var() {
        let url_bas = await convert_url();
        setUrl_navigationl(url_bas);
    }

    useEffect(() => {
        cargar_url_var();
    }, [])

    function cargarSubcategoria() {
        var aux = [];
        categorias.forEach(category => {
            category.SubCategorias.forEach(subcate => {
                if (subcate.IdCategoria === ps_categoria.IdCategoria) {
                    if (siExiste(subcate.IdSubcategoria)) {
                        aux.push(subcate);
                    }
                }
            })
        });
        setSubcategorias(aux);
    }

    function siExiste(Idsubcategoria) {
        let proAux = subcategorias.find(item => item.IdSubcategoria === Idsubcategoria);
        if (typeof (proAux) === 'undefined' || proAux === null) {
            return true;
        }
        return false;
    }

    function show_subcategoria(subcat) {

        const datos = {
            IdSubcategoria: subcat.IdSubcategoria,
            IdCategoria: ps_categoria.IdCategoria,
            todo: false
        };
        // console.log("datos subcategoria ", datos);
        set_all_prod_category(datos);

        navigate("/" + url_navigation + "/" + `categoria/${convertSlug.data_slug(ps_categoria.Descripcion)}/${convertSlug.data_slug(subcat.Descripcion)}`);
    }


    function get_subcategoria(cat_id) {
        for (var category of categorias) {
            if (parseInt(category.IdCategoria) == parseInt(cat_id)) {
                // console.log("paso retur");
                return category.SubCategorias;
            }
        }


        return [];

    }

    function show_subcategoria_ver_todo() {
        let categoria_slug = convertSlug.data_slug(ps_categoria.Descripcion);

        const subcategory = get_subcategoria(ps_categoria.IdCategoria);
        const datos = {
            IdSubcategoria: subcategory[0].IdSubcategoria,
            IdCategoria: ps_categoria.IdCategoria,
            todo: true
        };
        set_all_prod_category(datos);
        navigate("/" + url_navigation + "/" + `categoria/${categoria_slug}`);
    }


    return (
        <>
            <nav id="mainnav" className="mainnav bg-hiperorange">
                <ul className="menu">
                    <li
                        style={{
                            backgroundColor: `${(catselec === ps_categoria.IdCategoria) ? "#ffffff" : "transparent"}`,
                            color: `${(catselec === ps_categoria.IdCategoria) ? "#000000" : "#ffffff"}`,
                            // minWidth:'100px',
                            // whiteSpace:'nowrap',
                            // textOverflow:'ellipsis',
                            // overflow:'hidden'
                        }}
                        className="home text-opacity-90 focus:outline-none items-center px-2  py-2.5 font-medium  hover:text-opacity-100 cursor-pointer "


                        onClick={() => show_subcategoria_ver_todo()}
                        onMouseEnter={(e) => obtenerDatos(e)}
                        onMouseLeave={() => outCategoria()}
                    >
                        {ps_categoria.Descripcion}
                        <div className={classNames("submenu", "absolute", "bg-white", "z-200", "w-auto", "transform",
                            {
                                "left-0": positionWidth <= 0.55,
                                "right-0": positionWidth > 0.55,
                            }
                        )}
                             style={{borderRadius: '0px 0px 10px 10px'}}>
                            <div className=" shadow-lg ring-1 ring-black ring-opacity-5 p-1"
                                 style={{borderRadius: '10px'}}>
                                <ul
                                    className='list-none'
                                    role="list"
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: `repeat(${countGrid},1fr)`,
                                        gridGap: '12px',
                                        width: 'min-content'
                                    }}
                                >
                                    {
                                        subcategorias.map((item_subcate_list) => (
                                            <li key={item_subcate_list.IdSubcategoria}
                                                className="text-black p-1 transition duration-150 ease-in-out focus:outline-none
                                                            focus-visible:ring cursor-pointer no-underline hover:underline
                                                            flex items-center"
                                                style={{
                                                    fontSize: '0.7rem',
                                                    fontWeight: '600',
                                                    width: 'max-content'
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    show_subcategoria(item_subcate_list);
                                                }}
                                            >
                                                <span
                                                    style={{marginLeft: '10px'}}>{item_subcate_list.Descripcion}</span>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    );
};
const mapStateToProps = state => ({
    cambio_sucursal: state.BranchOffice.cambio_sucursal,
    sucursal: state.BranchOffice.sucursal,
    categorias: state.Home.categorias,
    // subcategorias: state.Home.subcategorias,

})

export default connect(mapStateToProps, {
    get_categorias, get_subcategorias, set_all_prod_category
})(Subcategoria)

// export default Favorito;