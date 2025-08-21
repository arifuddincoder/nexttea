import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import Link from "next/link";
const Footer = () => {
	return (
		<footer className="bg-[#305349] sm:footer-horizontal text-neutral-content items-center p-4">
			<div className="max-w-7xl mx-auto flex justify-between items-center flex-col sm:flex-row gap-4">
				<aside className="">
					<p>Copyright © {new Date().getFullYear()} - All right reserved</p>
				</aside>
				<nav className="flex gap-4">
					<Link href="https://facebook.com/arifuddincoder" target="_blank">
						<FaFacebookF />
					</Link>
					<Link href="https://x.com/arifuddincoder" target="_blank">
						<BsTwitterX />
					</Link>
					<Link href="https://instagram.com/arifuddincoder" target="_blank">
						<FaInstagram />
					</Link>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
