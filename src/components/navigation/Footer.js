import React from 'react';
import { connect } from 'react-redux';

function Footer({ }) {
    return (
        <footer className="footer-happy">
            <div className="container">
                <div className="st-copyright-wrap text-center">
                    <div className="st-copyright-text">© All right reserved 2025. Designed by CesarFuentes.</div>
                </div>
            </div>
        </footer>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(Footer)