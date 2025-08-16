import clientPromise from "@/app/lib/db";
import { ObjectId } from "mongodb";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";

export const revalidate = 3600; // ISR: revalidate every 60 seconds

// Pre-generate all event pages at build time
export async function generateStaticParams() {
  const client = await clientPromise;
  const db = client.db("SGlobalDB");

  const events = await db.collection("events").find({}, { projection: { _id: 1 } }).toArray();

  return events.map(event => ({
    id: event._id.toString(),
  }));
}

// Event details page
export default async function EventDetailsPage({ params }) {
  const { id } = await params;

  const client = await clientPromise;
  const db = client.db("SGlobalDB");

  const event = await db.collection("events").findOne({ _id: new ObjectId(id) });

  if (!event) {
    return <div className="text-center py-20">Event not found.</div>;
  }

  return (
    <div className="bg-gradient-to-b from-sky-300 to-base-100">
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-30">

        <div className="flex flex-col md:flex-row gap-10">

          <div className="w-full md:w-1/2">
            {/* Title & Basic Info */}
            <h1 className="text-4xl font-bold mt-6">{event.title}</h1>

            <p className="my-2 flex items-center gap-2">
              <FaCalendarAlt className="text-sky-500" />
              {new Date(event.startTime).toLocaleDateString()} {new Date(event.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {new Date(event.endTime).toLocaleDateString()} {new Date(event.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>


            <p className="text-gray-500 mb-4">{event.location}</p>

            {/* Description */}
            <p className="mb-6">{event.description}</p>

            {/* Why Attend */}
            {event.whyAttend?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Why Attend?</h2>
                <ul className="list-disc ml-5 text-gray-700">
                  {event.whyAttend.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Partner Universities */}
            {event.topPartnerUniversities?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Top Partner Universities</h2>
                <ul className="list-disc ml-5 text-gray-700">
                  {event.topPartnerUniversities.map((uni, idx) => (
                    <li key={idx}>{uni}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact */}
            {event.contactNumber && (
              <p className="text-gray-700">
                <strong>Contact:</strong> {event.contactNumber}
              </p>
            )}
          </div>


          <div className="w-full md:w-1/2">
            {/* Banner */}
            <div className="relative w-full h-64 md:h-96">
              <img
                src={event.bannerURL}
                alt={event.title}
              />
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}


//          fill
//          className="object-cover rounded-lg"
//          priority