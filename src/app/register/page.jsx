import Image from "next/image";
import Link from "next/link";
import React from "react";
import RegisterForm from "./sections/RegisterForm";
import SocialLogin from "@/components/auth/SocialLogin";
const page = () => {
	return (
		<div className="flex gap-16 max-w-7xl px-4 mx-auto items-center">
			<figure className="w-auto">
				<Image src={"/assets/images/login/login.svg"} alt={"login image"} width={460} height={502} />
			</figure>
			<div className="p-18 border border-gray-300 rounded-lg w-[611px]">
				<h1 className="text-center text-4xl font-semibold mb-10">Sign Up</h1>
				<RegisterForm></RegisterForm>
				<div className="mt-7 mb-12 text-center">
					<p className="mb-4">Or Sign Up with</p>
					<SocialLogin />
				</div>
				<div className="text-center">
					<p>
						Already have an account? <Link href={"/login"}>Login</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default page;
