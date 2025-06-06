import connectDB from "../../../utils/database";
import Contact from "../../../models/contact";

import { NextResponse } from "next/server";


export async function GET(){

    await connectDB()
    const contacts = await Contact.find().sort({createdAt: -1})

    return NextResponse.json({contacts})
}