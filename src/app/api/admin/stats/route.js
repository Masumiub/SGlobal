import clientPromise from "@/app/lib/db";
import { adminAuth } from "@/app/middlewares/adminAuth";

export async function GET() {


      const auth = await adminAuth();
    
      if (!auth.authorized) {
        return NextResponse.json(
          { error: auth.message },
          { status: 403 }
        );
      }
    


  try {
    const client = await clientPromise;
    const db = client.db("SGlobalDB");

    const events = await db.collection("events").find({}).sort({ startTime: 1 }).toArray();
    const totalUsers = await db.collection("users").countDocuments();

    return Response.json({
      events,
      totalUsers,
    });
  } catch (e) {
    return Response.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
