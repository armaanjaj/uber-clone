import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    const body = await req.json();
    const { name, email, amount } = body;

    if (!name || !email || !amount) {
        return new Response(
            JSON.stringify({ error: "Please enter valid details", status: 400 })
        );
    }

    let customer;

    const existingCustomer = await stripe.customers.list({ email });

    if (existingCustomer.data.length > 0) {
        customer = existingCustomer.data[0];
    } else {
        const newCustomer = await stripe.customers.create({
            name,
            email,
        });

        customer = newCustomer;
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: "2024-06-20" }
    );
    const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(amount) * 100,
        currency: "cad",
        customer: customer.id,
        automatic_payment_methods: {
            enabled: true,
            allow_redirects: "never",
        },
    });

    return new Response(
        JSON.stringify({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
        })
    );
}
