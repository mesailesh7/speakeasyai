import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb Connected 😂");
    app.listen(PORT, () => {
      return console.log("🚀 Server at http://localhost:3000");
    });
  })
  .catch((err) => console.error("MongoDb Error", err));
