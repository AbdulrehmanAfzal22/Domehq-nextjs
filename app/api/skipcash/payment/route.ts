import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

function createSkipCashSignature(payment: any, secretKey: string): string {
  // According to SkipCash docs: "Combine all not empty request fields into key=value comma-separated values"
  // Build the string with ONLY non-empty fields in key=value format
  const fields: string[] = [];
  
  // Add fields in the correct order, but ONLY if they're not empty
  if (payment.Uid) fields.push(`Uid=${payment.Uid}`);
  if (payment.KeyId) fields.push(`KeyId=${payment.KeyId}`);
  if (payment.Amount) fields.push(`Amount=${payment.Amount}`);
  if (payment.FirstName) fields.push(`FirstName=${payment.FirstName}`);
  if (payment.LastName) fields.push(`LastName=${payment.LastName}`);
  if (payment.Phone) fields.push(`Phone=${payment.Phone}`);
  if (payment.Email) fields.push(`Email=${payment.Email}`);
  if (payment.Street) fields.push(`Street=${payment.Street}`);
  if (payment.City) fields.push(`City=${payment.City}`);
  if (payment.State) fields.push(`State=${payment.State}`);
  if (payment.Country) fields.push(`Country=${payment.Country}`);
  if (payment.PostalCode) fields.push(`PostalCode=${payment.PostalCode}`);
  if (payment.TransactionId) fields.push(`TransactionId=${payment.TransactionId}`);
  if (payment.Custom1) fields.push(`Custom1=${payment.Custom1}`);
  
  const combinedData = fields.join(',');
  
  console.log("📝 Combined Data:", combinedData);

  // Decode the base64 secret key
  const keyBuffer = Buffer.from(secretKey, 'base64');
  
  const signature = crypto
    .createHmac("sha256", keyBuffer)
    .update(combinedData, "utf8")
    .digest("base64");

  console.log("🔐 Signature:", signature);
  
  return signature;
}

export async function POST(req: Request) {
  try {
    console.log("\n=== 🚀 SkipCash Payment API ===");

    const body = await req.json();
    const { first, last, phone, email, plan } = body;

    if (!first || !last || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const uid = uuidv4();
    const transactionId = Date.now().toString();

    const paymentDetails = {
      Uid: uid,
      KeyId: process.env.SKIPCASH_KEY_ID,
      Amount: "2499",
      FirstName: first,
      LastName: last,
      Phone: phone || "",
      Email: email,
      Street: "", // Empty fields will be excluded from signature
      City: "",
      State: "",
      Country: "",
      PostalCode: "",
      TransactionId: transactionId,
      Custom1: plan || "",
    };

    console.log("📤 Payment Details:", JSON.stringify(paymentDetails, null, 2));

    const signature = createSkipCashSignature(
      paymentDetails,
      process.env.SKIPCASH_SECRET_KEY as string
    );

    const url = `${process.env.SKIPCASH_URL}/api/v1/payments`;
    console.log("🌐 Calling:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: signature,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentDetails),
    });

    const data = await response.json();

    console.log("📨 Response Status:", response.status);
    console.log("📨 Response Data:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      console.error("❌ SkipCash rejected request");
      return NextResponse.json(
        {
          error: data.errorMessage || data.error?.message || "Payment failed",
          details: data,
        },
        { status: response.status }
      );
    }

    console.log("✅ SUCCESS! Payment URL:", data?.resultObj?.payUrl);

    return NextResponse.json(
      {
        uid,
        payUrl: data?.resultObj?.payUrl,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}