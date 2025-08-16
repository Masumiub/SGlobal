

import clientPromise from "../lib/db";
import { categorizeEvent } from "../lib/categorizeEvent";
import Link from "next/link";
import NoEvents from "./NoEvents";
import { FaCalendarAlt } from "react-icons/fa";
import EventCard from "./EventCard";




export const revalidate = 60;

export default async function UpcomingEvents() {
  const client = await clientPromise;
  const db = client.db("SGlobalDB");

  const events = await db.collection("events").find({}).sort({ startTime: 1 }).toArray();
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const upcomingEvents = events.filter(event => categorizeEvent(event, userTimeZone) === "upcoming");

  if (!upcomingEvents.length) return <NoEvents></NoEvents>;

  //const limitedEvents = upcomingEvents.slice(0, 8);

  const limitedEvents = upcomingEvents.slice(0, 8).map(event => ({
    ...event,
    _id: event._id.toString(), // ObjectId → string
    startTime: event.startTime ? new Date(event.startTime).toISOString() : null,
    endTime: event.endTime ? new Date(event.endTime).toISOString() : null,
    date: event.date ? new Date(event.date).toISOString() : null,
    createdAt: event.createdAt ? new Date(event.createdAt).toISOString() : null,
  }));

  return (
    <div className="my-30">
      <h2 className="text-5xl font-bold mb-6 text-center text-blue-800">Upcoming Events</h2>
      <div className="w-full md:w-7/12 mx-auto">
        <p className="text-center">Our core belief is to ensure that our students receive comprehensive education and guidance at every stage of their study abroad journey.</p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10">
        {limitedEvents.map(event => (
          <EventCard key={event._id.toString()} event={event} />
        ))}

      </div>



      {/* <div className="text-center mt-8">
        <Link href="/events" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
          Load More
        </Link>
      </div> */}


    </div>
  );
}
