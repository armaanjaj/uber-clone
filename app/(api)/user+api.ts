import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId) {
        return Response.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }
    try {
        const response = await sql`
        insert into users (
        name,
        email,
        clerk_id
        )
        values (
        ${name},
        ${email},
        ${clerkId}
        )
    `;

        return new Response(JSON.stringify({ data: response }), {
            status: 201,
        });
    } catch (error) {
        console.log(error);
        return Response.json({ error: error }, { status: 500 });
    }
}
