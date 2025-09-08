
// import Image from "next/image";
// import Link from "next/link";
// import { FaCalendarAlt, FaClock } from "react-icons/fa";

// export default function EventCard({ event, showViewDetailsButton = true }) {


//   return (
//     <div className="rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl fade-in">
//       <div className="relative h-48 w-full">
//         <Image src={event.bannerURL} alt={event.title} fill className="object-cover w-full h-full" />
//       </div>

//       <div className="p-4 flex flex-col justify-between h-55">
//         <div>
//           <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
//           <p className="text-sm  mb-1 flex items-center gap-2">
//             <FaCalendarAlt className="text-sky-500" />
//             {new Date(event.startTime).toLocaleDateString()} {new Date(event.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {new Date(event.endTime).toLocaleDateString()} {new Date(event.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//           </p>
//           <p className="text-sm line-clamp-2">{event.description}</p>
//         </div>

//         {showViewDetailsButton && (
//           <Link
//             href={`/events/${event._id}`}
//             className="mt-1 btn btn-sm bg-sky-500 text-white rounded-full hover:bg-sky-600 text-center transition"
//           >
//             View Details
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }


import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt } from "react-icons/fa";

export default function EventCard({ event, showViewDetailsButton = true }) {
  const start = new Date(event.startTime);
  const end = new Date(event.endTime);

  // Force consistent formatting (e.g., en-GB: DD/MM/YYYY)
  const formatDate = (date) =>
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const formatTime = (date) =>
    date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // 24-hour format
    });

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl fade-in">
      <div className="relative h-48 w-full">
        <Image
          src={event.bannerURL}
          alt={event.title}
          fill
          className="object-cover w-full h-full"
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-55">
        <div>
          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
          <p className="text-sm mb-1 flex items-center gap-2">
            <FaCalendarAlt className="text-sky-500" />
            {formatDate(start)} {formatTime(start)} - {formatDate(end)}{" "}
            {formatTime(end)}
          </p>
          <p className="text-sm line-clamp-2">{event.description}</p>
        </div>

        {showViewDetailsButton && (
          <Link
            href={`/events/${event._id}`}
            className="mt-1 btn btn-sm bg-sky-500 text-white rounded-full hover:bg-sky-600 text-center transition"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}

