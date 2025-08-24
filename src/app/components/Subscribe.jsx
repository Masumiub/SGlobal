"use client";

import Image from "next/image";
import { useState } from "react";
import ImgSub from '../../../public/assets/newsletter.png'

export default function Subscribe() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return alert("Please enter your email");
        
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => {
                alert(`Thank you! We will notify you at ${email} about upcoming events.`);
                setEmail("");
                setIsSubmitted(false);
            }, 2000);
        }, 1500);
    };

    return (
        <section className="relative py-20 md:py-28 overflow-hidden rounded-3xl mb-20">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 animate-gradient-x"></div>
            
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full animate-pulse-slow"></div>
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-sky-300/20 rounded-full animate-pulse-slow" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/15 rounded-full animate-bounce-slow"></div>
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    {/* Image Section */}
                    <div className="w-full md:w-2/5 flex justify-center">
                        <div className="relative">
                            <div className="absolute -inset-6 bg-white/20 rounded-2xl transform rotate-3 animate-float"></div>
                            <div className="relative">
                                <Image 
                                    src={ImgSub} 
                                    alt="Stay updated with our newsletter" 
                                    width={350}
                                    height={350}
                                    className="drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-3/5">
                        {/* Success Message */}
                        {isSubmitted ? (
                            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center animate-fade-in">
                                <div className="flex justify-center mb-6">
                                    <div className="relative">
                                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                                            <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-3">You're Subscribed!</h3>
                                <p className="text-white/80">We'll send updates about upcoming events to your email.</p>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                                    Never Miss an <br />
                                    <span className="relative">
                                        Important Update
                                        <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M 0 10 Q 75 2 150 10 Q 225 18 300 10" stroke="rgba(255,255,255,0.4)" strokeWidth="4" fill="none" />
                                        </svg>
                                    </span>
                                </h2>
                                
                                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                                    Get exclusive updates on upcoming events, university fairs, and important deadlines. 
                                    Our newsletter keeps you informed about everything you need for your study abroad journey.
                                </p>

                                {/* Subscription Form */}
                                <form onSubmit={handleSubscribe} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold text-white mb-2">Join our newsletter</h3>
                                        <p className="text-white/80">Be the first to know about new opportunities</p>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="relative flex-grow">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                                </svg>
                                            </div>
                                            <input
                                                type="email"
                                                placeholder="Enter your email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-white/95 rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-500"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-6 py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-500 hover:to-sky-400 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center disabled:opacity-70 disabled:transform-none"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </>
                                            ) : (
                                                "Subscribe Now"
                                            )}
                                        </button>
                                    </div>
                                    
                                    <p className="text-xs text-white/60 mt-4">
                                        We respect your privacy. You can unsubscribe at any time.
                                    </p>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}


// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import ImgSub from '../../../public/assets/newsletter.png'


// export default function Subscribe() {
//     const [email, setEmail] = useState("");

//     const handleSubscribe = () => {
//         if (!email) return alert("Please enter your email");
//         alert(`Thank you! We will notify you at ${email} about upcoming events.`);
//         setEmail("");
//     };

//     return (
//         <section className="py-40 bg-gradient-to-b from-blue-600 to-sky-400 text-white rounded-2xl mb-20">
//             <div className="max-w-5xl mx-auto px-6">

//                 <div className="flex flex-col md:flex-row-reverse gap-10 items-center">
//                     <div className="w-full md:w-1/2">
//                         <h2 className="text-4xl md:text-5xl font-bold  mb-4">
//                             Stay tuned for your exciting events in the future!
//                         </h2>
//                         <p className=" mb-8 ">
//                             Our core belief is to ensure that our students receive comprehensive education and guidance at every stage of their study abroad journey.
//                             Presented below are a few of our previous international educational events.
//                         </p>

//                         <div className="flex flex-col sm:flex-row items-center gap-4">
//                             <input
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="p-3 w-full sm:w-72 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
//                             />
//                             <button
//                                 onClick={handleSubscribe}
//                                 className="px-6 py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold rounded shadow hover:from-blue-500 hover:to-sky-400 transition"
//                             >
//                                 Notify Me
//                             </button>
//                         </div>
//                     </div>

//                     <div className="w-full md:w-1/2">
//                         <Image src={ImgSub} alt='ImgSub' width='250px'></Image>
//                     </div>
//                 </div>



//             </div>
//         </section>
//     );
// }
