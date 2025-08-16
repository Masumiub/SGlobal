"use client";

import { useState } from "react";

export default function EventsTable({ events }) {
    const [data, setData] = useState(events);
    const [selectedEvent, setSelectedEvent] = useState(null);


    const formatDate = (isoString) => {
        if (!isoString) return "-";
        const date = new Date(isoString);
        return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };


    const toLocalDatetimeValue = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };


    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this event?")) return;
        const res = await fetch("/api/admin/events", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        if (res.ok) {
            setData(prev => prev.filter(e => e._id !== id));
            alert("Event deleted successfully!");
        } else {
            alert("Failed to delete event.");
        }
    };

    const handleEdit = async () => {
        if (!selectedEvent?._id) return alert("No event selected");

        // Prepare payload
        const { _id, ...updates } = selectedEvent;

        const payload = {
            id: _id,
            ...updates,
            date: updates.date ? new Date(updates.date).toISOString() : null,
            startTime: updates.startTime ? new Date(updates.startTime).toISOString() : null,
            endTime: updates.endTime ? new Date(updates.endTime).toISOString() : null,
        };

        try {
            const res = await fetch("/api/admin/events", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                // Update local state without reload
                setData(prev =>
                    prev.map(e => (e._id === _id ? { ...e, ...updates } : e))
                );
                alert("Event updated successfully!");
                document.getElementById("edit_modal").close();
            } else {
                const err = await res.json();
                alert("Error updating event: " + err.error);
            }
        } catch (err) {
            alert("Network error: " + err.message);
        }
    };




    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event._id}>
                            <td>{event.title}</td>
                            <td>{event.location}</td>
                           
                            <td>{formatDate(event.startTime)}</td>
                            <td>{formatDate(event.endTime)}</td>
                            <td>
                                <button
                                    className="btn btn-xs rounded-full btn-primary mr-2 "
                                    onClick={() => {
                                        setSelectedEvent(event);
                                        document.getElementById("edit_modal").showModal();
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-xs rounded-full  btn-error text-white"
                                    onClick={() => handleDelete(event._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            <dialog id="edit_modal" className="modal">
                <div className="modal-box max-w-2xl">
                    <h3 className="font-bold text-lg">Edit Event</h3>

                    {selectedEvent && (
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            {/* Title */}
                            <input
                                type="text"
                                placeholder="Title"
                                className="input input-bordered w-full"
                                value={selectedEvent.title || ""}
                                onChange={(e) =>
                                    setSelectedEvent({ ...selectedEvent, title: e.target.value })
                                }
                            />

                            {/* Location */}
                            <input
                                type="text"
                                placeholder="Location"
                                className="input input-bordered w-full"
                                value={selectedEvent.location || ""}
                                onChange={(e) =>
                                    setSelectedEvent({ ...selectedEvent, location: e.target.value })
                                }
                            />

                            {/* Date */}
                            <input
                                type="datetime-local"
                                value={toLocalDatetimeValue(selectedEvent.date)}
                                onChange={(e) =>
                                    setSelectedEvent({
                                        ...selectedEvent,
                                        date: e.target.value,
                                    })
                                }
                                className="w-full p-2 input rounded"
                            />

                            <input
                                type="datetime-local"
                                value={toLocalDatetimeValue(selectedEvent.startTime)}
                                onChange={(e) =>
                                    setSelectedEvent({
                                        ...selectedEvent,
                                        startTime: e.target.value,
                                    })
                                }
                                className="w-full p-2 input rounded"
                            />

                            <input
                                type="datetime-local"
                                value={toLocalDatetimeValue(selectedEvent.endTime)}
                                onChange={(e) =>
                                    setSelectedEvent({
                                        ...selectedEvent,
                                        endTime: e.target.value,
                                    })
                                }
                                className="w-full p-2 input rounded"
                            />


                            {/* Description */}
                            <textarea
                                placeholder="Description"
                                className="textarea textarea-bordered w-full"
                                value={selectedEvent.description || ""}
                                onChange={(e) =>
                                    setSelectedEvent({ ...selectedEvent, description: e.target.value })
                                }
                            ></textarea>

                            {/* Why Attend */}
                            <textarea
                                placeholder="Why Attend (comma separated)"
                                className="textarea textarea-bordered w-full"
                                value={selectedEvent.whyAttend?.join(", ") || ""}
                                onChange={(e) =>
                                    setSelectedEvent({
                                        ...selectedEvent,
                                        whyAttend: e.target.value.split(",").map((s) => s.trim()),
                                    })
                                }
                            ></textarea>

                            {/* Top Partner Universities */}
                            <textarea
                                placeholder="Top Partner Universities (comma separated)"
                                className="textarea textarea-bordered w-full"
                                value={selectedEvent.topPartnerUniversities?.join(", ") || ""}
                                onChange={(e) =>
                                    setSelectedEvent({
                                        ...selectedEvent,
                                        topPartnerUniversities: e.target.value
                                            .split(",")
                                            .map((s) => s.trim()),
                                    })
                                }
                            ></textarea>

                            {/* Contact Number */}
                            <input
                                type="text"
                                placeholder="Contact Number"
                                className="input input-bordered w-full"
                                value={selectedEvent.contactNumber || ""}
                                onChange={(e) =>
                                    setSelectedEvent({ ...selectedEvent, contactNumber: e.target.value })
                                }
                            />

                            {/* Banner URL */}
                            <input
                                type="text"
                                placeholder="Banner URL"
                                className="input input-bordered w-full"
                                value={selectedEvent.bannerURL || ""}
                                onChange={(e) =>
                                    setSelectedEvent({ ...selectedEvent, bannerURL: e.target.value })
                                }
                            />
                        </form>
                    )}

                    <div className="modal-action">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleEdit}
                        >
                            Save
                        </button>
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>

                    </div>
                </div>
            </dialog>


        </div>
    );
}
