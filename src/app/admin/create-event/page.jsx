// 'use client';
// import React, { useState } from 'react';

// export default function CreateEventPage() {
//     const [formData, setFormData] = useState({
//         title: '',
//         location: '',
//         date: '',
//         startTime: '',
//         endTime: '',
//         description: '',
//         whyAttend: '',
//         topPartnerUniversities: '',
//         contactNumber: '',
//         bannerURL: '',
//     });

//     const handleChange = e => {
//         setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const toISOStringSafe = (value) => {
//         if (!value) return null;
//         const d = new Date(value);
//         return isNaN(d.getTime()) ? null : d.toISOString();
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const body = {
//             ...formData,
//             whyAttend: formData.whyAttend.split(',').map(s => s.trim()),
//             topPartnerUniversities: formData.topPartnerUniversities.split(',').map(s => s.trim()),
//             // Convert all fields to ISO
//             date: toISOStringSafe(formData.date),
//             startTime: toISOStringSafe(formData.startTime),
//             endTime: toISOStringSafe(formData.endTime),
//         };

//         const res = await fetch('/api/admin/create-event', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(body),
//         });

//         if (res.ok) {
//             alert('Event created successfully!');
//             setFormData({
//                 title: '',
//                 location: '',
//                 date: '',
//                 startTime: '',
//                 endTime: '',
//                 description: '',
//                 whyAttend: '',
//                 topPartnerUniversities: '',
//                 contactNumber: '',
//                 bannerURL: '',
//             });
//         } else {
//             const error = await res.json();
//             alert(`Error: ${error.error}`);
//         }
//     };



//     return (
//         <div>
//             <h1 className="text-2xl font-bold mb-6">Create Event</h1>
//             <form className="space-y-4 max-w-2xl" onSubmit={handleSubmit}>
//                 <div>
//                     <label className="block mb-1 font-medium">Title</label>
//                     <input
//                         name="title"
//                         type="text"
//                         value={formData.title}
//                         onChange={handleChange}
//                         className="w-full p-2 input rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium">Location</label>
//                     <input
//                         name="location"
//                         type="text"
//                         value={formData.location}
//                         onChange={handleChange}
//                         className="w-full p-2 input rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium">Date</label>
//                     <input
//                         name="date"
//                         type="datetime-local"
//                         value={formData.date}
//                         onChange={handleChange}
//                         className="w-full p-2 input rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium">Start Time</label>
//                     <input
//                         name="startTime"
//                         type="datetime-local"
//                         value={formData.startTime}
//                         onChange={handleChange}
//                         className="w-full p-2 input rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium">End Time</label>
//                     <input
//                         name="endTime"
//                         type="datetime-local"
//                         value={formData.endTime}
//                         onChange={handleChange}
//                         className="w-full p-2 input rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium">Description</label>
//                     <input
//                         name="description"
//                         type="text"
//                         value={formData.description}
//                         onChange={handleChange}
//                         className="w-full p-2 input rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium">Contact Number</label>
//                     <input
//                         name="contactNumber"
//                         type="text"
//                         value={formData.contactNumber}
//                         onChange={handleChange}
//                         className="w-full p-2 input rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium">Banner URL</label>
//                     <input
//                         name="bannerURL"
//                         type="text"
//                         value={formData.bannerURL}
//                         onChange={handleChange}
//                         className="w-full p-2 input rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium">Why Attend? (comma separated)</label>
//                     <input
//                         name="whyAttend"
//                         type="text"
//                         value={formData.whyAttend}
//                         onChange={handleChange}
//                         className="w-full p-2 input rounded"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 font-medium">Top Partner Universities (comma separated)</label>
//                     <input
//                         name="topPartnerUniversities"
//                         type="text"
//                         value={formData.topPartnerUniversities}
//                         onChange={handleChange}
//                         className="w-full p-2 input rounded"
//                     />
//                 </div>

//                 <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
//                     Create Event
//                 </button>
//             </form>
//         </div>
//     );
// }


'use client';
import React, { useState } from 'react';

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    whyAttend: '',
    topPartnerUniversities: '',
    contactNumber: '',
    bannerURL: '',
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // upload to imgbb
  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formDataImg = new FormData();
    formDataImg.append('image', file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_imgBB_key}`,
        {
          method: 'POST',
          body: formDataImg,
        }
      );

      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, bannerURL: data.data.url }));
      } else {
        alert('Image upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Image upload error');
    } finally {
      setUploading(false);
    }
  };

  const toISOStringSafe = (value) => {
    if (!value) return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d.toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      ...formData,
      whyAttend: formData.whyAttend.split(',').map((s) => s.trim()),
      topPartnerUniversities: formData.topPartnerUniversities
        .split(',')
        .map((s) => s.trim()),
      date: toISOStringSafe(formData.date),
      startTime: toISOStringSafe(formData.startTime),
      endTime: toISOStringSafe(formData.endTime),
    };

    const res = await fetch('/api/admin/create-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      alert('Event created successfully!');
      setFormData({
        title: '',
        location: '',
        date: '',
        startTime: '',
        endTime: '',
        description: '',
        whyAttend: '',
        topPartnerUniversities: '',
        contactNumber: '',
        bannerURL: '',
      });
    } else {
      const error = await res.json();
      alert(`Error: ${error.error}`);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create Event</h1>
      <form className="space-y-4 max-w-2xl" onSubmit={handleSubmit}>
        {/* title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 input rounded"
          />
        </div>

        {/* location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 input rounded"
          />
        </div>

        {/* date */}
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            name="date"
            type="datetime-local"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 input rounded"
          />
        </div>

        {/* start time */}
        <div>
          <label className="block mb-1 font-medium">Start Time</label>
          <input
            name="startTime"
            type="datetime-local"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full p-2 input rounded"
          />
        </div>

        {/* end time */}
        <div>
          <label className="block mb-1 font-medium">End Time</label>
          <input
            name="endTime"
            type="datetime-local"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full p-2 input rounded"
          />
        </div>

        {/* description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <input
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 input rounded"
          />
        </div>

        {/* contact */}
        <div>
          <label className="block mb-1 font-medium">Contact Number</label>
          <input
            name="contactNumber"
            type="text"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full p-2 input rounded"
          />
        </div>

        {/* banner upload */}
        <div>
          <label className="block mb-1 font-medium">Banner</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerUpload}
            className="w-full p-2 input rounded"
          />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {formData.bannerURL && (
            <img
              src={formData.bannerURL}
              alt="Banner Preview"
              className="mt-2 w-48 rounded"
            />
          )}
        </div>

        {/* why attend */}
        <div>
          <label className="block mb-1 font-medium">
            Why Attend? (comma separated)
          </label>
          <input
            name="whyAttend"
            type="text"
            value={formData.whyAttend}
            onChange={handleChange}
            className="w-full p-2 input rounded"
          />
        </div>

        {/* top partner */}
        <div>
          <label className="block mb-1 font-medium">
            Top Partner Universities (comma separated)
          </label>
          <input
            name="topPartnerUniversities"
            type="text"
            value={formData.topPartnerUniversities}
            onChange={handleChange}
            className="w-full p-2 input rounded"
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {uploading ? 'Uploading...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}
