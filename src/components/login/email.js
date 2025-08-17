import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

function Email({}) {
    const [email, setEmail] = useState("");


    const handleSendCode = () => {
        alert(`Enviando código a: ${email}`);
    };


    return (
        <div className="flex items-center justify-center ">
            <div className="bg-white w-96 rounded-lg shadow-lg overflow-hidden">
                <div className="bg-orange-500 text-white text-center py-3 font-semibold text-lg">
                    Ingresar
                </div>
                <div className="p-6">
                    <p className="text-gray-700 text-sm mb-4">
                        Inicio de sesión en el sistema ecommerce. Una breve descripción del por qué se debe
                        iniciar
                        sesión. Es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem
                        Ipsum
                        ha sido el texto de relleno estándar de las industrias desde el año 1500.
                    </p>
                    <div>
                        <label htmlFor="phone" className="block font-semibold text-gray-700 mb-1">
                            Correo electronico</label>
                        <input type="text" id="email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                               placeholder="Ingrese su correo"/>
                        <button
                            className="mt-4 w-full bg-orange-500 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-orange-600"
                            onClick={handleSendCode}>
                            RECIBIR CÓDIGO POR CORREO
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(Email)

