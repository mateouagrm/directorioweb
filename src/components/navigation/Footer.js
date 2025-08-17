import React from 'react';
import { connect } from 'react-redux';

function Footer({ }) {
    return (
        <footer className="footer-directory">
            <div className="container">
                <div className="footer-directory-text text-center">
                    <div>© All right reserved 2025. Designed by CesarFuentes.</div>
                </div>
            </div>
        </footer>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(Footer)