import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux';

import NavbarUser from "../components/navigation/NavbarUser";
import Footer from "../components/navigation/Footer";

const LayoutUser = (props ) => {
    return (
        <div>
            <NavbarUser/>
            <ToastContainer autoClose={5000}/>
            {props.children}
            <Footer/>
        </div>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {

})(LayoutUser)
