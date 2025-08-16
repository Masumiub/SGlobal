
import clientPromise from "@/app/lib/db";
import { adminAuth } from "@/app/middlewares/adminAuth";
import { ObjectId } from "mongodb";



export async function PATCH(req) {

  const auth = await adminAuth();

  if (!auth.authorized) {
    return NextResponse.json(
      { error: auth.message },
      { status: 403 }
    );
  }


  try {
    const { id, ...updates } = await req.json();

    const client = await clientPromise;
    const db = client.db("SGlobalDB");

    // Convert datetime-local strings to Date objects
    if (updates.date) updates.date = new Date(updates.date).toISOString();
    if (updates.startTime) updates.startTime = new Date(updates.startTime).toISOString();
    if (updates.endTime) updates.endTime = new Date(updates.endTime).toISOString();

    // Remove _id if present (just in case)
    if (updates._id) delete updates._id;

    await db.collection("events").updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}


export async function DELETE(req) {

  const auth = await adminAuth();

  if (!auth.authorized) {
    return NextResponse.json(
      { error: auth.message },
      { status: 403 }
    );
  }



  try {
    const { id } = await req.json();
    const client = await clientPromise;
    const db = client.db("SGlobalDB");

    await db.collection("events").deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
