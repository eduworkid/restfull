import express from "express";
import cors from "cors";
import db from "./config/Mongo.js";
import ProductRoute from "./routes/ProductRoutev1.js";
import bodyParser from "body-parser";

import { connectToMongoDB, disconnectFromMongoDB } from "./config/MongoDb.js";
import productV2 from "./routes/ProductRouterv2.js";

const app = express();
connectToMongoDB();
process.on("SIGINT", async () => {
  await disconnectFromMongoDB();
  process.exit(0);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
// app.use(FileUpload());
// app.use(express.static("public"));
app.use(productV2);
app.use(ProductRoute);

app.listen(5000, () => console.log("Server Up and Running..."));
