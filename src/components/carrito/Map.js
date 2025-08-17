import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import {GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
// import Swal from 'sweetalert2';

const containerStyle = {
    borderRadius: '0.5rem',
    width: '100%',
    height: '100%'
};

const Map = forwardRef(({onlatlng, data, onClicDireccion, editable}, ref) => {
    const [direccion, guardarDireccion] = useState();

    const [location, setLocation] = useState(null);
    const [center, setCenter] = useState({
        lat: data ? parseFloat(data.Latitud) : -17.783312689798045,
        lng: data ? parseFloat(data.Longitud) : -63.18213701248169
    });

    useImperativeHandle(ref, () => ({
        myLocation
    }));

    useEffect(() => {
        onlatlng(center);
    }, []);
    useEffect(() => {
        if (direccion) {
            if (onlatlng) {
                setCenter(location);
                onlatlng(location);
            }
            onClicDireccion(direccion);
        }
    }, [direccion]);


    useEffect(() => {
        if (location) {
            const geocoder = new (window).google.maps.Geocoder();
            geocoder
                .geocode({location: location})
                .then((response) => {
                    if (response.results[0]) {
                        obtenerDireccion(response.results);
                    } else {
                        window.alert('No results found');
                    }
                })
                .catch((e) => window.alert('Geocoder failed due to: ' + e));
        }

    }, [location]);


    const myLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    })
                    setCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                function (error) {
                    messageAlert();
                }
            )
        } else {
        }
    }

    function messageAlert() {
        console.log("Acceso denegado")
        // Swal.fire({
        //     title: 'Acceso denegado',
        //     icon: 'info',
        //     showCloseButton: true,
        //     showCancelButton: false,
        //     focusConfirm: false,
        //     html: 'Solicitud de geolocalización denegada por el usuario,<br>' +
        //         '<b> Para poder localizar su ubicación actual debe habilitar el permiso </b>',
        // })

    }


    const onMarkerDragEnd = (e) => {
        const latLng = {
            lat: parseFloat(e.latLng.lat()),
            lng: parseFloat(e.latLng.lng()),
        };
        setLocation(latLng);
    };
    const onMarkerClick2 = (e) => {
        if (editable) {
            const latLng = {
                lat: parseFloat(e.latLng.lat()),
                lng: parseFloat(e.latLng.lng()),
            };
            setLocation(latLng);
            console.log("onMarkerClick2", latLng, e)
        }
    }

    function obtenerDireccion(array) {
        let conteo = 0;
        array.forEach((item) => {
            let cadena = item.formatted_address;
            let primer_caracter = cadena.charAt(0);
            if (esLetra(primer_caracter)) {
                conteo++;
                if (conteo == 1) {
                    guardarDireccion(item.formatted_address);
                }
            }
        });
    }

    const esLetra = (caracter) => {
        let ascii = caracter.toUpperCase().charCodeAt(0);
        return ascii > 64 && ascii < 91;
    };


    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyA2Ip5j4czY-AQOISB_U4b-OSIFE1twPvA"
    });

    const [map, setMap] = React.useState(null);
    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
        // console.log("map new",map);
        // cargarOpcMiUbicacion(map);
    }, [])


    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])


    return isLoaded ? (
        <>
            {/*{*/}
            {/*    editable &&*/}
            {/*    <div className=' mb-2 text-white'>*/}
            {/*        <button className=" bg-reterseary text-white hover:bg-resecondary font-inter font-light  py-1 px-4*/}
            {/*    rounded-sm w-auto mt-2 flex items-center justify-center"*/}
            {/*                type="button"*/}
            {/*                onClick={() => myLocation()}>*/}
            {/*            <span className="text-left">ubicación actual</span>*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*}*/}


            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={(e) => onMarkerClick2(e)}
            >
                <>
                    <Marker
                        position={center}
                        draggable={editable}
                        visible={true}
                        onDragEnd={(e) => onMarkerDragEnd(e)}
                    />
                </>
            </GoogleMap>
        </>

    ) : <></>
});

export default Map;
