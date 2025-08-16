"use client";
import React from 'react'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import ImgContact from '../../../public/assets/Study abroad-pana.svg'



export default function ContactPage() {
    return (
        <div className='bg-gradient-to-b from-sky-300 to-base-100'>
            <div className="max-w-7xl mx-auto px-4 py-20">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold ">Contact Us</h1>
                    <p className=" mt-2">
                        We’d love to hear from you. Get in touch with us anytime!
                    </p>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-12">
                    <div className="flex flex-col items-center bg-base-200 p-6 rounded-2xl shadow">
                        <FaPhoneAlt className="text-blue-500 text-2xl mb-3" />
                        <h3 className="font-semibold">Phone</h3>
                        <p className="">+880 123 456 789</p>
                    </div>

                    <div className="flex flex-col items-center bg-base-200 p-6 rounded-2xl shadow">
                        <FaEnvelope className="text-blue-500 text-2xl mb-3" />
                        <h3 className="font-semibold">Email</h3>
                        <p className="">contact@yourdomain.com</p>
                    </div>

                    <div className="flex flex-col items-center bg-base-200 p-6 rounded-2xl shadow">
                        <FaMapMarkerAlt className="text-blue-500 text-2xl mb-3" />
                        <h3 className="font-semibold">Address</h3>
                        <p className="">Dhaka, Bangladesh</p>
                    </div>
                </div>

                {/* Form + Image */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Contact Form */}
                    <form className="space-y-4 bg-base-100 p-6 rounded-2xl shadow">
                        <div>
                            <label className="block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Message</label>
                            <textarea
                                placeholder="Your Message"
                                rows="4"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Image */}
                    <div className="relative w-full h-80">
                        <Image
                            src={ImgContact}
                            alt="Contact Illustration"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}