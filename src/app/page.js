import Image from "next/image";

async function getProducts() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, { cache: "no-store" });
	if (!res.ok) return [];
	const data = await res.json();
	return data.slice(0, 3);
}

export default async function Home() {
	const products = await getProducts();

	return (
		<>
			<section className="bg-[#305349] px-4 py-8 lg:py-20">
				<div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row md:items-center gap-5">
					<div className="text-white md:w-6/12">
						<h1 className="text-3xl lg:text-6xl/tight font-extrabold mb-3">Everything Starts with Tea Every Day</h1>
						<p className="text-lg">
							At Next Tea, we treat every cup as a fresh start. Our blends are crafted from responsibly sourced leaves,
							balanced for clarity and comfort, and tested for consistent flavor. Whether you need a calm morning, a
							focused afternoon, or a gentle night, we brew a better routine—one cup at a time.
						</p>
					</div>
					<figure className="w-auto">
						<Image
							src={"/assets/home/hero-tea.png"}
							alt={"Morning tea"}
							width={575}
							height={402}
							className="rounded-md"
						/>
					</figure>
				</div>
			</section>

			<section className="py-16 bg-white">
				<div className="max-w-6xl mx-auto px-4">
					<h2 className="text-center text-3xl md:text-4xl font-extrabold mb-10">Variety for Every Taste</h2>
					<div className="grid gap-8 md:grid-cols-3">
						{products.map((p, idx) => {
							const oldPrice = Math.round((Number(p.price) * 1.33 + Number.EPSILON) * 100) / 100;
							const highlight = idx === 1;
							return (
								<div
									key={p._id}
									className="rounded-lg shadow-sm p-6 text-center flex flex-col items-center bg-[#F6F6F6]"
								>
									<h3 className="text-xl font-semibold">{p.name}</h3>

									{p.image ? (
										<img src={p.image} alt={p.name} className="h-44 w-auto object-contain mx-auto mb-4" />
									) : (
										<div className="h-44 w-full bg-gray-100 mb-4" />
									)}

									<div className="mb-2">
										<span className="line-through text-gray-400 mr-2">${oldPrice.toFixed(2)}</span>
										<span className="text-lg font-bold">${Number(p.price).toFixed(2)}</span>
									</div>
									<p className="text-xs text-gray-500 mb-4">{p?.description}</p>

									<button
										className={`w-full py-2 rounded border cursor-pointer bg-[#305349]/90 text-white border-[#305349]/90 hover:bg-[#305349] `}
									>
										Order Now
									</button>
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</>
	);
}
