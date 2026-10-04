import { NextResponse } from "next/server";
const required = ["name", "phone", "city", "message", "consent"];
const limits: Record<string, number> = {
  name: 100,
  phone: 20,
  email: 160,
  company: 120,
  city: 100,
  product: 120,
  spaceType: 120,
  message: 3000,
  consent: 10,
  website: 200,
};
export async function POST(request: Request) {
  const endpoint = process.env.ENQUIRY_ENDPOINT;
  if (!endpoint)
    return NextResponse.json(
      {
        error:
          "Online enquiries are not configured. Please contact us through WhatsApp or phone.",
      },
      { status: 503 },
    );
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return NextResponse.json(
      { error: "Invalid enquiry origin." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json(
      { error: "Please submit a valid enquiry." },
      { status: 415 },
    );
  try {
    const text = await request.text();
    if (text.length > 12000)
      return NextResponse.json(
        { error: "Your enquiry is too long." },
        { status: 413 },
      );
    const raw = JSON.parse(text);
    if (!raw || typeof raw !== "object" || Array.isArray(raw))
      throw new Error("invalid");
    const values: Record<string, string> = {};
    for (const [key, max] of Object.entries(limits)) {
      if (raw[key] !== undefined && typeof raw[key] !== "string")
        throw new Error("invalid");
      values[key] = (raw[key] || "").trim();
      if (values[key].length > max) throw new Error("invalid");
    }
    if (
      values.website ||
      required.some((k) => !values[k]) ||
      values.name.length < 2 ||
      values.message.length < 10 ||
      !/^[+0-9 ()-]{7,20}$/.test(values.phone) ||
      !["on", "true"].includes(values.consent) ||
      (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    )
      return NextResponse.json(
        { error: "Please check your name, phone, city, message and consent." },
        { status: 400 },
      );
    const destination = new URL(endpoint);
    if (destination.protocol !== "https:")
      return NextResponse.json(
        {
          error:
            "Online enquiries are unavailable. Please use WhatsApp or call us.",
        },
        { status: 503 },
      );
    const response = await fetch(destination, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ENQUIRY_API_TOKEN
          ? { Authorization: `Bearer ${process.env.ENQUIRY_API_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        name: values.name,
        phone: values.phone,
        email: values.email,
        company: values.company,
        city: values.city,
        product: values.product,
        spaceType: values.spaceType,
        message: values.message,
        consent: true,
        source: "Aroma Airs website",
      }),
      signal: AbortSignal.timeout(10000),
      redirect: "error",
      cache: "no-store",
    });
    if (!response.ok)
      return NextResponse.json(
        {
          error:
            "We couldn’t send your enquiry. Please try WhatsApp or call us.",
        },
        { status: 502 },
      );
    return NextResponse.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      {
        error:
          "Unable to send this enquiry. Please check your details or contact us on WhatsApp.",
      },
      { status: 400 },
    );
  }
}
