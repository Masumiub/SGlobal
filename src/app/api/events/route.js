// import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/db';

// export async function GET() {
//   const client = await clientPromise;
//   const db = client.db('eventDB');
//   const events = await db.collection('events').find().toArray();
//   return NextResponse.json(events);
// }

// export async function POST(req) {
//   const data = await req.json();
//   const client = await clientPromise;
//   const db = client.db('eventDB');
//   const result = await db.collection('events').insertOne(data);
//   return NextResponse.json({ insertedId: result.insertedId });
// }
