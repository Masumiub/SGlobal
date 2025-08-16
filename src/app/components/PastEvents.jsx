import clientPromise from "../lib/db";
import { categorizeEvent } from "../lib/categorizeEvent";
import EventCard from "./EventCard";


export const revalidate = 60;

export default async function PastEvents() {
  const client = await clientPromise;
  const db = client.db("SGlobalDB");

  const events = await db.collection("events").find({}).sort({ startTime: -1 }).toArray();
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const pastEvents = events.filter(event => categorizeEvent(event, userTimeZone) === "past");

  if (!pastEvents.length) return <div className="text-center py-10 text-gray-500">No past events.</div>;

  return (
    <div className="my-40">
      <h2 className="text-5xl font-bold mb-6 text-center ">Past Events</h2>

      <div className="w-full md:w-7/12 mx-auto">
        <p className="text-center">Our core belief is to ensure that our students receive comprehensive education and guidance at every stage of their study abroad journey.</p>
      </div>


      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10">

        {pastEvents.map(event => (
          <EventCard key={event._id.toString()} event={event} showViewDetailsButton={true} />
        ))}

        {/* {pastEvents.map(event => (
          <div key={event._id.toString()} className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl fade-in">
            <div className="relative h-48 w-full">
              <img src={event.bannerURL} alt={event.title} className="object-cover w-full h-full" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                {new Date(event.startTime).toLocaleDateString()} | {new Date(event.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {new Date(event.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
              <p className="text-gray-700 line-clamp-3">{event.description}</p>
            </div>
          </div>
        ))} */}
      </div>


    </div>
  );
}
