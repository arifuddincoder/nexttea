import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import AddProductForm from "./AddProductForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata = {
	title: "Add Product — Dashboard | Next Tea",
	description:
		"Add a new tea product—name, description, price, and image—to the Next Tea catalog. Accessible to signed-in users only.",
	robots: { index: false, follow: false },
};

export default async function AddProductPage() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect("/login?callbackUrl=/dashboard/add-product");
	}

	return (
		<section className="flex items-center justify-center px-4">
			<div className="w-full rounded-xl p-6 md:p-10 max-w-6xl mx-auto">
				<h1 className="text-2xl font-semibold mb-6">Add a New Product</h1>
				<AddProductForm />
			</div>
		</section>
	);
}
