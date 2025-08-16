import React from 'react'
import ImgStudy from '../../../public/assets/Study abroad-bro.svg'
import Image from 'next/image'


export default function About() {
  return (
    <section className="py-40 bg-sky-50 rounded-2xl">
      <div className="max-w-6xl mx-auto px-6">

        <div className='flex flex-col md:flex-row gap-10 items-center'>
          <div className='w-full md:w-1/2'>
            <h2 className="text-4xl md:text-4xl font-bold mb-6 text-blue-800">
              Your Complete Study Abroad Partner
            </h2>
            <p className="max-w-3xl mx-auto">
              Get complete guidance in your study abroad journey from start to finish.
              Shabuj Global Education helps you with Course & University Selection, Interview and Test Preparation,
              Visa Application and Admission and more—so you can join your dream university with ease!
            </p>
          </div>

          <div className='w-full md:w-1/2'>
            <Image src={ImgStudy} alt='study' width='250px'></Image>
          </div>
        </div>

      </div>
    </section>
  )
}
