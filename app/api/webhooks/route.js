import { createOrUpdateUser } from '../../../utils/actions/User'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req) {
  try {
    const evt = await verifyWebhook({
      req,
      secret: process.env.WEBHOOK_SECRET, // ✅ Ensure this matches your .env
    });

    const { id } = evt?.data;
    const eventType = evt?.type;
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
    console.log('Webhook payload:', evt?.data);

    if (eventType === 'user.created' || eventType === 'user.updated') {
      const { id, email, first_name, last_name, username, image_url } = evt?.data;

      try {
        await createOrUpdateUser(id, first_name, last_name, email, username, image_url);

        return new Response('User created or updated', {
          status: 200,
        });
      } catch (error) {
        console.error('Error creating or updating user', error);
        return new Response('Error occurred', {
          status: 400,
        });
      }
    }

    if (eventType === 'user.deleted') {
      const { id } = evt?.data;

      try {
        await deleteUser(id); // Make sure deleteUser is imported
        return new Response('User deleted', {
          status: 200,
        });
      } catch (error) {
        console.error('Error deleting user', error);
        return new Response('Error deleting user', {
          status: 400,
        });
      }
    }

    return new Response('Webhook received', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}
