"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
const SocialLogin = () => {
	const handleSocialLogin = (provider) => {
		signIn(provider, { callbackUrl: "/" });
	};
	return (
		<div className="space-x-3">
			<button className="btn btn-circle shadow-transparent" onClick={() => handleSocialLogin("google")}>
				<FcGoogle />
			</button>
			<button className="btn btn-circle shadow-transparent" onClick={() => handleSocialLogin("github")}>
				<FaGithub />
			</button>
		</div>
	);
};

export default SocialLogin;
