import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Navigation, Thumbs} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


function Gallery({data}) {
    const [arrayResources, SetArrayResources] = useState([]);
    useEffect(() => {
        if (data) {
            SetArrayResources(data);
        }
    }, [data]);

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <>
            {
                arrayResources.length>0 &&
                <div className="">
                    <div className="p-2 w-100 h-[65vh] min-h-[65vh]">
                        <Swiper
                            style={{
                                '--swiper-navigation-color': '#fff',
                                '--swiper-pagination-color': '#fff',
                            }}
                            loop={arrayResources.length > 1}
                            slidesPerView={1}
                            slidesPerGroup={1}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{swiper: thumbsSwiper}}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper mySwiper_gallery mb-0 pb-0"
                        >
                            {
                                arrayResources.map((item, index) =>
                                    <SwiperSlide className="gallery-item" key={index}>
                                        <img src={item.url_resource} alt=""
                                             className="object-fit-contain"/>
                                    </SwiperSlide>
                                )
                            }
                        </Swiper>
                    </div>

                    <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={arrayResources.length > 1}
                        slidesPerGroup={1}
                        spaceBetween={10}
                        slidesPerView={5}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper mySwiper2 mySwiper-selection"
                    >
                        {
                            arrayResources.map((item, key) =>
                                <SwiperSlide key={key}>
                                    <div className="swiper-container-image">
                                        <img className="img-information"
                                             src={item.url_resource} alt=""/>
                                    </div>
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </div>
            }

        </>
    );
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, {})(Gallery)