import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import SessionChecker from "@/components/auth/SessionChecker";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

const roboto = Inter({
	subsets: ["latin"],
});

export const metadata = {
	title: "Next Tea — Premium Green, Black & Oolong | Free Shipping & 100% Guarantee",
	description:
		"Shop handpicked green, black, and oolong teas. Fresh blends for every mood—with free shipping and a 100% money-back guarantee.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${roboto.className} antialiased`}>
				<SessionProviderWrapper>
					<SessionChecker />
					<NavBar />
					<Toaster position="top-right" />
					<div className="min-h-[86vh]">{children}</div>
					<Footer />
				</SessionProviderWrapper>
			</body>
		</html>
	);
}
