import { NextResponse } from "next/server";

import connectDB from "../../../../utils/database";
import Contact from "../../../../models/contact";

export async function DELETE(req, {params}){
await connectDB()
const {id} =  params


try {
    await 
    Contact.findByIdAndDelete(id)
    return NextResponse.json({success: true})
} catch (err) {
    return NextResponse.json({success: false , error: err.message}, {status: 500})
}
}