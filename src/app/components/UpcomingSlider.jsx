'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import EventCard from "./EventCard";
import React from 'react'

export default function UpcomingSlider({limitedEvents}) {
  return (
    <div>
            {/* Swiper Slider */}
      <div className="mt-10">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          autoplay={{ delay: 3000, disableOnInteraction: true }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="mySwiper"
        >
          {limitedEvents.map((event) => (
            <SwiperSlide key={event._id.toString()} className="max-w-sm">
              <EventCard event={event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
