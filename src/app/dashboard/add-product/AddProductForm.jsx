"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductForm() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const router = useRouter();

	const handleAdd = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		const form = e.target;
		const name = form.name.value.trim();
		const description = form.description.value.trim();
		const price = Number(form.price.value);
		const file = form.image.files?.[0] || null;

		if (!name || !description || Number.isNaN(price) || !file) {
			setError("All fields including image are required.");
			return;
		}

		setLoading(true);
		try {
			const fd = new FormData();
			fd.append("image", file);
			const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
			const up = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body: fd });
			const data = await up.json();
			const imageUrl = data?.data?.url;
			if (!imageUrl) {
				setError("Image upload failed.");
				setLoading(false);
				return;
			}

			await axios.post("/api/products", { name, description, price, image: imageUrl });
			setSuccess("Product added successfully!");
			form.reset();
			setTimeout(() => router.push("/products"), 600);
		} catch (err) {
			setError(err?.response?.data?.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleAdd}>
			<div className="mb-6">
				<label htmlFor="name" className="block mb-2 text-sm">
					Product Name
				</label>
				<input
					type="text"
					name="name"
					id="name"
					required
					className="w-full px-3 py-2 border rounded-md border-gray-300 text-gray-900"
				/>
			</div>

			<div className="mb-6">
				<label htmlFor="description" className="block mb-2 text-sm">
					Description
				</label>
				<textarea
					name="description"
					id="description"
					required
					className="w-full px-3 py-2 border rounded-md border-gray-300 text-gray-900 min-h-28"
				/>
			</div>

			<div className="mb-6">
				<label htmlFor="price" className="block mb-2 text-sm">
					Price
				</label>
				<input
					type="number"
					name="price"
					id="price"
					step="0.01"
					min="0"
					required
					className="w-full px-3 py-2 border rounded-md border-gray-300 text-gray-900"
				/>
			</div>

			<div className="mb-6">
				<label htmlFor="image" className="block mb-2 text-sm">
					Product Image
				</label>
				<input
					type="file"
					name="image"
					id="image"
					accept="image/*"
					required
					className="block w-full px-3 py-2 border rounded-md border-gray-300 text-gray-900"
				/>
			</div>

			<button
				type="submit"
				disabled={loading}
				className="btn w-full rounded-md text-white bg-[#305349]/90 hover:bg-[#305349]"
			>
				{loading ? "Saving..." : "Save Product"}
			</button>

			{error && <p className="text-red-500 mt-3">{error}</p>}
			{success && <p className="text-green-600 mt-3">{success}</p>}
		</form>
	);
}
