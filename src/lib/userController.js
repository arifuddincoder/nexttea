import dbConnect, { collections } from "./dbConnect";
import bcrypt from "bcryptjs";

export const createUser = async ({ name, email, password }) => {
	const usersCollection = await dbConnect(collections.usersCollection);

	const existingUser = await usersCollection.findOne({ email });
	if (existingUser) {
		throw new Error("User already exists");
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = {
		name,
		email,
		password: hashedPassword,
		createdAt: new Date().toISOString(),
	};

	const result = await usersCollection.insertOne(newUser);
	return result.insertedId;
};

export const loginUser = async ({ email, password }) => {
	const usersCollection = await dbConnect(collections.usersCollection);

	const user = await usersCollection.findOne({ email });
	if (!user) {
		throw new Error("No user found with this email");
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		throw new Error("Incorrect password");
	}

	// Optional: remove password from returned object
	delete user.password;

	return {
		message: "Login successful",
		user,
	};
};
