import React from "react";
import Layout from "../hocs/Layout";
import {connect} from "react-redux";
import MemberSlider from "../components/home/MemberSlider";
import BusinessPosts from "../components/home/BusinessPosts";
import JobPosts from "../components/home/JobPosts";
import EventPosts from "../components/home/EventPosts";

const Home = () => {
    return (
        <Layout>
            <MemberSlider/>
            <BusinessPosts/>
            <JobPosts/>
            <EventPosts/>
        </Layout>
    );
};


const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(Home)
