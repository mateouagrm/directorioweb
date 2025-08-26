import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { motion } from 'framer-motion';
import defaultImg from '../../assets/image/directorio/default.jpg';

const members = [
    { id: 1, name: 'Sarah', image: defaultImg },
    { id: 2, name: 'David', image: defaultImg },
    { id: 3, name: 'Michael', image: defaultImg },
    { id: 4, name: 'Emily', image: defaultImg },
    { id: 5, name: 'John', image: defaultImg },
    { id: 6, name: 'Anna', image: defaultImg },
    { id: 7, name: 'Daniel', image: defaultImg },
    { id: 8, name: 'Laura', image: defaultImg },
];

function MemberSlider () {
    return (
        <section className="py-8">
            <h2 className="text-xl font-bold mb-4">Miembros destacados</h2>
            <Swiper
                slidesPerView={3}
                spaceBetween={20}
                breakpoints={{
                    1024: {
                        slidesPerView: 6,
                    },
                }}
            >
                {members.map((member) => (
                    <SwiperSlide key={member.id}>
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center bg-white rounded-lg p-4 shadow"
                        >
                            <div className="w-24 h-24 mb-2 rounded-full overflow-hidden bg-gray-200">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-sm font-medium text-center">{member.name}</p>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}


export default MemberSlider;