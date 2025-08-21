import Image from "next/image";

export default function Home() {
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
		</>
	);
}
