import { ObjectID } from "mongodb";
import { getMongoClient, dbName } from "../config/MongoDb.js";

class Product {
  constructor() {
    this.collectionName = "products";
  }

  async save(product) {
    const client = getMongoClient();
    const db = client.db(dbName);
    const collection = db.collection(this.collectionName);

    const result = await collection.insertOne(product);
    return result.insertedId;
  }

  async find() {
    const client = getMongoClient();
    const db = client.db(dbName);
    const collection = db.collection(this.collectionName);

    return collection.find().toArray();
  }

  async findById(id) {
    const client = getMongoClient();
    const db = client.db(dbName);
    const collection = db.collection(this.collectionName);

    return collection.findOne({ _id: ObjectID(id) });
  }

  async findByIdAndUpdate(id, updates) {
    const client = getMongoClient();
    const db = client.db(dbName);
    const collection = db.collection(this.collectionName);

    const result = await collection.findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: updates },
      { returnDocument: "after" }
    );

    return result.value;
  }

  async findByIdAndDelete(id) {
    const client = getMongoClient();
    const db = client.db(dbName);
    const collection = db.collection(this.collectionName);

    const result = await collection.findOneAndDelete({ _id: ObjectID(id) });

    return result.value;
  }
}

export default Product;
