import Link from "next/link";

async function getProducts() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, { cache: "no-store" });
	if (!res.ok) return [];
	return res.json();
}

export default async function ProductsPage() {
	const products = await getProducts();

	return (
		<section className="py-16 bg-white">
			<div className="max-w-6xl mx-auto px-4">
				<h1 className="text-center text-3xl md:text-4xl font-extrabold mb-10">All Teas</h1>

				<div className="grid gap-8 md:grid-cols-3">
					{products.map((p, idx) => {
						const oldPrice = Math.round((Number(p.price) * 1.33 + Number.EPSILON) * 100) / 100;
						const highlight = idx % 3 === 1;
						const href = `/products/${p._id}`;

						return (
							<div key={p._id} className="rounded-lg shadow-sm p-6 text-center flex flex-col items-center bg-[#F6F6F6]">
								<Link href={href} className="group">
									<h3 className="text-xl font-semibold group-hover:underline">{p.name}</h3>
								</Link>

								<Link href={href} className="block w-full">
									{p.image ? (
										// eslint-disable-next-line @next/next/no-img-element
										<img src={p.image} alt={p.name} className="h-44 w-auto object-contain mx-auto my-4" />
									) : (
										<div className="h-44 w-full bg-gray-100 my-4" />
									)}
								</Link>

								<div className="mb-2">
									<span className="line-through text-gray-400 mr-2">${oldPrice.toFixed(2)}</span>
									<span className="text-lg font-bold">${Number(p.price).toFixed(2)}</span>
								</div>
								<p className="text-xs text-gray-500 mb-4 line-clamp-2">{p.description}</p>

								<Link
									href={href}
									className={`w-full py-2 rounded border text-center bg-[#305349]/90 text-white border-[#305349]/90 hover:bg-[#305349]
									`}
								>
									View Details
								</Link>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
