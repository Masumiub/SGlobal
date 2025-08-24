"use client";
import React, { useState } from 'react'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaUser, FaComment } from "react-icons/fa";
import Image from "next/image";
import ImgContact from '../../../public/assets/Study abroad-pana.svg'

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            setFormData({ name: '', email: '', message: '' });
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen  py-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold  mb-4">
                        Get in <span className="text-blue-600">Touch</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We'd love to hear from you. Whether you have questions about our services or 
                        need guidance for your study abroad journey, we're here to help!
                    </p>
                </div>

                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300 group">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                            <FaPhoneAlt className="text-blue-600 text-2xl" />
                        </div>
                        <h3 className="font-semibold text-lg text-gray-800 mb-2">Phone</h3>
                        <p className="text-gray-600 mb-2">+880 123 456 789</p>
                        <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM</p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300 group">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                            <FaEnvelope className="text-blue-600 text-2xl" />
                        </div>
                        <h3 className="font-semibold text-lg text-gray-800 mb-2">Email</h3>
                        <p className="text-gray-600 mb-2">contact@shabujglobal.com</p>
                        <p className="text-sm text-gray-500">We reply within 24 hours</p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300 group">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                            <FaMapMarkerAlt className="text-blue-600 text-2xl" />
                        </div>
                        <h3 className="font-semibold text-lg text-gray-800 mb-2">Office</h3>
                        <p className="text-gray-600 mb-2">Dhaka, Bangladesh</p>
                        <p className="text-sm text-gray-500">Visit us by appointment</p>
                    </div>
                </div>

                {/* Form + Image */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Contact Form */}
                    <div className="p-8 md:p-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                            Send us a <span className="text-blue-600">Message</span>
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Fill out the form below and we'll get back to you as soon as possible.
                        </p>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    required
                                />
                            </div>
                            
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    required
                                />
                            </div>
                            
                            <div className="relative">
                                <div className="absolute top-3 left-3 pointer-events-none">
                                    <FaComment className="text-gray-400" />
                                </div>
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                                    required
                                ></textarea>
                            </div>
                            
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center disabled:opacity-75 disabled:transform-none"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane className="mr-2" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Image */}
                    <div className="hidden lg:block relative h-full min-h-96">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100"></div>
                        <Image
                            src={ImgContact}
                            alt="Contact Illustration"
                            fill
                            className="object-contain p-8"
                            priority
                        />
                    </div>
                </div>

                {/* Additional Info */}
                <div className="text-center mt-16">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Follow Us</h3>
                    <div className="flex justify-center space-x-6">
                        <a href="#" className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a href="#" className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.033 10.033 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                        </a>
                        <a href="#" className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                        </a>
                        <a href="#" className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}


// "use client";
// import React from 'react'
// import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
// import Image from "next/image";
// import ImgContact from '../../../public/assets/Study abroad-pana.svg'



// export default function ContactPage() {
//     return (
//         <div className=''>
//             <div className="max-w-7xl mx-auto px-4 py-20">
//                 {/* Header */}
//                 <div className="text-center mb-12">
//                     <h1 className="text-5xl font-bold ">Contact Us</h1>
//                     <p className=" mt-2">
//                         We’d love to hear from you. Get in touch with us anytime!
//                     </p>
//                 </div>

//                 {/* Contact Info */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-12">
//                     <div className="flex flex-col items-center bg-base-200 p-6 rounded-2xl shadow">
//                         <FaPhoneAlt className="text-blue-500 text-2xl mb-3" />
//                         <h3 className="font-semibold">Phone</h3>
//                         <p className="">+880 123 456 789</p>
//                     </div>

//                     <div className="flex flex-col items-center bg-base-200 p-6 rounded-2xl shadow">
//                         <FaEnvelope className="text-blue-500 text-2xl mb-3" />
//                         <h3 className="font-semibold">Email</h3>
//                         <p className="">contact@yourdomain.com</p>
//                     </div>

//                     <div className="flex flex-col items-center bg-base-200 p-6 rounded-2xl shadow">
//                         <FaMapMarkerAlt className="text-blue-500 text-2xl mb-3" />
//                         <h3 className="font-semibold">Address</h3>
//                         <p className="">Dhaka, Bangladesh</p>
//                     </div>
//                 </div>

//                 {/* Form + Image */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//                     {/* Contact Form */}
//                     <form className="space-y-4 bg-base-100 p-6 rounded-2xl shadow">
//                         <div>
//                             <label className="block text-sm font-medium">Name</label>
//                             <input
//                                 type="text"
//                                 placeholder="Your Name"
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium">Email</label>
//                             <input
//                                 type="email"
//                                 placeholder="Your Email"
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium">Message</label>
//                             <textarea
//                                 placeholder="Your Message"
//                                 rows="4"
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                             ></textarea>
//                         </div>
//                         <button
//                             type="submit"
//                             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
//                         >
//                             Send Message
//                         </button>
//                     </form>

//                     {/* Image */}
//                     <div className="relative w-full h-80">
//                         <Image
//                             src={ImgContact}
//                             alt="Contact Illustration"
//                             fill
//                             className="object-contain"
//                         />
//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// }