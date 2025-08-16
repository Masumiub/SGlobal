"use client";

import Image from "next/image";
import { useState } from "react";
import ImgSub from '../../../public/assets/Study abroad-amico.svg'


export default function Subscribe() {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        if (!email) return alert("Please enter your email");
        alert(`Thank you! We will notify you at ${email} about upcoming events.`);
        setEmail("");
    };

    return (
        <section className="py-40 bg-gradient-to-b from-blue-600 to-sky-400 text-white rounded-2xl mb-20">
            <div className="max-w-5xl mx-auto px-6">

                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-4xl md:text-5xl font-bold  mb-4">
                            Stay tuned for your exciting events in the future!
                        </h2>
                        <p className=" mb-8 ">
                            Our core belief is to ensure that our students receive comprehensive education and guidance at every stage of their study abroad journey.
                            Presented below are a few of our previous international educational events.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-3 w-full sm:w-72 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                            />
                            <button
                                onClick={handleSubscribe}
                                className="px-6 py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold rounded shadow hover:from-blue-500 hover:to-sky-400 transition"
                            >
                                Notify Me
                            </button>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <Image src={ImgSub} alt='ImgSub' width='250px'></Image>
                    </div>
                </div>



            </div>
        </section>
    );
}
