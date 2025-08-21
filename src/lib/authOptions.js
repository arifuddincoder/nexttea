import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect, { collections } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const userCollection = await dbConnect(collections.usersCollection);
				const user = await userCollection.findOne({ email: credentials.email });

				if (!user) throw new Error("No user found");
				const isValid = await bcrypt.compare(credentials.password, user.password);
				if (!isValid) throw new Error("Incorrect password");

				return user;
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/sign-in",
	},
};
