import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");

  const res = await fetch(
    `${process.env.SKIPCASH_URL}/api/v1/payments/${uid}?keyId=${process.env.SKIPCASH_KEY_ID}`
  );

  const data = await res.json();
  return NextResponse.json({ status: data?.resultObj?.status });
}
