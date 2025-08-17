import React from "react";
import LayoutUser from "../hocs/LayoutUser";
import {connect} from "react-redux";
import { Outlet } from "react-router-dom";

const Dashboard = () => {


    return (
        <LayoutUser>
            <main className="w-full min-h-screen">
                <Outlet />
            </main>
        </LayoutUser>
    );
};


const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(Dashboard)
