import React from "react";
import Layout from "../hocs/Layout";
import {connect} from "react-redux";

const Error404 = ({}) => {

    return (
        <Layout>
            <div className="block md:hidden p-2">
               Error 404
            </div>
        </Layout>
    );
};


const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(Error404)
