import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri) throw new Error("Please define the MONGODB_URI environment variable");
if (!dbName) throw new Error("Please define the DB_NAME environment variable");

let cachedClient = null;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

export const collections = {
	usersCollection: "users",
};

const dbConnect = async (collectionName) => {
	try {
		if (!cachedClient) {
			await client.connect();
			cachedClient = client;
			console.log("✅ MongoDB connected (new)");
		} else {
			console.log("✅ MongoDB reused");
		}

		return cachedClient.db(dbName).collection(collectionName);
	} catch (error) {
		console.error("❌ MongoDB connection error:", error);
		throw error;
	}
};

export default dbConnect;
