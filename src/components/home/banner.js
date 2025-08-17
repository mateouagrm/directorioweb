import React from 'react'

function Banner() {
    return (
        <>
            <section className="relative st-hero st-style1 st-bg st-dynamic-bg st-ripple-version">
                <img
                    src="https://www.happytrailsplay.com/wp-content/uploads/2023/09/homepagepicture-min.jpg"
                    alt="Hero"
                    className="w-full object-cover"
                />
                <div className="absolute inset-0 flex justify-center items-end text-black text-3xl">
                    hola mundo
                </div>

            </section>
        </>
    );
}


export default Banner