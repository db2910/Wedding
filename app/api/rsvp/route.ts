import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const formId = process.env.FORMSPREE_ID;
    if (!formId) {
      return NextResponse.json({ error: "Formspree ID not configured." }, { status: 500 });
    }

    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Name: body.name,
        Email: body.email || "Not provided",
        Phone: body.phone || "Not provided",
        "Number of Guests": body.guests,
        Message: body.message || "No message",
        _subject: `💌 New RSVP from ${body.name} (${body.guests} guest${body.guests > 1 ? "s" : ""})`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Formspree error:", data);
      return NextResponse.json({ error: "Submission failed." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP API error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
