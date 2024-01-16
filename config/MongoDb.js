import { MongoClient } from "mongodb";

const dbName = "eduwork";

const url = "mongodb://localhost:27017/eduwork";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB Native");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

const disconnectFromMongoDB = async () => {
  try {
    await client.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
    throw error;
  }
};

const getMongoClient = () => client;

export { connectToMongoDB, disconnectFromMongoDB, getMongoClient, dbName };
