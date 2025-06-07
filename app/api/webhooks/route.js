// import { createOrUpdateUser } from '../../../utils/actions/User'
// import { verifyWebhook } from '@clerk/nextjs/webhooks'
// import { NextRequest } from 'next/server'

// export async function POST(req) {
//   try {
//     const evt = await verifyWebhook({
//       req,
//       secret: process.env.WEBHOOK_SECRET, // ✅ Ensure this matches your .env
//     });

//     const { id } = evt?.data;
//     const eventType = evt?.type;
//     console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
//     console.log('Webhook payload:', evt?.data);

//     if (eventType === 'user.created' || eventType === 'user.updated') {
//       const { id, email, first_name, last_name, username, image_url } = evt?.data;

//       try {
//         await createOrUpdateUser(id, first_name, last_name, email, username, image_url);

//         return new Response('User created or updated', {
//           status: 200,
//         });
//       } catch (error) {
//         console.error('Error creating or updating user', error);
//         return new Response('Error occurred', {
//           status: 400,
//         });
//       }
//     }

//     if (eventType === 'user.deleted') {
//       const { id } = evt?.data;

//       try {
//         await deleteUser(id); // Make sure deleteUser is imported
//         return new Response('User deleted', {
//           status: 200,
//         });
//       } catch (error) {
//         console.error('Error deleting user', error);
//         return new Response('Error deleting user', {
//           status: 400,
//         });
//       }
//     }

//     return new Response('Webhook received', { status: 200 });
//   } catch (err) {
//     console.error('Error verifying webhook:', err);
//     return new Response('Error verifying webhook', { status: 400 });
//   }
// }


import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createOrUpdateUser , deleteUser } from "../../../utils/actions/User";


export async function POST(req) {

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
if (!WEBHOOK_SECRET) {
  throw new Error(
    "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
  );
}

const headerPayload = headers();
const svix_id = headerPayload.get("svix-id");
const svix_timestamp = headerPayload.get("svix-timestamp");
const svix_signature = headerPayload.get("svix-signature");

if (!svix_id || !svix_timestamp || !svix_signature) {
  return new NextResponse("Error occured -- no svix headers", { status: 400 });
}

const payload = await req.json();
const body = JSON.stringify(payload);

const wh = new Webhook(WEBHOOK_SECRET);

let evt;

try {
  evt = wh.verify(body, {

    "svix-id": svix_id,
    "svix-timestamp": svix_timestamp,
    "svix-signature": svix_signature,

  }) 
} catch (error) {
  console.log("Error verifying webhook:", error);
  return new Response("Error verifying webhook", { status: 400 });
}

const {id} =evt.data;
const eventType = evt.type;
console.log(`Webhook with and ID of ${id} and event type of ${eventType}`)
console.log("Webhook body:", body)

if (eventType === "user.created" || eventType === "user.updated") {
  const {id, email_addresses , first_name, last_name, username, image_url} = evt?.data;

  try {
    
    await createOrUpdateUser(id, first_name, last_name, email_addresses, username, image_url);
    return new Response("User created or updated", {status: 200})


  } catch (error) {
    console.log("Error creating or updating user", error);
    return new Response("Error creating or updating user", {status: 400})
  }
  }

if (eventType === "user.deleted") {
  const { id } = evt?.data;

try {

  await deleteUser(id);
  return new Response("User deleted", {status: 200})

} catch (error) {

  console.log("Error deleting user", error);
  return new Response("Error deleting user", {status: 400});

}


    
return new Response('' , {status: 200})

}

}