import React, {useEffect, useState} from "react";
import Layout from "../hocs/Layout";
import {connect} from "react-redux";
import Part1 from "../components/carrito/part1";
import Part2 from "../components/carrito/part2";
import Part3 from "../components/carrito/part3";
import Part4 from "../components/carrito/part4";

const Carrito = () => {
    const [position, SetPosition] = useState(1);

    const updatePosition = (val) => {
        SetPosition(val);
    }

    return (
        <Layout>
            {position === 1 &&
                <Part1 next={updatePosition}/>
            }
            {position === 2 &&
                <Part2 next={updatePosition}/>
            }
            {position === 3 &&
                <Part3 next={updatePosition}/>
            }
            {position === 4 &&
                <Part4 next={updatePosition}/>
            }
        </Layout>
    );
};


const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(Carrito)
