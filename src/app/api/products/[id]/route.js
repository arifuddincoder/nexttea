import { NextResponse } from "next/server";
import dbConnect, { collections } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(_req, { params }) {
	const col = await dbConnect(collections.productsCollection || "products");
	const doc = await col.findOne({ _id: new ObjectId(params.id) });
	if (!doc) return NextResponse.json({ message: "Not found" }, { status: 404 });
	const { _id, name, description, price, image, createdAt } = doc;
	return NextResponse.json({ _id: String(_id), name, description, price, image, createdAt });
}
