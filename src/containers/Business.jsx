import React from "react";
import Layout from "../hocs/Layout";
import {connect} from "react-redux";
import Banner from "../components/home/banner";
const Business = () => {
    return (
        <Layout>
        <Banner/>

        </Layout>
    );
};


const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(Business)
