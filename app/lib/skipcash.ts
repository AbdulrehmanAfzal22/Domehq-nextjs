import crypto from "crypto";

export function createSkipCashSignature(
  payload: Record<string, any>,
  secretKey: string
): string {
  // Remove any fields that shouldn't be in the signature
  const signaturePayload = { ...payload };
  delete signaturePayload.WebhookUrl;
  delete signaturePayload.ReturnUrl;
  
  // Sort keys alphabetically
  const sortedKeys = Object.keys(signaturePayload).sort();
  
  // Create query string format: key1=value1&key2=value2
  const dataString = sortedKeys
    .map((key) => `${key}=${signaturePayload[key]}`)
    .join("&");
  
  // Generate HMAC-SHA256 signature
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(dataString)
    .digest("base64"); // Try base64 instead of hex
  
  return signature;
}