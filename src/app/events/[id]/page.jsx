import EventRegistration from "@/app/components/EventRegistration";
import Features from "@/app/components/Features";
import PastEvents from "@/app/components/PastEvents";
import clientPromise from "@/app/lib/db";
import { ObjectId } from "mongodb";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
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
    return <div className="text-center py-20">Event not found.</div>;
  }

  return (
    <div className="">
      <EventStructuredData event={event} />
      <BreadcrumbStructuredData eventTitle={event.title} eventId={id} />
      
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-30">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2">
            <h1 className="text-5xl font-bold mt-6">{event.title}</h1>

            <p className="my-2 flex items-center gap-2">
              <FaCalendarAlt className="text-sky-500" />
              {format(new Date(event.startTime), 'MMMM d, yyyy')} at{' '}
              {format(new Date(event.startTime), 'h:mm a')} -{' '}
              {format(new Date(event.endTime), 'MMMM d, yyyy')} at{' '}
              {format(new Date(event.endTime), 'h:mm a')}
            </p>

            <div className="my-2 flex items-center gap-2">
              <MdLocationOn className="text-sky-500" />
              <p className="">{event.location}</p>
            </div>

            <p className="mb-6">{event.description}</p>

            {event.whyAttend?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Why Attend?</h2>
                <ul className="list-disc ml-5 ">
                  {event.whyAttend.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {event.topPartnerUniversities?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Top Partner Universities</h2>
                <ul className="list-disc ml-5">
                  {event.topPartnerUniversities.map((uni, idx) => (
                    <li key={idx}>{uni}</li>
                  ))}
                </ul>
              </div>
            )}

            {event.contactNumber && (
              <p className="">
                <strong>Contact:</strong> {event.contactNumber}
              </p>
            )}
          </div>

          <div className="w-full md:w-1/2">
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={event.bannerURL}
                alt={event.title}
                fill
                className="rounded-2xl shadow-2xl object-cover"
                priority={true}
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL="/placeholder.svg"
              />
            </div>
          </div>
        </div>
        
        <div>
          <EventRegistration safeEvent={event} />
        </div>
        
        <div className="mt-30 mb-[-180px]">
          <Features />
        </div>

        <div className="mb-[-80px]">
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

