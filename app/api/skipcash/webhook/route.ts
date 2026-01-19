import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();
  
  // TODO: (optional) verify signature here for security
  // TODO: store transaction in DB if required
  
  return NextResponse.json({ received: true });
}
