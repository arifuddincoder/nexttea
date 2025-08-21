"use client";
import axios from "axios";
import { useState } from "react";

const RegisterForm = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const handleRegister = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		const form = e.target;
		const name = form.name.value;
		const email = form.email.value;
		const password = form.password.value;

		if (!name || !email || !password) {
			setError("All fields are required.");
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setError("Please enter a valid email address.");
			return;
		}

		if (password.length < 6) {
			setError("Password must be at least 6 characters long.");
			return;
		}

		setLoading(true);
		try {
			const res = await axios.post("/api/register", { name, email, password });
			setSuccess("Registration successful!");
			form.reset();
		} catch (err) {
			setError(err?.response?.data?.error || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};
	return (
		<form onSubmit={handleRegister}>
			<div className="mb-6">
				<label htmlFor="name" className="block mb-2 text-sm">
					Name
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
				<label htmlFor="email" className="block mb-2 text-sm">
					Email address
				</label>
				<input
					type="email"
					name="email"
					id="email"
					required
					className="w-full px-3 py-2 border rounded-md border-gray-300 text-gray-900"
				/>
			</div>

			<div className="mb-6">
				<label htmlFor="password" className="block mb-2 text-sm">
					Password
				</label>
				<input
					type="password"
					name="password"
					id="password"
					required
					className="w-full px-3 py-2 border rounded-md border-gray-300 text-gray-900"
				/>
			</div>

			<button type="submit" disabled={loading} className="btn bg-red-500 text-white w-full rounded-md hover:bg-red-600">
				{loading ? "Registering..." : "Register"}
			</button>

			{error && <p className="text-red-500 mt-3">{error}</p>}
			{success && <p className="text-green-600 mt-3">{success}</p>}
		</form>
	);
};

export default RegisterForm;
