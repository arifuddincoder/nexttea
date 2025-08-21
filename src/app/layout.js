import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import SessionChecker from "@/components/auth/SessionChecker";
import NavBar from "@/components/Navbar";

const roboto = Inter({
	subsets: ["latin"],
});

export const metadata = {
	title: "Car Doctor",
	description: "Affordable price for car servicing",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${roboto.className} antialiased`}>
				<SessionProviderWrapper>
					<SessionChecker />
					<NavBar />
					<Toaster position="top-right" />
					{children}
				</SessionProviderWrapper>
			</body>
		</html>
	);
}
