import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { register, send_verification_code_email, verify_code_by_email } from "../../redux/actions/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Register({ send_verification_code_email, code_mail, verify_code_by_email, code_mail_verify, register, success_login }) {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [isRunTimerEmail, setIsRunTimerEmail] = useState(false);
    const [showInputCodeVerificEmail, setShowInputCodeVerificEmail] = useState(false);
    const [emailVerificationCode, setEmailVerificationCode] = useState("");
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(null);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isProcessingRegister, setIsProcessingRegister] = useState(false);

    useEffect(() => {
        if (code_mail_verify) {
            setValidated(true);
            console.log("code_mail ", code_mail_verify);
        }
    }, [code_mail_verify]);



    const sendCodeEmail = async () => {
        if (!email) return;
        setIsSendingEmail(true);
        try {
            send_verification_code_email(email);
            // Simular envío de código
            setTimeout(() => {
                setShowInputCodeVerificEmail(true);
                setIsRunTimerEmail(true);
                setIsSendingEmail(false);
            }, 2000);
        } catch (error) {
            setEmailError("Error al enviar código");
            setIsSendingEmail(false);
        }
    };

    const verifyEmail = () => {
        let data = {
            email: email,
            code: emailVerificationCode,
        };
        verify_code_by_email(data);

        // if (emailVerificationCode === "123456") {
        //     setValidated(true);
        // } else {
        //     setEmailError("Código incorrecto");
        // }
    };

    const funct_register = async () => {
        setIsProcessingRegister(true);
        try {
            let data = {
                email: email,
                code: emailVerificationCode,
                name: name,
                password: password,
                password_confirmation: passwordConfirmation,

            };
            register(data);
            // Simulación de registro
            setTimeout(() => {
                alert("Cuenta creada exitosamente");
                setIsProcessingRegister(false);
            }, 2000);
            setTimeout(() => {
                window.location.reload();  // Recargar la página
            }, 3000);
        } catch (error) {
            setIsProcessingRegister(false);
            setNameError("Error en el nombre");
            setPasswordError("Error en la contraseña");
        }
    };
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md text-center">
            <div className='text-ecoprimary1 flex flex-col items-center'>
                <FontAwesomeIcon icon={faUser} size="2xl mb-2" />
                <h2 className="text-2xl font-semibold text-center mb-4">Crear una cuenta</h2>
            </div>
            {!validated ? (
                <>
                    <label className="block text-left font-semibold mb-2">Correo electrónico</label>
                    <input
                        type="email"
                        className={`w-full mb-2 p-2 border ${emailError ? "border-red-500" : "border-gray-300"}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingrese correo electrónico"
                    />
                    <p className="text-red-500 text-sm">{emailError}</p>
                    <button
                        className="w-full bg-ecoprimary1 text-white p-2 rounded-lg"
                        onClick={sendCodeEmail}
                        disabled={isSendingEmail || isRunTimerEmail}
                    >
                        {isSendingEmail ? "Enviando..." : "Enviar código"}
                    </button>
                    {showInputCodeVerificEmail && (
                        <>
                            <input
                                type="number"
                                className="w-full mt-2 p-2 border border-gray-300"
                                value={emailVerificationCode}
                                onChange={(e) => setEmailVerificationCode(e.target.value)}
                                placeholder="Ingrese el código"
                            />
                            <button
                                className="w-full bg-blue-500 text-white p-2 rounded-lg mt-2"
                                onClick={verifyEmail}
                            >
                                Validar
                            </button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <label className="block text-left font-semibold mb-2">Nombre completo</label>
                    <input
                        type="text"
                        className={`w-full mb-2 p-2 border ${nameError ? "border-red-500" : "border-gray-300"}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ingrese su nombre y apellido"
                    />
                    <p className="text-red-500 text-sm">{nameError}</p>

                    <label className="block text-left font-semibold mb-2">Contraseña</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        className={`w-full mb-2 p-2 border ${passwordError ? "border-red-500" : "border-gray-300"}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                    />

                    <label className="block text-left font-semibold mb-2">Confirmar contraseña</label>
                    <input
                        type={showPasswordConfirm ? "text" : "password"}
                        className="w-full mb-2 p-2 border border-gray-300"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        placeholder="Confirmar contraseña"
                    />
                    <p className="text-red-500 text-sm">{passwordError}</p>

                    <button
                        className="w-full bg-green-500 text-white p-2 rounded-lg mt-2"
                        onClick={funct_register}
                        disabled={isProcessingRegister}
                    >
                        {isProcessingRegister ? "Registrando..." : "Registrar"}
                    </button>
                </>
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    code_mail: state.Auth.code_mail,
    code_mail_verify: state.Auth.code_mail_verify,
    success_login: state.Auth.success_login
})

export default connect(mapStateToProps, {
    send_verification_code_email, verify_code_by_email, register
})(Register)

