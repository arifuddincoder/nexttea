export async function generateMetadata({ params }) {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.id}`, { cache: "no-store" });

		if (!res.ok) {
			return {
				title: "Product Not Found — Next Tea",
				description: "This product could not be found.",
				robots: { index: false, follow: false },
			};
		}

		const p = await res.json();
		const raw = String(p.description || "Explore this tea at Next Tea.")
			.replace(/\s+/g, " ")
			.trim();
		const desc = raw.length > 160 ? `${raw.slice(0, 157)}…` : raw;

		const pageUrl = `/products/${params.id}`;

		return {
			title: `${p.name} — Next Tea`,
			description: desc,
			alternates: { canonical: pageUrl },
			openGraph: {
				title: `${p.name} — Next Tea`,
				description: desc,
				url: pageUrl,
				siteName: "Next Tea",
				images: p.image ? [{ url: p.image, alt: p.name }] : undefined,
				type: "website", // <- "product" নয়
			},
			twitter: {
				card: "summary_large_image",
				title: `${p.name} — Next Tea`,
				description: desc,
				images: p.image ? [p.image] : undefined,
			},
		};
	} catch {
		return {
			title: "Product — Next Tea",
			description: "Explore our tea selection at Next Tea.",
		};
	}
}

import Link from "next/link";

async function getProduct(id) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, { cache: "no-store" });
	if (!res.ok) return null;
	return res.json();
}

export default async function ProductDetails({ params }) {
	const p = await getProduct(params.id);
	if (!p) {
		return (
			<div className="max-w-4xl mx-auto px-4 py-16">
				<p className="mb-6">Product not found.</p>
				<Link href="/products" className="text-[#305349] underline">
					Back to Products
				</Link>
			</div>
		);
	}

	const oldPrice = Math.round((Number(p.price) * 1.33 + Number.EPSILON) * 100) / 100;

	return (
		<section className="py-16 bg-white">
			<div className="max-w-4xl mx-auto px-4">
				<Link href="/products" className="text-sm text-[#305349] underline">
					← Back to Products
				</Link>

				<div className="mt-6 grid md:grid-cols-2 gap-8 items-start">
					{p.image ? (
						<img src={p.image} alt={p.name} className="w-full h-auto object-contain bg-[#F6F6F6] rounded-lg p-6" />
					) : (
						<div className="w-full h-72 bg-gray-100 rounded-lg" />
					)}

					<div>
						<h1 className="text-3xl font-bold mb-2">{p.name}</h1>
						<div className="mb-4">
							<span className="line-through text-gray-400 mr-2">${oldPrice.toFixed(2)}</span>
							<span className="text-2xl font-extrabold">${Number(p.price).toFixed(2)}</span>
						</div>
						<p className="text-gray-700 leading-relaxed">{p.description}</p>

						<button className="mt-6 btn rounded-md text-white bg-[#305349]/90 hover:bg-[#305349]">Order Now</button>
					</div>
				</div>
			</div>
		</section>
	);
}
