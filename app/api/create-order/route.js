import Razorpay from 'razorpay';

export async function POST(req) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: 100, // 
      currency: 'INR',
      receipt: 'receipt_order_74394',
    };

    const order = await razorpay.orders.create(options);

    return new Response(JSON.stringify({ order }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create Razorpay order' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
