"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

const SessionChecker = () => {
	const { data: session, status } = useSession();
	const pathname = usePathname();

	useEffect(() => {
		if (status === "authenticated" && session?.customMessage) {
			const toastKey = `toast-shown-${session.customMessage}`;
			const alreadyShown = sessionStorage.getItem(toastKey);

			if (!alreadyShown) {
				// ✅ Show relevant toast
				switch (session.customMessage) {
					case "login_success":
						toast.success("Login successful!");
						break;
					case "user_created":
						toast.success("Account created successfully!");
						break;
					case "social_login":
						toast.success("Welcome back!");
						break;
					default:
						break;
				}

				// ✅ Mark as shown for this session
				sessionStorage.setItem(toastKey, "true");
			}
		}
	}, [status, session?.customMessage, pathname]);

	return null;
};

export default SessionChecker;
