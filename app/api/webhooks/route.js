import { createOrUpdateUser } from '@/utils/actions/User'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req) {
  try {

    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt?.data
    const eventType = evt?.type
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', evt?.data)


console.log('Webhook payload:', body)

if (evt.type === 'user.created' || eventType === 'user.updated') {
    const {id , email , first_name, last_name, username, image_url} = evt?.data

    try {
        await createOrUpdateUser(
            id,
            first_name,
            last_name,
            email,
            username,
            image_url, 
        )

        return new Response('User created or updated', {
            status:200,
        })

    } catch (error) {
    console.log('Error creating or updating user', error)
    return new Response('Error occured', {
        status:400,
    })}; 



}

if (evt.type === 'user.deleted') {
    const {id} = evt?.data

    try {
      await deleteUser(id);
      return new Response('User deleted', {
        status:200,
      })
    }catch(error){
        console.log('Error deleting user', error)
        return new Response('Error deleting user', {
            status:400, 
        })

    }
}

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)


    return new Response('Error verifying webhook', { status: 400 })
  }
}