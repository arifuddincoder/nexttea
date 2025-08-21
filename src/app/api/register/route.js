import { createUser } from "@/lib/userController";

export async function POST(request) {
	try {
		const body = await request.json();
		const userId = await createUser(body);
		return Response.json({ message: "User registered", userId }, { status: 201 });
	} catch (error) {
		console.error("Register API Error:", error);
		return Response.json({ error: error.message }, { status: 400 });
	}
}
