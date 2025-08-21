"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [status, setStatus] = useState("idle");

	const router = useRouter();

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");
		setStatus("loading");

		const res = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		if (res?.error) {
			setError(res.error);
			setStatus("error");

			// Optional: reset status after 3 seconds
			setTimeout(() => setStatus("idle"), 3000);
		} else {
			setStatus("success");
			// Optional: delay before redirect
			setTimeout(() => {
				// router.push("/dashboard");
				router.push("/");
			}, 1000);
		}
	};

	// ✅ Determine button label
	let buttonLabel = "Login";
	if (status === "loading") buttonLabel = "Logging in...";
	else if (status === "success") buttonLabel = "Redirecting...";
	else if (status === "error") buttonLabel = "Try again";

	return (
		<form onSubmit={handleLogin} className="max-w-md mx-auto p-4 bg-white rounded space-y-4">
			{/* Email */}
			<div>
				<label htmlFor="email" className="block mb-1 text-sm font-medium">
					Email
				</label>
				<input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
				/>
			</div>

			{/* Password */}
			<div>
				<label htmlFor="password" className="block mb-1 text-sm font-medium">
					Password
				</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
				/>
			</div>

			{/* Submit Button */}
			<button
				type="submit"
				disabled={status === "loading" || status === "success"}
				className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
			>
				{buttonLabel}
			</button>

			{/* Error message */}
			{error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
		</form>
	);
};

export default LoginForm;
