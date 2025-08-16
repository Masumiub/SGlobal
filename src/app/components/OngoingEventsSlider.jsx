
"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdLocationOn } from "react-icons/md";

export default function OngoingEventsSlider({ events }) {
    const [clientEvents, setClientEvents] = useState([]);

    // Only run formatting after client renders
    useEffect(() => {
        const formatted = events.map(e => ({
            ...e,
            startTime: e.startTime ? new Date(e.startTime) : null,
            endTime: e.endTime ? new Date(e.endTime) : null,
            date: e.date ? new Date(e.date) : null
        }));
        setClientEvents(formatted);
    }, [events]);

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
    };


    const EventCard = ({ event }) => (
        <div className="bg-gradient-to-b from-blue-600 to-sky-500 rounded-2xl overflow-hidden transition-transform duration-300 transform hover:scale-101 fade-in flex flex-col md:flex-row text-white">
            <div className="md:w-1/2 h-64 md:h-auto">
                <img src={event.bannerURL} alt={event.title} className="object-cover w-full h-full" />
            </div>
            <div className="p-6 flex flex-col justify-between md:w-1/2">
                <div>
                    <h3 className="text-2xl font-semibold mb-4">{event.title}</h3>

                    <p className="text-sm mb-1 flex items-center gap-2">
                        <MdLocationOn className="text-white" size={18} />
                        {event.location}
                    </p>

                    <p className="text-sm mb-1 flex items-center gap-2">
                        <FaCalendarAlt className="text-white" />
                        {new Date(event.startTime).toLocaleDateString()} {new Date(event.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {new Date(event.endTime).toLocaleDateString()} {new Date(event.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>


                    <p className="mb-4 mt-4">{event.description}</p>


                    {/* Why Attend */}
                    {event.whyAttend?.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Why Attend?</h2>
                            <ul className="list-disc ml-5">
                                {event.whyAttend.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}


                </div>
                <Link
                    href={`/events/${event._id}`}
                    className="btn rounded-full  border-0"
                >
                    View Details
                </Link>
            </div>
        </div>
    );

    if (!clientEvents.length) return null;

    return (
        <Slider {...settings} className="mb-20">
            {clientEvents.map((event) => (
                <div key={event._id} className="p-2">
                    <EventCard event={event} />
                </div>
            ))}
        </Slider>
    );
}

