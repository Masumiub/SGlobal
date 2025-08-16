import React from 'react'
import Image from "next/image";
import Link from 'next/link';
import { PiStudentFill } from "react-icons/pi";


export default function Header() {
    return (
        <header>
            <div className="w-full lg:max-w-4xl mx-auto px-6 py-20 text-center">

                <div className='w-full flex flex-col justify-center mx-auto items-center'>
                
                        <div className="bg-base-100 text-black p-2 rounded-full shadow-lg  mb-8 flex flex-row items-center">
                            <PiStudentFill />
                            <p className="text-xs">2,326k Happy Students</p>
                        </div>

                        <p className='text-center text-sm'>No more lack of trust and transparency – we treat your dream as our own!</p>
                    
                </div>
                



                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 mt-5">
                    Start Your Path to <span className="text-blue-800">Global Education</span>
                </h1>
                <p className="mb-8">
                    We take pride in our ability to help students achieve their academic goals and succeed in life. Get complete guidance in your study abroad journey from start to finish.
                </p>
                <Link href='/register' className='btn bg-blue-500 text-white rounded-full border-0'>Join Now</Link>
            </div>
        </header>
    )
}
