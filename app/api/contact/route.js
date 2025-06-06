import { NextResponse } from "next/server";
import connectDB from "../../../utils/database";
import Contact from "../../../models/contact";



export async function POST(request) {
  try {
    await connectDB(); 

    const body = await request.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ success: false, error: 'Fill all the fields' }, { status: 400 });
    }

    console.log("Received:", body);

 
    const newContact = new Contact(body);
    await newContact.save();

    return NextResponse.json({ success: true, message: "Message sent successfully!" }, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
