import { NextResponse } from "next/server";
import dbConnect, { collections } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
	const col = await dbConnect(collections.productsCollection || "products");
	const rows = await col.find({}).sort({ createdAt: -1 }).toArray();
	const items = rows.map(({ _id, name, description, price, image, createdAt }) => ({
		_id: String(_id),
		name,
		description,
		price,
		image,
		createdAt,
	}));
	return NextResponse.json(items);
}

export async function POST(req) {
	const session = await getServerSession(authOptions);
	if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

	const { name, description, price, image } = await req.json();
	if (!name || !description || typeof price !== "number" || !image) {
		return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
	}

	const col = await dbConnect(collections.productsCollection || "products");
	const doc = { name, description, price, image, createdAt: new Date(), createdBy: session.user?.email || null };
	const r = await col.insertOne(doc);
	return NextResponse.json({ _id: String(r.insertedId) }, { status: 201 });
}
