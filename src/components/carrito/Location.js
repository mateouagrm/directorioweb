import React, {useState, useEffect, useRef} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {connect} from "react-redux";
import classNames from "classnames";
import {SwiperSlide} from "swiper/react";
import Map from "./Map";
import {useForm} from "react-hook-form";
import {check_user_address, post_user_addresses} from "../../redux/actions/location";
import item_location from "../../widgets/item_location";
import ItemLocation from "../../widgets/item_location";

function Location({locations, location, check_user_address, user, post_user_addresses}) {
    const [open, setOpen] = useState(false);
    const [newAddress, setNewAddress] = useState(false);
    const [Longitud, setLongitud] = useState('');
    const [Latitud, setLatitud] = useState('');
    const {register, handleSubmit, formState: {errors}, setValue, reset} = useForm();
    const mapRef = useRef();

    const messages = {
        required: "Este campo es obligatorio",
        minLength: "No puede ingresar menor caracteres de lo establecido",
        maxLength: "No puede ingresar más caracteres en este campo",
        espacioBlanco: 'No es permitido espacios en blanco',
        requiredColor: 'Debe seleccionar un color',
        aceptaNumeros: 'Solo se acepta números en este campo',
        aceptaLetra: 'Solo se acepta letras en este campo'
    };

    const patterns = {
        espacioBlanco: /^(?!\s)/,
        aceptaNumeros: /^[0-9,-]+$/,
        aceptaLetra: /^[A-Za-z\s]+$/,
        // mail:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    };

    useEffect(() => {
        if (newAddress) {

        }
    }, [newAddress]);


    const updateLocation = (location) => {
        let data = {
            user_id: user.id,
            address_id: location.id
        }
        check_user_address(data);
        setOpen(false);
    }

    function setLatLng(latlng) {
        setLatitud(latlng.lat);
        setLongitud(latlng.lng);
    }

    const setDireccion = (value) => {
        setValue('Direccion', value);
    }
    const onSubmit = async (formInfo) => {
        reset();
        const data = {
            "user_id": user.id,
            "address": formInfo.address,
            "description": formInfo.description,
            "phone": formInfo.phone,
            "lng": Longitud,
            "lat": Latitud
        };

        post_user_addresses(data)

        setTimeout(() => {
            setNewAddress(false);
            setOpen(false);
        }, "1000");
        console.log(data)
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="px-1 text-sm cursor-pointer hover:text-white hover:bg-ecoprimary1 text-yellow-500 font-semibold"
            >
                Seleccionar Dirección
            </button>

            <Transition show={open} as={React.Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <div className="fixed inset-0 bg-bgblack bg-opacity-30"/>
                    <div className="fixed inset-0 flex items-center justify-center p-4 ">
                        <Dialog.Panel
                            className="w-full max-w-2xl sm:h-[80vh] max-h-[90vh] flex flex-col rounded-lg bg-white shadow-xl transition-all">

                            <div
                                className="bg-ecoprimary1 text-ecoprimary2 py-2 text-center font-semibold text-lg">
                                Ubicación
                            </div>
                            {
                                !newAddress &&
                                <>
                                    <div className="flex-1 overflow-y-auto flex-col gap-1 pt-2 px-2">
                                        {
                                            locations.map((item, index) =>
                                                <ItemLocation item={item} key={index}
                                                              updateLocation={updateLocation}/>
                                            )
                                        }

                                    </div>
                                    <div className="p-2 flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setOpen(false)}
                                            className="bg-default1 hover:bg-default2 text-default3 py-2 px-3 rounded"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="button"
                                            className="bg-ecoprimary1 hover:bg-ecoprimary2 text-white py-2 px-3 rounded"
                                            onClick={() => setNewAddress(true)}>Agregar dirección
                                        </button>
                                    </div>
                                </>

                            }

                            {/*contenedor con scroll*/}
                            {
                                newAddress &&
                                <>
                                    <div className="flex-1 overflow-y-auto px-4 py-2">
                                        <form id="post_location" onSubmit={handleSubmit(onSubmit)}>
                                            {/*campo formulario*/}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold mb-1">Dirección:</label>
                                                    <input
                                                        className="form-control w-full"
                                                        type="text"
                                                        placeholder="dirección"
                                                        {...register("address", {
                                                                required: {
                                                                    value: true,
                                                                    message: messages.required,
                                                                },
                                                                minLength: {
                                                                    value: 3,
                                                                    message: messages.minLength
                                                                },
                                                                maxLength: {
                                                                    value: 100,
                                                                    message: messages.maxLength
                                                                },
                                                                pattern: {
                                                                    value: patterns.espacioBlanco,
                                                                    message: messages.espacioBlanco
                                                                },
                                                            }
                                                        )}
                                                    />
                                                    {errors.address && <small
                                                        className="text-red-600">{errors.address.message}</small>}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-bold mb-1">Teléfono:</label>
                                                    <input
                                                        className="form-control w-full"
                                                        type="text"
                                                        placeholder="59170000000"
                                                        {...register("phone", {
                                                                required: {
                                                                    value: true,
                                                                    message: messages.required,
                                                                },
                                                                minLength: {
                                                                    value: 3,
                                                                    message: messages.minLength
                                                                },
                                                                maxLength: {
                                                                    value: 100,
                                                                    message: messages.maxLength
                                                                },
                                                                pattern: {
                                                                    value: patterns.espacioBlanco,
                                                                    message: messages.espacioBlanco
                                                                },
                                                            }
                                                        )}
                                                    />
                                                    {errors.phone &&
                                                        <small className="text-red-600">{errors.phone.message}</small>}
                                                </div>

                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-bold mb-1">Referencia:</label>
                                                    <input
                                                        className="form-control w-full"
                                                        type="text"
                                                        placeholder="portón negro"
                                                        {...register("description", {
                                                                required: {
                                                                    value: true,
                                                                    message: messages.required,
                                                                },
                                                                minLength: {
                                                                    value: 3,
                                                                    message: messages.minLength
                                                                },
                                                                maxLength: {
                                                                    value: 100,
                                                                    message: messages.maxLength
                                                                },
                                                                pattern: {
                                                                    value: patterns.espacioBlanco,
                                                                    message: messages.espacioBlanco
                                                                },
                                                            }
                                                        )}
                                                    />
                                                    {errors.description && <small
                                                        className="text-red-600">{errors.description.message}</small>}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-h-[200px] h-[30rem]">
                                                <Map ref={mapRef} onlatlng={setLatLng} onClicDireccion={setDireccion}
                                                     editable={true}/>
                                            </div>
                                        </form>
                                    </div>

                                    {/* Footer con botones */}
                                    <div className="border-t-2 px-4 py-2 flex items-center justify-between">
                                        <button type="button" className="bg-resecondary text-white py-2 px-3 rounded"
                                                onClick={() => mapRef.current?.myLocation()}>
                                            ubicación
                                        </button>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setNewAddress(false)}
                                                className="bg-default1 text-white py-2 px-3 rounded"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit" form="post_location"
                                                className="bg-orange-500 text-white py-2 px-3 rounded"
                                            >
                                                Registrar
                                            </button>
                                        </div>
                                    </div>
                                </>
                            }

                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

const mapStateToProps = state => ({
    locations: state.Location.locations,
    location: state.Location.location,
    user: state.Auth.user,
})

export default connect(mapStateToProps, {
    check_user_address, post_user_addresses
})(Location)
