import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import logo from "../assets/image/logo.svg";

const LandingSeller = () => {
  const images = [
    "https://wallpapers.com/images/hd/electronic-products-colorful-shopping-bags-gpfocg9ynbz1led3.jpg",
    "https://png.pngtree.com/background/20230519/original/pngtree-cleaning-products-are-in-various-colors-picture-image_2665108.jpg",
    "https://wallpapers.com/images/hd/plastic-container-grocery-items-0xohb77duscvehe3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="bg-ecoprimary1 text-white">
      {/* Navbar */}
      {/* Navbar */}
      <nav className="bg-white px-4 py-3 flex justify-between items-center align-items-center fixed top-0 left-0 w-full z-50 shadow-md">
        <img src={logo} alt="Piray Market" width={120} height={47} />

        <ul className="flex space-x-2 mb-0">
          <li>
            <a href="#register" className="px-3 py-2 bg-ecoprimary1 text-white rounded-lg transition duration-300 hover:bg-ecoprimary2 no-underline">
              Regístrate
            </a>
          </li>
          <li>
            <a href="#features" className="px-3 py-2 bg-ecoprimary1 text-white rounded-lg transition duration-300 hover:bg-ecoprimary2 no-underline">
              Beneficios
            </a>
          </li>
          <li>
            <a href="#pricing" className="px-3 py-2 bg-ecoprimary1 text-white rounded-lg transition duration-300 hover:bg-ecoprimary2 no-underline">
              Planes
            </a>
          </li>
          <li>
            <a href="#how-it-works" className="px-3 py-2 bg-ecoprimary1 text-white rounded-lg transition duration-300 hover:bg-ecoprimary2 no-underline">
              Cómo Funciona
            </a>
          </li>

          <li>
            <a href="#faq" className="px-3 py-2 bg-ecoprimary1 text-white rounded-lg transition duration-300 hover:bg-ecoprimary2 no-underline">
              Preguntas Frecuentes
            </a>
          </li>
        </ul>
      </nav>


      {/* Sección de Registro */}
      <div className="pt-16">
        <section id="register" className="p-12 text-center bg-white bg-cover bg-center relative" style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp3537545.jpg')" }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <h1 className="mt-5 text-4xl font-bold text-white relative z-10">Únete a Nuestro Programa de Afiliados</h1>
          <p className="mt-2 text-lg text-white relative z-10">Gana dinero recomendando productos de nuestro ecommerce. ¡Es fácil y rentable!</p>
          <button className="my-4  bg-ecoprimary2 text-ecoprimary1 px-6 py-2 rounded-lg font-semibold relative z-10">Comienza Ahora</button>
        </section>
      </div>

      {/* Sección de BENEFICIOS */}
      <section id="features" className="py-12 px-6 text-black bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center">Beneficios de Ser Afiliado</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Comisiones Generosas</h3>
              <p className="mt-2">Gana una comisión por cada venta que generes a través de tu enlace de afiliado.</p>
              <img src="https://consultoria.anexia.es/uploaded/iso-smart-globe-with-check-mark-guarantee-icons-on-2023-11-27-04-58-37-utc.webp" alt="Comisiones" className="mt-4 w-full h-48 object-cover rounded-lg" />
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Acceso a Herramientas</h3>
              <p className="mt-2">Recibe banners, enlaces personalizados y recursos para facilitar la promoción de productos.</p>
              <img src="https://consultoria.anexia.es/uploaded/iso-smart-globe-with-check-mark-guarantee-icons-on-2023-11-27-04-58-37-utc.webp" alt="Herramientas Promocionales" className="mt-4 w-full h-48 object-cover rounded-lg" />
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Pagos Mensuales</h3>
              <p className="mt-2">Recibe tus ganancias de forma mensual a través de diversos métodos de pago seguros.</p>
              <img src="https://consultoria.anexia.es/uploaded/iso-smart-globe-with-check-mark-guarantee-icons-on-2023-11-27-04-58-37-utc.webp" alt="Pagos" className="mt-4 w-full h-48 object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Sección de PLANES */}
      <section id="pricing" className="py-12 px-6 bg-ecoprimary1 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold">Nuestros Planes de Afiliado</h2>
          <p className="mt-4">Elige el plan que mejor se adapte a tu estilo de promoción.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white text-black p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Plan Básico</h3>
              <p className="mt-2">Comisión del 5% por cada venta generada.</p>
              <button className="mt-4 bg-ecoprimary2 text-ecoprimary1 px-6 py-2 rounded-lg">Únete Ahora</button>
            </div>
            <div className="bg-white text-black p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Plan Premium</h3>
              <p className="mt-2">Comisión del 10% por cada venta generada.</p>
              <button className="mt-4 bg-ecoprimary2 text-ecoprimary1 px-6 py-2 rounded-lg">Únete Ahora</button>
            </div>
          </div>
        </div>
      </section>


      {/* Sección Cómo Funciona */}
      <section id="how-it-works" className="py-12 px-6 bg-white text-black text-center">
        <h2 className="text-3xl font-bold">¿Cómo Funciona?</h2>
        <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="text-center">
            <img src="https://m.media-amazon.com/images/G/02/associates/network/TapHand_Join.svg" alt="Registro" className="w-16 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">1. Regístrate</h3>
            <p className="mt-2">Únete a nuestro programa de afiliados en minutos.</p>
          </div>
          <div className="text-center">
            <img src="https://m.media-amazon.com/images/G/02/associates/network/TapHand_Join.svg" alt="Comparte" className="w-16 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">2. Comparte productos</h3>
            <p className="mt-2">Recomienda productos con enlaces personalizados.</p>
          </div>
          <div className="text-center">
            <img src="https://m.media-amazon.com/images/G/02/associates/network/TapHand_Join.svg" alt="Gana dinero" className="w-16 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">3. Gana dinero</h3>
            <p className="mt-2">Obtén comisiones por cada compra realizada a través de tu enlace.</p>
          </div>
        </div>
      </section>

      {/* Sección Testimonios */}
      <section id="testimonials" className="py-12 px-6 bg-gray-100 text-black text-center">
        <h2 className="text-3xl font-bold">Testimonios</h2>
        <div className="mt-8 flex flex-col md:flex-row justify-center items-start gap-8">

          {/* Testimonio 1 */}
          <div className="bg-white p-6 rounded-lg max-w-sm text-center">
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/robert-downey-jr-fotogramas-1617222563.jpg"
              alt="Usuario 1"
              className="w-32 h-32 rounded-full mx-auto object-cover"
            />
            <blockquote className="mt-4 text-lg italic">
              "Gracias a este programa, he podido monetizar mi contenido de manera sencilla y efectiva. ¡Lo recomiendo totalmente!"
            </blockquote>
            <p className="mt-2 font-bold">Juan Pérez, Blogger</p>
          </div>

          {/* Testimonio 2 */}
          <div className="bg-white p-6 rounded-lg max-w-sm text-center">
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/robert-downey-jr-fotogramas-1617222563.jpg"
              alt="Usuario 2"
              className="w-32 h-32 rounded-full mx-auto object-cover"
            />
            <blockquote className="mt-4 text-lg italic">
              "Me ha ayudado a generar ingresos extras sin complicaciones. Muy recomendado."
            </blockquote>
            <p className="mt-2 font-bold">María López, Influencer</p>
          </div>

          {/* Testimonio 3 */}
          <div className="bg-white p-6 rounded-lg max-w-sm text-center">
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/robert-downey-jr-fotogramas-1617222563.jpg"
              alt="Usuario 3"
              className="w-32 h-32 rounded-full mx-auto object-cover"
            />
            <blockquote className="mt-4 text-lg italic">
              "¡Increíble! Una de las mejores oportunidades para generar ingresos de manera pasiva."
            </blockquote>
            <p className="mt-2 font-bold">Carlos Mendoza, Vendedor Online</p>
          </div>

        </div>
      </section>


      {/* Sección Preguntas Frecuentes */}
      <section id="faq" className="py-12 px-6 bg-white text-black">
        <h2 className="text-3xl font-bold text-center">Preguntas Frecuentes</h2>
        <div className="mt-8 max-w-4xl mx-auto space-y-6">
          <details className="bg-gray-100 p-4 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer">¿Cómo funciona el programa de afiliados?</summary>
            <p className="mt-2">Puedes compartir productos y ganar comisiones por cada compra generada a través de tu enlace de afiliado.</p>
          </details>
          <details className="bg-gray-100 p-4 rounded-lg shadow-md">
            <summary className="font-semibold cursor-pointer">¿Cuánto puedo ganar?</summary>
            <p className="mt-2">Las comisiones varían según el producto y la categoría, con tasas competitivas en todas las áreas.</p>
          </details>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="py-12 bg-gray-900 text-white text-center">
        <h2 className="text-xl font-bold">Únete hoy y comienza a ganar</h2>
        <button className="mt-4 bg-ecoprimary2 text-ecoprimary1 px-6 py-2 rounded-lg font-semibold">Regístrate Ahora</button>
        <p className="mt-4">&copy; 2025 Piray Market. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(LandingSeller);
