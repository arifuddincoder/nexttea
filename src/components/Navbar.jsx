"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegUser } from "react-icons/fa6";

const NavBar = () => {
	const { data: session, status } = useSession();

	const handleLogout = () => {
		sessionStorage.clear();
		signOut();
	};

	const navLists = (
		<>
			<li>
				<Link href="/">Home</Link>
			</li>
			<li>
				<Link href="/products">Products</Link>
			</li>
			{status === "authenticated" && (
				<li>
					<Link href="/dashboard/add-product">Add Product</Link>
				</li>
			)}
		</>
	);

	return (
		<div className="navbar max-w-7xl mx-auto py-4 px-4">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
						</svg>
					</div>
					<ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
						{navLists}
					</ul>
				</div>
				<Link href="/">
					<Image src="/assets/logo.svg" alt="Car doctor official logo" width={107} height={87} />
				</Link>
			</div>

			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1 gap-6">{navLists}</ul>
			</div>

			{/* ✅ Show Appointments button only if authenticated */}
			<div className="navbar-end">
				<div className="dropdown dropdown-hover dropdown-end sm:hidden">
					<div tabIndex={0} role="button" className="btn m-1 bg-transparent border-0">
						<FaRegUser size={20} />
					</div>
					<ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
						{status === "authenticated" ? (
							<>
								<li>
									<button onClick={handleLogout} className="">
										Logout
									</button>
								</li>
							</>
						) : (
							<>
								<li>
									<Link href="/login" className="">
										Login
									</Link>
								</li>
								<li>
									<Link href="/register" className="">
										Register
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>

				<div className="sm:flex hidden gap-2">
					{status === "authenticated" ? (
						<button
							onClick={handleLogout}
							className="btn btn-outline  text-white bg-[#305349]/90 hover:bg-[#305349] rounded-md"
						>
							Logout
						</button>
					) : (
						<>
							<Link
								href="/login"
								className="btn btn-outline text-[#305349] border-[#305349] hover:bg-[#305349] hover:text-white rounded-md"
							>
								Login
							</Link>
							<Link
								href="/register"
								className="btn btn-outline  text-white bg-[#305349]/90 hover:bg-[#305349] rounded-md"
							>
								Register
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default NavBar;
