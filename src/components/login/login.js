import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { clearLoginError, login } from "../../redux/actions/auth";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEye, faEyeSlash, faSpinner } from "@fortawesome/free-solid-svg-icons";

function Login({ login, success_login, error_login }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (success_login) {
            setLoading(false);
            toast.success("¡Inicio sesión correctamente! 🎉", {
                position: "bottom-right",
            });
            window.location.reload();
        }
    }, [success_login]);

    useEffect(() => {
        if (error_login) {
            setLoading(false);
            toast.error(typeof error_login === 'string' ? error_login : "Correo o contraseña incorrecta", {
                position: "bottom-right",
            });
        }
    }, [error_login]);
    
    const validate = () => {
        let errors = {};
        if (!email) {
            errors.email = "El correo electrónico es obligatorio.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "El correo electrónico no es válido.";
        }
        if (!password) {
            errors.password = "La contraseña es obligatoria.";
        } else if (password.length < 6) {
            errors.password = "La contraseña debe tener al menos 6 caracteres.";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            clearLoginError(); //
            login({ email, password });
        }
    };

    return (
        <div className="p-4 bg-white rounded-2xl shadow-xl">
            <div className='text-ecoprimary1 flex flex-col items-center'>
                <FontAwesomeIcon icon={faUser} size="2xl" className="mb-2" />
                <h2 className="text-2xl font-semibold text-center mb-4">Iniciar sesión</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-10 p-2 border rounded-lg"
                        disabled={loading}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-10 pr-10 p-2 border rounded-lg"
                        disabled={loading}
                    />
                    <span
                        onClick={() => !loading && setShowPassword(!showPassword)}
                        className="absolute top-2.5 right-3 cursor-pointer text-gray-500"
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <button
                    type="submit"
                    className={`w-full p-2 mt-4 bg-ecoprimary1 text-white rounded-lg flex justify-center items-center gap-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? (
                        <FontAwesomeIcon className='fs-4' icon={faSpinner} spin />
                    ) : (
                        "Iniciar sesión"
                    )}
                </button>
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    success_login: state.Auth.success_login,
    error_login: state.Auth.error_login
});

export default connect(mapStateToProps, { login })(Login);
