import clientPromise from "../lib/db";
import { categorizeEvent } from "../lib/categorizeEvent";
import EventCard from "./EventCard";
import Link from "next/link";


export const revalidate = 60;

const EVENTS_PER_PAGE = 6;

export default async function PastEvents({ searchParams }) {
  const client = await clientPromise;
  const db = client.db("SGlobalDB");

  const page = parseInt(searchParams?.page || "1", 10);

  const events = await db.collection("events").find({}).sort({ startTime: -1 }).toArray();
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const pastEvents = events.filter(event => categorizeEvent(event, userTimeZone) === "past");

  if (!pastEvents.length) return <div className="text-center py-10 text-gray-500">No past events.</div>;


  const totalEvents = pastEvents.length;
  const totalPages = Math.ceil(totalEvents / EVENTS_PER_PAGE);

  const startIdx = (page - 1) * EVENTS_PER_PAGE;
  const endIdx = startIdx + EVENTS_PER_PAGE;
  const currentEvents = pastEvents.slice(startIdx, endIdx);


  return (
    <div className="my-40">
      <h2 className="text-5xl font-bold mb-6 text-center ">Past Events</h2>

      <div className="w-full md:w-7/12 mx-auto">
        <p className="text-center">Our core belief is to ensure that our students receive comprehensive education and guidance at every stage of their study abroad journey.</p>
      </div>


      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10">

        {currentEvents.map(event => (
          <EventCard key={event._id.toString()} event={event} showViewDetailsButton={true} />
        ))}

      </div>

<div className="flex mx-auto justify-center mt-10 gap-1">
        {/* Prev Button */}
        <Link
          href={`?page=${page > 1 ? page - 1 : 1}`}
          className={`join-item btn ${page === 1 ? "btn-disabled" : ""}`}
        >
          Previous
        </Link>

        {/* Page Numbers */}
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

        {/* Next Button */}
        <Link
          href={`?page=${page < totalPages ? page + 1 : totalPages}`}
          className={`join-item btn ${page === totalPages ? "btn-disabled" : ""}`}
        >
          Next
        </Link>
      </div>

    </div>
  );
}
