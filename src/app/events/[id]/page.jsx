import EventRegistration from "@/app/components/EventRegistration";
import Features from "@/app/components/Features";
import PastEvents from "@/app/components/PastEvents";
import clientPromise from "@/app/lib/db";
import { ObjectId } from "mongodb";
import Image from "next/image";
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaUniversity, 
  FaCheckCircle,
  FaClock,
  FaArrowRight
} from "react-icons/fa";
import { format, formatISO } from 'date-fns';

export const revalidate = 60;

// Helper function to fetch event data
async function getEventData(id) {
  try {
    const client = await clientPromise;
    const db = client.db("SGlobalDB");
    const event = await db.collection("events").findOne({ _id: new ObjectId(id) });
    
    if (!event) return null;
    
    return {
      _id: event._id.toString(),
      title: event.title || "",
      location: event.location || "",
      description: event.description || "",
      bannerURL: event.bannerURL || "",
      whyAttend: event.whyAttend || [],
      topPartnerUniversities: event.topPartnerUniversities || [],
      contactNumber: event.contactNumber || "",
      date: event.date ? new Date(event.date).toISOString() : null,
      startTime: event.startTime ? new Date(event.startTime).toISOString() : null,
      endTime: event.endTime ? new Date(event.endTime).toISOString() : null,
      createdAt: event.createdAt ? new Date(event.createdAt).toISOString() : null,
    };
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

// Pre-generate all event pages at build time
export async function generateStaticParams() {
  try {
    const client = await clientPromise;
    const db = client.db("SGlobalDB");
    const events = await db.collection("events").find({}, { projection: { _id: 1 } }).toArray();
    return events.map(event => ({
      id: event._id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Structured data components
function EventStructuredData({ event }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: formatISO(new Date(event.startTime)),
    endDate: formatISO(new Date(event.endTime)),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.location,
    },
    description: event.description,
    image: event.bannerURL,
    organizer: {
      '@type': 'Organization',
      name: 'Shabuj Global',
      url: 'https://s-global.vercel.app/'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function BreadcrumbStructuredData({ eventTitle, eventId }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://s-global.vercel.app/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Events',
        item: 'https://s-global.vercel.app/events',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: eventTitle,
        item: `https://s-global.vercel.app/events/${eventId}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Dynamic metadata per event
export async function generateMetadata({ params }) {
  const { id } = await params;
  const event = await getEventData(id);

  if (!event) {
    return {
      title: "Event Not Found - Shabuj Global",
      description: "This event could not be found.",
    };
  }

  return {
    title: `${event.title} - Shabuj Global`,
    description: event.description?.slice(0, 160) || "Shabuj Global event details",
    openGraph: {
      title: `${event.title} - Shabuj Global`,
      description: event.description?.slice(0, 160) || "Shabuj Global event details",
      url: `https://s-global.vercel.app/events/${id}`,
      siteName: "Shabuj Global",
      images: [
        {
          url: event.bannerURL || "https://s-global.vercel.app/default-og-image.jpg",
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} - Shabuj Global`,
      description: event.description?.slice(0, 160) || "Shabuj Global event details",
      images: [event.bannerURL || "https://s-global.vercel.app/default-og-image.jpg"],
      site: "@ShabujTwitterHandle",
      creator: "@ShabujTwitterHandle",
    },
  };
}

// Event details page
export default async function EventDetailsPage({ params }) {
  const { id } = await params;
  const event = await getEventData(id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-20 max-w-md mx-auto">
          <div className="bg-red-100 text-red-600 p-4 rounded-full inline-flex mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or may have been removed.</p>
          <a href="/events" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Browse All Events
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <EventStructuredData event={event} />
      <BreadcrumbStructuredData eventTitle={event.title} eventId={id} />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-sky-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="text-sm text-blue-100 mb-6">
            <a href="/" className="hover:text-white">Home</a> 
            <span className="mx-2">/</span>
            <a href="/events" className="hover:text-white">Events</a>
            <span className="mx-2">/</span>
            <span className="text-white">{event.title}</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
          
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <FaCalendarAlt className="mr-2" />
              <span>
                {format(new Date(event.startTime), 'MMMM d, yyyy')}
              </span>
            </div>
            
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <FaClock className="mr-2" />
              <span>
                {format(new Date(event.startTime), 'h:mm a')} - {format(new Date(event.endTime), 'h:mm a')}
              </span>
            </div>
            
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <FaMapMarkerAlt className="mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg mb-8">
              <Image
                src={event.bannerURL}
                alt={event.title}
                fill
                className="object-cover"
                priority={true}
                sizes="(max-width: 1024px) 100vw, 66vw"
                placeholder="blur"
                blurDataURL="/placeholder.svg"
              />
            </div>

            {/* Event Description */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>
                About This Event
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">{event.description}</p>
            </div>

            {/* Why Attend Section */}
            {event.whyAttend?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  Why Attend?
                </h2>
                <ul className="space-y-4">
                  {event.whyAttend.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                        <FaArrowRight className="text-blue-600 text-sm" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Partner Universities */}
            {event.topPartnerUniversities?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaUniversity className="text-blue-500 mr-3" />
                  Partner Universities
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.topPartnerUniversities.map((uni, idx) => (
                    <li key={idx} className="flex items-center bg-gray-50 p-4 rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <FaUniversity className="text-blue-600" />
                      </div>
                      <span className="text-gray-700">{uni}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Registration Component */}
            <div className="sticky top-6">
              <EventRegistration safeEvent={event} />
              
              {/* Contact Information */}
              {event.contactNumber && (
                <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FaPhone className="text-blue-500 mr-2" />
                    Contact Information
                  </h3>
                  <p className="text-gray-600 mb-2">Have questions about this event?</p>
                  <a 
                    href={`tel:${event.contactNumber}`}
                    className="text-blue-600 font-semibold text-lg hover:text-blue-800 transition-colors"
                  >
                    {event.contactNumber}
                  </a>
                </div>
              )}

              {/* Share Event */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Share This Event</h3>
                <div className="flex space-x-4">
                  <button className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.033 10.033 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Components */}
        <div className="mt-20">
          <Features />
        </div>

        <div className="mt-20">
          <PastEvents />
        </div>
      </div>
    </div>
  );
}

// import EventRegistration from "@/app/components/EventRegistration";
// import Features from "@/app/components/Features";
// import PastEvents from "@/app/components/PastEvents";
// import clientPromise from "@/app/lib/db";
// import { ObjectId } from "mongodb";
// import Image from "next/image";
// import { FaCalendarAlt } from "react-icons/fa";
// import { MdLocationOn } from "react-icons/md";


// export const revalidate = 60; // ISR: revalidate every 60 seconds

// // Pre-generate all event pages at build time
// export async function generateStaticParams() {
//   const client = await clientPromise;
//   const db = client.db("SGlobalDB");

//   const events = await db.collection("events").find({}, { projection: { _id: 1 } }).toArray();

//   return events.map(event => ({
//     id: event._id.toString(),
//   }));
// }



// // Dynamic metadata per event
// export async function generateMetadata({ params }) {
//   const { id } = await params;
//   const client = await clientPromise;
//   const db = client.db("SGlobalDB");
//   const event = await db.collection("events").findOne({ _id: new ObjectId(id) });

//   if (!event) {
//     return {
//       title: "Event Not Found - Shabuj Global",
//       description: "This event could not be found.",
//     };
//   }

//   return {
//     title: `${event.title} - Shabuj Global`,
//     description: event.description?.slice(0, 160) || "Shabuj Global event details",
//     openGraph: {
//       title: `${event.title} - Shabuj Global`,
//       description: event.description?.slice(0, 160) || "Shabuj Global event details",
//       url: `https://s-global.vercel.app/events/${id}`,
//       siteName: "Shabuj Global",
//       images: [
//         {
//           url: event.bannerURL || "https://s-global.vercel.app/default-og-image.jpg",
//           width: 1200,
//           height: 630,
//           alt: event.title,
//         },
//       ],
//       type: "website",
//       locale: "en_US",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `${event.title} - Shabuj Global`,
//       description: event.description?.slice(0, 160) || "Shabuj Global event details",
//       images: [event.bannerURL || "hhttps://s-global.vercel.app/default-og-image.jpg"],
//       site: "@ShabujTwitterHandle",
//       creator: "@ShabujTwitterHandle",
//     },
//   };
// }

// // Event details page
// export default async function EventDetailsPage({ params }) {
//   const { id } = await params;

//   const client = await clientPromise;
//   const db = client.db("SGlobalDB");

//   const event = await db.collection("events").findOne({ _id: new ObjectId(id) });



//     const safeEvent = {
//     _id: event._id.toString(),
//     title: event.title || "",
//     location: event.location || "",
//     description: event.description || "",
//     bannerURL: event.bannerURL || "",
//     whyAttend: event.whyAttend || [],
//     topPartnerUniversities: event.topPartnerUniversities || [],
//     contactNumber: event.contactNumber || "",
//     date: event.date ? new Date(event.date).toISOString() : null,
//     startTime: event.startTime ? new Date(event.startTime).toISOString() : null,
//     endTime: event.endTime ? new Date(event.endTime).toISOString() : null,
//     createdAt: event.createdAt ? new Date(event.createdAt).toISOString() : null,
//   };



//   if (!event) {
//     return <div className="text-center py-20">Event not found.</div>;
//   }

//   return (
//     <div className="">
//       <div className="max-w-6xl mx-auto px-4 pt-20 pb-30">

//         <div className="flex flex-col md:flex-row gap-10">

//           <div className="w-full md:w-1/2">
//             {/* Title & Basic Info */}
//             <h1 className="text-5xl font-bold mt-6">{event.title}</h1>

//             <p className="my-2 flex items-center gap-2">
//               <FaCalendarAlt className="text-sky-500" />
//               {new Date(event.startTime).toLocaleDateString()} {new Date(event.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {new Date(event.endTime).toLocaleDateString()} {new Date(event.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//             </p>

//             <div className="my-2 flex items-center gap-2">
//               <MdLocationOn className="text-sky-500" />
//               <p className="">{event.location}</p>
//             </div>


//             {/* Description */}
//             <p className="mb-6">{event.description}</p>

//             {/* Why Attend */}
//             {event.whyAttend?.length > 0 && (
//               <div className="mb-6">
//                 <h2 className="text-xl font-semibold mb-2">Why Attend?</h2>
//                 <ul className="list-disc ml-5 ">
//                   {event.whyAttend.map((item, idx) => (
//                     <li key={idx}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Partner Universities */}
//             {event.topPartnerUniversities?.length > 0 && (
//               <div className="mb-6">
//                 <h2 className="text-xl font-semibold mb-2">Top Partner Universities</h2>
//                 <ul className="list-disc ml-5">
//                   {event.topPartnerUniversities.map((uni, idx) => (
//                     <li key={idx}>{uni}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Contact */}
//             {event.contactNumber && (
//               <p className="">
//                 <strong>Contact:</strong> {event.contactNumber}
//               </p>
//             )}
//           </div>


//           <div className="w-full md:w-1/2">
//             {/* Banner */}
//             <div className="relative w-full h-64 md:h-96">
//               <Image
//                 src={event.bannerURL}
//                 alt={event.title}
//                 fill
//                 className="rounded-2xl shadow-2xl object-cover"
//                 priority={true}
//               />
//             </div>
//           </div>


//         </div>
        
//         <div>
//           <EventRegistration safeEvent={safeEvent}></EventRegistration>
//         </div>
//         <div className="mt-30 mb-[-180px]">
//           <Features></Features>
//         </div>

//         <div className="mb-[-80px]">
//         <PastEvents></PastEvents>
//         </div>

//       </div>
//     </div>
//   );
// }

