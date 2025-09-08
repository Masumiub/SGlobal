


import Image from "next/image";
import clientPromise from "../lib/db";
import Link from "next/link";
import EventCard from "../components/EventCard";
import OngoingEvents from "../components/OngoingEvent";
import UpcomingEvents from "../components/UpcomingEvents";

export const revalidate = 60; // ISR

export const metadata = {
  title: "Events - Shabuj Global",
  description: "Explore all ongoing and upcoming events organized by Shabuj Global for students planning to study abroad.",
  keywords: "Shabuj Global, study abroad, events, student programs, workshops, seminars",
  authors: [{ name: "Shabuj Global", url: "https://s-global.vercel.app/" }],
  robots: "index, follow",
  openGraph: {
    title: "Events - Shabuj Global",
    description: "Stay updated with all ongoing and upcoming events for students planning to study abroad.",
    url: "https://s-global.vercel.app/events",
    siteName: "Shabuj Global",
    images: [
      {
        url: "https://s-global.vercel.app/og-events.jpg",
        width: 1200,
        height: 630,
        alt: "Shabuj Global Events",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events - Shabuj Global",
    description: "Stay updated with all ongoing and upcoming events for students planning to study abroad.",
    site: "@ShabujTwitterHandle",
    creator: "@ShabujTwitterHandle",
    images: ["https://s-global.vercel.app/og-events.jpg"],
  },
};

const EVENTS_PER_PAGE = 6;

export default async function EventsPage({ searchParams }) {
  const client = await clientPromise;
  const db = client.db("SGlobalDB");

  const page = await parseInt(searchParams?.page || "1", 10);
  const now = new Date().toISOString();

  // Fetch only past events directly in MongoDB
  const pastEventsCursor = db
    .collection("events")
    .find({ endTime: { $lt: now } }) // ✅ only past events
    .sort({ date: -1 }) // latest past first
    .project({
      title: 1,
      bannerURL: 1,
      startTime: 1,
      endTime: 1,
      description: 1,
    })
    .skip((page - 1) * EVENTS_PER_PAGE)
    .limit(EVENTS_PER_PAGE);

  const currentEvents = await pastEventsCursor.toArray();

  // Get total count (for pagination UI)
  const totalEvents = await db.collection("events").countDocuments({ endTime: { $lt: now } });
  const totalPages = Math.ceil(totalEvents / EVENTS_PER_PAGE);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 pb-30">
        {/* Ongoing & Upcoming sections */}
        <OngoingEvents />
        <UpcomingEvents />

        {/* Past Events */}
        <h2 className="text-5xl font-bold mb-6 text-center">Past Events</h2>
        <div className="w-full md:w-7/12 mx-auto">
          <p className="text-center">
            Our core belief is to ensure that our students receive comprehensive education and guidance
            at every stage of their study abroad journey.
          </p>
        </div>

        {/* Cards */}
        {currentEvents.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No past events.</div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-20">
            {currentEvents.map((event) => (
              <EventCard key={event._id.toString()} event={event} showViewDetailsButton={true} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex mx-auto justify-center mt-10 gap-1">
            <Link
              href={`?page=${page > 1 ? page - 1 : 1}`}
              className={`join-item btn ${page === 1 ? "btn-disabled" : ""}`}
            >
              Previous
            </Link>

            <div className="join">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <Link
                    key={pageNum}
                    href={`?page=${pageNum}`}
                    className={`join-item btn ${page === pageNum ? "btn-active" : ""}`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>

            <Link
              href={`?page=${page < totalPages ? page + 1 : totalPages}`}
              className={`join-item btn ${page === totalPages ? "btn-disabled" : ""}`}
            >
              Next
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}


// import Image from "next/image";
// import clientPromise from "../lib/db";
// import Link from "next/link";
// import EventCard from "../components/EventCard";
// import OngoingEvents from "../components/OngoingEvent";
// import UpcomingEvents from "../components/UpcomingEvents";
// import { categorizeEvent } from "../lib/categorizeEvent";

// export const revalidate = 60;

// export const metadata = {
//   title: "Events - Shabuj Global",
//   description: "Explore all ongoing and upcoming events organized by Shabuj Global for students planning to study abroad.",
//   keywords: "Shabuj Global, study abroad, events, student programs, workshops, seminars",
//   authors: [{ name: "Shabuj Global", url: "https://s-global.vercel.app/" }],
//   robots: "index, follow",
//   openGraph: {
//     title: "Events - Shabuj Global",
//     description: "Stay updated with all ongoing and upcoming events for students planning to study abroad.",
//     url: "https://s-global.vercel.app/events",
//     siteName: "Shabuj Global",
//     images: [
//       {
//         url: "https://s-global.vercel.app/og-events.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Shabuj Global Events",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Events - Shabuj Global",
//     description: "Stay updated with all ongoing and upcoming events for students planning to study abroad.",
//     site: "@ShabujTwitterHandle",
//     creator: "@ShabujTwitterHandle",
//     images: ["https://s-global.vercel.app/og-events.jpg"],
//   },
// };

// const EVENTS_PER_PAGE = 6;

// export default async function EventsPage(props) {

//     const searchParams = await props.searchParams;
//   //Fetch events from MongoDB
//   const client = await clientPromise;
//   const db = client.db("SGlobalDB");
//   const events = await db.collection("events").find({}).sort({ date: 1 }).toArray();
//     const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

//     const pastEvents = events.filter(event => categorizeEvent(event, userTimeZone) === "past");
  
//     if (!pastEvents.length) return <div className="text-center py-10 text-gray-500">No past events.</div>;


//   const page = parseInt(searchParams?.page || "1", 10);
//   const totalEvents = pastEvents.length;
//   const totalPages = Math.ceil(totalEvents / EVENTS_PER_PAGE);

//   const startIdx = (page - 1) * EVENTS_PER_PAGE;
//   const endIdx = startIdx + EVENTS_PER_PAGE;
//   const currentEvents = pastEvents.slice(startIdx, endIdx);

//   return (

//     <div className="">
//       <div className="max-w-7xl mx-auto px-4 pb-30">

//         <OngoingEvents></OngoingEvents>

//         <UpcomingEvents></UpcomingEvents>

//         <h2 className="text-5xl font-bold mb-6 text-center ">Past Events</h2>
//          <div className="w-full md:w-7/12 mx-auto">
//           <p className="text-center">Our core belief is to ensure that our students receive comprehensive education and guidance at every stage of their study abroad journey.</p>
//          </div>


//          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-20">
//            {currentEvents.map(event => (
//              <EventCard key={event._id.toString()} event={event} showViewDetailsButton={true} />
//            ))}
//          </div>

//          <div className="flex mx-auto justify-center mt-10 gap-1">
          
//           <Link
//              href={`?page=${page > 1 ? page - 1 : 1}`}
//             className={`join-item btn ${page === 1 ? "btn-disabled" : ""}`}
//            >
//            Previous
//            </Link>

          
//            <div className="join">
//              {Array.from({ length: totalPages }).map((_, idx) => {
//                const pageNum = idx + 1;
//                return (
//                  <Link
//                    key={pageNum}
//                    href={`?page=${pageNum}`}
//                    className={`join-item btn ${page === pageNum ? "btn-active" : ""}`}
//                  >
//                    {pageNum}
//                  </Link>
//                );
//              })}
//            </div>

          
//            <Link
//              href={`?page=${page < totalPages ? page + 1 : totalPages}`}
//              className={`join-item btn ${page === totalPages ? "btn-disabled" : ""}`}
//            >
//              Next
//            </Link>
//        </div> 


//       </div>
//     </div>
//   );
// }


// placeholder="blur"
// blurDataURL="/placeholder.svg"

