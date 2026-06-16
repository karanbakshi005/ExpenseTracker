import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const port = 4000;

//Miidle ware
app.use(cors());
app.use(express.json()); //json data
app.use(express.urlencoded({ extended: true })); //form data

//Db
connectDB();

//API Routes
app.use("/api/user", userRouter);
app.get("/", (req, res) => {
  res.send("API WORKING");  
});

app.listen(port, () => {
  console.log(`$server started 0n http://localhost:${port}`);
});
